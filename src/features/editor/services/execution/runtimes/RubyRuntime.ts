import { WasmRuntime } from '../interfaces';
import { TestCase, CodeExecutionResult, TestResult } from '@/shared/types';

export class RubyRuntime implements WasmRuntime {
  public readonly language = 'ruby';
  private ruby: any = null;
  private _isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  constructor() {
    this.load();
  }

  isLoaded(): boolean {
    return this._isLoaded;
  }

  async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this.loadRubyWasm();
    await this.loadingPromise;
  }

  private async loadRubyWasm(): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        throw new Error('Ruby WASM can only be loaded in browser environment');
      }

      // Note: This is a placeholder implementation
      // Ruby WASM is still experimental and not as stable as Python/JS
      // For production, consider using ruby.wasm or ruby-wasm-wasi
      
      console.warn('Ruby WASM support is experimental and not fully implemented');
      
      // For now, mark as loaded but not functional
      this._isLoaded = false;
      throw new Error('Ruby WASM runtime not yet implemented');
    } catch (error) {
      console.error('Failed to load Ruby WASM:', error);
      throw error;
    }
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    throw new Error('Ruby WASM execution not yet implemented. Please use cloud fallback.');
  }

  private async fetchFileContent(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filePath}`);
    }
    return await response.text();
  }
}