import React from 'react';
import { useAuth } from '@/features/auth';
import { Question, TestResult } from '@/shared/types';

interface DebugPanelProps {
  currentQuestion: Question | null;
  selectedLanguage: string;
  isRunning: boolean;
  output: string;
  testResults: TestResult[];
  pyodideManager?: {
    isLoaded: boolean;
    loadingError?: string | null;
  };
}

const DebugPanel: React.FC<DebugPanelProps> = ({
  currentQuestion,
  selectedLanguage,
  isRunning,
  output,
  testResults,
  pyodideManager,
}) => {
  const { user, isAuthorizedForGo } = useAuth();

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
      <h3 className="text-sm font-medium text-yellow-800 mb-2">
        🐛 Debug Info
      </h3>
      <div className="text-xs space-y-1 text-yellow-700">
        <div>
          <strong>User:</strong> {user ? user.email : 'Not authenticated'}
        </div>
        <div>
          <strong>Go Authorized:</strong> {isAuthorizedForGo ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Language:</strong> {selectedLanguage}
        </div>
        <div>
          <strong>Question:</strong>{' '}
          {currentQuestion ? currentQuestion.name : 'None selected'}
        </div>
        <div>
          <strong>Test Cases:</strong> {currentQuestion?.testCases?.length || 0}
        </div>
        <div>
          <strong>Is Running:</strong> {isRunning ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Output:</strong> {output || 'None'}
        </div>
        <div>
          <strong>Test Results:</strong> {testResults.length}
        </div>
        <div>
          <strong>Pyodide Loaded:</strong>{' '}
          {pyodideManager?.isLoaded ? 'Yes' : 'No'}
        </div>
        {pyodideManager?.loadingError && (
          <div>
            <strong>Pyodide Error:</strong> {pyodideManager.loadingError}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugPanel;
