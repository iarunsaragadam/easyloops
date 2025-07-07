import {
  CodeExecutionService,
  PyodideExecutionStrategy,
  GoExecutionStrategy,
  Judge0ExecutionStrategy,
} from '../CodeExecutionService';
import { TestCase, CodeExecutionResult, PyodideManager } from '@/shared/types';
import { User } from 'firebase/auth';

// Mock PyodideManager
const mockPyodideManager: Partial<PyodideManager> = {
  pyodide: null,
  isLoaded: true,
  runCode: jest.fn(),
  loadingError: null,
} as Partial<PyodideManager>;

// Mock User
const mockUser: User = {
  email: 'test@example.com',
  emailVerified: true,
  isAnonymous: false,
  metadata: {} as unknown as User['metadata'],
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: jest.fn(),
  getIdToken: jest.fn(),
  getIdTokenResult: jest.fn(),
  reload: jest.fn(),
  toJSON: jest.fn(),
  displayName: null,
  phoneNumber: null,
  photoURL: null,
  providerId: '',
  uid: 'test-uid',
};

// Mock test cases
const mockTestCases: TestCase[] = [
  {
    description: 'Test case 1',
    inputFile: '/testcases/input1.txt',
    expectedFile: '/testcases/expected1.txt',
  },
  {
    description: 'Test case 2',
    inputFile: '/testcases/input2.txt',
    expectedFile: '/testcases/expected2.txt',
  },
];

// Mock fetch
global.fetch = jest.fn();

describe('CodeExecutionService', () => {
  let service: CodeExecutionService;
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    service = new CodeExecutionService(
      mockPyodideManager as PyodideManager,
      mockUser
    );
  });

  describe('constructor', () => {
    it('should initialize with all language strategies', () => {
      expect(service).toBeDefined();
    });

    it('should work with null user', () => {
      const serviceWithNullUser = new CodeExecutionService(
        mockPyodideManager as PyodideManager,
        null
      );
      expect(serviceWithNullUser).toBeDefined();
    });
  });

  describe('executeCode', () => {
    it('should execute Python code using Pyodide strategy', async () => {
      const mockResult: CodeExecutionResult = {
        output: 'Python output',
        testResults: [],
      };

      (mockPyodideManager.runCode as jest.Mock).mockResolvedValue(mockResult);

      const result = await service.executeCode(
        'print("Hello")',
        mockTestCases,
        'python'
      );

      expect(result.output).toBe(mockResult.output);
      expect(result.testResults).toEqual(mockResult.testResults);
      // executionTime is optional, so we don't need to check it
      expect(mockPyodideManager.runCode).toHaveBeenCalledWith(
        'print("Hello")',
        mockTestCases
      );
    });

    it('should execute Go code using Go strategy', async () => {
      const mockGoResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ output: 'expected output' }),
      };

      const mockInputResponse = {
        ok: true,
        text: jest.fn().mockResolvedValue('test input'),
      };

      const mockExpectedResponse = {
        ok: true,
        text: jest.fn().mockResolvedValue('expected output'),
      };

      mockFetch
        .mockResolvedValueOnce(mockInputResponse as unknown as Response)
        .mockResolvedValueOnce(mockExpectedResponse as unknown as Response)
        .mockResolvedValueOnce(mockGoResponse as unknown as Response)
        .mockResolvedValueOnce(mockInputResponse as unknown as Response)
        .mockResolvedValueOnce(mockExpectedResponse as unknown as Response)
        .mockResolvedValueOnce(mockGoResponse as unknown as Response);

      const result = await service.executeCode(
        'package main',
        mockTestCases,
        'go'
      );

      expect(result.output).toContain('✅ Test case 1');
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/execute/go/',
        expect.any(Object)
      );
    });

    it('should execute other languages using Judge0 strategy', async () => {
      const result = await service.executeCode(
        '#include <stdio.h>',
        mockTestCases,
        'c'
      );

      expect(result.output).toBe('Sample Test Results (0/2 passed)');
    });

    it('should throw error for unsupported language', async () => {
      await expect(
        service.executeCode('invalid code', mockTestCases, 'unsupported')
      ).rejects.toThrow('Unsupported language: unsupported');
    });

    it('should throw error when language is not available', async () => {
      const serviceWithoutUser = new CodeExecutionService(
        mockPyodideManager as PyodideManager,
        null
      );

      await expect(
        serviceWithoutUser.executeCode('package main', mockTestCases, 'go')
      ).rejects.toThrow('Language go is not available');
    });
  });

  describe('isLanguageAvailable', () => {
    it('should return true for Python when Pyodide is loaded', () => {
      expect(service.isLanguageAvailable('python')).toBe(true);
    });

    it('should return false for Python when Pyodide is not loaded', () => {
      const unloadedPyodideManager = { ...mockPyodideManager, isLoaded: false };
      const serviceWithUnloadedPyodide = new CodeExecutionService(
        unloadedPyodideManager as PyodideManager,
        mockUser
      );

      expect(serviceWithUnloadedPyodide.isLanguageAvailable('python')).toBe(
        false
      );
    });

    it('should return true for Go when user is authenticated', () => {
      expect(service.isLanguageAvailable('go')).toBe(true);
    });

    it('should return false for Go when user is not authenticated', () => {
      const serviceWithoutUser = new CodeExecutionService(
        mockPyodideManager as PyodideManager,
        null
      );

      expect(serviceWithoutUser.isLanguageAvailable('go')).toBe(false);
    });

    it('should return true for other languages when user is authenticated', () => {
      expect(service.isLanguageAvailable('c')).toBe(true);
      expect(service.isLanguageAvailable('cpp')).toBe(true);
      expect(service.isLanguageAvailable('javascript')).toBe(true);
      expect(service.isLanguageAvailable('java')).toBe(true);
      expect(service.isLanguageAvailable('rust')).toBe(true);
    });

    it('should return false for other languages when user is not authenticated', () => {
      const serviceWithoutUser = new CodeExecutionService(
        mockPyodideManager as PyodideManager,
        null
      );

      expect(serviceWithoutUser.isLanguageAvailable('c')).toBe(false);
    });
  });

  describe('requiresAuth', () => {
    it('should return false for Python', () => {
      expect(service.requiresAuth('python')).toBe(false);
    });

    it('should return true for Go', () => {
      expect(service.requiresAuth('go')).toBe(true);
    });

    it('should return true for other languages', () => {
      expect(service.requiresAuth('c')).toBe(true);
      expect(service.requiresAuth('cpp')).toBe(true);
      expect(service.requiresAuth('javascript')).toBe(true);
      expect(service.requiresAuth('java')).toBe(true);
      expect(service.requiresAuth('rust')).toBe(true);
    });

    it('should return false for unsupported languages', () => {
      expect(service.requiresAuth('unsupported')).toBe(false);
    });
  });
});

