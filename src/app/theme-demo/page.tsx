'use client';

import React from 'react';
import { SimpleThemeSelector, ColorThemeSelector } from '@/shared';
import { useAdvancedTheme } from '@/shared/hooks/useAdvancedTheme';

export default function ThemeDemoPage() {
  const { theme } = useAdvancedTheme();

  return (
    <div className="min-h-screen bg-theme-background text-theme-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Theme System Demo</h1>
          <div className="flex items-center space-x-4">
            <ColorThemeSelector />
            <SimpleThemeSelector />
          </div>
        </div>
        
        {/* Current Theme Info */}
        <div className="bg-theme-card text-theme-card-foreground p-6 rounded-lg border border-theme-border">
          <h2 className="text-xl font-semibold mb-4">Current Theme Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Base Theme:</span>
              <div className="text-theme-muted-foreground">{theme.baseTheme}</div>
            </div>
            <div>
              <span className="font-medium">Resolved Mode:</span>
              <div className="text-theme-muted-foreground">{theme.resolvedBaseTheme}</div>
            </div>
            <div>
              <span className="font-medium">Color Theme:</span>
              <div className="text-theme-muted-foreground">{theme.colorTheme}</div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Color Palette</h2>
          
          {/* Primary Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Primary Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-theme-primary text-theme-primary-foreground p-4 rounded-lg text-center">
                <div className="font-medium">Primary</div>
                <div className="text-sm opacity-75">theme-primary</div>
              </div>
              <div className="bg-theme-secondary text-theme-secondary-foreground p-4 rounded-lg text-center">
                <div className="font-medium">Secondary</div>
                <div className="text-sm opacity-75">theme-secondary</div>
              </div>
              <div className="bg-theme-accent text-theme-accent-foreground p-4 rounded-lg text-center">
                <div className="font-medium">Accent</div>
                <div className="text-sm opacity-75">theme-accent</div>
              </div>
              <div className="bg-theme-muted text-theme-muted-foreground p-4 rounded-lg text-center">
                <div className="font-medium">Muted</div>
                <div className="text-sm opacity-75">theme-muted</div>
              </div>
            </div>
          </div>

          {/* Status Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Status Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-theme-success text-theme-success-foreground p-4 rounded-lg text-center">
                <div className="font-medium">Success</div>
                <div className="text-sm opacity-75">theme-success</div>
              </div>
              <div className="bg-theme-warning text-theme-warning-foreground p-4 rounded-lg text-center">
                <div className="font-medium">Warning</div>
                <div className="text-sm opacity-75">theme-warning</div>
              </div>
              <div className="bg-theme-error text-theme-error-foreground p-4 rounded-lg text-center">
                <div className="font-medium">Error</div>
                <div className="text-sm opacity-75">theme-error</div>
              </div>
              <div className="bg-theme-info text-theme-info-foreground p-4 rounded-lg text-center">
                <div className="font-medium">Info</div>
                <div className="text-sm opacity-75">theme-info</div>
              </div>
            </div>
          </div>

          {/* Code Editor Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Code Editor Colors</h3>
            <div className="bg-theme-code-background text-theme-code-foreground p-4 rounded-lg font-mono text-sm border border-theme-border">
              <div className="space-y-1">
                <div>
                  <span className="text-theme-code-comment">// This is a comment</span>
                </div>
                <div>
                  <span className="text-theme-code-keyword">function</span>{' '}
                  <span>greet</span>(<span className="text-theme-code-string">"name"</span>) {'{'}
                </div>
                <div className="pl-4">
                  <span className="text-theme-code-keyword">return</span>{' '}
                  <span className="text-theme-code-string">`Hello, ${'{'}</span>
                  <span className="text-theme-code-string">name</span>
                  <span className="text-theme-code-string">{'}'}`</span>;
                </div>
                <div>{'}'}</div>
                <div>
                  <span className="text-theme-code-keyword">const</span>{' '}
                  <span>result</span>{' '}
                  <span className="text-theme-code-operator">=</span>{' '}
                  <span>greet</span>(<span className="text-theme-code-string">"World"</span>);
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Elements</h2>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button className="bg-theme-primary text-theme-primary-foreground px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
                Primary Button
              </button>
              <button className="bg-theme-secondary text-theme-secondary-foreground px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
                Secondary Button
              </button>
              <button className="bg-theme-accent text-theme-accent-foreground px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
                Accent Button
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <input 
                type="text" 
                placeholder="Input field" 
                className="bg-theme-background text-theme-foreground border border-theme-input px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-ring"
              />
              <select className="bg-theme-background text-theme-foreground border border-theme-input px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-ring">
                <option>Select option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Cards & Containers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-theme-card text-theme-card-foreground p-6 rounded-lg border border-theme-border">
              <h3 className="text-lg font-medium mb-3">Card Title</h3>
              <p className="text-theme-muted-foreground mb-4">
                This is a card with muted text content that shows how the theme system works.
              </p>
              <button className="bg-theme-primary text-theme-primary-foreground px-3 py-1 rounded text-sm">
                Action
              </button>
            </div>
            
            <div className="bg-theme-popover text-theme-popover-foreground p-6 rounded-lg border border-theme-border">
              <h3 className="text-lg font-medium mb-3">Popover Style</h3>
              <p className="text-theme-muted-foreground mb-4">
                This uses popover colors which might be different from card colors in some themes.
              </p>
              <button className="bg-theme-accent text-theme-accent-foreground px-3 py-1 rounded text-sm">
                Action
              </button>
            </div>
          </div>
        </div>

        {/* CSS Variables Reference */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Usage Example</h2>
          
          <div className="bg-theme-code-background text-theme-code-foreground p-4 rounded-lg font-mono text-sm border border-theme-border">
            <div className="space-y-1">
              <div className="text-theme-code-comment">/* Using Tailwind classes */</div>
              <div>
                <span className="text-theme-code-keyword">className</span>=
                <span className="text-theme-code-string">"bg-theme-primary text-theme-primary-foreground"</span>
              </div>
              <div></div>
              <div className="text-theme-code-comment">/* Using CSS variables directly */</div>
              <div>
                <span className="text-theme-code-keyword">style</span>=
                <span className="text-theme-code-string">{`{{ backgroundColor: 'hsl(var(--color-primary))' }}`}</span>
              </div>
              <div></div>
              <div className="text-theme-code-comment">/* CSS file */</div>
              <div>
                <span className="text-theme-code-keyword">.my-element</span> {'{'}
              </div>
              <div className="pl-4">
                <span className="text-theme-code-keyword">background-color</span>: 
                <span className="text-theme-code-string">hsl(var(--color-primary))</span>;
              </div>
              <div>{'}'}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}