import React from 'react';
import { usePyodide, useCodeExecution } from '@/features/editor';
import { useResizableLayout } from '@/shared';
import { useAppState } from '@/features/question';
import { useAuth } from '@/features/auth';
import { Header, MainLayout, RightPane, MobileUsageTip } from '@/shared';
import { ProblemDescription } from '@/features/question';
import { ExecutionMode, SubmissionResult } from '@/shared/types';

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
  const { executeCode, executeAndSubmit } = useCodeExecution(pyodideManager);
  const { isAuthorizedForGo, user } = useAuth();

  // Force editor to update when language changes
  const [editorKey, setEditorKey] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [lastSubmission, setLastSubmission] =
    React.useState<SubmissionResult | null>(null);

  // Custom language change handler
  const handleLanguageChangeWithUpdate = (language: string) => {
    handleLanguageChange(language);
    // Force editor to re-render
    setEditorKey((prev) => prev + 1);
    console.log(`Language changed to ${language}, editor refreshed`);
  };

  const handleRunCode = async () => {
    console.log('🚀 Run button clicked - running sample test cases!');

    const timeoutId = setTimeout(() => {
      console.log('⏰ Timeout reached - execution taking too long');
      setOutput('Execution timeout - taking too long');
      setIsRunning(false);
    }, 10000);

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

      if (appState.selectedLanguage === 'go' && !isAuthorizedForGo) {
        console.log('❌ User not authorized for Go');
        setOutput(
          'Error: Go language requires authentication. Please login with an authorized account.'
        );
        clearTimeout(timeoutId);
        return;
      }

      console.log(
        '✅ Starting code execution in RUN mode (first 2 test cases)...'
      );
      setIsRunning(true);
      setOutput('');

      const codeToExecute = getCurrentCode();

      console.log(
        '📝 Executing code:',
        codeToExecute.substring(0, 100) + '...'
      );
      console.log(
        '🧪 Total test cases:',
        appState.currentQuestion.testCases.length
      );
      console.log('📊 Running sample test cases (first 2)...');

      const runMode: ExecutionMode = {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      };

      const result = await executeCode(
        codeToExecute,
        appState.currentQuestion.testCases,
        appState.selectedLanguage,
        runMode
      );

      console.log('✅ Sample execution completed:', result);

      clearTimeout(timeoutId);
      setOutput(result.output);
      setTestResults(result.testResults);
    } catch (error) {
      console.error('❌ Execution failed:', error);
      clearTimeout(timeoutId);
      setOutput(`Error: ${error}`);
      setTestResults([]);
    } finally {
      console.log('🏁 Sample execution finished');
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    console.log('🚀 Evaluate All button clicked - running full submission!');

    const timeoutId = setTimeout(() => {
      console.log('⏰ Timeout reached - submission taking too long');
      setOutput('Submission timeout - taking too long');
      setIsSubmitting(false);
    }, 30000); // 30 seconds timeout for full submission

    try {
      if (!appState.currentQuestion) {
        console.log('❌ No question selected');
        setOutput('No question selected');
        clearTimeout(timeoutId);
        return;
      }

      if (appState.selectedLanguage === 'go' && !isAuthorizedForGo) {
        console.log('❌ User not authorized for Go');
        setOutput(
          'Error: Go language requires authentication. Please login with an authorized account.'
        );
        clearTimeout(timeoutId);
        return;
      }

      console.log('✅ Starting full submission evaluation...');
      setIsSubmitting(true);
      setOutput('');

      const codeToSubmit = getCurrentCode();

      console.log(
        '📝 Submitting code:',
        codeToSubmit.substring(0, 100) + '...'
      );
      console.log(
        '🧪 Total test cases:',
        appState.currentQuestion.testCases.length
      );
      console.log('📊 Running full evaluation against all test cases...');

      const { result, submission } = await executeAndSubmit(
        codeToSubmit,
        appState.currentQuestion.testCases,
        appState.selectedLanguage,
        appState.currentQuestion.id
      );

      console.log('✅ Full submission completed:', { result, submission });

      clearTimeout(timeoutId);

      const submissionSummary = `
🎯 Full Evaluation Complete!

📊 Results Summary:
• Passed: ${submission.passedCount}/${submission.totalCount} test cases
• Status: ${submission.overallStatus}
• Execution Time: ${submission.executionTime}ms
• Submission ID: ${submission.id}

${result.output}

💾 Submission saved as snapshot for future reference.
      `.trim();

      setOutput(submissionSummary);
      setTestResults(result.testResults);
      setLastSubmission(submission);
    } catch (error) {
      console.error('❌ Submission failed:', error);
      clearTimeout(timeoutId);
      setOutput(`Submission Error: ${error}`);
      setTestResults([]);
      setLastSubmission(null);
    } finally {
      console.log('🏁 Full submission finished');
      setIsSubmitting(false);
    }
  };

  const handleCodeChange = (code: string) => {
    const language = appState.selectedLanguage;
    console.log(`Updating ${language} code:`, code.substring(0, 100) + '...');
    setCodeForLanguage(language, code);
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
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
              isSubmitting: isSubmitting,
              onRun: handleRunCode,
              onSubmit: handleSubmitCode,
            }}
            testResultsProps={{
              testResults: appState.testResults,
              output: appState.output,
              height: layoutState.testResultsHeight,
              lastSubmission: lastSubmission,
            }}
            onVerticalMouseDown={handleVerticalMouseDown}
          />
        }
      />

      <MobileUsageTip />
    </div>
  );
};

export default App;
