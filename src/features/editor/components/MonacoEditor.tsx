'use client';

import React, { useEffect, useRef } from 'react';
import { MONACO_CONFIG } from '@/shared/constants';

export type MonacoEditorProps = {
  value: string;
  language?: string;
  theme?: string;
  onChange?: (value: string) => void;
  height?: string | number;
};

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language = 'python',
  theme = 'vs-dark',
  onChange,
  height = '100%',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Monaco types are not available for CDN UMD loader, so we use 'any' here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isInitializedRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monacoRef = useRef<any>(null);

  // Initialize Monaco editor (only once)
  useEffect(() => {
    const currentContainer = containerRef.current;

    if (
      typeof window !== 'undefined' &&
      currentContainer &&
      !isInitializedRef.current
    ) {
      // Check if Monaco is already loaded
      if ('require' in window) {
        initializeEditor();
      } else {
        // Load Monaco script
        scriptRef.current = document.createElement('script');
        scriptRef.current.src = MONACO_CONFIG.CDN_URL;
        scriptRef.current.onload = initializeEditor;
        document.body.appendChild(scriptRef.current);
      }
    }

    function initializeEditor() {
      if (!currentContainer || isInitializedRef.current) return;

      // @ts-expect-error: Monaco loader is attached to window by CDN script
      window.require.config({ paths: { vs: MONACO_CONFIG.VS_PATH } });
      // @ts-expect-error: Monaco loader is attached to window by CDN script
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.require(['vs/editor/editor.main'], (monaco: any) => {
        if (currentContainer && !isInitializedRef.current) {
          // Store monaco reference
          monacoRef.current = monaco;

          // Clear the container to ensure it's clean
          currentContainer.innerHTML = '';

          editorRef.current = monaco.editor.create(currentContainer, {
            value,
            language,
            theme,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
          });

          editorRef.current.onDidChangeModelContent(() => {
            if (onChange) {
              const newValue = editorRef.current.getValue();
              console.log(
                'Editor content changed:',
                newValue.substring(0, 100) + '...'
              );
              onChange(newValue);
            }
          });

          // Create ResizeObserver to handle container size changes
          resizeObserverRef.current = new ResizeObserver(() => {
            if (editorRef.current) {
              editorRef.current.layout();
            }
          });
          resizeObserverRef.current.observe(currentContainer);

          isInitializedRef.current = true;
        }
      });
    }

    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once

  // Update editor properties when they change
  useEffect(() => {
    if (editorRef.current && isInitializedRef.current && monacoRef.current) {
      // Update language if changed
      const currentLanguage = editorRef.current.getModel()?.getLanguageId();
      if (currentLanguage !== language) {
        monacoRef.current.editor.setModelLanguage(
          editorRef.current.getModel(),
          language
        );
      }

      // Update theme if changed
      monacoRef.current.editor.setTheme(theme);
    }
  }, [language, theme]);

  // Update value if it changes from outside
  useEffect(() => {
    if (
      editorRef.current &&
      isInitializedRef.current &&
      value !== editorRef.current.getValue()
    ) {
      console.log(
        'Updating editor value from props:',
        value.substring(0, 100) + '...'
      );
      editorRef.current.setValue(value);
    }
  }, [value]);

  // Resize editor when height changes
  useEffect(() => {
    if (editorRef.current && isInitializedRef.current) {
      editorRef.current.layout();
    }
  }, [height]);

  function cleanup() {
    if (editorRef.current) {
      editorRef.current.dispose();
      editorRef.current = null;
    }
    if (scriptRef.current && document.body.contains(scriptRef.current)) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }
    if (resizeObserverRef.current && containerRef.current) {
      resizeObserverRef.current.unobserve(containerRef.current);
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }
    isInitializedRef.current = false;
    monacoRef.current = null;
  }

  return <div ref={containerRef} style={{ width: '100%', height: height }} />;
};

export default MonacoEditor;
