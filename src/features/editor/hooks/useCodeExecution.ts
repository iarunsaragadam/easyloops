import { useCallback, useMemo } from 'react';
import { 
  TestCase, 
  CodeExecutionResult, 
  PyodideManager, 
  ExecutionMode, 
  SubmissionResult 
} from '@/shared/types';
import { CodeExecutionService } from '../services';
import { useAuth } from '@/features/auth';

export const useCodeExecution = (pyodideManager: PyodideManager) => {
  const { user } = useAuth();

  const executionService = useMemo(
    () => new CodeExecutionService(pyodideManager, user),
    [pyodideManager, user]
  );

  const executeCode = useCallback(
    async (
      code: string,
      testCases: TestCase[],
      language: string,
      mode: ExecutionMode = { type: 'RUN', testCaseLimit: 2, createSnapshot: false }
    ): Promise<CodeExecutionResult> => {
      console.log(
        `Executing ${language} code in ${mode.type} mode:`,
        code.substring(0, 100) + '...'
      );

      return await executionService.executeCode(code, testCases, language, mode);
    },
    [executionService]
  );

  const executeAndSubmit = useCallback(
    async (
      code: string,
      testCases: TestCase[],
      language: string,
      questionId: string
    ): Promise<{ result: CodeExecutionResult; submission: SubmissionResult }> => {
      console.log(
        `Submitting ${language} code for question ${questionId}:`,
        code.substring(0, 100) + '...'
      );

      return await executionService.executeAndSubmit(code, testCases, language, questionId);
    },
    [executionService]
  );

  const isLanguageAvailable = useCallback(
    (language: string): boolean => {
      return executionService.isLanguageAvailable(language);
    },
    [executionService]
  );

  const requiresAuth = useCallback(
    (language: string): boolean => {
      return executionService.requiresAuth(language);
    },
    [executionService]
  );

  return {
    executeCode,
    executeAndSubmit,
    isLanguageAvailable,
    requiresAuth,
  };
};
