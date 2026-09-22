import * as Keychain from 'react-native-keychain';

const MMKV_KEY_SERVICE = 'HNT_HRMS_MMKV_KEY';

export const secureStorage = {
    async saveMMKVKey(key: string): Promise<void> {
        await Keychain.setGenericPassword(
            'mmkv-encryption',
            key,
            {
                service: MMKV_KEY_SERVICE,
            },
        );
    },

    async getMMKVKey(): Promise<string | null> {
        const credentials = await Keychain.getGenericPassword({
            service: MMKV_KEY_SERVICE,
        });

        if (!credentials) {
            return null;
        }

        return credentials.password;
    },

    async deleteMMKVKey(): Promise<void> {
        await Keychain.resetGenericPassword({
            service: MMKV_KEY_SERVICE,
        });
    },
};