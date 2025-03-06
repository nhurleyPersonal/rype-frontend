import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from './useTheme';
import { Theme } from '../styles/themes';

export const useStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styleCallback: (theme: Theme) => T
) => {
  const { theme } = useTheme();

  return useMemo(() => {
    const styles = styleCallback(theme);
    return StyleSheet.create(styles);
  }, [theme, styleCallback]);
};
