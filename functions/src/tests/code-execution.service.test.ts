import { CodeExecutionService } from '../services/code-execution.service';
import { CodeExecutionRequest, ILogger } from '../interfaces';
import { Judge0Submission, Judge0SubmissionResponse } from '../types';
import { Judge0Client } from '../judge0-client';
import { LanguageProvider } from '../providers/language-provider';

// Mock interfaces for testing
interface MockJudge0Client {
  executeCode(submission: Judge0Submission): Promise<Judge0SubmissionResponse>;
}

interface MockLanguageProvider {
  getLanguageConfig(languageIdentifier: string): unknown;
}

interface MockLogger extends ILogger {
  info: jest.MockedFunction<ILogger['info']>;
  warn: jest.MockedFunction<ILogger['warn']>;
  error: jest.MockedFunction<ILogger['error']>;
  debug: jest.MockedFunction<ILogger['debug']>;
}

describe('CodeExecutionService', () => {
  let service: CodeExecutionService;
  let mockJudge0Client: jest.Mocked<MockJudge0Client>;
  let mockLanguageProvider: jest.Mocked<MockLanguageProvider>;
  let mockLogger: jest.Mocked<MockLogger>;

  beforeEach(() => {
    // Create mocks
    mockJudge0Client = {
      executeCode: jest.fn(),
    } as jest.Mocked<MockJudge0Client>;

    mockLanguageProvider = {
      getLanguageConfig: jest.fn(),
    } as jest.Mocked<MockLanguageProvider>;

    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    } as jest.Mocked<MockLogger>;

    // Create service instance with mocked dependencies
    service = new CodeExecutionService(
      mockJudge0Client as unknown as Judge0Client,
      mockLanguageProvider as unknown as LanguageProvider,
      mockLogger
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('executeCode', () => {
    const validRequest: CodeExecutionRequest = {
      code: 'console.log("Hello, World!");',
      language: 'javascript',
      questionId: 'test-question',
      input: 'test input',
      userId: 'test-user-123',
    };

    const mockLanguageConfig = {
      id: 63,
      name: 'JavaScript (Node.js 12.14.0)',
      identifier: 'javascript',
      cpuTimeLimit: 5,
      memoryLimit: 512000,
      enableNetwork: false,
    };

    const mockJudge0Response: Judge0SubmissionResponse = {
      stdout: 'Hello, World!',
      stderr: null,
      compile_output: null,
      message: null,
      time: '0.1',
      memory: 1024,
      status: {
        id: 3,
        description: 'Accepted',
      },
    };

    it('should execute code successfully', async () => {
      // Arrange
      mockLanguageProvider.getLanguageConfig.mockReturnValue(
        mockLanguageConfig
      );
      mockJudge0Client.executeCode.mockResolvedValue(mockJudge0Response);

      // Act
      const result = await service.executeCode(validRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.output).toBe('Hello, World!');
      expect(result.error).toBeNull();
      expect(result.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.memory).toBe(1024);
      expect(result.status).toBe('Accepted');
      expect(result.language).toBe('javascript');

      // Verify Judge0 client was called with correct parameters
      expect(mockJudge0Client.executeCode).toHaveBeenCalledWith({
        source_code: 'console.log("Hello, World!");',
        language_id: 63,
        stdin: 'test input',
        cpu_time_limit: 5,
        memory_limit: 512000,
        enable_network: false,
      });

      // Verify logging
      expect(mockLogger.info).toHaveBeenCalledWith('Starting code execution', {
        language: 'javascript',
        questionId: 'test-question',
        codeLength: 29,
        userId: 'test-user-123',
      });

      expect(mockLogger.info).toHaveBeenCalledWith('Code execution completed', {
        language: 'javascript',
        executionTime: expect.any(Number),
        status: 'Accepted',
        hasOutput: true,
        hasError: false,
        userId: 'test-user-123',
      });
    });

    it('should handle unsupported language', async () => {
      // Arrange
      mockLanguageProvider.getLanguageConfig.mockReturnValue(null);

      // Act
      const result = await service.executeCode(validRequest);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unsupported language: javascript');
      expect(result.language).toBe('javascript');

      // Verify Judge0 client was not called
      expect(mockJudge0Client.executeCode).not.toHaveBeenCalled();

      // Verify error logging
      expect(mockLogger.error).toHaveBeenCalledWith('Code execution failed', {
        language: 'javascript',
        executionTime: expect.any(Number),
        error: 'Unsupported language: javascript',
        userId: 'test-user-123',
      });
    });

    it('should handle Judge0 execution errors', async () => {
      // Arrange
      mockLanguageProvider.getLanguageConfig.mockReturnValue(
        mockLanguageConfig
      );
      mockJudge0Client.executeCode.mockRejectedValue(
        new Error('Judge0 service unavailable')
      );

      // Act
      const result = await service.executeCode(validRequest);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Judge0 service unavailable');
      expect(result.language).toBe('javascript');

      // Verify error logging
      expect(mockLogger.error).toHaveBeenCalledWith('Code execution failed', {
        language: 'javascript',
        executionTime: expect.any(Number),
        error: 'Judge0 service unavailable',
        userId: 'test-user-123',
      });
    });

    it('should handle compilation errors', async () => {
      // Arrange
      const compilationErrorResponse: Judge0SubmissionResponse = {
        stdout: null,
        stderr: 'SyntaxError: Unexpected token',
        compile_output: 'Compilation failed',
        message: null,
        time: '0.05',
        memory: 512,
        status: {
          id: 4,
          description: 'Compilation Error',
        },
      };

      mockLanguageProvider.getLanguageConfig.mockReturnValue(
        mockLanguageConfig
      );
      mockJudge0Client.executeCode.mockResolvedValue(compilationErrorResponse);

      // Act
      const result = await service.executeCode(validRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.output).toBe('');
      expect(result.error).toBe('SyntaxError: Unexpected token');
      expect(result.status).toBe('Compilation Error');
    });

    it('should handle runtime errors', async () => {
      // Arrange
      const runtimeErrorResponse: Judge0SubmissionResponse = {
        stdout: null,
        stderr: 'ReferenceError: undefinedVariable is not defined',
        compile_output: null,
        message: null,
        time: '0.1',
        memory: 1024,
        status: {
          id: 5,
          description: 'Runtime Error',
        },
      };

      mockLanguageProvider.getLanguageConfig.mockReturnValue(
        mockLanguageConfig
      );
      mockJudge0Client.executeCode.mockResolvedValue(runtimeErrorResponse);

      // Act
      const result = await service.executeCode(validRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.output).toBe('');
      expect(result.error).toBe(
        'ReferenceError: undefinedVariable is not defined'
      );
      expect(result.status).toBe('Runtime Error');
    });

    it('should handle empty input', async () => {
      // Arrange
      const requestWithoutInput: CodeExecutionRequest = {
        ...validRequest,
        input: undefined,
      };

      mockLanguageProvider.getLanguageConfig.mockReturnValue(
        mockLanguageConfig
      );
      mockJudge0Client.executeCode.mockResolvedValue(mockJudge0Response);

      // Act
      const result = await service.executeCode(requestWithoutInput);

      // Assert
      expect(result.success).toBe(true);

      // Verify Judge0 client was called with empty string for stdin
      expect(mockJudge0Client.executeCode).toHaveBeenCalledWith({
        source_code: 'console.log("Hello, World!");',
        language_id: 63,
        stdin: '',
        cpu_time_limit: 5,
        memory_limit: 512000,
        enable_network: false,
      });
    });

    it('should handle different programming languages', async () => {
      // Arrange
      const pythonRequest: CodeExecutionRequest = {
        code: 'print("Hello, Python!")',
        language: 'python',
        questionId: 'test-question',
        userId: 'test-user-123',
      };

      const pythonConfig = {
        id: 71,
        name: 'Python (3.8.1)',
        identifier: 'python',
        cpuTimeLimit: 5,
        memoryLimit: 512000,
        enableNetwork: false,
      };

      const pythonResponse: Judge0SubmissionResponse = {
        stdout: 'Hello, Python!',
        stderr: null,
        compile_output: null,
        message: null,
        time: '0.05',
        memory: 2048,
        status: {
          id: 3,
          description: 'Accepted',
        },
      };

      mockLanguageProvider.getLanguageConfig.mockReturnValue(pythonConfig);
      mockJudge0Client.executeCode.mockResolvedValue(pythonResponse);

      // Act
      const result = await service.executeCode(pythonRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.output).toBe('Hello, Python!');
      expect(result.language).toBe('python');

      // Verify Judge0 client was called with Python configuration
      expect(mockJudge0Client.executeCode).toHaveBeenCalledWith({
        source_code: 'print("Hello, Python!")',
        language_id: 71,
        stdin: '',
        cpu_time_limit: 5,
        memory_limit: 512000,
        enable_network: false,
      });
    });
  });

  describe('error handling', () => {
    it('should handle unknown errors gracefully', async () => {
      // Arrange
      const request: CodeExecutionRequest = {
        code: 'console.log("test");',
        language: 'javascript',
        questionId: 'test',
        userId: 'test-user',
      };

      mockLanguageProvider.getLanguageConfig.mockReturnValue({
        id: 63,
        name: 'JavaScript',
        identifier: 'javascript',
        cpuTimeLimit: 5,
        memoryLimit: 512000,
        enableNetwork: false,
      });

      mockJudge0Client.executeCode.mockRejectedValue('Unknown error');

      // Act
      const result = await service.executeCode(request);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unknown error');
    });

    it('should measure execution time correctly', async () => {
      // Arrange
      const request: CodeExecutionRequest = {
        code: 'console.log("test");',
        language: 'javascript',
        questionId: 'test',
        userId: 'test-user',
      };

      mockLanguageProvider.getLanguageConfig.mockReturnValue({
        id: 63,
        name: 'JavaScript',
        identifier: 'javascript',
        cpuTimeLimit: 5,
        memoryLimit: 512000,
        enableNetwork: false,
      });

      // Simulate delay in Judge0 response
      mockJudge0Client.executeCode.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  stdout: 'test',
                  stderr: null,
                  compile_output: null,
                  message: null,
                  time: '0.1',
                  memory: 1024,
                  status: { id: 3, description: 'Accepted' },
                }),
              100
            )
          )
      );

      // Act
      const startTime = Date.now();
      const result = await service.executeCode(request);
      const endTime = Date.now();

      // Assert
      expect(result.success).toBe(true);
      expect(result.executionTime).toBeGreaterThanOrEqual(100);
      expect(result.executionTime).toBeLessThanOrEqual(
        endTime - startTime + 50
      ); // Allow some tolerance
    });
  });
});
