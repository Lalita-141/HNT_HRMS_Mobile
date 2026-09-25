import { API } from '../../constants/api';
import {
    clearAuthTokens,
    getAuthToken,
    getRefreshToken,
    setAuthToken,
    setRefreshToken,
} from '../storage/authStorage';
import { BiometricService } from '../biometric/biometricService';
import { globalToast } from '../../context/ToastContext';
import { globalLoader } from '../../context/LoadingContext';

export interface ApiOptions {
    params?: Record<
        string,
        string | number | boolean | null | undefined
    >;
    body?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
    _retry?: boolean;
    silent?: boolean;
    showLoader?: boolean;
    loaderMessage?: string;
}

export class ApiError extends Error {
    status: number;
    data?: unknown;

    constructor(
        status: number,
        message: string,
        data?: unknown,
    ) {
        super(message);

        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

// Global locking & queue to prevent duplicate concurrent refresh calls
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

/**
 * Calls POST /auth/refresh-token with { refreshToken }
 */
const executeRefreshToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    const response = await fetch(API.AUTH.REFRESH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error(`Refresh token failed with status ${response.status}`);
    }

    const json = await response.json();

    if (json?.SUCCESS && json?.DATA) {
        const newAccessToken = json.DATA.accessToken || json.DATA.token;
        const newRefreshToken = json.DATA.refreshToken;

        if (newAccessToken) {
            // 1. Update MMKV local storage
            setAuthToken(newAccessToken);
            if (newRefreshToken) {
                setRefreshToken(newRefreshToken);
            }

            // 2. Also update hardware-backed Biometric Keychain if enrolled
            const hasBiometrics = await BiometricService.hasSavedCredentials();
            if (hasBiometrics) {
                await BiometricService.saveBiometricCredentials(
                    'user',
                    JSON.stringify({
                        token: newAccessToken,
                        refreshToken: newRefreshToken || refreshToken,
                    })
                );
            }

            return newAccessToken;
        }
    }

    throw new Error('Invalid refresh token response');
};

/**
 * Converts API URL + query parameters into a final URL.
 */
const buildUrl = (
    url: string,
    params?: ApiOptions['params'],
): string => {
    if (!params) {
        return url;
    }

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
        }
    });

    const queryString = queryParams.toString();
    if (!queryString) {
        return url;
    }

    return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
};

/**
 * Common request function with silent refresh on 401/403.
 */
