import {
  DEFAULT_CODE,
  LAYOUT_CONSTANTS,
  PYODIDE_CONFIG,
  MONACO_CONFIG,
  DEFAULT_QUESTION_ID,
  SUPPORTED_LANGUAGES
} from '../index';

describe('Constants', () => {
  describe('DEFAULT_CODE', () => {
    it('should be a string', () => {
      expect(typeof DEFAULT_CODE).toBe('string');
    });

    it('should contain Python code', () => {
      expect(DEFAULT_CODE).toContain('n = int(input())');
      expect(DEFAULT_CODE).toContain('for i in range(1, n + 1):');
      expect(DEFAULT_CODE).toContain('print("*", end="")');
    });

    it('should include comments', () => {
      expect(DEFAULT_CODE).toContain('# Nested Loops - Right Triangle Pattern');
      expect(DEFAULT_CODE).toContain('# Read the number of rows');
    });

    it('should be multi-line', () => {
      expect(DEFAULT_CODE.split('\n').length).toBeGreaterThan(1);
    });
  });

  describe('LAYOUT_CONSTANTS', () => {
    it('should have all required layout properties', () => {
      expect(LAYOUT_CONSTANTS).toHaveProperty('DEFAULT_LEFT_PANE_WIDTH');
      expect(LAYOUT_CONSTANTS).toHaveProperty('DEFAULT_TEST_RESULTS_HEIGHT');
      expect(LAYOUT_CONSTANTS).toHaveProperty('MIN_LEFT_PANE_WIDTH');
      expect(LAYOUT_CONSTANTS).toHaveProperty('MAX_LEFT_PANE_WIDTH');
      expect(LAYOUT_CONSTANTS).toHaveProperty('MIN_TEST_RESULTS_HEIGHT');
      expect(LAYOUT_CONSTANTS).toHaveProperty('MAX_TEST_RESULTS_HEIGHT');
    });

    it('should have correct default values', () => {
      expect(LAYOUT_CONSTANTS.DEFAULT_LEFT_PANE_WIDTH).toBe(40);
      expect(LAYOUT_CONSTANTS.DEFAULT_TEST_RESULTS_HEIGHT).toBe(150);
    });

    it('should have logical min/max constraints', () => {
      expect(LAYOUT_CONSTANTS.MIN_LEFT_PANE_WIDTH).toBeLessThan(LAYOUT_CONSTANTS.MAX_LEFT_PANE_WIDTH);
      expect(LAYOUT_CONSTANTS.MIN_TEST_RESULTS_HEIGHT).toBeLessThan(LAYOUT_CONSTANTS.MAX_TEST_RESULTS_HEIGHT);
    });

    it('should have default values within min/max ranges', () => {
      expect(LAYOUT_CONSTANTS.DEFAULT_LEFT_PANE_WIDTH).toBeGreaterThanOrEqual(LAYOUT_CONSTANTS.MIN_LEFT_PANE_WIDTH);
      expect(LAYOUT_CONSTANTS.DEFAULT_LEFT_PANE_WIDTH).toBeLessThanOrEqual(LAYOUT_CONSTANTS.MAX_LEFT_PANE_WIDTH);
      
      expect(LAYOUT_CONSTANTS.DEFAULT_TEST_RESULTS_HEIGHT).toBeGreaterThanOrEqual(LAYOUT_CONSTANTS.MIN_TEST_RESULTS_HEIGHT);
      expect(LAYOUT_CONSTANTS.DEFAULT_TEST_RESULTS_HEIGHT).toBeLessThanOrEqual(LAYOUT_CONSTANTS.MAX_TEST_RESULTS_HEIGHT);
    });

    it('should be read-only (const assertion)', () => {
      // TypeScript should prevent modification, but we can test the structure
      expect(Object.isFrozen(LAYOUT_CONSTANTS)).toBe(false); // const assertion doesn't freeze at runtime
      expect(typeof LAYOUT_CONSTANTS).toBe('object');
    });
  });

  describe('PYODIDE_CONFIG', () => {
    it('should have CDN_URL and INDEX_URL', () => {
      expect(PYODIDE_CONFIG).toHaveProperty('CDN_URL');
      expect(PYODIDE_CONFIG).toHaveProperty('INDEX_URL');
    });

    it('should have valid URLs', () => {
      expect(PYODIDE_CONFIG.CDN_URL).toMatch(/^https?:\/\//);
      expect(PYODIDE_CONFIG.INDEX_URL).toMatch(/^https?:\/\//);
    });

    it('should point to jsdelivr CDN', () => {
      expect(PYODIDE_CONFIG.CDN_URL).toContain('cdn.jsdelivr.net');
      expect(PYODIDE_CONFIG.INDEX_URL).toContain('cdn.jsdelivr.net');
    });

    it('should specify pyodide version', () => {
      expect(PYODIDE_CONFIG.CDN_URL).toContain('v0.24.1');
      expect(PYODIDE_CONFIG.INDEX_URL).toContain('v0.24.1');
    });
  });

  describe('MONACO_CONFIG', () => {
    it('should have CDN_URL and VS_PATH', () => {
      expect(MONACO_CONFIG).toHaveProperty('CDN_URL');
      expect(MONACO_CONFIG).toHaveProperty('VS_PATH');
    });

    it('should have valid URLs', () => {
      expect(MONACO_CONFIG.CDN_URL).toMatch(/^https?:\/\//);
      expect(MONACO_CONFIG.VS_PATH).toMatch(/^https?:\/\//);
    });

    it('should point to jsdelivr CDN', () => {
      expect(MONACO_CONFIG.CDN_URL).toContain('cdn.jsdelivr.net');
      expect(MONACO_CONFIG.VS_PATH).toContain('cdn.jsdelivr.net');
    });

    it('should specify monaco-editor version', () => {
      expect(MONACO_CONFIG.CDN_URL).toContain('monaco-editor@0.52.2');
      expect(MONACO_CONFIG.VS_PATH).toContain('monaco-editor@0.52.2');
    });
  });

  describe('DEFAULT_QUESTION_ID', () => {
    it('should be a string', () => {
      expect(typeof DEFAULT_QUESTION_ID).toBe('string');
    });

    it('should follow question ID format', () => {
      expect(DEFAULT_QUESTION_ID).toMatch(/^\d+-[\w-]+$/);
    });

    it('should be the first question', () => {
      expect(DEFAULT_QUESTION_ID).toBe('01-variable-declaration');
    });
  });

  describe('SUPPORTED_LANGUAGES', () => {
    it('should be an array', () => {
      expect(Array.isArray(SUPPORTED_LANGUAGES)).toBe(true);
    });

    it('should have at least one language', () => {
      expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(0);
    });

    it('should contain Python as the first language', () => {
      expect(SUPPORTED_LANGUAGES[0]).toEqual({
        value: 'python',
        label: 'Python3'
      });
    });

    it('should contain all expected languages', () => {
      const languages = SUPPORTED_LANGUAGES.map(lang => lang.value);
      expect(languages).toContain('python');
      expect(languages).toContain('javascript');
      expect(languages).toContain('java');
    });

    it('should have correct structure for each language', () => {
      SUPPORTED_LANGUAGES.forEach(language => {
        expect(language).toHaveProperty('value');
        expect(language).toHaveProperty('label');
        expect(typeof language.value).toBe('string');
        expect(typeof language.label).toBe('string');
      });
    });

    it('should have meaningful labels', () => {
      const pythonLang = SUPPORTED_LANGUAGES.find(lang => lang.value === 'python');
      const jsLang = SUPPORTED_LANGUAGES.find(lang => lang.value === 'javascript');
      const javaLang = SUPPORTED_LANGUAGES.find(lang => lang.value === 'java');

      expect(pythonLang?.label).toBe('Python3');
      expect(jsLang?.label).toBe('JavaScript');
      expect(javaLang?.label).toBe('Java');
    });
  });

  describe('All constants export correctly', () => {
    it('should export all constants', () => {
      expect(DEFAULT_CODE).toBeDefined();
      expect(LAYOUT_CONSTANTS).toBeDefined();
      expect(PYODIDE_CONFIG).toBeDefined();
      expect(MONACO_CONFIG).toBeDefined();
      expect(DEFAULT_QUESTION_ID).toBeDefined();
      expect(SUPPORTED_LANGUAGES).toBeDefined();
    });

    it('should not export undefined values', () => {
      expect(DEFAULT_CODE).not.toBeUndefined();
      expect(LAYOUT_CONSTANTS).not.toBeUndefined();
      expect(PYODIDE_CONFIG).not.toBeUndefined();
      expect(MONACO_CONFIG).not.toBeUndefined();
      expect(DEFAULT_QUESTION_ID).not.toBeUndefined();
      expect(SUPPORTED_LANGUAGES).not.toBeUndefined();
    });
  });
});