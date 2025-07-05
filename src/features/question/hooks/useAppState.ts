import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppState } from '@/shared/types';
import {
  loadQuestion,
  getAvailableQuestions,
  loadCodeStub,
} from '@/shared/lib';
import { DEFAULT_QUESTION_ID } from '@/shared/constants';
import type { SupportedLanguage } from '@/shared/constants/languages';

export const useAppState = () => {
  const loadingRef = useRef(false);
  // Cache for loaded code stubs: { [language]: code }
  const codeStubsRef = useRef<Record<string, string>>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the initial question ID from URL or use default
  const initialQuestionId = searchParams.get('q') || DEFAULT_QUESTION_ID;

  const [appState, setAppState] = useState<AppState>({
    pythonCode: '',
    goCode: '',
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

  // Load code stub for the selected language when question or language changes
  useEffect(() => {
    const lang = appState.selectedLanguage;
    if (appState.selectedQuestionId && lang) {
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
            appState.selectedQuestionId,
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
  }, [appState.selectedQuestionId, appState.selectedLanguage]);

  // Clear code stub cache when question changes
  useEffect(() => {
    codeStubsRef.current = {};
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
