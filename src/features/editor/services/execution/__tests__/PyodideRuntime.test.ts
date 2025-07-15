import { PyodideRuntime } from '../runtimes/PyodideRuntime';
import { TestCase } from '@/shared/types';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock DOM APIs
const mockScriptElement = {
  src: '',
  onload: null as any,
  onerror: null as any,
};

const mockDocument = {
  createElement: jest.fn(() => mockScriptElement),
  head: {
    appendChild: jest.fn(),
  },
};

Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

// Mock window
const mockWindow = {
  loadPyodide: jest.fn(),
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
});

describe('PyodideRuntime', () => {
  let runtime: PyodideRuntime;
  let mockPyodide: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockPyodide = {
      globals: {
        clear: jest.fn(),
      },
      runPython: jest.fn(),
    };

    mockWindow.loadPyodide = jest.fn().mockResolvedValue(mockPyodide);
    
    runtime = new PyodideRuntime();
  });

  describe('initialization', () => {
    it('should initialize with correct language', () => {
      expect(runtime.language).toBe('python');
    });

    it('should not be loaded initially', () => {
      expect(runtime.isLoaded()).toBe(false);
    });
  });

  describe('load', () => {
    it('should load Pyodide successfully', async () => {
      // Simulate successful script loading
      setTimeout(() => {
        if (mockScriptElement.onload) {
          mockScriptElement.onload();
        }
      }, 0);

      await runtime.load();

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
      expect(mockScriptElement.src).toBe('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js');
      expect(mockWindow.loadPyodide).toHaveBeenCalledWith({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });
      expect(runtime.isLoaded()).toBe(true);
    });

    it('should handle script loading failure', async () => {
      setTimeout(() => {
        if (mockScriptElement.onerror) {
          mockScriptElement.onerror();
        }
      }, 0);

      await expect(runtime.load()).rejects.toThrow('Failed to load Pyodide script');
    });

    it('should handle Pyodide initialization failure', async () => {
      mockWindow.loadPyodide = jest.fn().mockRejectedValue(new Error('Init failed'));

      setTimeout(() => {
        if (mockScriptElement.onload) {
          mockScriptElement.onload();
        }
      }, 0);

      await expect(runtime.load()).rejects.toThrow('Init failed');
    });

    it('should return immediately if already loaded', async () => {
      // First load
      setTimeout(() => {
        if (mockScriptElement.onload) {
          mockScriptElement.onload();
        }
      }, 0);

      await runtime.load();
      
      // Second load should not call loadPyodide again
      mockWindow.loadPyodide.mockClear();
      await runtime.load();
      
      expect(mockWindow.loadPyodide).not.toHaveBeenCalled();
    });
  });

  describe('execute', () => {
    const testCases: TestCase[] = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/output1.txt',
        description: 'Test case 1',
      },
    ];

    beforeEach(async () => {
      // Mock successful loading
      setTimeout(() => {
        if (mockScriptElement.onload) {
          mockScriptElement.onload();
        }
      }, 0);

      await runtime.load();
    });

    it('should execute Python code successfully', async () => {
      const inputContent = '5';
      const expectedOutput = '10';
      const actualOutput = '10';

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          text: jest.fn().mockResolvedValue(inputContent),
        })
        .mockResolvedValueOnce({
          ok: true,
          text: jest.fn().mockResolvedValue(expectedOutput),
        });

      mockPyodide.runPython
        .mockReturnValueOnce(undefined) // Setup calls
        .mockReturnValueOnce(actualOutput); // Final output

      const result = await runtime.execute('print(int(input()) * 2)', testCases);

      expect(result.testResults).toHaveLength(1);
      expect(result.testResults[0].passed).toBe(true);
      expect(result.testResults[0].actual).toBe(actualOutput);
      expect(result.testResults[0].expected).toBe(expectedOutput);
    });

    it('should handle execution errors', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          text: jest.fn().mockResolvedValue('5'),
        })
        .mockResolvedValueOnce({
          ok: true,
          text: jest.fn().mockResolvedValue('10'),
        });

      mockPyodide.runPython.mockImplementation(() => {
        throw new Error('Python execution error');
      });

      const result = await runtime.execute('invalid code', testCases);

      expect(result.testResults).toHaveLength(1);
      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain('Error: Python execution error');
    });

    it('should handle file fetch errors', async () => {
      mockFetch.mockRejectedValue(new Error('Fetch failed'));

      const result = await runtime.execute('print("test")', testCases);

      expect(result.testResults).toHaveLength(1);
      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain('Error: Fetch failed');
    });

    it('should throw error if not loaded', async () => {
      const unloadedRuntime = new PyodideRuntime();
      
      await expect(unloadedRuntime.execute('print("test")', testCases))
        .rejects.toThrow('Pyodide is not loaded yet');
    });
  });
});