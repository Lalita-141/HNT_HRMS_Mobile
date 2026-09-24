import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { ChevronRightIcon } from '../icons/SvgIcons';

export interface HolidayItem {
    id: string;
    day: string;
    month: string;
    name: string;
    type: string;
}

interface UpcomingHolidaysCardProps {
    holidays?: HolidayItem[];
    onViewAllPress?: () => void;
    onHolidayPress?: (holiday: HolidayItem) => void;
}

const DEFAULT_HOLIDAYS: HolidayItem[] = [
    {
        id: '1',
        day: '02',
        month: 'Oct',
        name: 'Gandhi Jayanti',
        type: 'National Holiday',
    },
    {
        id: '2',
        day: '12',
        month: 'Nov',
        name: 'Diwali',
        type: 'Restricted Holiday',
    },
];

const UpcomingHolidaysCard: React.FC<UpcomingHolidaysCardProps> = ({
    holidays = DEFAULT_HOLIDAYS,
    onViewAllPress,
    onHolidayPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Upcoming Holidays</Text>
                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            <View style={styles.cardContainer}>
                {holidays.map((holiday, index) => {
                    const isLast = index === holidays.length - 1;

                    return (
                        <TouchableOpacity
                            key={holiday.id}
                            style={[styles.holidayRow, !isLast && styles.rowBorder]}
                            onPress={() => onHolidayPress?.(holiday)}
                            activeOpacity={0.7}>
                            {/* Left Date Box */}
                            <View style={styles.dateBox}>
                                <Text style={styles.dayText}>{holiday.day}</Text>
                                <Text style={styles.monthText}>{holiday.month}</Text>
                            </View>

                            {/* Middle Info */}
                            <View style={styles.holidayInfo}>
                                <Text style={styles.holidayName}>{holiday.name}</Text>
                                <View style={styles.badgeWrapper}>
                                    <View style={styles.typeBadge}>
                                        <Text style={styles.typeBadgeText}>{holiday.type}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Right Chevron */}
                            <ChevronRightIcon size={16} color={colors.neutral400} />
                        </TouchableOpacity>
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
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    holidayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    dateBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFFBEB',
        borderWidth: 1,
        borderColor: '#FEF3C7',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    dayText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#92400E',
        lineHeight: 15,
    },
    monthText: {
        fontSize: 9,
        fontWeight: '600',
        color: '#B45309',
        textTransform: 'uppercase',
    },
    holidayInfo: {
        flex: 1,
    },
    holidayName: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.neutral950,
        marginBottom: 3,
    },
    badgeWrapper: {
        flexDirection: 'row',
    },
    typeBadge: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    typeBadgeText: {
        fontSize: 9,
        fontWeight: '600',
        color: '#B45309',
    },
});

export default React.memo(UpcomingHolidaysCard);

