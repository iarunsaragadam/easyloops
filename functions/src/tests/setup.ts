// Test setup file for Jest
import '@testing-library/jest-dom';

// Mock console methods to reduce noise in tests
const originalConsole = { ...console };

beforeAll(() => {
  // Suppress console.log, console.warn, console.error in tests unless explicitly needed
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  // Restore original console methods
  console.log = originalConsole.log;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
});

// Global test utilities
declare global {
  var testUtils: {
    createMock: <T>(partial?: Partial<T>) => T;
    wait: (ms: number) => Promise<void>;
    createTestRequest: (
      overrides?: Record<string, unknown>
    ) => Record<string, unknown>;
  };
}

globalThis.testUtils = {
  // Helper to create mock objects
  createMock: <T>(partial: Partial<T> = {}): T => {
    return {
      ...partial,
    } as T;
  },

  // Helper to wait for async operations
  wait: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Helper to create test data
  createTestRequest: (overrides: Record<string, unknown> = {}) => ({
    code: 'console.log("Hello, World!");',
    language: 'javascript',
    questionId: 'test-question-123',
    input: 'test input',
    ...overrides,
  }),
};
