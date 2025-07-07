import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeExecutionService } from '../services/CodeExecutionService';
import { LocalSubmissionService } from '../services/SubmissionService';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { PyodideManager, TestCase, CodeExecutionResult } from '@/shared/types';

// Mock the services
jest.mock('../services/CodeExecutionService');
jest.mock('../services/SubmissionService');
jest.mock('@/features/auth', () => ({
  useAuth: () => ({ user: { email: 'test@example.com' } }),
}));

const MockedCodeExecutionService = CodeExecutionService as jest.MockedClass<
  typeof CodeExecutionService
>;
const MockedLocalSubmissionService = LocalSubmissionService as jest.MockedClass<
  typeof LocalSubmissionService
>;

// Test component that uses the submission flow
const TestSubmissionComponent: React.FC = () => {
  const mockPyodideManager: PyodideManager = {
    pyodide: null,
    isLoaded: true,
    loadingError: null,
    runCode: jest.fn(),
  };

  const { executeCode, executeAndSubmit } =
    useCodeExecution(mockPyodideManager);
  const [output, setOutput] = React.useState('');
  const [isRunning, setIsRunning] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const testCases: TestCase[] = [
    {
      description: 'Test case 1',
      inputFile: '/input1.txt',
      expectedFile: '/expected1.txt',
    },
    {
      description: 'Test case 2',
      inputFile: '/input2.txt',
      expectedFile: '/expected2.txt',
    },
    {
      description: 'Test case 3',
      inputFile: '/input3.txt',
      expectedFile: '/expected3.txt',
    },
  ];

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      const result = await executeCode('print("hello")', testCases, 'python', {
        type: 'RUN',
        testCaseLimit: 2,
        createSnapshot: false,
      });
      setOutput(result.output || 'No output');
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOutput('');

    try {
      const { submission } = await executeAndSubmit(
        'print("hello")',
        testCases,
        'python',
        'question-1'
      );

      setOutput(
        `Submission ${submission.id} created: ${submission.passedCount}/${submission.totalCount} passed`
      );
    } catch (error) {
      setOutput(`Submission Error: ${error}`);
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
        {isSubmitting ? 'Submitting...' : 'Evaluate All'}
      </button>
      <div data-testid="output">{output}</div>
    </div>
  );
};

