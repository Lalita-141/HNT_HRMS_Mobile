import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    clearAuthTokens,
    getAuthToken,
    getEmployeeId,
    getUserEmail,
    getUserName,
    getUserRoles,
    setAuthToken,
    setEmployeeId,
    setRefreshToken,
    setUserEmail,
    setUserName,
    setUserRoles,
} from '../services/storage/authStorage';

interface AuthContextType {
    isAuthenticated: boolean;
    authToken: string | null;
    userRoles: string[];
    userName: string | null;
    userEmail: string | null;
    employeeId: string | null;
    login: (
        token: string,
        roles?: string[],
        name?: string,
        refreshToken?: string,
        email?: string,
        employeeId?: string
    ) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    authToken: null,
    userRoles: [],
    userName: null,
    userEmail: null,
    employeeId: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setTokenState] = useState<string | null>(null);
    const [userRoles, setRolesState] = useState<string[]>([]);
    const [userName, setUserNameState] = useState<string | null>(null);
    const [userEmail, setUserEmailState] = useState<string | null>(null);
    const [employeeId, setEmployeeIdState] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Load stored auth data on app start
        const token = getAuthToken();
        const roles = getUserRoles();
        const name = getUserName();
        const email = getUserEmail();
        const empId = getEmployeeId();

        if (token) {
            setTokenState(token);
            setRolesState(roles);
            setUserNameState(name);
            setUserEmailState(email);
            setEmployeeIdState(empId);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (
        token: string,
        roles: string[] = ['EMPLOYEE'],
        name: string = 'Ismail Akhtar',
        refreshToken?: string,
        email?: string,
        empId?: string
    ) => {
        setAuthToken(token);
        setUserRoles(roles);
        setUserName(name);
        if (refreshToken) {
            setRefreshToken(refreshToken);
        }
        if (email) {
            setUserEmail(email);
            setUserEmailState(email);
        }
        if (empId) {
            setEmployeeId(empId);
            setEmployeeIdState(empId);
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
        setUserEmailState(null);
        setEmployeeIdState(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authToken,
                userRoles,
                userName,
                userEmail,
                employeeId,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
