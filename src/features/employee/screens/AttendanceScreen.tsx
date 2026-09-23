import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import DashboardHeader from '../../../components/common/DashboardHeader';
import AttendanceSummaryCard from '../../../components/cards/AttendanceSummaryCard';
import LiveLocationCard from '../../../components/cards/LiveLocationCard';
import WorkBreakMetricsCard from '../../../components/cards/WorkBreakMetricsCard';

const AttendanceScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <DashboardHeader userName="Ismail Akhtar" greeting="Attendance Log," />
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    <AttendanceSummaryCard />
                    <LiveLocationCard />
                    <WorkBreakMetricsCard />
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

export default AttendanceScreen;
