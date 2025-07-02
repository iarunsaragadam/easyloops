import { useCallback } from "react";
import { PyodideManager, TestCase, TestResult } from "@/types";
import { useJudge0Execution } from "./useJudge0Execution";
import { useAuth } from "./useAuth";

export const useCodeExecution = (pyodideManager: PyodideManager) => {
  const { executeCode: executeJudge0Code } = useJudge0Execution();
  const { user } = useAuth();

  // Helper function to fetch test case content
  const fetchTestCaseContent = async (filePath: string): Promise<string> => {
    console.log(`📁 Fetching test case file: ${filePath}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(filePath, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch file: ${filePath} (${response.status})`
        );
      }
      const content = await response.text();
      console.log(
        `✅ Successfully fetched ${filePath}, content length: ${content.length}`
      );
      return content;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        console.error(`⏰ Timeout fetching ${filePath}`);
        return "";
      }
      console.error(`❌ Error fetching ${filePath}:`, error);
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

  // Helper function to execute Python code for a single test case
  const executePythonCodeForTestCase = async (
    code: string,
    inputContent: string
  ): Promise<{ output: string; error?: string }> => {
    console.log(
      "Executing Python code with input:",
      inputContent.substring(0, 50) + "..."
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      const response = await fetch("/api/execute/python/", {
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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();

      if (!response.ok) {
        return {
          output: "",
          error: result.error || "Failed to execute Python code",
        };
      }

      return {
        output: result.output || "",
        error: result.error,
      };
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        return {
          output: "",
          error: "Python execution timed out after 15 seconds",
        };
      }
      return {
        output: "",
        error:
          error instanceof Error
            ? error.message
            : "Failed to execute Python code",
      };
    }
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

      if (language === "python") {
        // Try Pyodide first, fallback to local Python API if not available
        if (pyodideManager.isLoaded && pyodideManager.pyodide) {
          console.log("🐍 Using Pyodide for Python execution");
          try {
            return await pyodideManager.runCode(code, testCases);
          } catch (pyodideError) {
            console.warn(
              "Pyodide execution failed, falling back to local Python API:",
              pyodideError
            );
            // Fall through to local Python API
          }
        } else {
          console.log(
            "🐍 Pyodide not loaded, using local Python API for execution"
          );
        }

        // Use local Python API as fallback
        console.log("🐍 Using local Python API for execution");

        try {
          console.log(`Running ${testCases.length} test cases for Python code`);

          // For now, just run the code directly without test cases to avoid infinite loops
          console.log("🐍 Running code directly (bypassing test cases)");
          const result = await executePythonCodeForTestCase(code, "");
          return {
            output: result.error ? `Error: ${result.error}` : result.output,
            testResults: [],
          };

          // TODO: Re-enable test case processing once the infinite loop issue is resolved
          // For now, we're bypassing test cases to prevent infinite loops
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          throw new Error(`Python execution failed: ${errorMessage}`);
        }
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
        } catch (error: unknown) {
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
