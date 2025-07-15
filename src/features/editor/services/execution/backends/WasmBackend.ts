import { ExecutionBackend } from '../interfaces';
import { TestCase, CodeExecutionResult } from '@/shared/types';
import { WasmManager } from '../WasmManager';

export class WasmBackend implements ExecutionBackend {
  public readonly language: string;
  private wasmManager: WasmManager;

  constructor(language: string, wasmManager: WasmManager) {
    this.language = language;
    this.wasmManager = wasmManager;
  }

  isAvailable(): boolean {
    return this.wasmManager.isLoaded(this.language);
  }

  requiresAuth(): boolean {
    return false; // WASM execution doesn't require authentication
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    if (!this.isAvailable()) {
      throw new Error(`WASM runtime for ${this.language} is not available`);
    }

    try {
      return await this.wasmManager.runCode(this.language, code, tests);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      return {
        output: `WASM execution failed: ${errorMessage}`,
        testResults: tests.map(test => ({
          testCase: test.description,
          expected: 'Error',
          actual: `Error: ${errorMessage}`,
          passed: false,
          input: '',
        })),
      };
    }
  }
}