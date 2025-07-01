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

  // Force editor to update when language changes
  const [editorKey, setEditorKey] = React.useState(0);

  // Custom language change handler
  const handleLanguageChangeWithUpdate = (language: string) => {
    handleLanguageChange(language);
    // Force editor to re-render
    setEditorKey(prev => prev + 1);
    console.log(`Language changed to ${language}, editor refreshed`);
  };

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
      console.log('Executing code:', codeToExecute.substring(0, 100) + '...');
      const result = await executeCode(codeToExecute, appState.currentQuestion.testCases, appState.selectedLanguage);
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
    const language = appState.selectedLanguage;
    console.log(`Updating ${language} code:`, code.substring(0, 100) + '...');
    
    if (language === 'go') {
      setGoCode(code);
    } else {
      setPythonCode(code);
    }
  };

  const getCurrentCode = () => {
    const language = appState.selectedLanguage;
    const code = language === 'go' ? appState.goCode : appState.pythonCode;
    console.log(`Getting code for ${language}:`, code.substring(0, 100) + '...');
    return code;
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        selectedQuestionId={appState.selectedQuestionId}
        availableQuestions={appState.availableQuestions}
        onQuestionChange={handleQuestionChange}
        isLoading={appState.isLoadingQuestion}
        selectedLanguage={appState.selectedLanguage}
        onLanguageChange={handleLanguageChangeWithUpdate}
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
            key={editorKey}
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