import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/styles/ThemeProvider';
import { SafeAreaView } from 'react-native';
export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider initialThemeType="light" useSystemTheme={false}>
        <StatusBar translucent backgroundColor="transparent" />
        <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              title: 'Home',
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="coin/[coinId]"
            options={{ headerShown: false, title: 'Coin Details' }}
          />
          <Stack.Screen name="coin/TestCoinPage" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
