import { useState } from "react";

interface ExecutionResult {
  output: string;
  error: string;
  success: boolean;
}

export function useGoExecution() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeGoCode = async (code: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/execute/go/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute code");
      }

      setResult({
        output: data.output || "",
        error: data.error || "",
        success: data.success,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeGoCode,
    isLoading,
    result,
    error,
  };
}
