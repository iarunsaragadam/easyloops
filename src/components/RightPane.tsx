import React from 'react';
import { CodeEditorProps, TestResultsPanelProps } from '@/types';
import { useWindowSize } from '@/hooks/useWindowSize';
import CodeEditor from './CodeEditor';
import TestResultsPanel from './TestResultsPanel';
import DraggableDivider from './DraggableDivider';

interface RightPaneProps {
  codeEditorProps: CodeEditorProps;
  testResultsProps: TestResultsPanelProps;
  onVerticalMouseDown: (e: React.MouseEvent) => void;
}

const RightPane: React.FC<RightPaneProps> = ({
  codeEditorProps,
  testResultsProps,
  onVerticalMouseDown
}) => {
  const { isMobile } = useWindowSize();

  return (
    <>
      {/* Code Editor */}
<<<<<<< HEAD
      <div 
        className="flex-1 min-h-0"
        style={{ 
          height: isMobile 
            ? `calc(100% - ${Math.min(testResultsProps.height || 0, 250)}px - 40px)` 
            : `calc(100% - ${testResultsProps.height || 0}px - 40px)`
        }}
=======
      <div
        className="overflow-hidden"
        style={{ height: `${100 - ((testResultsProps.height ?? 0.5) * 100)}%` }}
>>>>>>> 58e6109b (feat: allow code editor and test results to be resized to zero, default to 50/50 split)
      >
        {(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { key, ...rest } = codeEditorProps as any;
          return <CodeEditor key={key} {...rest} />;
        })()}
      </div>

      {/* Vertical Draggable Divider - Show on desktop */}
      {!isMobile && (
        <DraggableDivider
          onMouseDown={onVerticalMouseDown}
          orientation="vertical"
        />
      )}

      {/* Test Results */}
<<<<<<< HEAD
      <TestResultsPanel 
        {...testResultsProps} 
        height={isMobile ? Math.min(testResultsProps.height || 0, 250) : testResultsProps.height || 0}
      />
=======
      <div style={{ height: `${(testResultsProps.height ?? 0.5) * 100}%` }}>
        <TestResultsPanel {...testResultsProps} />
      </div>
>>>>>>> 58e6109b (feat: allow code editor and test results to be resized to zero, default to 50/50 split)
    </>
  );
};

export default RightPane; 