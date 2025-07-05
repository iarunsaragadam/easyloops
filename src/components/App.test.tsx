import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as usePyodideModule from '@/hooks/usePyodide';
import * as useResizableLayoutModule from '@/hooks/useResizableLayout';
import * as useAppStateModule from '@/hooks/useAppState';
import * as useCodeExecutionModule from '@/hooks/useCodeExecution';
import * as useAuthModule from '@/hooks/useAuth';
import { User } from 'firebase/auth';

// Mock all the hooks
jest.mock('@/hooks/usePyodide');
jest.mock('@/hooks/useResizableLayout');
jest.mock('@/hooks/useAppState');
jest.mock('@/hooks/useCodeExecution');
jest.mock('@/hooks/useAuth');

// Get mocked functions
const mockUsePyodide = jest.mocked(usePyodideModule.usePyodide);
const mockUseResizableLayout = jest.mocked(
  useResizableLayoutModule.useResizableLayout
);
const mockUseAppState = jest.mocked(useAppStateModule.useAppState);
const mockUseCodeExecution = jest.mocked(
  useCodeExecutionModule.useCodeExecution
);
const mockUseAuth = jest.mocked(useAuthModule.useAuth);

describe('App', () => {
  const mockExecuteCode = jest.fn();
  const mockHandleQuestionChange = jest.fn();
  const mockHandleLanguageChange = jest.fn();
  const mockSetPythonCode = jest.fn();
  const mockSetGoCode = jest.fn();
  const mockSetOutput = jest.fn();
  const mockSetTestResults = jest.fn();
  const mockSetIsRunning = jest.fn();

  const defaultMockState = {
    pythonCode: 'print("Hello")',
    goCode: 'package main\nfunc main() {}',
    output: '',
    testResults: [],
    isRunning: false,
    currentQuestion: {
      id: 'question1',
      name: 'Test Question',
      description: 'Test description',
      testCases: [
        {
          description: 'Test case 1',
          inputFile: '/testcases/input1.txt',
          expectedFile: '/testcases/expected1.txt',
        },
      ],
    },
    availableQuestions: ['question1', 'question2'],
    selectedQuestionId: 'question1',
    selectedLanguage: 'python',
    isLoadingQuestion: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mocks
    mockUsePyodide.mockReturnValue({
      pyodide: null,
      isLoaded: true,
      runCode: jest.fn(),
      loadingError: null,
    });

    mockUseResizableLayout.mockReturnValue({
      layoutState: {
        leftPaneWidth: 50,
        testResultsHeight: 30,
        isDraggingHorizontal: false,
        isDraggingVertical: false,
      },
      containerRef: { current: null },
      rightPaneRef: { current: null },
      handleHorizontalMouseDown: jest.fn(),
      handleVerticalMouseDown: jest.fn(),
    });

    mockUseAppState.mockReturnValue({
      appState: defaultMockState,
      handleQuestionChange: mockHandleQuestionChange,
      handleLanguageChange: mockHandleLanguageChange,
      setPythonCode: mockSetPythonCode,
      setGoCode: mockSetGoCode,
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    mockUseCodeExecution.mockReturnValue({
      executeCode: mockExecuteCode,
      isLanguageAvailable: jest.fn(() => true),
      requiresAuth: jest.fn(() => false),
    });

    mockUseAuth.mockReturnValue({
      isAuthorizedForGo: true,
      user: {
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
      },
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
    });
  });

  it('should render the app with header and main layout', () => {
    render(<App />);

    expect(screen.getByText('🧠 EasyLoops')).toBeInTheDocument();
    expect(screen.getByText('Practice Problems')).toBeInTheDocument();
  });

  it('should handle run button click for Python code', async () => {
    const mockResult = {
      output: 'Hello',
      testResults: [],
    };

    mockExecuteCode.mockResolvedValue(mockResult);

    render(<App />);

    const runButton = screen.getByText('✅ Run');
    await userEvent.click(runButton);

    await waitFor(() => {
      expect(mockExecuteCode).toHaveBeenCalledWith(
        'print("Hello")',
        defaultMockState.currentQuestion.testCases,
        'python'
      );
      expect(mockSetOutput).toHaveBeenCalledWith('Hello');
      expect(mockSetTestResults).toHaveBeenCalledWith([]);
    });
  });

  it('should handle run button click for Go code', async () => {
    const mockResult = {
      output: 'Go output',
      testResults: [],
    };

    mockExecuteCode.mockResolvedValue(mockResult);

    // Update state to use Go
    mockUseAppState.mockReturnValue({
      appState: { ...defaultMockState, selectedLanguage: 'go' },
      handleQuestionChange: mockHandleQuestionChange,
      handleLanguageChange: mockHandleLanguageChange,
      setPythonCode: mockSetPythonCode,
      setGoCode: mockSetGoCode,
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    const runButton = screen.getByText('✅ Run');
    await userEvent.click(runButton);

    await waitFor(() => {
      expect(mockExecuteCode).toHaveBeenCalledWith(
        'package main\nfunc main() {}',
        defaultMockState.currentQuestion.testCases,
        'go'
      );
    });
  });

  it('should show error when no question is selected', async () => {
    mockUseAppState.mockReturnValue({
      appState: { ...defaultMockState, currentQuestion: null },
      handleQuestionChange: mockHandleQuestionChange,
      handleLanguageChange: mockHandleLanguageChange,
      setPythonCode: mockSetPythonCode,
      setGoCode: mockSetGoCode,
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    const runButton = screen.getByText('✅ Run');
    await userEvent.click(runButton);

    await waitFor(() => {
      expect(mockSetOutput).toHaveBeenCalledWith('No question selected');
    });
  });

  it('should show error when user is not authorized for Go', async () => {
    mockUseAuth.mockReturnValue({
      isAuthorizedForGo: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
    });

    // Update state to use Go
    mockUseAppState.mockReturnValue({
      appState: { ...defaultMockState, selectedLanguage: 'go' },
      handleQuestionChange: mockHandleQuestionChange,
      handleLanguageChange: mockHandleLanguageChange,
      setPythonCode: mockSetPythonCode,
      setGoCode: mockSetGoCode,
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    const runButton = screen.getByText('✅ Run');
    await userEvent.click(runButton);

    await waitFor(() => {
      expect(mockSetOutput).toHaveBeenCalledWith(
        'Error: Go language requires authentication. Please login with an authorized account.'
      );
    });
  });

  it('should handle execution errors', async () => {
    const mockError = new Error('Execution failed');
    mockExecuteCode.mockRejectedValue(mockError);

    render(<App />);

    const runButton = screen.getByText('✅ Run');
    await userEvent.click(runButton);

    await waitFor(() => {
      expect(mockSetOutput).toHaveBeenCalledWith(
        'Error: Error: Execution failed'
      );
      expect(mockSetTestResults).toHaveBeenCalledWith([]);
    });
  });

  it('should handle language change', async () => {
    render(<App />);

    const languageSelector = screen.getByDisplayValue('Python3');
    await userEvent.selectOptions(languageSelector, 'go');

    expect(mockHandleLanguageChange).toHaveBeenCalledWith('go');
  });

  it('should handle code changes', async () => {
    render(<App />);

    // This would require mocking Monaco Editor
    // For now, we'll just verify the component renders
    expect(screen.getByText('💻 Code Editor')).toBeInTheDocument();
  });

  it('should show loading state when running', () => {
    mockUseAppState.mockReturnValue({
      appState: { ...defaultMockState, isRunning: true },
      handleQuestionChange: mockHandleQuestionChange,
      handleLanguageChange: mockHandleLanguageChange,
      setPythonCode: mockSetPythonCode,
      setGoCode: mockSetGoCode,
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    expect(screen.getByText('⏳ Running...')).toBeInTheDocument();
  });

  it('should show test results when available', () => {
    const mockTestResults = [
      {
        testCase: 'Test case 1',
        expected: 'expected output',
        actual: 'actual output',
        passed: true,
        input: 'test input',
      },
    ];

    mockUseAppState.mockReturnValue({
      appState: { ...defaultMockState, testResults: mockTestResults },
      handleQuestionChange: mockHandleQuestionChange,
      handleLanguageChange: mockHandleLanguageChange,
      setPythonCode: mockSetPythonCode,
      setGoCode: mockSetGoCode,
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    expect(screen.getByText(/Test Results/)).toBeInTheDocument();
  });
});
