import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { CalendarIcon, ChevronRightIcon } from '../icons/SvgIcons';

export interface HolidayItem {
    id: string;
    name: string;
    date: string;
    type: string;
}

interface UpcomingHolidaysCardProps {
    holidays?: HolidayItem[];
    onViewAllPress?: () => void;
}

const DEFAULT_HOLIDAYS: HolidayItem[] = [
    {
        id: '1',
        name: 'Gandhi Jayanti',
        date: '02 Oct, Fri',
        type: 'National Holiday',
    },
    {
        id: '2',
        name: 'Diwali',
        date: '12 Nov, Thu',
        type: 'Gazetted Holiday',
    },
];

const UpcomingHolidaysCard: React.FC<UpcomingHolidaysCardProps> = ({
    holidays = DEFAULT_HOLIDAYS,
    onViewAllPress,
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
                        <View
                            key={holiday.id}
                            style={[styles.holidayRow, !isLast && styles.rowBorder]}>
                            <View style={styles.iconWrap}>
                                <CalendarIcon size={18} color={colors.warning} />
                            </View>

                            <View style={styles.holidayInfo}>
                                <Text style={styles.holidayName}>{holiday.name}</Text>
                                <Text style={styles.holidayDate}>{holiday.date}</Text>
                            </View>

                            <View style={styles.typeBadge}>
                                <Text style={styles.typeBadgeText}>{holiday.type}</Text>
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
        marginBottom: spacing.lg,
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
        paddingVertical: spacing.md,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral100,
    },
    iconWrap: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: colors.warningLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    holidayInfo: {
        flex: 1,
    },
    holidayName: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.neutral950,
    },
    holidayDate: {
        fontSize: 11,
        color: colors.neutral600,
        marginTop: 2,
    },
    typeBadge: {
        backgroundColor: colors.surfaceSubtle,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeBadgeText: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.neutral800,
    },
});

export default UpcomingHolidaysCard;
