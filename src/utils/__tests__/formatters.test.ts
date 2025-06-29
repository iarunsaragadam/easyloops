import { formatQuestionName, normalizeOutput } from '../formatters';

describe('formatters', () => {
  describe('formatQuestionName', () => {
    it('should format question ID with number prefix correctly', () => {
      expect(formatQuestionName('01-variable-declaration')).toBe('Variable Declaration');
    });

    it('should format question ID with multi-digit prefix correctly', () => {
      expect(formatQuestionName('100-resource-management')).toBe('Resource Management');
    });

    it('should handle multi-word names correctly', () => {
      expect(formatQuestionName('07-string-operations-and-manipulation')).toBe('String Operations And Manipulation');
    });

    it('should handle single word names correctly', () => {
      expect(formatQuestionName('25-functions')).toBe('Functions');
    });

    it('should handle names with multiple dashes correctly', () => {
      expect(formatQuestionName('11-switch-case-statements')).toBe('Switch Case Statements');
    });

    it('should handle empty string', () => {
      expect(formatQuestionName('')).toBe('');
    });
  });

  describe('normalizeOutput', () => {
    it('should trim whitespace from beginning and end', () => {
      expect(normalizeOutput('  hello world  ')).toBe('hello world');
    });

    it('should normalize Windows line endings to Unix', () => {
      expect(normalizeOutput('line1\r\nline2\r\nline3')).toBe('line1\nline2\nline3');
    });

    it('should handle mixed line endings', () => {
      expect(normalizeOutput('line1\r\nline2\nline3\r\nline4')).toBe('line1\nline2\nline3\nline4');
    });

    it('should handle empty string', () => {
      expect(normalizeOutput('')).toBe('');
    });

    it('should handle string with only whitespace', () => {
      expect(normalizeOutput('   \t\n  ')).toBe('');
    });

    it('should preserve internal whitespace', () => {
      expect(normalizeOutput('  hello   world  ')).toBe('hello   world');
    });
  });
});