describe('PyodideExecutionStrategy', () => {
  let strategy: PyodideExecutionStrategy;

  beforeEach(() => {
    jest.clearAllMocks();
    strategy = new PyodideExecutionStrategy(
      mockPyodideManager as PyodideManager
    );
  });

  describe('execute', () => {
    it('should execute code successfully', async () => {
      const mockResult: CodeExecutionResult = {
        output: 'Test output',
        testResults: [],
      };

      (mockPyodideManager.runCode as jest.Mock).mockResolvedValue(mockResult);

      const result = await strategy.execute('print("test")', mockTestCases, {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      });

      expect(result).toEqual(mockResult);
      expect(mockPyodideManager.runCode).toHaveBeenCalledWith(
        'print("test")',
        mockTestCases
      );
    });

    it('should throw error when Pyodide is not loaded', async () => {
      const unloadedStrategy = new PyodideExecutionStrategy({
        ...mockPyodideManager,
        isLoaded: false,
      } as PyodideManager);

      await expect(
        unloadedStrategy.execute('print("test")', mockTestCases, {
          type: 'RUN',
          testCaseLimit: 2,
          createSnapshot: false,
        })
      ).rejects.toThrow('Pyodide is not loaded yet');
    });
  });

  describe('isAvailable', () => {
    it('should return true when Pyodide is loaded', () => {
      expect(strategy.isAvailable()).toBe(true);
    });

    it('should return false when Pyodide is not loaded', () => {
      const unloadedStrategy = new PyodideExecutionStrategy({
        ...mockPyodideManager,
        isLoaded: false,
      } as PyodideManager);

      expect(unloadedStrategy.isAvailable()).toBe(false);
    });
  });

  describe('requiresAuth', () => {
    it('should return false', () => {
      expect(strategy.requiresAuth()).toBe(false);
    });
  });
});

