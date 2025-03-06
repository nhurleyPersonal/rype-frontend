import { View, Text, StyleSheet, Animated } from 'react-native';
import CoinTable from '@/components/coin_table/CoinTable';
import { useTheme } from '@/hooks/useTheme';
import { useGetVideoURIs } from '@/hooks/useGetVideoURIs';
import { Theme } from '@/styles/themes';
import { VideoCarousel } from '@/components/learning/VideoCarousel';
import { LinearGradient } from 'expo-linear-gradient';
import XpBar from '@/components/learning/XpBar';
import HeaderComponentSlider from '@/components/coin_table/HeaderComponentSlider';
import { useRef } from 'react';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';

export default function Page() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const { data: videos } = useGetVideoURIs();

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });

  if (!videos) {
    return <Text>Loading...</Text>;
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
          colors={[theme.colors.primary, '#8A2BE2']}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>

      {/* Main content */}
      <SafeAreaViewContext style={styles.safeArea} edges={['top']}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.videoContainer}>
            <View style={styles.learningHeaderContainer}>
              <Text style={styles.learningHeader}>Learning Modules</Text>
            </View>
            <VideoCarousel videos={videos} />
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.headerContainer}>
              <HeaderComponentSlider />
            </View>
            <CoinTable maxRows={5} />
          </View>
          <View style={styles.divider} />
          <View style={styles.xpContainer}>
            <XpBar currentXP={600} maxXP={1000} />
          </View>
        </Animated.ScrollView>
      </SafeAreaViewContext>
    </View>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    backgroundComponent: {
      bottom: 0,
      height: '45%',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 0,
    },
    backgroundContainer: {
      backgroundColor: theme.colors.background,
      flex: 1,
      position: 'relative',
    },
    carouselContainer: {
      alignItems: 'center',
      borderRadius: 20,
      justifyContent: 'center',
      padding: 10,
      width: '95%',
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.transparent,
      flex: 1,
      flexDirection: 'column',
    },
    divider: {
      backgroundColor: theme.colors.borderLight,
      height: 1,
      marginVertical: theme.spacing.sm,
      width: '95%',
    },
    gradientBackground: {
      height: '41%',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 0,
    },
    headerContainer: {
      zIndex: 999,
    },
    learningHeader: {
      color: theme.colors.textPrimaryOpposite || '#FFFFFF',
      fontSize: 22,
      fontWeight: 'bold',
    },
    learningHeaderContainer: {
      alignSelf: 'stretch',
      paddingBottom: 10,
      paddingLeft: 15,
      paddingTop: 10,
    },
    outerContainer: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    safeArea: {
      flex: 1,
      zIndex: 1,
    },
    scrollView: {
      backgroundColor: theme.colors.transparent,
      flex: 1,
      paddingHorizontal: 16,
      zIndex: 1,
    },
    scrollViewContent: {
      alignItems: 'center',
      backgroundColor: theme.colors.transparent,
      paddingBottom: 80,
      zIndex: 2,
    },
    tableContainer: {
      width: '95%',
    },
    title: {
      color: theme.colors.text,
      fontSize: 28,
      fontWeight: 'bold',
      paddingHorizontal: 15,
    },
    titleContainer: {
      width: '95%',
    },
    videoContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.transparent,
      paddingVertical: 10,
      width: '100%',
    },
    xpContainer: {
      alignItems: 'center',
      padding: 10,
      width: '95%',
      zIndex: 2,
    },
  });
