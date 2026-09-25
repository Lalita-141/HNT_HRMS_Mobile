import React, { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../config/queryClient';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';

interface Props {
    children: ReactNode;
}

export const AppProviders = ({ children }: Props) => {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <ToastProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </ToastProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
};

