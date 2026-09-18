import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import AppScreen from '../../components/common/AppScreen';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

import AppInput from '../../components/inputs/AppInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Divider from '../../components/common/Divider';
import BiometricButton from '../../components/buttons/BiometricButton';
import LoginHeader from '../../components/common/LoginHeader';

const LoginScreen = () => {
    return (
        <AppScreen scroll>

            <View style={styles.container}>
                {/* ============================= */}
                {/* Login Content */}
                {/* ============================= */}

                <View style={styles.wrapper}>

                    <View style={styles.formContainer}>

                        {/* Logo + Welcome Text */}
                        <LoginHeader />

                        {/* Employee ID / Email */}
                        <AppInput
                            placeholder="Employee ID / Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            leftIcon={<Text>✉</Text>}
                        />

                        {/* Password */}
                        <AppInput
                            placeholder="Password"
                            isPassword
                            leftIcon={<Text>🔒</Text>}
                        />

                        {/* Forgot Password */}
                        <TouchableOpacity
                            style={styles.forgotContainer}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.forgotText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        {/* Sign In */}
                        <PrimaryButton
                            title="Sign In"
                            onPress={() => {
                                console.log('Sign In pressed');
                            }}
                            rightIcon={
                                <Text style={styles.arrow}>
                                    →
                                </Text>
                            }
                        />

                        {/* OR */}
                        <Divider />

                        {/* Biometrics */}
                        <BiometricButton
                            onPress={() => {
                                console.log('Biometric pressed');
                            }}
                            label="Use Biometrics"
                        />

                    </View>

                </View>

            </View>

        </AppScreen>
    );
};

const styles = StyleSheet.create({

    /**
     * Main screen
     */
    container: {
        flexGrow: 1,
        width: '100%',
        position: 'relative',
    },

    /**
     * Main content wrapper
     */
    wrapper: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',

        /*
         * Responsive horizontal spacing.
         * 6% works well across small and large devices.
         */
        paddingHorizontal: '6%',

        /*
         * Space around the content.
         */
        paddingTop: spacing.xl,
        paddingBottom: spacing.xxxl,

        /*
         * Keep content above background images.
         */
        zIndex: 1,
    },

    /**
     * Prevent the form from becoming
     * excessively wide on tablets.
     */
    formContainer: {
        width: '100%',
        maxWidth: 520,
    },

    /**
     * Forgot password
     */
    forgotContainer: {
        alignItems: 'flex-end',
        marginBottom: spacing.xl,
    },

    forgotText: {
        ...typography.bodyMedium,
        color: colors.primary,
    },

    /**
     * Sign-in arrow
     */
    arrow: {
        color: colors.white,
        fontSize: 20,
    },

});

export default LoginScreen;