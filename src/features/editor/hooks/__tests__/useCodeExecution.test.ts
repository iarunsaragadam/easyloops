import { renderHook, act } from '@testing-library/react';
import { useCodeExecution } from '../useCodeExecution';
import { CodeExecutionService } from '../../services';
import { TestCase, CodeExecutionResult, PyodideManager } from '@/shared/types';
import * as useAuthModule from '@/features/auth';

// Mock the service
jest.mock('../../services');
jest.mock('@/features/auth');

const mockExecuteCode = jest.fn();
const mockIsLanguageAvailable = jest.fn();
const mockRequiresAuth = jest.fn();

const MockCodeExecutionService = CodeExecutionService as jest.MockedClass<
  typeof CodeExecutionService
>;

// Mock useAuth hook
const mockUseAuth = jest.mocked(useAuthModule.useAuth);

describe('useCodeExecution', () => {
  const mockPyodideManager = {
    pyodide: null,
    isLoaded: true,
    runCode: jest.fn(),
    loadingError: null,
  };

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

    MockCodeExecutionService.mockImplementation(
      () =>
        ({
          executeCode: mockExecuteCode,
          isLanguageAvailable: mockIsLanguageAvailable,
          requiresAuth: mockRequiresAuth,
        }) as unknown as CodeExecutionService
    );
  });

  it('should initialize the service with pyodide manager and user', () => {
    renderHook(() => useCodeExecution(mockPyodideManager as PyodideManager));

    expect(MockCodeExecutionService).toHaveBeenCalledWith(
      mockPyodideManager,
      null
    );
  });

  it('should execute code successfully', async () => {
    const mockResult: CodeExecutionResult = {
      output: 'Test output',
      testResults: [],
    };

    mockExecuteCode.mockResolvedValue(mockResult);

    const { result } = renderHook(() =>
      useCodeExecution(mockPyodideManager as PyodideManager)
    );

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
      'python'
    );
  });

  it('should check if language is available', () => {
    mockIsLanguageAvailable.mockReturnValue(true);

    const { result } = renderHook(() =>
      useCodeExecution(mockPyodideManager as PyodideManager)
    );

    const isAvailable = result.current.isLanguageAvailable('python');

    expect(isAvailable).toBe(true);
    expect(mockIsLanguageAvailable).toHaveBeenCalledWith('python');
  });

  it('should check if language requires auth', () => {
    mockRequiresAuth.mockReturnValue(false);

    const { result } = renderHook(() =>
      useCodeExecution(mockPyodideManager as PyodideManager)
    );

    const requiresAuth = result.current.requiresAuth('python');

    expect(requiresAuth).toBe(false);
    expect(mockRequiresAuth).toHaveBeenCalledWith('python');
  });

  it('should handle execution errors', async () => {
    const mockError = new Error('Execution failed');
    mockExecuteCode.mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useCodeExecution(mockPyodideManager as PyodideManager)
    );

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
});
