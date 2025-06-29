import { invoke } from '@tauri-apps/api/tauri'

export interface Problem {
  id: string
  title: string
  description: string
  difficulty: string
  test_cases: TestCase[]
}

export interface TestCase {
  input: string
  expected_output: string
}

export interface RunCodeRequest {
  code: string
  language: string
  problem_id: string
}

export interface TestResult {
  passed: boolean
  execution_time_ms: number
  memory_used_mb: number
  stdout: string
  stderr: string
  error?: string
}

export interface RunCodeResponse {
  success: boolean
  results: TestResult[]
  error?: string
}

export interface UserProgress {
  problems_solved: number
  total_submissions: number
  last_solved_at?: string
  language_breakdown: Record<string, number>
}

export interface Submission {
  id: string
  problem_id: string
  code: string
  language: string
  verdict: string
  submitted_at: string
}

// Load all available problems
export async function loadProblems(): Promise<Problem[]> {
  try {
    return await invoke('load_problems')
  } catch (error) {
    console.error('Failed to load problems:', error)
    throw error
  }
}

// Get a specific problem by ID
export async function getProblem(problemId: string): Promise<Problem> {
  try {
    return await invoke('get_problem', { problemId })
  } catch (error) {
    console.error('Failed to get problem:', error)
    throw error
  }
}

// Run user code against test cases
export async function runCode(request: RunCodeRequest): Promise<RunCodeResponse> {
  try {
    return await invoke('run_code', { request })
  } catch (error) {
    console.error('Failed to run code:', error)
    throw error
  }
}

// Submit a solution
export async function submitSolution(
  problemId: string,
  code: string,
  language: string,
  verdict: string
): Promise<void> {
  try {
    await invoke('submit_solution', {
      problemId,
      code,
      language,
      verdict
    })
  } catch (error) {
    console.error('Failed to submit solution:', error)
    throw error
  }
}

// Get user progress statistics
export async function getUserProgress(): Promise<UserProgress> {
  try {
    return await invoke('get_user_progress')
  } catch (error) {
    console.error('Failed to get user progress:', error)
    throw error
  }
}

// Get user submissions, optionally filtered by problem ID
export async function getSubmissions(problemId?: string): Promise<Submission[]> {
  try {
    return await invoke('get_submissions', { problemId })
  } catch (error) {
    console.error('Failed to get submissions:', error)
    throw error
  }
}