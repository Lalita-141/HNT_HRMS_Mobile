import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import {
    CalendarIcon,
    LocationPinIcon,
    OfficeBuildingIcon,
} from '../icons/SvgIcons';

export type AttendanceMethod = 'biometric' | 'location';

interface AttendanceSummaryCardProps {
    checkInTime?: string;
    statusText?: string;
    method?: AttendanceMethod;
    workplaceName?: string;
    workplaceAddress?: string;
    dateFormatted?: string;
    onCheckOutPress?: () => void;
    onMethodToggle?: () => void;
}

const AttendanceSummaryCard: React.FC<AttendanceSummaryCardProps> = ({
    checkInTime = '09:17 AM',
    statusText = 'Present',
    method = 'biometric',
    workplaceName = 'Office',
    workplaceAddress = 'DLF Cyber City, Gurugram',
    dateFormatted = 'Thu, 11 Sep 2026',
    onCheckOutPress,
    onMethodToggle,
}) => {
    const isBiometric = method === 'biometric';

    return (
        <View style={styles.card}>
            {/* Top Primary Attendance Status */}
            <View style={styles.topSection}>
                {/* Method Icon Circle */}
                <TouchableOpacity
                    onPress={onMethodToggle}
                    activeOpacity={0.8}
                    style={[
                        styles.iconCircle,
                        isBiometric ? styles.biometricCircle : styles.locationCircle,
                    ]}>
                    {isBiometric ? (
                        <Text style={styles.fingerprintEmoji}>👆</Text>
                    ) : (
                        <LocationPinIcon size={26} color={colors.info} />
                    )}
                </TouchableOpacity>

                {/* Main Check-In Time & Status */}
                <View style={styles.statusInfo}>
                    <View style={styles.presentRow}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>{statusText}</Text>
                    </View>

                    <Text style={styles.timeText}>{checkInTime}</Text>
                    <Text style={styles.checkedInLabel}>Checked In</Text>
                </View>

                {/* Method Pill Badge */}
                <View
                    style={[
                        styles.methodBadge,
                        isBiometric ? styles.biometricBadge : styles.locationBadge,
                    ]}>
                    <Text
                        style={[
                            styles.methodBadgeText,
                            isBiometric
                                ? styles.biometricBadgeText
                                : styles.locationBadgeText,
                        ]}>
                        {isBiometric ? 'Marked via Biometric' : 'Marked via Location'}
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Bottom Meta Information (Office location + Today Date) */}
            <View style={styles.metaRow}>
                {/* Office Info */}
                <View style={styles.metaCol}>
                    <View style={styles.metaIconWrap}>
                        <OfficeBuildingIcon size={16} color={colors.primary} />
                    </View>
                    <View style={styles.metaTextWrap}>
                        <Text style={styles.metaTitle}>{workplaceName}</Text>
                        <Text style={styles.metaSubtitle} numberOfLines={1}>
                            {workplaceAddress}
                        </Text>
                    </View>
                </View>

                {/* Date Info */}
                <View style={styles.metaColRight}>
                    <View style={styles.metaIconWrap}>
                        <CalendarIcon size={16} color={colors.primary} />
                    </View>
                    <View style={styles.metaTextWrap}>
                        <Text style={styles.metaTitle}>Today</Text>
                        <Text style={styles.metaSubtitle}>{dateFormatted}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.lg,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'relative',
    },
    iconCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    biometricCircle: {
        backgroundColor: colors.primarySoft,
        borderWidth: 1.5,
        borderColor: '#B7E8D2',
    },
    locationCircle: {
        backgroundColor: colors.infoLight,
        borderWidth: 1.5,
        borderColor: '#BFDBFE',
    },
    fingerprintEmoji: {
        fontSize: 26,
    },
    statusInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    presentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: colors.success,
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.success,
    },
    timeText: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.neutral950,
        letterSpacing: -0.5,
    },
    checkedInLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.neutral600,
    },
    methodBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    biometricBadge: {
        backgroundColor: colors.primarySoft,
    },
    locationBadge: {
        backgroundColor: colors.infoLight,
    },
    methodBadgeText: {
        fontSize: 10,
        fontWeight: '600',
    },
    biometricBadgeText: {
        color: colors.primary,
    },
    locationBadgeText: {
        color: colors.info,
    },
    divider: {
        height: 1,
        backgroundColor: colors.neutral100,
        marginVertical: spacing.md,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaCol: {
        flex: 1.2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaColRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    metaIconWrap: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    metaTextWrap: {
        flexShrink: 1,
    },
    metaTitle: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.neutral900,
    },
    metaSubtitle: {
        fontSize: 10,
        color: colors.neutral600,
    },
});

export default AttendanceSummaryCard;
