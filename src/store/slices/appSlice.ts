import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/shared/types';
import {
  loadQuestion,
  getAvailableQuestions,
  loadCodeStub,
} from '@/shared/lib';
import { DEFAULT_QUESTION_ID } from '@/shared/constants';
import type { SupportedLanguage } from '@/shared/constants/languages';

// Async thunks
export const fetchAvailableQuestions = createAsyncThunk(
  'app/fetchAvailableQuestions',
  async () => {
    const questions = await getAvailableQuestions();
    return questions;
  }
);

export const fetchQuestion = createAsyncThunk(
  'app/fetchQuestion',
  async (questionId: string) => {
    const question = await loadQuestion(questionId);
    return question;
  }
);

export const fetchCodeStub = createAsyncThunk(
  'app/fetchCodeStub',
  async ({
    questionId,
    language,
  }: {
    questionId: string;
    language: SupportedLanguage;
  }) => {
    const stub = await loadCodeStub(questionId, language);
    return { language, stub };
  }
);

// Initial state
const initialState: AppState = {
  pythonCode: '',
  goCode: '',
  output: '',
  testResults: [],
  isRunning: false,
  currentQuestion: null,
  availableQuestions: [],
  selectedQuestionId: DEFAULT_QUESTION_ID,
  selectedLanguage: 'python',
  isLoadingQuestion: false,
};

// Cache for loaded code stubs
const codeStubsCache: Record<string, string> = {};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedQuestionId: (state, action: PayloadAction<string>) => {
      state.selectedQuestionId = action.payload;
      state.output = '';
      state.testResults = [];
      state.isRunning = false;
    },
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
    setPythonCode: (state, action: PayloadAction<string>) => {
      state.pythonCode = action.payload;
      codeStubsCache['python'] = action.payload;
    },
    setGoCode: (state, action: PayloadAction<string>) => {
      state.goCode = action.payload;
      codeStubsCache['go'] = action.payload;
    },
    setCodeForLanguage: (
      state,
      action: PayloadAction<{ language: string; code: string }>
    ) => {
      const { language, code } = action.payload;
      codeStubsCache[language] = code;

      if (language === 'python') {
        state.pythonCode = code;
      } else if (language === 'go') {
        state.goCode = code;
      }
    },
    setOutput: (state, action: PayloadAction<string>) => {
      state.output = action.payload;
    },
    setTestResults: (state, action: PayloadAction<AppState['testResults']>) => {
      state.testResults = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    clearCodeStubsCache: () => {
      Object.keys(codeStubsCache).forEach((key) => delete codeStubsCache[key]);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch available questions
      .addCase(fetchAvailableQuestions.pending, () => {
        // No loading state needed for this
      })
      .addCase(fetchAvailableQuestions.fulfilled, (state, action) => {
        state.availableQuestions = action.payload;
      })
      .addCase(fetchAvailableQuestions.rejected, (state, action) => {
        console.error('Failed to fetch available questions:', action.error);
      })
      // Fetch question
      .addCase(fetchQuestion.pending, (state) => {
        state.isLoadingQuestion = true;
      })
      .addCase(fetchQuestion.fulfilled, (state, action) => {
        state.currentQuestion = action.payload;
        state.isLoadingQuestion = false;
      })
      .addCase(fetchQuestion.rejected, (state, action) => {
        console.error('Failed to fetch question:', action.error);
        state.currentQuestion = null;
        state.isLoadingQuestion = false;
      })
      // Fetch code stub
      .addCase(fetchCodeStub.fulfilled, (state, action) => {
        const { language, stub } = action.payload;
        codeStubsCache[language] = stub;

        if (language === 'python') {
          state.pythonCode = stub;
        } else if (language === 'go') {
          state.goCode = stub;
        }
      })
      .addCase(fetchCodeStub.rejected, (state, action) => {
        console.error('Failed to fetch code stub:', action.error);
      });
  },
});

export const {
  setSelectedQuestionId,
  setSelectedLanguage,
  setPythonCode,
  setGoCode,
  setCodeForLanguage,
  setOutput,
  setTestResults,
  setIsRunning,
  clearCodeStubsCache,
} = appSlice.actions;

// Selectors
export const selectAppState = (state: { app: AppState }) => state.app;
export const selectCurrentQuestion = (state: { app: AppState }) =>
  state.app.currentQuestion;
export const selectSelectedLanguage = (state: { app: AppState }) =>
  state.app.selectedLanguage;
export const selectIsRunning = (state: { app: AppState }) =>
  state.app.isRunning;
export const selectIsLoadingQuestion = (state: { app: AppState }) =>
  state.app.isLoadingQuestion;
export const selectOutput = (state: { app: AppState }) => state.app.output;
export const selectTestResults = (state: { app: AppState }) =>
  state.app.testResults;

// Helper function to get current code (similar to the original getCurrentCode)
export const getCurrentCode = (state: { app: AppState }): string => {
  const language = state.app.selectedLanguage;

  // First check if we have a cached stub for this language
  if (codeStubsCache[language]) {
    return codeStubsCache[language];
  }

  // Fall back to the state values
  if (language === 'python') {
    return state.app.pythonCode;
  } else if (language === 'go') {
    return state.app.goCode;
  }

  return '';
};

export default appSlice.reducer;