describe('Submission Flow Integration', () => {
  let mockExecuteCode: jest.Mock;
  let mockExecuteAndSubmit: jest.Mock;
  let mockCreateSubmission: jest.Mock;
  let mockSaveSubmission: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock CodeExecutionService
    mockExecuteCode = jest.fn();
    mockExecuteAndSubmit = jest.fn();
    MockedCodeExecutionService.prototype.executeCode = mockExecuteCode;
    MockedCodeExecutionService.prototype.executeAndSubmit =
      mockExecuteAndSubmit;

    // Mock LocalSubmissionService
    mockCreateSubmission = jest.fn();
    mockSaveSubmission = jest.fn();
    MockedLocalSubmissionService.prototype.createSubmission =
      mockCreateSubmission;
    MockedLocalSubmissionService.prototype.saveSubmission = mockSaveSubmission;
  });

  describe('Run Flow', () => {
    it('should execute code with RUN mode and show results', async () => {
      const user = userEvent.setup();
      const mockResult: CodeExecutionResult = {
        output:
          'Sample Test Results (2/2 passed):\n✅ Test case 1\n✅ Test case 2',
        testResults: [
          {
            testCase: 'Test case 1',
            expected: 'hello',
            actual: 'hello',
            passed: true,
            input: '',
          },
          {
            testCase: 'Test case 2',
            expected: 'hello',
            actual: 'hello',
            passed: true,
            input: '',
          },
        ],
      };

      mockExecuteCode.mockResolvedValue(mockResult);

      render(<TestSubmissionComponent />);

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

      expect(screen.getByTestId('output')).toHaveTextContent(
        'Sample Test Results (2/2 passed)'
      );
    });

    it('should handle run errors gracefully', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockRejectedValue(new Error('Execution failed'));

      render(<TestSubmissionComponent />);

      const runButton = screen.getByTestId('run-button');
      await user.click(runButton);

      await waitFor(() => {
        expect(screen.getByTestId('output')).toHaveTextContent(
          'Error: Error: Execution failed'
        );
      });
    });

    it('should disable both buttons during execution', async () => {
      const user = userEvent.setup();

      // Make the execution take some time
      mockExecuteCode.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<TestSubmissionComponent />);

      const runButton = screen.getByTestId('run-button');
      const submitButton = screen.getByTestId('submit-button');

      await user.click(runButton);

      // Both buttons should be disabled during execution
      expect(runButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(runButton).toHaveTextContent('Running...');
    });
  });

  describe('Submit Flow', () => {
    it('should execute code with SUBMIT mode and create submission', async () => {
      const user = userEvent.setup();

      const mockResult: CodeExecutionResult = {
        output:
          'Full Evaluation Results (3/3 passed):\n✅ Test case 1\n✅ Test case 2\n✅ Test case 3',
        testResults: [
          {
            testCase: 'Test case 1',
            expected: 'hello',
            actual: 'hello',
            passed: true,
            input: '',
          },
          {
            testCase: 'Test case 2',
            expected: 'hello',
            actual: 'hello',
            passed: true,
            input: '',
          },
          {
            testCase: 'Test case 3',
            expected: 'hello',
            actual: 'hello',
            passed: true,
            input: '',
          },
        ],
      };

      const mockSubmission = {
        id: 'submission-123',
        timestamp: new Date(),
        questionId: 'question-1',
        language: 'python',
        code: 'print("hello")',
        testResults: mockResult.testResults,
        passedCount: 3,
        failedCount: 0,
        totalCount: 3,
        executionTime: 300,
        overallStatus: 'PASSED' as const,
      };

      mockExecuteAndSubmit.mockResolvedValue({
        result: mockResult,
        submission: mockSubmission,
      });

      render(<TestSubmissionComponent />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockExecuteAndSubmit).toHaveBeenCalledWith(
          'print("hello")',
          expect.any(Array),
          'python',
          'question-1'
        );
      });

      expect(screen.getByTestId('output')).toHaveTextContent(
        'Submission submission-123 created: 3/3 passed'
      );
    });

    it('should handle partial submissions correctly', async () => {
      const user = userEvent.setup();

      const mockResult: CodeExecutionResult = {
        output:
          'Full Evaluation Results (1/3 passed):\n✅ Test case 1\n❌ Test case 2\n❌ Test case 3',
        testResults: [
          {
            testCase: 'Test case 1',
            expected: 'hello',
            actual: 'hello',
            passed: true,
            input: '',
          },
          {
            testCase: 'Test case 2',
            expected: 'hello',
            actual: 'hi',
            passed: false,
            input: '',
          },
          {
            testCase: 'Test case 3',
            expected: 'hello',
            actual: 'hey',
            passed: false,
            input: '',
          },
        ],
      };

      const mockSubmission = {
        id: 'submission-456',
        timestamp: new Date(),
        questionId: 'question-1',
        language: 'python',
        code: 'print("hello")',
        testResults: mockResult.testResults,
        passedCount: 1,
        failedCount: 2,
        totalCount: 3,
        executionTime: 250,
        overallStatus: 'PARTIAL' as const,
      };

      mockExecuteAndSubmit.mockResolvedValue({
        result: mockResult,
        submission: mockSubmission,
      });

      render(<TestSubmissionComponent />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('output')).toHaveTextContent(
          'Submission submission-456 created: 1/3 passed'
        );
      });
    });

    it('should handle submission errors gracefully', async () => {
      const user = userEvent.setup();

      mockExecuteAndSubmit.mockRejectedValue(new Error('Submission failed'));

      render(<TestSubmissionComponent />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('output')).toHaveTextContent(
          'Submission Error: Error: Submission failed'
        );
      });
    });

    it('should show loading state during submission', async () => {
      const user = userEvent.setup();

      // Make the submission take some time
      mockExecuteAndSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<TestSubmissionComponent />);

      const runButton = screen.getByTestId('run-button');
      const submitButton = screen.getByTestId('submit-button');

      await user.click(submitButton);

      // Both buttons should be disabled during submission
      expect(runButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Submitting...');
    });
  });

  describe('Button States', () => {
    it('should prevent multiple simultaneous executions', async () => {
      const user = userEvent.setup();

      // Mock both to take some time
      mockExecuteCode.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
      mockExecuteAndSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<TestSubmissionComponent />);

      const runButton = screen.getByTestId('run-button');
      const submitButton = screen.getByTestId('submit-button');

      // Start a run
      await user.click(runButton);

      // Try to click submit while run is in progress
      await user.click(submitButton);

      // Only executeCode should be called, not executeAndSubmit
      await waitFor(() => {
        expect(mockExecuteCode).toHaveBeenCalledTimes(1);
        expect(mockExecuteAndSubmit).not.toHaveBeenCalled();
      });
    });

    it('should re-enable buttons after execution completes', async () => {
      const user = userEvent.setup();

      mockExecuteCode.mockResolvedValue({
        output: 'Test output',
        testResults: [],
        executionTime: 100,
      });

      render(<TestSubmissionComponent />);

      const runButton = screen.getByTestId('run-button');
      const submitButton = screen.getByTestId('submit-button');

      await user.click(runButton);

      await waitFor(() => {
        expect(runButton).not.toBeDisabled();
        expect(submitButton).not.toBeDisabled();
        expect(runButton).toHaveTextContent('Run');
      });
    });
  });
});
