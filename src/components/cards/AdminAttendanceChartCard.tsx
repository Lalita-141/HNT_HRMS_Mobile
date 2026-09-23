import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Circle, G, Rect } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface AttendanceBreakdownItem {
    label: string;
    count: number;
    percent: number;
    color: string;
}

const ATTENDANCE_DATA: AttendanceBreakdownItem[] = [
    { label: 'Present', count: 198, percent: 79.8, color: colors.success },
    { label: 'On Leave', count: 28, percent: 11.3, color: colors.warning },
    { label: 'WFH', count: 12, percent: 4.8, color: colors.info },
    { label: 'Absent', count: 10, percent: 4.0, color: colors.error },
];

const TREND_BARS = [14, 20, 26, 18, 30, 24, 32]; // 7 days mini trend

const AdminAttendanceChartCard: React.FC = () => {
    const totalEmployees = 248;
    const radius = 38;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius; // ~238.76

    let cumulativePercent = 0;
    const segments = ATTENDANCE_DATA.map(item => {
        const p = item.percent / 100;
        const strokeDasharray = `${circumference * p} ${circumference * (1 - p)}`;
        const strokeDashoffset = -circumference * cumulativePercent;
        cumulativePercent += p;
        return {
            ...item,
            strokeDasharray,
            strokeDashoffset,
        };
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>People & Attendance</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* Content Card */}
            <View style={styles.card}>
                <View style={styles.topRow}>
                    {/* Left: Donut Chart */}
                    <View style={styles.chartWrapper}>
                        <Svg width={96} height={96} viewBox="0 0 96 96">
                            <G rotation="-90" origin="48, 48">
                                <Circle
                                    cx="48"
                                    cy="48"
                                    r={radius}
                                    stroke={colors.neutral100}
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />
                                {segments.map((seg, idx) => (
                                    <Circle
                                        key={idx}
                                        cx="48"
                                        cy="48"
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
                        <View style={styles.centerText}>
                            <Text style={styles.totalNumber}>{totalEmployees}</Text>
                            <Text style={styles.totalLabel}>Employees</Text>
                        </View>
                    </View>

                    {/* Middle: Legend */}
                    <View style={styles.legendWrapper}>
                        {ATTENDANCE_DATA.map((item, idx) => (
                            <View key={idx} style={styles.legendRow}>
                                <View style={[styles.dot, { backgroundColor: item.color }]} />
                                <Text style={styles.legendLabel}>{item.label}</Text>
                                <Text style={styles.legendValue}>
                                    {item.count}{' '}
                                    <Text style={styles.legendPercent}>
                                        {item.percent}%
                                    </Text>
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Right: Trend Mini Bar Chart */}
                    <View style={styles.trendWrapper}>
                        <Text style={styles.trendTitle}>Attendance Trend</Text>
                        <View style={styles.barsContainer}>
                            <Svg width={50} height={34} viewBox="0 0 50 34">
                                {TREND_BARS.map((val, idx) => {
                                    const barWidth = 4.5;
                                    const x = idx * 7.2;
                                    const y = 34 - val;
                                    return (
                                        <Rect
                                            key={idx}
                                            x={x}
                                            y={y}
                                            width={barWidth}
                                            height={val}
                                            rx={2}
                                            fill={idx === 4 || idx === 6 ? colors.primaryDark : '#86EFAC'}
                                        />
                                    );
                                })}
                            </Svg>
                        </View>
                    </View>
                </View>
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
    },
    chartWrapper: {
        width: 96,
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    centerText: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.neutral950,
        lineHeight: 18,
    },
    totalLabel: {
        fontSize: 8,
        color: colors.neutral600,
        fontWeight: '500',
    },
    legendWrapper: {
        flex: 1,
        paddingHorizontal: spacing.sm,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    legendLabel: {
        fontSize: 10,
        color: colors.neutral800,
        fontWeight: '500',
        width: 46,
    },
    legendValue: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.neutral950,
        marginLeft: 4,
    },
    legendPercent: {
        fontSize: 8.5,
        fontWeight: '400',
        color: colors.neutral600,
    },
    trendWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceSubtle,
        borderRadius: 14,
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    trendTitle: {
        fontSize: 8,
        fontWeight: '700',
        color: colors.primaryDark,
        marginBottom: 4,
        textAlign: 'center',
    },
    barsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AdminAttendanceChartCard;
