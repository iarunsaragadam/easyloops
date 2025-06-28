import { useCallback } from "react";
import { PyodideManager, TestCase } from "@/types";
import { useGoExecution } from "./useGoExecution";
import { useAuth } from "./useAuth";

export const useCodeExecution = (pyodideManager: PyodideManager) => {
  const { executeGoCode } = useGoExecution();
  const { user } = useAuth();

  const executeCode = useCallback(
    async (
      code: string,
      testCases: TestCase[],
      language: string = "python",
      questionId?: string
    ) => {
      if (language === "go") {
        if (!user) {
          throw new Error("Authentication required for Go execution");
        }

        // Get the current auth token
        const token = await user.getIdToken();
        return await executeGoCode(
          code,
          testCases,
          questionId || "01-variable-declaration",
          token
        );
      }

      // Default to Python execution
      if (!pyodideManager.isLoaded || !pyodideManager.pyodide) {
        throw new Error("Pyodide is not loaded");
      }

      return await pyodideManager.runCode(code, testCases);
    },
    [pyodideManager, executeGoCode, user]
  );

  return { executeCode };
};
