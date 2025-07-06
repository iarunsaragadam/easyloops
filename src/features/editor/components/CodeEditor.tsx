import React from 'react';
import { CodeEditorProps } from '@/shared/types';
import MonacoEditor from './MonacoEditor';
import { useTheme } from '@/features/editor/hooks/useTheme';

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'python',
  height = '100%',
  isRunning = false,
  onRun,
  onSubmit,
}) => {
  const { resolvedTheme } = useTheme();
  
  // Monaco theme mapping
  const monacoTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'vs';

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 md:px-4 py-2 flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between transition-colors">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            💻 Code Editor
          </span>
        </div>
        <div className="flex items-center space-x-2 justify-end md:justify-start">
          <button
            onClick={onRun}
            disabled={isRunning}
            className="px-3 py-1.5 md:py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex-1 md:flex-none min-w-[80px]"
          >
            {isRunning ? (
              <span className="flex items-center justify-center">
                <span className="hidden md:inline">⏳ Running...</span>
                <span className="md:hidden">⏳ Run...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="hidden md:inline">✅ Run</span>
                <span className="md:hidden">▶️</span>
              </span>
            )}
          </button>
          <button
            onClick={onSubmit}
            className="px-3 py-1.5 md:py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex-1 md:flex-none min-w-[80px]"
          >
            <span className="flex items-center justify-center">
              <span className="hidden md:inline">📤 Submit</span>
              <span className="md:hidden">📤</span>
            </span>
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <MonacoEditor
          value={value}
          onChange={onChange}
          language={language}
          height={height}
          theme={monacoTheme}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
