'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAdvancedTheme } from '@/shared/hooks/useAdvancedTheme';
import { BaseTheme, ColorTheme } from '@/shared/types/theme';

const AdvancedThemeSelector: React.FC = () => {
  const { theme, setBaseTheme, setColorTheme, availableThemes } = useAdvancedTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'base' | 'color'>('base');
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

  const getBaseThemeIcon = (themeType: BaseTheme) => {
    switch (themeType) {
      case 'light':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'system':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getColorThemeIcon = (colorTheme: ColorTheme) => {
    const colors = {
      default: '#3b82f6',
      ocean: '#0ea5e9',
      forest: '#10b981',
      sunset: '#f59e0b',
      lavender: '#8b5cf6',
      monochrome: '#6b7280',
      'high-contrast': '#000000',
    };

    return (
      <div 
        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
        style={{ backgroundColor: colors[colorTheme] }}
      />
    );
  };

  const baseThemes: { key: BaseTheme; label: string }[] = [
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
    { key: 'system', label: 'System' },
  ];

  const currentThemeDef = availableThemes.find(t => t.id === theme.colorTheme);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          borderColor: theme.currentColors.border,
          backgroundColor: theme.currentColors.card,
          color: theme.currentColors.cardForeground,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.currentColors.muted;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.currentColors.card;
        }}
        aria-label="Toggle theme selector"
      >
        <div className="flex items-center space-x-1">
          {getBaseThemeIcon(theme.baseTheme)}
          {getColorThemeIcon(theme.colorTheme)}
        </div>
        <span className="text-sm font-medium hidden sm:block">
          {theme.baseTheme.charAt(0).toUpperCase() + theme.baseTheme.slice(1)} • {currentThemeDef?.name}
        </span>
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
        <div 
          className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg z-50 overflow-hidden"
          style={{
            backgroundColor: theme.currentColors.popover,
            borderColor: theme.currentColors.border,
            border: `1px solid ${theme.currentColors.border}`,
          }}
        >
          {/* Tab Headers */}
          <div className="flex border-b" style={{ borderColor: theme.currentColors.border }}>
            <button
              onClick={() => setActiveTab('base')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'base' ? 'border-b-2' : ''
              }`}
              style={{
                color: activeTab === 'base' ? theme.currentColors.primary : theme.currentColors.mutedForeground,
                borderBottomColor: activeTab === 'base' ? theme.currentColors.primary : 'transparent',
                backgroundColor: activeTab === 'base' ? theme.currentColors.muted : 'transparent',
              }}
            >
              Light/Dark
            </button>
            <button
              onClick={() => setActiveTab('color')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'color' ? 'border-b-2' : ''
              }`}
              style={{
                color: activeTab === 'color' ? theme.currentColors.primary : theme.currentColors.mutedForeground,
                borderBottomColor: activeTab === 'color' ? theme.currentColors.primary : 'transparent',
                backgroundColor: activeTab === 'color' ? theme.currentColors.muted : 'transparent',
              }}
            >
              Color Theme
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-1">
            {activeTab === 'base' ? (
              // Base theme options
              baseThemes.map((baseThemeOption) => (
                <button
                  key={baseThemeOption.key}
                  onClick={() => {
                    setBaseTheme(baseThemeOption.key);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors"
                  style={{
                    backgroundColor: theme.baseTheme === baseThemeOption.key ? theme.currentColors.accent : 'transparent',
                    color: theme.baseTheme === baseThemeOption.key ? theme.currentColors.accentForeground : theme.currentColors.popoverForeground,
                  }}
                  onMouseEnter={(e) => {
                    if (theme.baseTheme !== baseThemeOption.key) {
                      e.currentTarget.style.backgroundColor = theme.currentColors.muted;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (theme.baseTheme !== baseThemeOption.key) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {getBaseThemeIcon(baseThemeOption.key)}
                  <div className="flex-1">
                    <span className="text-sm font-medium">{baseThemeOption.label}</span>
                  </div>
                  {theme.baseTheme === baseThemeOption.key && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              // Color theme options
              availableThemes.map((colorThemeOption) => (
                <button
                  key={colorThemeOption.id}
                  onClick={() => {
                    setColorTheme(colorThemeOption.id);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors"
                  style={{
                    backgroundColor: theme.colorTheme === colorThemeOption.id ? theme.currentColors.accent : 'transparent',
                    color: theme.colorTheme === colorThemeOption.id ? theme.currentColors.accentForeground : theme.currentColors.popoverForeground,
                  }}
                  onMouseEnter={(e) => {
                    if (theme.colorTheme !== colorThemeOption.id) {
                      e.currentTarget.style.backgroundColor = theme.currentColors.muted;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (theme.colorTheme !== colorThemeOption.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
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
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedThemeSelector;