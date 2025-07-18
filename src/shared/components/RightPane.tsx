import React from 'react';
import { CodeEditorProps, TestResultsPanelProps } from '@/shared/types';
import { useWindowSize } from '@/shared';
import { CodeEditor } from '@/features/editor';
import { TestResultsPanel } from '@/features/question';
import { DraggableDivider } from '@/shared';

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
      <div className="overflow-hidden code-editor-container">
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
      <div className="test-results-container">
        <TestResultsPanel {...testResultsProps} />
      </div>
    </>
  );
};

export default RightPane;
