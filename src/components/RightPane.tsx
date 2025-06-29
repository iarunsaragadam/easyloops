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
      <div 
        className="flex-1 min-h-0"
        style={{ 
          height: isMobile 
            ? `calc(100% - ${Math.min(testResultsProps.height, 250)}px - 40px)` 
            : `calc(100% - ${testResultsProps.height}px - 40px)`
        }}
      >
        <CodeEditor {...codeEditorProps} />
      </div>

      {/* Vertical Draggable Divider - Show on desktop */}
      {!isMobile && (
        <DraggableDivider
          onMouseDown={onVerticalMouseDown}
          orientation="vertical"
        />
      )}

      {/* Test Results */}
      <TestResultsPanel 
        {...testResultsProps} 
        height={isMobile ? Math.min(testResultsProps.height, 250) : testResultsProps.height}
      />
    </>
  );
};

export default RightPane; 