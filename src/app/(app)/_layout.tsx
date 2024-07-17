import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { useAuth } from '@/core';
import { Text } from '@/ui';
import { BadgesIcon } from '@/ui/icons/badges-icon';
import { HomeIcon } from '@/ui/icons/home-icon';
import TabLabel from '@/ui/tab-label';

const TabBarLabel = ({ focused, color, label }) => (
  <TabLabel focused={focused} color={color}>
    <Text
      style={{
        fontSize: 11,
        fontFamily: focused ? 'Poppins_700Bold' : 'Poppins_600SemiBold',
        color,
      }}
    >
      {label}
    </Text>
  </TabLabel>
);

export default function TabLayout() {
  const status = useAuth.use.status();
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_500Medium_Italic,
  });

  if (status === 'signOut') {
    return <Redirect href="/language" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6900',
        tabBarInactiveTintColor: '#9DB2CE',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 80,
          paddingBottom: 24,
          paddingTop: 16,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',

          tabBarIcon: ({ color, focused }) => (
            <HomeIcon color={color} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel focused={focused} color={color} label="Home" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="badges"
        options={{
          title: 'Badges',
          tabBarIcon: ({ color, focused }) => (
            <BadgesIcon color={color} focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel focused={focused} color={color} label="Badges" />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
