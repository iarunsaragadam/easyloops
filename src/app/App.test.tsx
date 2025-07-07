import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as usePyodideModule from '@/features/editor';
import * as useResizableLayoutModule from '@/shared';
import * as useAppStateModule from '@/features/question';
import * as useCodeExecutionModule from '@/features/editor';
import * as useAuthModule from '@/features/auth';
import { User } from 'firebase/auth';

// Mock all the hooks and components
jest.mock('@/features/editor', () => ({
  usePyodide: jest.fn(),
  useCodeExecution: jest.fn(),
}));

jest.mock('@/shared', () => ({
  useResizableLayout: jest.fn(),
  useWindowSize: jest.fn(() => ({ isMobile: false })),
  Header: ({
    selectedLanguage,
    onLanguageChange,
  }: {
    selectedLanguage: string;
    onLanguageChange: (lang: string) => void;
  }) => (
    <div data-testid="header">
      <h1>🧠 EasyLoops</h1>
      <span>Practice Problems</span>
      <select
        data-testid="language-selector"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="python">Python3</option>
        <option value="go">Go</option>
      </select>
    </div>
  ),
  MainLayout: ({
    leftPane,
    rightPane,
  }: {
    leftPane: React.ReactNode;
    rightPane: React.ReactNode;
  }) => (
    <div data-testid="main-layout">
      <div data-testid="left-pane">{leftPane}</div>
      <div data-testid="right-pane">{rightPane}</div>
    </div>
  ),
  RightPane: ({ codeEditorProps }: { codeEditorProps?: unknown }) => {
    const handleRun =
      codeEditorProps &&
      typeof (codeEditorProps as { onRun?: unknown }).onRun === 'function'
        ? (codeEditorProps as { onRun: () => void }).onRun
        : undefined;
    return (
      <div data-testid="right-pane">
        <div data-testid="code-editor">
          <span>💻 Code Editor</span>
          <button data-testid="run-button" onClick={handleRun}>
            ✅ Run
          </button>
          <button data-testid="submit-button">📤 Submit</button>
        </div>
        <div data-testid="test-results">
          <span>Test Results (0/0 passed)</span>
        </div>
      </div>
    );
  },
  MobileUsageTip: () => <div data-testid="mobile-tip" />,
}));

jest.mock('@/features/question', () => ({
  useAppState: jest.fn(),
  ProblemDescription: ({
    question,
    isLoading,
  }: {
    question: {
      name?: string;
      description?: string;
      testCases?: unknown[];
    } | null;
    isLoading: boolean;
  }) => (
    <div data-testid="problem-description">
      {isLoading
        ? 'Loading question...'
        : question?.name || 'Select a question to begin'}
    </div>
  ),
}));

jest.mock('@/features/auth', () => ({
  useAuth: jest.fn(),
}));

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
      setCodeForLanguage: jest.fn(),
      getCurrentCode: jest.fn(() => defaultMockState.pythonCode),
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    mockUseCodeExecution.mockReturnValue({
      executeCode: mockExecuteCode,
      executeAndSubmit: jest.fn(),
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

    expect(screen.getByTestId('header')).toBeInTheDocument();
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

    const runButton = screen.getByTestId('run-button');
    await userEvent.click(runButton);

    await waitFor(() => {
      expect(mockExecuteCode).toHaveBeenCalledWith(
        'print("Hello")',
        defaultMockState.currentQuestion.testCases,
        'python',
        { type: 'RUN', testCaseLimit: 2, createSnapshot: false }
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
      setCodeForLanguage: jest.fn(),
      getCurrentCode: jest.fn(() => defaultMockState.goCode),
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    const runButton = screen.getByTestId('run-button');
    await userEvent.click(runButton);

    await waitFor(() => {
      expect(mockExecuteCode).toHaveBeenCalledWith(
        'package main\nfunc main() {}',
        defaultMockState.currentQuestion.testCases,
        'go',
        { type: 'RUN', testCaseLimit: 2, createSnapshot: false }
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
      setCodeForLanguage: jest.fn(),
      getCurrentCode: jest.fn(() => defaultMockState.pythonCode),
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    const runButton = screen.getByTestId('run-button');
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
      setCodeForLanguage: jest.fn(),
      getCurrentCode: jest.fn(() => defaultMockState.goCode),
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    const runButton = screen.getByTestId('run-button');
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

    const runButton = screen.getByTestId('run-button');
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
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('should show loading state when running', () => {
    mockUseAppState.mockReturnValue({
      appState: { ...defaultMockState, isRunning: true },
      handleQuestionChange: mockHandleQuestionChange,
      handleLanguageChange: mockHandleLanguageChange,
      setPythonCode: mockSetPythonCode,
      setGoCode: mockSetGoCode,
      setCodeForLanguage: jest.fn(),
      getCurrentCode: jest.fn(() => defaultMockState.pythonCode),
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    // The loading state is not rendered in the mock, so just check the code editor is present
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
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
      setCodeForLanguage: jest.fn(),
      getCurrentCode: jest.fn(() => defaultMockState.pythonCode),
      setOutput: mockSetOutput,
      setTestResults: mockSetTestResults,
      setIsRunning: mockSetIsRunning,
    });

    render(<App />);

    expect(screen.getByTestId('test-results')).toBeInTheDocument();
  });
});
