import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface LeaveCategory {
    label: string;
    code: string;
    count: number;
    color: string;
}

const CATEGORIES: LeaveCategory[] = [
    { label: 'Earned Leave', code: 'EL', count: 12, color: colors.leaveEL },
    { label: 'Casual Leave', code: 'CL', count: 4, color: colors.leaveCL },
    { label: 'Sick Leave', code: 'SL', count: 4, color: colors.leaveSL },
    { label: 'Maternity Leave', code: 'ML', count: 3, color: colors.leaveML },
    { label: 'Paternity Leave', code: 'PL', count: 2, color: colors.leavePL },
    { label: 'Comp Off', code: 'CO', count: 3, color: colors.leaveCO },
];

const TeamLeaveDonutCard: React.FC = () => {
    const totalLeaves = CATEGORIES.reduce((acc, curr) => acc + curr.count, 0); // 28
    const radius = 40;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius; // ~251.32

    // Precalculate stroke offsets for donut segments
    let cumulativePercent = 0;
    const segments = CATEGORIES.map(cat => {
        const percent = cat.count / totalLeaves;
        const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
        const strokeDashoffset = -circumference * cumulativePercent;
        cumulativePercent += percent;
        return {
            ...cat,
            strokeDasharray,
            strokeDashoffset,
        };
    });

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Team Leave Overview</Text>
                <TouchableOpacity style={styles.monthBadge} activeOpacity={0.7}>
                    <Text style={styles.monthText}>September 2026 ▾</Text>
                </TouchableOpacity>
            </View>

            {/* Content Row: Donut Chart + Legend */}
            <View style={styles.contentRow}>
                {/* Donut Chart with Center Text */}
                <View style={styles.chartWrapper}>
                    <Svg width={110} height={110} viewBox="0 0 110 110">
                        <G rotation="-90" origin="55, 55">
                            {/* Background Track Circle */}
                            <Circle
                                cx="55"
                                cy="55"
                                r={radius}
                                stroke={colors.neutral100}
                                strokeWidth={strokeWidth}
                                fill="none"
                            />
                            {/* Segment Arcs */}
                            {segments.map((seg, idx) => (
                                <Circle
                                    key={idx}
                                    cx="55"
                                    cy="55"
                                    r={radius}
                                    stroke={seg.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={seg.strokeDasharray}
                                    strokeDashoffset={seg.strokeDashoffset}
                                    fill="none"
                                />
                            ))}
                        </G>
                    </Svg>

                    {/* Center Text */}
                    <View style={styles.centerTextContainer}>
                        <Text style={styles.centerLabel}>Total</Text>
                        <Text style={styles.centerValue}>{totalLeaves}</Text>
                        <Text style={styles.centerSub}>On Leave</Text>
                    </View>
                </View>

                {/* Legend Column */}
                <View style={styles.legendContainer}>
                    {CATEGORIES.map((cat, idx) => (
                        <View key={idx} style={styles.legendRow}>
                            <View style={[styles.dot, { backgroundColor: cat.color }]} />
                            <Text style={styles.legendLabel}>
                                {cat.label} ({cat.code})
                            </Text>
                            <Text style={styles.legendCount}>{cat.count}</Text>
                        </View>
                    ))}
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
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
    },
    monthBadge: {
        backgroundColor: colors.surfaceSubtle,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    monthText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.neutral800,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chartWrapper: {
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    centerTextContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerLabel: {
        fontSize: 8.5,
        color: colors.neutral600,
        fontWeight: '500',
    },
    centerValue: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral950,
        lineHeight: 20,
    },
    centerSub: {
        fontSize: 8,
        color: colors.neutral600,
        fontWeight: '500',
    },
    legendContainer: {
        flex: 1,
        marginLeft: spacing.md,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 3,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        marginRight: 6,
    },
    legendLabel: {
        flex: 1,
        fontSize: 11,
        color: colors.neutral800,
        fontWeight: '500',
    },
    legendCount: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.neutral950,
        marginLeft: 6,
    },
});

export default TeamLeaveDonutCard;
