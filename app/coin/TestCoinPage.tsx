import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BlueScreen() {
  const navigation = useNavigation();
  const squares = Array.from({ length: 15 }, (_, i) => ({ id: i.toString() }));

  // Set status bar transparent on mount
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);

    return () => {
      // Reset status bar when component unmounts
      StatusBar.setBackgroundColor('#000000');
      StatusBar.setTranslucent(false);
    };
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FlatList
          data={squares}
          renderItem={() => <View style={styles.square} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    left: 16,
    position: 'absolute',
    top: StatusBar.currentHeight + 10 || 40,
    width: 40,
    zIndex: 10,
  },
  container: {
    backgroundColor: '#2196F3',
    flex: 1,
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 40, // Extra padding to account for status bar
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight || 0 + 20,
  },
  square: {
    backgroundColor: '#888',
    borderRadius: 8,
    height: SCREEN_HEIGHT * 0.2,
    margin: 10,
    width: '90%',
  },
});
