import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import ManagerTeamScreen from '../features/manager/screens/ManagerTeamScreen';
import AdminDashboardScreen from '../features/admin/screens/AdminDashboardScreen';

export type AppStackParamList = {
    MainTabs: undefined;
    Manager: undefined;
    Admin: undefined;
    SuperAdmin: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

type ManagerScreenProps = NativeStackScreenProps<AppStackParamList, 'Manager'>;

const ManagerScreen = ({ navigation }: ManagerScreenProps) => {
    return (
        <ManagerTeamScreen
            onSwitchToWorkspace={() => navigation.navigate('MainTabs')}
        />
    );
};

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="MainTabs"
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}>
            <Stack.Screen name="MainTabs">
                {({ navigation }) => (
                    <MainTabNavigator
                        onSwitchToTeam={() => navigation.navigate('Manager')}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="Manager" component={ManagerScreen} />
            <Stack.Screen name="Admin" component={AdminDashboardScreen} />
            <Stack.Screen name="SuperAdmin" component={AdminDashboardScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;