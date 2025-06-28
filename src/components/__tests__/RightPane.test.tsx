import React from 'react';
import { render, screen } from '@testing-library/react';
import RightPane from '../RightPane';
import { CodeEditorProps, TestResultsPanelProps } from '@/types';

// Mock all the child components
jest.mock('../CodeEditor', () => {
  return function MockCodeEditor(props: CodeEditorProps) {
    return (
      <div data-testid="code-editor">
        <span>Mock Code Editor</span>
        <span>Language: {props.language}</span>
        <span>Height: {props.height}</span>
        <span>Running: {props.isRunning?.toString()}</span>
      </div>
    );
  };
});

jest.mock('../TestResultsPanel', () => {
  return function MockTestResultsPanel(props: TestResultsPanelProps) {
    return (
      <div data-testid="test-results-panel">
        <span>Mock Test Results Panel</span>
        <span>Height: {props.height}</span>
        <span>Results: {props.testResults.length}</span>
      </div>
    );
  };
});

jest.mock('../DraggableDivider', () => {
  return function MockDraggableDivider({ onMouseDown, orientation }: any) {
    return (
      <div 
        data-testid="draggable-divider"
        onClick={() => onMouseDown({ type: 'mousedown' })}
      >
        Mock Draggable Divider - {orientation}
      </div>
    );
  };
});

describe('RightPane', () => {
  const mockCodeEditorProps: CodeEditorProps = {
    value: 'print("Hello World")',
    onChange: jest.fn(),
    language: 'python',
    height: '100%',
    isRunning: false,
    onRun: jest.fn(),
    onSubmit: jest.fn()
  };

  const mockTestResultsProps: TestResultsPanelProps = {
    testResults: [],
    output: '',
    height: 200
  };

  const mockOnVerticalMouseDown = jest.fn();

  const defaultProps = {
    codeEditorProps: mockCodeEditorProps,
    testResultsProps: mockTestResultsProps,
    onVerticalMouseDown: mockOnVerticalMouseDown
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all child components', () => {
    render(<RightPane {...defaultProps} />);
    
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
    expect(screen.getByTestId('test-results-panel')).toBeInTheDocument();
    expect(screen.getByTestId('draggable-divider')).toBeInTheDocument();
  });

  it('should pass correct props to CodeEditor', () => {
    render(<RightPane {...defaultProps} />);
    
    expect(screen.getByText('Mock Code Editor')).toBeInTheDocument();
    expect(screen.getByText('Language: python')).toBeInTheDocument();
    expect(screen.getByText('Height: 100%')).toBeInTheDocument();
    expect(screen.getByText('Running: false')).toBeInTheDocument();
  });

  it('should pass correct props to TestResultsPanel', () => {
    render(<RightPane {...defaultProps} />);
    
    expect(screen.getByText('Mock Test Results Panel')).toBeInTheDocument();
    expect(screen.getByText('Height: 200')).toBeInTheDocument();
    expect(screen.getByText('Results: 0')).toBeInTheDocument();
  });

  it('should pass correct props to DraggableDivider', () => {
    render(<RightPane {...defaultProps} />);
    
    expect(screen.getByText('Mock Draggable Divider - vertical')).toBeInTheDocument();
  });

  it('should calculate code editor height correctly', () => {
    const { container } = render(<RightPane {...defaultProps} />);
    
    const codeEditorContainer = screen.getByTestId('code-editor').parentElement;
    expect(codeEditorContainer).toHaveStyle('height: calc(100% - 200px - 40px)');
  });

  it('should update code editor height when test results height changes', () => {
    const propsWithDifferentHeight = {
      ...defaultProps,
      testResultsProps: {
        ...mockTestResultsProps,
        height: 300
      }
    };

    const { container } = render(<RightPane {...propsWithDifferentHeight} />);
    
    const codeEditorContainer = screen.getByTestId('code-editor').parentElement;
    expect(codeEditorContainer).toHaveStyle('height: calc(100% - 300px - 40px)');
  });

  it('should apply flex-1 class to code editor container', () => {
    render(<RightPane {...defaultProps} />);
    
    const codeEditorContainer = screen.getByTestId('code-editor').parentElement;
    expect(codeEditorContainer).toHaveClass('flex-1');
  });

  it('should render components in correct order', () => {
    render(<RightPane {...defaultProps} />);
    
    // All components should be rendered
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
    expect(screen.getByTestId('draggable-divider')).toBeInTheDocument();
    expect(screen.getByTestId('test-results-panel')).toBeInTheDocument();
  });

  it('should handle different code editor props', () => {
    const differentCodeEditorProps = {
      ...mockCodeEditorProps,
      language: 'javascript',
      isRunning: true,
      value: 'console.log("test")'
    };

    render(<RightPane {...defaultProps} codeEditorProps={differentCodeEditorProps} />);
    
    expect(screen.getByText('Language: javascript')).toBeInTheDocument();
    expect(screen.getByText('Running: true')).toBeInTheDocument();
  });

  it('should handle different test results props', () => {
    const differentTestResultsProps = {
      ...mockTestResultsProps,
      height: 400,
      testResults: [
        { testCase: 'Test 1', expected: 'output', actual: 'output', passed: true },
        { testCase: 'Test 2', expected: 'output2', actual: 'output2', passed: true }
      ]
    };

    render(<RightPane {...defaultProps} testResultsProps={differentTestResultsProps} />);
    
    expect(screen.getByText('Height: 400')).toBeInTheDocument();
    expect(screen.getByText('Results: 2')).toBeInTheDocument();
  });

  it('should handle minimal props', () => {
    const minimalCodeEditorProps: CodeEditorProps = {
      value: '',
      onChange: jest.fn(),
      onRun: jest.fn(),
      onSubmit: jest.fn()
    };

    const minimalTestResultsProps: TestResultsPanelProps = {
      testResults: [],
      output: '',
      height: 150
    };

    render(<RightPane 
      codeEditorProps={minimalCodeEditorProps}
      testResultsProps={minimalTestResultsProps}
      onVerticalMouseDown={jest.fn()}
    />);
    
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
    expect(screen.getByTestId('test-results-panel')).toBeInTheDocument();
    expect(screen.getByTestId('draggable-divider')).toBeInTheDocument();
  });
});