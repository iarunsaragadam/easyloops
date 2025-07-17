import { IRequestValidator, ValidationResult } from '../interfaces';
import { ILogger } from '../interfaces';

export class RequestValidator implements IRequestValidator {
  constructor(
    private readonly logger: ILogger,
    private readonly maxCodeLength: number = 10000
  ) {}

  validateRequest(request: unknown): ValidationResult {
    const errors: string[] = [];

    // Type guard to ensure request is an object
    if (!request || typeof request !== 'object') {
      errors.push('Request must be a valid object');
      return { isValid: false, errors };
    }

    const requestObj = request as Record<string, unknown>;

    // Validate code
    if (!requestObj.code || typeof requestObj.code !== 'string') {
      errors.push('Code is required and must be a string');
    } else if (requestObj.code.length > this.maxCodeLength) {
      errors.push(`Code must be less than ${this.maxCodeLength} characters`);
    }

    // Validate language
    if (!requestObj.language || typeof requestObj.language !== 'string') {
      errors.push('Language is required and must be a string');
    }

    // Validate questionId
    if (!requestObj.questionId || typeof requestObj.questionId !== 'string') {
      errors.push('Question ID is required and must be a string');
    }

    // Validate input (optional)
    if (
      requestObj.input !== undefined &&
      typeof requestObj.input !== 'string'
    ) {
      errors.push('Input must be a string if provided');
    }

    const isValid = errors.length === 0;

    if (!isValid) {
      this.logger.warn('Request validation failed', {
        errors,
        request: {
          hasCode: !!requestObj.code,
          codeType: typeof requestObj.code,
          codeLength:
            typeof requestObj.code === 'string'
              ? requestObj.code.length
              : undefined,
          hasLanguage: !!requestObj.language,
          languageType: typeof requestObj.language,
          hasQuestionId: !!requestObj.questionId,
          questionIdType: typeof requestObj.questionId,
          hasInput: !!requestObj.input,
          inputType: typeof requestObj.input,
        },
      });
    }

    return {
      isValid,
      errors,
    };
  }
}
