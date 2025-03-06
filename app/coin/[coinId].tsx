import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/styles/themes';
import { useGetCoin } from '@/hooks/useGetCoins';
import { useGetVideoURIs } from '@/hooks/useGetVideoURIs';
import { LinearGradient } from 'expo-linear-gradient';
import GenericLearningVideoContainer from '@/components/learning/GenericLearningVideoContainer';

export default function CoinPage() {
  const { coinId } = useLocalSearchParams<{ coinId: string }>();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: videos } = useGetVideoURIs();

  const { data: coin, isLoading, error } = useGetCoin(coinId as string);

  if (isLoading) {
    return <Text>Loading... {coinId}</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!coin) {
    return <Text>Coin not found</Text>;
  }

  if (!videos) {
    return <Text>No videos found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerContainer}>
        <LinearGradient
          colors={[theme.colors.learningBackground, '#8A2BE2']}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={styles.carouselContainer}
        >
          <View style={styles.videoContainerTitle}>
            <Text style={styles.videoContainerTitleText}>{coin.name} Concepts</Text>
          </View>
          <GenericLearningVideoContainer video={videos[0]} scale={0.75} />
        </LinearGradient>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Concepts</Text>
        <Text style={styles.conceptDescription} numberOfLines={showFullDescription ? undefined : 3}>
          {coin.conceptsDescription}
        </Text>
        <TouchableOpacity
          onPress={() => setShowFullDescription(!showFullDescription)}
          style={styles.showMoreButton}
        >
          <Text style={styles.showMoreText}>{showFullDescription ? 'Show Less' : 'Show More'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Token Details</Text>

        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Utility</Text>
            <Text style={styles.detailValue}>{coin.utility}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Market Cap</Text>
            <Text style={styles.detailValue}>${formatNumber(coin.marketCap)}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Max Supply</Text>
            <Text style={styles.detailValue}>{formatNumber(coin.maxSupply)}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Rate of Increase</Text>
            <Text style={styles.detailValue}>{coin.roi}%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const formatNumber = (num: number) => {
  return num >= 1e9
    ? `${(num / 1e9).toFixed(1)}B`
    : num >= 1e6
      ? `${(num / 1e6).toFixed(1)}M`
      : num >= 1e3
        ? `${(num / 1e3).toFixed(1)}K`
        : num.toString();
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    carouselContainer: {
      alignItems: 'center',
      borderRadius: 20,
      justifyContent: 'center',
      padding: 10,
      width: '100%',
    },
    centerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    conceptDescription: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      lineHeight: 24,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      paddingHorizontal: 16,
    },
    detailCard: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.borderLight,
      borderRadius: 25,
      borderWidth: 1,
      justifyContent: 'center',
      margin: 16,
      padding: 16,
      width: '40%',
    },
    detailLabel: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      marginBottom: 8,
    },
    detailValue: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
    detailsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 16,
    },
    divider: {
      backgroundColor: theme.colors.borderLight,
      height: 1,
      marginVertical: theme.spacing.sm,
      width: '95%',
    },
    fillerSpace: {
      backgroundColor: theme.colors.foreground,
      borderRadius: 12,
      marginBottom: 24,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 12,
    },
    showMoreButton: {
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    showMoreText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    title: {
      color: theme.colors.text,
      fontSize: 28,
      fontWeight: 'bold',
    },
    titleContainer: {
      paddingVertical: 8,
    },
    videoContainerTitle: {
      alignSelf: 'stretch',
      paddingBottom: 10,
      paddingLeft: 15,
      paddingTop: 10,
    },
    videoContainerTitleText: {
      color: theme.colors.textPrimaryOpposite || '#FFFFFF',
      fontSize: 22,
      fontWeight: 'bold',
    },
  });
