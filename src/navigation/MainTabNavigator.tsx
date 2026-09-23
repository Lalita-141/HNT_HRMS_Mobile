import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationBottomTabBar } from '../components/navigation/BottomTabBar';
import EmployeeDashboardScreen from '../features/employee/screens/EmployeeDashboardScreen';
import AttendanceScreen from '../features/employee/screens/AttendanceScreen';
import LeavesScreen from '../features/employee/screens/LeavesScreen';
import HolidayScreen from '../features/employee/screens/HolidayScreen';
import ProfileScreen from '../features/employee/screens/ProfileScreen';

export type MainTabParamList = {
    Home: undefined;
    Attendance: undefined;
    Leaves: undefined;
    Holiday: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

interface MainTabNavigatorProps {
    onSwitchToTeam?: () => void;
}

const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({ onSwitchToTeam }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBar={props => <NavigationBottomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                lazy: false,
            }}>
            <Tab.Screen name="Home">
                {() => (
                    <EmployeeDashboardScreen
                        onSwitchToTeam={onSwitchToTeam}
                        hideStandaloneTabBar={true}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="Attendance" component={AttendanceScreen} />
            <Tab.Screen name="Leaves" component={LeavesScreen} />
            <Tab.Screen name="Holiday" component={HolidayScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