const request = async <T>(
    method: string,
    url: string,
    options: ApiOptions = {},
): Promise<T> => {
    const {
        params,
        body,
        headers: customHeaders,
        timeout = 60000,
        _retry = false,
    } = options;

    const token = getAuthToken();

    const headers: Record<string, string> = {
        Accept: 'application/json',
        ...customHeaders,
    };

    if (body !== undefined && !(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeout);

    if (options.showLoader) {
        globalLoader.show(options.loaderMessage || 'Loading...');
    }

    try {
        const response = await fetch(
            buildUrl(url, params),
            {
                method,
                headers,
                body:
                    body instanceof FormData
                        ? body
                        : body !== undefined
                            ? JSON.stringify(body)
                            : undefined,
                signal: controller.signal,
            },
        );

        clearTimeout(timeoutId);

        if (response.status === 204) {
            return null as T;
        }

        // =========================================================================
        // 🚀 Intercept 401/403, Refresh Token, and Replay Request
        // =========================================================================
        const isAuthEndpoint =
            url.includes('/auth/login') ||
            url.includes('/auth/refresh') ||
            url.includes('/auth/refresh-token');

        if ((response.status === 401 || response.status === 403) && !isAuthEndpoint && !_retry) {
            if (isRefreshing) {
                // Another request is already refreshing, wait in queue
                return new Promise<T>((resolve, reject) => {
                    failedQueue.push({
                        resolve: (newToken: string) => {
                            options.headers = {
                                ...options.headers,
                                Authorization: `Bearer ${newToken}`,
                            };
                            options._retry = true;
                            resolve(request<T>(method, url, options));
                        },
                        reject: (err: unknown) => reject(err),
                    });
                });
            }

            options._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await executeRefreshToken();
                if (newAccessToken) {
                    processQueue(null, newAccessToken);
                    // 🔁 Replay original request with fresh token
                    options.headers = {
                        ...options.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    };
                    return await request<T>(method, url, options);
                }
            } catch (refreshErr) {
                processQueue(refreshErr, null);
                // Refresh failed: Clear session and force re-login
                clearAuthTokens();
                await BiometricService.removeBiometrics();
                throw new ApiError(401, 'Session expired. Please log in again.');
            } finally {
                isRefreshing = false;
            }
        }

        let responseData: unknown;
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }

        let apiError: ApiError | null = null;

        if (!response.ok) {
            let message = `Request failed with status ${response.status}`;

            if (typeof responseData === 'object' && responseData !== null) {
                if ('MESSAGE' in responseData && (responseData as any).MESSAGE) {
                    message = String((responseData as { MESSAGE?: unknown }).MESSAGE);
                } else if ('message' in responseData && (responseData as any).message) {
                    message = String((responseData as { message?: unknown }).message);
                } else if ('error' in responseData && (responseData as any).error) {
                    message = String((responseData as { error?: unknown }).error);
                }
            }

            apiError = new ApiError(
                response.status,
                message,
                responseData,
            );
        } else if (
            typeof responseData === 'object' &&
            responseData !== null &&
            ('SUCCESS' in responseData || 'success' in responseData)
        ) {
            const isSuccess = (responseData as any).SUCCESS ?? (responseData as any).success;
            if (isSuccess === false) {
                const message =
                    (responseData as any).MESSAGE ||
                    (responseData as any).message ||
                    (responseData as any).error ||
                    'Request failed';
                apiError = new ApiError(
                    response.status || 400,
                    String(message),
                    responseData
                );
            }
        }

        if (apiError) {
            if (!options.silent) {
                globalToast.showError(apiError.message, apiError.status);
            }
            throw apiError;
        }

        return responseData as T;
    } catch (error) {
        clearTimeout(timeoutId);

        let finalError: ApiError;

        if (
            error instanceof Error &&
            error.name === 'AbortError'
        ) {
            finalError = new ApiError(
                408,
                'Request timed out. Please try again.',
            );
        } else if (error instanceof ApiError) {
            finalError = error;
        } else {
            finalError = new ApiError(
                0,
                'Network error. Please check your internet connection.',
                error,
            );
        }

        if (!options.silent && !(error instanceof ApiError)) {
            globalToast.showError(finalError.message, finalError.status);
        }

        throw finalError;
    } finally {
        if (options.showLoader) {
            globalLoader.hide();
        }
    }
};

export const apiClient = {
    get: <T>(
        url: string,
        options?: ApiOptions,
    ): Promise<T> => {
        return request<T>(
            'GET',
            url,
            options,
        );
    },

    post: <T>(
        url: string,
        body?: unknown,
        options?: ApiOptions,
    ): Promise<T> => {
        return request<T>(
            'POST',
            url,
            {
                ...options,
                body,
            },
        );
    },

    put: <T>(
        url: string,
        body?: unknown,
        options?: ApiOptions,
    ): Promise<T> => {
        return request<T>(
            'PUT',
            url,
            {
                ...options,
                body,
            },
        );
    },

    patch: <T>(
        url: string,
        body?: unknown,
        options?: ApiOptions,
    ): Promise<T> => {
        return request<T>(
            'PATCH',
            url,
            {
                ...options,
                body,
            },
        );
    },

    delete: <T>(
        url: string,
        options?: ApiOptions,
    ): Promise<T> => {
        return request<T>(
            'DELETE',
            url,
            options,
        );
    },
};