import React from 'react';
import { usePyodide, useCodeExecution } from '@/features/editor';
import { useResizableLayout } from '@/shared';
import { useAppState } from '@/features/question';
import { useAuth } from '@/features/auth';
import { Header, MainLayout, RightPane, MobileUsageTip } from '@/shared';
import { ProblemDescription } from '@/features/question';

const App: React.FC = () => {
  const pyodideManager = usePyodide();
  const {
    layoutState,
    containerRef,
    rightPaneRef,
    handleHorizontalMouseDown,
    handleVerticalMouseDown,
  } = useResizableLayout();
  const {
    appState,
    handleQuestionChange,
    handleLanguageChange,
    setCodeForLanguage,
    getCurrentCode,
    setOutput,
    setTestResults,
    setIsRunning,
  } = useAppState();
  const { executeCode } = useCodeExecution(pyodideManager);
  const { isAuthorizedForGo, user } = useAuth();

  // Force editor to update when language changes
  const [editorKey, setEditorKey] = React.useState(0);

  // Custom language change handler
  const handleLanguageChangeWithUpdate = (language: string) => {
    handleLanguageChange(language);
    // Force editor to re-render
    setEditorKey((prev) => prev + 1);
    console.log(`Language changed to ${language}, editor refreshed`);
  };

  const handleRunCode = async () => {
    console.log('🚀 Run button clicked!');

    // Add a timeout to prevent infinite loops
    const timeoutId = setTimeout(() => {
      console.log('⏰ Timeout reached - execution taking too long');
      setOutput('Execution timeout - taking too long');
      setIsRunning(false);
    }, 10000); // 10 second timeout

    try {
      console.log('Current state:', {
        currentQuestion: appState.currentQuestion?.name,
        selectedLanguage: appState.selectedLanguage,
        isAuthorizedForGo,
        user: user?.email,
      });

      if (!appState.currentQuestion) {
        console.log('❌ No question selected');
        setOutput('No question selected');
        clearTimeout(timeoutId);
        return;
      }

      // Check if user is authorized for Go language
      if (appState.selectedLanguage === 'go' && !isAuthorizedForGo) {
        console.log('❌ User not authorized for Go');
        setOutput(
          'Error: Go language requires authentication. Please login with an authorized account.'
        );
        clearTimeout(timeoutId);
        return;
      }

      console.log('✅ Starting code execution...');
      setIsRunning(true);
      setOutput('');

      const codeToExecute =
        appState.selectedLanguage === 'go'
          ? appState.goCode
          : appState.pythonCode;
      console.log(
        '📝 Executing code:',
        codeToExecute.substring(0, 100) + '...'
      );
      console.log('🧪 Test cases:', appState.currentQuestion.testCases.length);

      const result = await executeCode(
        codeToExecute,
        appState.currentQuestion.testCases,
        appState.selectedLanguage
      );
      console.log('✅ Execution completed:', result);

      clearTimeout(timeoutId);
      setOutput(result.output);
      setTestResults(result.testResults);
    } catch (error) {
      console.error('❌ Execution failed:', error);
      clearTimeout(timeoutId);
      setOutput(`Error: ${error}`);
      setTestResults([]);
    } finally {
      console.log('🏁 Execution finished, setting isRunning to false');
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    // TODO: Implement code submission
    const codeToSubmit =
      appState.selectedLanguage === 'go'
        ? appState.goCode
        : appState.pythonCode;
    console.log('Submitting code:', codeToSubmit);
  };

  const handleCodeChange = (code: string) => {
    const language = appState.selectedLanguage;
    console.log(`Updating ${language} code:`, code.substring(0, 100) + '...');

    // Use the new generic function for any language
    setCodeForLanguage(language, code);
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
              onSubmit: handleSubmitCode,
            }}
            testResultsProps={{
              testResults: appState.testResults,
              output: appState.output,
              height: layoutState.testResultsHeight,
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
