import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    rightIcon?: React.ReactNode;
}

const PrimaryButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    rightIcon,
}: PrimaryButtonProps) => {
    const isDisabled = disabled || loading;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityState={{
                disabled: isDisabled,
                busy: loading,
            }}
            style={({ pressed }) => [
                styles.button,
                pressed && !isDisabled && styles.pressed,
                isDisabled && styles.disabled,
            ]}>
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={colors.white}
                />
            ) : (
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>

                    {rightIcon && (
                        <View style={styles.rightIcon}>
                            {rightIcon}
                        </View>
                    )}
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        minHeight: 58,
        borderRadius: 16,

        backgroundColor: colors.primary,

        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: spacing.xl,
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '500',
    },

    rightIcon: {
        marginLeft: spacing.md,
    },

    pressed: {
        opacity: 0.85,
    },

    disabled: {
        opacity: 0.5,
    },
});

export default PrimaryButton;