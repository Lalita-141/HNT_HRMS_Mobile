import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import ManagerTeamScreen from '../features/manager/screens/ManagerTeamScreen';
import AdminDashboardScreen from '../features/admin/screens/AdminDashboardScreen';
import { RoleScreenTarget } from '../components/common/AppDrawerModal';

export type AppStackParamList = {
    MainTabs: undefined;
    Manager: undefined;
    Admin: undefined;
    SuperAdmin: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

interface AdminScreenNavProps {
    navigation: {
        navigate: (route: keyof AppStackParamList) => void;
    };
}

const AdminScreen = ({ navigation }: AdminScreenNavProps) => {
    return (
        <AdminDashboardScreen
            onNavigateRole={(route: RoleScreenTarget) => navigation.navigate(route as keyof AppStackParamList)}
        />
    );
};

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
            initialRouteName="Admin"
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}>
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="MainTabs">
                {({ navigation }) => (
                    <MainTabNavigator
                        onSwitchToTeam={() => navigation.navigate('Manager')}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="Manager" component={ManagerScreen} />
            <Stack.Screen name="SuperAdmin" component={AdminScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;