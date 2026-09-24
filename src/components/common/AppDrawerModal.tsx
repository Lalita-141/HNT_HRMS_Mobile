import React from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useAuth } from '../../context/AuthContext';
import SmallLogoSvg from '../../assets/svg/SmallLogo.svg';
import {
    AwardIcon,
    BarChartIcon,
    CalendarIcon,
    DocumentIcon,
    HomeBuildingIcon,
    HomeIcon,
    UserIcon,
    UserPlusIcon,
    UsersGroupIcon,
} from '../icons/SvgIcons';

export type RoleScreenTarget = 'MainTabs' | 'Manager' | 'Admin' | 'SuperAdmin';

interface AppDrawerModalProps {
    visible: boolean;
    activeRoute?: RoleScreenTarget;
    onClose: () => void;
    onNavigate: (route: RoleScreenTarget) => void;
}

const AppDrawerModal: React.FC<AppDrawerModalProps> = ({
    visible,
    activeRoute = 'Admin',
    onClose,
    onNavigate,
}) => {
    const { userName, userRoles, logout } = useAuth();

    const handleSelectRole = (route: RoleScreenTarget) => {
        onClose();
        setTimeout(() => {
            onNavigate(route);
        }, 150);
    };

    const handleLogout = () => {
        onClose();
        logout();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            <View style={styles.overlay}>
                {/* Backdrop Touch to Dismiss */}
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.backdrop} />
                </TouchableWithoutFeedback>

                {/* Sliding Drawer Container */}
                <SafeAreaView style={styles.drawerContent} edges={['top', 'bottom']}>
                    {/* Header Tenant / Brand */}
                    <View style={styles.brandHeader}>
                        <View style={styles.brandLogoRow}>
                            <SmallLogoSvg width={40} height={26} />
                            <View style={styles.tenantInfo}>
                                <Text style={styles.tenantName}>Hare &amp; Turtle HRMS</Text>
                                <Text style={styles.tenantSub}>Multi-Tenant Enterprise</Text>
                            </View>
                        </View>

                        {/* User Card */}
                        <View style={styles.userCard}>
                            <View style={styles.userAvatar}>
                                <Text style={styles.avatarInitials}>
                                    {(userName || 'IA')
                                        .split(' ')
                                        .map(n => n[0])
                                        .join('')
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.userDetails}>
                                <Text style={styles.userNameText} numberOfLines={1}>
                                    {userName || 'Sampat Kolekar'}
                                </Text>
                                <View style={styles.roleBadge}>
                                    <Text style={styles.roleBadgeText}>
                                        {userRoles.some(r => r.toUpperCase().includes('SUPER'))
                                            ? 'Super Admin'
                                            : userRoles.some(r => r.toUpperCase().includes('ADMIN'))
                                            ? 'Admin'
                                            : userRoles.some(r => r.toUpperCase().includes('MANAGER'))
                                            ? 'Team Manager'
                                            : userRoles[0] || 'Employee'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    {/* Navigation Items / Role Switching */}
                    <View style={styles.menuList}>
                        <Text style={styles.sectionHeader}>DASHBOARD ROLES</Text>

                        {/* Employee Workspace */}
                        <TouchableOpacity
                            style={[
                                styles.menuItem,
                                activeRoute === 'MainTabs' && styles.activeMenuItem,
                            ]}
                            onPress={() => handleSelectRole('MainTabs')}
                            activeOpacity={0.7}>
                            <View
                                style={[
                                    styles.menuIconWrap,
                                    activeRoute === 'MainTabs' && styles.activeMenuIconWrap,
                                ]}>
                                <HomeIcon
                                    size={18}
                                    color={activeRoute === 'MainTabs' ? colors.white : colors.primary}
                                />
                            </View>
                            <View style={styles.menuTextWrap}>
                                <Text
                                    style={[
                                        styles.menuTitle,
                                        activeRoute === 'MainTabs' && styles.activeMenuTitle,
                                    ]}>
                                    Employee Workspace
                                </Text>
                                <Text style={styles.menuDesc}>Attendance, Leaves &amp; Tasks</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Manager - My Team */}
                        <TouchableOpacity
                            style={[
                                styles.menuItem,
                                activeRoute === 'Manager' && styles.activeMenuItem,
                            ]}
                            onPress={() => handleSelectRole('Manager')}
                            activeOpacity={0.7}>
                            <View
                                style={[
                                    styles.menuIconWrap,
                                    activeRoute === 'Manager' && styles.activeMenuIconWrap,
                                ]}>
                                <UsersGroupIcon
                                    size={18}
                                    color={activeRoute === 'Manager' ? colors.white : '#2563EB'}
                                />
                            </View>
                            <View style={styles.menuTextWrap}>
                                <Text
                                    style={[
                                        styles.menuTitle,
                                        activeRoute === 'Manager' && styles.activeMenuTitle,
                                    ]}>
                                    My Team (Manager)
                                </Text>
                                <Text style={styles.menuDesc}>Team Roster &amp; Moments</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Admin / SuperAdmin Dashboard */}
                        <TouchableOpacity
                            style={[
                                styles.menuItem,
                                activeRoute === 'Admin' && styles.activeMenuItem,
                            ]}
                            onPress={() => handleSelectRole('Admin')}
                            activeOpacity={0.7}>
                            <View
                                style={[
                                    styles.menuIconWrap,
                                    activeRoute === 'Admin' && styles.activeMenuIconWrap,
                                ]}>
                                <BarChartIcon
                                    size={18}
                                    color={activeRoute === 'Admin' ? colors.white : '#E11D48'}
                                />
                            </View>
                            <View style={styles.menuTextWrap}>
                                <Text
                                    style={[
                                        styles.menuTitle,
                                        activeRoute === 'Admin' && styles.activeMenuTitle,
                                    ]}>
                                    Admin Dashboard
                                </Text>
                                <Text style={styles.menuDesc}>Operations, Approvals &amp; KPIs</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Footer Logout */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleLogout}
                            activeOpacity={0.7}>
                            <Text style={styles.logoutText}>Sign Out</Text>
                        </TouchableOpacity>
                        <Text style={styles.versionText}>v0.0.1 • Hare &amp; Turtle HRMS</Text>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
    },
    backdrop: {
        flex: 1,
    },
    drawerContent: {
        width: '82%',
        maxWidth: 340,
        height: '100%',
        backgroundColor: colors.white,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.lg,
        justifyContent: 'space-between',
        shadowColor: colors.neutral950,
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 16,
    },
    brandHeader: {
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral100,
        paddingBottom: spacing.lg,
    },
    brandLogoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    tenantInfo: {
        marginLeft: spacing.sm,
    },
    tenantName: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.neutral950,
    },
    tenantSub: {
        fontSize: 10,
        color: colors.neutral600,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceSubtle,
        borderRadius: 14,
        padding: spacing.sm,
    },
    userAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.primaryDark,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    avatarInitials: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '700',
    },
    userDetails: {
        flex: 1,
    },
    userNameText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.neutral950,
    },
    roleBadge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.primarySoft,
        paddingHorizontal: 6,
        paddingVertical: 1.5,
        borderRadius: 6,
        marginTop: 2,
    },
    roleBadgeText: {
        fontSize: 9,
        fontWeight: '700',
        color: colors.primaryDark,
    },
    menuList: {
        flex: 1,
        paddingTop: spacing.lg,
    },
    sectionHeader: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.neutral400,
        letterSpacing: 0.8,
        marginBottom: spacing.md,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: spacing.sm,
        borderRadius: 14,
        marginBottom: spacing.xs,
    },
    activeMenuItem: {
        backgroundColor: colors.primarySoft,
    },
    menuIconWrap: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: colors.surfaceSubtle,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    activeMenuIconWrap: {
        backgroundColor: colors.primaryDark,
    },
    menuTextWrap: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.neutral900,
    },
    activeMenuTitle: {
        color: colors.primaryDark,
        fontWeight: '700',
    },
    menuDesc: {
        fontSize: 10,
        color: colors.neutral600,
        marginTop: 1,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: colors.neutral100,
        paddingTop: spacing.md,
        alignItems: 'center',
    },
    logoutButton: {
        width: '100%',
        backgroundColor: '#FFF1F2',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    logoutText: {
        color: colors.error,
        fontSize: 13,
        fontWeight: '700',
    },
    versionText: {
        fontSize: 10,
        color: colors.neutral400,
    },
});

export default React.memo(AppDrawerModal);
