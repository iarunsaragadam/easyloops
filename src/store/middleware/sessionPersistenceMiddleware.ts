import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { SessionPersistenceService } from '@/shared/services/sessionPersistenceService';
import {
  setPythonCode,
  setGoCode,
  setCodeForLanguage,
  setSelectedQuestionId,
  setSelectedLanguage,
  loadSessionForQuestion,
} from '../slices/appSlice';

export const sessionPersistenceMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    // Handle code changes - save to localStorage
    if (setPythonCode.match(action)) {
      const { selectedQuestionId } = nextState.app;
      if (selectedQuestionId) {
        SessionPersistenceService.saveCode(
          selectedQuestionId,
          'python',
          action.payload
        );
      }
    }

    if (setGoCode.match(action)) {
      const { selectedQuestionId } = nextState.app;
      if (selectedQuestionId) {
        SessionPersistenceService.saveCode(
          selectedQuestionId,
          'go',
          action.payload
        );
      }
    }

    if (setCodeForLanguage.match(action)) {
      const { selectedQuestionId } = nextState.app;
      const { language, code } = action.payload;
      if (selectedQuestionId) {
        SessionPersistenceService.saveCode(selectedQuestionId, language, code);
      }
    }

    // Handle question changes - save current session and load new session
    if (setSelectedQuestionId.match(action)) {
      const { selectedQuestionId: oldQuestionId, selectedLanguage } =
        prevState.app;
      const newQuestionId = action.payload;

      // Save current session before switching
      if (oldQuestionId && selectedLanguage) {
        const currentCode = getCurrentCodeFromState(prevState.app);
        if (currentCode) {
          SessionPersistenceService.saveCode(
            oldQuestionId,
            selectedLanguage,
            currentCode
          );
        }
      }

      // Load saved session for new question
      if (newQuestionId && selectedLanguage) {
        const savedCode = SessionPersistenceService.loadCode(
          newQuestionId,
          selectedLanguage
        );
        if (savedCode) {
          // Dispatch action to load the saved code
          store.dispatch(
            loadSessionForQuestion({
              questionId: newQuestionId,
              language: selectedLanguage,
              code: savedCode,
            })
          );
        }
      }
    }

    // Handle language changes - save current session and load new session
    if (setSelectedLanguage.match(action)) {
      const { selectedQuestionId, selectedLanguage: oldLanguage } =
        prevState.app;
      const newLanguage = action.payload;

      // Save current session before switching language
      if (selectedQuestionId && oldLanguage) {
        const currentCode = getCurrentCodeFromState(prevState.app);
        if (currentCode) {
          SessionPersistenceService.saveCode(
            selectedQuestionId,
            oldLanguage,
            currentCode
          );
        }
      }

      // Load saved session for new language
      if (selectedQuestionId && newLanguage) {
        const savedCode = SessionPersistenceService.loadCode(
          selectedQuestionId,
          newLanguage
        );
        if (savedCode) {
          // Dispatch action to load the saved code
          store.dispatch(
            loadSessionForQuestion({
              questionId: selectedQuestionId,
              language: newLanguage,
              code: savedCode,
            })
          );
        }
      }
    }

    return result;
  };

// Helper function to get current code from state
const getCurrentCodeFromState = (appState: {
  selectedLanguage: string;
  pythonCode: string;
  goCode: string;
}): string => {
  const language = appState.selectedLanguage;

  // Check if we have code in the state
  if (language === 'python') {
    return appState.pythonCode;
  } else if (language === 'go') {
    return appState.goCode;
  }

  return '';
};
