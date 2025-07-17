import { LanguageProvider } from '../providers/language-provider';
import { ILogger } from '../interfaces';

// Mock logger for testing
class MockLogger implements ILogger {
  info = jest.fn();
  warn = jest.fn();
  error = jest.fn();
  debug = jest.fn();
}

describe('LanguageProvider', () => {
  let provider: LanguageProvider;
  let mockLogger: MockLogger;

  beforeEach(() => {
    mockLogger = new MockLogger();
    provider = new LanguageProvider(mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getLanguageConfig', () => {
    it('should return language config for supported language', () => {
      // Act
      const config = provider.getLanguageConfig('javascript');

      // Assert
      expect(config).toBeDefined();
      expect(config?.identifier).toBe('javascript');
      expect(config?.name).toBe('JavaScript (Node.js 12.14.0)');
      expect(config?.id).toBe(63);
    });

    it('should return null for unsupported language', () => {
      // Act
      const config = provider.getLanguageConfig('unsupported-language');

      // Assert
      expect(config).toBeNull();
      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Unsupported language requested',
        {
          language: 'unsupported-language',
          normalizedLanguage: 'unsupported-language',
          supportedLanguages: expect.any(Array),
        }
      );
    });

    it('should be case insensitive', () => {
      // Act
      const config1 = provider.getLanguageConfig('JAVASCRIPT');
      const config2 = provider.getLanguageConfig('JavaScript');
      const config3 = provider.getLanguageConfig('javascript');

      // Assert
      expect(config1).toBeDefined();
      expect(config2).toBeDefined();
      expect(config3).toBeDefined();
      expect(config1?.identifier).toBe('javascript');
      expect(config2?.identifier).toBe('javascript');
      expect(config3?.identifier).toBe('javascript');
    });

    it('should return all supported languages', () => {
      // Act
      const languages = provider.getSupportedLanguages();

      // Assert
      expect(languages).toBeDefined();
      expect(Object.keys(languages).length).toBeGreaterThan(0);
      expect(languages.javascript).toBeDefined();
      expect(languages.python).toBeDefined();
      expect(languages.go).toBeDefined();
    });
  });

  describe('isLanguageSupported', () => {
    it('should return true for supported language', () => {
      // Act
      const isSupported = provider.isLanguageSupported('python');

      // Assert
      expect(isSupported).toBe(true);
    });

    it('should return false for unsupported language', () => {
      // Act
      const isSupported = provider.isLanguageSupported('unsupported');

      // Assert
      expect(isSupported).toBe(false);
    });

    it('should be case insensitive', () => {
      // Act
      const isSupported1 = provider.isLanguageSupported('PYTHON');
      const isSupported2 = provider.isLanguageSupported('Python');
      const isSupported3 = provider.isLanguageSupported('python');

      // Assert
      expect(isSupported1).toBe(true);
      expect(isSupported2).toBe(true);
      expect(isSupported3).toBe(true);
    });
  });

  describe('addLanguage (Open/Closed Principle)', () => {
    it('should add new language without modifying existing code', () => {
      // Arrange
      const newLanguageConfig = {
        id: 999,
        name: 'New Language',
        identifier: 'newlang',
        cpuTimeLimit: 10,
        memoryLimit: 1024000,
        enableNetwork: true,
      };

      // Act
      provider.addLanguage('newlang', newLanguageConfig);

      // Assert
      const config = provider.getLanguageConfig('newlang');
      expect(config).toBeDefined();
      expect(config?.name).toBe('New Language');
      expect(config?.id).toBe(999);
      expect(provider.isLanguageSupported('newlang')).toBe(true);

      // Verify logging
      expect(mockLogger.info).toHaveBeenCalledWith('New language added', {
        identifier: 'newlang',
        config: newLanguageConfig,
      });
    });

    it('should override existing language config', () => {
      // Arrange
      const originalConfig = provider.getLanguageConfig('javascript');
      const updatedConfig = {
        ...originalConfig!,
        cpuTimeLimit: 15,
        memoryLimit: 2048000,
      };

      // Act
      provider.addLanguage('javascript', updatedConfig);

      // Assert
      const config = provider.getLanguageConfig('javascript');
      expect(config?.cpuTimeLimit).toBe(15);
      expect(config?.memoryLimit).toBe(2048000);
    });
  });

  describe('removeLanguage', () => {
    it('should remove existing language', () => {
      // Arrange
      expect(provider.isLanguageSupported('javascript')).toBe(true);

      // Act
      const removed = provider.removeLanguage('javascript');

      // Assert
      expect(removed).toBe(true);
      expect(provider.isLanguageSupported('javascript')).toBe(false);
      expect(provider.getLanguageConfig('javascript')).toBeNull();

      // Verify logging
      expect(mockLogger.info).toHaveBeenCalledWith('Language removed', {
        identifier: 'javascript',
      });
    });

    it('should return false for non-existent language', () => {
      // Act
      const removed = provider.removeLanguage('non-existent');

      // Assert
      expect(removed).toBe(false);
    });

    it('should be case insensitive for removal', () => {
      // Arrange
      expect(provider.isLanguageSupported('javascript')).toBe(true);

      // Act
      const removed = provider.removeLanguage('JAVASCRIPT');

      // Assert
      expect(removed).toBe(true);
      expect(provider.isLanguageSupported('javascript')).toBe(false);
    });
  });

  describe('language configurations', () => {
    it('should have correct Go configuration', () => {
      // Act
      const config = provider.getLanguageConfig('go');

      // Assert
      expect(config).toBeDefined();
      expect(config?.id).toBe(60);
      expect(config?.name).toBe('Go');
      expect(config?.identifier).toBe('go');
      expect(config?.cpuTimeLimit).toBe(5);
      expect(config?.memoryLimit).toBe(512000);
      expect(config?.enableNetwork).toBe(false);
    });

    it('should have correct Python configuration', () => {
      // Act
      const config = provider.getLanguageConfig('python');

      // Assert
      expect(config).toBeDefined();
      expect(config?.id).toBe(71);
      expect(config?.name).toBe('Python (3.8.1)');
      expect(config?.identifier).toBe('python');
      expect(config?.cpuTimeLimit).toBe(5);
      expect(config?.memoryLimit).toBe(512000);
      expect(config?.enableNetwork).toBe(false);
    });

    it('should have correct Java configuration', () => {
      // Act
      const config = provider.getLanguageConfig('java');

      // Assert
      expect(config).toBeDefined();
      expect(config?.id).toBe(62);
      expect(config?.name).toBe('Java');
      expect(config?.identifier).toBe('java');
      expect(config?.cpuTimeLimit).toBe(5);
      expect(config?.memoryLimit).toBe(512000);
      expect(config?.enableNetwork).toBe(false);
    });

    it('should have correct C++ configuration', () => {
      // Act
      const config = provider.getLanguageConfig('cpp');

      // Assert
      expect(config).toBeDefined();
      expect(config?.id).toBe(54);
      expect(config?.name).toBe('C++ (GCC 9.2.0)');
      expect(config?.identifier).toBe('cpp');
      expect(config?.cpuTimeLimit).toBe(5);
      expect(config?.memoryLimit).toBe(512000);
      expect(config?.enableNetwork).toBe(false);
    });

    it('should have correct Rust configuration', () => {
      // Act
      const config = provider.getLanguageConfig('rust');

      // Assert
      expect(config).toBeDefined();
      expect(config?.id).toBe(73);
      expect(config?.name).toBe('Rust');
      expect(config?.identifier).toBe('rust');
      expect(config?.cpuTimeLimit).toBe(5);
      expect(config?.memoryLimit).toBe(512000);
      expect(config?.enableNetwork).toBe(false);
    });
  });

  describe('getSupportedLanguages', () => {
    it('should return a copy of languages object', () => {
      // Act
      const languages1 = provider.getSupportedLanguages();
      const languages2 = provider.getSupportedLanguages();

      // Assert
      expect(languages1).not.toBe(languages2); // Should be different objects
      expect(languages1).toEqual(languages2); // But same content
    });

    it('should not allow modification of returned object', () => {
      // Arrange
      const languages = provider.getSupportedLanguages();
      const originalCount = Object.keys(languages).length;

      // Act
      (languages as unknown as Record<string, unknown>).test =
        'should not be added';

      // Assert
      const languagesAfter = provider.getSupportedLanguages();
      expect(Object.keys(languagesAfter).length).toBe(originalCount);
      expect(languagesAfter.test).toBeUndefined();
    });
  });
});
