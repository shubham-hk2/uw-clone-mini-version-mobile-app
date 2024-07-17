import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { showMessage } from 'react-native-flash-message';

import { client } from '@/api';

import { getToken } from '../auth/utils';
import { getItem, setItem } from '../storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.setNotificationChannelAsync('default', {
  name: 'default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#FF6900FF',
});

async function requestUserPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  console.log('Permission status:', status);
  return status === 'granted';
}

export async function getAndSaveFCMToken(): Promise<void> {
  try {
    const tokenData = await Notifications.getDevicePushTokenAsync();
    const fcmToken = tokenData.data;
    if (fcmToken && getToken()) {
      await setItem('fcmToken', fcmToken);
      await saveTokenToBackend(fcmToken);
      showMessage({
        message: 'FCM Token fetched successfully!',
        type: 'success',
      });
    }
  } catch (error) {
    console.error('Failed to get token:123123123', error);
  }
}

async function saveTokenToBackend(token: string): Promise<void> {
  try {
    if (token) {
      const res = await client.post('/user/token', { token });
      showMessage({
        message: 'FCM Token saved to backend!',
        type: 'success',
      });
      return res.data;
    }
  } catch (error: any) {
    showMessage({
      message:
        error?.response?.data?.message || 'Failed to save FCM token to backend',
      type: 'danger',
    });
  }
}

const useFCM = (): void => {
  const hasRun = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    requestUserPermission().then((enabled) => {
      if (enabled && getItem('token')) {
        getAndSaveFCMToken();
      }
    });

    const tokenSubscription = Notifications.addPushTokenListener((token) => {
      saveTokenToBackend(token.data);
      showMessage({
        message: 'FCM Token refreshed and updated!',
        type: 'info',
      });
    });

    // Add notification listener
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log('Notification received:', notification);
        // You can handle the received notification here if needed
      }
    );

    // Add notification response listener
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        try {
          console.log('Full response2:', JSON.stringify(response, null, 2));
          const data = response.notification.request.content.data;
          console.log('data2', data.badge_image_url);

          const quizId = data?.quiz_id;
          const badgeContent = data?.badge_image_url;
          console.log('badgeContent', badgeContent);
          if (badgeContent) {
            router.push({
              pathname: '/(app)/badges',
              params: { badgeData: data },
            });
          } else if (quizId) {
            router.push({
              pathname: '/quiz',
              params: { quiz_id: quizId },
            });
          } else {
            console.log('No quizId found in notification data');
          }
        } catch (e) {
          console.error('error', e);
        }
      });

    return () => {
      tokenSubscription.remove();
      notificationListener.remove();
      responseListener.remove();
    };
  }, [router]);
};

export default useFCM;
