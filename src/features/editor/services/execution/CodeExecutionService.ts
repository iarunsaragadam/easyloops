import {
  TestCase,
  CodeExecutionResult,
  ExecutionMode,
  SubmissionResult,
} from '@/shared/types';
import { User } from 'firebase/auth';
import { submissionService } from '../SubmissionService';
import { ExecutionStrategy, ExecutionBackend } from './interfaces';
import { CompositeExecutionStrategy } from './CompositeExecutionStrategy';
import { WasmBackend } from './backends/WasmBackend';
import { Judge0Backend } from './backends/Judge0Backend';
import { WasmManager } from './WasmManager';

// Judge0 Language IDs
const JUDGE0_LANGUAGE_IDS = {
  c: 50,
  cpp: 54,
  java: 62,
  javascript: 63,
  python: 71,
  rust: 73,
  go: 60,
  ruby: 72,
} as const;

export class CodeExecutionService {
  private strategies: Map<string, ExecutionStrategy> = new Map();
  private wasmManager: WasmManager;

  constructor(
    user: User | null,
    judge0Url: string = 'https://judge0-ce.p.rapidapi.com',
    wasmManager?: WasmManager
  ) {
    this.wasmManager = wasmManager || WasmManager.default();
    this.initializeStrategies(user, judge0Url);
  }

  private initializeStrategies(user: User | null, judge0Url: string): void {
    // Register Python: WASM first, then Judge0 fallback
    this.register('python', [
      new WasmBackend('python', this.wasmManager),
      new Judge0Backend('python', judge0Url, JUDGE0_LANGUAGE_IDS.python, user),
    ]);

    // Register JavaScript: WASM first, then Judge0 fallback
    this.register('javascript', [
      new WasmBackend('javascript', this.wasmManager),
      new Judge0Backend(
        'javascript',
        judge0Url,
        JUDGE0_LANGUAGE_IDS.javascript,
        user
      ),
    ]);

    // Register TypeScript: WASM first, then Judge0 fallback
    this.register('typescript', [
      new WasmBackend('typescript', this.wasmManager),
      new Judge0Backend(
        'javascript',
        judge0Url,
        JUDGE0_LANGUAGE_IDS.javascript,
        user
      ),
    ]);

    // Register Ruby: WASM first, then Judge0 fallback
    this.register('ruby', [
      new WasmBackend('ruby', this.wasmManager),
      new Judge0Backend('ruby', judge0Url, JUDGE0_LANGUAGE_IDS.ruby, user),
    ]);

    // Register Go: Judge0 only (no WASM support yet)
    this.register('go', [
      new Judge0Backend('go', judge0Url, JUDGE0_LANGUAGE_IDS.go, user),
    ]);

    // Register C: Judge0 only
    this.register('c', [
      new Judge0Backend('c', judge0Url, JUDGE0_LANGUAGE_IDS.c, user),
    ]);

    // Register C++: Judge0 only
    this.register('cpp', [
      new Judge0Backend('cpp', judge0Url, JUDGE0_LANGUAGE_IDS.cpp, user),
    ]);

    // Register Java: Judge0 only
    this.register('java', [
      new Judge0Backend('java', judge0Url, JUDGE0_LANGUAGE_IDS.java, user),
    ]);

    // Register Rust: Judge0 only
    this.register('rust', [
      new Judge0Backend('rust', judge0Url, JUDGE0_LANGUAGE_IDS.rust, user),
    ]);
  }

  /**
   * Register a new language with multiple backends
   */
  private register(language: string, backends: ExecutionBackend[]): void {
    if (backends.length === 0) {
      throw new Error(`No backends provided for language: ${language}`);
    }

    const strategy = new CompositeExecutionStrategy(backends);
    this.strategies.set(language, strategy);
  }

  /**
   * Execute code for a given language
   */
  async executeCode(
    code: string,
    testCases: TestCase[],
    language: string,
    mode: ExecutionMode = {
      type: 'RUN',
      testCaseLimit: 2,
      createSnapshot: false,
    }
  ): Promise<CodeExecutionResult> {
    const strategy = this.strategies.get(language);

    if (!strategy) {
      throw new Error(`Unsupported language: ${language}`);
    }

    if (!strategy.isAvailable()) {
      throw new Error(`Language ${language} is not available`);
    }

    // Apply test case limit for RUN mode
    const casesToRun =
      mode.type === 'RUN' && mode.testCaseLimit
        ? testCases.slice(0, mode.testCaseLimit)
        : testCases;

    const startTime = Date.now();
    const result = await strategy.execute(code, casesToRun);
    const executionTime = Date.now() - startTime;

    // Format output based on execution mode
    const formattedOutput = this.formatOutput(result, mode);

    return {
      ...result,
      output: formattedOutput,
      executionTime,
    };
  }

  /**
   * Execute code and create a submission
   */
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

  /**
   * Check if a language is available
   */
  isLanguageAvailable(language: string): boolean {
    const strategy = this.strategies.get(language);
    return strategy?.isAvailable() ?? false;
  }

  /**
   * Check if a language requires authentication
   */
  requiresAuth(language: string): boolean {
    const strategy = this.strategies.get(language);
    return strategy?.requiresAuth() ?? false;
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): string[] {
    return Array.from(this.strategies.keys());
  }

  /**
   * Get detailed status of all languages and their backends
   */
  getLanguageStatus(): Record<
    string,
    {
      available: boolean;
      requiresAuth: boolean;
      backends: string[] | unknown;
    }
  > {
    const status: Record<
      string,
      {
        available: boolean;
        requiresAuth: boolean;
        backends: string[] | unknown;
      }
    > = {};

    for (const [language, strategy] of this.strategies) {
      if (strategy instanceof CompositeExecutionStrategy) {
        status[language] = {
          available: strategy.isAvailable(),
          requiresAuth: strategy.requiresAuth(),
          backends: strategy.getBackendStatus(),
        };
      } else {
        status[language] = {
          available: strategy.isAvailable(),
          requiresAuth: strategy.requiresAuth(),
          backends: ['Unknown'],
        };
      }
    }

    return status;
  }

  /**
   * Get WASM runtime status
   */
  getWasmStatus(): Record<string, { loaded: boolean; language: string }> {
    return this.wasmManager.getRuntimeStatus();
  }

  /**
   * Load all WASM runtimes
   */
  async loadWasmRuntimes(): Promise<void> {
    await this.wasmManager.loadAll();
  }

  private formatOutput(
    result: CodeExecutionResult,
    mode: ExecutionMode
  ): string {
    const passedCount = result.testResults.filter((r) => r.passed).length;
    const totalCount = result.testResults.length;

    const statusLines = result.testResults.map((r) =>
      r.passed ? `✅ ${r.testCase}` : `❌ ${r.testCase}`
    );

    const resultSummary =
      mode.type === 'RUN'
        ? `Sample Test Results (${passedCount}/${totalCount} passed):`
        : `Full Evaluation Results (${passedCount}/${totalCount} passed):`;

    return `${resultSummary}\n${statusLines.join('\n')}\n\n${result.output}`;
  }
}
