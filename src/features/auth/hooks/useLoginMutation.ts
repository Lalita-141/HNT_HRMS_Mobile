import { ApiError } from "../../../services/api/apiClient";
import { LoginRequestBody, LoginResponse } from "../type";
import { useMutation } from '@tanstack/react-query';
import { authService } from "../services/authService";
import { useAuth } from "../../../context/AuthContext";

export const useLoginMutation = () => {
    const { login } = useAuth();

    return useMutation<LoginResponse, ApiError, LoginRequestBody>({
        mutationFn: (payload: LoginRequestBody) => authService.login(payload),

        onSuccess: (response: LoginResponse) => {
            if (response?.SUCCESS && response.DATA?.token) {
                const token = response.DATA.token;
                const roles = response.DATA.roles || ['EMPLOYEE'];
                const username = response.DATA.username || 'Ismail Akhtar';
                const refreshToken = response.DATA.refreshToken;

                login(token, roles, username, refreshToken);
                console.log('Login successful for user:', username, 'with roles:', roles);
            }
        },
        onError: (error: ApiError) => {
            console.error('Login failed:', error?.message, error.status);
        }
    });
};