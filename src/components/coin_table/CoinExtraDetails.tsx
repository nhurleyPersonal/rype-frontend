import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Coin } from '@/types/Coin';
import { Theme } from '@/styles/themes';
import { router } from 'expo-router';

const CoinExtraDetails = ({ coin }: { coin: Coin }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme, coin);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <View style={styles.roiContainer}>
            <Text style={styles.arrow}>{coin.roi > 0 ? '↑' : '↓'}</Text>
            <Text style={styles.roiText}>{Math.abs(coin.roi)}%</Text>
          </View>
          <Text style={styles.subText}>Daily Change %</Text>
        </View>

        <View style={styles.middleSection}>
          <Text style={styles.exchangeRate}>${coin.exchangeRate}</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.hypeScore}>{coin.hypeScore}</Text>
          <Text style={styles.subText}>Rype Score</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.moreInfoButton}
        onPress={() => router.push(`/coin/${coin.id}`)}
      >
        <Text style={styles.moreInfoText}>More Info</Text>
        <Text style={styles.moreInfoText}>›</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const makeStyles = (theme: Theme, coin: Coin) => {
  const arrowColor = coin.roi > 0 ? 'green' : 'red';
  return StyleSheet.create({
    arrow: {
      color: arrowColor,
      fontSize: 16,
      fontWeight: '600',
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.foreground,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 0,
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.2,
      shadowRadius: 3,
      width: '100%',
    },
    exchangeRate: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    hypeScore: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    leftSection: {
      alignItems: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    middleSection: {
      alignItems: 'center',
    },
    moreInfoButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      borderColor: theme.colors.primary,
      borderTopWidth: 1,
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'center',
      padding: 12,
      width: '100%',
    },
    moreInfoText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    rightSection: {
      alignItems: 'flex-end',
      paddingHorizontal: 16,
    },
    roiContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
    },
    roiText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    subText: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      marginTop: 4,
    },
    topSection: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
};

export default CoinExtraDetails;
