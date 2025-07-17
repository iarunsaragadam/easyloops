import { TestCase, CodeExecutionResult } from '@/shared/types';

export interface WasmRuntime {
  language: string;
  isLoaded(): boolean;
  load(): Promise<void>;
  execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult>;
}

export interface ExecutionBackend {
  language: string;
  isAvailable(): boolean;
  requiresAuth(): boolean;
  execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult>;
}

export interface ExecutionStrategy {
  execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult>;
  isAvailable(): boolean;
  requiresAuth(): boolean;
}