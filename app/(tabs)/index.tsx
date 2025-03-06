import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CoinTable from '@/components/coin_table/CoinTable';
import { useTheme } from '@/hooks/useTheme';
import { useGetVideoURIs } from '@/hooks/useGetVideoURIs';
import { Theme } from '@/styles/themes';
import { VideoCarousel } from '@/components/learning/VideoCarousel';
import { LinearGradient } from 'expo-linear-gradient';
import XpBar from '@/components/learning/XpBar';

export default function Page() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const { data: videos } = useGetVideoURIs();

  if (!videos) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.videoContainer}>
        <LinearGradient
          colors={[theme.colors.learningBackground, '#8A2BE2']}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={styles.carouselContainer}
        >
          <View style={styles.learningHeaderContainer}>
            <Text style={styles.learningHeader}>Learning Modules</Text>
          </View>
          <VideoCarousel videos={videos} />
        </LinearGradient>
      </View>
      <View style={styles.divider} />
      <View style={styles.tableContainer}>
        <CoinTable maxRows={5} />
      </View>
      <View style={styles.divider} />
      <View style={styles.xpContainer}>
        <XpBar currentXP={600} maxXP={1000} />
      </View>
    </ScrollView>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    carouselContainer: {
      alignItems: 'center',
      borderRadius: 20,
      justifyContent: 'center',
      padding: 10,
      width: '95%',
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      flexDirection: 'column',
    },
    divider: {
      backgroundColor: theme.colors.borderLight,
      height: 1,
      marginVertical: theme.spacing.sm,
      width: '95%',
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
    scrollView: {
      backgroundColor: theme.colors.transparent,
      flex: 1,
    },
    scrollViewContent: {
      alignItems: 'center',
      backgroundColor: theme.colors.transparent,
      paddingBottom: 80,
    },
    tableContainer: {
      width: '100%',
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
    },
  });
