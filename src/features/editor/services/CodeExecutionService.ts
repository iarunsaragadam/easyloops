import {
  TestCase,
  TestResult,
  CodeExecutionResult,
  PyodideManager,
  ExecutionMode,
  SubmissionResult,
} from '@/shared/types';
import { User } from 'firebase/auth';
import { submissionService } from './SubmissionService';

export interface ExecutionStrategy {
  execute(
    code: string,
    testCases: TestCase[],
    mode: ExecutionMode
  ): Promise<CodeExecutionResult>;
  isAvailable(): boolean;
  requiresAuth(): boolean;
}

export class PyodideExecutionStrategy implements ExecutionStrategy {
  constructor(private pyodideManager: PyodideManager) {}

  async execute(
    code: string,
    testCases: TestCase[],
    mode: ExecutionMode
  ): Promise<CodeExecutionResult> {
    if (!this.isAvailable()) {
      throw new Error(
        'Pyodide is not loaded yet. Please wait a moment and try again.'
      );
    }

    // Apply test case limit for RUN mode
    const casesToRun = mode.type === 'RUN' && mode.testCaseLimit
      ? testCases.slice(0, mode.testCaseLimit)
      : testCases;

    return await this.pyodideManager.runCode(code, casesToRun);
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
    testCases: TestCase[],
    mode: ExecutionMode
  ): Promise<CodeExecutionResult> {
    if (!this.isAvailable()) {
      throw new Error('Authentication required for Go code execution');
    }

    // Apply test case limit for RUN mode
    const casesToRun = mode.type === 'RUN' && mode.testCaseLimit
      ? testCases.slice(0, mode.testCaseLimit)
      : testCases;

    const testResults: TestResult[] = [];
    const allOutputs: string[] = [];

    for (const testCase of casesToRun) {
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

    const mainOutput = this.formatOutput(testResults, mode);

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

  private formatOutput(testResults: TestResult[], mode: ExecutionMode): string {
    if (testResults.length === 0) {
      return 'No test cases executed';
    }

    const passedCount = testResults.filter(r => r.passed).length;
    const totalCount = testResults.length;
    
    const statusLines = testResults.map(r => 
      r.passed ? `✅ ${r.testCase}` : `❌ ${r.testCase}`
    );

    if (mode.type === 'RUN') {
      return `Sample Test Results (${passedCount}/${totalCount} passed):\n${statusLines.join('\n')}`;
    } else {
      return `Full Evaluation Results (${passedCount}/${totalCount} passed):\n${statusLines.join('\n')}`;
    }
  }

  private async fetchTestCaseContent(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filePath}`);
    }
    return await response.text();
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
    testCases: TestCase[],
    mode: ExecutionMode
  ): Promise<CodeExecutionResult> {
    if (!this.isAvailable()) {
      throw new Error('Authentication required for code execution');
    }

    // Apply test case limit for RUN mode
    const casesToRun = mode.type === 'RUN' && mode.testCaseLimit
      ? testCases.slice(0, mode.testCaseLimit)
      : testCases;

    const testResults = casesToRun.map((testCase) => ({
      testCase: testCase.description,
      expected: 'Expected output from Judge0',
      actual: 'Mock output',
      passed: false,
      input: testCase.inputFile,
    }));

    const passedCount = testResults.filter(r => r.passed).length;
    const totalCount = testResults.length;
    
    const output = mode.type === 'RUN' 
      ? `Sample Test Results (${passedCount}/${totalCount} passed)`
      : `Full Evaluation Results (${passedCount}/${totalCount} passed)`;

    return {
      output,
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
    language: string,
    mode: ExecutionMode = { type: 'RUN', testCaseLimit: 2, createSnapshot: false }
  ): Promise<CodeExecutionResult> {
    const strategy = this.strategies.get(language);

    if (!strategy) {
      throw new Error(`Unsupported language: ${language}`);
    }

    if (!strategy.isAvailable()) {
      throw new Error(`Language ${language} is not available`);
    }

    const startTime = Date.now();
    const result = await strategy.execute(code, testCases, mode);
    const executionTime = Date.now() - startTime;

    return {
      ...result,
      executionTime,
    };
  }

  async executeAndSubmit(
    code: string,
    testCases: TestCase[],
    language: string,
    questionId: string
  ): Promise<{ result: CodeExecutionResult; submission: SubmissionResult }> {
    const mode: ExecutionMode = { type: 'SUBMIT', createSnapshot: true };
    
    const startTime = Date.now();
    const result = await this.executeCode(code, testCases, language, mode);
    const executionTime = Date.now() - startTime;

    const submission = submissionService.createSubmission(
      code,
      questionId,
      language,
      result.testResults,
      executionTime
    );

    await submissionService.saveSubmission(submission);

    return {
      result: {
        ...result,
        executionTime,
      },
      submission,
    };
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
