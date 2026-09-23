import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { DocumentIcon } from '../icons/SvgIcons';

export interface ApprovalTile {
    id: string;
    count: number;
    title: string;
    iconEmoji: string;
    color: string;
    bgColor: string;
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
        iconEmoji: '📝',
        color: '#CB30E0',
        bgColor: '#FDF2F8',
    },
    {
        id: 'reg',
        count: 3,
        title: 'Regularization',
        iconEmoji: '⏱️',
        color: colors.info,
        bgColor: colors.infoLight,
    },
    {
        id: 'wfh',
        count: 1,
        title: 'WFH Requests',
        iconEmoji: '🏠',
        color: colors.primaryDark,
        bgColor: colors.primarySoft,
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

                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* Tiles Row */}
            <View style={styles.grid}>
                {items.map(tile => (
                    <TouchableOpacity
                        key={tile.id}
                        style={[styles.tile, { backgroundColor: tile.bgColor }]}
                        onPress={() => onTilePress?.(tile)}
                        activeOpacity={0.8}>
                        <View style={styles.topRow}>
                            <Text style={styles.icon}>{tile.iconEmoji}</Text>
                            <Text style={[styles.count, { color: tile.color }]}>
                                {tile.count}
                            </Text>
                        </View>
                        <Text
                            style={[styles.title, { color: colors.neutral900 }]}
                            numberOfLines={1}>
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
    },
    badge: {
        backgroundColor: colors.error,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 1,
        marginLeft: 6,
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '700',
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.primary,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    tile: {
        flex: 1,
        borderRadius: 16,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    icon: {
        fontSize: 14,
    },
    count: {
        fontSize: 17,
        fontWeight: '700',
    },
    title: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
});

export default PendingApprovalsCard;
