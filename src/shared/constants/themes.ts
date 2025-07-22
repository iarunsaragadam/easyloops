import { ThemeDefinition, ThemeColors } from '@/shared/types/theme';

// Helper function to create HSL colors
const hsl = (h: number, s: number, l: number) => `hsl(${h}, ${s}%, ${l}%)`;

// Default theme colors (current easyloops colors)
const defaultLight: ThemeColors = {
  // Base colors
  background: hsl(0, 0, 100),
  foreground: hsl(0, 0, 9),
  muted: hsl(210, 40, 98),
  mutedForeground: hsl(215, 13, 65),
  
  // Interactive elements
  primary: hsl(221, 83, 53),
  primaryForeground: hsl(210, 40, 98),
  secondary: hsl(210, 40, 96),
  secondaryForeground: hsl(222, 84, 5),
  accent: hsl(210, 40, 96),
  accentForeground: hsl(222, 84, 5),
  
  // UI elements
  card: hsl(0, 0, 100),
  cardForeground: hsl(222, 84, 5),
  popover: hsl(0, 0, 100),
  popoverForeground: hsl(222, 84, 5),
  
  // Borders and separators
  border: hsl(214, 32, 91),
  input: hsl(214, 32, 91),
  ring: hsl(221, 83, 53),
  
  // Status colors
  success: hsl(142, 76, 36),
  successForeground: hsl(355, 7, 97),
  warning: hsl(38, 92, 50),
  warningForeground: hsl(48, 96, 89),
  error: hsl(0, 84, 60),
  errorForeground: hsl(210, 40, 98),
  info: hsl(199, 89, 48),
  infoForeground: hsl(210, 40, 98),
  
  // Code editor specific
  codeBackground: hsl(0, 0, 98),
  codeForeground: hsl(0, 0, 9),
  codeSelection: hsl(221, 83, 93),
  codeComment: hsl(215, 13, 65),
  codeKeyword: hsl(262, 83, 58),
  codeString: hsl(142, 76, 36),
  codeNumber: hsl(221, 83, 53),
  codeOperator: hsl(0, 84, 60),
};

const defaultDark: ThemeColors = {
  // Base colors
  background: hsl(222, 84, 5),
  foreground: hsl(210, 40, 98),
  muted: hsl(217, 33, 17),
  mutedForeground: hsl(215, 20, 65),
  
  // Interactive elements
  primary: hsl(217, 91, 60),
  primaryForeground: hsl(222, 84, 5),
  secondary: hsl(217, 33, 17),
  secondaryForeground: hsl(210, 40, 98),
  accent: hsl(217, 33, 17),
  accentForeground: hsl(210, 40, 98),
  
  // UI elements
  card: hsl(222, 84, 5),
  cardForeground: hsl(210, 40, 98),
  popover: hsl(222, 84, 5),
  popoverForeground: hsl(210, 40, 98),
  
  // Borders and separators
  border: hsl(217, 33, 17),
  input: hsl(217, 33, 17),
  ring: hsl(217, 91, 60),
  
  // Status colors
  success: hsl(142, 70, 45),
  successForeground: hsl(144, 61, 20),
  warning: hsl(38, 92, 50),
  warningForeground: hsl(48, 96, 89),
  error: hsl(0, 63, 31),
  errorForeground: hsl(210, 40, 98),
  info: hsl(199, 89, 48),
  infoForeground: hsl(210, 40, 98),
  
  // Code editor specific
  codeBackground: hsl(217, 33, 17),
  codeForeground: hsl(210, 40, 98),
  codeSelection: hsl(217, 91, 25),
  codeComment: hsl(215, 20, 65),
  codeKeyword: hsl(262, 83, 78),
  codeString: hsl(142, 70, 65),
  codeNumber: hsl(217, 91, 60),
  codeOperator: hsl(0, 84, 80),
};

// Ocean theme
const oceanLight: ThemeColors = {
  ...defaultLight,
  background: hsl(190, 60, 98),
  foreground: hsl(200, 50, 10),
  primary: hsl(200, 98, 39),
  primaryForeground: hsl(190, 60, 98),
  secondary: hsl(190, 50, 90),
  accent: hsl(180, 100, 85),
  ring: hsl(200, 98, 39),
  codeBackground: hsl(190, 50, 95),
  codeKeyword: hsl(200, 98, 39),
  codeString: hsl(160, 84, 39),
};

const oceanDark: ThemeColors = {
  ...defaultDark,
  background: hsl(200, 50, 10),
  foreground: hsl(190, 60, 95),
  primary: hsl(200, 98, 60),
  primaryForeground: hsl(200, 50, 10),
  muted: hsl(200, 50, 20),
  border: hsl(200, 50, 20),
  input: hsl(200, 50, 20),
  codeBackground: hsl(200, 50, 15),
};

// Forest theme
const forestLight: ThemeColors = {
  ...defaultLight,
  background: hsl(120, 30, 98),
  foreground: hsl(120, 30, 10),
  primary: hsl(120, 60, 35),
  primaryForeground: hsl(120, 30, 98),
  secondary: hsl(120, 20, 90),
  accent: hsl(90, 50, 85),
  ring: hsl(120, 60, 35),
  codeBackground: hsl(120, 20, 95),
  codeKeyword: hsl(120, 60, 35),
  codeString: hsl(140, 70, 40),
};

const forestDark: ThemeColors = {
  ...defaultDark,
  background: hsl(120, 30, 8),
  foreground: hsl(120, 30, 95),
  primary: hsl(120, 60, 55),
  primaryForeground: hsl(120, 30, 8),
  muted: hsl(120, 20, 18),
  border: hsl(120, 20, 18),
  input: hsl(120, 20, 18),
  codeBackground: hsl(120, 20, 12),
};

