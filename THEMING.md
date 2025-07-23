# easyloops CSS Variable Theming System

This document explains the CSS variable-based theming system implemented for easyloops, which allows for easy theme swapping using data attributes.

## Overview

The theming system supports:
- **Base themes**: Light, Dark, and System (auto-detect) 
- **Color themes**: Multiple color palettes (Default, Ocean, Forest)
- **CSS Variables with Data Attributes**: `[data-theme="theme-name"][data-mode="light"]`
- **Tailwind Integration**: Direct Tailwind class support for all theme colors
- **Automatic persistence**: Themes are saved to localStorage
- **TypeScript support**: Full type safety for theme configuration

## Quick Start

### Demo Page

Visit `/theme-demo` to see the theming system in action with live examples of all components and color palettes.

### Basic Usage

```tsx
import { useAdvancedTheme } from '@/shared';

function MyComponent() {
  const { theme, setBaseTheme, setColorTheme } = useAdvancedTheme();
  
  return (
    <div className="bg-theme-card text-theme-card-foreground p-4 rounded-lg">
      <p>Current theme: {theme.baseTheme} + {theme.colorTheme}</p>
      <button 
        onClick={() => setBaseTheme('dark')}
        className="bg-theme-primary text-theme-primary-foreground px-3 py-1 rounded"
      >
        Switch to Dark
      </button>
      <button 
        onClick={() => setColorTheme('ocean')}
        className="bg-theme-secondary text-theme-secondary-foreground px-3 py-1 rounded"
      >
        Switch to Ocean Theme
      </button>
    </div>
  );
}
```

### Using the Theme Selectors

```tsx
import { SimpleThemeSelector, ColorThemeSelector } from '@/shared';

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <div className="flex items-center space-x-4">
        <ColorThemeSelector />  {/* For selecting color themes */}
        <SimpleThemeSelector />  {/* For light/dark/system */}
      </div>
    </header>
  );
}
```

## Available Themes

### Base Themes
- **Light**: Traditional light mode
- **Dark**: Traditional dark mode  
- **System**: Automatically follows system preference

### Color Themes
- **Default**: The classic easyloops blue theme
- **Ocean**: Cool blues and teals inspired by the ocean
- **Forest**: Natural greens for a calming coding experience

## Architecture

### File Structure
```
src/shared/
├── types/theme.ts              # TypeScript definitions
├── constants/themes.ts         # Theme color definitions
├── lib/themeUtils.ts          # Theme utility functions
├── hooks/useAdvancedTheme.ts  # Main theme hook
├── components/
│   ├── AdvancedThemeProvider.tsx   # Theme context provider
│   ├── AdvancedThemeSelector.tsx   # Theme selection UI
│   └── ThemeDemo.tsx              # Demo component
└── index.ts                   # Exports
```

### Core Concepts

#### Theme State
```tsx
interface ThemeState {
  baseTheme: BaseTheme;           // 'light' | 'dark' | 'system'
  colorTheme: ColorTheme;         // 'default' | 'ocean' | etc.
  resolvedBaseTheme: 'light' | 'dark';  // Computed from system
  currentColors: ThemeColors;     // Current color palette
}
```

#### Color Palette
Each theme includes a comprehensive color palette:
```tsx
interface ThemeColors {
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
```

## Using Themes in Components

### Method 1: Using Tailwind Classes (Recommended)
```tsx
function MyComponent() {
  return (
    <div className="bg-theme-card text-theme-card-foreground border border-theme-border p-4 rounded-lg">
      <h2 className="text-theme-foreground">Themed content</h2>
      <p className="text-theme-muted-foreground">Muted text content</p>
      <button className="bg-theme-primary text-theme-primary-foreground px-3 py-1 rounded">
        Action
      </button>
    </div>
  );
}
```

### Method 2: Using CSS Variables Directly
```css
.my-component {
  background-color: hsl(var(--color-card));
  color: hsl(var(--color-card-foreground));
  border-color: hsl(var(--color-border));
}
```

