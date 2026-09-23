import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface QuickActionItem {
    id: string;
    title: string;
    iconEmoji: string;
    bgColor: string;
}

const ACTIONS: QuickActionItem[] = [
    { id: 'add_emp', title: 'Add Employee', iconEmoji: '👤➕', bgColor: colors.primarySoft },
    { id: 'holidays', title: 'Manage Holidays', iconEmoji: '📅', bgColor: colors.warningLight },
    { id: 'policy', title: 'Leave Policy', iconEmoji: '📜', bgColor: colors.infoLight },
    { id: 'reports', title: 'Reports', iconEmoji: '📊', bgColor: '#FDF2F8' },
];

const AdminQuickActions: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>

            <View style={styles.grid}>
                {ACTIONS.map(action => (
                    <TouchableOpacity
                        key={action.id}
                        style={[styles.tile, { backgroundColor: action.bgColor }]}
                        activeOpacity={0.7}>
                        <Text style={styles.icon}>{action.iconEmoji}</Text>
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
        marginBottom: spacing.lg,
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
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    tile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: 2,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    icon: {
        fontSize: 20,
        marginBottom: 4,
    },
    title: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.neutral900,
        textAlign: 'center',
    },
});

export default AdminQuickActions;
