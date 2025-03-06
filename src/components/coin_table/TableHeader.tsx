import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/styles/themes';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

const TableHeader = () => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const listFields = ['Rype250', 'Watchlist', 'All Assets'];

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={120}
        data={listFields}
        onProgressChange={progress}
        onSnapToItem={index => setActiveIndex(index)}
        style={{ width: 370 }}
        renderItem={({ index }) => (
          <View style={styles.carouselItem}>
            <Text
              style={[
                styles.headerText,
                styles.text,
                index === activeIndex ? styles.activeText : styles.inactiveText,
              ]}
            >
              {listFields[index]}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    activeText: {
      color: theme.colors.text,
    },
    buttons: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 16,
    },
    carouselItem: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    container: {
      alignItems: 'flex-end',
      alignSelf: 'center',
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      width: '95%',
    },
    headerText: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    inactiveText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: '400',
    },
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSizes.xl,
    },
  });

export default TableHeader;
