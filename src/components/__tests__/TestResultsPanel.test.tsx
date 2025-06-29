import React from 'react';
import { render, screen } from '@testing-library/react';
import TestResultsPanel from '../TestResultsPanel';
import { TestResultsPanelProps, TestResult } from '@/types';

describe('TestResultsPanel', () => {
  const defaultProps: TestResultsPanelProps = {
    testResults: [],
    output: '',
    height: 300
  };

  const mockTestResults: TestResult[] = [
    {
      testCase: 'Test Case 1',
      expected: 'Hello World',
      actual: 'Hello World',
      passed: true,
      input: 'input1'
    },
    {
      testCase: 'Test Case 2',
      expected: 'Goodbye',
      actual: 'Hello',
      passed: false,
      input: 'input2'
    }
  ];

  it('should render with correct height', () => {
    const { container } = render(<TestResultsPanel {...defaultProps} height={400} />);
    
    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveStyle('height: 400px');
  });

  it('should render header with test results title', () => {
    render(<TestResultsPanel {...defaultProps} />);
    
    expect(screen.getByText('📋 Test Results')).toBeInTheDocument();
  });

  it('should render learning mode info', () => {
    render(<TestResultsPanel {...defaultProps} />);
    
    expect(screen.getByText('📝 Learning Mode:')).toBeInTheDocument();
    expect(screen.getByText('Each test case runs individually', { exact: false })).toBeInTheDocument();
    expect(screen.getByText("You'll see exactly which test case failed and why", { exact: false })).toBeInTheDocument();
  });

  it('should render output section when output is provided', () => {
    const output = 'Program output here';
    render(<TestResultsPanel {...defaultProps} output={output} />);
    
    expect(screen.getByText('Output:')).toBeInTheDocument();
    expect(screen.getByText(output)).toBeInTheDocument();
  });

  it('should not render output section when output is empty', () => {
    render(<TestResultsPanel {...defaultProps} output="" />);
    
    expect(screen.queryByText('Output:')).not.toBeInTheDocument();
  });

  it('should render test results when provided', () => {
    render(<TestResultsPanel {...defaultProps} testResults={mockTestResults} />);
    
    expect(screen.getByText('Test Case 1')).toBeInTheDocument();
    expect(screen.getByText('Test Case 2')).toBeInTheDocument();
  });

  it('should render passing test result with correct styling', () => {
    render(<TestResultsPanel {...defaultProps} testResults={[mockTestResults[0]]} />);
    
    const testCase = screen.getByText('Test Case 1').closest('.p-3');
    expect(testCase).toHaveClass('bg-green-50', 'border-green-200');
    
    expect(screen.getByText('PASS')).toBeInTheDocument();
    expect(screen.getByText('PASS')).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('should render failing test result with correct styling', () => {
    render(<TestResultsPanel {...defaultProps} testResults={[mockTestResults[1]]} />);
    
    const testCase = screen.getByText('Test Case 2').closest('.p-3');
    expect(testCase).toHaveClass('bg-red-50', 'border-red-200');
    
    expect(screen.getByText('FAIL')).toBeInTheDocument();
    expect(screen.getByText('FAIL')).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('should render expected and actual values for failing tests', () => {
    render(<TestResultsPanel {...defaultProps} testResults={[mockTestResults[1]]} />);
    
    expect(screen.getByText('Expected:')).toBeInTheDocument();
    expect(screen.getByText('Actual:')).toBeInTheDocument();
    expect(screen.getByText('Goodbye')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should not render expected/actual values for passing tests', () => {
    render(<TestResultsPanel {...defaultProps} testResults={[mockTestResults[0]]} />);
    
    expect(screen.queryByText('Expected:')).not.toBeInTheDocument();
    expect(screen.queryByText('Actual:')).not.toBeInTheDocument();
  });

  it('should render default message when no tests and no output', () => {
    render(<TestResultsPanel {...defaultProps} />);
    
    expect(screen.getByText('Click "Run" to execute your code and see test results.')).toBeInTheDocument();
  });

  it('should not render default message when output is present', () => {
    render(<TestResultsPanel {...defaultProps} output="Some output" />);
    
    expect(screen.queryByText('Click "Run" to execute your code and see test results.')).not.toBeInTheDocument();
  });

  it('should not render default message when test results are present', () => {
    render(<TestResultsPanel {...defaultProps} testResults={mockTestResults} />);
    
    expect(screen.queryByText('Click "Run" to execute your code and see test results.')).not.toBeInTheDocument();
  });

  it('should apply correct styling to header', () => {
    render(<TestResultsPanel {...defaultProps} />);
    
    const header = screen.getByText('📋 Test Results').parentElement;
    expect(header).toHaveClass('px-4', 'py-2', 'border-b', 'border-gray-200');
  });

  it('should apply correct styling to main container', () => {
    const { container } = render(<TestResultsPanel {...defaultProps} />);
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('bg-gray-50');
  });

  it('should apply correct styling to content area', () => {
    render(<TestResultsPanel {...defaultProps} />);
    
    const contentArea = screen.getByText('📝 Learning Mode:').closest('.p-4');
    expect(contentArea).toHaveClass('p-4', 'space-y-2', 'overflow-y-auto');
  });

  it('should handle empty test results array', () => {
    render(<TestResultsPanel {...defaultProps} testResults={[]} />);
    
    expect(screen.getByText('Click "Run" to execute your code and see test results.')).toBeInTheDocument();
  });

  it('should handle multiple test results', () => {
    const multipleResults = [
      ...mockTestResults,
      {
        testCase: 'Test Case 3',
        expected: 'Test',
        actual: 'Test',
        passed: true
      }
    ];
    
    render(<TestResultsPanel {...defaultProps} testResults={multipleResults} />);
    
    expect(screen.getByText('Test Case 1')).toBeInTheDocument();
    expect(screen.getByText('Test Case 2')).toBeInTheDocument();
    expect(screen.getByText('Test Case 3')).toBeInTheDocument();
  });

  it('should calculate content area height correctly', () => {
    const height = 400;
    render(<TestResultsPanel {...defaultProps} height={height} />);
    
    const contentArea = screen.getByText('📝 Learning Mode:').closest('.p-4') as HTMLElement;
    expect(contentArea).toHaveStyle('height: calc(400px - 40px)');
  });

  it('should render learning mode info with correct styling', () => {
    render(<TestResultsPanel {...defaultProps} />);
    
    const learningModeContainer = screen.getByText('📝 Learning Mode:').closest('.p-3');
    expect(learningModeContainer).toHaveClass('mb-4', 'p-3', 'bg-blue-50', 'border', 'border-blue-200', 'rounded');
  });

  it('should render output with correct pre formatting', () => {
    const output = 'Simple output';
    render(<TestResultsPanel {...defaultProps} output={output} />);
    
    const outputElement = screen.getByText(output);
    expect(outputElement.tagName).toBe('PRE');
    expect(outputElement).toHaveClass('bg-gray-100', 'p-3', 'rounded', 'text-sm', 'overflow-x-auto', 'text-gray-800');
  });
});