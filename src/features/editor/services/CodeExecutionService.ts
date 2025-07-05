import {
  TestCase,
  TestResult,
  CodeExecutionResult,
  PyodideManager,
} from '@/shared/types';
import { User } from 'firebase/auth';

export interface ExecutionStrategy {
  execute(code: string, testCases: TestCase[]): Promise<CodeExecutionResult>;
  isAvailable(): boolean;
  requiresAuth(): boolean;
}

export class PyodideExecutionStrategy implements ExecutionStrategy {
  constructor(private pyodideManager: PyodideManager) {}

  async execute(
    code: string,
    testCases: TestCase[]
  ): Promise<CodeExecutionResult> {
    if (!this.isAvailable()) {
      throw new Error(
        'Pyodide is not loaded yet. Please wait a moment and try again.'
      );
    }

    return await this.pyodideManager.runCode(code, testCases);
  }

  isAvailable(): boolean {
    return this.pyodideManager.isLoaded;
  }

  requiresAuth(): boolean {
    return false;
  }
}

export class GoExecutionStrategy implements ExecutionStrategy {
  constructor(private user: User | null) {}

  async execute(
    code: string,
    testCases: TestCase[]
  ): Promise<CodeExecutionResult> {
    if (!this.isAvailable()) {
      throw new Error('Authentication required for Go code execution');
    }

    const testResults: TestResult[] = [];
    const allOutputs: string[] = [];

    for (const testCase of testCases) {
      try {
        const [inputContent, expectedOutput] = await Promise.all([
          this.fetchTestCaseContent(testCase.inputFile),
          this.fetchTestCaseContent(testCase.expectedFile),
        ]);

        const result = await this.executeGoCode(code, inputContent);

        const normalizedExpected = expectedOutput.trim().replace(/\r\n/g, '\n');
        const normalizedActual = result.output.trim().replace(/\r\n/g, '\n');

        const passed = !result.error && normalizedActual === normalizedExpected;

        testResults.push({
          testCase: testCase.description,
          expected: expectedOutput,
          actual: result.error ? `Error: ${result.error}` : result.output,
          passed,
          input: inputContent,
        });

        allOutputs.push(
          result.error ? `Error: ${result.error}` : result.output
        );
      } catch (error) {
        testResults.push({
          testCase: testCase.description,
          expected: 'Error loading test case',
          actual: `Error: ${error}`,
          passed: false,
          input: '',
        });
        allOutputs.push(`Error: ${error}`);
      }
    }

    const mainOutput =
      testResults.length > 0
        ? testResults
            .map((r) => (r.passed ? `✅ ${r.testCase}` : `❌ ${r.testCase}`))
            .join('\n')
        : 'No test cases executed';

    return {
      output: mainOutput,
      testResults,
    };
  }

  isAvailable(): boolean {
    return !!this.user;
  }

  requiresAuth(): boolean {
    return true;
  }

  private async fetchTestCaseContent(filePath: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(filePath, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch file: ${filePath} (${response.status})`
        );
      }

      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Timeout fetching ${filePath}`);
      }
      throw error;
    }
  }

  private async executeGoCode(
    code: string,
    inputContent: string
  ): Promise<{ output: string; error?: string }> {
    const response = await fetch('/api/execute/go/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        code,
        input: inputContent,
        timestamp: new Date().getTime(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        output: '',
        error: result.error || 'Failed to execute Go code',
      };
    }

    return {
      output: result.output || '',
      error: result.error,
    };
  }
}

export class Judge0ExecutionStrategy implements ExecutionStrategy {
  constructor(
    private user: User | null,
    private judge0Url: string,
    private languageId: number
  ) {}

  async execute(
    code: string,
    testCases: TestCase[]
  ): Promise<CodeExecutionResult> {
    if (!this.isAvailable()) {
      throw new Error('Authentication required for code execution');
    }

    // const input = testCases.length > 0 ? testCases[0].inputFile : "";

    // This would integrate with Judge0 API
    // For now, return a mock result
    const testResults = testCases.map((testCase) => ({
      testCase: testCase.description,
      expected: 'Expected output from Judge0',
      actual: 'Mock output',
      passed: false,
      input: testCase.inputFile,
    }));

    return {
      output: 'Mock Judge0 execution result',
      testResults,
    };
  }

  isAvailable(): boolean {
    return !!this.user;
  }

  requiresAuth(): boolean {
    return true;
  }
}

export class CodeExecutionService {
  private strategies: Map<string, ExecutionStrategy> = new Map();

  constructor(
    pyodideManager: PyodideManager,
    user: User | null,
    judge0Url: string = 'https://judge0-ce.p.rapidapi.com'
  ) {
    this.strategies.set('python', new PyodideExecutionStrategy(pyodideManager));
    this.strategies.set('go', new GoExecutionStrategy(user));
    this.strategies.set('c', new Judge0ExecutionStrategy(user, judge0Url, 50));
    this.strategies.set(
      'cpp',
      new Judge0ExecutionStrategy(user, judge0Url, 54)
    );
    this.strategies.set(
      'javascript',
      new Judge0ExecutionStrategy(user, judge0Url, 63)
    );
    this.strategies.set(
      'java',
      new Judge0ExecutionStrategy(user, judge0Url, 62)
    );
    this.strategies.set(
      'rust',
      new Judge0ExecutionStrategy(user, judge0Url, 73)
    );
  }

  async executeCode(
    code: string,
    testCases: TestCase[],
    language: string
  ): Promise<CodeExecutionResult> {
    const strategy = this.strategies.get(language);

    if (!strategy) {
      throw new Error(`Unsupported language: ${language}`);
    }

    if (!strategy.isAvailable()) {
      throw new Error(`Language ${language} is not available`);
    }

    return await strategy.execute(code, testCases);
  }

  isLanguageAvailable(language: string): boolean {
    const strategy = this.strategies.get(language);
    return strategy?.isAvailable() ?? false;
  }

  requiresAuth(language: string): boolean {
    const strategy = this.strategies.get(language);
    return strategy?.requiresAuth() ?? false;
  }
}
