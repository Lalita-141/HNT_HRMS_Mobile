import { useEffect, useState } from 'react';
import { initStorage } from '../services/storage/initStorage';

export const useAppBootstrap = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                await initStorage();
                setIsReady(true);
            } catch (error) {
                console.error('App bootstrap failed:', error);
            }
        };

        bootstrap();
    }, []);

    return { isReady };
};
