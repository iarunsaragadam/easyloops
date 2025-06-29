import { useCallback } from "react";
import { PyodideManager, TestCase, TestResult } from "@/types";
import { useJudge0Execution } from "./useJudge0Execution";
import { useAuth } from "./useAuth";

export const useCodeExecution = (pyodideManager: PyodideManager) => {
  const { executeCode: executeJudge0Code } = useJudge0Execution();
  const { user } = useAuth();

  // Helper function to fetch test case content
  const fetchTestCaseContent = async (filePath: string): Promise<string> => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${filePath}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error fetching ${filePath}:`, error);
      return "";
    }
  };

  // Helper function to execute Go code for a single test case
  const executeGoCodeForTestCase = async (
    code: string,
    inputContent: string
  ): Promise<{ output: string; error?: string }> => {
    console.log(
      "Executing Go code with input:",
      inputContent.substring(0, 50) + "..."
    );

    const response = await fetch("/api/execute/go/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        code,
        input: inputContent,
        timestamp: new Date().getTime(), // Add timestamp to prevent caching
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        output: "",
        error: result.error || "Failed to execute Go code",
      };
    }

    return {
      output: result.output || "",
      error: result.error,
    };
  };

  const executeCode = useCallback(
    async (
      code: string,
      testCases: TestCase[],
      language: string = "python"
    ) => {
      console.log(
        `Executing ${language} code:`,
        code.substring(0, 100) + "..."
      );

      // Get input from test cases
      const input = testCases.length > 0 ? testCases[0].inputFile : "";

      if (
        language === "python" &&
        pyodideManager.isLoaded &&
        pyodideManager.pyodide
      ) {
        // Use Pyodide for Python (client-side)
        return await pyodideManager.runCode(code, testCases);
      } else if (language === "go") {
        // Use our local Go compiler API
        if (!user) {
          throw new Error("Authentication required for Go code execution");
        }

        try {
          console.log(`Running ${testCases.length} test cases for Go code`);

          // Execute each test case separately
          const testResultsPromises: Promise<TestResult>[] = testCases.map(
            async (testCase) => {
              // Fetch input and expected output content
              const inputContent = await fetchTestCaseContent(
                testCase.inputFile
              );
              const expectedOutput = await fetchTestCaseContent(
                testCase.expectedFile
              );

              // Execute the Go code with this test case's input
              const result = await executeGoCodeForTestCase(code, inputContent);

              // Normalize outputs for comparison
              const normalizedExpected = expectedOutput
                .trim()
                .replace(/\r\n/g, "\n");
              const normalizedActual = result.output
                .trim()
                .replace(/\r\n/g, "\n");

              // Check if output matches expected output
              const passed =
                !result.error && normalizedActual === normalizedExpected;

              return {
                testCase: testCase.description,
                expected: expectedOutput,
                actual: result.error ? `Error: ${result.error}` : result.output,
                passed,
                input: inputContent,
              };
            }
          );

          const testResults = await Promise.all(testResultsPromises);

          // Use the first test case's output for the main output display
          const firstResult = testResults[0] || { actual: "" };
          const mainOutput = firstResult.actual.startsWith("Error:")
            ? firstResult.actual
            : testResults
                .map((r) =>
                  r.passed ? `✅ ${r.testCase}` : `❌ ${r.testCase}`
                )
                .join("\n");

          return {
            output: mainOutput,
            testResults,
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          throw new Error(`Go execution failed: ${errorMessage}`);
        }
      } else {
        // Use Judge0 for all other languages
        if (!user) {
          throw new Error("Authentication required for code execution");
        }

        const result = await executeJudge0Code(
          code,
          language as "c" | "cpp" | "javascript" | "java" | "rust",
          input
        );

        // Convert Judge0 result to expected format
        const testResults = testCases.map((testCase) => ({
          testCase: testCase.description,
          expected: "Expected output from Judge0",
          actual: result.error || result.output,
          passed: !result.error && result.output.includes("Expected output"),
          input: testCase.inputFile,
        }));

        return {
          output: result.error ? `Error: ${result.error}` : result.output,
          testResults,
        };
      }
    },
    [pyodideManager, executeJudge0Code, user]
  );

  return { executeCode };
};
