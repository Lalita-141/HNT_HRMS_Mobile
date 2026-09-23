import { getStorage } from './storage';

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

export const getAuthToken = (): string | null => {
    try {
        const storage = getStorage();
        return storage.getString(AUTH_TOKEN_KEY) ?? null;
    } catch {
        return null;
    }
};

export const setAuthToken = (token: string): void => {
    const storage = getStorage();
    storage.set(AUTH_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
    try {
        const storage = getStorage();
        return storage.getString(REFRESH_TOKEN_KEY) ?? null;
    } catch {
        return null;
    }
};




export const setRefreshToken = (token: string): void => {
    const storage = getStorage();
    storage.set(REFRESH_TOKEN_KEY, token);
};

export const clearAuthTokens = (): void => {
    try {
        const storage = getStorage();
        storage.delete(AUTH_TOKEN_KEY);
        storage.delete(REFRESH_TOKEN_KEY);
        storage.delete(USER_DATA_KEY);
    } catch {
        // storage may not be initialized
    }
};


export const setUserRoles = (role: string[]): void => {
    const storage = getStorage();
    storage.set(USER_DATA_KEY, JSON.stringify(role));
};

export const getUserRoles = (): string[] | null => {
    const storage = getStorage();
    return JSON.parse(storage.getString(USER_DATA_KEY) ?? '[]');
};

export const setUserName = (userId: string): void => {
    const storage = getStorage();
    storage.set(USER_DATA_KEY, userId);
};

export const getUserName = (): string | null => {
    const storage = getStorage();
    return storage.getString(USER_DATA_KEY) ?? null;
};
