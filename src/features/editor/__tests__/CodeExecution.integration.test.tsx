import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { TestCase, CodeExecutionResult } from '@/shared/types';

// Mock dependencies
jest.mock('../services/execution/CodeExecutionService');

// Mock useCodeExecution hook
jest.mock('../hooks/useCodeExecution', () => ({
  useCodeExecution: jest.fn(),
}));

// Mock useAuth hook
jest.mock('@/features/auth', () => ({
  useAuth: jest.fn(),
}));

// Test component that uses code execution
const TestCodeExecutionComponent: React.FC = () => {
  const { executeCode, executeAndSubmit, isLanguageAvailable, requiresAuth } = useCodeExecution();
  const [output, setOutput] = React.useState('');
  const [isRunning, setIsRunning] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const testCases: TestCase[] = [
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

  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');

    try {
      const result = await executeCode(
        'print("hello")',
        testCases,
        'python',
        { type: 'RUN', testCaseLimit: 2, createSnapshot: false }
      );
      setOutput(result.output || 'No output');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setOutput('');

    try {
      const { result } = await executeAndSubmit('print("hello")', testCases, 'python', 'test-question');
      setOutput(result.output || 'No output');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleRun} 
        disabled={isRunning || isSubmitting}
        data-testid="run-button"
      >
        {isRunning ? 'Running...' : 'Run'}
      </button>
      <button 
        onClick={handleSubmit} 
        disabled={isRunning || isSubmitting}
        data-testid="submit-button"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      <div data-testid="output">{output}</div>
      <div data-testid="error">{error}</div>
      <div data-testid="python-available">{isLanguageAvailable('python').toString()}</div>
      <div data-testid="python-auth">{requiresAuth('python').toString()}</div>
    </div>
  );
};

describe('Code Execution Integration Tests', () => {
  let mockExecuteCode: jest.Mock;
  let mockExecuteAndSubmit: jest.Mock;
  let mockIsLanguageAvailable: jest.Mock;
  let mockRequiresAuth: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the useCodeExecution hook
    mockExecuteCode = jest.fn();
    mockExecuteAndSubmit = jest.fn();
    mockIsLanguageAvailable = jest.fn().mockReturnValue(true);
    mockRequiresAuth = jest.fn().mockReturnValue(false);

    // Use the mock from jest.mock
    (useCodeExecution as jest.Mock).mockReturnValue({
      executeCode: mockExecuteCode,
      executeAndSubmit: mockExecuteAndSubmit,
      isLanguageAvailable: mockIsLanguageAvailable,
      requiresAuth: mockRequiresAuth,
    });

    // Mock useAuth
    const useAuth = jest.requireMock('@/features/auth').useAuth;
    useAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthorizedForGo: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
  });

  describe('Basic Execution Flow', () => {
    it('should execute code successfully and display output', async () => {
      const user = userEvent.setup();
      const mockResult: CodeExecutionResult = {
        output: 'Hello, World!\n✅ Test case 1\n✅ Test case 2',
        testResults: [
          {
            testCase: 'Test case 1',
            expected: 'Hello, World!',
            actual: 'Hello, World!',
            passed: true,
            input: '',
          },
          {
            testCase: 'Test case 2',
            expected: 'Hello, World!',
            actual: 'Hello, World!',
            passed: true,
            input: '',
          },
        ],
        executionTime: 150,
      };

      mockExecuteCode.mockResolvedValue(mockResult);

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(mockExecuteCode).toHaveBeenCalledWith(
          'print("hello")',
          expect.any(Array),
          'python',
          { type: 'RUN', testCaseLimit: 2, createSnapshot: false }
        );
      });

      expect(screen.getByTestId('output')).toHaveTextContent('Hello, World!');
      expect(screen.getByTestId('output')).toHaveTextContent('✅ Test case 1');
      expect(screen.getByTestId('output')).toHaveTextContent('✅ Test case 2');
    });

    it('should handle execution errors gracefully', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('Execution failed'));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Execution failed');
      });

      expect(screen.getByTestId('output')).toHaveTextContent('');
    });

    it('should handle submission flow successfully', async () => {
      const user = userEvent.setup();
      const mockResult: CodeExecutionResult = {
        output: 'Submission successful\n✅ All test cases passed',
        testResults: [
          {
            testCase: 'Test case 1',
            expected: 'Hello, World!',
            actual: 'Hello, World!',
            passed: true,
            input: '',
          },
          {
            testCase: 'Test case 2',
            expected: 'Hello, World!',
            actual: 'Hello, World!',
            passed: true,
            input: '',
          },
        ],
        executionTime: 200,
      };

      mockExecuteAndSubmit.mockResolvedValue({
        result: mockResult,
        submission: {
          id: 'sub-123',
          questionId: 'test-question',
          language: 'python',
          code: 'print("hello")',
          testResults: mockResult.testResults,
          executionTime: 200,
          timestamp: Date.now(),
        },
      });

      render(<TestCodeExecutionComponent />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockExecuteAndSubmit).toHaveBeenCalledWith(
          'print("hello")',
          expect.any(Array),
          'python',
          'test-question'
        );
      });

      expect(screen.getByTestId('output')).toHaveTextContent('Submission successful');
      expect(screen.getByTestId('output')).toHaveTextContent('✅ All test cases passed');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle network errors during execution', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('Network error: Failed to fetch'));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error: Failed to fetch');
      });
    });

    it('should handle timeout errors', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('Execution timeout'));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Execution timeout');
      });
    });

    it('should handle memory errors', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('Memory allocation failed'));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Memory allocation failed');
      });
    });

    it('should handle unsupported language errors', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('Unsupported language: unsupported'));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Unsupported language: unsupported');
      });
    });

    it('should handle language not available errors', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('Language python is not available'));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Language python is not available');
      });
    });

    it('should handle WASM loading failures', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('WASM runtime for python is not available'));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('WASM runtime for python is not available');
      });
    });

    it('should handle file fetch errors', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('Failed to fetch file: /testcases/input1.txt'));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch file: /testcases/input1.txt');
      });
    });
  });

  describe('UI State Management', () => {
    it('should disable buttons during execution', async () => {
      const user = userEvent.setup();

      // Mock a slow execution
      mockExecuteCode.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          output: 'Slow execution completed',
          testResults: [],
        }), 100))
      );

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      const submitButton = screen.getByTestId('submit-button');

      await user.click(runButton);

      // Buttons should be disabled during execution
      expect(runButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(runButton).toHaveTextContent('Running...');

      // Wait for execution to complete
      await waitFor(() => {
        expect(runButton).not.toBeDisabled();
        expect(submitButton).not.toBeDisabled();
        expect(runButton).toHaveTextContent('Run');
      });
    });

    it('should disable buttons during submission', async () => {
      const user = userEvent.setup();

      // Mock a slow submission
      mockExecuteAndSubmit.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          result: { output: 'Submission completed', testResults: [] },
          submission: { id: 'sub-123', questionId: 'test', language: 'python', code: 'test', testResults: [], executionTime: 100, timestamp: Date.now() },
        }), 100))
      );

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      const submitButton = screen.getByTestId('submit-button');

      await user.click(submitButton);

      // Buttons should be disabled during submission
      expect(runButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Submitting...');

      // Wait for submission to complete
      await waitFor(() => {
        expect(runButton).not.toBeDisabled();
        expect(submitButton).not.toBeDisabled();
        expect(submitButton).toHaveTextContent('Submit');
      });
    });

    it('should clear previous output on new execution', async () => {
      const user = userEvent.setup();

      mockExecuteCode
        .mockResolvedValueOnce({
          output: 'First execution',
          testResults: [],
        })
        .mockResolvedValueOnce({
          output: 'Second execution',
          testResults: [],
        });

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');

      // First execution
      await user.click(runButton);
      await waitFor(() => {
        expect(screen.getByTestId('output')).toHaveTextContent('First execution');
      });

      // Second execution
      await user.click(runButton);
      await waitFor(() => {
        expect(screen.getByTestId('output')).toHaveTextContent('Second execution');
      });
    });

    it('should clear previous errors on new execution', async () => {
      const user = userEvent.setup();

      mockExecuteCode
        .mockRejectedValueOnce(new Error('First error'))
        .mockResolvedValueOnce({
          output: 'Successful execution',
          testResults: [],
        });

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');

      // First execution (fails)
      await user.click(runButton);
      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('First error');
      });

      // Second execution (succeeds)
      await user.click(runButton);
      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('');
        expect(screen.getByTestId('output')).toHaveTextContent('Successful execution');
      });
    });
  });

  describe('Language Availability and Authentication', () => {
    it('should display language availability correctly', () => {
      mockIsLanguageAvailable.mockReturnValue(true);

      render(<TestCodeExecutionComponent />);

      expect(screen.getByTestId('python-available')).toHaveTextContent('true');
    });

    it('should display authentication requirements correctly', () => {
      mockRequiresAuth.mockReturnValue(false);

      render(<TestCodeExecutionComponent />);

      expect(screen.getByTestId('python-auth')).toHaveTextContent('false');
    });

    it('should handle language not available', () => {
      mockIsLanguageAvailable.mockReturnValue(false);

      render(<TestCodeExecutionComponent />);

      expect(screen.getByTestId('python-available')).toHaveTextContent('false');
    });

    it('should handle authentication required', () => {
      mockRequiresAuth.mockReturnValue(true);

      render(<TestCodeExecutionComponent />);

      expect(screen.getByTestId('python-auth')).toHaveTextContent('true');
    });
  });

  describe('Concurrent Execution Handling', () => {
    it('should prevent multiple simultaneous executions', async () => {
      const user = userEvent.setup();

      // Mock a slow execution
      let resolveExecution: (value: CodeExecutionResult) => void;
      const executionPromise = new Promise<CodeExecutionResult>(resolve => {
        resolveExecution = resolve;
      });

      mockExecuteCode.mockReturnValue(executionPromise);

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');

      // Start first execution
      await user.click(runButton);
      expect(runButton).toBeDisabled();

      // Try to start second execution (should be prevented)
      await user.click(runButton);
      expect(mockExecuteCode).toHaveBeenCalledTimes(1);

      // Complete first execution
      resolveExecution!({
        output: 'Execution completed',
        testResults: [],
      });

      await waitFor(() => {
        expect(runButton).not.toBeDisabled();
      });
    });

    it('should handle rapid button clicks gracefully', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockResolvedValue({
        output: 'Execution completed',
        testResults: [],
      });

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');

      // Rapid clicks
      await user.click(runButton);
      await user.click(runButton);
      await user.click(runButton);

      // Should execute three times (since the component allows it)
      await waitFor(() => {
        expect(mockExecuteCode).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('Large Data Handling', () => {
    it('should handle large output gracefully', async () => {
      const user = userEvent.setup();
      const largeOutput = 'x'.repeat(10000);

      mockExecuteCode.mockResolvedValue({
        output: largeOutput,
        testResults: [],
      });

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('output')).toHaveTextContent(largeOutput);
      });
    });

    it('should handle large error messages gracefully', async () => {
      const user = userEvent.setup();
      const largeError = 'Error: ' + 'x'.repeat(10000);

      mockExecuteCode.mockRejectedValue(new Error(largeError));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent(largeError);
      });
    });

    it('should handle many test cases gracefully', async () => {
      const user = userEvent.setup();
      const manyTestResults = Array.from({ length: 100 }, (_, i) => ({
        testCase: `Test case ${i + 1}`,
        expected: 'expected',
        actual: 'actual',
        passed: true,
        input: 'input',
      }));

      mockExecuteCode.mockResolvedValue({
        output: 'Many test cases executed',
        testResults: manyTestResults,
      });

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('output')).toHaveTextContent('Many test cases executed');
      });
    });
  });

  describe('Special Characters and Unicode', () => {
    it('should handle unicode characters in output', async () => {
      const user = userEvent.setup();
      const unicodeOutput = 'Hello 世界! 🌍\nSpecial chars: !@#$%^&*()\nEmojis: 😀🎉🚀';

      mockExecuteCode.mockResolvedValue({
        output: unicodeOutput,
        testResults: [],
      });

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('output')).toHaveTextContent('Hello 世界! 🌍');
        expect(screen.getByTestId('output')).toHaveTextContent('Special chars: !@#$%^&*()');
        expect(screen.getByTestId('output')).toHaveTextContent('Emojis: 😀🎉🚀');
      });
    });

    it('should handle unicode characters in error messages', async () => {
      const user = userEvent.setup();
      const unicodeError = 'Error: 世界 🌍 错误 😀';

      mockExecuteCode.mockRejectedValue(new Error(unicodeError));

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Error: 世界 🌍 错误 😀');
      });
    });
  });

  describe('Performance and Responsiveness', () => {
    it('should remain responsive during long executions', async () => {
      const user = userEvent.setup();

      // Mock a very long execution
      let resolveExecution: (value: CodeExecutionResult) => void;
      const executionPromise = new Promise<CodeExecutionResult>(resolve => {
        resolveExecution = resolve;
      });

      mockExecuteCode.mockReturnValue(executionPromise);

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');
      const submitButton = screen.getByTestId('submit-button');

      await user.click(runButton);

      // UI should remain responsive (buttons disabled but component mounted)
      expect(runButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(screen.getByTestId('run-button')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();

      // Complete execution
      resolveExecution!({
        output: 'Long execution completed',
        testResults: [],
      });

      await waitFor(() => {
        expect(runButton).not.toBeDisabled();
        expect(submitButton).not.toBeDisabled();
      });
    });

    it('should handle multiple rapid state changes', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockResolvedValue({
        output: 'Rapid execution',
        testResults: [],
      });

      render(<TestCodeExecutionComponent />);

      const runButton = screen.getByTestId('run-button');

      // Multiple rapid executions
      for (let i = 0; i < 5; i++) {
        await user.click(runButton);
        await waitFor(() => {
          expect(screen.getByTestId('output')).toHaveTextContent('Rapid execution');
        });
      }

      // Should handle all executions correctly
      expect(mockExecuteCode).toHaveBeenCalledTimes(5);
    });
  });
}); 