import { create } from 'zustand';

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  test_cases: TestCase[];
}

export interface TestCase {
  input: string;
  expected_output: string;
}

export interface TestResult {
  passed: boolean;
  execution_time_ms: number;
  memory_used_mb: number;
  stdout: string;
  stderr: string;
  error?: string;
}

export interface RunCodeResponse {
  success: boolean;
  results: TestResult[];
  error?: string;
}

export interface Submission {
  id: string;
  problem_id: string;
  code: string;
  language: string;
  verdict: string;
  submitted_at: string;
}

export interface UserProgress {
  problems_solved: number;
  total_submissions: number;
  last_solved_at?: string;
  language_breakdown: Record<string, number>;
}

interface AppState {
  problems: Problem[];
  currentProblem: Problem | null;
  code: string;
  language: string;
  results: TestResult[];
  isRunning: boolean;
  submissions: Submission[];
  userProgress: UserProgress | null;
  
  // Actions
  setProblems: (problems: Problem[]) => void;
  setCurrentProblem: (problem: Problem) => void;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setResults: (results: TestResult[]) => void;
  setIsRunning: (isRunning: boolean) => void;
  setSubmissions: (submissions: Submission[]) => void;
  setUserProgress: (progress: UserProgress) => void;
}

export const useStore = create<AppState>((set) => ({
  problems: [],
  currentProblem: null,
  code: '',
  language: 'python',
  results: [],
  isRunning: false,
  submissions: [],
  userProgress: null,
  
  setProblems: (problems) => set({ problems }),
  setCurrentProblem: (problem) => set({ currentProblem: problem }),
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setResults: (results) => set({ results }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setSubmissions: (submissions) => set({ submissions }),
  setUserProgress: (userProgress) => set({ userProgress }),
}));