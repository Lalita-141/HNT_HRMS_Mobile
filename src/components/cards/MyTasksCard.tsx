import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { ChevronRightIcon, TaskDocIcon } from '../icons/SvgIcons';

export interface TaskItem {
    id: string;
    title: string;
    dueDate: string;
    iconColor: string;
    bgColor: string;
}

interface MyTasksCardProps {
    totalBadgeCount?: number;
    tasks?: TaskItem[];
    onViewAllPress?: () => void;
    onTaskPress?: (task: TaskItem) => void;
}

const DEFAULT_TASKS: TaskItem[] = [
    {
        id: '1',
        title: 'KRA Self Appraisal',
        dueDate: 'Due: 20 Sep 2026',
        iconColor: '#8B5CF6',
        bgColor: '#F5F3FF',
    },
    {
        id: '2',
        title: 'Submit Training Feedback',
        dueDate: 'Due: 25 Sep 2026',
        iconColor: '#1D68ED',
        bgColor: '#EFF6FF',
    },
    {
        id: '3',
        title: 'Update Team Goals',
        dueDate: 'Due: 30 Sep 2026',
        iconColor: '#E11D48',
        bgColor: '#FFF1F2',
    },
];

const MyTasksCard: React.FC<MyTasksCardProps> = ({
    totalBadgeCount = 5,
    tasks = DEFAULT_TASKS,
    onViewAllPress,
    onTaskPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <View style={styles.titleWithBadge}>
                    <Text style={styles.sectionTitle}>My Tasks & Approvals</Text>
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

            {/* Task List */}
            <View style={styles.cardContainer}>
                {tasks.map((task, index) => {
                    const isLast = index === tasks.length - 1;

                    return (
                        <TouchableOpacity
                            key={task.id}
                            style={[styles.taskRow, !isLast && styles.rowBorder]}
                            onPress={() => onTaskPress?.(task)}
                            activeOpacity={0.7}>
                            <View style={[styles.iconWrap, { backgroundColor: task.bgColor }]}>
                                <TaskDocIcon size={16} color={task.iconColor} />
                            </View>

                            <View style={styles.taskInfo}>
                                <Text style={styles.taskTitle}>{task.title}</Text>
                                <Text style={styles.taskDue}>{task.dueDate}</Text>
                            </View>

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
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
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
    taskRow: {
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
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.neutral950,
    },
    taskDue: {
        fontSize: 11,
        color: colors.neutral600,
        marginTop: 2,
    },
});

export default MyTasksCard;
