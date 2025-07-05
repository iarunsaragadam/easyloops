import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppState } from '@/types';
import { loadQuestion, getAvailableQuestions } from '@/lib/questionLoader';
import { DEFAULT_CODE, DEFAULT_QUESTION_ID } from '@/constants';

export const useAppState = () => {
  const loadingRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the initial question ID from URL or use default
  const initialQuestionId = searchParams.get('q') || DEFAULT_QUESTION_ID;

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
    selectedQuestionId: initialQuestionId,
    selectedLanguage: 'python',
    isLoadingQuestion: false,
  });

  // Update selected question when URL changes
  useEffect(() => {
    const questionFromUrl = searchParams.get('q');
    if (questionFromUrl && questionFromUrl !== appState.selectedQuestionId) {
      setAppState((prev) => ({
        ...prev,
        selectedQuestionId: questionFromUrl,
        output: '', // Clear output when question changes
        testResults: [], // Clear test results when question changes
        isRunning: false, // Stop any running execution
      }));
    }
  }, [searchParams, appState.selectedQuestionId]);

  // Load available questions
  useEffect(() => {
    getAvailableQuestions().then((questions) => {
      setAppState((prev) => ({ ...prev, availableQuestions: questions }));
    });
  }, []);

  // Load the selected question
  useEffect(() => {
    if (appState.selectedQuestionId && !loadingRef.current) {
      loadingRef.current = true;
      setAppState((prev) => ({ ...prev, isLoadingQuestion: true }));
      loadQuestion(appState.selectedQuestionId)
        .then((question) => {
          setAppState((prev) => ({
            ...prev,
            currentQuestion: question,
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
  }, [appState.selectedQuestionId]);

  const handleQuestionChange = (questionId: string) => {
    // Only update if the question is actually different
    if (questionId !== appState.selectedQuestionId) {
      setAppState((prev) => ({
        ...prev,
        selectedQuestionId: questionId,
        output: '', // Clear output when question changes
        testResults: [], // Clear test results when question changes
        isRunning: false, // Stop any running execution
      }));
      router.push(`/?q=${questionId}`);
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
