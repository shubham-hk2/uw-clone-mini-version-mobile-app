import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/poppins';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { APIProvider } from '@/api';
import { hydrateAuth } from '@/core';
export { ErrorBoundary } from 'expo-router';

import '../../global.css';

import { useEffect, useState } from 'react';
import React from 'react';
import FlashMessage from 'react-native-flash-message';

import useFCM, { getAndSaveFCMToken } from '@/core/hooks/use-fcm';
import { getItem } from '@/core/storage';
import LottieSplashScreen from '@/ui/lottie-splash-screen';

export const unstable_settings = {
  initialRouteName: '(app)',
};

hydrateAuth();
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_500Medium_Italic,
  });

  const [isReady, setIsReady] = useState(false);
  const [hasWaited, setHasWaited] = useState(false);

  useFCM();

  useEffect(() => {
    async function prepare() {
      try {
        if (getItem('token') && !getItem('fcmToken')) {
          await getAndSaveFCMToken();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();

    const timer = setTimeout(() => {
      setHasWaited(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady && fontsLoaded && hasWaited) {
      // SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded, hasWaited]);

  if (!isReady || !fontsLoaded || !hasWaited) {
    return <LottieSplashScreen />;
  }

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="language" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />

        <Stack.Screen
          name="register-first-step"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="register-second-step"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="quiz"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="vak"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="results"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider
        value={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: '#394F5F',
            background: '#fff',
          },
        }}
      >
        <APIProvider>
          <BottomSheetModalProvider>
            {children}
            <FlashMessage position="top" />
          </BottomSheetModalProvider>
        </APIProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Poppins_500Medium',
  },
});
