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
    BarChartIcon,
    CalendarIcon,
    FileTextIcon,
    UserPlusIcon,
} from '../icons/SvgIcons';

export interface QuickActionItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    iconBgColor: string;
    cardBgColor: string;
}

interface AdminQuickActionsProps {
    actions?: QuickActionItem[];
    onActionPress?: (action: QuickActionItem) => void;
}

const DEFAULT_ACTIONS: QuickActionItem[] = [
    {
        id: 'add_emp',
        title: 'Add\nEmployee',
        icon: <UserPlusIcon size={18} color="#FFFFFF" />,
        iconBgColor: '#16A34A',
        cardBgColor: '#EDFBF4',
    },
    {
        id: 'holidays',
        title: 'Manage\nHolidays',
        icon: <CalendarIcon size={18} color="#FFFFFF" />,
        iconBgColor: '#2563EB',
        cardBgColor: '#EFF6FF',
    },
    {
        id: 'policy',
        title: 'Leave\nPolicy',
        icon: <FileTextIcon size={18} color="#FFFFFF" />,
        iconBgColor: '#8B5CF6',
        cardBgColor: '#F5F3FF',
    },
    {
        id: 'reports',
        title: 'Reports',
        icon: <BarChartIcon size={18} color="#FFFFFF" />,
        iconBgColor: '#E11D48',
        cardBgColor: '#FFF1F2',
    },
];

const AdminQuickActions: React.FC<AdminQuickActionsProps> = ({
    actions = DEFAULT_ACTIONS,
    onActionPress,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>

            <View style={styles.grid}>
                {actions.map(action => (
                    <TouchableOpacity
                        key={action.id}
                        style={[styles.card, { backgroundColor: action.cardBgColor }]}
                        onPress={() => onActionPress?.(action)}
                        activeOpacity={0.7}>
                        <View style={[styles.iconContainer, { backgroundColor: action.iconBgColor }]}>
                            {action.icon}
                        </View>
                        <Text style={styles.title}>{action.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.xxl,
    },
    headerRow: {
        marginBottom: spacing.sm,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    card: {
        width: '48.5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: spacing.md,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    iconContainer: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    title: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.neutral900,
        lineHeight: 15,
    },
});

export default React.memo(AdminQuickActions);

