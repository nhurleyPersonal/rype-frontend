import { View, FlatList } from 'react-native';
import { useGetCoins } from '@/hooks/useGetCoins';
import CoinListRow from './CoinListRow';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/styles/themes';
import HeaderComponentSlider from './HeaderComponentSlider';

const CoinTable = ({ maxRows }: { maxRows?: number }) => {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const { data } = useGetCoins();
  if (!data) {
    return null;
  }
  const limitedData = maxRows ? data.slice(0, maxRows) : data;
  return (
    <View style={styles.container}>
      <FlatList
        data={limitedData}
        scrollEnabled={false}
        renderItem={({ item }) => <CoinListRow coin={item} />}
        contentContainerStyle={styles.listContent}
      />
      {maxRows && (
        <View style={styles.viewAllContainer}>
          <Text style={styles.viewAllText}>View All</Text>
        </View>
      )}
    </View>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      width: '100%',
      zIndex: 2,
    },
    headerContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: 3,
      width: '95%',
      zIndex: 999,
    },
    listContent: {
      marginBottom: 5,
      paddingBottom: 5,
    },
    viewAllContainer: {
      marginTop: 5,
      paddingTop: 0,
    },
    viewAllText: {
      color: theme.colors.primary,
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default CoinTable;
