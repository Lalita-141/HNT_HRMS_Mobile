import { API } from "../../../constants/api";
import { apiClient } from "../../../services/api/apiClient";
import { LoginRequestBody, LoginResponse } from "../type";


// Why like this?

// Zero React dependencies: It is pure TypeScript functions.
// Easy to unit test, mock, or call from background tasks/interceptors without React lifecycle overhead.
export const authService = {
    login: async (payload: LoginRequestBody): Promise<LoginResponse> => {
        return apiClient.post<LoginResponse>(API.AUTH.LOGIN, payload, { silent: true });
    },
    refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
        return apiClient.post<LoginResponse>(API.AUTH.REFRESH, { refreshToken }, { silent: true });
    },
};