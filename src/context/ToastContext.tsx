import React, { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export type ToastType = 'error' | 'success' | 'warning' | 'info';

export interface ToastOptions {
    message: string;
    statusCode?: number | string;
    type?: ToastType;
    duration?: number;
}

interface ToastContextType {
    showToast: (options: ToastOptions) => void;
    showError: (message: string, statusCode?: number | string) => void;
    showSuccess: (message: string) => void;
    hideToast: () => void;
}

const ToastContext = createContext<ToastContextType>({
    showToast: () => {},
    showError: () => {},
    showSuccess: () => {},
    hideToast: () => {},
});

// Singleton ref for calling toast imperatively outside React components (e.g. from apiClient)
let globalToastHandler: ((options: ToastOptions) => void) | null = null;

export const globalToast = {
    show: (options: ToastOptions) => {
        if (globalToastHandler) {
            globalToastHandler(options);
        }
    },
    showError: (message: string, statusCode?: number | string) => {
        if (globalToastHandler) {
            globalToastHandler({
                message,
                statusCode,
                type: 'error',
            });
        }
    },
    showSuccess: (message: string) => {
        if (globalToastHandler) {
            globalToastHandler({
                message,
                type: 'success',
            });
        }
    },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const insets = useSafeAreaInsets();
    const [toast, setToast] = useState<ToastOptions | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const translateY = useRef(new Animated.Value(-120)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hideToast = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -120,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsVisible(false);
            setToast(null);
        });
    }, [translateY, opacity]);

    const showToast = useCallback(
        (options: ToastOptions) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            setToast(options);
            setIsVisible(true);

            // Animate in
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    friction: 8,
                    tension: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto hide
            const duration = options.duration ?? (options.type === 'error' ? 5000 : 3500);
            timerRef.current = setTimeout(() => {
                hideToast();
            }, duration);
        },
        [translateY, opacity, hideToast]
    );

    const showError = useCallback(
        (message: string, statusCode?: number | string) => {
            showToast({
                message,
                statusCode,
                type: 'error',
            });
        },
        [showToast]
    );

    const showSuccess = useCallback(
        (message: string) => {
            showToast({
                message,
                type: 'success',
            });
        },
        [showToast]
    );

    // Register global handler
    globalToastHandler = showToast;

    const getStatusLabel = () => {
        if (!toast?.statusCode) return null;
        const code = String(toast.statusCode);
        if (code === '0') return 'Network Error';
        return `Status ${code}`;
    };

    const isError = !toast?.type || toast.type === 'error';
    const isSuccess = toast?.type === 'success';

    return (
        <ToastContext.Provider value={{ showToast, showError, showSuccess, hideToast }}>
            {children}

            {isVisible && toast && (
                <Animated.View
                    style={[
                        styles.container,
                        {
                            top: Math.max(insets.top + 6, 16),
                            transform: [{ translateY }],
                            opacity,
                        },
                    ]}
                    pointerEvents="box-none">
                    <View
                        style={[
                            styles.toastCard,
                            isError && styles.errorCard,
                            isSuccess && styles.successCard,
                        ]}>
                        {/* Status Code / Type Badge */}
                        <View style={styles.headerRow}>
                            <View
                                style={[
                                    styles.badge,
                                    isError && styles.errorBadge,
                                    isSuccess && styles.successBadge,
                                ]}>
                                <Text
                                    style={[
                                        styles.badgeText,
                                        isError && styles.errorBadgeText,
                                        isSuccess && styles.successBadgeText,
                                    ]}>
                                    {getStatusLabel() || (isError ? 'API Error' : 'Success')}
                                </Text>
                            </View>

                            {/* Dismiss button */}
                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={hideToast}
                                activeOpacity={0.7}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                <Text style={styles.closeText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Backend Message */}
                        <Text style={styles.messageText} numberOfLines={4}>
                            {toast.message}
                        </Text>
                    </View>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 16,
        right: 16,
        zIndex: 99999,
        alignItems: 'center',
    },
    toastCard: {
        width: '100%',
        maxWidth: 480,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
        elevation: 12,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
    },
    errorCard: {
        backgroundColor: '#FFF1F2',
        borderColor: '#FECDD3',
    },
    successCard: {
        backgroundColor: '#F0FDF4',
        borderColor: '#BBF7D0',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2.5,
        borderRadius: 6,
        backgroundColor: '#E2E8F0',
    },
    errorBadge: {
        backgroundColor: '#FFE4E6',
    },
    successBadge: {
        backgroundColor: '#DCFCE7',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#475569',
        letterSpacing: 0.3,
    },
    errorBadgeText: {
        color: '#E11D48',
    },
    successBadgeText: {
        color: '#16A34A',
    },
    closeBtn: {
        padding: 2,
    },
    closeText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#94A3B8',
    },
    messageText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0F172A',
        lineHeight: 18,
    },
});
