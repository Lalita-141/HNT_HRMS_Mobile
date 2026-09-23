import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface MomentPerson {
    id: string;
    name: string;
    role: string;
    date: string;
    initials: string;
    isToday?: boolean;
}

const BIRTHDAYS: MomentPerson[] = [
    {
        id: '1',
        name: 'Anurag Singh',
        role: 'Software Developer',
        date: 'Today',
        initials: 'AS',
        isToday: true,
    },
    {
        id: '2',
        name: 'Neha Arora',
        role: 'UI/UX Designer',
        date: '12 Sep',
        initials: 'NA',
    },
    {
        id: '3',
        name: 'Aisha Khan',
        role: 'QA Engineer',
        date: '14 Sep',
        initials: 'AK',
    },
];

const ANNIVERSARIES: MomentPerson[] = [
    {
        id: '4',
        name: 'Vikram Mehta',
        role: 'Tech Lead (3 yrs)',
        date: 'Today',
        initials: 'VM',
        isToday: true,
    },
    {
        id: '5',
        name: 'Pooja Gupta',
        role: 'HR Manager (2 yrs)',
        date: '18 Sep',
        initials: 'PG',
    },
];

const PeopleMomentsCard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'birthdays' | 'anniversaries'>('birthdays');
    const data = activeTab === 'birthdays' ? BIRTHDAYS : ANNIVERSARIES;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>People Moments (My Team)</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* Card Content */}
            <View style={styles.card}>
                {/* Segment Tabs */}
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[
                            styles.tabItem,
                            activeTab === 'birthdays' && styles.activeTabItem,
                        ]}
                        onPress={() => setActiveTab('birthdays')}
                        activeOpacity={0.7}>
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'birthdays' && styles.activeTabText,
                            ]}>
                            🎂 Birthdays
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabItem,
                            activeTab === 'anniversaries' && styles.activeTabItem,
                        ]}
                        onPress={() => setActiveTab('anniversaries')}
                        activeOpacity={0.7}>
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'anniversaries' && styles.activeTabText,
                            ]}>
                            🎉 Work Anniversaries
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* List */}
                <View style={styles.list}>
                    {data.map((person, index) => {
                        const isLast = index === data.length - 1;

                        return (
                            <View
                                key={person.id}
                                style={[styles.personRow, !isLast && styles.rowBorder]}>
                                <View style={styles.avatarCircle}>
                                    <Text style={styles.avatarInitials}>
                                        {person.initials}
                                    </Text>
                                </View>

                                <View style={styles.infoCol}>
                                    <Text style={styles.nameText}>{person.name}</Text>
                                    <Text style={styles.roleText}>{person.role}</Text>
                                </View>

                                <View
                                    style={[
                                        styles.dateBadge,
                                        person.isToday
                                            ? styles.todayBadge
                                            : styles.normalDateBadge,
                                    ]}>
                                    <Text
                                        style={[
                                            styles.dateText,
                                            person.isToday && styles.todayDateText,
                                        ]}>
                                        {person.date}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
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
    tabBar: {
        flexDirection: 'row',
        backgroundColor: colors.surfaceSubtle,
        borderRadius: 12,
        padding: 3,
        marginBottom: spacing.md,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    activeTabItem: {
        backgroundColor: colors.white,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tabText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.neutral600,
    },
    activeTabText: {
        color: colors.primaryDark,
        fontWeight: '700',
    },
    list: {
        paddingHorizontal: spacing.xs,
    },
    personRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral100,
    },
    avatarCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    avatarInitials: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.primaryDark,
    },
    infoCol: {
        flex: 1,
    },
    nameText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.neutral950,
    },
    roleText: {
        fontSize: 11,
        color: colors.neutral600,
        marginTop: 1,
    },
    dateBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    todayBadge: {
        backgroundColor: colors.primarySoft,
    },
    normalDateBadge: {
        backgroundColor: colors.surfaceSubtle,
    },
    dateText: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.neutral800,
    },
    todayDateText: {
        color: colors.primaryDark,
        fontWeight: '700',
    },
});

export default PeopleMomentsCard;
