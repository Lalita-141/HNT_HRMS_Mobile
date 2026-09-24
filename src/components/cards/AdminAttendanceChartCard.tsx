import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Circle, G, Rect, Path } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { ChevronRightIcon } from '../icons/SvgIcons';

export interface AttendanceBreakdownItem {
    label: string;
    count: number;
    percent: number;
    color: string;
}

interface AdminAttendanceChartCardProps {
    totalEmployees?: number;
    data?: AttendanceBreakdownItem[];
    onViewAllPress?: () => void;
    onTrendPress?: () => void;
}

const DEFAULT_ATTENDANCE_DATA: AttendanceBreakdownItem[] = [
    { label: 'Present', count: 198, percent: 79.8, color: '#16A34A' },
    { label: 'On Leave', count: 28, percent: 11.3, color: '#3B82F6' },
    { label: 'WFH', count: 12, percent: 4.8, color: '#EF4444' },
    { label: 'Absent', count: 10, percent: 4.0, color: '#C026D3' },
];

const AdminAttendanceChartCard: React.FC<AdminAttendanceChartCardProps> = ({
    totalEmployees = 248,
    data = DEFAULT_ATTENDANCE_DATA,
    onViewAllPress,
    onTrendPress,
}) => {
    // Exact Donut Chart Parameters
    const size = 86;
    const center = size / 2;
    const radius = 32;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius; // ~201.06

    let accumulatedFraction = 0;
    const segments = data.map(item => {
        const fraction = item.count / totalEmployees;
        const strokeDasharray = `${circumference * fraction} ${circumference * (1 - fraction)}`;
        const strokeDashoffset = -circumference * accumulatedFraction;
        accumulatedFraction += fraction;
        return {
            ...item,
            strokeDasharray,
            strokeDashoffset,
        };
    });

    return (
        <View style={styles.container}>
            {/* Section Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>People & Attendance</Text>
                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* Main White Container Card */}
            <View style={styles.card}>
                <View style={styles.contentRow}>
                    {/* 1. Left: Multi-Segment SVG Donut Chart */}
                    <View style={styles.chartWrapper}>
                        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                            <G rotation="-90" origin={`${center}, ${center}`}>
                                {/* Background Circle */}
                                <Circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    stroke="#F1F5F9"
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />
                                {/* Colored Donut Slices */}
                                {segments.map((seg, idx) => (
                                    <Circle
                                        key={idx}
                                        cx={center}
                                        cy={center}
                                        r={radius}
                                        stroke={seg.color}
                                        strokeWidth={strokeWidth}
                                        strokeDasharray={seg.strokeDasharray}
                                        strokeDashoffset={seg.strokeDashoffset}
                                        strokeLinecap="butt"
                                        fill="none"
                                    />
                                ))}
                            </G>
                        </Svg>
                        {/* Center Value */}
                        <View style={styles.centerTextContainer}>
                            <Text style={styles.totalNumber}>{totalEmployees}</Text>
                            <Text style={styles.totalLabel}>Employees</Text>
                        </View>
                    </View>

                    {/* 2. Middle: Tight, Clean Legend */}
                    <View style={styles.legendContainer}>
                        {data.map((item, idx) => (
                            <View key={idx} style={styles.legendRow}>
                                <View style={[styles.dot, { backgroundColor: item.color }]} />
                                <Text style={styles.legendLabel} numberOfLines={1}>
                                    {item.label}
                                </Text>
                                <Text style={styles.legendCount}>{item.count}</Text>
                                <Text style={styles.legendPercent}>{item.percent}%</Text>
                            </View>
                        ))}
                    </View>

                    {/* 3. Right: Attendance Trend Card */}
                    <TouchableOpacity
                        style={styles.trendCard}
                        onPress={onTrendPress}
                        activeOpacity={0.8}>
                        {/* Trend Header */}
                        <View style={styles.trendHeader}>
                            {/* Mini Pie / Clock Icon */}
                            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M21.21 15.89A10 10 0 1 1 8 2.83"
                                    stroke="#16A34A"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                                <Path
                                    d="M22 12A10 10 0 0 0 12 2v10z"
                                    fill="#16A34A"
                                    stroke="#16A34A"
                                    strokeWidth="2.5"
                                />
                            </Svg>
                            <Text style={styles.trendTitle}>
                                Attendance{'\n'}Trend
                            </Text>
                            <ChevronRightIcon size={12} color="#94A3B8" />
                        </View>

                        {/* Trend Mini Bar Chart Image / SVG */}
                        <View style={styles.barsWrapper}>
                            <Svg width={76} height={34} viewBox="0 0 76 34">
                                <Rect x={2} y={18} width={6} height={16} rx={3} fill="#86EFAC" />
                                <Rect x={14} y={6} width={6} height={28} rx={3} fill="#4ADE80" />
                                <Rect x={26} y={16} width={6} height={18} rx={3} fill="#86EFAC" />
                                <Rect x={38} y={10} width={6} height={24} rx={3} fill="#22C55E" />
                                <Rect x={50} y={4} width={6} height={30} rx={3} fill="#16A34A" />
                                <Rect x={62} y={0} width={6} height={34} rx={3} fill="#15803D" />
                            </Svg>
                        </View>
                    </TouchableOpacity>
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
        paddingHorizontal: spacing.sm,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chartWrapper: {
        width: 86,
        height: 86,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    centerTextContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalNumber: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
        lineHeight: 18,
    },
    totalLabel: {
        fontSize: 8,
        color: colors.neutral600,
        fontWeight: '500',
        marginTop: 1,
    },
    legendContainer: {
        flex: 1,
        paddingHorizontal: 6,
        justifyContent: 'center',
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
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
        flex: 1,
    },
    legendCount: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.neutral950,
        marginRight: 4,
    },
    legendPercent: {
        fontSize: 8.5,
        fontWeight: '400',
        color: colors.neutral400,
        minWidth: 28,
        textAlign: 'right',
    },
    trendCard: {
        width: 100,
        height: 78,
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        padding: 6,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        justifyContent: 'space-between',
    },
    trendHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    trendTitle: {
        fontSize: 8.5,
        fontWeight: '700',
        color: colors.neutral900,
        lineHeight: 10,
        flex: 1,
        marginLeft: 4,
    },
    barsWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 2,
    },
});

export default React.memo(AdminAttendanceChartCard);


