import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import {
    AirplaneIcon,
    ChevronRightIcon,
    ClockIcon,
    TaskDocIcon,
} from '../icons/SvgIcons';

export interface AdminApprovalRow {
    id: string;
    count: number;
    title: string;
    icon: React.ReactNode;
    bgColor: string;
}

interface AdminPendingApprovalsListProps {
    data?: AdminApprovalRow[];
    totalCount?: number;
    onViewAllPress?: () => void;
    onItemPress?: (item: AdminApprovalRow) => void;
}

const DEFAULT_ADMIN_APPROVALS: AdminApprovalRow[] = [
    {
        id: '1',
        count: 12,
        title: 'Leave Requests',
        icon: <TaskDocIcon size={18} color="#E11D48" />,
        bgColor: '#FFF1F2',
    },
    {
        id: '2',
        count: 3,
        title: 'Regularization',
        icon: <ClockIcon size={18} color="#1D68ED" />,
        bgColor: '#EFF6FF',
    },
    {
        id: '3',
        count: 4,
        title: 'WFH Requests',
        icon: <AirplaneIcon size={18} color="#8B5CF6" />,
        bgColor: '#F5F3FF',
    },
    {
        id: '4',
        count: 2,
        title: 'Comp Off',
        icon: <TaskDocIcon size={18} color="#3B82F6" />,
        bgColor: '#EFF6FF',
    },
];


const AdminPendingApprovalsList: React.FC<AdminPendingApprovalsListProps> = ({
    data = DEFAULT_ADMIN_APPROVALS,
    totalCount = 18,
    onViewAllPress,
    onItemPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <View style={styles.titleWithBadge}>
                    <Text style={styles.sectionTitle}>Pending Approvals</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{totalCount}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* List Card */}
            <View style={styles.cardContainer}>
                {data.map((item, index) => {
                    const isLast = index === data.length - 1;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.row, !isLast && styles.rowBorder]}
                            onPress={() => onItemPress?.(item)}
                            activeOpacity={0.7}>
                            <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
                                {item.icon}
                            </View>

                            <View style={styles.info}>
                                <Text style={styles.countText}>{item.count}</Text>
                                <Text style={styles.titleText}>{item.title}</Text>
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
    titleWithBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
    },
    badge: {
        backgroundColor: '#FF2D55',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        marginLeft: 6,
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '700',
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.primary,
    },
    cardContainer: {
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    countText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.neutral950,
        marginRight: 6,
    },
    titleText: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.neutral800,
    },
});

export default React.memo(AdminPendingApprovalsList);

