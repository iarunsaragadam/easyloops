import { useCallback, useMemo } from 'react';
import { TestCase, CodeExecutionResult, PyodideManager } from '@/shared/types';
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
      language: string
    ): Promise<CodeExecutionResult> => {
      console.log(
        `Executing ${language} code:`,
        code.substring(0, 100) + '...'
      );

      return await executionService.executeCode(code, testCases, language);
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
    isLanguageAvailable,
    requiresAuth,
  };
};
