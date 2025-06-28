import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock all hooks
const mockUsePyodide = {
  pyodide: null,
  isLoaded: false,
  runCode: jest.fn()
};

const mockUseResizableLayout = {
  layoutState: {
    leftPaneWidth: 40,
    testResultsHeight: 150,
    isDraggingHorizontal: false,
    isDraggingVertical: false
  },
  containerRef: { current: null },
  rightPaneRef: { current: null },
  handleHorizontalMouseDown: jest.fn(),
  handleVerticalMouseDown: jest.fn()
};

const mockUseAppState = {
  appState: {
    pythonCode: 'print("Hello World")',
    output: '',
    testResults: [],
    isRunning: false,
    currentQuestion: {
      id: '01-test',
      name: 'Test Question',
      description: 'Test description',
      testCases: [
        { inputFile: 'input1.txt', expectedFile: 'expected1.txt', description: 'Test case 1' }
      ]
    },
    availableQuestions: ['01-test', '02-another'],
    selectedQuestionId: '01-test',
    isLoadingQuestion: false
  },
  handleQuestionChange: jest.fn(),
  setPythonCode: jest.fn(),
  setOutput: jest.fn(),
  setTestResults: jest.fn(),
  setIsRunning: jest.fn()
};

const mockUseCodeExecution = {
  executeCode: jest.fn()
};

jest.mock('../../hooks/usePyodide', () => ({
  usePyodide: () => mockUsePyodide
}));

jest.mock('../../hooks/useResizableLayout', () => ({
  useResizableLayout: () => mockUseResizableLayout
}));

jest.mock('../../hooks/useAppState', () => ({
  useAppState: () => mockUseAppState
}));

jest.mock('../../hooks/useCodeExecution', () => ({
  useCodeExecution: () => mockUseCodeExecution
}));

// Mock components
jest.mock('../Header', () => {
  return function MockHeader(props: any) {
    return (
      <div data-testid="header">
        <span>Selected: {props.selectedQuestionId}</span>
        <span>Available: {props.availableQuestions.join(',')}</span>
        <span>Loading: {props.isLoading.toString()}</span>
        <button onClick={() => props.onQuestionChange('02-another')}>Change Question</button>
      </div>
    );
  };
});

jest.mock('../MainLayout', () => {
  return function MockMainLayout(props: any) {
    return (
      <div data-testid="main-layout">
        <div data-testid="left-pane">{props.leftPane}</div>
        <div data-testid="right-pane">{props.rightPane}</div>
        <button onClick={props.onHorizontalMouseDown}>Horizontal Drag</button>
        <span>Width: {props.layoutState.leftPaneWidth}</span>
      </div>
    );
  };
});

jest.mock('../RightPane', () => {
  return function MockRightPane(props: any) {
    return (
      <div data-testid="right-pane-component">
        <span>Code: {props.codeEditorProps.value}</span>
        <span>Language: {props.codeEditorProps.language}</span>
        <span>Running: {props.codeEditorProps.isRunning.toString()}</span>
        <button onClick={props.codeEditorProps.onRun}>Run Code</button>
        <button onClick={props.codeEditorProps.onSubmit}>Submit Code</button>
        <button onClick={props.onVerticalMouseDown}>Vertical Drag</button>
        <span>Test Results: {props.testResultsProps.testResults.length}</span>
        <span>Output: {props.testResultsProps.output}</span>
      </div>
    );
  };
});

