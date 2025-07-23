'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAdvancedTheme } from '@/shared/hooks/useAdvancedTheme';
import { ColorTheme } from '@/shared/types/theme';

interface ColorThemeSelectorProps {
  showLabel?: boolean;
}

const ColorThemeSelector: React.FC<ColorThemeSelectorProps> = ({ 
  showLabel = true 
}) => {
  const { theme, setColorTheme, availableColorThemes } = useAdvancedTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getColorThemeIcon = (colorTheme: ColorTheme) => {
    const colors = {
      default: '#3b82f6',
      ocean: '#0ea5e9',
      forest: '#10b981',
    };

    return (
      <div 
        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
        style={{ backgroundColor: colors[colorTheme] }}
      />
    );
  };

  const currentTheme = availableColorThemes.find(t => t.id === theme.colorTheme);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border bg-theme-card text-theme-card-foreground border-theme-border hover:bg-theme-muted transition-colors focus:outline-none focus:ring-2 focus:ring-theme-ring focus:ring-offset-2"
        aria-label="Select color theme"
      >
        {getColorThemeIcon(theme.colorTheme)}
        {showLabel && (
          <span className="text-sm font-medium hidden sm:block">
            {currentTheme?.name}
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-theme-popover border border-theme-border rounded-lg shadow-lg z-50">
          <div className="py-1">
            {availableColorThemes.map((colorThemeOption) => (
              <button
                key={colorThemeOption.id}
                onClick={() => {
                  setColorTheme(colorThemeOption.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-theme-muted transition-colors ${
                  theme.colorTheme === colorThemeOption.id
                    ? 'bg-theme-accent text-theme-accent-foreground'
                    : 'text-theme-popover-foreground'
                }`}
              >
                {getColorThemeIcon(colorThemeOption.id)}
                <div className="flex-1">
                  <span className="text-sm font-medium">{colorThemeOption.name}</span>
                  <p className="text-xs opacity-75">{colorThemeOption.description}</p>
                </div>
                {theme.colorTheme === colorThemeOption.id && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorThemeSelector;