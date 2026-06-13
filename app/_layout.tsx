import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { initDatabase } from '@/lib/db';
import { useNotifications } from '@/hooks/useNotifications';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4CAF50',
    secondary: '#81C784',
    background: '#0A0A0A',
    surface: '#1A1A1A',
  },
};

function RootInitializer() {
  useNotifications();
  return null;
}

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" />
      <RootInitializer />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0A0A0A' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="workout/[id]" options={{ headerShown: true, headerTitle: 'Workout', headerStyle: { backgroundColor: '#0A0A0A' }, headerTintColor: '#4CAF50' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
