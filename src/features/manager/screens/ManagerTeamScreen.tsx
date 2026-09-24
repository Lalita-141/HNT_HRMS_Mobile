import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import DashboardHeader from '../../../components/common/DashboardHeader';
import WorkspaceToggle, { WorkspaceMode } from '../../../components/common/WorkspaceToggle';
import TeamSnapshotGrid from '../../../components/cards/TeamSnapshotGrid';
import TeamLeaveDonutCard from '../../../components/cards/TeamLeaveDonutCard';
import PendingApprovalsCard from '../../../components/cards/PendingApprovalsCard';
import TeamAttendanceRow from '../../../components/cards/TeamAttendanceRow';
import PeopleMomentsCard from '../../../components/cards/PeopleMomentsCard';
import BottomTabBar, { TabKey } from '../../../components/navigation/BottomTabBar';

import { useAuth } from '../../../context/AuthContext';
import { useDrawer } from '../../../context/DrawerContext';

interface ManagerTeamScreenProps {
    onSwitchToWorkspace?: () => void;
    onMenuPress?: () => void;
}

const ManagerTeamScreen: React.FC<ManagerTeamScreenProps> = ({
    onSwitchToWorkspace,
    onMenuPress,
}) => {
    const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('team');
    const [activeTab, setActiveTab] = useState<TabKey>('Home');
    const { userName } = useAuth();
    const { openDrawer } = useDrawer();

    const handleToggleWorkspace = (mode: WorkspaceMode) => {
        setWorkspaceMode(mode);
        if (mode === 'workspace' && onSwitchToWorkspace) {
            onSwitchToWorkspace();
        }
    };

    const handleMenuPress = () => {
        if (onMenuPress) {
            onMenuPress();
        } else {
            openDrawer('Manager');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                {/* Global Authenticated Header */}
                <DashboardHeader
                    userName={userName || 'Sampat Kolekar'}
                    greeting="Good Morning,"
                    notificationCount={1}
                    onMenuPress={handleMenuPress}
                />

                {/* Main Scrollable Content */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    {/* Segmented Switcher: My Workspace vs My Team */}
                    <WorkspaceToggle
                        activeMode={workspaceMode}
                        onToggle={handleToggleWorkspace}
                    />

                    {/* Team Snapshots (5 KPI Metrics) */}
                    <TeamSnapshotGrid />

                    {/* Team Leave Overview (Donut Chart & Breakdown) */}
                    <TeamLeaveDonutCard />

                    {/* Pending Approvals */}
                    <PendingApprovalsCard totalBadgeCount={16} />

                    {/* Team Attendance Today */}
                    <TeamAttendanceRow extraCount={5} />

                    {/* People Moments (Birthdays & Anniversaries) */}
                    <PeopleMomentsCard />
                </ScrollView>

                {/* Floating Bottom Navigation Tab Bar */}
                <BottomTabBar
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 4,
        paddingBottom: 20,
    },
});

export default ManagerTeamScreen;
