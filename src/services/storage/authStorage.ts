import { getStorage } from './storage';

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ROLES_KEY = 'user_roles';
const USER_NAME_KEY = 'user_name';
const USER_EMAIL_KEY = 'user_email';
const EMPLOYEE_ID_KEY = 'employee_id';

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
        storage.delete(USER_ROLES_KEY);
        storage.delete(USER_NAME_KEY);
        storage.delete(USER_EMAIL_KEY);
        storage.delete(EMPLOYEE_ID_KEY);
    } catch {
        // storage may not be initialized
    }
};

export const setUserRoles = (roles: string[]): void => {
    const storage = getStorage();
    storage.set(USER_ROLES_KEY, JSON.stringify(roles));
};

export const getUserRoles = (): string[] => {
    try {
        const storage = getStorage();
        const data = storage.getString(USER_ROLES_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const setUserName = (userName: string): void => {
    const storage = getStorage();
    storage.set(USER_NAME_KEY, userName);
};

export const getUserName = (): string | null => {
    try {
        const storage = getStorage();
        return storage.getString(USER_NAME_KEY) ?? null;
    } catch {
        return null;
    }
};

export const setUserEmail = (email: string): void => {
    const storage = getStorage();
    storage.set(USER_EMAIL_KEY, email);
};

export const getUserEmail = (): string | null => {
    try {
        const storage = getStorage();
        return storage.getString(USER_EMAIL_KEY) ?? null;
    } catch {
        return null;
    }
};

export const setEmployeeId = (id: string): void => {
    const storage = getStorage();
    storage.set(EMPLOYEE_ID_KEY, id);
};

export const getEmployeeId = (): string | null => {
    try {
        const storage = getStorage();
        return storage.getString(EMPLOYEE_ID_KEY) ?? null;
    } catch {
        return null;
    }
};

