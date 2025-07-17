import { LanguageConfiguration } from '../interfaces';
import { ILogger } from '../interfaces';

export interface ILanguageProvider {
  getLanguageConfig(languageIdentifier: string): LanguageConfiguration | null;
  getSupportedLanguages(): Record<string, LanguageConfiguration>;
  isLanguageSupported(languageIdentifier: string): boolean;
}

export class LanguageProvider implements ILanguageProvider {
  private readonly supportedLanguages: Record<string, LanguageConfiguration>;

  constructor(
    private readonly logger: ILogger,
    languages?: Record<string, LanguageConfiguration>
  ) {
    // Default supported languages - can be extended without modifying this class
    this.supportedLanguages = languages || {
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
  }

  getLanguageConfig(languageIdentifier: string): LanguageConfiguration | null {
    const normalizedLanguage = languageIdentifier.toLowerCase();
    const config = this.supportedLanguages[normalizedLanguage];

    if (!config) {
      this.logger.warn('Unsupported language requested', {
        language: languageIdentifier,
        normalizedLanguage,
        supportedLanguages: Object.keys(this.supportedLanguages),
      });
    }

    return config || null;
  }

  getSupportedLanguages(): Record<string, LanguageConfiguration> {
    return { ...this.supportedLanguages }; // Return copy to prevent modification
  }

  isLanguageSupported(languageIdentifier: string): boolean {
    return this.getLanguageConfig(languageIdentifier) !== null;
  }

  // Method to add new languages dynamically (Open/Closed Principle)
  addLanguage(identifier: string, config: LanguageConfiguration): void {
    this.supportedLanguages[identifier.toLowerCase()] = config;
    this.logger.info('New language added', { identifier, config });
  }

  // Method to remove languages
  removeLanguage(identifier: string): boolean {
    const normalizedIdentifier = identifier.toLowerCase();
    if (this.supportedLanguages[normalizedIdentifier]) {
      delete this.supportedLanguages[normalizedIdentifier];
      this.logger.info('Language removed', { identifier });
      return true;
    }
    return false;
  }
}
