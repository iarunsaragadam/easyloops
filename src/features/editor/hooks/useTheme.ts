import { useState, useEffect, createContext, useContext } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side after mount
    setIsClient(true);

    // Get initial theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Only run on client-side
    if (!isClient) return;

    const root = window.document.documentElement;
    const body = window.document.body;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');

    let effectiveTheme: 'light' | 'dark';

    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      effectiveTheme = theme;
    }

    // Apply theme classes
    root.classList.add(effectiveTheme);
    body.classList.add(effectiveTheme);

    // Update CSS custom properties
    if (effectiveTheme === 'dark') {
      root.style.setProperty('--background', '#0a0a0a');
      root.style.setProperty('--foreground', '#ededed');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#171717');
    }

    setResolvedTheme(effectiveTheme);

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, isClient]);

  // Listen for system theme changes
  useEffect(() => {
    // Only run on client-side
    if (!isClient) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        const effectiveTheme = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(effectiveTheme);

        const root = window.document.documentElement;
        const body = window.document.body;

        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        root.classList.add(effectiveTheme);
        body.classList.add(effectiveTheme);

        if (effectiveTheme === 'dark') {
          root.style.setProperty('--background', '#0a0a0a');
          root.style.setProperty('--foreground', '#ededed');
        } else {
          root.style.setProperty('--background', '#ffffff');
          root.style.setProperty('--foreground', '#171717');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, isClient]);

  return {
    theme,
    setTheme,
    resolvedTheme: isClient ? resolvedTheme : 'light', // Return consistent value during SSR
  };
};

export { ThemeContext };
