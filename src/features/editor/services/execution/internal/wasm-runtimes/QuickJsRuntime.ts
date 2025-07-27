import { WasmRuntime } from '../../interfaces';
import { TestCase, CodeExecutionResult, TestResult } from '@/shared/types';
import { logger } from '../logger';

class QuickJsRuntime implements WasmRuntime {
  public readonly language: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private quickjs: any = null;
  private _isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  constructor(language: string) {
    this.language = language;
    logger.info('Initializing QuickJsRuntime', { language: this.language });
    // Don't auto-load on construction - make it lazy
    // this.load();
  }

  isLoaded(): boolean {
    return this._isLoaded;
  }

  async load(): Promise<void> {
    if (this._isLoaded) {
      logger.debug('QuickJsRuntime already loaded, skipping', {
        language: this.language,
      });
      return;
    }

    if (this.loadingPromise) {
      logger.debug('QuickJsRuntime loading already in progress, waiting', {
        language: this.language,
      });
      return this.loadingPromise;
    }

    logger.info('Starting QuickJsRuntime load', { language: this.language });
    this.loadingPromise = this.loadQuickJs();
    await this.loadingPromise;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async loadQuickJs(): Promise<any> {
    try {
      if (typeof window === 'undefined') {
        const error = new Error(
          'QuickJS can only be loaded in browser environment'
        );
        logger.error(
          'QuickJsRuntime load failed - not in browser environment',
          error,
          { language: this.language }
        );
        throw error;
      }

      logger.info('Loading QuickJS script from CDN', {
        language: this.language,
      });
      // Load QuickJS from CDN
      const quickjsScript = document.createElement('script');
      quickjsScript.src =
        'https://cdn.jsdelivr.net/npm/quickjs-emscripten@0.24.0/dist/quickjs.js';

      await new Promise<void>((resolve, reject) => {
        quickjsScript.onload = () => {
          logger.debug('QuickJS script loaded successfully', {
            language: this.language,
          });
          resolve();
        };
        quickjsScript.onerror = () => {
          const error = new Error('Failed to load QuickJS script');
          logger.error('QuickJS script load failed', error, {
            language: this.language,
          });
          reject(error);
        };
        document.head.appendChild(quickjsScript);
      });

      logger.info('Initializing QuickJS instance', { language: this.language });
      // Initialize QuickJS
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.quickjs = await (window as any).QuickJS();
      this._isLoaded = true;
      logger.info('QuickJsRuntime loaded successfully', {
        language: this.language,
      });
    } catch (error) {
      logger.error(
        'Failed to load QuickJsRuntime',
        error instanceof Error ? error : new Error(String(error)),
        { language: this.language }
      );
      throw error;
    }
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    if (!this.isLoaded()) {
      const error = new Error(
        'QuickJS is not loaded yet. Please wait a moment and try again.'
      );
      logger.error('QuickJsRuntime execute called before loading', error, {
        language: this.language,
      });
      throw error;
    }

    logger.info('Executing QuickJS code', {
      language: this.language,
      codeLength: code.length,
      testCaseCount: tests.length,
    });

    const testResults: TestResult[] = [];
    const outputs: string[] = [];

    for (let i = 0; i < tests.length; i++) {
      const testCase = tests[i];
      logger.debug('Processing test case', {
        language: this.language,
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
          language: this.language,
          inputLength: inputContent.length,
          expectedLength: expectedOutput.length,
        });

        // Execute code with input/output handling
        const result = this.quickjs.evalCode(code, {
          input: inputContent,
          expected: expectedOutput,
        });

        const output = result.output || '';
        const normalizedOutput = output.trim().replace(/\r\n/g, '\n');
        const normalizedExpected = expectedOutput.trim().replace(/\r\n/g, '\n');

        const passed = normalizedOutput === normalizedExpected;

        logger.debug('Test case execution completed', {
          language: this.language,
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
            language: this.language,
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

    logger.info('QuickJS code execution completed', {
      language: this.language,
      testResultCount: testResults.length,
      passedCount: testResults.filter((r) => r.passed).length,
      failedCount: testResults.filter((r) => !r.passed).length,
    });

    return result;
  }

  private async fetchFileContent(filePath: string): Promise<string> {
    logger.debug('Fetching file content', {
      language: this.language,
      filePath,
    });
    const response = await fetch(filePath);
    if (!response.ok) {
      const error = new Error(`Failed to fetch file: ${filePath}`);
      logger.error('File fetch failed', error, {
        language: this.language,
        filePath,
        status: response.status,
      });
      throw error;
    }
    const content = await response.text();
    logger.debug('File content fetched successfully', {
      language: this.language,
      filePath,
      contentLength: content.length,
    });
    return content;
  }
}

// Export for internal use only
export { QuickJsRuntime };
