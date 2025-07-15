import { CodeExecutionService } from '../CodeExecutionService';
import { WasmManager } from '../WasmManager';
import { TestCase, ExecutionMode } from '@/shared/types';
import { User } from 'firebase/auth';

// Mock WasmManager
jest.mock('../WasmManager');
const MockWasmManager = WasmManager as jest.MockedClass<typeof WasmManager>;

// Mock submission service
jest.mock('../../SubmissionService', () => ({
  submissionService: {
    createSubmission: jest.fn().mockReturnValue({
      id: 'test-submission-id',
      success: true,
      message: 'Test submission',
      timestamp: new Date(),
      questionId: 'test-question',
      language: 'python',
      code: 'print("test")',
      testResults: [],
      passedCount: 0,
      failedCount: 0,
      totalCount: 0,
      executionTime: 100,
      overallStatus: 'PASSED' as const,
    }),
    saveSubmission: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('CodeExecutionService', () => {
  let service: CodeExecutionService;
  let mockUser: User;
  let mockWasmManager: jest.Mocked<WasmManager>;

  const testCases: TestCase[] = [
    {
      inputFile: '/test/input1.txt',
      expectedFile: '/test/output1.txt',
      description: 'Test case 1',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUser = {
      uid: 'test-user-id',
      email: 'test@example.com',
    } as User;

    // Mock WasmManager instance
    mockWasmManager = {
      isLoaded: jest.fn().mockReturnValue(true),
      runCode: jest.fn().mockResolvedValue({
        output: 'WASM execution result',
        testResults: testCases.map(test => ({
          testCase: test.description,
          expected: 'expected',
          actual: 'actual',
          passed: true,
          input: 'input',
        })),
      }),
      getRuntimeStatus: jest.fn().mockReturnValue({
        python: { loaded: true, language: 'python' },
        javascript: { loaded: true, language: 'javascript' },
      }),
      loadAll: jest.fn().mockResolvedValue(undefined),
    } as any;

    // Mock WasmManager.default() to return our mocked instance
    MockWasmManager.default = jest.fn().mockReturnValue(mockWasmManager);

    service = new CodeExecutionService(mockUser);
  });

  describe('constructor', () => {
    it('should initialize with user and default WasmManager', () => {
      expect(MockWasmManager.default).toHaveBeenCalled();
      expect(service.getSupportedLanguages()).toContain('python');
      expect(service.getSupportedLanguages()).toContain('javascript');
      expect(service.getSupportedLanguages()).toContain('go');
    });

    it('should accept custom WasmManager', () => {
      MockWasmManager.default.mockClear();
      
      const customWasmManager = mockWasmManager;
      const customService = new CodeExecutionService(mockUser, 'https://custom-judge0.com', customWasmManager);
      
      expect(MockWasmManager.default).not.toHaveBeenCalled();
      expect(customService).toBeDefined();
    });
  });

  describe('executeCode', () => {
    it('should execute Python code using WASM backend', async () => {
      const result = await service.executeCode('print("test")', testCases, 'python');
      
      expect(mockWasmManager.runCode).toHaveBeenCalledWith('python', 'print("test")', testCases);
      expect(result.output).toContain('Sample Test Results');
      expect(result.testResults).toHaveLength(1);
      expect(result.executionTime).toBeDefined();
    });

    it('should handle execution mode RUN with test case limit', async () => {
      const manyTestCases = Array.from({ length: 5 }, (_, i) => ({
        inputFile: `/test/input${i + 1}.txt`,
        expectedFile: `/test/output${i + 1}.txt`,
        description: `Test case ${i + 1}`,
      }));

      const mode: ExecutionMode = { type: 'RUN', testCaseLimit: 2, createSnapshot: false };
      
      await service.executeCode('print("test")', manyTestCases, 'python', mode);
      
      // Should only pass first 2 test cases
      expect(mockWasmManager.runCode).toHaveBeenCalledWith('python', 'print("test")', manyTestCases.slice(0, 2));
    });

    it('should handle execution mode SUBMIT without test case limit', async () => {
      const manyTestCases = Array.from({ length: 5 }, (_, i) => ({
        inputFile: `/test/input${i + 1}.txt`,
        expectedFile: `/test/output${i + 1}.txt`,
        description: `Test case ${i + 1}`,
      }));

      const mode: ExecutionMode = { type: 'SUBMIT', createSnapshot: true };
      
      await service.executeCode('print("test")', manyTestCases, 'python', mode);
      
      // Should pass all test cases
      expect(mockWasmManager.runCode).toHaveBeenCalledWith('python', 'print("test")', manyTestCases);
    });

    it('should throw error for unsupported language', async () => {
      await expect(service.executeCode('code', testCases, 'unsupported'))
        .rejects.toThrow('Unsupported language: unsupported');
    });
  });

  describe('executeAndSubmit', () => {
    it('should execute code and create submission', async () => {
      const { submissionService } = require('../../SubmissionService');
      
      const result = await service.executeAndSubmit(
        'print("test")',
        testCases,
        'python',
        'test-question-id'
      );
      
      expect(result.result).toBeDefined();
      expect(result.submission).toBeDefined();
      expect(submissionService.createSubmission).toHaveBeenCalledWith(
        'print("test")',
        'test-question-id',
        'python',
        expect.any(Array),
        expect.any(Number)
      );
      expect(submissionService.saveSubmission).toHaveBeenCalled();
    });
  });

  describe('isLanguageAvailable', () => {
    it('should return true for supported language with available backend', () => {
      expect(service.isLanguageAvailable('python')).toBe(true);
    });

    it('should return false for unsupported language', () => {
      expect(service.isLanguageAvailable('unsupported')).toBe(false);
    });
  });

  describe('requiresAuth', () => {
    it('should return false for Python (WASM available)', () => {
      expect(service.requiresAuth('python')).toBe(false);
    });

    it('should return true for Go (only Judge0 available)', () => {
      expect(service.requiresAuth('go')).toBe(true);
    });

    it('should return false for unsupported language', () => {
      expect(service.requiresAuth('unsupported')).toBe(false);
    });
  });

  describe('getLanguageStatus', () => {
    it('should return status of all languages', () => {
      const status = service.getLanguageStatus();
      
      expect(status.python).toBeDefined();
      expect(status.python.available).toBe(true);
      expect(status.python.backends).toBeDefined();
      
      expect(status.go).toBeDefined();
      expect(status.go.available).toBe(true);
      expect(status.go.backends).toBeDefined();
    });
  });

  describe('getWasmStatus', () => {
    it('should return WASM runtime status', () => {
      const status = service.getWasmStatus();
      
      expect(mockWasmManager.getRuntimeStatus).toHaveBeenCalled();
      expect(status.python).toEqual({ loaded: true, language: 'python' });
      expect(status.javascript).toEqual({ loaded: true, language: 'javascript' });
    });
  });

  describe('loadWasmRuntimes', () => {
    it('should load all WASM runtimes', async () => {
      await service.loadWasmRuntimes();
      
      expect(mockWasmManager.loadAll).toHaveBeenCalled();
    });
  });

  describe('language registration', () => {
    it('should support Python with WASM and Judge0 backends', () => {
      const status = service.getLanguageStatus();
      
      expect(status.python.available).toBe(true);
      expect(status.python.backends).toHaveLength(2);
      expect(status.python.backends[0].name).toBe('WasmBackend');
      expect(status.python.backends[1].name).toBe('Judge0Backend');
    });

    it('should support Go with only Judge0 backend', () => {
      const status = service.getLanguageStatus();
      
      expect(status.go.available).toBe(true);
      expect(status.go.backends).toHaveLength(1);
      expect(status.go.backends[0].name).toBe('Judge0Backend');
    });

    it('should support compiled languages with Judge0 backend', () => {
      const status = service.getLanguageStatus();
      
      ['c', 'cpp', 'java', 'rust'].forEach(lang => {
        expect(status[lang].available).toBe(true);
        expect(status[lang].backends).toHaveLength(1);
        expect(status[lang].backends[0].name).toBe('Judge0Backend');
      });
    });
  });

  describe('error handling', () => {
    it('should handle WASM execution errors gracefully', async () => {
      mockWasmManager.runCode.mockRejectedValue(new Error('WASM error'));
      
      // Should fallback to Judge0 backend
      const result = await service.executeCode('print("test")', testCases, 'python');
      
      expect(result).toBeDefined();
      // The CompositeExecutionStrategy should handle the fallback
    });
  });
});