jest.mock('../ProblemDescription', () => {
  return function MockProblemDescription(props: any) {
    return (
      <div data-testid="problem-description">
        <span>Question: {props.question?.name || 'None'}</span>
        <span>Loading: {props.isLoading.toString()}</span>
      </div>
    );
  };
});

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock states
    mockUseAppState.appState.isRunning = false;
    mockUseAppState.appState.output = '';
    mockUseAppState.appState.testResults = [];
  });

  it('should render all main components', () => {
    render(<App />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByTestId('left-pane')).toBeInTheDocument();
    expect(screen.getByTestId('right-pane')).toBeInTheDocument();
    expect(screen.getByTestId('problem-description')).toBeInTheDocument();
    expect(screen.getByTestId('right-pane-component')).toBeInTheDocument();
  });

  it('should pass correct props to Header', () => {
    render(<App />);
    
    expect(screen.getByText('Selected: 01-test')).toBeInTheDocument();
    expect(screen.getByText('Available: 01-test,02-another')).toBeInTheDocument();
    // Check within the header specifically
    const header = screen.getByTestId('header');
    expect(header).toHaveTextContent('Loading: false');
  });

  it('should pass correct props to ProblemDescription', () => {
    render(<App />);
    
    expect(screen.getByText('Question: Test Question')).toBeInTheDocument();
    // Check within the problem description specifically
    const problemDesc = screen.getByTestId('problem-description');
    expect(problemDesc).toHaveTextContent('Loading: false');
  });

  it('should pass correct props to RightPane', () => {
    render(<App />);
    
    expect(screen.getByText('Code: print("Hello World")')).toBeInTheDocument();
    expect(screen.getByText('Language: python')).toBeInTheDocument();
    expect(screen.getByText('Running: false')).toBeInTheDocument();
    expect(screen.getByText('Test Results: 0')).toBeInTheDocument();
    expect(screen.getByText('Output:')).toBeInTheDocument();
  });

  it('should handle question change', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Change Question'));
    
    expect(mockUseAppState.handleQuestionChange).toHaveBeenCalledWith('02-another');
  });

  it('should handle code execution successfully', async () => {
    const mockResult = {
      output: 'Hello World',
      testResults: [
        { testCase: 'Test 1', expected: 'Hello World', actual: 'Hello World', passed: true }
      ]
    };
    mockUseCodeExecution.executeCode.mockResolvedValue(mockResult);

    render(<App />);
    
    fireEvent.click(screen.getByText('Run Code'));

    expect(mockUseAppState.setIsRunning).toHaveBeenCalledWith(true);
    expect(mockUseAppState.setOutput).toHaveBeenCalledWith('');

    await waitFor(() => {
      expect(mockUseCodeExecution.executeCode).toHaveBeenCalledWith(
        'print("Hello World")',
        mockUseAppState.appState.currentQuestion.testCases
      );
      expect(mockUseAppState.setOutput).toHaveBeenCalledWith('Hello World');
      expect(mockUseAppState.setTestResults).toHaveBeenCalledWith(mockResult.testResults);
      expect(mockUseAppState.setIsRunning).toHaveBeenCalledWith(false);
    });
  });

  it('should handle code execution error', async () => {
    const error = new Error('Execution failed');
    mockUseCodeExecution.executeCode.mockRejectedValue(error);

    render(<App />);
    
    fireEvent.click(screen.getByText('Run Code'));

    expect(mockUseAppState.setIsRunning).toHaveBeenCalledWith(true);
    expect(mockUseAppState.setOutput).toHaveBeenCalledWith('');

    await waitFor(() => {
      expect(mockUseAppState.setOutput).toHaveBeenCalledWith('Error: Error: Execution failed');
      expect(mockUseAppState.setTestResults).toHaveBeenCalledWith([]);
      expect(mockUseAppState.setIsRunning).toHaveBeenCalledWith(false);
    });
  });

  it('should handle run code when no question is selected', async () => {
    // Type assertion to allow null assignment for testing
    (mockUseAppState.appState as any).currentQuestion = null;

    render(<App />);
    
    fireEvent.click(screen.getByText('Run Code'));

    await waitFor(() => {
      expect(mockUseAppState.setOutput).toHaveBeenCalledWith('No question selected');
      expect(mockUseCodeExecution.executeCode).not.toHaveBeenCalled();
    });
  });

  it('should handle code submission', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<App />);
    
    fireEvent.click(screen.getByText('Submit Code'));

    expect(consoleSpy).toHaveBeenCalledWith('Submitting code:', 'print("Hello World")');
    
    consoleSpy.mockRestore();
  });

  it('should handle layout interactions', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Horizontal Drag'));
    expect(mockUseResizableLayout.handleHorizontalMouseDown).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Vertical Drag'));
    expect(mockUseResizableLayout.handleVerticalMouseDown).toHaveBeenCalled();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(<App />);
    
    const appContainer = container.firstChild;
    expect(appContainer).toHaveClass('h-screen', 'bg-gray-50', 'flex', 'flex-col');
  });

  it('should handle loading state', () => {
    mockUseAppState.appState.isLoadingQuestion = true;

    render(<App />);
    
    // Check both header and problem description have loading state
    const header = screen.getByTestId('header');
    const problemDesc = screen.getByTestId('problem-description');
    expect(header).toHaveTextContent('Loading: true');
    expect(problemDesc).toHaveTextContent('Loading: true');
  });

  it('should handle running state', () => {
    mockUseAppState.appState.isRunning = true;

    render(<App />);
    
    expect(screen.getByText('Running: true')).toBeInTheDocument();
  });

  it('should pass layout state correctly', () => {
    render(<App />);
    
    expect(screen.getByText('Width: 40')).toBeInTheDocument();
  });
});