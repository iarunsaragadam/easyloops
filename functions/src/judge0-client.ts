import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  Judge0Submission,
  Judge0Token,
  Judge0SubmissionResponse,
  Judge0Config,
} from './types';

export class Judge0Client {
  private client: AxiosInstance;

  constructor(config: Judge0Config) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'X-RapidAPI-Key': config.apiKey }),
      },
    });
  }

  /**
   * Submit code for execution
   */
  async submitCode(submission: Judge0Submission): Promise<string> {
    try {
      const response: AxiosResponse<Judge0Token> = await this.client.post(
        '/submissions',
        submission
      );

      return response.data.token;
    } catch (error) {
      throw new Error(
        `Failed to submit code: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get submission result
   */
  async getSubmissionResult(token: string): Promise<Judge0SubmissionResponse> {
    try {
      const response: AxiosResponse<Judge0SubmissionResponse> =
        await this.client.get(`/submissions/${token}`);

      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to get submission result: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Wait for submission to complete and return result
   */
  async executeCode(
    submission: Judge0Submission
  ): Promise<Judge0SubmissionResponse> {
    // Submit the code
    const token = await this.submitCode(submission);

    // Poll for results
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds with 1-second intervals
    const pollInterval = 1000; // 1 second

    while (attempts < maxAttempts) {
      const result = await this.getSubmissionResult(token);

      // Check if execution is complete
      if (result.status && result.status.id >= 3) {
        return result;
      }

      // Wait before next poll
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      attempts++;
    }

    throw new Error('Code execution timed out');
  }

  /**
   * Get available languages
   */
  async getLanguages(): Promise<unknown[]> {
    try {
      const response: AxiosResponse<unknown[]> =
        await this.client.get('/languages');

      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to get languages: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
