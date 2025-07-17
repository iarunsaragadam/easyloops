// Judge0 API types
export interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit?: number;
  memory_limit?: number;
  enable_network?: boolean;
}

export interface Judge0Token {
  token: string;
}

export interface Judge0SubmissionResponse {
  stdout: string | null;
  time: string | null;
  memory: number | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
}

// Request/Response types
export interface ExecuteCodeRequest {
  code: string;
  language: string; // Language identifier (e.g., "go", "java", "cpp", "rust")
  questionId: string;
  input?: string;
}

export interface ExecuteCodeResponse {
  success: boolean;
  output?: string;
  error?: string;
  executionTime?: number;
  memory?: number;
  status?: string;
  language?: string;
}

// Authorization types
export interface AuthenticatedUser {
  uid: string;
  email: string;
  email_verified: boolean;
}

// Environment configuration
export interface Judge0Config {
  baseUrl: string;
  apiKey?: string;
  timeout: number;
}

// Language configuration
export interface LanguageConfig {
  id: number;
  name: string;
  identifier: string;
  cpuTimeLimit: number;
  memoryLimit: number;
  enableNetwork: boolean;
}

// Supported languages mapping
export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  go: {
    id: 60,
    name: 'Go',
    identifier: 'go',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  java: {
    id: 62,
    name: 'Java',
    identifier: 'java',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  cpp: {
    id: 54,
    name: 'C++ (GCC 9.2.0)',
    identifier: 'cpp',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  c: {
    id: 50,
    name: 'C (GCC 9.2.0)',
    identifier: 'c',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  rust: {
    id: 73,
    name: 'Rust',
    identifier: 'rust',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  python: {
    id: 71,
    name: 'Python (3.8.1)',
    identifier: 'python',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  javascript: {
    id: 63,
    name: 'JavaScript (Node.js 12.14.0)',
    identifier: 'javascript',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  typescript: {
    id: 74,
    name: 'TypeScript (3.7.4)',
    identifier: 'typescript',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  csharp: {
    id: 51,
    name: 'C# (Mono 6.6.0.161)',
    identifier: 'csharp',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  php: {
    id: 68,
    name: 'PHP (7.4.1)',
    identifier: 'php',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  ruby: {
    id: 72,
    name: 'Ruby (2.7.0)',
    identifier: 'ruby',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  swift: {
    id: 83,
    name: 'Swift (5.2.3)',
    identifier: 'swift',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  kotlin: {
    id: 78,
    name: 'Kotlin (1.3.70)',
    identifier: 'kotlin',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
  scala: {
    id: 81,
    name: 'Scala (2.13.2)',
    identifier: 'scala',
    cpuTimeLimit: 5,
    memoryLimit: 512000,
    enableNetwork: false,
  },
};
