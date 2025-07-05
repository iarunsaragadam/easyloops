import { useState, useEffect } from 'react';
import {
  PyodideManager,
  TestCase,
  CodeExecutionResult,
  TestResult,
} from '@/shared/types';
import { PYODIDE_CONFIG } from '@/shared/constants';
import { normalizeOutput } from '@/shared/lib';

export const usePyodide = (): PyodideManager => {
  const [pyodide, setPyodide] = useState<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initPyodide = async () => {
      if (isLoading) return; // Prevent multiple simultaneous loads

      setIsLoading(true);
      setLoadingError(null);

      try {
        // Check if Pyodide is already loaded
        if ('loadPyodide' in window) {
          console.log('Pyodide script already loaded, initializing...');
        } else {
          console.log('Loading Pyodide script...');
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = PYODIDE_CONFIG.CDN_URL;
            script.onload = () => resolve();
            script.onerror = () =>
              reject(new Error('Failed to load Pyodide script'));
            document.head.appendChild(script);
          });
        }

        // Wait a bit for the script to fully initialize
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Initialize Pyodide
        console.log('Initializing Pyodide...');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pyodideInstance = await (window as any).loadPyodide({
          indexURL: PYODIDE_CONFIG.INDEX_URL,
          stdout: (text: string) => {
            console.log('Pyodide stdout:', text);
          },
          stderr: (text: string) => {
            console.warn('Pyodide stderr:', text);
          },
        });

        setPyodide(pyodideInstance);
        setIsLoaded(true);
        setLoadingError(null);
        console.log('✅ Pyodide loaded successfully');
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        setIsLoaded(false);
        setLoadingError(
          error instanceof Error
            ? error.message
            : 'Unknown error during Pyodide initialization'
        );
      } finally {
        setIsLoading(false);
      }
    };

    initPyodide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runCode = async (
    code: string,
    testCases: TestCase[]
  ): Promise<CodeExecutionResult> => {
    if (!pyodide || !isLoaded) {
      throw new Error('Pyodide is not loaded');
    }

    const results: TestResult[] = [];
    const allOutputs: string[] = [];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      try {
        // Fetch input and expected files for this test case
        const [inputResponse, expectedResponse] = await Promise.all([
          fetch(testCase.inputFile),
          fetch(testCase.expectedFile),
        ]);

        if (!inputResponse.ok || !expectedResponse.ok) {
          throw new Error(`Failed to load test files: ${testCase.inputFile}`);
        }

        const inputText = await inputResponse.text();
        const expectedText = await expectedResponse.text();

        // Set up stdin/stdout redirection for this specific test case
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (pyodide as any).runPythonAsync(`
import sys
from io import StringIO
sys._stdin = sys.stdin
sys._stdout = sys.stdout
sys.stdin = StringIO('''${inputText}''')
sys.stdout = StringIO()
`);

        // Run the user's code
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (pyodide as any).runPythonAsync(code);

        // Get the output for this test case
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const actualOutput = await (pyodide as any).runPythonAsync(
          'sys.stdout.getvalue()'
        );

        // Restore stdin/stdout
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (pyodide as any).runPythonAsync(
          'sys.stdin = sys._stdin; sys.stdout = sys._stdout'
        );

        // Normalize outputs using utility function
        const actual = actualOutput ? normalizeOutput(actualOutput) : '';
        const expected = normalizeOutput(expectedText);

        const passed = actual === expected;

        results.push({
          testCase: testCase.description,
          expected: expected,
          actual: actual,
          passed: passed,
          input: inputText,
        });

        // Add to overall output
        allOutputs.push(`Test Case ${i + 1}:\n${actual}`);
      } catch (error) {
        console.error(`Error in test case ${i + 1}:`, error);
        results.push({
          testCase: testCase.description,
          expected: 'Error loading test case',
          actual: `Error: ${error}`,
          passed: false,
        });

        allOutputs.push(`Test Case ${i + 1}: Error - ${error}`);
      }
    }

    return {
      output: allOutputs.join('\n\n---\n\n') || 'No output generated',
      testResults: results,
    };
  };

  return {
    pyodide,
    isLoaded,
    runCode,
    loadingError,
  };
};