// Sunset theme
const sunsetLight: ThemeColors = {
  ...defaultLight,
  background: hsl(30, 50, 98),
  foreground: hsl(20, 30, 10),
  primary: hsl(15, 86, 53),
  primaryForeground: hsl(30, 50, 98),
  secondary: hsl(30, 40, 90),
  accent: hsl(45, 70, 85),
  ring: hsl(15, 86, 53),
  codeBackground: hsl(30, 30, 95),
  codeKeyword: hsl(15, 86, 53),
  codeString: hsl(45, 90, 40),
};

const sunsetDark: ThemeColors = {
  ...defaultDark,
  background: hsl(20, 30, 8),
  foreground: hsl(30, 50, 95),
  primary: hsl(15, 86, 65),
  primaryForeground: hsl(20, 30, 8),
  muted: hsl(20, 30, 18),
  border: hsl(20, 30, 18),
  input: hsl(20, 30, 18),
  codeBackground: hsl(20, 30, 12),
};

// Lavender theme
const lavenderLight: ThemeColors = {
  ...defaultLight,
  background: hsl(270, 50, 98),
  foreground: hsl(270, 30, 10),
  primary: hsl(270, 95, 60),
  primaryForeground: hsl(270, 50, 98),
  secondary: hsl(270, 30, 90),
  accent: hsl(285, 60, 85),
  ring: hsl(270, 95, 60),
  codeBackground: hsl(270, 20, 95),
  codeKeyword: hsl(270, 95, 60),
  codeString: hsl(290, 80, 50),
};

const lavenderDark: ThemeColors = {
  ...defaultDark,
  background: hsl(270, 30, 8),
  foreground: hsl(270, 50, 95),
  primary: hsl(270, 95, 70),
  primaryForeground: hsl(270, 30, 8),
  muted: hsl(270, 20, 18),
  border: hsl(270, 20, 18),
  input: hsl(270, 20, 18),
  codeBackground: hsl(270, 20, 12),
};

// Monochrome theme
const monochromeLight: ThemeColors = {
  ...defaultLight,
  primary: hsl(0, 0, 20),
  primaryForeground: hsl(0, 0, 98),
  secondary: hsl(0, 0, 90),
  accent: hsl(0, 0, 85),
  ring: hsl(0, 0, 20),
  codeKeyword: hsl(0, 0, 30),
  codeString: hsl(0, 0, 40),
  codeNumber: hsl(0, 0, 20),
  codeOperator: hsl(0, 0, 50),
};

const monochromeDark: ThemeColors = {
  ...defaultDark,
  primary: hsl(0, 0, 80),
  primaryForeground: hsl(0, 0, 10),
  muted: hsl(0, 0, 20),
  border: hsl(0, 0, 25),
  input: hsl(0, 0, 25),
  codeBackground: hsl(0, 0, 15),
  codeKeyword: hsl(0, 0, 70),
  codeString: hsl(0, 0, 60),
  codeNumber: hsl(0, 0, 80),
  codeOperator: hsl(0, 0, 50),
};

// High contrast theme
const highContrastLight: ThemeColors = {
  ...defaultLight,
  background: hsl(0, 0, 100),
  foreground: hsl(0, 0, 0),
  primary: hsl(0, 0, 0),
  primaryForeground: hsl(0, 0, 100),
  border: hsl(0, 0, 0),
  input: hsl(0, 0, 0),
  codeBackground: hsl(0, 0, 100),
  codeForeground: hsl(0, 0, 0),
  codeKeyword: hsl(0, 0, 0),
  codeString: hsl(0, 0, 0),
  codeNumber: hsl(0, 0, 0),
  codeOperator: hsl(0, 0, 0),
};

const highContrastDark: ThemeColors = {
  ...defaultDark,
  background: hsl(0, 0, 0),
  foreground: hsl(0, 0, 100),
  primary: hsl(0, 0, 100),
  primaryForeground: hsl(0, 0, 0),
  border: hsl(0, 0, 100),
  input: hsl(0, 0, 100),
  codeBackground: hsl(0, 0, 0),
  codeForeground: hsl(0, 0, 100),
  codeKeyword: hsl(0, 0, 100),
  codeString: hsl(0, 0, 100),
  codeNumber: hsl(0, 0, 100),
  codeOperator: hsl(0, 0, 100),
};

export const themeDefinitions: ThemeDefinition[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'The classic easyloops theme with blue accents',
    light: defaultLight,
    dark: defaultDark,
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blues and teals inspired by the ocean',
    light: oceanLight,
    dark: oceanDark,
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural greens for a calming coding experience',
    light: forestLight,
    dark: forestDark,
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm oranges and yellows like a sunset',
    light: sunsetLight,
    dark: sunsetDark,
  },
  {
    id: 'lavender',
    name: 'Lavender',
    description: 'Soft purples for a gentle coding environment',
    light: lavenderLight,
    dark: lavenderDark,
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Pure black and white for minimal distraction',
    light: monochromeLight,
    dark: monochromeDark,
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Maximum contrast for accessibility',
    light: highContrastLight,
    dark: highContrastDark,
  },
];

export const getThemeDefinition = (id: string) => 
  themeDefinitions.find(theme => theme.id === id) || themeDefinitions[0];

export const getThemeColors = (themeId: string, mode: 'light' | 'dark'): ThemeColors => {
  const theme = getThemeDefinition(themeId);
  return theme[mode];
};