import React from 'react';
import { CodeEditorProps, TestResultsPanelProps } from '@/types';
import { useWindowSize } from '@/hooks/useWindowSize';
import CodeEditor from '../Editor/CodeEditor';
import TestResultsPanel from '../Question/TestResultsPanel';
import DraggableDivider from '../ui/DraggableDivider';

interface RightPaneProps {
  codeEditorProps: CodeEditorProps;
  testResultsProps: TestResultsPanelProps;
  onVerticalMouseDown: (e: React.MouseEvent) => void;
}

const RightPane: React.FC<RightPaneProps> = ({
  codeEditorProps,
  testResultsProps,
  onVerticalMouseDown,
}) => {
  const { isMobile } = useWindowSize();

  return (
    <>
      {/* Code Editor */}
      <div
        className="overflow-hidden"
        style={{ height: `${100 - (testResultsProps.height ?? 0.5) * 100}%` }}
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
      <div style={{ height: `${(testResultsProps.height ?? 0.5) * 100}%` }}>
        <TestResultsPanel {...testResultsProps} />
      </div>
    </>
  );
};

export default RightPane;
