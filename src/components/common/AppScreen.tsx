import React, { ReactNode } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppScreenProps {
    children: ReactNode;
    scroll?: boolean;
    contentContainerStyle?: ViewStyle;
}

const AppScreen = ({
    children,
    scroll = false,
    contentContainerStyle,
}: AppScreenProps) => {
    const content = scroll ? (
        <ScrollView
            contentContainerStyle={[
                styles.content,
                contentContainerStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    ) : (
        <SafeAreaView
            style={[styles.content, contentContainerStyle]}
            edges={['top', 'bottom']}>
            {children}
        </SafeAreaView>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {content}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        flex: 1,
    },
});

export default AppScreen;