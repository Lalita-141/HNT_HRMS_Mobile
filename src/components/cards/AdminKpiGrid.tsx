import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { TrendingUpIcon } from '../icons/SvgIcons';

export interface AdminKpiItem {
    id: string;
    title: string;
    value: string | number;
    subtext: string;
    highlightText?: string;
    isPositive?: boolean;
    iconEmoji: string;
}

const DEFAULT_KPIS: AdminKpiItem[] = [
    {
        id: 'total',
        title: 'Total Employees',
        value: '248',
        subtext: 'vs last month',
        highlightText: '↑ 12%',
        isPositive: true,
        iconEmoji: '👥',
    },
    {
        id: 'new',
        title: 'New Joinees',
        value: '8',
        subtext: 'This Month',
        highlightText: 'New',
        isPositive: true,
        iconEmoji: '🌱',
    },
    {
        id: 'leave',
        title: 'On Leave Today',
        value: '28',
        subtext: 'of total staff',
        highlightText: '11.3%',
        iconEmoji: '⛱️',
    },
    {
        id: 'remote',
        title: 'Remote Today',
        value: '12',
        subtext: 'working home',
        highlightText: '4.8%',
        iconEmoji: '🏠',
    },
];

const AdminKpiGrid: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {DEFAULT_KPIS.map(kpi => (
                    <View key={kpi.id} style={styles.card}>
                        <View style={styles.topRow}>
                            <Text style={styles.icon}>{kpi.iconEmoji}</Text>
                            {kpi.highlightText && (
                                <View style={styles.highlightBadge}>
                                    <Text style={styles.highlightText}>
                                        {kpi.highlightText}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.value}>{kpi.value}</Text>
                        <Text style={styles.title} numberOfLines={1}>
                            {kpi.title}
                        </Text>
                        <Text style={styles.subtext}>{kpi.subtext}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    card: {
        width: '48%',
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    icon: {
        fontSize: 16,
    },
    highlightBadge: {
        backgroundColor: colors.primarySoft,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    highlightText: {
        fontSize: 9.5,
        fontWeight: '700',
        color: colors.primaryDark,
    },
    value: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.neutral950,
        lineHeight: 26,
    },
    title: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.neutral800,
        marginTop: 2,
    },
    subtext: {
        fontSize: 10,
        color: colors.neutral600,
        marginTop: 1,
    },
});

export default AdminKpiGrid;
