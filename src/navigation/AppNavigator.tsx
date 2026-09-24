import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MainTabNavigator from './MainTabNavigator';
import ManagerTeamScreen from '../features/manager/screens/ManagerTeamScreen';
import AdminDashboardScreen from '../features/admin/screens/AdminDashboardScreen';
import AppDrawerModal, { RoleScreenTarget } from '../components/common/AppDrawerModal';
import { DrawerProvider, useDrawer } from '../context/DrawerContext';

export type AppStackParamList = {
    MainTabs: undefined;
    Manager: undefined;
    Admin: undefined;
    SuperAdmin: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

type StackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;

const AdminScreen = ({ navigation }: { navigation: { navigate: (route: keyof AppStackParamList) => void } }) => {
    return (
        <AdminDashboardScreen
            onNavigateRole={(route: RoleScreenTarget) => navigation.navigate(route as keyof AppStackParamList)}
        />
    );
};


const ManagerScreen = ({ navigation }: StackScreenProps<'Manager'>) => {
    return (
        <ManagerTeamScreen
            onSwitchToWorkspace={() => navigation.navigate('MainTabs')}
        />
    );
};

const AppNavigatorContent = () => {
    const navigation = useNavigation<any>();
    const { isDrawerOpen, activeRoute, closeDrawer, setActiveRoute } = useDrawer();

    const handleNavigate = (route: RoleScreenTarget) => {
        setActiveRoute(route);
        closeDrawer();
        navigation.navigate(route);
    };

    return (
        <View style={styles.container}>
            <Stack.Navigator
                initialRouteName="Admin"
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                }}>
                <Stack.Screen name="Admin" component={AdminScreen} />
                <Stack.Screen name="MainTabs">
                    {() => (
                        <MainTabNavigator
                            onSwitchToTeam={() => navigation.navigate('Manager')}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Manager" component={ManagerScreen} />
                <Stack.Screen name="SuperAdmin" component={AdminScreen} />
            </Stack.Navigator>

            <AppDrawerModal
                visible={isDrawerOpen}
                activeRoute={activeRoute}
                onClose={closeDrawer}
                onNavigate={handleNavigate}
            />
        </View>
    );
};

const AppNavigator = () => {
    return (
        <DrawerProvider>
            <AppNavigatorContent />
        </DrawerProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppNavigator;