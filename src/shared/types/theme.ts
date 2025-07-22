export type BaseTheme = 'light' | 'dark' | 'system';

export type ColorTheme = 
  | 'default'
  | 'ocean' 
  | 'forest' 
  | 'sunset' 
  | 'lavender' 
  | 'monochrome'
  | 'high-contrast';

export interface ThemeColors {
  // Base colors
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  
  // Interactive elements
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  
  // UI elements
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  
  // Borders and separators
  border: string;
  input: string;
  ring: string;
  
  // Status colors
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  error: string;
  errorForeground: string;
  info: string;
  infoForeground: string;
  
  // Code editor specific
  codeBackground: string;
  codeForeground: string;
  codeSelection: string;
  codeComment: string;
  codeKeyword: string;
  codeString: string;
  codeNumber: string;
  codeOperator: string;
}

export interface ThemeDefinition {
  id: ColorTheme;
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export interface ThemeState {
  baseTheme: BaseTheme;
  colorTheme: ColorTheme;
  resolvedBaseTheme: 'light' | 'dark';
  currentColors: ThemeColors;
}

export interface ThemeContextType {
  theme: ThemeState;
  setBaseTheme: (theme: BaseTheme) => void;
  setColorTheme: (theme: ColorTheme) => void;
  setTheme: (baseTheme: BaseTheme, colorTheme: ColorTheme) => void;
  availableThemes: ThemeDefinition[];
}