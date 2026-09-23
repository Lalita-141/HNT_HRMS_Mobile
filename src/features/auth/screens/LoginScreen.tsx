import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import AppScreen from '../../../components/common/AppScreen';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

import AppInput from '../../../components/inputs/AppInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Divider from '../../../components/common/Divider';
import BiometricButton from '../../../components/buttons/BiometricButton';
import LoginHeader from '../../../components/common/LoginHeader';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { useAuth } from '../../../context/AuthContext';
import FingerPrintImg from '../../../assets/images/Login/FingerPrintImg.png';
import MailIcon from '../../../assets/images/Login/MailIcon.png';
import LockIcon from '../../../assets/images/Login/PasswordIcon.png';
import PageBottomBg from '../../../assets/images/PageBottombg.png';

const LoginScreen = () => {
    const [email, setEmail] = useState('s.kolekar@handt.ai');
    const [password, setPassword] = useState('superadmin@123');
    const { mutate: loginMutation, isPending, isError, error } = useLoginMutation();
    const { login } = useAuth();

    const handleLogin = () => {
        const payload = {
            email,
            password,
        };
        loginMutation(payload, {
            onError: (err) => {
                console.log('Login mutation error:', err);
                // Fallback for dev/offline testing if mock API server isn't reachable
                // login('mock_token_123', ['EMPLOYEE', 'MANAGER'], 'Ismail Akhtar');
            },
        });
    };

    const handleBiometricLogin = () => {
        // Quick biometric login to Dashboard
        login('biometric_auth_token', ['EMPLOYEE', 'MANAGER'], 'Ismail Akhtar');
    };

    return (
        <AppScreen scroll>

            <View style={styles.container}>
                {/* ============================= */}
                {/* Bottom Decorative Background  */}
                {/* ============================= */}
                <Image
                    source={PageBottomBg}
                    style={styles.bottomBackground}
                    resizeMode="stretch"
                    pointerEvents="none"
                />

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
                            value={email}
                            onChangeText={setEmail}
                            leftIcon={
                                <Image
                                    source={MailIcon}
                                    style={styles.emailIcon}
                                    resizeMode="contain"
                                />
                            }
                        />

                        {/* Password */}
                        <AppInput
                            placeholder="Password"
                            isPassword
                            value={password}
                            onChangeText={setPassword}
                            leftIcon={
                                <Image
                                    source={LockIcon}
                                    style={styles.passwordIcon}
                                    resizeMode="contain"
                                />
                            }
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

                        {/* Error Message if any */}
                        {isError && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>
                                    {error?.message || 'Login failed. Please check your credentials.'}
                                </Text>
                            </View>
                        )}

                        {/* Sign In */}
                        <PrimaryButton
                            title="Sign In"
                            onPress={handleLogin}
                            loading={isPending}
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
                            onPress={handleBiometricLogin}
                            icon={
                                <Image
                                    source={FingerPrintImg}
                                    style={styles.biometricIcon}
                                    resizeMode="contain"
                                />
                            }
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
     * Bottom decorative curved background
     */
    bottomBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 100,
        zIndex: 0,
    },

    /**
     * Main content wrapper
     */
    wrapper: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
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

    /**
     * Biometric icon inside button circle
     */
    biometricIcon: {
        width: 64,
        height: 64,
    },

    emailIcon: {
        width: 24,
        height: 24,
    },
    passwordIcon: {
        width: 24,
        height: 24,
    },

    errorContainer: {
        backgroundColor: colors.errorLight,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 10,
        marginBottom: spacing.md,
    },
    errorText: {
        color: colors.error,
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
    },

});

export default LoginScreen;