import {
  ICodeExecutionService,
  IRequestValidator,
  ILogger,
  IAuthenticationService,
  IAuthorizationService,
} from '../interfaces';
import {
  CodeExecutionService,
  IJudge0Client,
  ILanguageProvider,
} from '../services/code-execution.service';
import { RequestValidator } from '../validators/request-validator';
import { LanguageProvider } from '../providers/language-provider';
import { CodeExecutionController } from '../controllers/code-execution.controller';
import { Judge0Client } from '../judge0-client';
import { ServiceConfiguration } from '../interfaces';

// Simple logger implementation
class SimpleLogger implements ILogger {
  info(message: string, meta?: Record<string, unknown>): void {
    console.log(`[INFO] ${message}`, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    console.warn(`[WARN] ${message}`, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    console.error(`[ERROR] ${message}`, meta);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    console.debug(`[DEBUG] ${message}`, meta);
  }
}

// Simple auth service implementation
class SimpleAuthService
  implements IAuthenticationService, IAuthorizationService
{
  constructor(private readonly logger: ILogger) {}

  async authenticateUser(
    token: string
  ): Promise<import('../interfaces').AuthenticatedUser | null> {
    this.logger.info('Authenticating user', { tokenLength: token.length });
    // For now, return a mock user - in real implementation, verify Firebase token
    return {
      uid: 'mock-user-id',
      email: 'mock@example.com',
      email_verified: true,
    };
  }

  async isAuthorized(
    user: import('../interfaces').AuthenticatedUser,
    language?: string
  ): Promise<boolean> {
    this.logger.info('Checking authorization', { uid: user.uid, language });
    return true; // For now, all users are authorized
  }
}

export class DependencyContainer {
  private static instance: DependencyContainer;
  private services: Map<string, unknown> = new Map();

  private constructor(private config: ServiceConfiguration) {}

  static getInstance(config?: ServiceConfiguration): DependencyContainer {
    if (!DependencyContainer.instance && config) {
      DependencyContainer.instance = new DependencyContainer(config);
    }
    return DependencyContainer.instance;
  }

  // Logger
  getLogger(): ILogger {
    if (!this.services.has('logger')) {
      this.services.set('logger', new SimpleLogger());
    }
    return this.services.get('logger') as ILogger;
  }

  // Language Provider
  getLanguageProvider(): LanguageProvider {
    if (!this.services.has('languageProvider')) {
      this.services.set(
        'languageProvider',
        new LanguageProvider(this.getLogger())
      );
    }
    return this.services.get('languageProvider') as LanguageProvider;
  }

  // Judge0 Client
  getJudge0Client(): Judge0Client {
    if (!this.services.has('judge0Client')) {
      this.services.set(
        'judge0Client',
        new Judge0Client({
          baseUrl: this.config.judge0.baseUrl,
          apiKey: this.config.judge0.apiKey,
          timeout: this.config.judge0.timeout,
        })
      );
    }
    return this.services.get('judge0Client') as Judge0Client;
  }

  // Code Execution Service
  getCodeExecutionService(): ICodeExecutionService {
    if (!this.services.has('codeExecutionService')) {
      this.services.set(
        'codeExecutionService',
        new CodeExecutionService(
          this.getJudge0Client() as IJudge0Client,
          this.getLanguageProvider() as ILanguageProvider,
          this.getLogger()
        )
      );
    }
    return this.services.get('codeExecutionService') as ICodeExecutionService;
  }

  // Request Validator
  getRequestValidator(): IRequestValidator {
    if (!this.services.has('requestValidator')) {
      this.services.set(
        'requestValidator',
        new RequestValidator(this.getLogger(), this.config.limits.maxCodeLength)
      );
    }
    return this.services.get('requestValidator') as IRequestValidator;
  }

  // Authentication Service
  getAuthenticationService(): IAuthenticationService {
    if (!this.services.has('authService')) {
      this.services.set('authService', new SimpleAuthService(this.getLogger()));
    }
    return this.services.get('authService') as IAuthenticationService;
  }

  // Authorization Service
  getAuthorizationService(): IAuthorizationService {
    if (!this.services.has('authorizationService')) {
      this.services.set(
        'authorizationService',
        new SimpleAuthService(this.getLogger())
      );
    }
    return this.services.get('authorizationService') as IAuthorizationService;
  }

  // Code Execution Controller
  getCodeExecutionController(): CodeExecutionController {
    if (!this.services.has('codeExecutionController')) {
      this.services.set(
        'codeExecutionController',
        new CodeExecutionController(
          this.getCodeExecutionService(),
          this.getRequestValidator(),
          this.getLogger()
        )
      );
    }
    return this.services.get(
      'codeExecutionController'
    ) as CodeExecutionController;
  }

  // Method to register mock services for testing
  registerMockService<T>(serviceName: string, mockService: T): void {
    this.services.set(serviceName, mockService);
  }

  // Method to clear all services (useful for testing)
  clear(): void {
    this.services.clear();
  }
}
