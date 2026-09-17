import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface BiometricButtonProps {
    onPress: () => void;
    icon?: React.ReactNode;
    label?: string;
    disabled?: boolean;
}

const BiometricButton = ({
    onPress,
    icon,
    label = 'Use Biometrics',
    disabled = false,
}: BiometricButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={label}
            style={({ pressed }) => [
                styles.container,
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
            ]}>
            <View style={styles.circle}>
                {icon || (
                    <Text style={styles.placeholderIcon}>
                        ◉
                    </Text>
                )}
            </View>

            <Text style={styles.label}>
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: colors.primaryLight,

        alignItems: 'center',
        justifyContent: 'center',
    },

    placeholderIcon: {
        fontSize: 38,
        color: colors.primary,
    },

    label: {
        marginTop: spacing.md,
        color: colors.textSecondary,
        fontSize: 16,
        fontWeight: '500',
    },

    pressed: {
        opacity: 0.7,
    },

    disabled: {
        opacity: 0.5,
    },
});

export default BiometricButton;