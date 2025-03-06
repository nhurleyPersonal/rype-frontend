import { useVideoPlayer, VideoView } from 'expo-video';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Video as VideoType } from '@/types/Video';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function GenericLearningVideoContainer({
  video,
  scale,
  style,
}: {
  video: VideoType;
  scale: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { width: windowWidth } = useWindowDimensions();
  const [isPlaying, setIsPlaying] = useState(false);
  const styles = makeStyles();

  const player = useVideoPlayer(video.videoUrl, player => {
    player.loop = true;
  });

  const containerWidth = windowWidth * scale;

  const handlePlayPress = () => {
    player.play();
    setIsPlaying(true);
  };

  return (
    <View style={[styles.contentContainer, style]}>
      <View style={[styles.videoContainer, { width: containerWidth }]}>
        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />

        {!isPlaying && (
          <TouchableOpacity
            style={styles.playButtonOverlay}
            onPress={handlePlayPress}
            activeOpacity={0.7}
          >
            <Ionicons name="play-circle" size={80} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const backgroundColor = 'rgba(0,0,0,0.3)';

const makeStyles = () =>
  StyleSheet.create({
    contentContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },

    playButtonOverlay: {
      alignItems: 'center',
      backgroundColor: backgroundColor,
      borderRadius: 40,
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
    },
    video: {
      height: '100%',
      width: '100%',
    },
    videoContainer: {
      alignSelf: 'center',
      aspectRatio: 16 / 9,
    },
  });
