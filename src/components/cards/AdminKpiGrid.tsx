import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import {
    AirplaneIcon,
    HomeBuildingIcon,
    UserPlusIcon,
    UsersGroupIcon,
} from '../icons/SvgIcons';

export interface AdminKpiItem {
    id: string;
    title: string;
    value: string | number;
    subtext: string;
    badgeText?: string;
    badgeColor?: string;
    iconComponent: React.ReactNode;
    iconBgColor: string;
}

interface AdminKpiGridProps {
    data?: AdminKpiItem[];
}

const DEFAULT_KPIS: AdminKpiItem[] = [
    {
        id: 'total',
        title: 'Total\nEmployees',
        value: '248',
        badgeText: '↑ 12%',
        badgeColor: colors.success,
        subtext: 'vs last month',
        iconBgColor: '#DCFCE7',
        iconComponent: <UsersGroupIcon size={18} color="#16A34A" />,
    },
    {
        id: 'new',
        title: 'New\nJoinees',
        value: '8',
        subtext: 'This Month',
        iconBgColor: '#FEF3C7',
        iconComponent: <UserPlusIcon size={18} color="#FE7717" />,
    },
    {
        id: 'leave',
        title: 'On Leave\nToday',
        value: '28',
        subtext: '11.3%',
        iconBgColor: '#EFF6FF',
        iconComponent: <AirplaneIcon size={18} color="#1D68ED" />,
    },
    {
        id: 'wfh',
        title: 'On WFH\nToday',
        value: '12',
        subtext: '4.8%',
        iconBgColor: '#FFF1F2',
        iconComponent: <HomeBuildingIcon size={18} color="#E11D48" />,
    },
];

const AdminKpiGrid: React.FC<AdminKpiGridProps> = ({
    data = DEFAULT_KPIS,
}) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={false}>
                {data.map(kpi => (
                    <View key={kpi.id} style={styles.card}>
                        {/* Top Icon with rounded tint background */}
                        <View style={[styles.iconContainer, { backgroundColor: kpi.iconBgColor }]}>
                            {kpi.iconComponent}
                        </View>

                        {/* Title */}
                        <Text style={styles.title} numberOfLines={2}>
                            {kpi.title}
                        </Text>

                        {/* Value & Optional Badge */}
                        <View style={styles.valueRow}>
                            <Text style={styles.value}>{kpi.value}</Text>
                            {kpi.badgeText && (
                                <Text style={[styles.badgeText, { color: kpi.badgeColor || colors.success }]}>
                                    {kpi.badgeText}
                                </Text>
                            )}
                        </View>

                        {/* Subtext */}
                        <Text style={styles.subtext} numberOfLines={1}>
                            {kpi.subtext}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
        flexDirection: 'row',
    },
    card: {
        width: 82,
        minWidth: 80,
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 9.5,
        fontWeight: '500',
        color: colors.neutral600,
        lineHeight: 12,
        minHeight: 24,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 3,
        marginTop: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.neutral950,
        lineHeight: 20,
    },
    badgeText: {
        fontSize: 8.5,
        fontWeight: '700',
    },
    subtext: {
        fontSize: 8,
        color: colors.neutral400,
        marginTop: 2,
    },
});

export default React.memo(AdminKpiGrid);

