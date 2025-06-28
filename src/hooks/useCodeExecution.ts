import { useCallback } from "react";
import { PyodideManager, TestCase } from "@/types";
import { useGoExecution } from "./useGoExecution";

export const useCodeExecution = (pyodideManager: PyodideManager) => {
  const { executeGoCode } = useGoExecution();

  const executeCode = useCallback(
    async (
      code: string,
      testCases: TestCase[],
      language: string = "python"
    ) => {
      if (language === "go") {
        return await executeGoCode(code, testCases);
      }

      // Default to Python execution
      if (!pyodideManager.isLoaded || !pyodideManager.pyodide) {
        throw new Error("Pyodide is not loaded");
      }

      return await pyodideManager.runCode(code, testCases);
    },
    [pyodideManager, executeGoCode]
  );

  return { executeCode };
};
