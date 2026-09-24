import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { BellIcon, MenuIcon } from '../icons/SvgIcons';
import SmallLogoSvg from '../../assets/svg/SmallLogo.svg';

interface DashboardHeaderProps {
    userName?: string;
    greeting?: string;
    notificationCount?: number;
    avatarUri?: string;
    onMenuPress?: () => void;
    onNotificationPress?: () => void;
    onAvatarPress?: () => void;
    showLogo?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    userName = 'Ismail Akhtar',
    greeting = 'Good Morning,',
    notificationCount = 1,
    avatarUri,
    onMenuPress,
    onNotificationPress,
    onAvatarPress,
    showLogo = true,
}) => {
    return (
        <View style={styles.container}>
            {/* Left: Drawer Menu Icon */}
            <TouchableOpacity
                onPress={onMenuPress}
                style={styles.iconButton}
                activeOpacity={0.7}
                accessibilityLabel="Open Menu">
                <MenuIcon size={24} color={colors.neutral950} />
            </TouchableOpacity>

            {/* Middle: Brand Small Logo & User Greeting */}
            <View style={styles.centerSection}>
                {showLogo && (
                    <View style={styles.logoWrapper}>
                        <SmallLogoSvg width={42} height={28} />
                    </View>
                )}
                <View style={styles.greetingWrapper}>
                    <Text style={styles.greetingText}>{greeting}</Text>
                    <Text style={styles.userNameText} numberOfLines={1}>
                        {userName}
                    </Text>
                </View>
            </View>

            {/* Right: Notifications & Avatar */}
            <View style={styles.rightSection}>
                <TouchableOpacity
                    onPress={onNotificationPress}
                    style={styles.notificationButton}
                    activeOpacity={0.7}
                    accessibilityLabel="Notifications">
                    <BellIcon size={22} color={colors.neutral900} />
                    {notificationCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onAvatarPress}
                    style={styles.avatarButton}
                    activeOpacity={0.7}
                    accessibilityLabel="User Profile">
                    {avatarUri ? (
                        <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarInitials}>
                                {userName
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: spacing.md,
        backgroundColor: colors.white,
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: spacing.xs,
    },
    logoWrapper: {
        marginRight: spacing.sm,
    },
    greetingWrapper: {
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: 11,
        fontWeight: '400',
        color: colors.neutral600,
        lineHeight: 14,
    },
    userNameText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.neutral950,
        lineHeight: 18,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationButton: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginRight: spacing.xs,
    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: colors.error,
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
        borderWidth: 1.5,
        borderColor: colors.white,
    },
    badgeText: {
        color: colors.white,
        fontSize: 9,
        fontWeight: '700',
    },
    avatarButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: colors.primarySoft,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.primaryDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitials: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '700',
    },
});

export default DashboardHeader;
