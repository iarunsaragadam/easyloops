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

  useEffect(() => {
    const currentContainer = containerRef.current;
    let script: HTMLScriptElement | null = null;
    // Monaco types are not available for CDN UMD loader, so we use 'any' here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let editor: any = null;
    let resizeObserver: ResizeObserver | null = null;

    if (typeof window !== 'undefined' && currentContainer) {
      script = document.createElement('script');
      script.src = MONACO_CONFIG.CDN_URL;
      script.onload = () => {
        // @ts-expect-error: Monaco loader is attached to window by CDN script
        window.require.config({ paths: { vs: MONACO_CONFIG.VS_PATH } });
        // @ts-expect-error: Monaco loader is attached to window by CDN script
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.require(['vs/editor/editor.main'], (monaco: any) => {
          if (currentContainer) {
            editor = monaco.editor.create(currentContainer, {
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
            editor.onDidChangeModelContent(() => {
              if (onChange) {
                const newValue = editor.getValue();
                console.log(
                  'Editor content changed:',
                  newValue.substring(0, 100) + '...'
                );
                onChange(newValue);
              }
            });
            editorRef.current = editor;

            // Create ResizeObserver to handle container size changes
            resizeObserver = new ResizeObserver(() => {
              if (editor) {
                editor.layout();
              }
            });
            resizeObserver.observe(currentContainer);
          }
        });
      };
      document.body.appendChild(script);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (resizeObserver && currentContainer) {
        resizeObserver.unobserve(currentContainer);
        resizeObserver.disconnect();
      }
    };
  }, [value, language, theme, onChange]);

  // Update value if it changes from outside
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      console.log(
        'Updating editor value from props:',
        value.substring(0, 100) + '...'
      );
      editorRef.current.setValue(value);
    }
  }, [value]);

  // Resize editor when height changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [height]);

  return <div ref={containerRef} style={{ width: '100%', height: height }} />;
};

export default MonacoEditor;
