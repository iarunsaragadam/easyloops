// Core interfaces following Dependency Inversion Principle

export interface ICodeExecutionService {
  executeCode(request: CodeExecutionRequest): Promise<CodeExecutionResult>;
}

export interface IAuthenticationService {
  authenticateUser(token: string): Promise<AuthenticatedUser | null>;
}

export interface IAuthorizationService {
  isAuthorized(user: AuthenticatedUser, language?: string): Promise<boolean>;
}

export interface ICodeValidator {
  validateCode(code: string, language: string): ValidationResult;
}

export interface IRequestValidator {
  validateRequest(request: unknown): ValidationResult;
}

export interface ILogger {
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
}

export interface IHttpClient {
  post<T>(url: string, data: unknown): Promise<T>;
  get<T>(url: string): Promise<T>;
}

// Request/Response interfaces
export interface CodeExecutionRequest {
  code: string;
  language: string;
  questionId: string;
  input?: string;
  userId?: string;
}

export interface CodeExecutionResult {
  success: boolean;
  output?: string;
  error?: string | null;
  executionTime: number;
  memory?: number;
  status?: string;
  language: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface AuthenticatedUser {
  uid: string;
  email: string;
  email_verified: boolean;
}

// Configuration interfaces
export interface LanguageConfiguration {
  id: number;
  name: string;
  identifier: string;
  cpuTimeLimit: number;
  memoryLimit: number;
  enableNetwork: boolean;
}

export interface ServiceConfiguration {
  judge0: {
    baseUrl: string;
    apiKey?: string;
    timeout: number;
  };
  limits: {
    maxCodeLength: number;
    maxExecutionTime: number;
    maxMemoryUsage: number;
  };
}
