import { useCallback, useRef, useEffect } from 'react';
import {
  TestCase,
  CodeExecutionResult,
  ExecutionMode,
  SubmissionResult,
} from '@/shared/types';
import { CodeExecutionService } from '../services/execution';
import { useAuth } from '@/features/auth';
import { WasmManager } from '../services/execution/WasmManager';

export const useCodeExecution = (wasmManager?: WasmManager) => {
  const { user } = useAuth();
  const executionServiceRef = useRef<CodeExecutionService | null>(null);

  // Clear the service when user or wasmManager changes
  useEffect(() => {
    executionServiceRef.current = null;
  }, [user, wasmManager]);

  // Lazy initialization of the execution service
  const getExecutionService = useCallback(() => {
    if (!executionServiceRef.current && typeof window !== 'undefined') {
      console.log('🔄 Initializing CodeExecutionService on client side');
      executionServiceRef.current = new CodeExecutionService(
        user,
        undefined,
        wasmManager
      );
    }
    return executionServiceRef.current;
  }, [user, wasmManager]);

  const executeCode = useCallback(
    async (
      code: string,
      testCases: TestCase[],
      language: string,
      mode: ExecutionMode = {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      }
    ): Promise<CodeExecutionResult> => {
      console.log('🔍 DEBUG: useCodeExecution.executeCode called');
      console.log('🔍 DEBUG: Parameters:', {
        codeLength: code.length,
        testCaseCount: testCases.length,
        language,
        mode,
      });

      console.log(
        `Executing ${language} code in ${mode.type} mode:`,
        code.substring(0, 100) + '...'
      );

      const service = getExecutionService();
      console.log('🔍 DEBUG: Service obtained:', !!service);

      if (!service) {
        const error = new Error(
          'CodeExecutionService not available - not in browser environment'
        );
        console.error('🔍 DEBUG: Service not available');
        throw error;
      }

      console.log('🔍 DEBUG: About to call service.executeCode...');
      const result = await service.executeCode(code, testCases, language, mode);
      console.log('🔍 DEBUG: Service.executeCode completed:', result);

      return result;
    },
    [getExecutionService]
  );

  const executeAndSubmit = useCallback(
    async (
      code: string,
      testCases: TestCase[],
      language: string,
      questionId: string
    ): Promise<{
      result: CodeExecutionResult;
      submission: SubmissionResult;
    }> => {
      console.log(
        `Submitting ${language} code for question ${questionId}:`,
        code.substring(0, 100) + '...'
      );

      const service = getExecutionService();
      if (!service) {
        throw new Error(
          'CodeExecutionService not available - not in browser environment'
        );
      }

      return await service.executeAndSubmit(
        code,
        testCases,
        language,
        questionId
      );
    },
    [getExecutionService]
  );

  const isLanguageAvailable = useCallback(
    (language: string): boolean => {
      const service = getExecutionService();
      return service ? service.isLanguageAvailable(language) : false;
    },
    [getExecutionService]
  );

  const requiresAuth = useCallback(
    (language: string): boolean => {
      const service = getExecutionService();
      return service ? service.requiresAuth(language) : false;
    },
    [getExecutionService]
  );

  return {
    executeCode,
    executeAndSubmit,
    isLanguageAvailable,
    requiresAuth,
  };
};
