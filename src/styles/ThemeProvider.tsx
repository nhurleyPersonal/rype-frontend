import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, ThemeType, lightTheme, darkTheme } from './themes';

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  setIsSystemTheme: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: darkTheme,
  themeType: 'dark',
  setThemeType: () => {},
  toggleTheme: () => {},
  isSystemTheme: true,
  setIsSystemTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  initialThemeType?: ThemeType;
  useSystemTheme?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialThemeType = 'dark',
  useSystemTheme = true,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(
    useSystemTheme ? (systemColorScheme as ThemeType) || initialThemeType : initialThemeType
  );
  const [isSystemTheme, setIsSystemTheme] = useState(useSystemTheme);

  // Update theme when system theme changes if using system theme
  useEffect(() => {
    if (isSystemTheme && systemColorScheme) {
      setThemeType(systemColorScheme as ThemeType);
    }
  }, [systemColorScheme, isSystemTheme]);

  const toggleTheme = () => {
    setThemeType(prev => (prev === 'light' ? 'dark' : 'light'));
    if (isSystemTheme) {
      setIsSystemTheme(false);
    }
  };

  const theme = themeType === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        setThemeType,
        toggleTheme,
        isSystemTheme,
        setIsSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 