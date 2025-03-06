import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/styles/ThemeProvider';
import { BackgroundProvider } from '../src/providers/BackgroundProvider';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider initialThemeType="light" useSystemTheme={false}>
        <BackgroundProvider backgroundColor="red">
          <StatusBar translucent backgroundColor="transparent" />
          <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
            <Stack.Screen name="coin/[coinId]" options={{ title: 'Coin Details' }} />
            <Stack.Screen name="coin/TestCoinPage" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </BackgroundProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
