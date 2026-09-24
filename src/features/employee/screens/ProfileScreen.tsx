import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { useAuth } from '../../../context/AuthContext';
import DashboardHeader from '../../../components/common/DashboardHeader';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { BiometricService, BiometryType } from '../../../services/biometric/biometricService';
import {
    FaceIdIcon,
    FingerprintIcon,
    ShieldSecurityIcon,
} from '../../../components/icons/SvgIcons';

const ProfileScreen = () => {
    const { userName, userRoles, userEmail, employeeId, logout } = useAuth();
    const [biometricType, setBiometricType] = useState<BiometryType>('None');
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
    const [isLoadingBiometrics, setIsLoadingBiometrics] = useState(true);

    const displayName = userName || 'Sampat Kolekar';
    const displayEmail = userEmail || 's.kolekar@handt.ai';
    const displayEmpId = employeeId || 'HNT-2026-084';

    // Load initial biometric status on screen mount
    useEffect(() => {
        const checkBiometricStatus = async () => {
            try {
                const { isSupported, type } = await BiometricService.getBiometricType();
                const hasSaved = await BiometricService.hasSavedCredentials();
                setIsBiometricSupported(isSupported);
                setBiometricType(type);
                setIsBiometricEnabled(hasSaved);
            } catch (err) {
                console.warn('Error checking biometric status:', err);
            } finally {
                setIsLoadingBiometrics(false);
            }
        };

        checkBiometricStatus();
    }, []);

    // Handle toggle change
    const handleToggleBiometrics = async (value: boolean) => {
        if (!isBiometricSupported) {
            Alert.alert(
                'Biometrics Not Available',
                'Your device does not support biometric authentication or it is not enrolled in device settings.'
            );
            return;
        }

        if (value) {
            // User is enabling biometrics -> save active session credentials
            const success = await BiometricService.enableBiometricsForActiveSession();
            if (success) {
                setIsBiometricEnabled(true);
                const typeLabel = biometricType === 'FaceID' ? 'Face ID' : 'Fingerprint';
                Alert.alert(
                    'Biometric Login Enabled',
                    `${typeLabel} has been successfully activated. You can now use it to log in instantly.`
                );
            } else {
                Alert.alert(
                    'Setup Failed',
                    'Could not enable biometric login. Please ensure you are logged in with valid credentials.'
                );
            }
        } else {
            // User is disabling biometrics -> ask for confirmation
            const typeLabel = biometricType === 'FaceID' ? 'Face ID' : 'Fingerprint';
            Alert.alert(
                `Disable ${typeLabel}?`,
                `Are you sure you want to disable biometric login for ${displayName}? You will need to enter your password on the next login.`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Disable',
                        style: 'destructive',
                        onPress: async () => {
                            await BiometricService.removeBiometrics();
                            setIsBiometricEnabled(false);
                        },
                    },
                ]
            );
        }
    };

    const getBiometricLabel = () => {
        if (biometricType === 'FaceID') return 'Face ID Login';
        if (biometricType === 'TouchID') return 'Touch ID Login';
        return 'Fingerprint / Biometric Login';
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <DashboardHeader userName={displayName} greeting="My Profile," />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    {/* Profile Summary Card */}
                    <View style={styles.card}>
                        <View style={styles.avatarLarge}>
                            <Text style={styles.avatarText}>
                                {displayName
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </Text>
                        </View>
                        <Text style={styles.userName}>{displayName}</Text>
                        <Text style={styles.designation}>Software Developer</Text>
                        <View style={styles.roleBadge}>
                            <Text style={styles.roleBadgeText}>
                                {userRoles.join(' • ') || 'EMPLOYEE'}
                            </Text>
                        </View>
                    </View>

                    {/* Security & Biometrics Card */}
                    <View style={styles.securityCard}>
                        <View style={styles.cardHeaderRow}>
                            <ShieldSecurityIcon size={20} color={colors.primary} />
                            <Text style={styles.cardSectionTitle}>Security &amp; Login</Text>
                        </View>

                        <View style={styles.divider} />

                        {isLoadingBiometrics ? (
                            <View style={styles.loadingRow}>
                                <ActivityIndicator size="small" color={colors.primary} />
                                <Text style={styles.loadingText}>Checking biometric sensor...</Text>
                            </View>
                        ) : (
                            <View style={styles.biometricRow}>
                                <View style={styles.biometricIconWrap}>
                                    {biometricType === 'FaceID' ? (
                                        <FaceIdIcon size={22} color={colors.primary} />
                                    ) : (
                                        <FingerprintIcon size={22} color={colors.primary} />
                                    )}
                                </View>

                                <View style={styles.biometricTextWrap}>
                                    <View style={styles.biometricTitleRow}>
                                        <Text style={styles.biometricTitle}>{getBiometricLabel()}</Text>
                                        <View
                                            style={[
                                                styles.statusPill,
                                                isBiometricEnabled
                                                    ? styles.statusPillActive
                                                    : styles.statusPillInactive,
                                            ]}>
                                            <Text
                                                style={[
                                                    styles.statusPillText,
                                                    isBiometricEnabled
                                                        ? styles.statusPillTextActive
                                                        : styles.statusPillTextInactive,
                                                ]}>
                                                {isBiometricEnabled ? 'ENABLED' : 'DISABLED'}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.biometricSubtitle}>
                                        {isBiometricSupported
                                            ? 'Fast, secure 1-tap authentication on launch'
                                            : 'Hardware not available on this device'}
                                    </Text>
                                </View>

                                <Switch
                                    value={isBiometricEnabled}
                                    onValueChange={handleToggleBiometrics}
                                    disabled={!isBiometricSupported}
                                    trackColor={{ false: '#E2E8F0', true: colors.primary }}
                                    thumbColor={colors.white}
                                    ios_backgroundColor="#E2E8F0"
                                />
                            </View>
                        )}
                    </View>

                    {/* Information Details Card */}
                    <View style={styles.detailsCard}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Employee ID</Text>
                            <Text style={styles.detailValue}>{displayEmpId}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Email</Text>
                            <Text style={styles.detailValue}>{displayEmail}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Department</Text>
                            <Text style={styles.detailValue}>Engineering</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Work Location</Text>
                            <Text style={styles.detailValue}>DLF Cyber City, Gurugram</Text>
                        </View>
                    </View>

                    {/* Logout Button */}
                    <View style={styles.buttonWrapper}>
                        <PrimaryButton
                            title="Sign Out"
                            onPress={logout}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.white },
    container: { flex: 1, backgroundColor: colors.surface },
    scroll: { flex: 1 },
    scrollContent: { paddingTop: spacing.xs, paddingBottom: spacing.xl },
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.lg,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    avatarLarge: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.primaryDark,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    avatarText: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '700',
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral950,
    },
    designation: {
        fontSize: 13,
        color: colors.neutral600,
        marginTop: 2,
    },
    roleBadge: {
        backgroundColor: colors.primarySoft,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
    },
    roleBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.primaryDark,
    },
    securityCard: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.md,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    cardSectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.neutral900,
        marginLeft: 8,
    },
    loadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
    },
    loadingText: {
        fontSize: 12,
        color: colors.neutral600,
        marginLeft: 8,
    },
    biometricRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.xs,
    },
    biometricIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    biometricTextWrap: {
        flex: 1,
        marginRight: 8,
    },
    biometricTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    biometricTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.neutral900,
        marginRight: 6,
    },
    statusPill: {
        paddingHorizontal: 6,
        paddingVertical: 1.5,
        borderRadius: 6,
    },
    statusPillActive: {
        backgroundColor: '#ECFDF5',
    },
    statusPillInactive: {
        backgroundColor: colors.neutral100,
    },
    statusPillText: {
        fontSize: 9,
        fontWeight: '700',
    },
    statusPillTextActive: {
        color: '#059669',
    },
    statusPillTextInactive: {
        color: colors.neutral600,
    },
    biometricSubtitle: {
        fontSize: 11,
        color: colors.neutral600,
        marginTop: 2,
    },
    detailsCard: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.md,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    detailLabel: {
        fontSize: 13,
        color: colors.neutral600,
    },
    detailValue: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.neutral900,
    },
    divider: {
        height: 1,
        backgroundColor: colors.neutral100,
        marginVertical: spacing.xs,
    },
    buttonWrapper: {
        marginHorizontal: spacing.lg,
    },
});

export default ProfileScreen;

