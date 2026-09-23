import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface LeaveProgressItem {
    id: string;
    label: string;
    code: string;
    used: number;
    total: number;
    color: string;
}

const DEFAULT_UTILIZATION: LeaveProgressItem[] = [
    { id: 'el', label: 'Earned Leave', code: 'EL', used: 124, total: 208, color: colors.leaveEL },
    { id: 'cl', label: 'Casual Leave', code: 'CL', used: 56, total: 80, color: colors.leaveCL },
    { id: 'sl', label: 'Sick Leave', code: 'SL', used: 32, total: 60, color: colors.leaveSL },
    { id: 'ml', label: 'Maternity Leave', code: 'ML', used: 18, total: 26, color: colors.leaveML },
    { id: 'pl', label: 'Paternity Leave', code: 'PL', used: 10, total: 20, color: colors.leavePL },
    { id: 'co', label: 'Comp Off', code: 'CO', used: 8, total: 15, color: colors.leaveCO },
];

const LeaveUtilizationCard: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Leave Overview</Text>
            </View>

            {/* List */}
            <View style={styles.card}>
                {DEFAULT_UTILIZATION.map(item => {
                    const percent = Math.min(Math.round((item.used / item.total) * 100), 100);

                    return (
                        <View key={item.id} style={styles.itemRow}>
                            <View style={styles.labelRow}>
                                <View style={styles.leftLabel}>
                                    <View style={[styles.dot, { backgroundColor: item.color }]} />
                                    <Text style={styles.itemTitle}>
                                        {item.label} ({item.code})
                                    </Text>
                                </View>
                                <Text style={styles.ratioText}>
                                    <Text style={styles.boldUsed}>{item.used}</Text> / {item.total}
                                </Text>
                            </View>

                            {/* Progress Track */}
                            <View style={styles.track}>
                                <View
                                    style={[
                                        styles.fill,
                                        {
                                            width: `${percent}%`,
                                            backgroundColor: item.color,
                                        },
                                    ]}
                                />
                            </View>
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
        marginBottom: spacing.sm,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
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
    itemRow: {
        marginBottom: spacing.sm,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    leftLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        marginRight: 6,
    },
    itemTitle: {
        fontSize: 11.5,
        fontWeight: '600',
        color: colors.neutral900,
    },
    ratioText: {
        fontSize: 11,
        color: colors.neutral600,
    },
    boldUsed: {
        fontWeight: '700',
        color: colors.neutral950,
    },
    track: {
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.neutral100,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
    },
});

export default LeaveUtilizationCard;
