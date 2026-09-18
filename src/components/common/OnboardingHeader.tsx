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
            {showLogo && (
                <View style={styles.logoContainer}>
                    <Logo width={240} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.sm,
        zIndex: 10,
    },

    logoContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },

    skipButton: {
        width: '100%',
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        // borderWidth: 1,
        // borderColor: 'black',
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
