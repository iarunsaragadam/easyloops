import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppState } from "@/types";
import { loadQuestion, getAvailableQuestions } from "@/utils/questionLoader";
import { DEFAULT_CODE, DEFAULT_QUESTION_ID } from "@/constants";

export const useAppState = () => {
  const [appState, setAppState] = useState<AppState>({
    pythonCode: DEFAULT_CODE,
    goCode: `package main

import (
	"fmt"
	"os"
	"bufio"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	
	// Read the number of rows
	scanner.Scan()
	n, _ := strconv.Atoi(scanner.Text())
	
	// Outer loop: iterate through rows (1 to n)
	for i := 1; i <= n; i++ {
		// Inner loop: print stars for current row
		for j := 0; j < i; j++ {
			fmt.Print("*")
		}
		fmt.Println() // Move to next line after each row
	}
}`,
    output: "",
    testResults: [],
    isRunning: false,
    currentQuestion: null,
    availableQuestions: [],
    selectedQuestionId: DEFAULT_QUESTION_ID,
    selectedLanguage: "python",
    isLoadingQuestion: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize selected question from URL or default
  useEffect(() => {
    const questionFromUrl = searchParams.get("q");
    if (questionFromUrl) {
      setAppState((prev) => ({ ...prev, selectedQuestionId: questionFromUrl }));
    }
  }, [searchParams]);

  // Load available questions
  useEffect(() => {
    getAvailableQuestions().then((questions) => {
      setAppState((prev) => ({ ...prev, availableQuestions: questions }));
    });
  }, []);

  // Load the selected question
  useEffect(() => {
    if (appState.selectedQuestionId) {
      setAppState((prev) => ({ ...prev, isLoadingQuestion: true }));
      loadQuestion(appState.selectedQuestionId)
        .then((question) => {
          setAppState((prev) => ({
            ...prev,
            currentQuestion: question,
            isLoadingQuestion: false,
          }));
        })
        .catch((error) => {
          console.error("Error loading question:", error);
          setAppState((prev) => ({
            ...prev,
            currentQuestion: null,
            isLoadingQuestion: false,
          }));
        });
    }
  }, [appState.selectedQuestionId]);

  const handleQuestionChange = (questionId: string) => {
    setAppState((prev) => ({ ...prev, selectedQuestionId: questionId }));
    router.push(`/?q=${questionId}`);
  };

  const handleLanguageChange = (language: string) => {
    console.log(`Language changed to: ${language}`);
    setAppState((prev) => ({ ...prev, selectedLanguage: language }));
  };

  const setPythonCode = (code: string) => {
    setAppState((prev) => ({ ...prev, pythonCode: code }));
  };

  const setGoCode = (code: string) => {
    setAppState((prev) => ({ ...prev, goCode: code }));
  };

  const setOutput = (output: string) => {
    setAppState((prev) => ({ ...prev, output }));
  };

  const setTestResults = (testResults: AppState["testResults"]) => {
    setAppState((prev) => ({ ...prev, testResults }));
  };

  const setIsRunning = (isRunning: boolean) => {
    setAppState((prev) => ({ ...prev, isRunning }));
  };

  return {
    appState,
    handleQuestionChange,
    handleLanguageChange,
    setPythonCode,
    setGoCode,
    setOutput,
    setTestResults,
    setIsRunning,
  };
};
