import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';

export type AuthStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Login: undefined;
    ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
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