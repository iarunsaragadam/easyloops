import { renderHook, waitFor } from '@testing-library/react';
import { usePyodide } from '../usePyodide';

// Mock constants
jest.mock('../../constants', () => ({
  PYODIDE_CONFIG: {
    CDN_URL: 'https://test-cdn.com/pyodide.js',
    INDEX_URL: 'https://test-cdn.com/pyodide/'
  }
}));

// Mock formatters
jest.mock('../../utils/formatters', () => ({
  normalizeOutput: (str: string) => str.trim()
}));

// Mock fetch globally
global.fetch = jest.fn();

// Mock console.error
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('usePyodide', () => {
  let mockPyodideInstance: any;
  let mockLoadPyodide: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleError.mockClear();
    
    // Mock pyodide instance
    mockPyodideInstance = {
      runPythonAsync: jest.fn()
    };

    // Mock loadPyodide function
    mockLoadPyodide = jest.fn().mockResolvedValue(mockPyodideInstance);

    // Mock window.loadPyodide
    Object.defineProperty(window, 'loadPyodide', {
      value: mockLoadPyodide,
      writable: true,
      configurable: true
    });

    // Reset DOM
    document.body.innerHTML = '';
  });

  afterEach(() => {
    delete (window as any).loadPyodide;
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => usePyodide());

    expect(result.current.pyodide).toBeNull();
    expect(result.current.isLoaded).toBe(false);
    expect(typeof result.current.runCode).toBe('function');
  });

  it('should load pyodide when already available on window', async () => {
    const { result } = renderHook(() => usePyodide());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    expect(result.current.pyodide).toBe(mockPyodideInstance);
    expect(mockLoadPyodide).toHaveBeenCalledWith({
      indexURL: 'https://test-cdn.com/pyodide/'
    });
  });

  it('should load pyodide script when not available on window', async () => {
    // Remove loadPyodide from window
    delete (window as any).loadPyodide;

    const { result } = renderHook(() => usePyodide());

    // Wait for script to be added
    await waitFor(() => {
      const scripts = document.querySelectorAll('script');
      expect(scripts.length).toBe(1);
      expect(scripts[0].src).toBe('https://test-cdn.com/pyodide.js');
    });

    // Simulate script load
    const script = document.querySelector('script');
    Object.defineProperty(window, 'loadPyodide', {
      value: mockLoadPyodide,
      writable: true,
      configurable: true
    });
    
    if (script && script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    expect(result.current.pyodide).toBe(mockPyodideInstance);
  });

  it('should handle pyodide initialization error', async () => {
    mockLoadPyodide.mockRejectedValue(new Error('Failed to load'));

    const { result } = renderHook(() => usePyodide());

    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Failed to initialize Pyodide:',
        expect.any(Error)
      );
    });

    expect(result.current.isLoaded).toBe(false);
    expect(result.current.pyodide).toBeNull();
  });

  it('should throw error when running code without pyodide loaded', async () => {
    const { result } = renderHook(() => usePyodide());

    await expect(result.current.runCode('print("test")', []))
      .rejects
      .toThrow('Pyodide is not loaded');
  });

  it('should execute code successfully with test cases', async () => {
    // Mock fetch responses
    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('5\n')
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('Hello World\n')
      } as any);

    // Mock pyodide execution
    mockPyodideInstance.runPythonAsync
      .mockResolvedValueOnce(undefined) // stdin/stdout setup
      .mockResolvedValueOnce(undefined) // user code execution
      .mockResolvedValueOnce('Hello World\n') // get output
      .mockResolvedValueOnce(undefined); // restore stdin/stdout

    const { result } = renderHook(() => usePyodide());

    // Wait for pyodide to load
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    const testCases = [
      {
        inputFile: '/test/input.txt',
        expectedFile: '/test/expected.txt',
        description: 'Test case 1'
      }
    ];

    const executionResult = await result.current.runCode('print("Hello World")', testCases);

    expect(executionResult).toEqual({
      output: 'Test Case 1:\nHello World',
      testResults: [
        {
          testCase: 'Test case 1',
          expected: 'Hello World',
          actual: 'Hello World',
          passed: true,
                     input: '5\n'
        }
      ]
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('/test/input.txt');
    expect(fetch).toHaveBeenCalledWith('/test/expected.txt');
  });

  it('should handle test case execution error', async () => {
    // Mock fetch responses
    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('input')
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('expected')
      } as any);

    // Mock pyodide execution with error
    mockPyodideInstance.runPythonAsync
      .mockResolvedValueOnce(undefined) // stdin/stdout setup
      .mockRejectedValueOnce(new Error('Syntax error')); // user code execution fails

    const { result } = renderHook(() => usePyodide());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    const testCases = [
      {
        inputFile: '/test/input.txt',
        expectedFile: '/test/expected.txt',
        description: 'Test case 1'
      }
    ];

    const executionResult = await result.current.runCode('invalid syntax', testCases);

    expect(executionResult.testResults[0]).toEqual({
      testCase: 'Test case 1',
      expected: 'Error loading test case',
      actual: 'Error: Error: Syntax error',
      passed: false
    });
  });

  it('should handle fetch error for test files', async () => {
    // Mock fetch with error
    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: false
      } as any);

    const { result } = renderHook(() => usePyodide());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    const testCases = [
      {
        inputFile: '/test/missing.txt',
        expectedFile: '/test/expected.txt',
        description: 'Test case 1'
      }
    ];

    const executionResult = await result.current.runCode('print("test")', testCases);

    expect(executionResult.testResults[0].passed).toBe(false);
    expect(executionResult.testResults[0].actual).toContain('Error:');
  });

  it('should handle multiple test cases', async () => {
    // Mock fetch responses for 2 test cases
    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('1') } as any)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('1') } as any)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('2') } as any)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('2') } as any);

    // Mock pyodide execution for 2 test cases
    mockPyodideInstance.runPythonAsync
      // First test case
      .mockResolvedValueOnce(undefined) // setup
      .mockResolvedValueOnce(undefined) // execute
      .mockResolvedValueOnce('1') // get output
      .mockResolvedValueOnce(undefined) // restore
      // Second test case
      .mockResolvedValueOnce(undefined) // setup
      .mockResolvedValueOnce(undefined) // execute
      .mockResolvedValueOnce('2') // get output
      .mockResolvedValueOnce(undefined); // restore

    const { result } = renderHook(() => usePyodide());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    const testCases = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/expected1.txt',
        description: 'Test case 1'
      },
      {
        inputFile: '/test/input2.txt',
        expectedFile: '/test/expected2.txt',
        description: 'Test case 2'
      }
    ];

    const executionResult = await result.current.runCode('print(input())', testCases);

    expect(executionResult.testResults).toHaveLength(2);
    expect(executionResult.testResults[0].passed).toBe(true);
    expect(executionResult.testResults[1].passed).toBe(true);
    expect(executionResult.output).toContain('Test Case 1:\n1');
    expect(executionResult.output).toContain('Test Case 2:\n2');
  });

  it('should handle empty test cases array', async () => {
    const { result } = renderHook(() => usePyodide());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    const executionResult = await result.current.runCode('print("test")', []);

    expect(executionResult).toEqual({
      output: 'No output generated',
      testResults: []
    });
  });

  it('should normalize outputs correctly', async () => {
    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('input') } as any)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('  expected  \n') } as any);

    mockPyodideInstance.runPythonAsync
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce('  expected  \n')
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => usePyodide());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    const testCases = [
      {
        inputFile: '/test/input.txt',
        expectedFile: '/test/expected.txt',
        description: 'Test case 1'
      }
    ];

    const executionResult = await result.current.runCode('print("expected")', testCases);

    expect(executionResult.testResults[0].passed).toBe(true);
    expect(executionResult.testResults[0].expected).toBe('expected');
    expect(executionResult.testResults[0].actual).toBe('expected');
  });

  it('should handle empty output', async () => {
    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('input') } as any)
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('') } as any);

    mockPyodideInstance.runPythonAsync
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce('')
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => usePyodide());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    const testCases = [
      {
        inputFile: '/test/input.txt',
        expectedFile: '/test/expected.txt',
        description: 'Test case 1'
      }
    ];

    const executionResult = await result.current.runCode('pass', testCases);

    expect(executionResult.testResults[0].actual).toBe('');
    expect(executionResult.testResults[0].expected).toBe('');
    expect(executionResult.testResults[0].passed).toBe(true);
  });
});