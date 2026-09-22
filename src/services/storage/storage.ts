import { MMKV } from 'react-native-mmkv';

let storage: MMKV | null = null;

export const initializeStorage = (
    encryptionKey: string,
): void => {
    storage = new MMKV({
        id: 'hrms-storage',
        encryptionKey,
    });
};

export const getStorage = (): MMKV => {
    if (!storage) {
        throw new Error(
            'Storage has not been initialized.',
        );
    }

    return storage;
};