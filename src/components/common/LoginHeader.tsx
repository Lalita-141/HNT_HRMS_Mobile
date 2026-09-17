import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const LoginHeader = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Welcome Back</Text>

            <Text style={styles.subtitle}>
                Sign in to your H&T HRMS account and keep moving forword.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: spacing.xxxl,
    },

    logo: {
        width: 250,
        height: 120,
        marginBottom: spacing.xl,
    },

    title: {
        ...typography.heading,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },

    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});

export default LoginHeader;