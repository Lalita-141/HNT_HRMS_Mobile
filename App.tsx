import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { getStorage } from './src/services/storage/storage';
import RootNavigator from './src/navigation/RootNavigator';
import { initStorage } from './src/services/storage/initStorage';

const App = () => {
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initStorage();
        const storage = getStorage();

        storage.set('test_key', 'HRMS working');

        console.log(
          'MMKV TEST:',
          storage.getString('test_key'),
        );
        setStorageReady(true);
      } catch (error) {
        console.error(
          'Storage initialization failed:',
          error,
        );
      }
    };

    initialize();
  }, []);

  if (!storageReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return <RootNavigator />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default App;