import { WasmRuntime } from '../interfaces';
import { TestCase, CodeExecutionResult, TestResult } from '@/shared/types';

export class QuickJsRuntime implements WasmRuntime {
  public readonly language = 'javascript';
  private quickjs: any = null;
  private _isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  constructor(language: 'javascript' | 'typescript' = 'javascript') {
    this.language = language;
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

    this.loadingPromise = this.loadQuickJS();
    await this.loadingPromise;
  }

  private async loadQuickJS(): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        throw new Error('QuickJS can only be loaded in browser environment');
      }

      // Load QuickJS WASM from CDN
      const quickjsScript = document.createElement('script');
      quickjsScript.src = 'https://cdn.jsdelivr.net/npm/quickjs-emscripten@0.23.0/dist/quickjs-emscripten.js';
      
      await new Promise<void>((resolve, reject) => {
        quickjsScript.onload = () => resolve();
        quickjsScript.onerror = () => reject(new Error('Failed to load QuickJS script'));
        document.head.appendChild(quickjsScript);
      });

      // Initialize QuickJS
      const QuickJS = (window as any).QuickJS;
      this.quickjs = await QuickJS.newQuickJSWASMModule();

      this._isLoaded = true;
    } catch (error) {
      console.error('Failed to load QuickJS:', error);
      throw error;
    }
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    if (!this.isLoaded()) {
      throw new Error('QuickJS is not loaded yet. Please wait a moment and try again.');
    }

    const testResults: TestResult[] = [];
    const outputs: string[] = [];

    for (const testCase of tests) {
      try {
        const [inputContent, expectedOutput] = await Promise.all([
          this.fetchFileContent(testCase.inputFile),
          this.fetchFileContent(testCase.expectedFile)
        ]);

        // Create a new QuickJS context for each test
        const vm = this.quickjs.newContext();
        
        try {
          // Set up console.log capture
          const outputCapture: string[] = [];
          
          vm.setProp(vm.global, 'console', vm.newObject());
          const console = vm.getProp(vm.global, 'console');
          
          vm.setProp(console, 'log', vm.newFunction('log', (...args) => {
            const values = args.map(arg => vm.dump(arg));
            outputCapture.push(values.join(' '));
          }));

          // Set up input handling
          const inputLines = inputContent.split('\n');
          let inputIndex = 0;
          
          vm.setProp(vm.global, 'readline', vm.newFunction('readline', () => {
            if (inputIndex < inputLines.length) {
              return inputLines[inputIndex++];
            }
            return '';
          }));

          // Handle TypeScript compilation if needed
          let executableCode = code;
          if (this.language === 'typescript') {
            executableCode = this.transpileTypeScript(code);
          }

          // Execute the code
          const result = vm.evalCode(executableCode);
          
          let output = '';
          if (outputCapture.length > 0) {
            output = outputCapture.join('\n');
          } else if (result.error) {
            output = `Error: ${vm.dump(result.error)}`;
          } else {
            // If no console.log output, capture the result
            const resultValue = vm.dump(result.value);
            if (resultValue !== 'undefined') {
              output = resultValue;
            }
          }

          const normalizedOutput = output.trim().replace(/\r\n/g, '\n');
          const normalizedExpected = expectedOutput.trim().replace(/\r\n/g, '\n');

          const passed = normalizedOutput === normalizedExpected;

          testResults.push({
            testCase: testCase.description,
            expected: expectedOutput,
            actual: output,
            passed,
            input: inputContent,
          });

          outputs.push(output);
        } finally {
          vm.dispose();
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        testResults.push({
          testCase: testCase.description,
          expected: 'Error loading test case',
          actual: `Error: ${errorMessage}`,
          passed: false,
          input: '',
        });
        outputs.push(`Error: ${errorMessage}`);
      }
    }

    return {
      output: outputs.join('\n---\n'),
      testResults,
    };
  }

  private transpileTypeScript(code: string): string {
    // Simple TypeScript to JavaScript transpilation
    // Remove type annotations and interfaces
    let jsCode = code;
    
    // Remove type annotations from function parameters
    jsCode = jsCode.replace(/(\w+)\s*:\s*\w+/g, '$1');
    
    // Remove return type annotations
    jsCode = jsCode.replace(/\):\s*\w+\s*{/g, ') {');
    
    // Remove interface definitions
    jsCode = jsCode.replace(/interface\s+\w+\s*{[^}]*}/g, '');
    
    // Remove type declarations
    jsCode = jsCode.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
    
    // Remove generic type parameters
    jsCode = jsCode.replace(/<[^>]+>/g, '');
    
    // Remove import type statements
    jsCode = jsCode.replace(/import\s+type\s+[^;]+;/g, '');
    
    return jsCode;
  }

  private async fetchFileContent(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filePath}`);
    }
    return await response.text();
  }
}