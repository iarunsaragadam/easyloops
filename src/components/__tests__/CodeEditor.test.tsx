import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CodeEditor from '../CodeEditor';
import { CodeEditorProps } from '@/types';

// Mock MonacoEditor component
jest.mock('../MonacoEditor', () => {
  return function MockMonacoEditor({ value, onChange, language, height }: any) {
    return (
      <div data-testid="monaco-editor">
        <span>Value: {value}</span>
        <span>Language: {language}</span>
        <span>Height: {height}</span>
        <textarea
          data-testid="editor-textarea"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    );
  };
});

describe('CodeEditor', () => {
  const defaultProps: CodeEditorProps = {
    value: 'print("Hello World")',
    onChange: jest.fn(),
    onRun: jest.fn(),
    onSubmit: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render code editor header', () => {
    render(<CodeEditor {...defaultProps} />);
    
    expect(screen.getByText('💻 Code Editor')).toBeInTheDocument();
  });

  it('should render run and submit buttons', () => {
    render(<CodeEditor {...defaultProps} />);
    
    expect(screen.getByText('✅ Run')).toBeInTheDocument();
    expect(screen.getByText('📤 Submit')).toBeInTheDocument();
  });

  it('should render MonacoEditor with correct props', () => {
    render(<CodeEditor {...defaultProps} language="javascript" height="500px" />);
    
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
    expect(screen.getByText('Value: print("Hello World")')).toBeInTheDocument();
    expect(screen.getByText('Language: javascript')).toBeInTheDocument();
    expect(screen.getByText('Height: 500px')).toBeInTheDocument();
  });

  it('should use default props when not provided', () => {
    render(<CodeEditor {...defaultProps} />);
    
    expect(screen.getByText('Language: python')).toBeInTheDocument();
    expect(screen.getByText('Height: 100%')).toBeInTheDocument();
  });

  it('should call onRun when run button is clicked', () => {
    render(<CodeEditor {...defaultProps} />);
    
    fireEvent.click(screen.getByText('✅ Run'));
    
    expect(defaultProps.onRun).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmit when submit button is clicked', () => {
    render(<CodeEditor {...defaultProps} />);
    
    fireEvent.click(screen.getByText('📤 Submit'));
    
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should disable run button when isRunning is true', () => {
    render(<CodeEditor {...defaultProps} isRunning={true} />);
    
    const runButton = screen.getByText('⏳ Running...');
    expect(runButton).toBeDisabled();
    expect(runButton).toHaveClass('disabled:bg-gray-400', 'disabled:cursor-not-allowed');
  });

  it('should show running text when isRunning is true', () => {
    render(<CodeEditor {...defaultProps} isRunning={true} />);
    
    expect(screen.getByText('⏳ Running...')).toBeInTheDocument();
    expect(screen.queryByText('✅ Run')).not.toBeInTheDocument();
  });

  it('should show normal run text when isRunning is false', () => {
    render(<CodeEditor {...defaultProps} isRunning={false} />);
    
    expect(screen.getByText('✅ Run')).toBeInTheDocument();
    expect(screen.queryByText('⏳ Running...')).not.toBeInTheDocument();
  });

  it('should enable run button when isRunning is false', () => {
    render(<CodeEditor {...defaultProps} isRunning={false} />);
    
    const runButton = screen.getByText('✅ Run');
    expect(runButton).not.toBeDisabled();
  });

  it('should apply correct CSS classes to main container', () => {
    const { container } = render(<CodeEditor {...defaultProps} />);
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('flex', 'flex-col', 'h-full');
  });

  it('should apply correct CSS classes to header', () => {
    const { container } = render(<CodeEditor {...defaultProps} />);
    
    const header = container.querySelector('.border-b.border-gray-200');
    expect(header).toHaveClass('border-b', 'border-gray-200', 'px-4', 'py-2', 'flex', 'items-center', 'justify-between');
  });

  it('should apply correct CSS classes to run button', () => {
    render(<CodeEditor {...defaultProps} />);
    
    const runButton = screen.getByText('✅ Run');
    expect(runButton).toHaveClass('px-3', 'py-1', 'bg-green-600', 'text-white', 'text-sm', 'rounded', 'hover:bg-green-700', 'transition-colors');
  });

  it('should apply correct CSS classes to submit button', () => {
    render(<CodeEditor {...defaultProps} />);
    
    const submitButton = screen.getByText('📤 Submit');
    expect(submitButton).toHaveClass('px-3', 'py-1', 'bg-blue-600', 'text-white', 'text-sm', 'rounded', 'hover:bg-blue-700', 'transition-colors');
  });

  it('should apply flex-1 to editor container', () => {
    const { container } = render(<CodeEditor {...defaultProps} />);
    
    const editorContainer = container.querySelector('.flex-1');
    expect(editorContainer).toBeInTheDocument();
    expect(editorContainer).toContainElement(screen.getByTestId('monaco-editor'));
  });

  it('should handle onChange events from MonacoEditor', () => {
    render(<CodeEditor {...defaultProps} />);
    
    const textarea = screen.getByTestId('editor-textarea');
    fireEvent.change(textarea, { target: { value: 'new code' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('new code');
  });

  it('should pass through all required props to MonacoEditor', () => {
    const customProps = {
      ...defaultProps,
      value: 'custom code',
      language: 'typescript',
      height: '400px'
    };

    render(<CodeEditor {...customProps} />);
    
    expect(screen.getByText('Value: custom code')).toBeInTheDocument();
    expect(screen.getByText('Language: typescript')).toBeInTheDocument();
    expect(screen.getByText('Height: 400px')).toBeInTheDocument();
  });

  it('should handle missing optional props gracefully', () => {
    const minimalProps = {
      value: 'test code',
      onChange: jest.fn(),
      onRun: jest.fn(),
      onSubmit: jest.fn()
    };

    render(<CodeEditor {...minimalProps} />);
    
    expect(screen.getByText('Language: python')).toBeInTheDocument();
    expect(screen.getByText('Height: 100%')).toBeInTheDocument();
    expect(screen.getByText('✅ Run')).toBeInTheDocument();
  });

  it('should maintain button functionality when not running', () => {
    render(<CodeEditor {...defaultProps} isRunning={false} />);
    
    const runButton = screen.getByText('✅ Run');
    const submitButton = screen.getByText('📤 Submit');
    
    fireEvent.click(runButton);
    fireEvent.click(submitButton);
    
    expect(defaultProps.onRun).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should prevent run button clicks when running', () => {
    render(<CodeEditor {...defaultProps} isRunning={true} />);
    
    const runButton = screen.getByText('⏳ Running...');
    
    // Try to click disabled button
    fireEvent.click(runButton);
    
    // onRun should not be called when button is disabled
    expect(defaultProps.onRun).not.toHaveBeenCalled();
  });

  it('should allow submit button clicks even when running', () => {
    render(<CodeEditor {...defaultProps} isRunning={true} />);
    
    const submitButton = screen.getByText('📤 Submit');
    
    fireEvent.click(submitButton);
    
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});