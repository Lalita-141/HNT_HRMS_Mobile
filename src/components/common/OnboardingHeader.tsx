import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Logo from './Logo';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface OnboardingHeaderProps {
    onSkip: () => void;
    showLogo?: boolean;
}

const OnboardingHeader = ({
    onSkip,
    showLogo = false,
}: OnboardingHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {showLogo && (
                    <Logo width={200} />
                )}
            </View>

            <Pressable
                onPress={onSkip}
                hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
                accessibilityRole="button"
                accessibilityLabel="Skip onboarding"
                style={({ pressed }) => [
                    styles.skipButton,
                    pressed && styles.skipPressed,
                ]}>
                <Text style={styles.skipText}>Skip</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
        minHeight: 48,
        zIndex: 10,
    },

    leftContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    skipButton: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
    },

    skipPressed: {
        opacity: 0.6,
    },

    skipText: {
        ...typography.bodyMedium,
        color: colors.textSecondary,
        fontSize: 15,
    },
});

export default OnboardingHeader;
