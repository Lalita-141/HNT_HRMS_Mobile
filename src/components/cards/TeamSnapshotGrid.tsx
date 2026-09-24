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
    ArrowRightIcon,
    SnapshotAbsentIcon,
    SnapshotLeaveIcon,
    SnapshotPresentIcon,
    SnapshotTeamMembersIcon,
    SnapshotWfhIcon,
} from '../icons/SvgIcons';

export type SnapshotIconType = 'team' | 'present' | 'leave' | 'wfh' | 'absent';

export interface SnapshotItem {
    label: string;
    value: number | string;
    color: string;
    bgColor: string;
    iconType?: SnapshotIconType;
    renderIcon?: () => React.ReactNode;
}

interface TeamSnapshotGridProps {
    items?: SnapshotItem[];
    onItemPress?: (item: SnapshotItem) => void;
    onViewAllPress?: () => void;
}

const DEFAULT_SNAPSHOTS: SnapshotItem[] = [
    {
        label: 'Team Members',
        value: 24,
        color: '#228549',
        bgColor: '#EAF7EE',
        iconType: 'team',
    },
    {
        label: 'Present',
        value: 17,
        color: '#209F58',
        bgColor: '#DCFCE7',
        iconType: 'present',
    },
    {
        label: 'On Leave',
        value: 3,
        color: '#D97706',
        bgColor: '#FEF3C7',
        iconType: 'leave',
    },
    {
        label: 'WFH',
        value: 2,
        color: '#2563EB',
        bgColor: '#DBEAFE',
        iconType: 'wfh',
    },
    {
        label: 'Absent',
        value: 2,
        color: '#F43F5E',
        bgColor: '#FFE4E6',
        iconType: 'absent',
    },
];

const TeamSnapshotGrid: React.FC<TeamSnapshotGridProps> = ({
    items = DEFAULT_SNAPSHOTS,
    onItemPress,
    onViewAllPress,
}) => {
    const renderIcon = (item: SnapshotItem) => {
        if (item.renderIcon) {
            return item.renderIcon();
        }
        switch (item.iconType) {
            case 'team':
                return <SnapshotTeamMembersIcon size={18} color={item.color} />;
            case 'present':
                return <SnapshotPresentIcon size={14} color={item.color} />;
            case 'leave':
                return <SnapshotLeaveIcon size={16} color={item.color} />;
            case 'wfh':
                return <SnapshotWfhIcon size={16} color={item.color} />;
            case 'absent':
                return <SnapshotAbsentIcon size={14} color={item.color} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Team Snapshots</Text>
                <TouchableOpacity
                    onPress={onViewAllPress}
                    activeOpacity={0.7}
                    style={styles.viewAllBtn}
                    accessibilityRole="button">
                    <Text style={styles.viewAllText}>View All</Text>
                    <ArrowRightIcon size={14} color="#2A9246" />
                </TouchableOpacity>
            </View>

            {/* 5-Tile Grid */}
            <View style={styles.grid}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tile, { backgroundColor: item.bgColor }]}
                        onPress={() => onItemPress?.(item)}
                        activeOpacity={0.8}
                        accessibilityLabel={`${item.label}: ${item.value}`}>
                        <View style={styles.iconWrap}>{renderIcon(item)}</View>
                        <Text style={[styles.value, { color: item.color }]}>
                            {item.value}
                        </Text>
                        <Text
                            style={[styles.label, { color: item.color }]}
                            numberOfLines={1}>
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
        letterSpacing: -0.2,
    },
    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    viewAllText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2A9246',
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
    iconWrap: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 18,
    },
    label: {
        fontSize: 9,
        fontWeight: '700',
        marginTop: 2,
        textAlign: 'center',
    },
});

export default React.memo(TeamSnapshotGrid);
