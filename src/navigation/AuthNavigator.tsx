import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import LoginScreen from '../screens/auth/LoginScreen';

export type AuthStackParamList = {
    Login: undefined;
    ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordPlaceholder}
            />
        </Stack.Navigator>
    );
};


const ForgotPasswordPlaceholder = () => {
    return (
        <View>
            <Text>ForgotPassword</Text>
        </View>
    );
};

export default AuthNavigator;