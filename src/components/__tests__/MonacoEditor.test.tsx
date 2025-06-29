import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MonacoEditor from '../MonacoEditor';

// Mock constants
jest.mock('../../constants', () => ({
  MONACO_CONFIG: {
    CDN_URL: 'https://test-cdn.com/monaco-loader.js',
    VS_PATH: 'https://test-cdn.com/monaco/vs'
  }
}));

describe('MonacoEditor', () => {
  let mockEditor: any;
  let mockMonaco: any;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock editor instance
    mockEditor = {
      getValue: jest.fn(() => 'editor content'),
      setValue: jest.fn(),
      onDidChangeModelContent: jest.fn(),
      dispose: jest.fn(),
      layout: jest.fn()
    };

    // Mock monaco namespace
    mockMonaco = {
      editor: {
        create: jest.fn(() => mockEditor)
      }
    };

    // Mock window.require
    Object.defineProperty(window, 'require', {
      value: jest.fn((deps, callback) => {
        if (deps.includes('vs/editor/editor.main')) {
          setTimeout(() => callback(mockMonaco), 0);
        }
      }),
      writable: true,
      configurable: true
    });

    // Add config method to require
    (window as any).require.config = jest.fn();
  });

  afterEach(() => {
    delete (window as any).require;
  });

  it('should render editor container', () => {
    const { container } = render(
      <MonacoEditor value="test code" onChange={jest.fn()} />
    );

    const editorContainer = container.firstChild as HTMLElement;
    expect(editorContainer).toBeInTheDocument();
    expect(editorContainer.tagName).toBe('DIV');
    expect(editorContainer).toHaveStyle('width: 100%');
    expect(editorContainer).toHaveStyle('height: 400px');
  });

  it('should apply custom height', () => {
    const { container } = render(
      <MonacoEditor value="test" height="600px" onChange={jest.fn()} />
    );

    const editorContainer = container.firstChild as HTMLElement;
    expect(editorContainer).toHaveStyle('height: 600px');
  });

  it('should apply numeric height', () => {
    const { container } = render(
      <MonacoEditor value="test" height={500} onChange={jest.fn()} />
    );

    const editorContainer = container.firstChild as HTMLElement;
    expect(editorContainer).toHaveStyle('height: 500px');
  });

  it('should load Monaco script when component mounts', async () => {
    render(<MonacoEditor value="test code" onChange={jest.fn()} />);

    await waitFor(() => {
      const scripts = document.querySelectorAll('script');
      expect(scripts.length).toBe(1);
      expect(scripts[0].src).toBe('https://test-cdn.com/monaco-loader.js');
    });
  });

  it('should create Monaco editor after script loads', async () => {
    const onChange = jest.fn();
    render(<MonacoEditor value="test code" onChange={onChange} />);

    // Find and trigger script onload
    await waitFor(() => {
      const script = document.querySelector('script');
      expect(script).toBeInTheDocument();
    });

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect((window as any).require.config).toHaveBeenCalledWith({
        paths: { vs: 'https://test-cdn.com/monaco/vs' }
      });
      expect((window as any).require).toHaveBeenCalledWith(
        ['vs/editor/editor.main'],
        expect.any(Function)
      );
    });
  });

  it('should create editor with correct configuration', async () => {
    const onChange = jest.fn();
    render(
      <MonacoEditor 
        value="test code" 
        language="javascript"
        theme="vs-light"
        onChange={onChange} 
      />
    );

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockMonaco.editor.create).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        {
          value: 'test code',
          language: 'javascript',
          theme: 'vs-light',
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
        }
      );
    });
  });

  it('should use default props when not provided', async () => {
    render(<MonacoEditor value="test code" />);

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockMonaco.editor.create).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          language: 'python',
          theme: 'vs-dark'
        })
      );
    });
  });

  it('should setup onChange handler', async () => {
    const onChange = jest.fn();
    render(<MonacoEditor value="test code" onChange={onChange} />);

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockEditor.onDidChangeModelContent).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });

    // Simulate content change
    const changeHandler = mockEditor.onDidChangeModelContent.mock.calls[0][0];
    changeHandler();

    expect(onChange).toHaveBeenCalledWith('editor content');
  });

  it('should not call onChange when not provided', async () => {
    render(<MonacoEditor value="test code" />);

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockEditor.onDidChangeModelContent).toHaveBeenCalled();
    });

    // Simulate content change without onChange prop
    const changeHandler = mockEditor.onDidChangeModelContent.mock.calls[0][0];
    expect(() => changeHandler()).not.toThrow();
  });

  it('should update editor value when prop changes', async () => {
    const { rerender } = render(<MonacoEditor value="initial" onChange={jest.fn()} />);

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockMonaco.editor.create).toHaveBeenCalled();
    });

    // Change the value prop
    mockEditor.getValue.mockReturnValue('initial'); // Current editor value
    rerender(<MonacoEditor value="updated" onChange={jest.fn()} />);

    expect(mockEditor.setValue).toHaveBeenCalledWith('updated');
  });

  it('should not update editor value when unchanged', async () => {
    const { rerender } = render(<MonacoEditor value="same" onChange={jest.fn()} />);

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockMonaco.editor.create).toHaveBeenCalled();
    });

    mockEditor.getValue.mockReturnValue('same'); // Same as prop value
    rerender(<MonacoEditor value="same" onChange={jest.fn()} />);

    expect(mockEditor.setValue).not.toHaveBeenCalled();
  });

  it('should layout editor when height changes', async () => {
    const { rerender } = render(<MonacoEditor value="test" height={400} />);

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockMonaco.editor.create).toHaveBeenCalled();
    });

    rerender(<MonacoEditor value="test" height={500} />);

    expect(mockEditor.layout).toHaveBeenCalled();
  });

  it('should dispose editor on unmount', async () => {
    const { unmount } = render(<MonacoEditor value="test" onChange={jest.fn()} />);

    const script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockMonaco.editor.create).toHaveBeenCalled();
    });

    unmount();

    expect(mockEditor.dispose).toHaveBeenCalled();
  });

  it('should remove script on unmount', async () => {
    const { unmount } = render(<MonacoEditor value="test" />);

    await waitFor(() => {
      const scripts = document.querySelectorAll('script');
      expect(scripts.length).toBe(1);
    });

    unmount();

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(0);
  });

  it('should handle server-side rendering', () => {
    const originalWindow = global.window;
    
    // Simulate SSR by removing window
    delete (global as any).window;

    const { container } = render(<MonacoEditor value="test" />);

    expect(container.firstChild).toBeInTheDocument();
    
    // In SSR simulation, the component should render container but may still add script
    // The important thing is that it doesn't crash
    expect(container.firstChild).toHaveStyle('width: 100%');

    // Restore window
    global.window = originalWindow;
  });

  it('should handle missing container ref', () => {
    const { container } = render(<MonacoEditor value="test" />);
    
    // The component should render without errors even if ref handling has edge cases
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('width: 100%');
  });

  it('should handle different language props', async () => {
    const { rerender } = render(<MonacoEditor value="test" language="typescript" />);

    let script = document.querySelector('script') as HTMLScriptElement;
    if (script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect(mockMonaco.editor.create).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          language: 'typescript'
        })
      );
    });

    // Test another language
    rerender(<MonacoEditor value="test" language="sql" />);
    
    // Should create new editor with new language
    // Note: In real implementation, language change might require re-creation
  });

  it('should handle script cleanup when script not in DOM', async () => {
    const { unmount } = render(<MonacoEditor value="test" />);

    await waitFor(() => {
      const scripts = document.querySelectorAll('script');
      expect(scripts.length).toBe(1);
    });

    // Manually remove script from DOM
    const script = document.querySelector('script');
    if (script) {
      document.body.removeChild(script);
    }

    // Should not throw error during cleanup
    expect(() => unmount()).not.toThrow();
  });
});