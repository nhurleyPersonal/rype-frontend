export type ThemeType = 'light' | 'dark';

export interface Theme {
  type: ThemeType;
  colors: {
    primary: string;
    layerTwo: string;
    secondary: string;
    background: string;
    foreground: string;
    learningBackground: string;
    transparent: string;
    card: string;
    text: string;
    textSecondary: string;
    textPrimaryOpposite: string;
    border: string;
    borderLight: string;
    notification: string;
    shadow: string;
    error: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    fontWeights: {
      regular: string;
      medium: string;
      bold: string;
    };
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

export const lightTheme: Theme = {
  type: 'light',
  colors: {
    primary: '#4A90E2',
    layerTwo: '#F5F5F5',
    secondary: '#6FCF97',
    background: '#FFFFFF',
    learningBackground: '#1B6FFF',
    transparent: 'transparent',
    foreground: '#EEEEEE',
    card: '#F2F2F2',
    text: '#333333',
    textSecondary: '#666666',
    textPrimaryOpposite: '#FFFFFF',
    border: '#888888',
    borderLight: '#E0E0E0',
    notification: '#FF3B30',
    error: '#FF3B30',
    shadow: '#000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0px 8px 16px rgba(0, 0, 0, 0.15)',
  },
};

export const darkTheme: Theme = {
  type: 'dark',
  colors: {
    primary: '#5FA8FF',
    layerTwo: '#5FA8FF',
    secondary: '#6FCF97',
    background: 'transparent',
    learningBackground: '#1B6FFF',
    transparent: 'transparent',
    foreground: '#1E1E1E',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#666666',
    textPrimaryOpposite: '#FFFFFF',
    border: '#2C2C2C',
    borderLight: '#E0E0E0',
    notification: '#FF453A',
    error: '#FF453A',
    shadow: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    medium: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    large: '0px 8px 16px rgba(0, 0, 0, 0.4)',
  },
};
