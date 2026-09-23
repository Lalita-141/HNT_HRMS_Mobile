import React from 'react';
import {
    ScrollView,
    StyleSheet,
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

const ProfileScreen = () => {
    const { userName, userRoles, logout } = useAuth();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <DashboardHeader userName={userName || 'Ismail Akhtar'} greeting="My Profile," />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    {/* Profile Summary Card */}
                    <View style={styles.card}>
                        <View style={styles.avatarLarge}>
                            <Text style={styles.avatarText}>
                                {(userName || 'Ismail Akhtar')
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </Text>
                        </View>
                        <Text style={styles.userName}>{userName || 'Ismail Akhtar'}</Text>
                        <Text style={styles.designation}>Software Developer</Text>
                        <View style={styles.roleBadge}>
                            <Text style={styles.roleBadgeText}>
                                {userRoles.join(' • ') || 'EMPLOYEE'}
                            </Text>
                        </View>
                    </View>

                    {/* Information Details Card */}
                    <View style={styles.detailsCard}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Employee ID</Text>
                            <Text style={styles.detailValue}>HNT-2026-084</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Email</Text>
                            <Text style={styles.detailValue}>ismail.akhtar@handt.ai</Text>
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
    },
    buttonWrapper: {
        marginHorizontal: spacing.lg,
    },
});

export default ProfileScreen;