### Method 3: Using React Inline Styles
```tsx
function MyComponent() {
  return (
    <div 
      className="p-4 rounded-lg"
      style={{
        backgroundColor: 'hsl(var(--color-card))',
        color: 'hsl(var(--color-card-foreground))',
        borderColor: 'hsl(var(--color-border))',
      }}
    >
      Themed content
    </div>
  );
}
```

## CSS Variables Reference

### CSS Custom Properties

All theme colors are available as CSS custom properties:

```css
/* Base colors */
--color-background
--color-foreground
--color-muted
--color-muted-foreground

/* Interactive elements */
--color-primary
--color-primary-foreground
--color-secondary
--color-secondary-foreground
--color-accent
--color-accent-foreground

/* UI elements */
--color-card
--color-card-foreground
--color-popover
--color-popover-foreground

/* Borders and separators */
--color-border
--color-input
--color-ring

/* Status colors */
--color-success
--color-success-foreground
--color-warning
--color-warning-foreground
--color-error
--color-error-foreground
--color-info
--color-info-foreground

/* Code editor specific */
--color-code-background
--color-code-foreground
--color-code-selection
--color-code-comment
--color-code-keyword
--color-code-string
--color-code-number
--color-code-operator
```

### Tailwind Classes

All colors are available as Tailwind classes with the `theme-` prefix:

```css
/* Background colors */
bg-theme-background, bg-theme-foreground, bg-theme-card, bg-theme-popover
bg-theme-primary, bg-theme-secondary, bg-theme-accent, bg-theme-muted
bg-theme-success, bg-theme-warning, bg-theme-error, bg-theme-info
bg-theme-code-background

/* Text colors */
text-theme-background, text-theme-foreground, text-theme-card-foreground
text-theme-primary, text-theme-primary-foreground
text-theme-secondary-foreground, text-theme-muted-foreground
text-theme-success-foreground, text-theme-warning-foreground
text-theme-error-foreground, text-theme-info-foreground
text-theme-code-foreground, text-theme-code-comment
text-theme-code-keyword, text-theme-code-string
text-theme-code-number, text-theme-code-operator

/* Border colors */
border-theme-border, border-theme-input

/* Ring colors */
ring-theme-ring
```

## API Reference

### `useAdvancedTheme()`

The main hook for accessing and modifying theme state.

```tsx
const {
  theme,                    // Current theme state
  setBaseTheme,            // Set base theme (light/dark/system)
  setColorTheme,           // Set color theme (default/ocean/etc.)
  setTheme,                // Set both at once
  availableThemes,         // Array of all available themes
} = useAdvancedTheme();
```

### Theme Utilities

#### `applyTheme(baseTheme, colorTheme)`
Applies a complete theme to the document:
```tsx
import { applyTheme } from '@/shared';

const resolvedBase = applyTheme('dark', 'ocean');
```

#### `getThemeColors(themeId, mode)`
Gets colors for a specific theme:
```tsx
import { getThemeColors } from '@/shared';

const colors = getThemeColors('ocean', 'dark');
```

## Migration Guide

### From Old Theme System

If you were using the previous `useTheme` hook:

#### Before
```tsx
import { useTheme } from '@/features/editor/hooks/useTheme';

const { theme, setTheme, resolvedTheme } = useTheme();
```

#### After (Option 1: Use Compatibility Hook)
```tsx
import { useCompatTheme } from '@/shared';

const { theme, setTheme, resolvedTheme } = useCompatTheme();
```

#### After (Option 2: Use New Advanced Hook)
```tsx
import { useAdvancedTheme } from '@/shared';

const { theme, setBaseTheme } = useAdvancedTheme();
// theme.baseTheme instead of theme
// theme.resolvedBaseTheme instead of resolvedTheme  
// setBaseTheme instead of setTheme
```

### Updating Components

#### Before
```tsx
<div className="bg-white dark:bg-gray-800">
  Content
</div>
```

#### After
```tsx
const { theme } = useAdvancedTheme();

<div 
  style={{
    backgroundColor: theme.currentColors.card,
    color: theme.currentColors.cardForeground,
  }}
>
  Content
</div>
```

