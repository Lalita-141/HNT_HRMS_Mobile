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
    AwardIcon,
    LeafIcon,
    PlusCircleIcon,
    RefreshCcwIcon,
    UsersGroupIcon,
} from '../icons/SvgIcons';

export interface LeaveOverviewItem {
    id: string;
    label: string;
    code: string;
    used: number;
    total: number;
    icon: React.ReactNode;
    iconBgColor: string;
}

interface LeaveUtilizationCardProps {
    data?: LeaveOverviewItem[];
    onViewAllPress?: () => void;
}

const DEFAULT_LEAVE_OVERVIEW: LeaveOverviewItem[] = [
    {
        id: 'el',
        label: 'Earned Leave',
        code: 'EL',
        used: 124,
        total: 208,
        iconBgColor: '#DCFCE7',
        icon: <LeafIcon size={16} color="#16A34A" />,
    },
    {
        id: 'cl',
        label: 'Casual Leave',
        code: 'CL',
        used: 56,
        total: 80,
        iconBgColor: '#EFF6FF',
        icon: <RefreshCcwIcon size={16} color="#1D68ED" />,
    },
    {
        id: 'sl',
        label: 'Sick Leave',
        code: 'SL',
        used: 32,
        total: 60,
        iconBgColor: '#FFF1F2',
        icon: <PlusCircleIcon size={16} color="#E11D48" />,
    },
    {
        id: 'ml',
        label: 'Maternity Leave',
        code: 'ML',
        used: 18,
        total: 26,
        iconBgColor: '#FEF3C7',
        icon: <AwardIcon size={16} color="#D97706" />,
    },
    {
        id: 'pl',
        label: 'Paternity Leave',
        code: 'PL',
        used: 10,
        total: 20,
        iconBgColor: '#F5F3FF',
        icon: <UsersGroupIcon size={16} color="#8B5CF6" />,
    },
    {
        id: 'co',
        label: 'Comp Off',
        code: 'CO',
        used: 8,
        total: 15,
        iconBgColor: '#FFFBEB',
        icon: <AwardIcon size={16} color="#F59E0B" />,
    },
];

const LeaveUtilizationCard: React.FC<LeaveUtilizationCardProps> = ({
    data = DEFAULT_LEAVE_OVERVIEW,
    onViewAllPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Leave Overview</Text>
                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* List Card */}
            <View style={styles.card}>
                {data.map((item, idx) => {
                    const isLast = idx === data.length - 1;

                    return (
                        <View
                            key={item.id}
                            style={[styles.itemRow, !isLast && styles.rowBorder]}>
                            {/* Left: Icon & Label */}
                            <View style={styles.leftContent}>
                                <View style={[styles.iconWrap, { backgroundColor: item.iconBgColor }]}>
                                    {item.icon}
                                </View>
                                <Text style={styles.itemTitle}>
                                    {item.label} ({item.code})
                                </Text>
                            </View>

                            {/* Right: Ratio */}
                            <Text style={styles.ratioText}>
                                <Text style={styles.boldUsed}>{item.used}</Text> / {item.total}
                            </Text>
                        </View>
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
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrap: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    itemTitle: {
        fontSize: 12.5,
        fontWeight: '500',
        color: colors.neutral800,
    },
    ratioText: {
        fontSize: 13,
        color: colors.neutral600,
    },
    boldUsed: {
        fontWeight: '700',
        color: colors.neutral950,
    },
});

export default React.memo(LeaveUtilizationCard);

