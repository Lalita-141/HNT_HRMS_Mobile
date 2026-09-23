export interface LoginRequestBody {
    email: string;
    password: string
}

export interface LoginResponse {
    SUCCESS: boolean;
    MESSAGE: string;
    DATA: any;
}