## Creating Custom Themes

### Step 1: Define Theme Colors
```tsx
// In src/shared/constants/themes.ts

const myCustomLight: ThemeColors = {
  background: '#ffffff',
  foreground: '#000000',
  primary: '#ff6b35',
  primaryForeground: '#ffffff',
  // ... other colors
};

const myCustomDark: ThemeColors = {
  background: '#1a1a1a',
  foreground: '#ffffff',
  primary: '#ff8c42',
  primaryForeground: '#000000',
  // ... other colors
};
```

### Step 2: Add to Theme Definitions
```tsx
export const themeDefinitions: ThemeDefinition[] = [
  // ... existing themes
  {
    id: 'custom',
    name: 'My Custom Theme',
    description: 'A custom theme with orange accents',
    light: myCustomLight,
    dark: myCustomDark,
  },
];
```

### Step 3: Update TypeScript Types
```tsx
// In src/shared/types/theme.ts
export type ColorTheme = 
  | 'default'
  | 'ocean' 
  | 'forest' 
  | 'sunset' 
  | 'lavender' 
  | 'monochrome'
  | 'high-contrast'
  | 'custom';  // Add your custom theme
```

## Best Practices

### 1. Use Semantic Color Names
Always use semantic colors from the theme rather than hardcoded values:
```tsx
// ✅ Good
backgroundColor: theme.currentColors.card

// ❌ Bad  
backgroundColor: '#ffffff'
```

### 2. Handle Foreground Colors
Always pair background colors with appropriate foreground colors:
```tsx
// ✅ Good
style={{
  backgroundColor: theme.currentColors.primary,
  color: theme.currentColors.primaryForeground,
}}

// ❌ Bad - might be unreadable
style={{
  backgroundColor: theme.currentColors.primary,
  color: theme.currentColors.foreground,
}}
```

### 3. Use Status Colors for Status
Use the provided status colors for consistent messaging:
```tsx
// Success state
<div style={{
  backgroundColor: theme.currentColors.success,
  color: theme.currentColors.successForeground,
}}>
  Success message
</div>
```

### 4. Test All Themes
Make sure your components work with all available themes, especially:
- High contrast theme for accessibility
- Monochrome theme for minimal distraction
- Dark themes for different lighting conditions

## Accessibility

The theming system includes accessibility considerations:

- **High Contrast Theme**: Provides maximum contrast for users with visual impairments
- **System Theme**: Respects user's system preferences
- **Semantic Colors**: Consistent color meanings across themes
- **Focus Indicators**: Proper focus ring colors in all themes

## Performance

The theming system is optimized for performance:
- **CSS Variables**: Changes are applied via CSS custom properties (hardware accelerated)
- **Minimal Re-renders**: Components only re-render when theme actually changes
- **Lazy Loading**: Theme colors are computed on demand
- **Caching**: Theme preferences are cached in localStorage

## Troubleshooting

### Theme Not Applying
1. Ensure `AdvancedThemeProvider` wraps your app
2. Check that you're using `useAdvancedTheme` inside a component wrapped by the provider
3. Verify CSS variables are being set in developer tools

### TypeScript Errors
1. Make sure you're importing from `@/shared`
2. Check that new custom themes are added to the `ColorTheme` type
3. Ensure all required colors are defined in your custom theme

### Styles Not Updating
1. Clear localStorage if you're having persistence issues
2. Check that CSS custom properties are properly applied
3. Verify that your component is re-rendering when theme changes

## Future Enhancements

Planned improvements to the theming system:

1. **Tailwind Integration**: Direct Tailwind class support for all theme colors
2. **Animation Support**: Smooth transitions between theme changes
3. **Custom Theme Builder**: UI for creating and sharing custom themes
4. **Monaco Editor Integration**: Custom themes for the code editor
5. **Component Variants**: Theme-aware component variants
6. **Accessibility Enhancements**: More accessibility-focused themes

---

For questions or issues with the theming system, please refer to the source code in `src/shared/` or create an issue in the repository.