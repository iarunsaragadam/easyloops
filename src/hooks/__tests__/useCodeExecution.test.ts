import { renderHook } from '@testing-library/react';
import { useCodeExecution } from '../useCodeExecution';
import { PyodideManager, TestCase } from '@/types';

describe('useCodeExecution', () => {
  const mockTestCases: TestCase[] = [
    {
      inputFile: '/questions/01-test/input1.txt',
      expectedFile: '/questions/01-test/expected1.txt',
      description: 'Test case 1'
    }
  ];

  const mockResult = {
    output: 'Hello World',
    testResults: [
      {
        testCase: 'Test case 1',
        expected: 'Hello World',
        actual: 'Hello World',
        passed: true
      }
    ]
  };

  it('should return executeCode function', () => {
    const mockPyodideManager: PyodideManager = {
      pyodide: null,
      isLoaded: false,
      runCode: jest.fn()
    };

    const { result } = renderHook(() => useCodeExecution(mockPyodideManager));

    expect(typeof result.current.executeCode).toBe('function');
  });

  it('should execute code successfully when pyodide is loaded', async () => {
    const mockRunCode = jest.fn().mockResolvedValue(mockResult);
    const mockPyodideManager: PyodideManager = {
      pyodide: {} as any,
      isLoaded: true,
      runCode: mockRunCode
    };

    const { result } = renderHook(() => useCodeExecution(mockPyodideManager));

    const testResult = await result.current.executeCode('print("Hello World")', mockTestCases);

    expect(testResult).toEqual(mockResult);
    expect(mockRunCode).toHaveBeenCalledWith('print("Hello World")', mockTestCases);
  });

  it('should throw error when pyodide is not loaded', async () => {
    const mockPyodideManager: PyodideManager = {
      pyodide: null,
      isLoaded: false,
      runCode: jest.fn()
    };

    const { result } = renderHook(() => useCodeExecution(mockPyodideManager));

    await expect(result.current.executeCode('print("Hello")', mockTestCases))
      .rejects
      .toThrow('Pyodide is not loaded');

    expect(mockPyodideManager.runCode).not.toHaveBeenCalled();
  });

  it('should throw error when pyodide instance is null', async () => {
    const mockPyodideManager: PyodideManager = {
      pyodide: null,
      isLoaded: true,
      runCode: jest.fn()
    };

    const { result } = renderHook(() => useCodeExecution(mockPyodideManager));

    await expect(result.current.executeCode('print("Hello")', mockTestCases))
      .rejects
      .toThrow('Pyodide is not loaded');
  });

  it('should propagate errors from runCode', async () => {
    const mockError = new Error('Execution failed');
    const mockRunCode = jest.fn().mockRejectedValue(mockError);
    const mockPyodideManager: PyodideManager = {
      pyodide: {} as any,
      isLoaded: true,
      runCode: mockRunCode
    };

    const { result } = renderHook(() => useCodeExecution(mockPyodideManager));

    await expect(result.current.executeCode('invalid code', mockTestCases))
      .rejects
      .toThrow('Execution failed');
  });

  it('should handle empty test cases', async () => {
    const mockRunCode = jest.fn().mockResolvedValue({ output: '', testResults: [] });
    const mockPyodideManager: PyodideManager = {
      pyodide: {} as any,
      isLoaded: true,
      runCode: mockRunCode
    };

    const { result } = renderHook(() => useCodeExecution(mockPyodideManager));

    const testResult = await result.current.executeCode('print("test")', []);

    expect(mockRunCode).toHaveBeenCalledWith('print("test")', []);
    expect(testResult).toEqual({ output: '', testResults: [] });
  });

  it('should handle different code inputs', async () => {
    const mockRunCode = jest.fn().mockResolvedValue(mockResult);
    const mockPyodideManager: PyodideManager = {
      pyodide: {} as any,
      isLoaded: true,
      runCode: mockRunCode
    };

    const { result } = renderHook(() => useCodeExecution(mockPyodideManager));

    await result.current.executeCode('x = 5\nprint(x)', mockTestCases);

    expect(mockRunCode).toHaveBeenCalledWith('x = 5\nprint(x)', mockTestCases);
  });

  it('should be memoized with useCallback', () => {
    const mockPyodideManager: PyodideManager = {
      pyodide: {} as any,
      isLoaded: true,
      runCode: jest.fn()
    };

    const { result, rerender } = renderHook(() => useCodeExecution(mockPyodideManager));

    const firstExecuteCode = result.current.executeCode;

    rerender();

    const secondExecuteCode = result.current.executeCode;

    // Should be the same function reference due to useCallback
    expect(firstExecuteCode).toBe(secondExecuteCode);
  });

  it('should create new executeCode when pyodideManager changes', () => {
    const mockPyodideManager1: PyodideManager = {
      pyodide: {} as any,
      isLoaded: true,
      runCode: jest.fn()
    };

    const mockPyodideManager2: PyodideManager = {
      pyodide: {} as any,
      isLoaded: true,
      runCode: jest.fn()
    };

    const { result, rerender } = renderHook(
      ({ manager }) => useCodeExecution(manager),
      { initialProps: { manager: mockPyodideManager1 } }
    );

    const firstExecuteCode = result.current.executeCode;

    rerender({ manager: mockPyodideManager2 });

    const secondExecuteCode = result.current.executeCode;

    // Should be different function references when dependency changes
    expect(firstExecuteCode).not.toBe(secondExecuteCode);
  });
});