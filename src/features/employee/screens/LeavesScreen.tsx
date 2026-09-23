import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import DashboardHeader from '../../../components/common/DashboardHeader';
import TeamLeaveDonutCard from '../../../components/cards/TeamLeaveDonutCard';
import LeaveUtilizationCard from '../../../components/cards/LeaveUtilizationCard';
import UpcomingLeavesCard from '../../../components/cards/UpcomingLeavesCard';

const LeavesScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <DashboardHeader userName="Ismail Akhtar" greeting="Leave Balance," />
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    <TeamLeaveDonutCard />
                    <UpcomingLeavesCard />
                    <LeaveUtilizationCard />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.white },
    container: { flex: 1, backgroundColor: colors.surface },
    scroll: { flex: 1 },
    scrollContent: { paddingTop: spacing.xs, paddingBottom: spacing.xl },
});

export default LeavesScreen;
