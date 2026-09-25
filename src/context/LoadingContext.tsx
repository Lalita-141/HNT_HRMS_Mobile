import React, { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';
import {
    ActivityIndicator,
    Animated,
    Modal,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../theme/colors';

interface LoadingContextType {
    isLoading: boolean;
    loadingMessage: string;
    showLoading: (message?: string) => void;
    hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    loadingMessage: 'Loading...',
    showLoading: () => {},
    hideLoading: () => {},
});

// Singleton references for calling from outside React components (e.g. apiClient, navigation)
let globalShowLoading: ((message?: string) => void) | null = null;
let globalHideLoading: (() => void) | null = null;

export const globalLoader = {
    show: (message?: string) => {
        if (globalShowLoading) {
            globalShowLoading(message);
        }
    },
    hide: () => {
        if (globalHideLoading) {
            globalHideLoading();
        }
    },
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');
    const requestCount = useRef(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showLoading = useCallback((message = 'Loading...') => {
        requestCount.current += 1;
        setLoadingMessage(message);

        if (requestCount.current === 1) {
            setIsLoading(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 180,
                useNativeDriver: true,
            }).start();
        }
    }, [fadeAnim]);

    const hideLoading = useCallback(() => {
        if (requestCount.current > 0) {
            requestCount.current -= 1;
        }

        if (requestCount.current === 0) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start(() => {
                setIsLoading(false);
                setLoadingMessage('Loading...');
            });
        }
    }, [fadeAnim]);

    // Bind global handlers
    globalShowLoading = showLoading;
    globalHideLoading = hideLoading;

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                loadingMessage,
                showLoading,
                hideLoading,
            }}>
            {children}

            {isLoading && (
                <Modal
                    transparent
                    animationType="none"
                    visible={isLoading}
                    onRequestClose={() => {}}>
                    <Animated.View
                        style={[
                            styles.overlay,
                            { opacity: fadeAnim },
                        ]}>
                        <View style={styles.card}>
                            <ActivityIndicator size="large" color={colors.primary} />
                            <Text style={styles.messageText} numberOfLines={2}>
                                {loadingMessage}
                            </Text>
                        </View>
                    </Animated.View>
                </Modal>
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 18,
        paddingHorizontal: 28,
        paddingVertical: 22,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 160,
        maxWidth: 280,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 20,
        elevation: 16,
        borderWidth: 1,
        borderColor: colors.neutral100,
    },
    messageText: {
        marginTop: 14,
        fontSize: 14,
        fontWeight: '600',
        color: colors.neutral900,
        textAlign: 'center',
        lineHeight: 20,
    },
});
