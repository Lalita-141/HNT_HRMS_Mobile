import { BASE_URL } from "../config/environments";

export const API = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        REFRESH: `${BASE_URL}/auth/refresh`,
        LOGOUT: `${BASE_URL}/auth/logout`,
        FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    },

    EMPLOYEE: {
        PROFILE: `${BASE_URL}/employee/profile`,
        ATTENDANCE: `${BASE_URL}/employee/attendance`,
        LEAVE: `${BASE_URL}/employee/leave`,
    },

    MANAGER: {
        TEAM: `${BASE_URL}/manager/team`,
        APPROVALS: `${BASE_URL}/manager/approvals`,
    },

    NOTIFICATION: {
        LIST: `${BASE_URL}/notifications`,
        READ: `${BASE_URL}/notifications/read`,
    },

    LOCATION: {
        UPDATE: `${BASE_URL}/location/update`,
        TRACKING: `${BASE_URL}/location/tracking`,
    },
} as const;