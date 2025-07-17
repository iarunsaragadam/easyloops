import { CompositeExecutionStrategy } from '../CompositeExecutionStrategy';
import { ExecutionBackend } from '../interfaces';
import { TestCase } from '@/shared/types';

// Mock backend classes
class MockWasmBackend implements ExecutionBackend {
  language = 'python';
  private available = true;

  constructor(available = true) {
    this.available = available;
  }

  isAvailable(): boolean {
    return this.available;
  }

  requiresAuth(): boolean {
    return false;
  }

  async execute(code: string, tests: TestCase[]) {
    if (!this.available) {
      throw new Error('Backend not available');
    }

    return {
      output: 'WASM execution result',
      testResults: tests.map((test) => ({
        testCase: test.description,
        expected: 'expected',
        actual: 'actual',
        passed: true,
        input: 'input',
      })),
    };
  }
}

class MockJudge0Backend implements ExecutionBackend {
  language = 'python';
  private available = true;

  constructor(available = true) {
    this.available = available;
  }

  isAvailable(): boolean {
    return this.available;
  }

  requiresAuth(): boolean {
    return true;
  }

  async execute(code: string, tests: TestCase[]) {
    if (!this.available) {
      throw new Error('Backend not available');
    }

    return {
      output: 'Judge0 execution result',
      testResults: tests.map((test) => ({
        testCase: test.description,
        expected: 'expected',
        actual: 'actual',
        passed: true,
        input: 'input',
      })),
    };
  }
}

class MockFailingBackend implements ExecutionBackend {
  language = 'python';
  isAvailable(): boolean {
    return true;
  }
  requiresAuth(): boolean {
    return false;
  }
   
  async execute(
    _code: string,
    _tests: TestCase[]
  ): Promise<import('@/shared/types').CodeExecutionResult> {
    void _code;
    void _tests;
    throw new Error('Backend execution failed');
  }
}

