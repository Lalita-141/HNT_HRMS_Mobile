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
import AttendanceSummaryCard, { AttendanceMethod } from '../../../components/cards/AttendanceSummaryCard';
import LiveLocationCard from '../../../components/cards/LiveLocationCard';
import WorkBreakMetricsCard from '../../../components/cards/WorkBreakMetricsCard';
import UpcomingLeavesCard from '../../../components/cards/UpcomingLeavesCard';
import UpcomingHolidaysCard from '../../../components/cards/UpcomingHolidaysCard';
import MyTasksCard from '../../../components/cards/MyTasksCard';
import CelebrationBannerCard from '../../../components/cards/CelebrationBannerCard';
import BottomTabBar, { TabKey } from '../../../components/navigation/BottomTabBar';

import { useAuth } from '../../../context/AuthContext';
import { useDrawer } from '../../../context/DrawerContext';

interface EmployeeDashboardScreenProps {
    onSwitchToTeam?: () => void;
    onMenuPress?: () => void;
    showWorkspaceToggle?: boolean;
    hideStandaloneTabBar?: boolean;
}

const EmployeeDashboardScreen: React.FC<EmployeeDashboardScreenProps> = ({
    onSwitchToTeam,
    onMenuPress,
    showWorkspaceToggle = true,
    hideStandaloneTabBar = false,
}) => {
    const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('workspace');
    const [attendanceMethod, setAttendanceMethod] = useState<AttendanceMethod>('biometric');
    const [activeTab, setActiveTab] = useState<TabKey>('Home');
    const [isLocationTrackingOn, setIsLocationTrackingOn] = useState(true);
    const { userName } = useAuth();
    const { openDrawer } = useDrawer();

    const handleToggleWorkspace = (mode: WorkspaceMode) => {
        setWorkspaceMode(mode);
        if (mode === 'team' && onSwitchToTeam) {
            onSwitchToTeam();
        }
    };

    const handleMethodToggle = () => {
        // Toggle between biometric and geolocation modes
        setAttendanceMethod(prev => (prev === 'biometric' ? 'location' : 'biometric'));
    };

    const handleMenuPress = () => {
        if (onMenuPress) {
            onMenuPress();
        } else {
            openDrawer('MainTabs');
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
                    showsVerticalScrollIndicator={false}
                    bounces={true}>
                    {/* Segmented Switcher: My Workspace vs My Team */}
                    {showWorkspaceToggle && (
                        <WorkspaceToggle
                            activeMode={workspaceMode}
                            onToggle={handleToggleWorkspace}
                        />
                    )}

                    {/* Attendance Summary Card (Biometric / Geolocation) */}
                    <AttendanceSummaryCard
                        checkInTime="09:17 AM"
                        statusText="Present"
                        method={attendanceMethod}
                        workplaceName="Office"
                        workplaceAddress="DLF Cyber City, Gurugram"
                        dateFormatted="Thu, 11 Sep 2026"
                        onMethodToggle={handleMethodToggle}
                    />

                    {/* Conditional Live Location Tracking Card (When method is location) */}
                    {attendanceMethod === 'location' && (
                        <LiveLocationCard
                            isTrackingOn={isLocationTrackingOn}
                            onToggleTracking={setIsLocationTrackingOn}
                            lastUpdatedTime="09:24 AM"
                            locationName="DLF Cyber City, Gurugram"
                            isWithinAllowedArea={true}
                        />
                    )}

                    {/* Work / Break Hours Metrics */}
                    <WorkBreakMetricsCard
                        workHours="7h 46m"
                        breakHours="45m"
                    />

                    {/* Upcoming Leaves */}
                    <UpcomingLeavesCard />

                    {/* Upcoming Holidays */}
                    <UpcomingHolidaysCard />

                    {/* My Tasks & Approvals (5 pending badge) */}
                    <MyTasksCard totalBadgeCount={5} />

                    {/* People Moments / Birthday Celebration Card */}
                    <CelebrationBannerCard
                        title="Happy Birthday!"
                        subtitle="It's your special day!"
                    />
                </ScrollView>

                {/* Floating Bottom Navigation Tab Bar (if standalone) */}
                {!hideStandaloneTabBar && (
                    <BottomTabBar
                        activeTab={activeTab}
                        onSelectTab={setActiveTab}
                    />
                )}
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
        paddingBottom: 28,
    },
});

export default EmployeeDashboardScreen;
