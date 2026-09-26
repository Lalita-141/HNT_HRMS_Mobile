import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppBootstrap } from './src/hooks/useAppBootstrap';
import { AppProviders } from './src/providers/AppProviders';
import RootNavigator from './src/navigation/RootNavigator';
import { notificationService } from './src/services/notification/notificationService';

const App = () => {
  const { isReady } = useAppBootstrap();

  useEffect(() => {
    // Start notification Listeners
    notificationService.initializeListeners(data => {
      console.log("Notification clicked data:", data)
    });
  }, [])

  if (!isReady) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
