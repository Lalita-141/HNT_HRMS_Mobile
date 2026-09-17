import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface AppInputProps extends TextInputProps {
    leftIcon?: React.ReactNode;
    error?: string;
    isPassword?: boolean;
}

const AppInput = ({
    leftIcon,
    error,
    isPassword = false,
    style,
    ...textInputProps
}: AppInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.wrapper}>
            <View
                style={[
                    styles.container,
                    isFocused && styles.focusedContainer,
                    error && styles.errorContainer,
                ]}>
                {leftIcon && (
                    <View style={styles.leftIcon}>
                        {leftIcon}
                    </View>
                )}

                <TextInput
                    {...textInputProps}
                    style={[styles.input, style]}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    placeholderTextColor={colors.textSecondary}
                    onFocus={event => {
                        setIsFocused(true);
                        textInputProps.onFocus?.(event);
                    }}
                    onBlur={event => {
                        setIsFocused(false);
                        textInputProps.onBlur?.(event);
                    }}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() =>
                            setIsPasswordVisible(previous => !previous)
                        }
                        style={styles.rightButton}>
                        <Text style={styles.eyeText}>
                            {isPasswordVisible ? 'Hide' : 'Show'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {error ? (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: spacing.lg,
    },

    container: {
        width: '100%',
        minHeight: 58,
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,

        backgroundColor: colors.white,
    },

    focusedContainer: {
        borderColor: colors.primary,
    },

    errorContainer: {
        borderColor: colors.error,
    },

    leftIcon: {
        marginLeft: spacing.lg,
        marginRight: spacing.sm,
    },

    input: {
        flex: 1,
        minHeight: 56,
        paddingHorizontal: spacing.sm,

        fontSize: 16,
        color: colors.textPrimary,
    },

    rightButton: {
        paddingHorizontal: spacing.lg,
    },

    eyeText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },

    errorText: {
        marginTop: spacing.xs,
        marginLeft: spacing.sm,
        color: colors.error,
        fontSize: 13,
    },
});

export default AppInput;