import { ThemeColors, BaseTheme, ColorTheme } from '@/shared/types/theme';
import { getThemeColors } from '@/shared/constants/themes';

/**
 * Applies theme colors as CSS custom properties to the document root
 */
export const applyThemeColors = (colors: ThemeColors): void => {
  const root = document.documentElement;
  
  Object.entries(colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variables
    const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
  
  // Also set legacy variables for backwards compatibility
  root.style.setProperty('--background', colors.background);
  root.style.setProperty('--foreground', colors.foreground);
};

/**
 * Applies theme classes to HTML elements
 */
export const applyThemeClasses = (baseTheme: 'light' | 'dark', colorTheme: ColorTheme): void => {
  const root = document.documentElement;
  const body = document.body;
  
  // Remove all existing theme classes
  root.className = root.className
    .split(' ')
    .filter(cls => !cls.startsWith('theme-') && cls !== 'light' && cls !== 'dark')
    .join(' ');
    
  body.className = body.className
    .split(' ')
    .filter(cls => !cls.startsWith('theme-') && cls !== 'light' && cls !== 'dark')
    .join(' ');
  
  // Add new theme classes
  root.classList.add(baseTheme, `theme-${colorTheme}`);
  body.classList.add(baseTheme, `theme-${colorTheme}`);
};

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
  const colors = getThemeColors(colorTheme, resolvedBaseTheme);
  
  applyThemeColors(colors);
  applyThemeClasses(resolvedBaseTheme, colorTheme);
  
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
      colorTheme: savedColorTheme && ['default', 'ocean', 'forest', 'sunset', 'lavender', 'monochrome', 'high-contrast'].includes(savedColorTheme)
        ? savedColorTheme
        : 'default',
    };
  } catch (error) {
    console.warn('Failed to load theme preferences:', error);
    return { baseTheme: 'system', colorTheme: 'default' };
  }
};

/**
 * Creates a CSS-safe theme class name
 */
export const getThemeClassName = (colorTheme: ColorTheme): string => {
  return `theme-${colorTheme}`;
};

/**
 * Gets Monaco editor theme name based on current theme
 */
export const getMonacoTheme = (baseTheme: 'light' | 'dark', colorTheme: ColorTheme): string => {
  // For now, we'll use the default Monaco themes
  // In the future, we could create custom Monaco themes for each color theme
  return baseTheme === 'dark' ? 'vs-dark' : 'vs';
};

/**
 * Generates Tailwind color classes based on theme colors
 */
export const generateTailwindClasses = (colors: ThemeColors): Record<string, string> => {
  return {
    'bg-background': `background-color: ${colors.background}`,
    'bg-foreground': `background-color: ${colors.foreground}`,
    'bg-card': `background-color: ${colors.card}`,
    'bg-popover': `background-color: ${colors.popover}`,
    'bg-primary': `background-color: ${colors.primary}`,
    'bg-secondary': `background-color: ${colors.secondary}`,
    'bg-muted': `background-color: ${colors.muted}`,
    'bg-accent': `background-color: ${colors.accent}`,
    'text-background': `color: ${colors.background}`,
    'text-foreground': `color: ${colors.foreground}`,
    'text-card-foreground': `color: ${colors.cardForeground}`,
    'text-popover-foreground': `color: ${colors.popoverForeground}`,
    'text-primary': `color: ${colors.primary}`,
    'text-primary-foreground': `color: ${colors.primaryForeground}`,
    'text-secondary-foreground': `color: ${colors.secondaryForeground}`,
    'text-muted-foreground': `color: ${colors.mutedForeground}`,
    'text-accent-foreground': `color: ${colors.accentForeground}`,
    'border-border': `border-color: ${colors.border}`,
    'border-input': `border-color: ${colors.input}`,
    'ring-ring': `--tw-ring-color: ${colors.ring}`,
  };
};