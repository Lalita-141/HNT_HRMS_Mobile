/**
 * @format
 */

import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';

// Register background message handler (Runs when app is killed or in background)
const messaging = getMessaging();
setBackgroundMessageHandler(messaging, async remoteMessage => {
  console.log('[Background Message Handler] Received:', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);
