import { WasmRuntime } from '../interfaces';
import { TestCase, CodeExecutionResult, TestResult } from '@/shared/types';

export class PyodideRuntime implements WasmRuntime {
  public readonly language = 'python';
  private pyodide: any = null;
  private _isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  constructor() {
    // Auto-load on construction
    this.load();
  }

  isLoaded(): boolean {
    return this._isLoaded;
  }

  async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this.loadPyodide();
    await this.loadingPromise;
  }

  private async loadPyodide(): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        throw new Error('Pyodide can only be loaded in browser environment');
      }

      // Load Pyodide from CDN
      const pyodideScript = document.createElement('script');
      pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      
      await new Promise<void>((resolve, reject) => {
        pyodideScript.onload = () => resolve();
        pyodideScript.onerror = () => reject(new Error('Failed to load Pyodide script'));
        document.head.appendChild(pyodideScript);
      });

      // Initialize Pyodide
      this.pyodide = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });

      this._isLoaded = true;
    } catch (error) {
      console.error('Failed to load Pyodide:', error);
      throw error;
    }
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    if (!this.isLoaded()) {
      throw new Error('Pyodide is not loaded yet. Please wait a moment and try again.');
    }

    const testResults: TestResult[] = [];
    const outputs: string[] = [];

    for (const testCase of tests) {
      try {
        const [inputContent, expectedOutput] = await Promise.all([
          this.fetchFileContent(testCase.inputFile),
          this.fetchFileContent(testCase.expectedFile)
        ]);

        // Prepare environment
        this.pyodide.globals.clear();
        this.pyodide.runPython(`
import sys
from io import StringIO
import contextlib

# Capture stdin
class MockStdin:
    def __init__(self, input_data):
        self.input_data = input_data.split('\\n')
        self.index = 0
    
    def readline(self):
        if self.index < len(self.input_data):
            line = self.input_data[self.index] + '\\n'
            self.index += 1
            return line
        return ''

# Set up mock stdin
sys.stdin = MockStdin(${JSON.stringify(inputContent)})

# Capture stdout
stdout_capture = StringIO()
`);

        // Execute user code with stdout capture
        this.pyodide.runPython(`
with contextlib.redirect_stdout(stdout_capture):
    try:
${code.split('\n').map(line => `        ${line}`).join('\n')}
    except Exception as e:
        print(f"Error: {e}")
`);

        // Get output
        const output = this.pyodide.runPython('stdout_capture.getvalue()');
        const normalizedOutput = output.trim().replace(/\r\n/g, '\n');
        const normalizedExpected = expectedOutput.trim().replace(/\r\n/g, '\n');

        const passed = normalizedOutput === normalizedExpected;

        testResults.push({
          testCase: testCase.description,
          expected: expectedOutput,
          actual: output,
          passed,
          input: inputContent,
        });

        outputs.push(output);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        testResults.push({
          testCase: testCase.description,
          expected: 'Error loading test case',
          actual: `Error: ${errorMessage}`,
          passed: false,
          input: '',
        });
        outputs.push(`Error: ${errorMessage}`);
      }
    }

    return {
      output: outputs.join('\n---\n'),
      testResults,
    };
  }

  private async fetchFileContent(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filePath}`);
    }
    return await response.text();
  }
}