describe('CompositeExecutionStrategy', () => {
  const testCases: TestCase[] = [
    {
      inputFile: '/test/input1.txt',
      expectedFile: '/test/output1.txt',
      description: 'Test case 1',
    },
  ];

  describe('constructor', () => {
    it('should initialize with provided backends', () => {
      const wasmBackend = new MockWasmBackend();
      const judge0Backend = new MockJudge0Backend();

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      expect(strategy.getAllBackends()).toHaveLength(2);
    });

    it('should throw error with empty backend list', () => {
      expect(() => new CompositeExecutionStrategy([])).toThrow(
        'At least one backend must be provided'
      );
    });
  });

  describe('isAvailable', () => {
    it('should return true if any backend is available', () => {
      const wasmBackend = new MockWasmBackend(true);
      const judge0Backend = new MockJudge0Backend(false);

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      expect(strategy.isAvailable()).toBe(true);
    });

    it('should return false if no backends are available', () => {
      const wasmBackend = new MockWasmBackend(false);
      const judge0Backend = new MockJudge0Backend(false);

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      expect(strategy.isAvailable()).toBe(false);
    });
  });

  describe('requiresAuth', () => {
    it('should return true if any available backend requires auth', () => {
      const wasmBackend = new MockWasmBackend(false); // Not available
      const judge0Backend = new MockJudge0Backend(true); // Available and requires auth

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      expect(strategy.requiresAuth()).toBe(true);
    });

    it('should return false if no available backends require auth', () => {
      const wasmBackend = new MockWasmBackend(true); // Available, no auth required
      const judge0Backend = new MockJudge0Backend(false); // Not available

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      expect(strategy.requiresAuth()).toBe(false);
    });
  });

  describe('execute', () => {
    it('should execute with first available backend', async () => {
      const wasmBackend = new MockWasmBackend(true);
      const judge0Backend = new MockJudge0Backend(true);

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      const result = await strategy.execute('print("test")', testCases);

      expect(result.output).toContain('WASM execution result');
      expect(result.output).toContain('MockWasmBackend');
    });

    it('should fallback to second backend if first fails', async () => {
      const failingBackend = new MockFailingBackend();
      const judge0Backend = new MockJudge0Backend(true);

      const strategy = new CompositeExecutionStrategy([
        failingBackend,
        judge0Backend,
      ]);

      const result = await strategy.execute('print("test")', testCases);

      expect(result.output).toContain('Judge0 execution result');
      expect(result.output).toContain('MockJudge0Backend');
    });

    it('should throw error if no backends are available', async () => {
      const wasmBackend = new MockWasmBackend(false);
      const judge0Backend = new MockJudge0Backend(false);

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      await expect(
        strategy.execute('print("test")', testCases)
      ).rejects.toThrow('No execution backends are available');
    });

    it('should throw error if all backends fail', async () => {
      const failingBackend1 = new MockFailingBackend();
      const failingBackend2 = new MockFailingBackend();

      const strategy = new CompositeExecutionStrategy([
        failingBackend1,
        failingBackend2,
      ]);

      await expect(
        strategy.execute('print("test")', testCases)
      ).rejects.toThrow('Backend execution failed');
    });
  });

  describe('getBackendStatus', () => {
    it('should return status of all backends', () => {
      const wasmBackend = new MockWasmBackend(true);
      const judge0Backend = new MockJudge0Backend(false);

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);
      const status = strategy.getBackendStatus();

      expect(status).toHaveLength(2);
      expect(status[0]).toEqual({
        name: 'MockWasmBackend',
        language: 'python',
        isAvailable: true,
        requiresAuth: false,
      });
      expect(status[1]).toEqual({
        name: 'MockJudge0Backend',
        language: 'python',
        isAvailable: false,
        requiresAuth: true,
      });
    });
  });

  describe('getFirstAvailableBackend', () => {
    it('should return first available backend', () => {
      const wasmBackend = new MockWasmBackend(false);
      const judge0Backend = new MockJudge0Backend(true);

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);
      const backend = strategy.getFirstAvailableBackend();

      expect(backend).toBe(judge0Backend);
    });

    it('should return null if no backends are available', () => {
      const wasmBackend = new MockWasmBackend(false);
      const judge0Backend = new MockJudge0Backend(false);

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);
      const backend = strategy.getFirstAvailableBackend();

      expect(backend).toBeNull();
    });
  });

  describe('getAvailableBackends', () => {
    it('should return all available backends', () => {
      const wasmBackend = new MockWasmBackend(true);
      const judge0Backend = new MockJudge0Backend(true);
      const unavailableBackend = new MockWasmBackend(false);

      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
        unavailableBackend,
      ]);
      const available = strategy.getAvailableBackends();

      expect(available).toHaveLength(2);
      expect(available).toContain(wasmBackend);
      expect(available).toContain(judge0Backend);
    });
  });

  describe('backend management', () => {
    it('should add backend', () => {
      const wasmBackend = new MockWasmBackend();
      const strategy = new CompositeExecutionStrategy([wasmBackend]);

      const judge0Backend = new MockJudge0Backend();
      strategy.addBackend(judge0Backend);

      expect(strategy.getAllBackends()).toHaveLength(2);
      expect(strategy.getAllBackends()).toContain(judge0Backend);
    });

    it('should insert backend at specific position', () => {
      const wasmBackend = new MockWasmBackend();
      const judge0Backend = new MockJudge0Backend();
      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      const newBackend = new MockWasmBackend();
      strategy.insertBackend(1, newBackend);

      const backends = strategy.getAllBackends();
      expect(backends).toHaveLength(3);
      expect(backends[1]).toBe(newBackend);
    });

    it('should remove backend', () => {
      const wasmBackend = new MockWasmBackend();
      const judge0Backend = new MockJudge0Backend();
      const strategy = new CompositeExecutionStrategy([
        wasmBackend,
        judge0Backend,
      ]);

      const removed = strategy.removeBackend(wasmBackend);

      expect(removed).toBe(true);
      expect(strategy.getAllBackends()).toHaveLength(1);
      expect(strategy.getAllBackends()).not.toContain(wasmBackend);
    });

    it('should return false when removing non-existent backend', () => {
      const wasmBackend = new MockWasmBackend();
      const strategy = new CompositeExecutionStrategy([wasmBackend]);

      const nonExistentBackend = new MockJudge0Backend();
      const removed = strategy.removeBackend(nonExistentBackend);

      expect(removed).toBe(false);
    });
  });
});
