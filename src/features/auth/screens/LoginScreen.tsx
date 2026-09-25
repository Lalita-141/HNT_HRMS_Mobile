import React, { useEffect, useState } from 'react';
import {
    Alert,
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
import { BiometricService } from '../../../services/biometric/biometricService';
import { authService } from '../services/authService';
import { globalLoader } from '../../../context/LoadingContext';

const LoginScreen = () => {
    const [email, setEmail] = useState('s.kolekar@handt.ai');
    const [password, setPassword] = useState('superadmin@123');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { mutate: loginMutation, isPending, isError, error } = useLoginMutation();
    const { login } = useAuth();

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (errorMessage) setErrorMessage(null);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (errorMessage) setErrorMessage(null);
    };

    const handleBiometricLogin = async () => {
        const result = await BiometricService.authenticate();
        if (result && result.token) {
            // Show loader immediately after fingerprint matches
            globalLoader.show('Logging in...');

            try {
                // 1. Parse stored session payload from secure hardware
                const session = JSON.parse(result.token);
                console.log('Biometric unlock payload retrieved:', session?.email || session?.username);

                // 2. Call backend to validate refresh token and get fresh rotated access token
                if (session?.refreshToken) {
                    try {
                        const refreshResponse = await authService.refreshToken(session.refreshToken);
                        if (refreshResponse?.SUCCESS && refreshResponse?.DATA) {
                            const freshData = refreshResponse.DATA;
                            const freshToken = freshData.token || freshData.accessToken || session.token;
                            const freshRefreshToken = freshData.refreshToken || session.refreshToken;
                            const freshRoles = freshData.roles || session.roles || ['Employee'];
                            const freshUsername = freshData.username || session.username || 'Employee Name';
                            const freshEmail = freshData.email || session.email || '';
                            const freshEmpId = freshData.employeeId || session.employeeId || '';

                            // 3. Update hardware-backed KeyStore with the latest fresh session data
                            await BiometricService.enableBiometricsAfterLogin({
                                token: freshToken,
                                refreshToken: freshRefreshToken,
                                roles: freshRoles,
                                username: freshUsername,
                                email: freshEmail,
                                employeeId: freshEmpId,
                            });

                            // 4. Log in with validated fresh credentials
                            login(
                                freshToken,
                                freshRoles,
                                freshUsername,
                                freshRefreshToken,
                                freshEmail,
                                freshEmpId
                            );

                            // Smoothly hide loader after screen transition mounts
                            setTimeout(() => {
                                globalLoader.hide();
                            }, 350);
                            return;
                        }
                    } catch (apiError: any) {
                        console.warn('Biometric refresh token validation failed:', apiError);
                        globalLoader.hide();
                        // If token was revoked or expired on server (401/403)
                        if (apiError?.status === 401 || apiError?.status === 403) {
                            Alert.alert(
                                'Session Expired',
                                'Your biometric session has expired. Please log in with your email and password.',
                                [{ text: 'OK' }]
                            );
                            return;
                        }
                    }
                }

                // Fallback to active local session if offline or no refresh token
                login(
                    session.token,
                    session.roles || ['Employee'],
                    session.username || 'Employee Name',
                    session.refreshToken,
                    session.email,
                    session.employeeId
                );

                setTimeout(() => {
                    globalLoader.hide();
                }, 350);
            } catch {
                globalLoader.hide();
                login(result.token, ['Employee'], result.username);
            }
        }
    };

    useEffect(() => {
        const checkAndPrompt = async () => {
            const { isSupported } = await BiometricService.getBiometricType();
            const hasSaved = await BiometricService.hasSavedCredentials();
            console.log('Supported' + isSupported)
            console.log('Has saved' + hasSaved)
            if (isSupported && hasSaved) {
                // Auto-prompt on launch if biometrics are enrolled
                handleBiometricLogin();
            }
        };
        checkAndPrompt();
    }, []);

    const handleLoginSuccess = async (responseData: any) => {
        if (!responseData?.SUCCESS || !responseData?.DATA?.token) {
            const msg = responseData?.MESSAGE || 'Invalid email or password.';
            setErrorMessage(msg);
            return;
        }

        setErrorMessage(null);
        const data = responseData?.DATA;

        // 1. Set Auth context
        login(data.token, data.roles, data.username, data.refreshToken, data.email, data.employeeId);

        // 2. Check device biometrics & prompt enrollment if not saved yet
        const { isSupported, type } = await BiometricService.getBiometricType();
        const hasSaved = await BiometricService.hasSavedCredentials();
        console.log("isSupported and type on first login" + isSupported, type)
        console.log("hasSaved on first login" + hasSaved)
        if (isSupported && !hasSaved) {
            Alert.alert(
                `Enable ${type === 'FaceID' ? 'Face ID' : 'Fingerprint'}?`,
                `Do you want to enable quick biometric login for ${data.username}?`,
                [
                    { text: 'Skip', style: 'cancel' },
                    {
                        text: 'Enable',
                        onPress: async () => {
                            await BiometricService.enableBiometricsAfterLogin(data);
                        },
                    },
                ]
            );
        }
    };

    const handleLogin = () => {
        setErrorMessage(null);

        if (!email.trim() || !password.trim()) {
            const msg = 'Please enter both email and password.';
            setErrorMessage(msg);
            return;
        }

        const payload = {
            email: email.trim(),
            password: password.trim(),
        };
        loginMutation(payload, {
            onSuccess: (response) => {
                handleLoginSuccess(response);
            },
            onError: (err: any) => {
                const msg = err?.message || 'Invalid email or password.';
                setErrorMessage(msg);
            },
        });
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
                            onChangeText={handleEmailChange}
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
                            onChangeText={handlePasswordChange}
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
                        {(errorMessage || isError) && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>
                                    {errorMessage || error?.message || 'Invalid email or password.'}
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