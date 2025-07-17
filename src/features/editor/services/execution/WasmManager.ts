import { WasmRuntime } from './interfaces';
import { TestCase, CodeExecutionResult } from '@/shared/types';
import { PyodideRuntime, QuickJsRuntime } from './internal/wasm-runtimes';

export class WasmManager {
  private runtimes: Map<string, WasmRuntime> = new Map();
  private loadingPromises: Map<string, Promise<void>> = new Map();

  constructor(runtimeList: WasmRuntime[]) {
    for (const runtime of runtimeList) {
      this.runtimes.set(runtime.language, runtime);
      // Don't auto-load on construction - make it lazy
      // this.loadingPromises.set(
      //   runtime.language,
      //   runtime.load().catch((error) => {
      //     console.warn(
      //       `Failed to load runtime for ${runtime.language}:`,
      //       error
      //     );
      //     // Dont throw, just log the error
      //   })
      // );
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
    ];

    return new WasmManager(runtimes);
  }

  /**
   * Check if a runtime is loaded for the given language
   * This method waits for the loading to complete if it's still in progress
   */
  async isLoaded(language: string): Promise<boolean> {
    const runtime = this.runtimes.get(language);
    if (!runtime) {
      return false;
    }

    // Wait for the loading promise to complete
    const loadingPromise = this.loadingPromises.get(language);
    if (loadingPromise) {
      try {
        await loadingPromise;
      } catch {
        // Loading failed, return false
        return false;
      }
    }

    return runtime.isLoaded();
  }

  /**
   * Synchronous check for runtime loading status
   * This doesn't wait for loading to complete
   */
  isLoadedSync(language: string): boolean {
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

    const loadingPromise = runtime.load();
    this.loadingPromises.set(language, loadingPromise);
    await loadingPromise;
  }

  /**
   * Execute code using the runtime for the given language
   */
  async runCode(
    language: string,
    code: string,
    tests: TestCase[]
  ): Promise<CodeExecutionResult> {
    const runtime = this.runtimes.get(language);
    if (!runtime) {
      throw new Error(`Unsupported language: ${language}`);
    }

    // Ensure the runtime is loaded before executing
    if (!(await this.isLoaded(language))) {
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
    const loadPromises = Array.from(this.runtimes.values()).map((runtime) =>
      runtime.load().catch((error) => {
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
    // Don't auto-load on addition - make it lazy
    // this.loadingPromises.set(
    //   runtime.language,
    //   runtime.load().catch((error) => {
    //     console.warn(`Failed to load runtime for ${runtime.language}:`, error);
    //   })
    // );
  }

  /**
   * Remove a runtime
   */
  removeRuntime(language: string): boolean {
    this.loadingPromises.delete(language);
    return this.runtimes.delete(language);
  }
}
