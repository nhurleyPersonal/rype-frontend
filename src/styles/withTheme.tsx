import React from 'react';
import { ThemeProvider } from './ThemeProvider';


export const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <ThemeProvider>
      <Component {...props} />
    </ThemeProvider>
  );
}; 