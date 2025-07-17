import { CodeExecutionService } from '../CodeExecutionService';
import { TestCase, ExecutionMode } from '@/shared/types';
import { User } from 'firebase/auth';
import { WasmManager } from '../WasmManager';

// Mock dependencies
jest.mock('../WasmManager');
jest.mock('../backends/WasmBackend');
jest.mock('../backends/Judge0Backend');

// Mock fetch
global.fetch = jest.fn();

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
  {
    description: 'Test case 3',
    inputFile: '/testcases/input3.txt',
    expectedFile: '/testcases/expected3.txt',
  },
];

describe('CodeExecutionService - Comprehensive Tests', () => {
  let service: CodeExecutionService;
  let mockWasmManager: jest.Mocked<WasmManager>;
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    // Mock WasmManager
    mockWasmManager = {
      isLoaded: jest.fn().mockResolvedValue(true),
      isLoadedSync: jest.fn().mockReturnValue(true),
      load: jest.fn().mockResolvedValue(undefined),
      runCode: jest.fn().mockResolvedValue({
        output: 'Mock WASM output',
        testResults: [],
        executionTime: 100,
      }),
      getSupportedLanguages: jest
        .fn()
        .mockReturnValue(['python', 'javascript', 'typescript', 'ruby']),
      getRuntimeStatus: jest.fn().mockReturnValue({
        python: { loaded: true, language: 'python' },
        javascript: { loaded: true, language: 'javascript' },
        typescript: { loaded: true, language: 'typescript' },
        ruby: { loaded: true, language: 'ruby' },
      }),
      loadAll: jest.fn().mockResolvedValue(undefined),
      addRuntime: jest.fn(),
      removeRuntime: jest.fn().mockReturnValue(true),
    } as unknown as jest.Mocked<WasmManager>;

    // Mock WasmManager.default
    (WasmManager.default as jest.Mock).mockReturnValue(mockWasmManager);

    // Mock WasmBackend to properly handle availability
    const { WasmBackend } = jest.requireMock('../backends/WasmBackend');
    WasmBackend.mockImplementation(function (
      this: Record<string, unknown>,
      language: string,
      wasmManager: unknown
    ) {
      this.language = language;
      this.wasmManager = wasmManager;

      this.isAvailable = jest.fn().mockReturnValue(true);
      this.isAvailableAsync = jest.fn().mockResolvedValue(true);
      this.requiresAuth = jest.fn().mockReturnValue(false);
      this.execute = jest
        .fn()
        .mockImplementation((code: string, tests: TestCase[]) => {
          return Promise.resolve({
            output: 'Mock WASM output',
            testResults: tests.map((testCase) => ({
              testCase: testCase.description,
              expected: 'Expected output',
              actual: 'Actual output',
              passed: true,
              input: 'Test input',
            })),
          });
        });
    });

    // Mock Judge0Backend to properly handle availability
    const { Judge0Backend } = jest.requireMock('../backends/Judge0Backend');
    Judge0Backend.mockImplementation(function (
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
      this.execute = jest
        .fn()
        .mockImplementation((code: string, tests: TestCase[]) => {
          return Promise.resolve({
            output: 'Judge0 execution result',
            testResults: tests.map((testCase) => ({
              testCase: testCase.description,
              expected: 'Expected output',
              actual: 'Actual output',
              passed: true,
              input: 'Test input',
            })),
          });
        });
    });

    service = new CodeExecutionService(mockUser);
  });

  describe('Constructor and Initialization', () => {
    it('should initialize with all supported languages', () => {
      expect(service.getSupportedLanguages()).toContain('python');
      expect(service.getSupportedLanguages()).toContain('javascript');
      expect(service.getSupportedLanguages()).toContain('go');
      expect(service.getSupportedLanguages()).toContain('c');
      expect(service.getSupportedLanguages()).toContain('cpp');
      expect(service.getSupportedLanguages()).toContain('java');
      expect(service.getSupportedLanguages()).toContain('rust');
      expect(service.getSupportedLanguages()).toContain('ruby');
      expect(service.getSupportedLanguages()).toContain('typescript');
    });

    it('should work with null user', () => {
      const serviceWithoutUser = new CodeExecutionService(null);
      expect(serviceWithoutUser).toBeDefined();
    });

    it('should accept custom WasmManager', () => {
      const customWasmManager = new WasmManager([]);
      const serviceWithCustomManager = new CodeExecutionService(
        mockUser,
        'https://custom-judge0.com',
        customWasmManager
      );
      expect(serviceWithCustomManager).toBeDefined();
    });

    it('should accept custom Judge0 URL', () => {
      const customService = new CodeExecutionService(
        mockUser,
        'https://custom-judge0.com'
      );
      expect(customService).toBeDefined();
    });
  });

  describe('Language Registration and Strategy Management', () => {
    it('should register Python with WASM and Judge0 backends', () => {
      const status = service.getLanguageStatus();
      expect(status.python.available).toBe(true);
      expect(status.python.requiresAuth).toBe(false);
      expect(status.python.backends).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'WasmBackend' }),
          expect.objectContaining({ name: 'Judge0Backend' }),
        ])
      );
    });

    it('should register Go with only Judge0 backend', () => {
      const status = service.getLanguageStatus();
      expect(status.go.available).toBe(true);
      expect(status.go.requiresAuth).toBe(true);
      expect(status.go.backends).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'Judge0Backend' }),
        ])
      );
    });

    it('should register compiled languages with Judge0 only', () => {
      const status = service.getLanguageStatus();
      ['c', 'cpp', 'java', 'rust'].forEach((lang) => {
        expect(status[lang].available).toBe(true);
        expect(status[lang].requiresAuth).toBe(true);
        expect(status[lang].backends).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ name: 'Judge0Backend' }),
          ])
        );
      });
    });

    it('should handle unsupported language registration', () => {
      expect(() => {
        // This would be called internally if we tried to register with no backends
        // We can't directly test the private register method, but we can test the behavior
        expect(service.isLanguageAvailable('unsupported')).toBe(false);
      }).not.toThrow();
    });
  });

  describe('Code Execution - Comprehensive Scenarios', () => {
    it('should execute Python code with WASM backend successfully', async () => {
      const result = await service.executeCode(
        'print("Hello, World!")',
        mockTestCases,
        'python'
      );

      expect(result.output).toContain('Mock WASM output');
      expect(result.executionTime).toBeDefined();
      expect(result.testResults).toBeDefined();
    });

    it('should handle execution mode RUN with test case limit', async () => {
      const mode: ExecutionMode = {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      };

      const result = await service.executeCode(
        'print("test")',
        mockTestCases,
        'python',
        mode
      );

      expect(result.output).toContain('Mock WASM output');
      expect(result.executionTime).toBeDefined();
    });

    it('should handle execution mode SUBMIT without test case limit', async () => {
      const mode: ExecutionMode = {
        type: 'SUBMIT',
        createSnapshot: true,
      };

      const result = await service.executeCode(
        'print("test")',
        mockTestCases,
        'python',
        mode
      );

      expect(result.output).toContain('Mock WASM output');
      expect(result.executionTime).toBeDefined();
    });

    it('should handle empty test cases array', async () => {
      const result = await service.executeCode('print("test")', [], 'python');

      expect(result.output).toContain('Mock WASM output');
      expect(result.testResults).toHaveLength(0);
    });

    it('should handle very large code execution', async () => {
      const largeCode = 'print("x" * 10000)';

      const result = await service.executeCode(
        largeCode,
        mockTestCases,
        'python'
      );

      expect(result.output).toContain('Mock WASM output');
      expect(result.executionTime).toBeDefined();
    });

    it('should handle code with special characters', async () => {
      const specialCode = `
print("Hello 世界! 🌍")
print("Special chars: !@#$%^&*()")
print("Emojis: 😀🎉🚀")
`;

      const result = await service.executeCode(
        specialCode,
        mockTestCases,
        'python'
      );

      expect(result.output).toContain('Mock WASM output');
      expect(result.executionTime).toBeDefined();
    });
  });

  describe('Error Handling - Comprehensive', () => {
    it('should throw error for unsupported language', async () => {
      await expect(
        service.executeCode('code', mockTestCases, 'unsupported')
      ).rejects.toThrow('Unsupported language: unsupported');
    });

    it('should throw error when language is not available', async () => {
      // Mock WASM backend to return false for availability
      const { WasmBackend } = jest.requireMock('../backends/WasmBackend');
      WasmBackend.mockImplementation(function (
        this: Record<string, unknown>,
        language: string,
        wasmManager: unknown
      ) {
        this.language = language;
        this.wasmManager = wasmManager;

        this.isAvailable = jest.fn().mockReturnValue(false);
        this.isAvailableAsync = jest.fn().mockResolvedValue(false);
        this.requiresAuth = jest.fn().mockReturnValue(false);
        this.execute = jest.fn().mockResolvedValue({
          output: 'Mock WASM output',
          testResults: [],
        });
      });

      // Mock Judge0 backend to also be unavailable
      const { Judge0Backend } = jest.requireMock('../backends/Judge0Backend');
      Judge0Backend.mockImplementation(function (
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

        this.isAvailable = jest.fn().mockReturnValue(false);
        this.requiresAuth = jest.fn().mockReturnValue(true);
        this.execute = jest.fn().mockResolvedValue({
          output: 'Judge0 execution result',
          testResults: [],
        });
      });

      // Recreate service with unavailable backends
      const unavailableService = new CodeExecutionService(mockUser);

      await expect(
        unavailableService.executeCode('print("test")', mockTestCases, 'python')
      ).rejects.toThrow('Language python is not available');
    });

    it('should handle WASM execution failures gracefully', async () => {
      mockWasmManager.runCode.mockRejectedValue(
        new Error('WASM execution failed')
      );

      // Should fallback to Judge0 backend
      const result = await service.executeCode(
        'print("test")',
        mockTestCases,
        'python'
      );

      expect(result).toBeDefined();
      // The CompositeExecutionStrategy should handle the fallback
    });

    it('should handle all backends failing', async () => {
      // Mock WASM backend to fail
      const { WasmBackend } = jest.requireMock('../backends/WasmBackend');
      WasmBackend.mockImplementation(function (
        this: Record<string, unknown>,
        language: string,
        wasmManager: unknown
      ) {
        this.language = language;
        this.wasmManager = wasmManager;

        this.isAvailable = jest.fn().mockReturnValue(true);
        this.isAvailableAsync = jest.fn().mockResolvedValue(true);
        this.requiresAuth = jest.fn().mockReturnValue(false);
        this.execute = jest.fn().mockRejectedValue(new Error('WASM failed'));
      });

      // Mock Judge0 backend to also fail
      const { Judge0Backend } = jest.requireMock('../backends/Judge0Backend');
      Judge0Backend.mockImplementation(function (
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
        this.execute = jest.fn().mockRejectedValue(new Error('Judge0 failed'));
      });

      // Recreate service with failing backends
      const failingService = new CodeExecutionService(mockUser);

      await expect(
        failingService.executeCode('print("test")', mockTestCases, 'python')
      ).rejects.toThrow();
    });

    it('should handle network errors during execution', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      // Should handle gracefully - WASM should still work
      const result = await service.executeCode(
        'print("test")',
        mockTestCases,
        'python'
      );

      expect(result).toBeDefined();
      expect(result.output).toContain('Mock WASM output');
    });

    it('should handle timeout errors', async () => {
      mockWasmManager.runCode.mockRejectedValue(new Error('Execution timeout'));

      // Should fallback to Judge0
      const result = await service.executeCode(
        'print("test")',
        mockTestCases,
        'python'
      );

      expect(result).toBeDefined();
    });

    it('should handle memory errors', async () => {
      mockWasmManager.runCode.mockRejectedValue(
        new Error('Memory allocation failed')
      );

      // Should fallback to Judge0
      const result = await service.executeCode(
        'print("test")',
        mockTestCases,
        'python'
      );

      expect(result).toBeDefined();
    });
  });

  describe('Authentication and Authorization', () => {
    it('should require auth for Go language', () => {
      expect(service.requiresAuth('go')).toBe(true);
    });

    it('should not require auth for Python (WASM available)', () => {
      expect(service.requiresAuth('python')).toBe(false);
    });

    it('should require auth for compiled languages', () => {
      ['c', 'cpp', 'java', 'rust'].forEach((lang) => {
        expect(service.requiresAuth(lang)).toBe(true);
      });
    });

    it('should handle unauthenticated user for auth-required languages', () => {
      const serviceWithoutUser = new CodeExecutionService(null);

      expect(serviceWithoutUser.requiresAuth('go')).toBe(true);
      expect(serviceWithoutUser.isLanguageAvailable('go')).toBe(false);
    });

    it('should work with authenticated user for auth-required languages', () => {
      expect(service.requiresAuth('go')).toBe(true);
      expect(service.isLanguageAvailable('go')).toBe(true);
    });
  });

  describe('Language Availability and Status', () => {
    it('should return correct availability for all languages', () => {
      expect(service.isLanguageAvailable('python')).toBe(true);
      expect(service.isLanguageAvailable('javascript')).toBe(true);
      expect(service.isLanguageAvailable('go')).toBe(true);
      expect(service.isLanguageAvailable('c')).toBe(true);
      expect(service.isLanguageAvailable('cpp')).toBe(true);
      expect(service.isLanguageAvailable('java')).toBe(true);
      expect(service.isLanguageAvailable('rust')).toBe(true);
      expect(service.isLanguageAvailable('ruby')).toBe(true);
      expect(service.isLanguageAvailable('typescript')).toBe(true);
    });

    it('should return detailed language status', () => {
      const status = service.getLanguageStatus();

      expect(status.python).toBeDefined();
      expect(status.python.available).toBe(true);
      expect(status.python.requiresAuth).toBe(false);
      expect(status.python.backends).toBeDefined();

      expect(status.go).toBeDefined();
      expect(status.go.available).toBe(true);
      expect(status.go.requiresAuth).toBe(true);
      expect(status.go.backends).toBeDefined();
    });

    it('should handle languages without WASM support', () => {
      const status = service.getLanguageStatus();

      ['c', 'cpp', 'java', 'rust'].forEach((lang) => {
        expect(status[lang]).toBeDefined();
        expect(status[lang].available).toBe(true);
        expect(status[lang].requiresAuth).toBe(true);
        expect(status[lang].backends).toBeDefined();
      });
    });
  });

  describe('Submission and Snapshot Creation', () => {
    it('should create submission with all test cases', async () => {
      const result = await service.executeAndSubmit(
        'print("test")',
        mockTestCases,
        'python',
        'test-question-id'
      );

      expect(result.result).toBeDefined();
      expect(result.submission).toBeDefined();
      expect(result.submission.questionId).toBe('test-question-id');
      expect(result.submission.language).toBe('python');
      expect(result.submission.code).toBe('print("test")');
      expect(result.submission.testResults).toHaveLength(3);
    });

    it('should handle submission failures gracefully', async () => {
      // Mock WASM backend to fail
      const { WasmBackend } = jest.requireMock('../backends/WasmBackend');
      WasmBackend.mockImplementation(function (
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
          testResults: mockTestCases.map((testCase) => ({
            testCase: testCase.description,
            expected: 'Expected output',
            actual: 'Error: Execution failed',
            passed: false,
            input: 'Test input',
          })),
        });
      });

      // Mock Judge0 backend to also fail
      const { Judge0Backend } = jest.requireMock('../backends/Judge0Backend');
      Judge0Backend.mockImplementation(function (
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
          testResults: mockTestCases.map((testCase) => ({
            testCase: testCase.description,
            expected: 'Expected output',
            actual: 'Error: Execution failed',
            passed: false,
            input: 'Test input',
          })),
        });
      });

      // Recreate service with failing backends
      const failingService = new CodeExecutionService(mockUser);

      // Should still create a submission with error results
      const result = await failingService.executeAndSubmit(
        'print("test")',
        mockTestCases,
        'python',
        'test-question-id'
      );

      expect(result.submission).toBeDefined();
      expect(result.submission.success).toBe(false);
      expect(result.submission.message).toBe('FAILED');
    });

    it('should create snapshot with execution metadata', async () => {
      const result = await service.executeAndSubmit(
        'print("test")',
        mockTestCases,
        'python',
        'test-question-id'
      );

      expect(result.submission).toBeDefined();
      expect(result.submission.executionTime).toBeDefined();
      expect(result.submission.timestamp).toBeDefined();
      expect(result.submission.id).toBeDefined();
    });

    it('should handle empty test cases in submission', async () => {
      const result = await service.executeAndSubmit(
        'print("test")',
        [],
        'python',
        'test-question-id'
      );

      expect(result.submission).toBeDefined();
      expect(result.submission.testResults).toHaveLength(0);
      expect(result.submission.totalCount).toBe(0);
    });
  });

  describe('Performance and Resource Management', () => {
    it('should track execution time accurately', async () => {
      const startTime = Date.now();
      const result = await service.executeCode(
        'print("test")',
        mockTestCases,
        'python'
      );
      const endTime = Date.now();

      expect(result.executionTime).toBeDefined();
      expect(result.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.executionTime).toBeLessThanOrEqual(
        endTime - startTime + 100
      ); // Allow some tolerance
    });

    it('should handle rapid successive executions', async () => {
      const promises = Array.from({ length: 5 }, () =>
        service.executeCode('print("test")', mockTestCases, 'python')
      );

      const results = await Promise.all(promises);

      results.forEach((result) => {
        expect(result).toBeDefined();
        expect(result.output).toContain('Mock WASM output');
      });
    });

    it('should handle memory cleanup between executions', async () => {
      // First execution
      await service.executeCode('print("test1")', mockTestCases, 'python');

      // Second execution
      const result = await service.executeCode(
        'print("test2")',
        mockTestCases,
        'python'
      );

      expect(result).toBeDefined();
      expect(result.output).toContain('Mock WASM output');
    });
  });

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle very long code execution', async () => {
      const longCode = 'print("x" * 100000)';

      const result = await service.executeCode(
        longCode,
        mockTestCases,
        'python'
      );

      expect(result).toBeDefined();
      expect(result.output).toContain('Mock WASM output');
    });

    it('should handle code with special characters and unicode', async () => {
      const unicodeCode = `
print("Hello 世界! 🌍")
print("Special chars: !@#$%^&*()")
print("Emojis: 😀🎉🚀")
`;

      const result = await service.executeCode(
        unicodeCode,
        mockTestCases,
        'python'
      );

      expect(result).toBeDefined();
      expect(result.output).toContain('Mock WASM output');
    });

    it('should handle malformed test cases gracefully', async () => {
      const malformedTestCases: TestCase[] = [
        {
          description: 'Test case 1',
          inputFile: '/testcases/input1.txt',
          expectedFile: '/testcases/expected1.txt',
        },
        // Missing required fields
        {} as TestCase,
        {
          description: 'Test case 3',
          // Missing inputFile and expectedFile
        } as TestCase,
      ];

      // Should handle gracefully without crashing
      const result = await service.executeCode(
        'print("test")',
        malformedTestCases,
        'python'
      );

      expect(result).toBeDefined();
      expect(result.output).toContain('Mock WASM output');
    });

    it('should handle concurrent executions', async () => {
      const promises = Array.from({ length: 3 }, (_, i) =>
        service.executeCode(`print("test${i}")`, mockTestCases, 'python')
      );

      const results = await Promise.all(promises);

      results.forEach((result) => {
        expect(result).toBeDefined();
        expect(result.output).toContain('Mock WASM output');
      });
    });
  });

  describe('Integration and End-to-End Scenarios', () => {
    it('should handle complete execution flow with multiple languages', async () => {
      const languages = ['python', 'javascript', 'go'];

      for (const language of languages) {
        const result = await service.executeCode(
          'print("Hello")',
          mockTestCases,
          language
        );

        expect(result).toBeDefined();
        expect(result.executionTime).toBeDefined();
        expect(result.testResults).toBeDefined();
      }
    });

    it('should handle language switching scenarios', async () => {
      // Execute Python
      const pythonResult = await service.executeCode(
        'print("Hello")',
        mockTestCases,
        'python'
      );

      // Execute Go
      const goResult = await service.executeCode(
        'package main\nfunc main() {}',
        mockTestCases,
        'go'
      );

      expect(pythonResult).toBeDefined();
      expect(goResult).toBeDefined();
      expect(pythonResult.output).toContain('Mock WASM output');
    });

    it('should handle mixed success/failure scenarios', async () => {
      // First execution should succeed
      const successResult = await service.executeCode(
        'print("success")',
        mockTestCases,
        'python'
      );

      expect(successResult).toBeDefined();
      expect(successResult.output).toContain('Mock WASM output');

      // Mock failure for second execution
      mockWasmManager.runCode.mockRejectedValueOnce(
        new Error('Temporary failure')
      );

      // Second execution should handle failure gracefully
      const failureResult = await service.executeCode(
        'print("failure")',
        mockTestCases,
        'python'
      );

      expect(failureResult).toBeDefined();
    });

    it('should handle authentication state changes', async () => {
      // Service with user
      const serviceWithUser = new CodeExecutionService(mockUser);
      expect(serviceWithUser.isLanguageAvailable('go')).toBe(true);

      // Service without user
      const serviceWithoutUser = new CodeExecutionService(null);
      expect(serviceWithoutUser.isLanguageAvailable('go')).toBe(false);
    });
  });
});
