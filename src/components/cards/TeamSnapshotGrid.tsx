import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface SnapshotItem {
    label: string;
    value: number | string;
    color: string;
    bgColor: string;
    iconEmoji?: string;
}

interface TeamSnapshotGridProps {
    items?: SnapshotItem[];
    onItemPress?: (item: SnapshotItem) => void;
}

const DEFAULT_SNAPSHOTS: SnapshotItem[] = [
    {
        label: 'Team Members',
        value: 24,
        color: colors.primaryDark,
        bgColor: colors.primarySoft,
        iconEmoji: '👥',
    },
    {
        label: 'Present',
        value: 17,
        color: colors.successDark,
        bgColor: colors.successLight,
        iconEmoji: '🌱',
    },
    {
        label: 'On Leave',
        value: 3,
        color: colors.warning,
        bgColor: colors.warningLight,
        iconEmoji: '⛱️',
    },
    {
        label: 'WFH',
        value: 2,
        color: colors.info,
        bgColor: colors.infoLight,
        iconEmoji: '🏠',
    },
    {
        label: 'Absent',
        value: 2,
        color: colors.error,
        bgColor: colors.errorLight,
        iconEmoji: '⚠️',
    },
];

const TeamSnapshotGrid: React.FC<TeamSnapshotGridProps> = ({
    items = DEFAULT_SNAPSHOTS,
    onItemPress,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Team Snapshots</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.grid}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tile, { backgroundColor: item.bgColor }]}
                        onPress={() => onItemPress?.(item)}
                        activeOpacity={0.8}>
                        {item.iconEmoji && (
                            <Text style={styles.emoji}>{item.iconEmoji}</Text>
                        )}
                        <Text style={[styles.value, { color: item.color }]}>
                            {item.value}
                        </Text>
                        <Text style={[styles.label, { color: item.color }]} numberOfLines={1}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
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
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 6,
    },
    tile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 2,
        borderRadius: 14,
    },
    emoji: {
        fontSize: 12,
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 18,
    },
    label: {
        fontSize: 8.5,
        fontWeight: '700',
        marginTop: 2,
        textAlign: 'center',
    },
});

export default TeamSnapshotGrid;
