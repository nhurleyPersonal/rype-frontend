import { useContext } from 'react';
import { ThemeContext } from '../styles/ThemeProvider';

/**
 * Custom hook to access the current theme.
 * @returns Theme context providing theme, themeType, and theme control functions
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}; 