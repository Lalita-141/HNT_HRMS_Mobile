import { getAuthToken } from '../storage/tokenStorage';

export interface ApiOptions {
    params?: Record<
        string,
        string | number | boolean | null | undefined
    >;

    body?: unknown;

    headers?: Record<string, string>;

    timeout?: number;
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

/**
 * Converts API URL + query parameters into
 * a final URL.
 *
 * Example:
 *
 * API.EMPLOYEE.ATTENDANCE
 *
 * + params:
 * {
 *   page: 1,
 *   limit: 20
 * }
 *
 * becomes:
 *
 * https://dev-api.com/employee/attendance?page=1&limit=20
 */
const buildUrl = (
    url: string,
    params?: ApiOptions['params'],
): string => {
    if (!params) {
        return url;
    }

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(
        ([key, value]) => {
            if (
                value !== undefined &&
                value !== null
            ) {
                queryParams.append(
                    key,
                    String(value),
                );
            }
        },
    );

    const queryString =
        queryParams.toString();

    if (!queryString) {
        return url;
    }

    return `${url}${url.includes('?') ? '&' : '?'
        }${queryString}`;
};

/**
 * Common request function.
 *
 * All GET, POST, PUT, PATCH and DELETE
 * requests eventually come here.
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
    } = options;

    /*
     * Get logged-in user's token.
     */
    const token = await getAuthToken();

    /*
     * Default headers.
     */
    const headers: Record<string, string> = {
        Accept: 'application/json',
        ...customHeaders,
    };

    /*
     * JSON body.
     *
     * Don't set Content-Type manually when
     * sending FormData.
     */
    if (
        body !== undefined &&
        !(body instanceof FormData)
    ) {
        headers['Content-Type'] =
            'application/json';
    }

    /*
     * Add authentication token if available.
     */
    if (token) {
        headers.Authorization =
            `Bearer ${token}`;
    }

    /*
     * Create timeout controller.
     */
    const controller =
        new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        /*
         * Make API request.
         */
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

        /*
         * Request completed, so clear timeout.
         */
        clearTimeout(timeoutId);

        /*
         * 204 = No Content
         */
        if (response.status === 204) {
            return null as T;
        }

        /*
         * Read response.
         */
        let responseData: unknown;

        const contentType =
            response.headers.get(
                'content-type',
            );

        if (
            contentType?.includes(
                'application/json',
            )
        ) {
            responseData =
                await response.json();
        } else {
            responseData =
                await response.text();
        }

        /*
         * Handle HTTP errors.
         */
        if (!response.ok) {
            let message =
                `Request failed with status ${response.status}`;

            if (
                typeof responseData ===
                'object' &&
                responseData !== null &&
                'message' in responseData
            ) {
                message = String(
                    (
                        responseData as {
                            message?: unknown;
                        }
                    ).message,
                );
            }

            throw new ApiError(
                response.status,
                message,
                responseData,
            );
        }

        /*
         * Successful response.
         */
        return responseData as T;
    } catch (error) {
        /*
         * Clear timeout if an error occurs.
         */
        clearTimeout(timeoutId);

        /*
         * Request timeout.
         */
        if (
            error instanceof Error &&
            error.name === 'AbortError'
        ) {
            throw new ApiError(
                408,
                'Request timed out. Please try again.',
            );
        }

        /*
         * If this is already our ApiError,
         * don't wrap it again.
         */
        if (error instanceof ApiError) {
            throw error;
        }

        /*
         * Network error.
         */
        throw new ApiError(
            0,
            'Network error. Please check your internet connection.',
            error,
        );
    }
};

/**
 * Public API client.
 *
 * Screens/services use these methods.
 *
 * They don't call fetch() directly.
 */
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