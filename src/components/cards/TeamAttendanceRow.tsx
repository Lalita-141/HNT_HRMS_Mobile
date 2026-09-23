import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface MemberAttendance {
    id: string;
    name: string;
    initials: string;
    status: 'Present' | 'WFH' | 'Absent' | 'On Leave';
}

interface TeamAttendanceRowProps {
    members?: MemberAttendance[];
    extraCount?: number;
    onViewAllPress?: () => void;
    onMemberPress?: (member: MemberAttendance) => void;
}

const DEFAULT_MEMBERS: MemberAttendance[] = [
    { id: '1', name: 'Anurag', initials: 'AS', status: 'Present' },
    { id: '2', name: 'Pooja', initials: 'PG', status: 'Present' },
    { id: '3', name: 'Rohit', initials: 'RS', status: 'WFH' },
    { id: '4', name: 'Neha', initials: 'NA', status: 'Present' },
    { id: '5', name: 'Vikram', initials: 'VK', status: 'Absent' },
];

const TeamAttendanceRow: React.FC<TeamAttendanceRowProps> = ({
    members = DEFAULT_MEMBERS,
    extraCount = 5,
    onViewAllPress,
    onMemberPress,
}) => {
    const getStatusColor = (status: MemberAttendance['status']) => {
        switch (status) {
            case 'Present':
                return colors.success;
            case 'WFH':
                return colors.info;
            case 'Absent':
                return colors.error;
            case 'On Leave':
                return colors.warning;
            default:
                return colors.neutral400;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Team Attendance (Today)</Text>
                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* Avatar List Card */}
            <View style={styles.card}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}>
                    {members.map(member => {
                        const statusColor = getStatusColor(member.status);

                        return (
                            <TouchableOpacity
                                key={member.id}
                                style={styles.memberItem}
                                onPress={() => onMemberPress?.(member)}
                                activeOpacity={0.7}>
                                <View style={styles.avatarWrapper}>
                                    <View style={styles.avatarCircle}>
                                        <Text style={styles.initialsText}>
                                            {member.initials}
                                        </Text>
                                    </View>
                                    {/* Presence Dot */}
                                    <View
                                        style={[
                                            styles.presenceDot,
                                            { backgroundColor: statusColor },
                                        ]}
                                    />
                                </View>
                                <Text style={styles.memberName} numberOfLines={1}>
                                    {member.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.memberStatus,
                                        { color: statusColor },
                                    ]}>
                                    {member.status}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}

                    {/* Extra Count Circle */}
                    {extraCount > 0 && (
                        <TouchableOpacity
                            style={styles.memberItem}
                            onPress={onViewAllPress}
                            activeOpacity={0.7}>
                            <View style={styles.avatarWrapper}>
                                <View style={styles.extraCircle}>
                                    <Text style={styles.extraText}>+{extraCount}</Text>
                                </View>
                            </View>
                            <Text style={styles.memberName}>Others</Text>
                            <Text style={styles.memberStatus}>View</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
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
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberItem: {
        alignItems: 'center',
        marginRight: spacing.lg,
        width: 52,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 4,
    },
    avatarCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.surfaceSubtle,
        borderWidth: 1.5,
        borderColor: colors.borderLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialsText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.neutral800,
    },
    presenceDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.white,
    },
    memberName: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.neutral950,
        textAlign: 'center',
    },
    memberStatus: {
        fontSize: 9,
        fontWeight: '600',
        marginTop: 1,
        textAlign: 'center',
    },
    extraCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.primarySoft,
        borderWidth: 1.5,
        borderColor: '#B7E8D2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    extraText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.primaryDark,
    },
});

export default TeamAttendanceRow;
