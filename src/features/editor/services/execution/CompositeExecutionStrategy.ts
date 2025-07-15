import { ExecutionStrategy, ExecutionBackend } from './interfaces';
import { TestCase, CodeExecutionResult } from '@/shared/types';

export class CompositeExecutionStrategy implements ExecutionStrategy {
  private backends: ExecutionBackend[];

  constructor(backends: ExecutionBackend[]) {
    if (backends.length === 0) {
      throw new Error('At least one backend must be provided');
    }
    this.backends = backends;
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    const availableBackends = this.backends.filter(backend => backend.isAvailable());
    
    if (availableBackends.length === 0) {
      throw new Error('No execution backends are available');
    }

    // Try each backend in order until one succeeds
    let lastError: Error | null = null;
    
    for (const backend of availableBackends) {
      try {
        const result = await backend.execute(code, tests);
        
        // Add metadata about which backend was used
        return {
          ...result,
          output: `${result.output}\n\n--- Executed using: ${backend.language} (${backend.constructor.name}) ---`,
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`Backend ${backend.constructor.name} failed:`, lastError);
        
        // Continue to next backend
        continue;
      }
    }

    // If all backends failed, throw the last error
    throw lastError || new Error('All execution backends failed');
  }

  isAvailable(): boolean {
    return this.backends.some(backend => backend.isAvailable());
  }

  requiresAuth(): boolean {
    // Return true if any available backend requires auth
    const availableBackends = this.backends.filter(backend => backend.isAvailable());
    return availableBackends.some(backend => backend.requiresAuth());
  }

  /**
   * Get status of all backends
   */
  getBackendStatus(): Array<{
    name: string;
    language: string;
    isAvailable: boolean;
    requiresAuth: boolean;
  }> {
    return this.backends.map(backend => ({
      name: backend.constructor.name,
      language: backend.language,
      isAvailable: backend.isAvailable(),
      requiresAuth: backend.requiresAuth(),
    }));
  }

  /**
   * Get the first available backend
   */
  getFirstAvailableBackend(): ExecutionBackend | null {
    return this.backends.find(backend => backend.isAvailable()) || null;
  }

  /**
   * Get all available backends
   */
  getAvailableBackends(): ExecutionBackend[] {
    return this.backends.filter(backend => backend.isAvailable());
  }

  /**
   * Add a backend to the end of the list
   */
  addBackend(backend: ExecutionBackend): void {
    this.backends.push(backend);
  }

  /**
   * Insert a backend at a specific position
   */
  insertBackend(index: number, backend: ExecutionBackend): void {
    this.backends.splice(index, 0, backend);
  }

  /**
   * Remove a backend by reference
   */
  removeBackend(backend: ExecutionBackend): boolean {
    const index = this.backends.indexOf(backend);
    if (index !== -1) {
      this.backends.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get all backends (for testing/debugging)
   */
  getAllBackends(): ExecutionBackend[] {
    return [...this.backends];
  }
}