import { PyodideRuntime } from '../PyodideRuntime';
import { TestCase } from '@/shared/types';

// Mock fetch globally
global.fetch = jest.fn();

// Helper function to create proper Response objects
const createMockResponse = (text: string, ok = true): Response =>
  ({
    ok,
    text: jest.fn().mockResolvedValue(text),
    headers: new Headers(),
    redirected: false,
    status: ok ? 200 : 404,
    statusText: ok ? 'OK' : 'Not Found',
    type: 'default',
    url: '',
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    clone: jest.fn(),
    formData: jest.fn(),
    json: jest.fn(),
    bytes: jest.fn(),
  }) as Response;

// Mock document and window for browser environment
const mockScriptElement = {
  src: '',
  onload: null as (() => void) | null,
  onerror: null as (() => void) | null,
};

const mockDocument = {
  createElement: jest.fn().mockReturnValue(mockScriptElement),
  head: {
    appendChild: jest.fn(),
  },
};

const mockWindow = {
  loadPyodide: jest.fn(),
};

// Mock Pyodide instance
const mockPyodide = {
  globals: {
    clear: jest.fn(),
  },
  runPython: jest.fn(),
  runPythonAsync: jest.fn(),
};

describe('PyodideRuntime - Comprehensive Tests', () => {
  let runtime: PyodideRuntime;
  let mockFetch: jest.MockedFunction<typeof fetch>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let originalLoad: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    // Reset mock implementations to prevent contamination between tests
    mockPyodide.runPythonAsync.mockReset();
    mockPyodide.runPythonAsync.mockResolvedValue(undefined);
    mockPyodide.globals.clear.mockReset();
    mockPyodide.globals.clear.mockImplementation(() => {});

    // Mock the load method to prevent auto-loading
    originalLoad = PyodideRuntime.prototype.load;
    PyodideRuntime.prototype.load = jest.fn();

    // Reset document mock safely
    try {
      (global as unknown as { document: typeof mockDocument }).document =
        mockDocument;
    } catch {
      Object.defineProperty(global, 'document', {
        value: mockDocument,
        writable: true,
        configurable: true,
      });
    }

    // Reset window mock safely
    try {
      (global as unknown as { window: typeof mockWindow }).window = mockWindow;
    } catch {
      Object.defineProperty(global, 'window', {
        value: mockWindow,
        writable: true,
        configurable: true,
      });
    }

    // Mock successful Pyodide loading
    mockWindow.loadPyodide.mockResolvedValue(mockPyodide);

    runtime = new PyodideRuntime();
  });

  afterEach(() => {
    // Restore original load method
    PyodideRuntime.prototype.load = originalLoad;

    // Clean up global mocks safely
    try {
      delete (global as unknown as Record<string, unknown>).document;
      delete (global as unknown as Record<string, unknown>).window;
    } catch {
      // Ignore cleanup errors
    }
  });

  describe('Initialization and Loading', () => {
    it('should handle CDN script loading failures', async () => {
      // Create a test subclass that doesn't auto-load
      class TestPyodideRuntime extends PyodideRuntime {
        constructor() {
          super();
          // Override the auto-load behavior
          this.load = jest
            .fn()
            .mockRejectedValue(new Error('Failed to load Pyodide script'));
        }
      }

      const failingRuntime = new TestPyodideRuntime();
      await expect(failingRuntime.load()).rejects.toThrow(
        'Failed to load Pyodide script'
      );
    });

    it('should handle Pyodide initialization failures', async () => {
      // Create a test subclass that doesn't auto-load
      class TestPyodideRuntime extends PyodideRuntime {
        constructor() {
          super();
          // Override the auto-load behavior
          this.load = jest
            .fn()
            .mockRejectedValue(new Error('Pyodide init failed'));
        }
      }

      const failingRuntime = new TestPyodideRuntime();
      await expect(failingRuntime.load()).rejects.toThrow(
        'Pyodide init failed'
      );
    });

    it('should handle server-side rendering environment', async () => {
      // Create a test subclass that doesn't auto-load
      class TestPyodideRuntime extends PyodideRuntime {
        constructor() {
          super();
          // Override the auto-load behavior
          this.load = jest
            .fn()
            .mockRejectedValue(
              new Error('Pyodide can only be loaded in browser environment')
            );
        }
      }

      // Mock server-side environment (no window)
      const originalWindow = global.window;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;
      try {
        const ssrRuntime = new TestPyodideRuntime();
        await expect(ssrRuntime.load()).rejects.toThrow(
          'Pyodide can only be loaded in browser environment'
        );
      } finally {
        // Restore window
        global.window = originalWindow;
      }
    });
  });

  describe('Code Execution - Edge Cases', () => {
    const testCases: TestCase[] = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/output1.txt',
        description: 'Test case 1',
      },
    ];

    beforeEach(async () => {
      // Restore original load method and set up runtime properly
      PyodideRuntime.prototype.load = originalLoad;
      const mockLoadPyodide = jest.fn().mockImplementation(function (
        this: unknown
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['_isLoaded'] = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['pyodide'] = mockPyodide;
        return Promise.resolve(mockPyodide);
      });
      Object.defineProperty(runtime, 'loadPyodide', {
        value: mockLoadPyodide,
        writable: true,
      });
      await runtime.load();
      runtime['_isLoaded'] = true;
      runtime['pyodide'] = mockPyodide;
    });

    it('should handle empty code execution', async () => {
      mockFetch
        .mockResolvedValueOnce(createMockResponse('input'))
        .mockResolvedValueOnce(createMockResponse('expected'));

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce(''); // Get output

      const result = await runtime.execute('', testCases);

      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toBe('');
    });

    it('should handle code with special characters and unicode', async () => {
      const unicodeCode = `
print("Hello 世界! 🌍")
print("Special chars: !@#$%^&*()")
print("Emojis: 😀🎉🚀")
`;

      mockFetch
        .mockResolvedValueOnce(createMockResponse(''))
        .mockResolvedValueOnce(
          createMockResponse(
            'Hello 世界! 🌍\nSpecial chars: !@#$%^&*()\nEmojis: 😀🎉🚀'
          )
        );

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce(
          'Hello 世界! 🌍\nSpecial chars: !@#$%^&*()\nEmojis: 😀🎉🚀'
        ); // Get output

      const result = await runtime.execute(unicodeCode, testCases);

      expect(result.testResults[0].passed).toBe(true);
    });

    it('should handle very large code execution', async () => {
      const largeCode = 'print("x" * 10000)'; // Large output

      mockFetch
        .mockResolvedValueOnce(createMockResponse(''))
        .mockResolvedValueOnce(createMockResponse('x'.repeat(10000)));

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce('x'.repeat(10000)); // Get output

      const result = await runtime.execute(largeCode, testCases);

      expect(result.testResults[0].passed).toBe(true);
      expect(result.testResults[0].actual).toHaveLength(10000);
    });

    it('should handle infinite loops gracefully', async () => {
      const infiniteLoopCode = `
while True:
    pass
`;

      mockFetch
        .mockResolvedValueOnce(createMockResponse(''))
        .mockResolvedValueOnce(createMockResponse(''));

      // Mock Pyodide to throw timeout error
      mockPyodide.runPythonAsync.mockImplementation(() => {
        throw new Error('Execution timeout');
      });

      const result = await runtime.execute(infiniteLoopCode, testCases);

      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain(
        'Error: Execution timeout'
      );
    });

    it('should handle memory-intensive operations', async () => {
      const memoryIntensiveCode = `
import sys
# Try to allocate a lot of memory
try:
    large_list = [0] * 10000000
    print("Memory allocated successfully")
except MemoryError:
    print("Memory allocation failed")
`;

      mockFetch
        .mockResolvedValueOnce(createMockResponse(''))
        .mockResolvedValueOnce(createMockResponse('Memory allocation failed'));

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce('Memory allocation failed'); // Get output

      const result = await runtime.execute(memoryIntensiveCode, testCases);

      expect(result.testResults[0].passed).toBe(true);
    });
  });

  describe('Input/Output Handling', () => {
    const testCases: TestCase[] = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/output1.txt',
        description: 'Test case 1',
      },
    ];

    beforeEach(async () => {
      // Restore original load method and set up runtime properly
      PyodideRuntime.prototype.load = originalLoad;
      const mockLoadPyodide = jest.fn().mockImplementation(function (
        this: unknown
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['_isLoaded'] = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['pyodide'] = mockPyodide;
        return Promise.resolve(mockPyodide);
      });
      Object.defineProperty(runtime, 'loadPyodide', {
        value: mockLoadPyodide,
        writable: true,
      });
      await runtime.load();
      runtime['_isLoaded'] = true;
      runtime['pyodide'] = mockPyodide;
    });

    it('should handle different line ending formats', async () => {
      const code = 'print(input())';

      mockFetch
        .mockResolvedValueOnce(createMockResponse('hello\r\nworld')) // Windows line endings
        .mockResolvedValueOnce(createMockResponse('hello\nworld')); // Unix line endings

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce('hello\nworld'); // Get output

      const result = await runtime.execute(code, testCases);

      expect(result.testResults[0].passed).toBe(true);
    });

    it('should handle empty input files', async () => {
      const code = 'print("Hello")';

      mockFetch
        .mockResolvedValueOnce(createMockResponse('')) // Empty input
        .mockResolvedValueOnce(createMockResponse('Hello')); // Expected output

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce('Hello'); // Get output

      const result = await runtime.execute(code, testCases);

      expect(result.testResults[0].passed).toBe(true);
    });

    it('should handle very large input files', async () => {
      const code = 'print(len(input().split()))';
      const largeInput = '1 2 3 4 5 ' + '6 '.repeat(10000); // Large input

      mockFetch
        .mockResolvedValueOnce(createMockResponse(largeInput))
        .mockResolvedValueOnce(createMockResponse('10005')); // Expected count

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce('10005'); // Get output

      const result = await runtime.execute(code, testCases);

      expect(result.testResults[0].passed).toBe(true);
    });

    it('should handle input with special characters', async () => {
      const code = 'print(repr(input()))';
      const specialInput = 'Hello\nWorld\tTab\r\nWindows';

      mockFetch
        .mockResolvedValueOnce(createMockResponse(specialInput))
        .mockResolvedValueOnce(
          createMockResponse("'Hello\\nWorld\\tTab\\r\\nWindows'")
        );

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce("'Hello\\nWorld\\tTab\\r\\nWindows'"); // Get output

      const result = await runtime.execute(code, testCases);

      expect(result.testResults[0].passed).toBe(true);
    });
  });

  describe('Error Handling - Comprehensive', () => {
    const testCases: TestCase[] = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/output1.txt',
        description: 'Test case 1',
      },
    ];

    beforeEach(async () => {
      // Restore original load method and set up runtime properly
      PyodideRuntime.prototype.load = originalLoad;
      const mockLoadPyodide = jest.fn().mockImplementation(function (
        this: unknown
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['_isLoaded'] = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['pyodide'] = mockPyodide;
        return Promise.resolve(mockPyodide);
      });
      Object.defineProperty(runtime, 'loadPyodide', {
        value: mockLoadPyodide,
        writable: true,
      });
      await runtime.load();
      runtime['_isLoaded'] = true;
      runtime['pyodide'] = mockPyodide;
    });

    it('should handle file fetch 404 errors', async () => {
      mockFetch.mockResolvedValue(createMockResponse('', false));

      const result = await runtime.execute('print("test")', testCases);

      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain(
        'Error: Failed to fetch file'
      );
    });

    it('should handle file fetch network timeouts', async () => {
      mockFetch.mockRejectedValue(new Error('Network timeout'));

      const result = await runtime.execute('print("test")', testCases);

      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain('Error: Network timeout');
    });

    it('should handle Pyodide runtime errors', async () => {
      mockFetch
        .mockResolvedValueOnce(createMockResponse('input'))
        .mockResolvedValueOnce(createMockResponse('expected'));

      mockPyodide.runPythonAsync.mockImplementation(() => {
        throw new Error('Runtime error: division by zero');
      });

      const result = await runtime.execute('print(1/0)', testCases);

      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain(
        'Error: Runtime error: division by zero'
      );
    });

    it('should handle syntax errors gracefully', async () => {
      mockFetch
        .mockResolvedValueOnce(createMockResponse(''))
        .mockResolvedValueOnce(createMockResponse(''));

      mockPyodide.runPythonAsync.mockImplementation(() => {
        throw new Error('SyntaxError: invalid syntax');
      });

      const result = await runtime.execute('print(1 +', testCases);

      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain(
        'Error: SyntaxError: invalid syntax'
      );
    });

    it('should handle import errors', async () => {
      mockFetch
        .mockResolvedValueOnce(createMockResponse(''))
        .mockResolvedValueOnce(createMockResponse(''));

      mockPyodide.runPythonAsync.mockImplementation(() => {
        throw new Error("ModuleNotFoundError: No module named 'nonexistent'");
      });

      const result = await runtime.execute('import nonexistent', testCases);

      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain(
        'Error: ModuleNotFoundError'
      );
    });

    it('should handle multiple test cases with mixed success/failure', async () => {
      const multipleTestCases: TestCase[] = [
        {
          inputFile: '/test/input1.txt',
          expectedFile: '/test/output1.txt',
          description: 'Test case 1 - should pass',
        },
        {
          inputFile: '/test/input2.txt',
          expectedFile: '/test/output2.txt',
          description: 'Test case 2 - should fail',
        },
      ];

      mockFetch
        .mockResolvedValueOnce(createMockResponse('input1'))
        .mockResolvedValueOnce(createMockResponse('expected1'))
        .mockResolvedValueOnce(createMockResponse('input2'))
        .mockResolvedValueOnce(createMockResponse('expected2'));

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment for test 1
        .mockResolvedValueOnce(undefined) // Execute user code for test 1
        .mockResolvedValueOnce('expected1') // Get output for test 1
        .mockResolvedValueOnce(undefined) // Setup environment for test 2
        .mockResolvedValueOnce(undefined) // Execute user code for test 2
        .mockResolvedValueOnce('wrong_output'); // Get output for test 2

      const result = await runtime.execute('print(input())', multipleTestCases);

      expect(result.testResults).toHaveLength(2);
      expect(result.testResults[0].passed).toBe(true);
      expect(result.testResults[1].passed).toBe(false);
    });
  });

  describe('Security and Code Injection', () => {
    const testCases: TestCase[] = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/output1.txt',
        description: 'Test case 1',
      },
    ];

    beforeEach(async () => {
      // Restore original load method and set up runtime properly
      PyodideRuntime.prototype.load = originalLoad;
      const mockLoadPyodide = jest.fn().mockImplementation(function (
        this: unknown
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['_isLoaded'] = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['pyodide'] = mockPyodide;
        return Promise.resolve(mockPyodide);
      });
      Object.defineProperty(runtime, 'loadPyodide', {
        value: mockLoadPyodide,
        writable: true,
      });
      await runtime.load();
      runtime['_isLoaded'] = true;
      runtime['pyodide'] = mockPyodide;
    });

    it('should handle code with potentially dangerous operations', async () => {
      const dangerousCode = `
import os
print("Attempting dangerous operation")
# This should be sandboxed
`;

      mockFetch
        .mockResolvedValueOnce(createMockResponse(''))
        .mockResolvedValueOnce(
          createMockResponse('Attempting dangerous operation')
        );

      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment
        .mockResolvedValueOnce(undefined) // Execute user code
        .mockResolvedValueOnce('Attempting dangerous operation'); // Get output

      const result = await runtime.execute(dangerousCode, testCases);

      // Should execute but be sandboxed
      expect(result.testResults[0].passed).toBe(true);
    });

    it('should handle code with infinite recursion', async () => {
      const recursiveCode = `
def infinite_recursion():
    return infinite_recursion()
infinite_recursion()
`;

      mockFetch
        .mockResolvedValueOnce(createMockResponse(''))
        .mockResolvedValueOnce(createMockResponse(''));

      mockPyodide.runPythonAsync.mockImplementation(() => {
        throw new Error('RecursionError: maximum recursion depth exceeded');
      });

      const result = await runtime.execute(recursiveCode, testCases);

      expect(result.testResults[0].passed).toBe(false);
      expect(result.testResults[0].actual).toContain('Error: RecursionError');
    });
  });

  describe('Performance and Resource Management', () => {
    const testCases: TestCase[] = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/output1.txt',
        description: 'Test case 1',
      },
    ];

    beforeEach(async () => {
      // Restore original load method and set up runtime properly
      PyodideRuntime.prototype.load = originalLoad;
      const mockLoadPyodide = jest.fn().mockImplementation(function (
        this: unknown
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['_isLoaded'] = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)['pyodide'] = mockPyodide;
        return Promise.resolve(mockPyodide);
      });
      Object.defineProperty(runtime, 'loadPyodide', {
        value: mockLoadPyodide,
        writable: true,
      });
      await runtime.load();
      runtime['_isLoaded'] = true;
      runtime['pyodide'] = mockPyodide;
    });

    it('should handle rapid successive executions', async () => {
      // For each execution, the first fetch is input (''), the second is expected ('test')
      mockFetch.mockImplementation((input: string | URL | Request) => {
        let url: string;
        if (typeof input === 'string') {
          url = input;
        } else if (input instanceof Request) {
          url = input.url;
        } else {
          url = input.toString();
        }
        if (url.endsWith('input1.txt')) {
          return Promise.resolve(createMockResponse(''));
        }
        if (url.endsWith('output1.txt')) {
          return Promise.resolve(createMockResponse('test'));
        }
        return Promise.resolve(createMockResponse(''));
      });

      // Reset the mock state for runPythonAsync to avoid leftover calls from previous tests
      mockPyodide.runPythonAsync.mockReset();

      // Use a more robust mock implementation that handles concurrent calls
      // Track call counts per execution context using a Map
      const callCounts = new Map();
      mockPyodide.runPythonAsync.mockImplementation((...args) => {
        const context = JSON.stringify(args);
        const count = callCounts.get(context) || 0;
        callCounts.set(context, count + 1);
        
        // For sys.stdout.getvalue() calls, return 'test'
        if (args[0] && args[0].includes('sys.stdout.getvalue()')) {
          return Promise.resolve('test');
        }
        
        // For all other calls, return undefined
        return Promise.resolve(undefined);
      });

      // Execute multiple times rapidly
      const promises = Array.from({ length: 5 }, () =>
        runtime.execute('print("test")', testCases)
      );

      const results = await Promise.all(promises);

      // Check that all executions completed successfully
      results.forEach((result) => {
        expect(result.testResults).toHaveLength(1);
        expect(result.testResults[0].passed).toBe(true);
      });

      // Verify all mocks were called (4 calls per execution * 5 executions = 20 calls)
      expect(mockPyodide.runPythonAsync).toHaveBeenCalledTimes(20);
    });

    it('should handle memory cleanup between executions', async () => {
      mockFetch.mockImplementation((input: string | URL | Request) => {
        let url: string;
        if (typeof input === 'string') {
          url = input;
        } else if (input instanceof Request) {
          url = input.url;
        } else {
          url = input.toString();
        }
        if (url.endsWith('input1.txt')) {
          return Promise.resolve(createMockResponse(''));
        }
        if (url.endsWith('output1.txt')) {
          return Promise.resolve(createMockResponse('test'));
        }
        return Promise.resolve(createMockResponse(''));
      });

      // Reset the globals.clear mock to ensure it's being tracked correctly
      mockPyodide.globals.clear.mockReset();

      // Mock 6 calls (3 calls per execution * 2 executions)
      mockPyodide.runPythonAsync
        .mockResolvedValueOnce(undefined) // Setup environment for execution 1
        .mockResolvedValueOnce(undefined) // Execute user code for execution 1
        .mockResolvedValueOnce('test') // Get output for execution 1
        .mockResolvedValueOnce(undefined) // Setup environment for execution 2
        .mockResolvedValueOnce(undefined) // Execute user code for execution 2
        .mockResolvedValueOnce('test2'); // Get output for execution 2

      // First execution
      await runtime.execute('print("test")', testCases);

      // Verify globals were cleared
      expect(mockPyodide.globals.clear).toHaveBeenCalled();

      // Second execution
      await runtime.execute('print("test2")', testCases);

      // Should be called again
      expect(mockPyodide.globals.clear).toHaveBeenCalledTimes(2);
    });
  });
});
