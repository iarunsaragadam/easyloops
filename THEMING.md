# easyloops Advanced Theming System

This document explains the comprehensive theming system implemented for easyloops, which allows for easy theme swapping at one central location.

## Overview

The new theming system supports:
- **Base themes**: Light, Dark, and System (auto-detect)
- **Color themes**: Multiple color palettes (Default, Ocean, Forest, Sunset, Lavender, Monochrome, High-contrast)
- **Automatic persistence**: Themes are saved to localStorage
- **CSS variables**: Complete color system using CSS custom properties
- **TypeScript support**: Full type safety for theme configuration

## Quick Start

### Basic Usage

```tsx
import { useAdvancedTheme } from '@/shared';

function MyComponent() {
  const { theme, setBaseTheme, setColorTheme } = useAdvancedTheme();
  
  return (
    <div 
      style={{
        backgroundColor: theme.currentColors.card,
        color: theme.currentColors.cardForeground,
      }}
    >
      <p>Current theme: {theme.baseTheme} + {theme.colorTheme}</p>
      <button onClick={() => setBaseTheme('dark')}>
        Switch to Dark
      </button>
      <button onClick={() => setColorTheme('ocean')}>
        Switch to Ocean Theme
      </button>
    </div>
  );
}
```

### Using the Theme Selector

```tsx
import { AdvancedThemeSelector } from '@/shared';

function Header() {
  return (
    <header>
      {/* Your header content */}
      <AdvancedThemeSelector />
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
- **Sunset**: Warm oranges and yellows like a sunset
- **Lavender**: Soft purples for a gentle coding environment
- **Monochrome**: Pure black and white for minimal distraction
- **High Contrast**: Maximum contrast for accessibility

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

### Method 1: Using the Hook (Recommended)
```tsx
import { useAdvancedTheme } from '@/shared';

function MyComponent() {
  const { theme } = useAdvancedTheme();
  
  return (
    <div 
      className="p-4 rounded-lg"
      style={{
        backgroundColor: theme.currentColors.card,
        borderColor: theme.currentColors.border,
        color: theme.currentColors.cardForeground,
      }}
    >
      Themed content
    </div>
  );
}
```

### Method 2: Using CSS Variables
```css
.my-component {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
  border-color: var(--color-border);
}
```

### Method 3: Tailwind Classes (Future Enhancement)
```tsx
// Future implementation will support:
<div className="bg-card text-card-foreground border-border">
  Themed content
</div>
```

## CSS Variables Reference

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