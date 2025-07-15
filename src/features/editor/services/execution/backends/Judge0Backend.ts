import { ExecutionBackend } from '../interfaces';
import { TestCase, CodeExecutionResult, TestResult } from '@/shared/types';
import { User } from 'firebase/auth';

interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

interface Judge0Result {
  token: string;
  status: {
    id: number;
    description: string;
  };
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  memory?: number;
  time?: number;
}

export class Judge0Backend implements ExecutionBackend {
  public readonly language: string;
  private user: User | null;
  private judge0Url: string;
  private languageId: number;

  constructor(language: string, judge0Url: string, languageId: number, user: User | null) {
    this.language = language;
    this.judge0Url = judge0Url;
    this.languageId = languageId;
    this.user = user;
  }

  isAvailable(): boolean {
    return !!this.user; // Requires authentication
  }

  requiresAuth(): boolean {
    return true;
  }

  async execute(code: string, tests: TestCase[]): Promise<CodeExecutionResult> {
    if (!this.isAvailable()) {
      throw new Error(`Authentication required for ${this.language} execution`);
    }

    const testResults: TestResult[] = [];
    const outputs: string[] = [];

    for (const testCase of tests) {
      try {
        const [inputContent, expectedOutput] = await Promise.all([
          this.fetchFileContent(testCase.inputFile),
          this.fetchFileContent(testCase.expectedFile)
        ]);

        const result = await this.executeWithJudge0(code, inputContent, expectedOutput);
        
        const normalizedExpected = expectedOutput.trim().replace(/\r\n/g, '\n');
        const normalizedActual = result.output.trim().replace(/\r\n/g, '\n');
        
        const passed = !result.error && normalizedActual === normalizedExpected;

        testResults.push({
          testCase: testCase.description,
          expected: expectedOutput,
          actual: result.error ? `Error: ${result.error}` : result.output,
          passed,
          input: inputContent,
        });

        outputs.push(result.error ? `Error: ${result.error}` : result.output);
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

  private async executeWithJudge0(
    code: string,
    input: string,
    expectedOutput: string
  ): Promise<{ output: string; error?: string }> {
    try {
      // Prepare submission
      const submission: Judge0Submission = {
        source_code: code,
        language_id: this.languageId,
        stdin: input,
        expected_output: expectedOutput,
      };

      // Submit for execution
      const submitResponse = await fetch(`${this.judge0Url}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        body: JSON.stringify(submission),
      });

      if (!submitResponse.ok) {
        throw new Error(`Judge0 submission failed: ${submitResponse.statusText}`);
      }

      const { token } = await submitResponse.json();

      // Poll for results
      const result = await this.pollForResult(token);

      // Check execution status
      if (result.status.id === 3) {
        // Accepted
        return { output: result.stdout || '' };
      } else if (result.status.id === 4) {
        // Wrong Answer
        return { output: result.stdout || '', error: 'Wrong Answer' };
      } else if (result.status.id === 5) {
        // Time Limit Exceeded
        return { output: '', error: 'Time Limit Exceeded' };
      } else if (result.status.id === 6) {
        // Compilation Error
        return { output: '', error: `Compilation Error: ${result.compile_output}` };
      } else if (result.status.id === 7) {
        // Runtime Error (SIGSEGV)
        return { output: '', error: `Runtime Error: ${result.stderr}` };
      } else if (result.status.id === 8) {
        // Runtime Error (SIGXFSZ)
        return { output: '', error: 'Runtime Error: Output limit exceeded' };
      } else if (result.status.id === 9) {
        // Runtime Error (SIGFPE)
        return { output: '', error: 'Runtime Error: Floating point exception' };
      } else if (result.status.id === 10) {
        // Runtime Error (SIGABRT)
        return { output: '', error: 'Runtime Error: Aborted' };
      } else if (result.status.id === 11) {
        // Runtime Error (NZEC)
        return { output: '', error: 'Runtime Error: Non-zero exit code' };
      } else if (result.status.id === 12) {
        // Runtime Error (Other)
        return { output: '', error: `Runtime Error: ${result.stderr}` };
      } else if (result.status.id === 13) {
        // Internal Error
        return { output: '', error: 'Internal Judge0 Error' };
      } else if (result.status.id === 14) {
        // Exec Format Error
        return { output: '', error: 'Exec Format Error' };
      } else {
        // Other status
        return { output: result.stdout || '', error: result.status.description };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { output: '', error: errorMessage };
    }
  }

  private async pollForResult(token: string): Promise<Judge0Result> {
    const maxAttempts = 30; // 30 seconds timeout
    const pollInterval = 1000; // 1 second

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await fetch(`${this.judge0Url}/submissions/${token}`, {
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get submission result: ${response.statusText}`);
      }

      const result = await response.json();

      // Check if processing is complete
      if (result.status.id > 2) {
        return result;
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error('Judge0 execution timeout');
  }

  private async fetchFileContent(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filePath}`);
    }
    return await response.text();
  }
}