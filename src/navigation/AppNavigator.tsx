import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AppStackParamList = {
    Employee: undefined;
    Manager: undefined;
    Admin: undefined;
    SuperAdmin: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Employee" component={EmployeePlaceholder} />
        </Stack.Navigator>
    );
};

const EmployeePlaceholder = () => {
    return null;
};

export default AppNavigator;