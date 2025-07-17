import { WasmManager } from '../WasmManager';
import { WasmRuntime } from '../interfaces';
import { TestCase } from '@/shared/types';

// Create mock runtime classes
class MockPythonRuntime implements WasmRuntime {
  language = 'python';
  private loaded = false;

  isLoaded(): boolean {
    return this.loaded;
  }

  async load(): Promise<void> {
    this.loaded = true;
  }

  async execute(code: string, tests: TestCase[]) {
    return {
      output: 'Python output',
      testResults: tests.map((test) => ({
        testCase: test.description,
        expected: 'expected',
        actual: 'actual',
        passed: true,
        input: 'input',
      })),
      executionTime: 100,
    };
  }
}

class MockJSRuntime implements WasmRuntime {
  language = 'javascript';
  private loaded = false;

  isLoaded(): boolean {
    return this.loaded;
  }

  async load(): Promise<void> {
    this.loaded = true;
  }

  async execute(code: string, tests: TestCase[]) {
    return {
      output: 'JavaScript output',
      testResults: tests.map((test) => ({
        testCase: test.description,
        expected: 'expected',
        actual: 'actual',
        passed: true,
        input: 'input',
      })),
      executionTime: 100,
    };
  }
}

class MockFailingRuntime implements WasmRuntime {
  language = 'failing';
  private loaded = false;

  isLoaded(): boolean {
    return this.loaded;
  }

  async load(): Promise<void> {
    throw new Error('Load failed');
  }

  async execute(code: string, tests: TestCase[]) {
    return {
      output: 'Error: Execute failed',
      testResults: tests.map((test) => ({
        testCase: test.description,
        expected: 'expected',
        actual: 'Error: Execute failed',
        passed: false,
        input: 'input',
      })),
      executionTime: 0,
    };
  }
}

describe('WasmManager', () => {
  let pythonRuntime: MockPythonRuntime;
  let jsRuntime: MockJSRuntime;
  let failingRuntime: MockFailingRuntime;

  beforeEach(() => {
    pythonRuntime = new MockPythonRuntime();
    jsRuntime = new MockJSRuntime();
    failingRuntime = new MockFailingRuntime();
  });

  describe('constructor', () => {
    it('should initialize with provided runtimes', () => {
      const manager = new WasmManager([pythonRuntime, jsRuntime]);

      expect(manager.getSupportedLanguages()).toEqual(['python', 'javascript']);
    });

    it('should handle empty runtime list', () => {
      const manager = new WasmManager([]);

      expect(manager.getSupportedLanguages()).toEqual([]);
    });
  });

  describe('default factory', () => {
    it('should create manager with default runtimes', () => {
      const manager = WasmManager.default();

      const supported = manager.getSupportedLanguages();
      expect(supported).toContain('python');
      expect(supported).toContain('javascript');
      expect(supported).toContain('typescript');
    });
  });

  describe('isLoaded', () => {
    it('should return true for loaded runtime', async () => {
      const manager = new WasmManager([pythonRuntime]);

      await manager.load('python');
      expect(await manager.isLoaded('python')).toBe(true);
    });

    it('should return false for unsupported language', async () => {
      const manager = new WasmManager([pythonRuntime]);

      expect(await manager.isLoaded('unsupported')).toBe(false);
    });
  });

  describe('load', () => {
    it('should load runtime successfully', async () => {
      const manager = new WasmManager([pythonRuntime]);

      await manager.load('python');
      expect(await manager.isLoaded('python')).toBe(true);
    });

    it('should throw error for unsupported language', async () => {
      const manager = new WasmManager([pythonRuntime]);

      await expect(manager.load('unsupported')).rejects.toThrow(
        'Unsupported language: unsupported'
      );
    });

    it('should handle load failures', async () => {
      const manager = new WasmManager([failingRuntime]);

      await expect(manager.load('failing')).rejects.toThrow('Load failed');
    });
  });

  describe('runCode', () => {
    const testCases: TestCase[] = [
      {
        inputFile: '/test/input1.txt',
        expectedFile: '/test/output1.txt',
        description: 'Test case 1',
      },
    ];

    it('should execute code successfully', async () => {
      const manager = new WasmManager([pythonRuntime]);
      await manager.load('python');

      const result = await manager.runCode(
        'python',
        'print("test")',
        testCases
      );

      expect(result.output).toBe('Python output');
      expect(result.testResults).toHaveLength(1);
    });

    it('should throw error for unsupported language', async () => {
      const manager = new WasmManager([pythonRuntime]);

      await expect(
        manager.runCode('unsupported', 'code', testCases)
      ).rejects.toThrow('Unsupported language: unsupported');
    });
  });

  describe('getRuntimeStatus', () => {
    it('should return status of all runtimes', async () => {
      const manager = new WasmManager([pythonRuntime, jsRuntime]);

      await manager.load('python');

      const status = manager.getRuntimeStatus();

      expect(status.python).toEqual({ loaded: true, language: 'python' });
      // JavaScript was not explicitly loaded, so it should not be loaded
      expect(status.javascript).toEqual({
        loaded: false,
        language: 'javascript',
      });
    });
  });

  describe('loadAll', () => {
    it('should load all runtimes', async () => {
      const manager = new WasmManager([pythonRuntime, jsRuntime]);

      await manager.loadAll();

      expect(await manager.isLoaded('python')).toBe(true);
      expect(await manager.isLoaded('javascript')).toBe(true);
    });

    it('should handle individual runtime failures gracefully', async () => {
      const manager = new WasmManager([pythonRuntime, failingRuntime]);

      // Should not throw, just log warnings
      await manager.loadAll();

      expect(await manager.isLoaded('python')).toBe(true);
      expect(await manager.isLoaded('failing')).toBe(false);
    });
  });

  describe('runtime management', () => {
    it('should add runtime', () => {
      const manager = new WasmManager([pythonRuntime]);

      manager.addRuntime(jsRuntime);

      expect(manager.getSupportedLanguages()).toContain('javascript');
    });

    it('should remove runtime', () => {
      const manager = new WasmManager([pythonRuntime, jsRuntime]);

      const removed = manager.removeRuntime('python');

      expect(removed).toBe(true);
      expect(manager.getSupportedLanguages()).not.toContain('python');
    });

    it('should return false when removing non-existent runtime', () => {
      const manager = new WasmManager([pythonRuntime]);

      const removed = manager.removeRuntime('nonexistent');

      expect(removed).toBe(false);
    });
  });
});
