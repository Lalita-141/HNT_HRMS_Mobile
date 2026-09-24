import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { useAuth } from '../../../context/AuthContext';
import DashboardHeader from '../../../components/common/DashboardHeader';

const LeavesScreen = () => {
    const { userName } = useAuth();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                <DashboardHeader userName={userName || 'Sampat Kolekar'} greeting="Leaves," />
                <View style={styles.emptyContent}>
                    <Text style={styles.screenTitle}>Leaves Screen</Text>
                    <Text style={styles.screenSub}>Tab Navigation Active</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.white },
    container: { flex: 1, backgroundColor: colors.surface },
    emptyContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral950,
        marginBottom: 6,
    },
    screenSub: {
        fontSize: 13,
        color: colors.neutral600,
    },
});

export default LeavesScreen;

