import { WasmRuntime } from '../../interfaces';
import { TestCase, CodeExecutionResult, TestResult } from '@/shared/types';
import { logger } from '../logger';

class PyodideRuntime implements WasmRuntime {
  public readonly language = 'python';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pyodide: any = null;
  private _isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  constructor() {
    logger.info('Initializing PyodideRuntime', { language: this.language });
    // Auto-load on construction
    this.load();
  }

  isLoaded(): boolean {
    return this._isLoaded;
  }

  async load(): Promise<void> {
    if (this._isLoaded) {
      logger.debug('PyodideRuntime already loaded, skipping');
      return;
    }

    if (this.loadingPromise) {
      logger.debug('PyodideRuntime loading already in progress, waiting');
      return this.loadingPromise;
    }

    logger.info('Starting PyodideRuntime load');
    this.loadingPromise = this.loadPyodide();
    await this.loadingPromise;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async loadPyodide(): Promise<any> {
    try {
      if (typeof window === 'undefined') {
        const error = new Error(
          'Pyodide can only be loaded in browser environment'
        );
        logger.error(
          'PyodideRuntime load failed - not in browser environment',
          error
        );
        throw error;
      }

      logger.info('Loading Pyodide script from CDN');
      // Load Pyodide from CDN
      const pyodideScript = document.createElement('script');
      pyodideScript.src =
        'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';

      await new Promise<void>((resolve, reject) => {
        pyodideScript.onload = () => {
          logger.debug('Pyodide script loaded successfully');
          resolve();
        };
        pyodideScript.onerror = () => {
          const error = new Error('Failed to load Pyodide script');
          logger.error('Pyodide script load failed', error);
          reject(error);
        };
        document.head.appendChild(pyodideScript);
      });

      logger.info('Initializing Pyodide instance');
      // Initialize Pyodide
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.pyodide = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });

      this._isLoaded = true;
      logger.info('PyodideRuntime loaded successfully');
    } catch (error) {
      logger.error(
        'Failed to load PyodideRuntime',
        error instanceof Error ? error : new Error(String(error))
      );
      throw error;
    }
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    if (!this.isLoaded()) {
      const error = new Error(
        'Pyodide is not loaded yet. Please wait a moment and try again.'
      );
      logger.error('PyodideRuntime execute called before loading', error);
      throw error;
    }

    logger.info('Executing Python code', {
      codeLength: code.length,
      testCaseCount: tests.length,
      language: this.language,
    });

    const testResults: TestResult[] = [];
    const outputs: string[] = [];

    for (let i = 0; i < tests.length; i++) {
      const testCase = tests[i];
      logger.debug('Processing test case', {
        index: i,
        description: testCase.description,
        inputFile: testCase.inputFile,
        expectedFile: testCase.expectedFile,
      });

      try {
        const [inputContent, expectedOutput] = await Promise.all([
          this.fetchFileContent(testCase.inputFile),
          this.fetchFileContent(testCase.expectedFile),
        ]);

        logger.debug('Test case files loaded', {
          inputLength: inputContent.length,
          expectedLength: expectedOutput.length,
        });

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
${code
  .split('\n')
  .map((line) => `        ${line}`)
  .join('\n')}
    except Exception as e:
        print(f"Error: {e}")
`);

        // Get output
        const output = this.pyodide.runPython('stdout_capture.getvalue()');
        const normalizedOutput = output.trim().replace(/\r\n/g, '\n');
        const normalizedExpected = expectedOutput.trim().replace(/\r\n/g, '\n');

        const passed = normalizedOutput === normalizedExpected;

        logger.debug('Test case execution completed', {
          passed,
          actualLength: normalizedOutput.length,
          expectedLength: normalizedExpected.length,
        });

        testResults.push({
          testCase: testCase.description,
          expected: expectedOutput,
          actual: output,
          passed,
          input: inputContent,
        });

        outputs.push(output);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        logger.error(
          'Test case execution failed',
          error instanceof Error ? error : new Error(errorMessage),
          {
            testCase: testCase.description,
            index: i,
          }
        );
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

    const result = {
      output: outputs.join('\n---\n'),
      testResults,
    };

    logger.info('Python code execution completed', {
      testResultCount: testResults.length,
      passedCount: testResults.filter((r) => r.passed).length,
      failedCount: testResults.filter((r) => !r.passed).length,
    });

    return result;
  }

  private async fetchFileContent(filePath: string): Promise<string> {
    logger.debug('Fetching file content', { filePath });
    const response = await fetch(filePath);
    if (!response.ok) {
      const error = new Error(`Failed to fetch file: ${filePath}`);
      logger.error('File fetch failed', error, {
        filePath,
        status: response.status,
      });
      throw error;
    }
    const content = await response.text();
    logger.debug('File content fetched successfully', {
      filePath,
      contentLength: content.length,
    });
    return content;
  }
}

// Export for internal use only
export { PyodideRuntime };
