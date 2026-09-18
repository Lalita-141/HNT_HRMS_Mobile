import React, { ReactNode } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

interface AppScreenProps {
    children: ReactNode;
    scroll?: boolean;
    withBackground?: boolean;
    contentContainerStyle?: ViewStyle;
    style?: ViewStyle;
}

const AppScreen = ({
    children,
    scroll = false,
    withBackground = true,
    contentContainerStyle,
    style,
}: AppScreenProps) => {
    const content = scroll ? (
        <ScrollView
            contentContainerStyle={[
                styles.scrollContent,
                contentContainerStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    ) : (
        <SafeAreaView
            style={[styles.safeArea, contentContainerStyle]}
            edges={['top', 'bottom']}>
            {children}
        </SafeAreaView>
    );

    return (
        <View style={[styles.container, style]}>
            {withBackground && (
                <Image
                    source={require('../../assets/images/ScreenBg.png')}
                    style={StyleSheet.absoluteFill}
                    resizeMode="stretch"
                    pointerEvents="none"
                />
            )}

            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                {content}
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
    },

    keyboardContainer: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
    },
});

export default AppScreen;