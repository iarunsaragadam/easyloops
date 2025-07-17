import {
  ICodeExecutionService,
  CodeExecutionRequest,
  CodeExecutionResult,
} from '../interfaces';
import { ILogger } from '../interfaces';
import { Judge0Submission, Judge0SubmissionResponse } from '../types';
import { LanguageConfiguration } from '../interfaces';

// Define interfaces for dependencies
export interface IJudge0Client {
  executeCode(submission: Judge0Submission): Promise<Judge0SubmissionResponse>;
}

export interface ILanguageProvider {
  getLanguageConfig(languageIdentifier: string): LanguageConfiguration | null;
}

export class CodeExecutionService implements ICodeExecutionService {
  constructor(
    private readonly judge0Client: IJudge0Client,
    private readonly languageProvider: ILanguageProvider,
    private readonly logger: ILogger
  ) {}

  async executeCode(
    request: CodeExecutionRequest
  ): Promise<CodeExecutionResult> {
    const startTime = Date.now();

    try {
      this.logger.info('Starting code execution', {
        language: request.language,
        questionId: request.questionId,
        codeLength: request.code.length,
        userId: request.userId,
      });

      // Get language configuration
      const languageConfig = this.languageProvider.getLanguageConfig(
        request.language
      );
      if (!languageConfig) {
        throw new Error(`Unsupported language: ${request.language}`);
      }

      // Prepare submission
      const submission: Judge0Submission = {
        source_code: request.code,
        language_id: languageConfig.id,
        stdin: request.input || '',
        cpu_time_limit: languageConfig.cpuTimeLimit,
        memory_limit: languageConfig.memoryLimit,
        enable_network: languageConfig.enableNetwork,
      };

      // Execute code
      const result: Judge0SubmissionResponse =
        await this.judge0Client.executeCode(submission);
      const executionTime = Date.now() - startTime;

      this.logger.info('Code execution completed', {
        language: request.language,
        executionTime,
        status: result.status?.description,
        hasOutput: !!result.stdout,
        hasError: !!result.stderr,
        userId: request.userId,
      });

      return {
        success: true,
        output: result.stdout || '',
        error:
          result.stderr || result.compile_output
            ? result.stderr || result.compile_output
            : null,
        executionTime,
        memory: result.memory || 0,
        status: result.status?.description || 'Unknown',
        language: languageConfig.identifier,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;

      this.logger.error('Code execution failed', {
        language: request.language,
        executionTime,
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: request.userId,
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime,
        language: request.language,
      };
    }
  }
}
