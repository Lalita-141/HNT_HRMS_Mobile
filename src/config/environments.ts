export const ENVIRONMENTS = {
    LOCAL: 'http://192.168.1.100:5000',
    DEV: 'http://172.20.1.188:8080/api/v1',
    UAT: 'https://uat-api.example.com',
    PROD: 'https://api.example.com',
} as const;

export const BASE_URL = ENVIRONMENTS.DEV;