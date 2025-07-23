/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Legacy colors for backwards compatibility
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // New theme system colors
        'theme-background': 'hsl(var(--color-background))',
        'theme-foreground': 'hsl(var(--color-foreground))',
        'theme-muted': 'hsl(var(--color-muted))',
        'theme-muted-foreground': 'hsl(var(--color-muted-foreground))',
        
        'theme-primary': 'hsl(var(--color-primary))',
        'theme-primary-foreground': 'hsl(var(--color-primary-foreground))',
        'theme-secondary': 'hsl(var(--color-secondary))',
        'theme-secondary-foreground': 'hsl(var(--color-secondary-foreground))',
        'theme-accent': 'hsl(var(--color-accent))',
        'theme-accent-foreground': 'hsl(var(--color-accent-foreground))',
        
        'theme-card': 'hsl(var(--color-card))',
        'theme-card-foreground': 'hsl(var(--color-card-foreground))',
        'theme-popover': 'hsl(var(--color-popover))',
        'theme-popover-foreground': 'hsl(var(--color-popover-foreground))',
        
        'theme-border': 'hsl(var(--color-border))',
        'theme-input': 'hsl(var(--color-input))',
        'theme-ring': 'hsl(var(--color-ring))',
        
        'theme-success': 'hsl(var(--color-success))',
        'theme-success-foreground': 'hsl(var(--color-success-foreground))',
        'theme-warning': 'hsl(var(--color-warning))',
        'theme-warning-foreground': 'hsl(var(--color-warning-foreground))',
        'theme-error': 'hsl(var(--color-error))',
        'theme-error-foreground': 'hsl(var(--color-error-foreground))',
        'theme-info': 'hsl(var(--color-info))',
        'theme-info-foreground': 'hsl(var(--color-info-foreground))',
        
        'theme-code-background': 'hsl(var(--color-code-background))',
        'theme-code-foreground': 'hsl(var(--color-code-foreground))',
        'theme-code-selection': 'hsl(var(--color-code-selection))',
        'theme-code-comment': 'hsl(var(--color-code-comment))',
        'theme-code-keyword': 'hsl(var(--color-code-keyword))',
        'theme-code-string': 'hsl(var(--color-code-string))',
        'theme-code-number': 'hsl(var(--color-code-number))',
        'theme-code-operator': 'hsl(var(--color-code-operator))',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: [
          'var(--font-geist-mono)',
          'Monaco',
          'Menlo',
          'Ubuntu Mono',
          'monospace',
        ],
        comfortaa: ['var(--font-comfortaa)', 'Comfortaa', 'cursive'],
      },
    },
  },
  plugins: [],
};
