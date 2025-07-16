import { ExecutionStrategy, ExecutionBackend } from './interfaces';
import { TestCase, CodeExecutionResult } from '@/shared/types';
import { logger } from './internal/logger';

export class CompositeExecutionStrategy implements ExecutionStrategy {
  private backends: ExecutionBackend[];

  constructor(backends: ExecutionBackend[]) {
    if (backends.length === 0) {
      throw new Error('At least one backend must be provided');
    }
    this.backends = backends;
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    // Check availability asynchronously to ensure runtimes are loaded
    const availableBackends: ExecutionBackend[] = [];

    for (const backend of this.backends) {
      try {
        // For WASM backends, use async availability check
        if (
          'isAvailableAsync' in backend &&
          typeof (
            backend as ExecutionBackend & {
              isAvailableAsync?: () => Promise<boolean>;
            }
          ).isAvailableAsync === 'function'
        ) {
          const isAvailable = await (
            backend as ExecutionBackend & {
              isAvailableAsync: () => Promise<boolean>;
            }
          ).isAvailableAsync();
          if (isAvailable) {
            availableBackends.push(backend);
          }
        } else {
          // For other backends, use sync availability check
          if (backend.isAvailable()) {
            availableBackends.push(backend);
          }
        }
      } catch (error) {
        logger.warn(
          `Error checking availability for ${backend.constructor.name}`,
          {
            error: error instanceof Error ? error.message : String(error),
            backendName: backend.constructor.name,
          }
        );
        // Continue checking other backends
      }
    }

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
        logger.warn(`Backend ${backend.constructor.name} failed`, {
          error: lastError.message,
          stack: lastError.stack,
          backendName: backend.constructor.name,
        });

        // Continue to next backend
        continue;
      }
    }

    // If all backends failed, throw the last error
    throw lastError || new Error('All execution backends failed');
  }

  isAvailable(): boolean {
    return this.backends.some((backend) => backend.isAvailable());
  }

  async isAvailableAsync(): Promise<boolean> {
    for (const backend of this.backends) {
      try {
        // For WASM backends, use async availability check
        if (
          'isAvailableAsync' in backend &&
          typeof (
            backend as ExecutionBackend & {
              isAvailableAsync?: () => Promise<boolean>;
            }
          ).isAvailableAsync === 'function'
        ) {
          const isAvailable = await (
            backend as ExecutionBackend & {
              isAvailableAsync: () => Promise<boolean>;
            }
          ).isAvailableAsync();
          if (isAvailable) {
            return true;
          }
        } else {
          // For other backends, use sync availability check
          if (backend.isAvailable()) {
            return true;
          }
        }
      } catch (error) {
        console.warn(
          `Error checking availability for ${backend.constructor.name}:`,
          error
        );
        // Continue checking other backends
      }
    }
    return false;
  }

  requiresAuth(): boolean {
    // Check if any available backend requires authentication
    // If we have a WASM backend that's available, we don't need auth
    // If we only have Judge0 backends that are available, we need auth
    const availableBackends = this.backends.filter((backend) =>
      backend.isAvailable()
    );

    if (availableBackends.length === 0) {
      // If no backends are available, check if any require auth
      // This is for languages that only have auth-required backends
      return this.backends.some((backend) => backend.requiresAuth());
    }

    // If we have available backends, check if any of them don't require auth
    // If any available backend doesn't require auth, then the language doesn't require auth
    return !availableBackends.some((backend) => !backend.requiresAuth());
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
    return this.backends.map((backend) => ({
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
    return this.backends.find((backend) => backend.isAvailable()) || null;
  }

  /**
   * Get all available backends
   */
  getAvailableBackends(): ExecutionBackend[] {
    return this.backends.filter((backend) => backend.isAvailable());
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
