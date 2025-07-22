// Export existing components and hooks
export * from './components';
export * from './hooks';
export * from './lib';
export * from './types';
export * from './constants';

// Export new theme system
export { default as AdvancedThemeProvider } from './components/AdvancedThemeProvider';
export { default as AdvancedThemeSelector } from './components/AdvancedThemeSelector';
export { useAdvancedTheme, useAdvancedThemeState, useCompatTheme } from './hooks/useAdvancedTheme';
export * from './lib/themeUtils';
export * from './types/theme';
export * from './constants/themes';
