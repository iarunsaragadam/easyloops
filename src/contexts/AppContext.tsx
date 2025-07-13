'use client';
import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch } from '@/store';
import {
  selectAppState,
  selectCurrentQuestion,
  selectSelectedLanguage,
  selectIsRunning,
  selectIsLoadingQuestion,
  selectOutput,
  selectTestResults,
  getCurrentCode,
  setSelectedQuestionId,
  setSelectedLanguage,
  setPythonCode,
  setGoCode,
  setCodeForLanguage,
  setOutput,
  setTestResults,
  setIsRunning,
  clearCodeStubsCache,
  fetchAvailableQuestions,
  fetchQuestion,
  fetchCodeStub,
} from '@/store/slices/appSlice';

import type { SupportedLanguage } from '@/shared/constants/languages';

interface AppContextType {
  // State
  appState: ReturnType<typeof selectAppState>;
  currentQuestion: ReturnType<typeof selectCurrentQuestion>;
  selectedLanguage: ReturnType<typeof selectSelectedLanguage>;
  isRunning: ReturnType<typeof selectIsRunning>;
  isLoadingQuestion: ReturnType<typeof selectIsLoadingQuestion>;
  output: ReturnType<typeof selectOutput>;
  testResults: ReturnType<typeof selectTestResults>;

  // Actions
  handleQuestionChange: (questionId: string) => void;
  handleLanguageChange: (language: string) => void;
  setPythonCode: (code: string) => void;
  setGoCode: (code: string) => void;
  setCodeForLanguage: (language: string, code: string) => void;
  getCurrentCode: () => string;
  setOutput: (output: string) => void;
  setTestResults: (testResults: ReturnType<typeof selectTestResults>) => void;
  setIsRunning: (isRunning: boolean) => void;
  clearCodeStubsCache: () => void;

  // Async actions
  fetchAvailableQuestions: () => Promise<void>;
  fetchQuestion: (questionId: string) => Promise<void>;
  fetchCodeStub: (
    questionId: string,
    language: SupportedLanguage
  ) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Selectors
  const appState = useSelector(selectAppState);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const selectedLanguage = useSelector(selectSelectedLanguage);
  const isRunning = useSelector(selectIsRunning);
  const isLoadingQuestion = useSelector(selectIsLoadingQuestion);
  const output = useSelector(selectOutput);
  const testResults = useSelector(selectTestResults);

  // Get current code helper
  const getCurrentCodeHelper = useCallback(() => {
    return getCurrentCode({ app: appState });
  }, [appState]);

  // Actions
  const handleQuestionChange = useCallback(
    (questionId: string) => {
      if (questionId !== appState.selectedQuestionId) {
        dispatch(setSelectedQuestionId(questionId));
        router.push(`/?q=${questionId}`);
      }
    },
    [dispatch, appState.selectedQuestionId, router]
  );

  const handleLanguageChange = useCallback(
    (language: string) => {
      console.log(`Language changed to: ${language}`);
      dispatch(setSelectedLanguage(language));
    },
    [dispatch]
  );

  const setPythonCodeAction = useCallback(
    (code: string) => {
      dispatch(setPythonCode(code));
    },
    [dispatch]
  );

  const setGoCodeAction = useCallback(
    (code: string) => {
      dispatch(setGoCode(code));
    },
    [dispatch]
  );

  const setCodeForLanguageAction = useCallback(
    (language: string, code: string) => {
      dispatch(setCodeForLanguage({ language, code }));
    },
    [dispatch]
  );

  const setOutputAction = useCallback(
    (output: string) => {
      dispatch(setOutput(output));
    },
    [dispatch]
  );

  const setTestResultsAction = useCallback(
    (testResults: ReturnType<typeof selectTestResults>) => {
      dispatch(setTestResults(testResults));
    },
    [dispatch]
  );

  const setIsRunningAction = useCallback(
    (isRunning: boolean) => {
      dispatch(setIsRunning(isRunning));
    },
    [dispatch]
  );

  const clearCodeStubsCacheAction = useCallback(() => {
    dispatch(clearCodeStubsCache());
  }, [dispatch]);

  // Async actions
  const fetchAvailableQuestionsAction = useCallback(async () => {
    await dispatch(fetchAvailableQuestions());
  }, [dispatch]);

  const fetchQuestionAction = useCallback(
    async (questionId: string) => {
      await dispatch(fetchQuestion(questionId));
    },
    [dispatch]
  );

  const fetchCodeStubAction = useCallback(
    async (questionId: string, language: SupportedLanguage) => {
      await dispatch(fetchCodeStub({ questionId, language }));
    },
    [dispatch]
  );

  // Sync question ID with URL
  useEffect(() => {
    const questionFromUrl = searchParams.get('q');
    if (questionFromUrl && questionFromUrl !== appState.selectedQuestionId) {
      dispatch(setSelectedQuestionId(questionFromUrl));
    }
  }, [searchParams, appState.selectedQuestionId, dispatch]);

  // Load available questions on mount
  useEffect(() => {
    fetchAvailableQuestionsAction();
  }, [fetchAvailableQuestionsAction]);

  // Load question when selectedQuestionId changes
  useEffect(() => {
    if (appState.selectedQuestionId) {
      fetchQuestionAction(appState.selectedQuestionId);
    }
  }, [appState.selectedQuestionId, fetchQuestionAction]);

  // Load code stub when question or language changes
  useEffect(() => {
    const lang = appState.selectedLanguage;
    if (appState.selectedQuestionId && lang) {
      fetchCodeStubAction(
        appState.selectedQuestionId,
        lang as SupportedLanguage
      );
    }
  }, [
    appState.selectedQuestionId,
    appState.selectedLanguage,
    fetchCodeStubAction,
  ]);

  // Clear code stub cache when question changes
  useEffect(() => {
    clearCodeStubsCacheAction();
  }, [appState.selectedQuestionId, clearCodeStubsCacheAction]);

  const contextValue: AppContextType = {
    // State
    appState,
    currentQuestion,
    selectedLanguage,
    isRunning,
    isLoadingQuestion,
    output,
    testResults,

    // Actions
    handleQuestionChange,
    handleLanguageChange,
    setPythonCode: setPythonCodeAction,
    setGoCode: setGoCodeAction,
    setCodeForLanguage: setCodeForLanguageAction,
    getCurrentCode: getCurrentCodeHelper,
    setOutput: setOutputAction,
    setTestResults: setTestResultsAction,
    setIsRunning: setIsRunningAction,
    clearCodeStubsCache: clearCodeStubsCacheAction,

    // Async actions
    fetchAvailableQuestions: fetchAvailableQuestionsAction,
    fetchQuestion: fetchQuestionAction,
    fetchCodeStub: fetchCodeStubAction,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
