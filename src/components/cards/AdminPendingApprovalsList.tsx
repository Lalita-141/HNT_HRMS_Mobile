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

export interface AdminApprovalRow {
    id: string;
    count: number;
    title: string;
    iconEmoji: string;
    iconColor: string;
    bgColor: string;
}

const DEFAULT_ADMIN_APPROVALS: AdminApprovalRow[] = [
    {
        id: '1',
        count: 12,
        title: 'Leave Requests',
        iconEmoji: '📝',
        iconColor: '#E11D48',
        bgColor: '#FFE4E6',
    },
    {
        id: '2',
        count: 3,
        title: 'Regularization',
        iconEmoji: '⏱️',
        iconColor: '#1D68ED',
        bgColor: '#EFF6FF',
    },
    {
        id: '3',
        count: 4,
        title: 'WFH Requests',
        iconEmoji: '🏠',
        iconColor: '#8B5CF6',
        bgColor: '#F5F3FF',
    },
    {
        id: '4',
        count: 2,
        title: 'Comp Off',
        iconEmoji: '⛱️',
        iconColor: '#FE7717',
        bgColor: '#FEF3C7',
    },
];

const AdminPendingApprovalsList: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <View style={styles.titleWithBadge}>
                    <Text style={styles.sectionTitle}>Pending Approvals</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>16</Text>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* List Card */}
            <View style={styles.cardContainer}>
                {DEFAULT_ADMIN_APPROVALS.map((item, index) => {
                    const isLast = index === DEFAULT_ADMIN_APPROVALS.length - 1;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.row, !isLast && styles.rowBorder]}
                            activeOpacity={0.7}>
                            <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
                                <Text style={styles.emoji}>{item.iconEmoji}</Text>
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
        backgroundColor: colors.error,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
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
        paddingVertical: spacing.md,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral100,
    },
    iconWrap: {
        width: 38,
        height: 38,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    emoji: {
        fontSize: 16,
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
        fontWeight: '600',
        color: colors.neutral800,
    },
});

export default AdminPendingApprovalsList;
