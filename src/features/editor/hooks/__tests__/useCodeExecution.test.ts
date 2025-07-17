import { renderHook, act } from '@testing-library/react';
import { useCodeExecution } from '../useCodeExecution';
import { TestCase, CodeExecutionResult } from '@/shared/types';
import * as useAuthModule from '@/features/auth';
import { CodeExecutionService } from '../../services/execution';
import { User } from 'firebase/auth';

// Mock the CodeExecutionService
jest.mock('../../services/execution', () => ({
  CodeExecutionService: jest.fn(),
}));

// Mock useAuth hook
jest.mock('@/features/auth', () => ({
  useAuth: jest.fn(),
}));

const mockExecuteCode = jest.fn();
const mockExecuteAndSubmit = jest.fn();
const mockIsLanguageAvailable = jest.fn();
const mockRequiresAuth = jest.fn();

const mockCodeExecutionService = {
  executeCode: mockExecuteCode,
  executeAndSubmit: mockExecuteAndSubmit,
  isLanguageAvailable: mockIsLanguageAvailable,
  requiresAuth: mockRequiresAuth,
};

const MockedCodeExecutionService = CodeExecutionService as jest.MockedClass<
  typeof CodeExecutionService
>;
const mockUseAuth = jest.mocked(useAuthModule.useAuth);

describe('useCodeExecution', () => {
  const mockTestCases: TestCase[] = [
    {
      description: 'Test case 1',
      inputFile: '/testcases/input1.txt',
      expectedFile: '/testcases/expected1.txt',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useAuth to return expected structure
    mockUseAuth.mockReturnValue({
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
      isAuthorizedForGo: false,
    });

    // Mock CodeExecutionService constructor
    MockedCodeExecutionService.mockImplementation(
      () => mockCodeExecutionService as unknown as CodeExecutionService
    );
  });

  it('should initialize the service with user', async () => {
    const mockUser = { uid: 'test-user-id' } as User;
    mockUseAuth.mockReturnValue({
      user: mockUser,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
      isAuthorizedForGo: false,
    });

    const { result } = renderHook(() => useCodeExecution());

    // Trigger service initialization by calling executeCode
    await act(async () => {
      try {
        await result.current.executeCode('print("test")', mockTestCases, 'python');
      } catch {
        // Ignore the error, we just want to trigger initialization
      }
    });

    expect(MockedCodeExecutionService).toHaveBeenCalledWith(mockUser, undefined, undefined);
  });

  it('should execute code successfully', async () => {
    const mockResult: CodeExecutionResult = {
      output: 'Test output',
      testResults: [],
    };

    mockExecuteCode.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useCodeExecution());

    let executionResult: CodeExecutionResult;
    await act(async () => {
      executionResult = await result.current.executeCode(
        'print("test")',
        mockTestCases,
        'python'
      );
    });

    expect(executionResult!).toEqual(mockResult);
    expect(mockExecuteCode).toHaveBeenCalledWith(
      'print("test")',
      mockTestCases,
      'python',
      { type: 'RUN', testCaseLimit: 2, createSnapshot: false }
    );
  });

  it('should execute code with custom mode', async () => {
    const mockResult: CodeExecutionResult = {
      output: 'Test output',
      testResults: [],
    };

    mockExecuteCode.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useCodeExecution());

    const customMode = {
      type: 'SUBMIT' as const,
      testCaseLimit: 5,
      createSnapshot: true,
    };

    let executionResult: CodeExecutionResult;
    await act(async () => {
      executionResult = await result.current.executeCode(
        'print("test")',
        mockTestCases,
        'python',
        customMode
      );
    });

    expect(executionResult!).toEqual(mockResult);
    expect(mockExecuteCode).toHaveBeenCalledWith(
      'print("test")',
      mockTestCases,
      'python',
      customMode
    );
  });

  it('should execute and submit code', async () => {
    const mockResult = {
      result: {
        output: 'Test output',
        testResults: [],
      } as CodeExecutionResult,
      submission: {
        id: 'submission-123',
        status: 'accepted',
      },
    };

    mockExecuteAndSubmit.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useCodeExecution());

    let submissionResult;
    await act(async () => {
      submissionResult = await result.current.executeAndSubmit(
        'print("test")',
        mockTestCases,
        'python',
        'question-123'
      );
    });

    expect(submissionResult!).toEqual(mockResult);
    expect(mockExecuteAndSubmit).toHaveBeenCalledWith(
      'print("test")',
      mockTestCases,
      'python',
      'question-123'
    );
  });

  it('should check if language is available', () => {
    mockIsLanguageAvailable.mockReturnValue(true);

    const { result } = renderHook(() => useCodeExecution());

    const isAvailable = result.current.isLanguageAvailable('python');

    expect(isAvailable).toBe(true);
    expect(mockIsLanguageAvailable).toHaveBeenCalledWith('python');
  });

  it('should check if language requires auth', () => {
    mockRequiresAuth.mockReturnValue(false);

    const { result } = renderHook(() => useCodeExecution());

    const requiresAuth = result.current.requiresAuth('python');

    expect(requiresAuth).toBe(false);
    expect(mockRequiresAuth).toHaveBeenCalledWith('python');
  });

  it('should handle execution errors', async () => {
    const mockError = new Error('Execution failed');
    mockExecuteCode.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCodeExecution());

    await expect(
      act(async () => {
        await result.current.executeCode(
          'invalid code',
          mockTestCases,
          'python'
        );
      })
    ).rejects.toThrow('Execution failed');
  });

  it('should handle submission errors', async () => {
    const mockError = new Error('Submission failed');
    mockExecuteAndSubmit.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCodeExecution());

    await expect(
      act(async () => {
        await result.current.executeAndSubmit(
          'invalid code',
          mockTestCases,
          'python',
          'question-123'
        );
      })
    ).rejects.toThrow('Submission failed');
  });

  it('should memoize the execution service', async () => {
    const { result, rerender } = renderHook(() => useCodeExecution());

    // Trigger service initialization by calling executeCode
    await act(async () => {
      try {
        await result.current.executeCode('print("test")', mockTestCases, 'python');
      } catch {
        // Ignore the error, we just want to trigger initialization
      }
    });

    // First render
    expect(MockedCodeExecutionService).toHaveBeenCalledTimes(1);

    // Rerender with same user
    rerender();
    expect(MockedCodeExecutionService).toHaveBeenCalledTimes(1);

    // Change user
    const mockUser = { uid: 'new-user-id' } as User;
    mockUseAuth.mockReturnValue({
      user: mockUser,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
      isAuthorizedForGo: false,
    });

    rerender();

    // Trigger service initialization again with new user
    await act(async () => {
      try {
        await result.current.executeCode('print("test2")', mockTestCases, 'python');
      } catch {
        // Ignore the error, we just want to trigger initialization
      }
    });

    expect(MockedCodeExecutionService).toHaveBeenCalledTimes(2);
    expect(MockedCodeExecutionService).toHaveBeenLastCalledWith(mockUser, undefined, undefined);
  });
});
