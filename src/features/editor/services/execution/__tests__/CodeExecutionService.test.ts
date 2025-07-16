import { CodeExecutionService } from '../CodeExecutionService';
import { TestCase, ExecutionMode } from '@/shared/types';
import { User } from 'firebase/auth';
import { WasmManager } from '../WasmManager';

// Mock dependencies
jest.mock('../WasmManager');
jest.mock('../backends/WasmBackend');
jest.mock('../backends/Judge0Backend');
jest.mock('../../SubmissionService');

describe('CodeExecutionService', () => {
  let service: CodeExecutionService;
  let mockUser: User;
  let testCases: TestCase[];

  beforeEach(() => {
    mockUser = {
      uid: 'test-user-id',
      email: 'test@example.com',
    } as User;

    testCases = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/output1.txt',
        description: 'Test case 1',
      },
    ];

    // Mock WasmManager
    const WasmManagerMock = jest.requireMock('../WasmManager').WasmManager;
    WasmManagerMock.default = jest.fn().mockReturnValue({
      runCode: jest.fn().mockResolvedValue({
        output: 'Sample Test Results',
        testResults: [{ passed: true, output: 'test' }],
        executionTime: 100,
      }),
      getRuntimeStatus: jest.fn().mockReturnValue({
        python: { loaded: true, language: 'python' },
        javascript: { loaded: true, language: 'javascript' },
      }),
      loadAll: jest.fn().mockResolvedValue(undefined),
      isLoadedSync: jest.fn().mockReturnValue(true),
      isLoaded: jest.fn().mockResolvedValue(true),
      getSupportedLanguages: jest
        .fn()
        .mockReturnValue(['python', 'javascript', 'typescript', 'ruby']),
    });

    // Mock WasmBackend

    const WasmBackendMock = jest.requireMock(
      '../backends/WasmBackend'
    ).WasmBackend;
    WasmBackendMock.mockImplementation(function (
      this: Record<string, unknown>,
      language: string,
      wasmManager: unknown
    ) {
      this.language = language;
      this.wasmManager = wasmManager;
      this.isAvailable = jest.fn().mockReturnValue(true);
      this.isAvailableAsync = jest.fn().mockResolvedValue(true);
      this.requiresAuth = jest.fn().mockReturnValue(false);
      this.execute = jest.fn().mockResolvedValue({
        output: 'Mock WASM output',
        testResults: [{ passed: true, output: 'test' }],
      });
    });

    // Mock Judge0Backend

    const Judge0BackendMock = jest.requireMock(
      '../backends/Judge0Backend'
    ).Judge0Backend;

    Judge0BackendMock.mockImplementation(function (
      this: Record<string, unknown>,
      language: string,
      judge0Url: string,
      languageId: number,
      user: User | null
    ) {
      this.language = language;
      this.judge0Url = judge0Url;
      this.languageId = languageId;
      this.user = user;
      this.isAvailable = jest.fn().mockReturnValue(!!user);
      this.requiresAuth = jest.fn().mockReturnValue(true);
      this.execute = jest.fn().mockResolvedValue({
        output: 'Judge0 execution result',
        testResults: [{ passed: true, output: 'test' }],
      });
    });

    // Mock SubmissionService
    const submissionServiceMock = jest.requireMock(
      '../../SubmissionService'
    ).submissionService;

    jest.spyOn(submissionServiceMock, 'createSubmission').mockReturnValue({
      id: 'test-submission',
      timestamp: new Date(),
      questionId: 'test-question-id',
      language: 'python',
      code: 'print("test")',
      testResults: [],
      passedCount: 1,
      failedCount: 0,
      totalCount: 1,
      executionTime: 0,
      overallStatus: 'PASSED' as const,
      success: true,
      message: 'PASSED',
    });
    jest
      .spyOn(submissionServiceMock, 'saveSubmission')
      .mockResolvedValue(undefined);

    service = new CodeExecutionService(mockUser);
  });

  describe('constructor', () => {
    it('should initialize with user and default WasmManager', () => {
      expect(service.getSupportedLanguages()).toContain('python');
      expect(service.getSupportedLanguages()).toContain('javascript');
      expect(service.getSupportedLanguages()).toContain('go');
    });

    it('should accept custom WasmManager', () => {
      const customWasmManager = {
        runCode: jest.fn(),
        getRuntimeStatus: jest.fn(),
        loadAll: jest.fn(),
        isLoadedSync: jest.fn(),
        isLoaded: jest.fn(),
        getSupportedLanguages: jest.fn(),

        // Add missing required props/methods
        runtimes: {},
        loadingPromises: {},
        load: jest.fn(),
        addRuntime: jest.fn(),
        removeRuntime: jest.fn(),
      } as unknown as WasmManager;

      const customService = new CodeExecutionService(
        mockUser,
        'https://custom-judge0.com',
        customWasmManager
      );

      expect(customService).toBeDefined();
    });
  });

  describe('executeCode', () => {
    it('should execute Python code using WASM backend', async () => {
      const result = await service.executeCode(
        'print("test")',
        testCases,
        'python'
      );

      expect(result.output).toContain('Mock WASM output');
      expect(result.testResults).toHaveLength(1);
    });

    it('should handle execution mode RUN with test case limit', async () => {
      const manyTestCases = Array.from({ length: 5 }, (_, i) => ({
        inputFile: `/test/input${i + 1}.txt`,
        expectedFile: `/test/output${i + 1}.txt`,
        description: `Test case ${i + 1}`,
      }));

      const mode: ExecutionMode = {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      };

      const result = await service.executeCode(
        'print("test")',
        manyTestCases,
        'python',
        mode
      );

      expect(result).toBeDefined();
    });

    it('should handle execution mode SUBMIT without test case limit', async () => {
      const manyTestCases = Array.from({ length: 5 }, (_, i) => ({
        inputFile: `/test/input${i + 1}.txt`,
        expectedFile: `/test/output${i + 1}.txt`,
        description: `Test case ${i + 1}`,
      }));

      const mode: ExecutionMode = { type: 'SUBMIT', createSnapshot: true };

      const result = await service.executeCode(
        'print("test")',
        manyTestCases,
        'python',
        mode
      );

      expect(result).toBeDefined();
    });

    it('should throw error for unsupported language', async () => {
      await expect(
        service.executeCode('code', testCases, 'unsupported')
      ).rejects.toThrow('Unsupported language: unsupported');
    });
  });

  describe('executeAndSubmit', () => {
    it('should execute code and create submission', async () => {
      const result = await service.executeAndSubmit(
        'print("test")',
        testCases,
        'python',
        'test-question-id'
      );

      expect(result.result).toBeDefined();
      expect(result.submission).toBeDefined();
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

      expect(status.python).toEqual({ loaded: true, language: 'python' });
      expect(status.javascript).toEqual({
        loaded: true,
        language: 'javascript',
      });
    });
  });

  describe('loadWasmRuntimes', () => {
    it('should load all WASM runtimes', async () => {
      await service.loadWasmRuntimes();
      // The method should complete without error
      expect(true).toBe(true);
    });
  });

  describe('language registration', () => {
    it('should support Python with WASM and Judge0 backends', () => {
      const status = service.getLanguageStatus();

      expect(status.python.available).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((status.python.backends as any[]).length).toBe(2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((status.python.backends as any[])[0].name).toBe('WasmBackend');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((status.python.backends as any[])[1].name).toBe('Judge0Backend');
    });

    it('should support Go with only Judge0 backend', () => {
      const status = service.getLanguageStatus();

      expect(status.go.available).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((status.go.backends as any[]).length).toBe(1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((status.go.backends as any[])[0].name).toBe('Judge0Backend');
    });

    it('should support compiled languages with Judge0 backend', () => {
      const status = service.getLanguageStatus();

      ['c', 'cpp', 'java', 'rust'].forEach((lang) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((status as any)[lang].available).toBe(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(((status as any)[lang].backends as any[]).length).toBe(1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(((status as any)[lang].backends as any[])[0].name).toBe(
          'Judge0Backend'
        );
      });
    });
  });

  describe('error handling', () => {
    it('should handle WASM execution errors gracefully', async () => {
      // Mock WASM backend to fail
      const WasmBackendMock = jest.requireMock(
        '../backends/WasmBackend'
      ).WasmBackend;

      WasmBackendMock.mockImplementation(function (
        this: Record<string, unknown>,
        language: string,
        wasmManager: unknown
      ) {
        this.language = language;
        this.wasmManager = wasmManager;
        this.isAvailable = jest.fn().mockReturnValue(true);
        this.isAvailableAsync = jest.fn().mockResolvedValue(true);
        this.requiresAuth = jest.fn().mockReturnValue(false);
        this.execute = jest.fn().mockRejectedValue(new Error('WASM error'));
      });

      // Recreate service with failing WASM backend
      const failingService = new CodeExecutionService(mockUser);

      // Should fallback to Judge0 backend
      const result = await failingService.executeCode(
        'print("test")',
        testCases,
        'python'
      );

      expect(result).toBeDefined();
    });
  });
});
