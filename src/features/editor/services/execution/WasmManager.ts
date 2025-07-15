import { WasmRuntime } from './interfaces';
import { TestCase, CodeExecutionResult } from '@/shared/types';
import { PyodideRuntime } from './runtimes/PyodideRuntime';
import { QuickJsRuntime } from './runtimes/QuickJsRuntime';
import { RubyRuntime } from './runtimes/RubyRuntime';

export class WasmManager {
  private runtimes: Map<string, WasmRuntime> = new Map();

  constructor(runtimeList: WasmRuntime[]) {
    for (const runtime of runtimeList) {
      this.runtimes.set(runtime.language, runtime);
    }
  }

  /**
   * Factory method to create a WasmManager with default runtimes
   */
  static default(): WasmManager {
    const runtimes: WasmRuntime[] = [
      new PyodideRuntime(),
      new QuickJsRuntime('javascript'),
      new QuickJsRuntime('typescript'),
      new RubyRuntime(),
    ];

    return new WasmManager(runtimes);
  }

  /**
   * Check if a runtime is loaded for the given language
   */
  isLoaded(language: string): boolean {
    const runtime = this.runtimes.get(language);
    return runtime ? runtime.isLoaded() : false;
  }

  /**
   * Load a runtime for the given language
   */
  async load(language: string): Promise<void> {
    const runtime = this.runtimes.get(language);
    if (!runtime) {
      throw new Error(`Unsupported language: ${language}`);
    }

    await runtime.load();
  }

  /**
   * Execute code using the runtime for the given language
   */
  async runCode(language: string, code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    const runtime = this.runtimes.get(language);
    if (!runtime) {
      throw new Error(`Unsupported language: ${language}`);
    }

    if (!runtime.isLoaded()) {
      throw new Error(`Runtime for ${language} is not loaded yet`);
    }

    return await runtime.execute(code, tests);
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): string[] {
    return Array.from(this.runtimes.keys());
  }

  /**
   * Get the status of all runtimes
   */
  getRuntimeStatus(): Record<string, { loaded: boolean; language: string }> {
    const status: Record<string, { loaded: boolean; language: string }> = {};
    
    for (const [language, runtime] of this.runtimes) {
      status[language] = {
        loaded: runtime.isLoaded(),
        language: runtime.language,
      };
    }

    return status;
  }

  /**
   * Load all runtimes in parallel
   */
  async loadAll(): Promise<void> {
    const loadPromises = Array.from(this.runtimes.values()).map(runtime => 
      runtime.load().catch(error => {
        console.warn(`Failed to load runtime for ${runtime.language}:`, error);
        // Don't throw, just log the error
      })
    );

    await Promise.all(loadPromises);
  }

  /**
   * Add a new runtime
   */
  addRuntime(runtime: WasmRuntime): void {
    this.runtimes.set(runtime.language, runtime);
  }

  /**
   * Remove a runtime
   */
  removeRuntime(language: string): boolean {
    return this.runtimes.delete(language);
  }
}