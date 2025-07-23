import { useState, useEffect, createContext, useContext } from 'react';
import { 
  BaseTheme, 
  ColorTheme, 
  ThemeState, 
  ThemeContextType
} from '@/shared/types/theme';
import { colorThemes } from '@/shared/constants/themes';
import { 
  applyTheme, 
  saveThemePreferences, 
  loadThemePreferences,
  getResolvedBaseTheme 
} from '@/shared/lib/themeUtils';

// Create the theme context
export const AdvancedThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to use the advanced theme context
 */
export const useAdvancedTheme = (): ThemeContextType => {
  const context = useContext(AdvancedThemeContext);
  if (!context) {
    throw new Error('useAdvancedTheme must be used within an AdvancedThemeProvider');
  }
  return context;
};

/**
 * Hook that provides theme state and management functions
 */
export const useAdvancedThemeState = () => {
  const [baseTheme, setBaseThemeState] = useState<BaseTheme>('system');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('default');
  const [resolvedBaseTheme, setResolvedBaseTheme] = useState<'light' | 'dark'>('light');
  const [isClient, setIsClient] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const preferences = loadThemePreferences();
    setBaseThemeState(preferences.baseTheme);
    setColorThemeState(preferences.colorTheme);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!isClient) return;

    const resolved = applyTheme(baseTheme, colorTheme);
    setResolvedBaseTheme(resolved);
    
    // Save preferences
    saveThemePreferences(baseTheme, colorTheme);
  }, [baseTheme, colorTheme, isClient]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (baseTheme === 'system') {
        const resolved = getResolvedBaseTheme(baseTheme);
        setResolvedBaseTheme(resolved);
        applyTheme(baseTheme, colorTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [baseTheme, colorTheme, isClient]);

  const setBaseTheme = (newBaseTheme: BaseTheme) => {
    console.info(`[Theme] Base theme changed to: ${newBaseTheme}`);
    setBaseThemeState(newBaseTheme);
  };

  const setColorTheme = (newColorTheme: ColorTheme) => {
    console.info(`[Theme] Color theme changed to: ${newColorTheme}`);
    setColorThemeState(newColorTheme);
  };

  const setFullTheme = (newBaseTheme: BaseTheme, newColorTheme: ColorTheme) => {
    console.info(`[Theme] Full theme changed to: ${newBaseTheme} + ${newColorTheme}`);
    setBaseThemeState(newBaseTheme);
    setColorThemeState(newColorTheme);
  };

  const themeState: ThemeState = {
    baseTheme,
    colorTheme,
    resolvedBaseTheme: isClient ? resolvedBaseTheme : 'light',
  };

  return {
    theme: themeState,
    setBaseTheme,
    setColorTheme,
    setFullTheme,
    availableColorThemes: colorThemes,
  };
};

/**
 * Legacy compatibility hook - provides the same interface as the old useTheme
 */
export const useCompatTheme = () => {
  const { theme, setBaseTheme } = useAdvancedTheme();
  
  return {
    theme: theme.baseTheme,
    setTheme: setBaseTheme,
    resolvedTheme: theme.resolvedBaseTheme,
  };
};