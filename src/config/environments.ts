export const ENVIRONMENTS = {
    LOCAL: 'http://192.168.1.100:5000',
    DEV: 'https://dev-api.example.com',
    UAT: 'https://uat-api.example.com',
    PROD: 'https://api.example.com',
} as const;

export const BASE_URL = ENVIRONMENTS.DEV;