describe('GoExecutionStrategy', () => {
  let strategy: GoExecutionStrategy;
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    strategy = new GoExecutionStrategy(mockUser);
  });

  describe('execute', () => {
    it('should execute Go code successfully', async () => {
      const mockGoResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ output: 'expected output' }),
      };

      const mockInputResponse = {
        ok: true,
        text: jest.fn().mockResolvedValue('test input'),
      };

      const mockExpectedResponse = {
        ok: true,
        text: jest.fn().mockResolvedValue('expected output'),
      };

      mockFetch
        .mockResolvedValueOnce(mockInputResponse as unknown as Response)
        .mockResolvedValueOnce(mockExpectedResponse as unknown as Response)
        .mockResolvedValueOnce(mockGoResponse as unknown as Response)
        .mockResolvedValueOnce(mockInputResponse as unknown as Response)
        .mockResolvedValueOnce(mockExpectedResponse as unknown as Response)
        .mockResolvedValueOnce(mockGoResponse as unknown as Response);

      const result = await strategy.execute('package main', mockTestCases, {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      });

      expect(result.output).toContain('✅ Test case 1');
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/execute/go/',
        expect.any(Object)
      );
    });

    it('should handle Go execution errors', async () => {
      const mockGoResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ error: 'Compilation error' }),
      };

      const mockInputResponse = {
        ok: true,
        text: jest.fn().mockResolvedValue('test input'),
      };

      const mockExpectedResponse = {
        ok: true,
        text: jest.fn().mockResolvedValue('expected output'),
      };

      mockFetch
        .mockResolvedValueOnce(mockInputResponse as unknown as Response)
        .mockResolvedValueOnce(mockExpectedResponse as unknown as Response)
        .mockResolvedValueOnce(mockGoResponse as unknown as Response)
        .mockResolvedValueOnce(mockInputResponse as unknown as Response)
        .mockResolvedValueOnce(mockExpectedResponse as unknown as Response)
        .mockResolvedValueOnce(mockGoResponse as unknown as Response);

      const result = await strategy.execute('package main', mockTestCases, {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      });

      expect(result.output).toContain('❌ Test case 1');
    });

    it('should handle test case fetch errors', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 404,
      };

      mockFetch.mockResolvedValue(mockErrorResponse as unknown as Response);

      const result = await strategy.execute('package main', mockTestCases, {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      });

      expect(result.output).toContain('❌ Test case 1');
      expect(result.testResults[0].actual).toContain(
        'Error: Failed to fetch file'
      );
    });

    it('should throw error when user is not authenticated', async () => {
      const unauthenticatedStrategy = new GoExecutionStrategy(null);

      await expect(
        unauthenticatedStrategy.execute('package main', mockTestCases, {
          type: 'RUN',
          testCaseLimit: 2,
          createSnapshot: false,
        })
      ).rejects.toThrow('Authentication required for Go code execution');
    });
  });

  describe('isAvailable', () => {
    it('should return true when user is authenticated', () => {
      expect(strategy.isAvailable()).toBe(true);
    });

    it('should return false when user is not authenticated', () => {
      const unauthenticatedStrategy = new GoExecutionStrategy(null);

      expect(unauthenticatedStrategy.isAvailable()).toBe(false);
    });
  });

  describe('requiresAuth', () => {
    it('should return true', () => {
      expect(strategy.requiresAuth()).toBe(true);
    });
  });
});

describe('Judge0ExecutionStrategy', () => {
  let strategy: Judge0ExecutionStrategy;

  beforeEach(() => {
    jest.clearAllMocks();
    strategy = new Judge0ExecutionStrategy(
      mockUser,
      'https://judge0.example.com',
      50
    );
  });

  describe('execute', () => {
    it('should return mock result', async () => {
      const result = await strategy.execute(
        '#include <stdio.h>',
        mockTestCases,
        { type: 'RUN', testCaseLimit: 2, createSnapshot: false }
      );

      expect(result.output).toBe('Sample Test Results (0/2 passed)');
      expect(result.testResults).toHaveLength(2);
      expect(result.testResults[0].passed).toBe(false);
    });

    it('should throw error when user is not authenticated', async () => {
      const unauthenticatedStrategy = new Judge0ExecutionStrategy(
        null,
        'https://judge0.example.com',
        50
      );

      await expect(
        unauthenticatedStrategy.execute('#include <stdio.h>', mockTestCases, {
          type: 'RUN',
          testCaseLimit: 2,
          createSnapshot: false,
        })
      ).rejects.toThrow('Authentication required for code execution');
    });
  });

  describe('isAvailable', () => {
    it('should return true when user is authenticated', () => {
      expect(strategy.isAvailable()).toBe(true);
    });

    it('should return false when user is not authenticated', () => {
      const unauthenticatedStrategy = new Judge0ExecutionStrategy(
        null,
        'https://judge0.example.com',
        50
      );

      expect(unauthenticatedStrategy.isAvailable()).toBe(false);
    });
  });

  describe('requiresAuth', () => {
    it('should return true', () => {
      expect(strategy.requiresAuth()).toBe(true);
    });
  });
});
