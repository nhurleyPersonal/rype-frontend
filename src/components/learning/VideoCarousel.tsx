import * as React from 'react';
import { Dimensions, View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import GenericLearningVideoContainer from '@/components/learning/GenericLearningVideoContainer';
import { Video } from '@/types/Video';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/styles/themes';

const width = Dimensions.get('window').width;

export const VideoCarousel = ({
  videos,
  carouselContainerStyle,
  carouselItemStyle,
  paginationStyle,
}: {
  videos: Video[];
  carouselContainerStyle?: StyleProp<ViewStyle>;
  carouselItemStyle?: StyleProp<ViewStyle>;
  paginationStyle?: StyleProp<ViewStyle>;
}) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={[styles.container, carouselContainerStyle]}>
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        data={videos}
        onProgressChange={progress}
        renderItem={({ index }) => (
          <View style={[styles.carouselItem, carouselItemStyle]}>
            <View style={styles.videoTitleContainer}>
              <Text style={styles.videoTitle}>{videos[index].title}</Text>
            </View>
            <GenericLearningVideoContainer video={videos[index]} scale={0.75} />
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={videos}
        dotStyle={styles.paginationDot}
        containerStyle={[styles.paginationContainer, paginationStyle]}
        onPress={onPressPagination}
      />
    </View>
  );
};

const backgroundColor = 'rgba(0,0,0,0.2)';
const paginationBackgroundColor = 'rgba(0,0,0,0.5)';

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    carouselItem: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    paginationContainer: {
      backgroundColor: paginationBackgroundColor,
      borderRadius: 50,
      gap: 5,
      marginBottom: 10,
      marginTop: 0,
      opacity: 0.5,
      padding: 10,
    },
    paginationDot: {
      backgroundColor,
      borderRadius: 50,
    },
    videoTitle: {
      color: theme.colors.textPrimaryOpposite,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    videoTitleContainer: {
      alignItems: 'flex-start',
      width: '75%',
    },
  });
