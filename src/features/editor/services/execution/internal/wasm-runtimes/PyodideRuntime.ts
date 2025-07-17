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
    this.language = 'python';
    logger.info('Initializing PyodideRuntime', { language: this.language });
    // Don't auto-load on construction - make it lazy
    // this.load();
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
      // Load Pyodide from CDN with timeout
      const pyodideScript = document.createElement('script');
      pyodideScript.src =
        'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';

      const scriptLoadPromise = new Promise<void>((resolve, reject) => {
        pyodideScript.onload = () => {
          logger.debug('Pyodide script loaded successfully');
          resolve();
        };
        pyodideScript.onerror = () => {
          const error = new Error('Failed to load Pyodide script from CDN');
          logger.error('Pyodide script load failed', error);
          reject(error);
        };
        document.head.appendChild(pyodideScript);
      });

      // Add timeout for script loading (30 seconds)
      const scriptLoadWithTimeout = Promise.race([
        scriptLoadPromise,
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error('Pyodide script load timeout (30s)')),
            30000
          )
        ),
      ]);

      await scriptLoadWithTimeout;

      logger.info('Initializing Pyodide instance');
      // Initialize Pyodide with timeout (60 seconds)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initPromise = (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });

      this.pyodide = await Promise.race([
        initPromise,
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error('Pyodide initialization timeout (60s)')),
            60000
          )
        ),
      ]);

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

        // Set up stdin/stdout redirection for this specific test case
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (this.pyodide as any).runPythonAsync(`
import sys
from io import StringIO
sys._stdin = sys.stdin
sys._stdout = sys.stdout
sys.stdin = StringIO(${JSON.stringify(inputContent)})
sys.stdout = StringIO()
`);

        // Run the users code
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (this.pyodide as any).runPythonAsync(code);

        // Get the output for this test case
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const actualOutput = await (this.pyodide as any).runPythonAsync(
          'sys.stdout.getvalue()'
        );

        // Restore stdin/stdout
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (this.pyodide as any).runPythonAsync(
          'sys.stdin = sys._stdin; sys.stdout = sys._stdout'
        );

        // Normalize outputs
        const actual = actualOutput
          ? actualOutput.trim().replace(/\r\n/g, '\n')
          : '';
        const expected = expectedOutput.trim().replace(/\r\n/g, '\n');
        const passed = actual === expected;

        logger.debug('Test case execution completed', {
          passed,
          actualLength: actual.length,
          expectedLength: expected.length,
        });

        testResults.push({
          testCase: testCase.description,
          expected: expectedOutput,
          actual: actualOutput || '',
          passed,
          input: inputContent,
        });

        outputs.push(actualOutput || '');
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

    // Clean up memory after execution
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.pyodide as any).globals.clear();
    } catch (error) {
      // Ignore cleanup errors
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
