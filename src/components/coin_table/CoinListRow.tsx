import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Coin } from '@/types/Coin';
import { Theme } from '@/styles/themes';
import CoinExtraDetails from './CoinExtraDetails';

interface CoinListRowProps {
  coin: Coin;
}

const CoinListRow = ({ coin }: CoinListRowProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = makeStyles(theme, coin);
  const [icon, setIcon] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const heightAnim = useRef(new Animated.Value(0)).current;
  const [detailsHeight, setDetailsHeight] = useState(0);

  useEffect(() => {
    if (coin.rankTrend === 'up') {
      setIcon('↑');
    } else if (coin.rankTrend === 'down') {
      setIcon('↓');
    } else {
      setIcon('--');
    }
  }, [coin.rankTrend]);

  const navigateToCoinDetail = () => {
    setIsOpen(!isOpen);
    router.push(`/coin/${coin.name}`);
  };

  const onDetailsLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && height !== detailsHeight) {
      setDetailsHeight(height);
    }
  };

  useEffect(() => {
    if (isOpen) {
      Animated.timing(heightAnim, {
        toValue: detailsHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen, detailsHeight]);

  const handlePress = () => {
    router.push(`/coin/${coin.name}`);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.container} onPress={handlePress}>
          <View style={styles.rankCell}>
            <Text style={styles.rankText}>{coin.rank}</Text>
            <Text style={[styles.trendText, { color: styles.trendText.color }]}>{icon}</Text>
          </View>

          <View style={styles.coinCell}>
            <Image source={{ uri: coin.icon }} style={styles.coinIcon} />
            <Text style={styles.nameText}>{coin.name}</Text>
          </View>

          <View style={styles.categoryCell}>
            <Text style={styles.categoryText}>{coin.category || 'Crypto'}</Text>
          </View>

          <View style={styles.infoCell}>
            <Text style={[styles.infoIcon, { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }]}>
              ›
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Hidden measurement view */}
      <View style={{ position: 'absolute', opacity: 0, left: -9999 }} onLayout={onDetailsLayout}>
        <CoinExtraDetails coin={coin} />
      </View>

      {/* Animated container */}
      <Animated.View style={[styles.detailsContainer, { height: heightAnim }]}>
        {detailsHeight > 0 && (
          <>
            <CoinExtraDetails coin={coin} />
            <TouchableOpacity style={styles.detailButton} onPress={navigateToCoinDetail}>
              <Text style={styles.detailButtonText}>View Full Details</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const makeStyles = (theme: Theme, coin: Coin) =>
  StyleSheet.create({
    categoryCell: {
      alignItems: 'flex-end',
      flex: 1,
    },
    categoryText: {
      color: theme.colors.text,
      fontSize: 14,
    },
    coinCell: {
      alignItems: 'center',
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingHorizontal: 8,
    },
    coinIcon: {
      borderRadius: 12.5,
      height: 25,
      marginRight: 8,
      width: 25,
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.layerTwo,
      borderRadius: 50,
      elevation: 1,
      flexDirection: 'row',
      marginTop: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    detailButton: {
      alignSelf: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      elevation: 2,
      marginVertical: 16,
      paddingHorizontal: 20,
      paddingVertical: 12,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    detailButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    detailsContainer: {
      alignSelf: 'center',
      marginTop: -8,
      overflow: 'hidden',
      width: '90%',
      zIndex: 1,
    },
    infoCell: {
      alignItems: 'center',
      flex: 0.5,
      justifyContent: 'center',
    },
    infoIcon: {
      color: theme.colors.text,
      fontSize: 20,
    },
    nameText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    outerContainer: {
      alignItems: 'center',
      width: '100%',
    },
    rankCell: {
      alignItems: 'center',
      flex: 0.5,
      flexDirection: 'row',
      gap: 4,
    },
    rankText: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: '500',
    },
    trendText: {
      color:
        coin.rankTrend === 'up' ? 'green' : coin.rankTrend === 'down' ? 'red' : theme.colors.text,
      fontSize: 14,
    },
    wrapper: {
      alignSelf: 'center',
      marginVertical: 4,
      width: '95%',
      zIndex: 2,
    },
  });

export default CoinListRow;
