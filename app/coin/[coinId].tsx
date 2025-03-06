import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/styles/themes';
import { useGetCoin } from '@/hooks/useGetCoins';
import { useGetVideoURIs } from '@/hooks/useGetVideoURIs';
import { LinearGradient } from 'expo-linear-gradient';
import GenericLearningVideoContainer from '@/components/learning/GenericLearningVideoContainer';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function CoinPage() {
  const { coinId } = useLocalSearchParams<{ coinId: string }>();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: videos } = useGetVideoURIs();
  const router = useRouter();

  const [colorCombos, setColorCombos] = useState<{ source: string; destination: string }>({
    source: theme.colors.primary,
    destination: '#8A2BE2',
  });

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });

  const { data: coin, isLoading, error } = useGetCoin(coinId as string);

  useEffect(() => {
    console.log('coinId', coinId);
    const combinations = [
      { source: '#4A90E2', destination: '#8A2BE2' },
      { source: '#62D6A3', destination: '#00B2FF' },
      { source: '#FFB74D', destination: '#FF5252' },
      { source: '#FF4081', destination: '#B388FF' },
      { source: '#FFD54F', destination: '#FF7043' },
      { source: '#69F0AE', destination: '#40C4FF' },
      { source: '#FF8A80', destination: '#E040FB' },
      { source: '#FDD835', destination: '#FF6F00' },
      { source: '#64B5F6', destination: '#BA68C8' },
      { source: '#00E676', destination: '#00B8D4' },
    ];
    setColorCombos(combinations[Math.floor(Math.random() * combinations.length)]);
    console.log('colorCombos', combinations[Math.floor(Math.random() * combinations.length)]);
  }, [coinId]);

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
    <View style={styles.outerContainer}>
      {/* Background that moves with scroll */}
      <Animated.View
        style={[
          styles.gradientBackground,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 250],
                  outputRange: [0, -250],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={[colorCombos.source, colorCombos.destination]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>

      {/* Close button - X in top right */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>

      {/* Main content */}
      <SafeAreaViewContext style={styles.safeArea} edges={['top']}>
        <Animated.ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.contentContainer}>
            <View style={styles.centerContainer}>
              <View style={styles.videoContainerTitle}>
                <Text style={styles.videoContainerTitleText}>{coin.name} Concepts</Text>
              </View>
              <GenericLearningVideoContainer video={videos[0]} scale={0.75} />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Concepts</Text>
              <Text
                style={styles.conceptDescription}
                numberOfLines={showFullDescription ? undefined : 3}
              >
                {coin.conceptsDescription}
              </Text>
              <TouchableOpacity
                onPress={() => setShowFullDescription(!showFullDescription)}
                style={styles.showMoreButton}
              >
                <Text style={styles.showMoreText}>
                  {showFullDescription ? 'Show Less' : 'Show More'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Token Details</Text>

              <View style={styles.detailsGrid}>
                <View style={styles.detailCard}>
                  <View style={styles.detailHeader}>
                    <View style={styles.detailHeaderIcon}>
                      <Ionicons name="apps-outline" size={22} color={theme.colors.text} />
                    </View>
                    <View style={styles.detailHeaderLabel}>
                      <Text style={styles.detailLabel}>Utility</Text>
                    </View>
                  </View>
                  <Text style={styles.detailValue}>{coin.utility}</Text>
                </View>

                <View style={styles.detailCard}>
                  <View style={styles.detailHeader}>
                    <View style={styles.detailHeaderIcon}>
                      <Ionicons name="cash-outline" size={22} color={theme.colors.text} />
                    </View>
                    <View style={styles.detailHeaderLabel}>
                      <Text style={styles.detailLabel}>Market Cap</Text>
                    </View>
                  </View>
                  <Text style={styles.detailValue}>${formatNumber(coin.marketCap)}</Text>
                </View>

                <View style={styles.detailCard}>
                  <View style={styles.detailHeader}>
                    <View style={styles.detailHeaderIcon}>
                      <Ionicons name="wallet-outline" size={22} color={theme.colors.text} />
                    </View>
                    <View style={styles.detailHeaderLabel}>
                      <Text style={styles.detailLabel}>Max Supply</Text>
                    </View>
                  </View>
                  <Text style={styles.detailValue}>{formatNumber(coin.maxSupply)}</Text>
                </View>

                <View style={styles.detailCard}>
                  <View style={styles.detailHeader}>
                    <View style={styles.detailHeaderIcon}>
                      <Ionicons name="trending-up-outline" size={22} color={theme.colors.text} />
                    </View>
                    <View style={styles.detailHeaderLabel}>
                      <Text style={styles.detailLabel}>Rate of Increase</Text>
                    </View>
                  </View>
                  <Text style={styles.detailValue}>{coin.roi}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomSpacer} />
          </View>
        </Animated.ScrollView>
      </SafeAreaViewContext>
    </View>
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
    backButton: {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      left: 16,
      position: 'absolute',
      top: 50, // Adjust based on safe area
      width: 40,
      zIndex: 10,
    },
    bottomSpacer: {
      height: '35%',
    },
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
      marginBottom: theme.spacing.xl,
    },
    closeButton: {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      position: 'absolute',
      right: 16, // Changed from left to right
      top: 50, // Adjust based on safe area
      width: 40,
      zIndex: 10,
    },
    conceptDescription: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      lineHeight: 24,
    },
    container: {
      paddingHorizontal: 16,
      zIndex: 1,
    },
    contentContainer: {
      flex: 1,
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
    detailHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      width: '100%',
    },
    detailHeaderIcon: {
      alignItems: 'center',
      padding: 4,
      width: '40%',
    },
    detailHeaderLabel: {
      alignItems: 'center',
      padding: 4,
      width: '60%',
    },
    detailLabel: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      textAlign: 'center',
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
    gradientBackground: {
      height: '35%', // Adjust height as needed
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 0,
    },
    outerContainer: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    safeArea: {
      flex: 1,
      zIndex: 1,
    },
    scrollContent: {
      paddingBottom: 24, // Added padding for bottom spacer
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
    topSpacer: {
      height: '30%', // Reduced slightly to accommodate safe area
    },
    utilityContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    utilityIcon: {
      height: 20,
      marginRight: 8,
      width: 20,
    },
    videoContainerTitle: {
      alignSelf: 'stretch',
      paddingBottom: 10,
      paddingLeft: 30,
      paddingTop: 10,
    },
    videoContainerTitleText: {
      color: theme.colors.textPrimaryOpposite || '#FFFFFF',
      fontSize: 22,
      fontWeight: 'bold',
    },
  });
