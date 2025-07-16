import { WasmRuntime } from '../../interfaces';
import { TestCase, CodeExecutionResult, TestResult } from '@/shared/types';
import { logger } from '../logger';

class RubyRuntime implements WasmRuntime {
  public readonly language = 'ruby';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ruby: any = null;
  private _isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  constructor() {
    logger.info('Initializing RubyRuntime', { language: this.language });
    // Auto-load on construction
    this.load();
  }

  isLoaded(): boolean {
    return this._isLoaded;
  }

  async load(): Promise<void> {
    if (this._isLoaded) {
      logger.debug('RubyRuntime already loaded, skipping');
      return;
    }

    if (this.loadingPromise) {
      logger.debug('RubyRuntime loading already in progress, waiting');
      return this.loadingPromise;
    }

    logger.info('Starting RubyRuntime load');
    this.loadingPromise = this.loadRuby();
    await this.loadingPromise;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async loadRuby(): Promise<any> {
    try {
      if (typeof window === 'undefined') {
        const error = new Error(
          'Ruby can only be loaded in browser environment'
        );
        logger.error(
          'RubyRuntime load failed - not in browser environment',
          error
        );
        throw error;
      }

      logger.info('Loading Ruby WASM script from CDN');
      // Load Ruby WASM from CDN
      const rubyScript = document.createElement('script');
      rubyScript.src =
        'https://cdn.jsdelivr.net/npm/ruby-wasm@0.5.0/dist/ruby.js';

      await new Promise<void>((resolve, reject) => {
        rubyScript.onload = () => {
          logger.debug('Ruby script loaded successfully');
          resolve();
        };
        rubyScript.onerror = () => {
          const error = new Error('Failed to load Ruby script');
          logger.error('Ruby script load failed', error);
          reject(error);
        };
        document.head.appendChild(rubyScript);
      });

      logger.info('Initializing Ruby instance');
      // Initialize Ruby
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.ruby = await (window as any).Ruby();
      this._isLoaded = true;
      logger.info('RubyRuntime loaded successfully');
    } catch (error) {
      logger.error(
        'Failed to load RubyRuntime',
        error instanceof Error ? error : new Error(String(error))
      );
      throw error;
    }
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    if (!this.isLoaded()) {
      const error = new Error(
        'Ruby is not loaded yet. Please wait a moment and try again.'
      );
      logger.error('RubyRuntime execute called before loading', error);
      throw error;
    }

    logger.info('Executing Ruby code', {
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

        // Execute Ruby code with input/output handling
        const result = this.ruby.evalCode(code, {
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

    logger.info('Ruby code execution completed', {
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
export { RubyRuntime };
