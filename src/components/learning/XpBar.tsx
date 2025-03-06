import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/styles/themes';

interface XpBarProps {
  currentXP: number;
  maxXP: number;
  segments?: number[];
  style?: StyleProp<ViewStyle>;
}

const XpBar: React.FC<XpBarProps> = ({ currentXP, maxXP, segments, style }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const fillPercentage = Math.min(100, (currentXP / maxXP) * 100);

  if (!segments) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.backgroundBar} />
        <LinearGradient
          colors={['#4287f5', '#9b42f5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${fillPercentage}%` }]}
        />
      </View>
    );
  }

  // Calculate segment positions
  const totalSegmentsXP = segments.reduce((sum, segment) => sum + segment, 0);
  let currentPosition = 0;

  return (
    <View style={[styles.container, style]}>
      {segments.map((segment, index) => {
        const segmentWidth = (segment / totalSegmentsXP) * 100;
        const segmentFill = Math.min(segmentWidth, Math.max(0, fillPercentage - currentPosition));

        const segmentView = (
          <View
            key={index}
            style={[
              styles.segment,
              {
                width: `${segmentWidth}%`,
                marginLeft: index > 0 ? 2 : 0,
              },
            ]}
          >
            {segmentFill > 0 && (
              <LinearGradient
                colors={['#4287f5', '#9b42f5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.fill, { width: `${(segmentFill / segmentWidth) * 100}%` }]}
              />
            )}
          </View>
        );

        currentPosition += segmentWidth;
        return segmentView;
      })}
    </View>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    backgroundBar: {
      backgroundColor: theme.colors.borderLight || '#EEEEEE',
      borderRadius: 10,
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    container: {
      borderRadius: 10,
      height: 20,
      overflow: 'hidden',
      position: 'relative',
      width: '75%',
    },
    fill: {
      borderRadius: 10,
      height: '100%',
    },
    segment: {
      backgroundColor: theme.colors.border,
      borderRadius: 10,
      height: '100%',
      overflow: 'hidden',
    },
  });

export default XpBar;
