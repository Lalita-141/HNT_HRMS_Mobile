import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  onTokenRefresh,
  AuthorizationStatus,
  type RemoteMessage,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Platform, PermissionsAndroid } from 'react-native';

class NotificationService {
  private messaging = getMessaging();

  // 1. Request Push Notification Permissions
  async requestPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await requestPermission(this.messaging);
        const enabled =
          authStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus === AuthorizationStatus.PROVISIONAL;
        console.log('[NotificationService] iOS Permission status:', authStatus);
        return enabled;
      } else if (Platform.OS === 'android') {
        // Android 13+ (API 33+) requires explicit runtime POST_NOTIFICATIONS permission
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('[NotificationService] Permission request error:', error);
      return false;
    }
  }

  // 2. Get FCM Token (to send to backend server)
  async getFCMToken(): Promise<string | null> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        console.log('[NotificationService] Notification permission not granted');
        return null;
      }

      const token = await getToken(this.messaging);
      console.log('====================================');
      console.log('[FCM TOKEN]:', token);
      console.log('====================================');
      return token;
    } catch (error) {
      console.error('[NotificationService] Error getting FCM token:', error);
      return null;
    }
  }

  // 3. Create Android High-Priority Notification Channel
  async createNotificationChannel() {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'hnt_hrms_default_channel',
        name: 'HNT HRMS Notifications',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        vibration: true,
      });
    }
  }

  // 4. Display Heads-Up Banner when App is in Foreground
  async displayForegroundNotification(remoteMessage: RemoteMessage) {
    const title = remoteMessage.notification?.title || remoteMessage.data?.title || 'New Notification';
    const body = remoteMessage.notification?.body || remoteMessage.data?.body || '';

    await notifee.displayNotification({
      title: String(title),
      body: String(body),
      data: remoteMessage.data,
      android: {
        channelId: 'hnt_hrms_default_channel',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        smallIcon: 'ic_launcher', // Default app icon
      },
      ios: {
        sound: 'default',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    });
  }

  // 5. Initialize All Notification Listeners
  async initializeListeners(onNotificationPress?: (data: any) => void) {
    await this.createNotificationChannel();
    await this.getFCMToken();

    // A. FOREGROUND LISTENER
    const unsubscribeForeground = onMessage(this.messaging, async (remoteMessage: RemoteMessage) => {
      console.log('[NotificationService] Received Foreground Message:', remoteMessage);
      await this.displayForegroundNotification(remoteMessage);
    });

    // B. BACKGROUND APP OPEN LISTENER (User taps notification while app is in background)
    const unsubscribeBackground = onNotificationOpenedApp(this.messaging, (remoteMessage: RemoteMessage) => {
      console.log('[NotificationService] App opened from Background state:', remoteMessage);
      if (onNotificationPress && remoteMessage.data) {
        onNotificationPress(remoteMessage.data);
      }
    });

    // C. KILLED / COLD LAUNCH LISTENER (User taps notification while app is terminated)
    getInitialNotification(this.messaging)
      .then((remoteMessage: RemoteMessage | null) => {
        if (remoteMessage) {
          console.log('[NotificationService] App opened from Killed/Terminated state:', remoteMessage);
          if (onNotificationPress && remoteMessage.data) {
            onNotificationPress(remoteMessage.data);
          }
        }
      });

    // D. TOKEN REFRESH LISTENER
    const unsubscribeTokenRefresh = onTokenRefresh(this.messaging, (newToken: string) => {
      console.log('[NotificationService] FCM Token refreshed:', newToken);
      // TODO: Send refreshed token to your backend API
    });

    // E. NOTIFEE FOREGROUND TAP LISTENER
    const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification) {
        console.log('[NotificationService] Notifee notification tapped:', detail.notification);
        if (onNotificationPress && detail.notification.data) {
          onNotificationPress(detail.notification.data);
        }
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
      unsubscribeTokenRefresh();
      unsubscribeNotifee();
    };
  }
}

export const notificationService = new NotificationService();
