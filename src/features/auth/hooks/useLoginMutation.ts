import { ApiError } from "../../../services/api/apiClient"
import { LoginRequestBody, LoginResponse } from "../type"
import { useMutation } from '@tanstack/react-query';
import { authService } from "../services/authService";
import { setAuthToken, setRefreshToken, setUserName, setUserRoles } from "../../../services/storage/authStorage";

export const useLoginMutation = () => {
    return useMutation<LoginResponse, ApiError, LoginRequestBody>({
        mutationFn: (payload: LoginRequestBody) => authService.login(payload),

        onSuccess: (response: LoginResponse) => {
            if (response?.SUCCESS) {
                setAuthToken(response.DATA.token)
            }
            if (response.DATA?.refreshToken) {
                setRefreshToken(response.DATA.refreshToken)
            }
            if (response.DATA?.roles) {
                setUserRoles(response.DATA.roles)
                console.log('Login successful for role:', response.DATA.roles)
            }
            if (response.DATA?.username) {
                setUserName(response.DATA.username)
                console.log('Login successful for username:', response.DATA.username)
            }


        },
        onError: (error: ApiError) => {
            console.error('Login failed:', error?.message, error.status)
        }
    })
}