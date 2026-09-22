import { secureStorage } from './secureStorage';
import { generateEncryptionKey } from './encryptionKey';
import { initializeStorage } from './storage';

export const initStorage = async (): Promise<void> => {
    let encryptionKey =
        await secureStorage.getMMKVKey();

    if (!encryptionKey) {
        encryptionKey = generateEncryptionKey();

        await secureStorage.saveMMKVKey(
            encryptionKey,
        );
    }

    initializeStorage(encryptionKey);
};