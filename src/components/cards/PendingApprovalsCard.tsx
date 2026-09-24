import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { ArrowRightIcon, FlightApprovalIcon } from '../icons/SvgIcons';

export interface ApprovalTile {
    id: string;
    count: number;
    title: string;
    icon?: React.ReactNode;
    color?: string;
    bgColor: string;
    iconBgColor: string;
}

interface PendingApprovalsCardProps {
    totalBadgeCount?: number;
    items?: ApprovalTile[];
    onTilePress?: (tile: ApprovalTile) => void;
    onViewAllPress?: () => void;
}

const DEFAULT_TILES: ApprovalTile[] = [
    {
        id: 'leave',
        count: 12,
        title: 'Leave Requests',
        bgColor: '#FFF0F2',
        iconBgColor: '#FFE4E8',
    },
    {
        id: 'reg',
        count: 3,
        title: 'Regularization',
        bgColor: '#F0F9FF',
        iconBgColor: '#E0F2FE',
    },
    {
        id: 'wfh',
        count: 1,
        title: 'WFH Requests',
        bgColor: '#F5F3FF',
        iconBgColor: '#EDE9FE',
    },
];

const PendingApprovalsCard: React.FC<PendingApprovalsCardProps> = ({
    totalBadgeCount = 16,
    items = DEFAULT_TILES,
    onTilePress,
    onViewAllPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <View style={styles.titleWithBadge}>
                    <Text style={styles.sectionTitle}>Pending Approvals</Text>
                    {totalBadgeCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{totalBadgeCount}</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    onPress={onViewAllPress}
                    activeOpacity={0.7}
                    style={styles.viewAllBtn}
                    accessibilityRole="button">
                    <Text style={styles.viewAllText}>View All</Text>
                    <ArrowRightIcon size={14} color="#2A9246" />
                </TouchableOpacity>
            </View>

            {/* Tiles Row */}
            <View style={styles.grid}>
                {items.map(tile => (
                    <TouchableOpacity
                        key={tile.id}
                        style={[styles.tile, { backgroundColor: tile.bgColor }]}
                        onPress={() => onTilePress?.(tile)}
                        activeOpacity={0.8}
                        accessibilityLabel={`${tile.title}: ${tile.count}`}>
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: tile.iconBgColor },
                            ]}>
                            {tile.icon || (
                                <FlightApprovalIcon size={16} color="#0F172A" />
                            )}
                        </View>

                        <Text style={styles.countText}>{tile.count}</Text>

                        <Text style={styles.titleText} numberOfLines={1}>
                            {tile.title}
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
    titleWithBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
        letterSpacing: -0.2,
    },
    badge: {
        backgroundColor: '#FF2D55',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        marginLeft: 6,
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '700',
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
        gap: 10,
    },
    tile: {
        flex: 1,
        borderRadius: 18,
        padding: 12,
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    countText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        lineHeight: 22,
    },
    titleText: {
        fontSize: 11.5,
        fontWeight: '500',
        color: '#475569',
        marginTop: 2,
    },
});

export default React.memo(PendingApprovalsCard);
