import React from 'react';
import {
    Image,
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
                {icon}
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
        width: 76,
        height: 76,
        borderRadius: 48,
        backgroundColor: colors.primaryLight,

        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        width: 48,
        height: 48,

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