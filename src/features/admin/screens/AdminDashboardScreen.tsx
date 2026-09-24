import React, { useCallback, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { useAuth } from '../../../context/AuthContext';
import DashboardHeader from '../../../components/common/DashboardHeader';
import AppDrawerModal, { RoleScreenTarget } from '../../../components/common/AppDrawerModal';
import AdminKpiGrid from '../../../components/cards/AdminKpiGrid';
import AdminAttendanceChartCard from '../../../components/cards/AdminAttendanceChartCard';
import LeaveUtilizationCard from '../../../components/cards/LeaveUtilizationCard';
import AdminPendingApprovalsList from '../../../components/cards/AdminPendingApprovalsList';
import UpcomingHolidaysCard from '../../../components/cards/UpcomingHolidaysCard';
import CelebrationBannerCard from '../../../components/cards/CelebrationBannerCard';
import AdminQuickActions from '../../../components/cards/AdminQuickActions';
import BottomTabBar, { TabKey } from '../../../components/navigation/BottomTabBar';

interface AdminDashboardScreenProps {
    onMenuPress?: () => void;
    onNavigateRole?: (route: RoleScreenTarget) => void;
    onNotificationPress?: () => void;
    onAvatarPress?: () => void;
}

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
    onMenuPress,
    onNavigateRole,
    onNotificationPress,
    onAvatarPress,
}) => {
    const [activeTab, setActiveTab] = useState<TabKey>('Home');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { userName } = useAuth();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate background query refetch / sync
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, []);

    const handleMenuPress = () => {
        if (onMenuPress) {
            onMenuPress();
        } else {
            setIsDrawerOpen(true);
        }
    };

    const handleNavigate = (route: RoleScreenTarget) => {
        setIsDrawerOpen(false);
        onNavigateRole?.(route);
    };

    const handleQuickAction = (action: { id: string; title: string }) => {
        Alert.alert(action.title.replace('\n', ' '), `Navigating to ${action.title.replace('\n', ' ')} management...`);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                {/* Global Authenticated Header */}
                <DashboardHeader
                    userName={userName || 'Ismail Akhtar'}
                    greeting="Good Morning,"
                    notificationCount={1}
                    onMenuPress={handleMenuPress}
                    onNotificationPress={onNotificationPress}
                    onAvatarPress={onAvatarPress}
                />

                {/* Main Scrollable Content */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                    overScrollMode="never"
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                        />
                    }>
                    {/* Operational KPI Cards (Total, New Joinees, On Leave, WFH) */}
                    <AdminKpiGrid />

                    {/* People & Attendance Donut Chart + Attendance Trend Mini Chart */}
                    <AdminAttendanceChartCard
                        onViewAllPress={() => Alert.alert('People & Attendance', 'Opening detailed attendance report...')}
                        onTrendPress={() => Alert.alert('Attendance Trend', 'Opening 30-day attendance trend analytics...')}
                    />

                    {/* Leave Overview Summary */}
                    <LeaveUtilizationCard
                        onViewAllPress={() => Alert.alert('Leave Overview', 'Opening enterprise leave quota breakdown...')}
                    />

                    {/* Pending Approvals List */}
                    <AdminPendingApprovalsList
                        onViewAllPress={() => Alert.alert('Pending Approvals', 'Opening full approval inbox...')}
                        onItemPress={item => Alert.alert(item.title, `Opening ${item.count} ${item.title} for review...`)}
                    />

                    {/* People Moments / Birthday Celebration Card */}
                    <CelebrationBannerCard
                        title="Happy Birthday!"
                        subtitle="It's your special day!"
                        onViewAllPress={() => Alert.alert('People Moments', 'Opening team celebrations and anniversaries...')}
                    />

                    {/* Upcoming Holidays */}
                    <UpcomingHolidaysCard
                        onViewAllPress={() => Alert.alert('Holidays Calendar', 'Opening complete holiday calendar...')}
                        onHolidayPress={holiday => Alert.alert(holiday.name, `${holiday.name} on ${holiday.day} ${holiday.month} (${holiday.type})`)}
                    />

                    {/* Admin Quick Actions (2x2 Grid) */}
                    <AdminQuickActions onActionPress={handleQuickAction} />
                </ScrollView>

                {/* Bottom Navigation Tab Bar */}
                <BottomTabBar
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                />

                {/* Side Drawer Modal for Role Switching */}
                <AppDrawerModal
                    visible={isDrawerOpen}
                    activeRoute="Admin"
                    onClose={() => setIsDrawerOpen(false)}
                    onNavigate={handleNavigate}
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
        paddingTop: 6,
        paddingBottom: 28,
    },
});

export default React.memo(AdminDashboardScreen);


