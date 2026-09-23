import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    clearAuthTokens,
    getAuthToken,
    getUserName,
    getUserRoles,
    setAuthToken,
    setRefreshToken,
    setUserName,
    setUserRoles,
} from '../services/storage/authStorage';

interface AuthContextType {
    isAuthenticated: boolean;
    authToken: string | null;
    userRoles: string[];
    userName: string | null;
    login: (token: string, roles?: string[], name?: string, refreshToken?: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    authToken: null,
    userRoles: [],
    userName: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setTokenState] = useState<string | null>(null);
    const [userRoles, setRolesState] = useState<string[]>([]);
    const [userName, setUserNameState] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Load stored auth data on app start
        const token = getAuthToken();
        const roles = getUserRoles();
        const name = getUserName();

        if (token) {
            setTokenState(token);
            setRolesState(roles);
            setUserNameState(name);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (
        token: string,
        roles: string[] = ['EMPLOYEE'],
        name: string = 'Ismail Akhtar',
        refreshToken?: string
    ) => {
        setAuthToken(token);
        setUserRoles(roles);
        setUserName(name);
        if (refreshToken) {
            setRefreshToken(refreshToken);
        }

        setTokenState(token);
        setRolesState(roles);
        setUserNameState(name);
        setIsAuthenticated(true);
    };

    const logout = () => {
        clearAuthTokens();
        setTokenState(null);
        setRolesState([]);
        setUserNameState(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authToken,
                userRoles,
                userName,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
