import * as Keychain from 'react-native-keychain';
import {
    getAuthToken,
    getEmployeeId,
    getRefreshToken,
    getUserEmail,
    getUserName,
    getUserRoles,
} from '../storage/authStorage';

export type BiometryType = 'FaceID' | 'TouchID' | 'Biometrics' | 'None';

export interface SavedSessionData {
    token: string;
    refreshToken?: string;
    username: string;
    email: string;
    roles: string[];
    employeeId?: string;
}

export const BiometricService = {
    /**
     * 1. Check if device supports Biometrics (Face ID, Touch ID, Fingerprint)
     */
    async getBiometricType(): Promise<{ isSupported: boolean; type: BiometryType }> {
        try {
            const biometry = await Keychain.getSupportedBiometryType();
            if (!biometry) {
                return { isSupported: false, type: 'None' };
            }

            if (biometry === Keychain.BIOMETRY_TYPE.FACE_ID) {
                return { isSupported: true, type: 'FaceID' };
            }
            if (biometry === Keychain.BIOMETRY_TYPE.TOUCH_ID) {
                return { isSupported: true, type: 'TouchID' };
            }
            return { isSupported: true, type: 'Biometrics' };
        } catch (error) {
            return { isSupported: false, type: 'None' };
        }
    },

    /**
     * 2. Save auth token / credentials in Hardware Secure Enclave / KeyStore
     */
    async saveBiometricCredentials(userIdOrEmail: string, tokenPayload: string): Promise<boolean> {
        try {
            await Keychain.setGenericPassword(userIdOrEmail, tokenPayload, {
                service: 'HNT_HRMS_BIOMETRIC',
                accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
                accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
                securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
            });
            return true;
        } catch (error) {
            console.error('Error saving biometrics:', error);
            return false;
        }
    },

    /**
     * 3. Helper to pack and save the API login response payload
     */
    async enableBiometricsAfterLogin(data: any): Promise<boolean> {
        const sessionPayload: SavedSessionData = {
            token: data.token,
            refreshToken: data.refreshToken,
            username: data.username || 'User',
            email: data.email || 'user',
            roles: data.roles || ['EMPLOYEE'],
            employeeId: data.employeeId,
        };

        return await this.saveBiometricCredentials(
            data.email || 'user',
            JSON.stringify(sessionPayload)
        );
    },

    /**
     * 4. Enable biometrics using current active in-app session (e.g. from Settings / Profile screen)
     */
    async enableBiometricsForActiveSession(): Promise<boolean> {
        const token = getAuthToken();
        if (!token) return false;

        const refreshToken = getRefreshToken() ?? undefined;
        const username = getUserName() || 'User';
        const email = getUserEmail() || 'user@handt.ai';
        const roles = getUserRoles();
        const employeeId = getEmployeeId() ?? undefined;

        const sessionPayload: SavedSessionData = {
            token,
            refreshToken,
            username,
            email,
            roles: roles.length > 0 ? roles : ['EMPLOYEE'],
            employeeId,
        };

        return await this.saveBiometricCredentials(email, JSON.stringify(sessionPayload));
    },

    /**
     * 5. Trigger native biometric prompt to retrieve stored credentials
     */
    async authenticate(): Promise<{ username: string; token: string } | null> {
        try {
            const credentials = await Keychain.getGenericPassword({
                service: 'HNT_HRMS_BIOMETRIC',
                authenticationPrompt: {
                    title: 'Biometric Authentication',
                    subtitle: 'Verify your identity to log in',
                    cancel: 'Use Password',
                },
            });

            if (credentials && credentials.password) {
                return {
                    username: credentials.username,
                    token: credentials.password,
                };
            }
            return null;
        } catch (error) {
            console.warn('Biometrics cancelled or failed:', error);
            return null;
        }
    },

    /**
     * 6. Check if user already enrolled biometrics
     */
    async hasSavedCredentials(): Promise<boolean> {
        try {
            const hasCredentials = await Keychain.hasGenericPassword({
                service: 'HNT_HRMS_BIOMETRIC',
            });
            return Boolean(hasCredentials);
        } catch {
            return false;
        }
    },

    /**
     * 7. Remove biometrics (e.g., when logging out or turning off in settings)
     */
    async removeBiometrics(): Promise<void> {
        await Keychain.resetGenericPassword({ service: 'HNT_HRMS_BIOMETRIC' });
    },
};

