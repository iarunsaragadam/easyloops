import {
  ICodeExecutionService,
  CodeExecutionRequest,
  ValidationResult,
} from '../interfaces';
import { IRequestValidator, ILogger } from '../interfaces';
import { AuthenticatedUser } from '../interfaces';

export interface ControllerResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  statusCode: number;
}

export class CodeExecutionController {
  constructor(
    private readonly codeExecutionService: ICodeExecutionService,
    private readonly requestValidator: IRequestValidator,
    private readonly logger: ILogger
  ) {}

  async handleExecuteCode(
    requestBody: unknown,
    user: AuthenticatedUser
  ): Promise<ControllerResponse> {
    try {
      this.logger.info('Processing code execution request', {
        userId: user.uid,
        userEmail: user.email,
      });

      // Validate request
      const validationResult: ValidationResult =
        this.requestValidator.validateRequest(requestBody);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: 'Invalid request',
          statusCode: 400,
          data: {
            message: 'Request validation failed',
            errors: validationResult.errors,
          },
        };
      }

      // Type guard to ensure requestBody is an object with required properties
      if (!requestBody || typeof requestBody !== 'object') {
        return {
          success: false,
          error: 'Invalid request format',
          statusCode: 400,
          data: {
            message: 'Request must be a valid object',
          },
        };
      }

      const requestObj = requestBody as Record<string, unknown>;

      // Prepare execution request
      const executionRequest: CodeExecutionRequest = {
        code: requestObj.code as string,
        language: requestObj.language as string,
        questionId: requestObj.questionId as string,
        input: requestObj.input as string | undefined,
        userId: user.uid,
      };

      // Execute code
      const result =
        await this.codeExecutionService.executeCode(executionRequest);

      if (result.success) {
        return {
          success: true,
          data: result,
          statusCode: 200,
        };
      } else {
        return {
          success: false,
          error: 'Code execution failed',
          statusCode: 500,
          data: {
            message: result.error,
            executionTime: result.executionTime,
            language: result.language,
          },
        };
      }
    } catch (error) {
      this.logger.error('Controller error during code execution', {
        userId: user.uid,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return {
        success: false,
        error: 'Internal server error',
        statusCode: 500,
        data: {
          message: 'Code execution failed. Please try again later.',
        },
      };
    }
  }
}
