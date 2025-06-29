import { invoke } from '@tauri-apps/api/tauri';
import { Problem, RunCodeResponse, Submission, UserProgress } from '../store/useStore';

export interface RunCodeRequest {
  code: string;
  language: string;
  problem_id: string;
}

export class API {
  static async loadProblems(): Promise<Problem[]> {
    return await invoke('load_problems');
  }

  static async getProblem(problemId: string): Promise<Problem> {
    return await invoke('get_problem', { problemId });
  }

  static async runCode(request: RunCodeRequest): Promise<RunCodeResponse> {
    return await invoke('run_code', { request });
  }

  static async submitSolution(
    problemId: string,
    code: string,
    language: string,
    verdict: string
  ): Promise<void> {
    return await invoke('submit_solution', {
      problemId,
      code,
      language,
      verdict,
    });
  }

  static async getUserProgress(): Promise<UserProgress> {
    return await invoke('get_user_progress');
  }

  static async getSubmissions(problemId?: string): Promise<Submission[]> {
    return await invoke('get_submissions', { problemId });
  }
}