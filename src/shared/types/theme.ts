export type BaseTheme = 'light' | 'dark' | 'system';

export type ColorTheme = 'default' | 'ocean' | 'forest';

export interface ThemeState {
  baseTheme: BaseTheme;           // light/dark/system preference
  colorTheme: ColorTheme;         // selected color theme
  resolvedBaseTheme: 'light' | 'dark';  // computed from system if needed
}

export interface ThemeContextType {
  theme: ThemeState;
  setBaseTheme: (theme: BaseTheme) => void;
  setColorTheme: (theme: ColorTheme) => void;
  setFullTheme: (baseTheme: BaseTheme, colorTheme: ColorTheme) => void;
  availableColorThemes: Array<{
    id: ColorTheme;
    name: string;
    description: string;
  }>;
}