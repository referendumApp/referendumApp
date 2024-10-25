import React, { createContext, useContext, ReactNode } from 'react';

import { theme as defaultTheme, Theme } from '@/themes';

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
