import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { MyTeamToggleIcon, MyWorkspaceToggleIcon } from '../icons/SvgIcons';

export type WorkspaceMode = 'workspace' | 'team';

interface WorkspaceToggleProps {
    activeMode: WorkspaceMode;
    onToggle: (mode: WorkspaceMode) => void;
}

const WorkspaceToggle: React.FC<WorkspaceToggleProps> = ({
    activeMode,
    onToggle,
}) => {
    return (
        <View style={styles.container}>
            {/* My Workspace Pill */}
            <TouchableOpacity
                style={[
                    styles.pill,
                    activeMode === 'workspace' && styles.activePill,
                ]}
                onPress={() => onToggle('workspace')}
                activeOpacity={0.8}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeMode === 'workspace' }}>
                <MyWorkspaceToggleIcon
                    size={18}
                    color={
                        activeMode === 'workspace'
                            ? colors.white
                            : colors.primaryDark
                    }
                />
                <Text
                    style={[
                        styles.label,
                        activeMode === 'workspace'
                            ? styles.activeLabel
                            : styles.inactiveLabel,
                    ]}>
                    My Workspace
                </Text>
            </TouchableOpacity>

            {/* My Team Pill */}
            <TouchableOpacity
                style={[
                    styles.pill,
                    activeMode === 'team' && styles.activePill,
                ]}
                onPress={() => onToggle('team')}
                activeOpacity={0.8}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeMode === 'team' }}>
                <MyTeamToggleIcon
                    size={18}
                    color={
                        activeMode === 'team'
                            ? colors.white
                            : colors.primaryDark
                    }
                />
                <Text
                    style={[
                        styles.label,
                        activeMode === 'team'
                            ? styles.activeLabel
                            : styles.inactiveLabel,
                    ]}>
                    My Team
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primarySoft,
        borderRadius: 24,
        padding: 4,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    pill: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 9,
        borderRadius: 20,
    },
    activePill: {
        backgroundColor: colors.primaryDark,
        shadowColor: colors.primaryDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 6,
    },
    activeLabel: {
        color: colors.white,
    },
    inactiveLabel: {
        color: colors.primary,
    },
    iconEmoji: {
        fontSize: 14,
    },
});

export default WorkspaceToggle;
