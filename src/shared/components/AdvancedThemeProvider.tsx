'use client';

import React from 'react';
import { AdvancedThemeContext, useAdvancedThemeState } from '@/shared/hooks/useAdvancedTheme';

interface AdvancedThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Advanced Theme Provider that manages both base theme (light/dark/system) 
 * and color themes (default/ocean/forest/etc.)
 */
const AdvancedThemeProvider: React.FC<AdvancedThemeProviderProps> = ({ children }) => {
  const themeState = useAdvancedThemeState();

  return (
    <AdvancedThemeContext.Provider value={themeState}>
      {children}
    </AdvancedThemeContext.Provider>
  );
};

export default AdvancedThemeProvider;