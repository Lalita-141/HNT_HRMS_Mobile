import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import DashboardHeader from '../../../components/common/DashboardHeader';
import AdminKpiGrid from '../../../components/cards/AdminKpiGrid';
import AdminAttendanceChartCard from '../../../components/cards/AdminAttendanceChartCard';
import LeaveUtilizationCard from '../../../components/cards/LeaveUtilizationCard';
import AdminPendingApprovalsList from '../../../components/cards/AdminPendingApprovalsList';
import UpcomingHolidaysCard from '../../../components/cards/UpcomingHolidaysCard';
import AdminQuickActions from '../../../components/cards/AdminQuickActions';
import BottomTabBar, { TabKey } from '../../../components/navigation/BottomTabBar';

interface AdminDashboardScreenProps {
    onMenuPress?: () => void;
}

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
    onMenuPress,
}) => {
    const [activeTab, setActiveTab] = useState<TabKey>('Home');

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                {/* Global Authenticated Header */}
                <DashboardHeader
                    userName="Ismail Akhtar"
                    greeting="Good Morning,"
                    notificationCount={3}
                    onMenuPress={onMenuPress}
                />

                {/* Main Scrollable Content */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={true}>
                    {/* Operational KPI Grid (4 Cards) */}
                    <AdminKpiGrid />

                    {/* People & Attendance Donut Chart + Attendance Trend */}
                    <AdminAttendanceChartCard />

                    {/* Leave Utilization Progress Meters */}
                    <LeaveUtilizationCard />

                    {/* Pending Approvals Vertical List */}
                    <AdminPendingApprovalsList />

                    {/* Upcoming Holidays */}
                    <UpcomingHolidaysCard />

                    {/* Admin Quick Actions */}
                    <AdminQuickActions />
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
        paddingBottom: 28,
    },
});

export default AdminDashboardScreen;
