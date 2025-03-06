import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BackgroundProviderProps = {
  backgroundColor?: string;
  children: React.ReactNode;
};

export const BackgroundProvider = ({
  backgroundColor = 'red',
  children,
}: BackgroundProviderProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.backgroundView, { backgroundColor }]} />
      <View style={styles.backgroundComponent} />
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundComponent: {
    backgroundColor: 'gray',
    flex: 1,
    height: '50%',
    left: 0,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
  backgroundView: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  safeArea: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});
