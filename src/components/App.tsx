import React from 'react';
import { usePyodide } from '@/hooks/usePyodide';
import { useResizableLayout } from '@/hooks/useResizableLayout';
import { useAppState } from '@/hooks/useAppState';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import { useAuth } from '@/hooks/useAuth';
import Header from './Header';
import MainLayout from './MainLayout';
import RightPane from './RightPane';
import ProblemDescription from './ProblemDescription';
import MobileUsageTip from './MobileUsageTip';

const App: React.FC = () => {
  const pyodideManager = usePyodide();
  const { layoutState, containerRef, rightPaneRef, handleHorizontalMouseDown, handleVerticalMouseDown } = useResizableLayout();
  const { appState, handleQuestionChange, handleLanguageChange, setPythonCode, setGoCode, setOutput, setTestResults, setIsRunning } = useAppState();
  const { executeCode } = useCodeExecution(pyodideManager);
  const { isAuthorizedForGo } = useAuth();

  const handleRunCode = async () => {
    if (!appState.currentQuestion) {
      setOutput('No question selected');
      return;
    }

    // Check if user is authorized for Go language
    if (appState.selectedLanguage === 'go' && !isAuthorizedForGo) {
      setOutput('Error: Go language requires authentication. Please login with an authorized account.');
      return;
    }

    setIsRunning(true);
    setOutput('');

    try {
      const codeToExecute = appState.selectedLanguage === 'go' ? appState.goCode : appState.pythonCode;
      const result = await executeCode(codeToExecute, appState.currentQuestion.testCases, appState.selectedLanguage, appState.selectedQuestionId);
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
    const codeToSubmit = appState.selectedLanguage === 'go' ? appState.goCode : appState.pythonCode;
    console.log('Submitting code:', codeToSubmit);
  };

  const handleCodeChange = (code: string) => {
    if (appState.selectedLanguage === 'go') {
      setGoCode(code);
    } else {
      setPythonCode(code);
    }
  };

  const getCurrentCode = () => {
    return appState.selectedLanguage === 'go' ? appState.goCode : appState.pythonCode;
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        selectedQuestionId={appState.selectedQuestionId}
        availableQuestions={appState.availableQuestions}
        onQuestionChange={handleQuestionChange}
        isLoading={appState.isLoadingQuestion}
        selectedLanguage={appState.selectedLanguage}
        onLanguageChange={handleLanguageChange}
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
              value: getCurrentCode(),
              onChange: handleCodeChange,
              language: appState.selectedLanguage,
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