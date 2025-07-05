import { useState } from 'react';
import { useAuth } from '@/features/auth';

interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string;
  memory: number;
}

interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime: number;
}

// Judge0 Language IDs
const LANGUAGE_IDS = {
  go: 60, // Go (1.13.5)
  c: 50, // C (GCC 9.2.0)
  cpp: 54, // C++ (G++ 9.2.0)
  python: 71, // Python (3.8.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
  java: 62, // Java (OpenJDK 13.0.1)
  rust: 73, // Rust (1.40.0)
} as const;

export const useJudge0Execution = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Get Judge0 API URL from environment
  const JUDGE0_URL =
    process.env.NEXT_PUBLIC_JUDGE0_URL || 'https://judge0-ce.p.rapidapi.com';

  const executeCode = async (
    code: string,
    language: keyof typeof LANGUAGE_IDS,
    input?: string
  ): Promise<ExecutionResult> => {
    if (!user) {
      const error = 'User not authenticated';
      setError(error);
      return { output: '', error, executionTime: 0 };
    }

    setIsExecuting(true);
    setError(null);
    setResult(null);

    try {
      const startTime = Date.now();
      const languageId = LANGUAGE_IDS[language];

      if (!languageId) {
        throw new Error(`Unsupported language: ${language}`);
      }

      // Prepare submission
      const submission: Judge0Submission = {
        source_code: code,
        language_id: languageId,
        stdin: input || '',
      };

      // Submit code for execution
      const submitResponse = await fetch(`${JUDGE0_URL}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        body: JSON.stringify(submission),
      });

      if (!submitResponse.ok) {
        throw new Error(`Submission failed: ${submitResponse.statusText}`);
      }

      const { token } = await submitResponse.json();

      // Poll for results
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds timeout

      while (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

        const resultResponse = await fetch(
          `${JUDGE0_URL}/submissions/${token}`,
          {
            headers: {
              'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
          }
        );

        if (!resultResponse.ok) {
          throw new Error(`Failed to get result: ${resultResponse.statusText}`);
        }

        const result: Judge0Result = await resultResponse.json();

        // Check if execution is complete
        if (result.status.id > 3) {
          // Status > 3 means completed
          const executionTime = Date.now() - startTime;

          let output = '';
          let error = null;

          if (result.status.id === 3) {
            // Accepted
            output = result.stdout || '';
            error = result.stderr || null;
          } else if (result.status.id === 4) {
            // Wrong Answer
            output = result.stdout || '';
            error = 'Wrong Answer';
          } else if (result.status.id === 5) {
            // Time Limit Exceeded
            error = 'Time Limit Exceeded';
          } else if (result.status.id === 6) {
            // Compilation Error
            error = result.compile_output || 'Compilation Error';
          } else {
            error = result.status.description || 'Execution Error';
          }

          const executionResult: ExecutionResult = {
            output,
            error,
            executionTime,
          };

          setResult(executionResult);
          return executionResult;
        }

        attempts++;
      }

      throw new Error('Execution timeout');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return {
        output: '',
        error: errorMessage,
        executionTime: 0,
      };
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    executeCode,
    isExecuting,
    result,
    error,
    clearResult: () => {
      setResult(null);
      setError(null);
    },
  };
};
