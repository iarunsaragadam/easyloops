import { BaseTheme, ColorTheme } from '@/shared/types/theme';

/**
 * Sets theme using data attributes on document element
 */
export function setTheme(colorTheme: ColorTheme, mode: 'light' | 'dark') {
  const root = document.documentElement;
  root.setAttribute('data-theme', colorTheme);
  root.setAttribute('data-mode', mode);
  
  console.info(`[Theme] Applied theme: ${colorTheme} in ${mode} mode`);
}

/**
 * Gets the resolved base theme (light or dark) from system preference
 */
export const getResolvedBaseTheme = (baseTheme: BaseTheme): 'light' | 'dark' => {
  if (baseTheme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return baseTheme;
};

/**
 * Applies a complete theme (base + color theme)
 */
export const applyTheme = (baseTheme: BaseTheme, colorTheme: ColorTheme): 'light' | 'dark' => {
  const resolvedBaseTheme = getResolvedBaseTheme(baseTheme);
  setTheme(colorTheme, resolvedBaseTheme);
  return resolvedBaseTheme;
};

/**
 * Storage keys for theme persistence
 */
export const THEME_STORAGE_KEYS = {
  BASE_THEME: 'easyloops-base-theme',
  COLOR_THEME: 'easyloops-color-theme',
} as const;

/**
 * Saves theme preferences to localStorage
 */
export const saveThemePreferences = (baseTheme: BaseTheme, colorTheme: ColorTheme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEYS.BASE_THEME, baseTheme);
    localStorage.setItem(THEME_STORAGE_KEYS.COLOR_THEME, colorTheme);
  } catch (error) {
    console.warn('Failed to save theme preferences:', error);
  }
};

/**
 * Loads theme preferences from localStorage
 */
export const loadThemePreferences = (): { baseTheme: BaseTheme; colorTheme: ColorTheme } => {
  try {
    const savedBaseTheme = localStorage.getItem(THEME_STORAGE_KEYS.BASE_THEME) as BaseTheme;
    const savedColorTheme = localStorage.getItem(THEME_STORAGE_KEYS.COLOR_THEME) as ColorTheme;
    
    return {
      baseTheme: savedBaseTheme && ['light', 'dark', 'system'].includes(savedBaseTheme) 
        ? savedBaseTheme 
        : 'system',
      colorTheme: savedColorTheme && ['default', 'ocean', 'forest'].includes(savedColorTheme)
        ? savedColorTheme
        : 'default',
    };
  } catch (error) {
    console.warn('Failed to load theme preferences:', error);
    return { baseTheme: 'system', colorTheme: 'default' };  
  }
};

/**
 * Gets Monaco editor theme name based on current theme
 */
export const getMonacoTheme = (baseTheme: 'light' | 'dark'): string => {
  return baseTheme === 'dark' ? 'vs-dark' : 'vs';
};