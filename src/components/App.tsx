import React from 'react';
import { usePyodide } from '@/hooks/usePyodide';
import { useResizableLayout } from '@/hooks/useResizableLayout';
import { useAppState } from '@/hooks/useAppState';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import Header from './Header';
import MainLayout from './MainLayout';
import RightPane from './RightPane';
import ProblemDescription from './ProblemDescription';
import MobileUsageTip from './MobileUsageTip';

const App: React.FC = () => {
  const pyodideManager = usePyodide();
  const { layoutState, containerRef, rightPaneRef, handleHorizontalMouseDown, handleVerticalMouseDown } = useResizableLayout();
  const { appState, handleQuestionChange, setPythonCode, setOutput, setTestResults, setIsRunning } = useAppState();
  const { executeCode } = useCodeExecution(pyodideManager);

  const handleRunCode = async () => {
    if (!appState.currentQuestion) {
      setOutput('No question selected');
      return;
    }

    setIsRunning(true);
    setOutput('');

    try {
      const result = await executeCode(appState.pythonCode, appState.currentQuestion.testCases);
      setOutput(result.output);
      setTestResults(result.testResults);
    } catch (error) {
      setOutput(`Error: ${error}`);
      setTestResults([]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    // TODO: Implement code submission
    console.log('Submitting code:', appState.pythonCode);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        selectedQuestionId={appState.selectedQuestionId}
        availableQuestions={appState.availableQuestions}
        onQuestionChange={handleQuestionChange}
        isLoading={appState.isLoadingQuestion}
      />

      <MainLayout
        layoutState={layoutState}
        containerRef={containerRef}
        rightPaneRef={rightPaneRef}
        onHorizontalMouseDown={handleHorizontalMouseDown}
        leftPane={
          <ProblemDescription
            question={appState.currentQuestion}
            isLoading={appState.isLoadingQuestion}
          />
        }
        rightPane={
          <RightPane
            codeEditorProps={{
              value: appState.pythonCode,
              onChange: setPythonCode,
              language: 'python',
              height: '100%',
              isRunning: appState.isRunning,
              onRun: handleRunCode,
              onSubmit: handleSubmitCode
            }}
            testResultsProps={{
              testResults: appState.testResults,
              output: appState.output,
              height: layoutState.testResultsHeight
            }}
            onVerticalMouseDown={handleVerticalMouseDown}
          />
        }
      />

      {/* Mobile Usage Tip */}
      <MobileUsageTip />
    </div>
  );
};

export default App; 