import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AppState } from '@/shared/types';
import {
  loadQuestion,
  getAvailableQuestions,
  loadCodeStub,
} from '@/shared/lib';
// import { SUPPORTED_LANGUAGES } from '@/shared/constants/languages'; // Removed unused import
import type { SupportedLanguage } from '@/shared/constants/languages';

export const useQuestionState = (questionId: string) => {
  const loadingRef = useRef(false);
  // Cache for loaded code stubs: { [language]: code }
  const codeStubsRef = useRef<Record<string, string>>({});
  const router = useRouter();

  const [appState, setAppState] = useState<AppState>({
    pythonCode: '',
    goCode: '',
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

  // Load code stub for the selected language when question or language changes
  useEffect(() => {
    const lang = appState.selectedLanguage;
    if (questionId && lang) {
      // If we already have the stub cached, use it
      if (codeStubsRef.current[lang]) {
        setAppState((prev) => ({
          ...prev,
          [`${lang}Code`]: codeStubsRef.current[lang],
        }));
        return;
      }
      // Otherwise, fetch it
      const loadStub = async () => {
        try {
          const stub = await loadCodeStub(
            questionId,
            lang as SupportedLanguage
          );
          codeStubsRef.current[lang] = stub;
          setAppState((prev) => ({
            ...prev,
            [`${lang}Code`]: stub,
          }));
        } catch (error) {
          console.error('Error loading code stub:', error);
        }
      };
      loadStub();
    }
  }, [questionId, appState.selectedLanguage]);

  // Clear code stub cache when question changes
  useEffect(() => {
    codeStubsRef.current = {};
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

  // Get code for the currently selected language
  const getCurrentCode = () => {
    const language = appState.selectedLanguage;
    // First check if we have a cached stub for this language
    if (codeStubsRef.current[language]) {
      return codeStubsRef.current[language];
    }
    // Fall back to the state values (for backwards compatibility)
    if (language === 'python') {
      return appState.pythonCode;
    } else if (language === 'go') {
      return appState.goCode;
    }
    return '';
  };

  const setPythonCode = (code: string) => {
    setAppState((prev) => ({ ...prev, pythonCode: code }));
    // Also update the cached stub
    codeStubsRef.current['python'] = code;
  };

  const setGoCode = (code: string) => {
    setAppState((prev) => ({ ...prev, goCode: code }));
    // Also update the cached stub
    codeStubsRef.current['go'] = code;
  };

  // Generic function to set code for any language
  const setCodeForLanguage = (language: string, code: string) => {
    // Update cached stub
    codeStubsRef.current[language] = code;
    // Update state for backwards compatibility
    if (language === 'python') {
      setPythonCode(code);
    } else if (language === 'go') {
      setGoCode(code);
    }
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
    setCodeForLanguage,
    getCurrentCode,
    setOutput,
    setTestResults,
    setIsRunning,
  };
};
