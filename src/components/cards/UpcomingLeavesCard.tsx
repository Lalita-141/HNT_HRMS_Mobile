import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { ChevronRightIcon } from '../icons/SvgIcons';

export interface LeaveItem {
    id: string;
    day: string;
    month: string;
    title: string;
    description: string;
    status: 'Approved' | 'Pending Approval' | 'Rejected';
}

interface UpcomingLeavesCardProps {
    leaves?: LeaveItem[];
    onViewAllPress?: () => void;
    onLeaveItemPress?: (item: LeaveItem) => void;
}

const DEFAULT_LEAVES: LeaveItem[] = [
    {
        id: '1',
        day: '18',
        month: 'SEP',
        title: 'Casual Leave',
        description: 'Personal Work',
        status: 'Approved',
    },
    {
        id: '2',
        day: '02',
        month: 'OCT',
        title: 'Earned Leave',
        description: 'Family Trip',
        status: 'Pending Approval',
    },
    {
        id: '3',
        day: '17',
        month: 'NOV',
        title: 'Comp Off',
        description: 'Long Weekend',
        status: 'Approved',
    },
];

const UpcomingLeavesCard: React.FC<UpcomingLeavesCardProps> = ({
    leaves = DEFAULT_LEAVES,
    onViewAllPress,
    onLeaveItemPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>My Upcoming Leaves</Text>
                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* Leave List */}
            <View style={styles.listContainer}>
                {leaves.map((leave, index) => {
                    const isApproved = leave.status === 'Approved';
                    const isLast = index === leaves.length - 1;

                    return (
                        <TouchableOpacity
                            key={leave.id}
                            style={[styles.leaveRow, !isLast && styles.rowBorder]}
                            onPress={() => onLeaveItemPress?.(leave)}
                            activeOpacity={0.7}>
                            {/* Date Badge */}
                            <View style={styles.dateBadge}>
                                <Text style={styles.dateDay}>{leave.day}</Text>
                                <Text style={styles.dateMonth}>{leave.month}</Text>
                            </View>

                            {/* Info */}
                            <View style={styles.leaveInfo}>
                                <Text style={styles.leaveTitle}>{leave.title}</Text>
                                <Text style={styles.leaveDesc}>{leave.description}</Text>
                            </View>

                            {/* Status Chip */}
                            <View
                                style={[
                                    styles.statusChip,
                                    isApproved
                                        ? styles.approvedChip
                                        : styles.pendingChip,
                                ]}>
                                <Text
                                    style={[
                                        styles.statusChipText,
                                        isApproved
                                            ? styles.approvedChipText
                                            : styles.pendingChipText,
                                    ]}>
                                    {isApproved ? '● Approved' : '● Pending Approval'}
                                </Text>
                            </View>

                            <ChevronRightIcon size={16} color={colors.neutral400} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.primary,
    },
    listContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    leaveRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral100,
    },
    dateBadge: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: colors.surfaceSubtle,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    dateDay: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
        lineHeight: 17,
    },
    dateMonth: {
        fontSize: 9,
        fontWeight: '700',
        color: colors.neutral600,
        textTransform: 'uppercase',
    },
    leaveInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    leaveTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.neutral900,
    },
    leaveDesc: {
        fontSize: 11,
        color: colors.neutral600,
        marginTop: 2,
    },
    statusChip: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        marginRight: 6,
    },
    approvedChip: {
        backgroundColor: colors.successLight,
    },
    pendingChip: {
        backgroundColor: colors.warningLight,
    },
    statusChipText: {
        fontSize: 9.5,
        fontWeight: '600',
    },
    approvedChipText: {
        color: colors.successDark,
    },
    pendingChipText: {
        color: colors.warning,
    },
});

export default UpcomingLeavesCard;
