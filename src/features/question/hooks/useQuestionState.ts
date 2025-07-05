import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AppState } from '@/shared/types';
import { loadQuestion, getAvailableQuestions } from '@/shared/lib';
import { DEFAULT_CODE } from '@/shared/constants';

export const useQuestionState = (questionId: string) => {
  const loadingRef = useRef(false);
  const router = useRouter();

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
    output: '',
    testResults: [],
    isRunning: false,
    currentQuestion: null,
    availableQuestions: [],
    selectedQuestionId: questionId,
    selectedLanguage: 'python',
    isLoadingQuestion: false,
  });

  // Load available questions
  useEffect(() => {
    getAvailableQuestions().then((questions) => {
      setAppState((prev) => ({ ...prev, availableQuestions: questions }));
    });
  }, []);

  // Load the selected question
  useEffect(() => {
    if (questionId && !loadingRef.current) {
      loadingRef.current = true;
      setAppState((prev) => ({ ...prev, isLoadingQuestion: true }));
      loadQuestion(questionId)
        .then((question) => {
          setAppState((prev) => ({
            ...prev,
            currentQuestion: question,
            selectedQuestionId: questionId,
            isLoadingQuestion: false,
          }));
          loadingRef.current = false;
        })
        .catch((error) => {
          console.error('Error loading question:', error);
          setAppState((prev) => ({
            ...prev,
            currentQuestion: null,
            isLoadingQuestion: false,
          }));
          loadingRef.current = false;
        });
    }
  }, [questionId]);

  const handleQuestionChange = (newQuestionId: string) => {
    // Only update if the question is actually different
    if (newQuestionId !== appState.selectedQuestionId) {
      setAppState((prev) => ({
        ...prev,
        selectedQuestionId: newQuestionId,
        output: '', // Clear output when question changes
        testResults: [], // Clear test results when question changes
        isRunning: false, // Stop any running execution
      }));
      router.push(`/questions/${newQuestionId}`);
    }
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

  const setTestResults = (testResults: AppState['testResults']) => {
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
