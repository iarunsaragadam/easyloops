import { TestCase, CodeExecutionResult } from "@/types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export const useGoExecution = () => {
  const executeGoCode = async (
    code: string,
    testCases: TestCase[],
    questionId: string,
    authToken: string
  ): Promise<CodeExecutionResult> => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/execute/go`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          code,
          questionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();

      // Convert backend result to frontend format
      const testResults = testCases.map((testCase) => ({
        testCase: testCase.description,
        expected: "Expected output from backend",
        actual: result.error || result.output,
        passed: !result.error && result.output.includes("Expected output"),
        input: testCase.inputFile,
      }));

      return {
        output: result.error ? `Error: ${result.error}` : result.output,
        testResults,
      };
    } catch (error) {
      console.error("Go execution error:", error);
      return {
        output: `Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        testResults: testCases.map((testCase) => ({
          testCase: testCase.description,
          expected: "Expected output",
          actual: "Execution failed",
          passed: false,
          input: testCase.inputFile,
        })),
      };
    }
  };

  return { executeGoCode };
};
