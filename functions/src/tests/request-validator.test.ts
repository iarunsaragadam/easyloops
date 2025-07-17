import { RequestValidator } from '../validators/request-validator';
import { ILogger } from '../interfaces';

// Mock logger for testing
class MockLogger implements ILogger {
  info = jest.fn();
  warn = jest.fn();
  error = jest.fn();
  debug = jest.fn();
}

describe('RequestValidator', () => {
  let validator: RequestValidator;
  let mockLogger: MockLogger;

  beforeEach(() => {
    mockLogger = new MockLogger();
    validator = new RequestValidator(mockLogger, 10000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateRequest', () => {
    it('should validate a valid request', () => {
      // Arrange
      const validRequest = {
        code: 'console.log("Hello, World!");',
        language: 'javascript',
        questionId: 'test-question-123',
        input: 'test input',
      };

      // Act
      const result = validator.validateRequest(validRequest);

      // Assert
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(mockLogger.warn).not.toHaveBeenCalled();
    });

    it('should reject request without code', () => {
      // Arrange
      const invalidRequest = {
        language: 'javascript',
        questionId: 'test-question-123',
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Code is required and must be a string');
      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Request validation failed',
        expect.any(Object)
      );
    });

    it('should reject request with non-string code', () => {
      // Arrange
      const invalidRequest = {
        code: 123,
        language: 'javascript',
        questionId: 'test-question-123',
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Code is required and must be a string');
    });

    it('should reject request with code too long', () => {
      // Arrange
      const longCode = 'a'.repeat(10001);
      const invalidRequest = {
        code: longCode,
        language: 'javascript',
        questionId: 'test-question-123',
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Code must be less than 10000 characters'
      );
    });

    it('should reject request without language', () => {
      // Arrange
      const invalidRequest = {
        code: 'console.log("Hello");',
        questionId: 'test-question-123',
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Language is required and must be a string'
      );
    });

    it('should reject request with non-string language', () => {
      // Arrange
      const invalidRequest = {
        code: 'console.log("Hello");',
        language: 123,
        questionId: 'test-question-123',
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Language is required and must be a string'
      );
    });

    it('should reject request without questionId', () => {
      // Arrange
      const invalidRequest = {
        code: 'console.log("Hello");',
        language: 'javascript',
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Question ID is required and must be a string'
      );
    });

    it('should reject request with non-string questionId', () => {
      // Arrange
      const invalidRequest = {
        code: 'console.log("Hello");',
        language: 'javascript',
        questionId: 123,
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Question ID is required and must be a string'
      );
    });

    it('should reject request with non-string input', () => {
      // Arrange
      const invalidRequest = {
        code: 'console.log("Hello");',
        language: 'javascript',
        questionId: 'test-question-123',
        input: 123,
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Input must be a string if provided');
    });

    it('should accept request with undefined input', () => {
      // Arrange
      const validRequest = {
        code: 'console.log("Hello");',
        language: 'javascript',
        questionId: 'test-question-123',
        input: undefined,
      };

      // Act
      const result = validator.validateRequest(validRequest);

      // Assert
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject non-object request', () => {
      // Arrange
      const invalidRequest = 'not an object';

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Request must be a valid object');
    });

    it('should reject null request', () => {
      // Arrange
      const invalidRequest = null;

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Request must be a valid object');
    });

    it('should collect multiple validation errors', () => {
      // Arrange
      const invalidRequest = {
        code: 123,
        language: 456,
        questionId: 789,
      };

      // Act
      const result = validator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
      expect(result.errors).toContain('Code is required and must be a string');
      expect(result.errors).toContain(
        'Language is required and must be a string'
      );
      expect(result.errors).toContain(
        'Question ID is required and must be a string'
      );
    });

    it('should use custom max code length', () => {
      // Arrange
      const customValidator = new RequestValidator(mockLogger, 100);
      const longCode = 'a'.repeat(101);
      const invalidRequest = {
        code: longCode,
        language: 'javascript',
        questionId: 'test-question-123',
      };

      // Act
      const result = customValidator.validateRequest(invalidRequest);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Code must be less than 100 characters');
    });
  });
});
