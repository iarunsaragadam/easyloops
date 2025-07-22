'use client';

import React from 'react';
import { useAdvancedTheme } from '@/shared/hooks/useAdvancedTheme';
import AdvancedThemeSelector from './AdvancedThemeSelector';

const ThemeDemo: React.FC = () => {
  const { theme } = useAdvancedTheme();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Theme System Demo</h2>
        <AdvancedThemeSelector />
      </div>
      
      {/* Theme Info Card */}
      <div 
        className="p-4 rounded-lg border"
        style={{
          backgroundColor: theme.currentColors.card,
          borderColor: theme.currentColors.border,
          color: theme.currentColors.cardForeground,
        }}
      >
        <h3 className="text-lg font-semibold mb-2">Current Theme</h3>
        <div className="space-y-1 text-sm">
          <p><strong>Base Theme:</strong> {theme.baseTheme} (resolved: {theme.resolvedBaseTheme})</p>
          <p><strong>Color Theme:</strong> {theme.colorTheme}</p>
        </div>
      </div>

      {/* Color Palette Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Color Palette</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Primary Colors */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Primary</h4>
            <div 
              className="h-16 rounded-lg flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.currentColors.primary,
                color: theme.currentColors.primaryForeground,
              }}
            >
              Primary
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Secondary</h4>
            <div 
              className="h-16 rounded-lg flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.currentColors.secondary,
                color: theme.currentColors.secondaryForeground,
              }}
            >
              Secondary
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Accent</h4>
            <div 
              className="h-16 rounded-lg flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.currentColors.accent,
                color: theme.currentColors.accentForeground,
              }}
            >
              Accent
            </div>
          </div>

          {/* Muted Colors */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Muted</h4>
            <div 
              className="h-16 rounded-lg flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.currentColors.muted,
                color: theme.currentColors.mutedForeground,
              }}
            >
              Muted
            </div>
          </div>
        </div>

        {/* Status Colors */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Status Colors</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="h-12 rounded-lg flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.currentColors.success,
                color: theme.currentColors.successForeground,
              }}
            >
              Success
            </div>
            <div 
              className="h-12 rounded-lg flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.currentColors.warning,
                color: theme.currentColors.warningForeground,
              }}
            >
              Warning
            </div>
            <div 
              className="h-12 rounded-lg flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.currentColors.error,
                color: theme.currentColors.errorForeground,
              }}
            >
              Error
            </div>
            <div 
              className="h-12 rounded-lg flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: theme.currentColors.info,
                color: theme.currentColors.infoForeground,
              }}
            >
              Info
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Elements Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Elements</h3>
        
        <div className="flex flex-wrap gap-4">
          <button
            className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-80"
            style={{
              backgroundColor: theme.currentColors.primary,
              color: theme.currentColors.primaryForeground,
            }}
          >
            Primary Button
          </button>
          
          <button
            className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-80"
            style={{
              backgroundColor: theme.currentColors.secondary,
              color: theme.currentColors.secondaryForeground,
            }}
          >
            Secondary Button
          </button>

          <input
            type="text"
            placeholder="Input field"
            className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.currentColors.background,
              borderColor: theme.currentColors.input,
              color: theme.currentColors.foreground,
            }}
          />
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Code Editor Colors</h3>
        
        <div 
          className="p-4 rounded-lg font-mono text-sm"
          style={{
            backgroundColor: theme.currentColors.codeBackground,
            color: theme.currentColors.codeForeground,
          }}
        >
          <div>
            <span style={{ color: theme.currentColors.codeComment }}>// This is a comment</span>
          </div>
          <div>
            <span style={{ color: theme.currentColors.codeKeyword }}>function</span>{' '}
            <span>greet</span>(<span style={{ color: theme.currentColors.codeString }}>"name"</span>) {'{'}
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: theme.currentColors.codeKeyword }}>return</span>{' '}
            <span style={{ color: theme.currentColors.codeString }}>`Hello, ${'{'}name{'}'}`</span>;
          </div>
          <div>{'}'}</div>
          <div>
            <span style={{ color: theme.currentColors.codeKeyword }}>const</span>{' '}
            <span>result</span>{' '}
            <span style={{ color: theme.currentColors.codeOperator }}>=</span>{' '}
            <span>greet</span>(<span style={{ color: theme.currentColors.codeString }}>"World"</span>);
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;