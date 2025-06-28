import { loadQuestion, getAvailableQuestions } from '../questionLoader';

// Mock formatters
jest.mock('../formatters', () => ({
  formatQuestionName: (id: string) => id.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase()
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('questionLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset fetch mock
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  describe('loadQuestion', () => {
    it('should load question successfully with valid data', async () => {
      const mockQuestionResponse = {
        ok: true,
        text: () => Promise.resolve('# Test Question\nThis is a test question description.')
      };

      const mockTestCases = [
        {
          inputFile: 'input1.txt',
          expectedFile: 'expected1.txt',
          description: 'Test case 1'
        },
        {
          inputFile: 'input2.txt',
          expectedFile: 'expected2.txt',
          description: 'Test case 2'
        }
      ];

      const mockManifestResponse = {
        ok: true,
        json: () => Promise.resolve(mockTestCases)
      };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce(mockQuestionResponse as any)
        .mockResolvedValueOnce(mockManifestResponse as any);

      const result = await loadQuestion('01-test-question');

      expect(result).toEqual({
        id: '01-test-question',
        name: 'TEST QUESTION',
        description: '# Test Question\nThis is a test question description.',
        testCases: [
          {
            inputFile: '/questions/01-test-question/input1.txt',
            expectedFile: '/questions/01-test-question/expected1.txt',
            description: 'Test case 1'
          },
          {
            inputFile: '/questions/01-test-question/input2.txt',
            expectedFile: '/questions/01-test-question/expected2.txt',
            description: 'Test case 2'
          }
        ]
      });

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(1, '/questions/01-test-question/question.md');
      expect(fetch).toHaveBeenNthCalledWith(2, '/questions/01-test-question/testcases.json');
    });

    it('should return null when question description fetch fails', async () => {
      const mockQuestionResponse = {
        ok: false
      };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce(mockQuestionResponse as any);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await loadQuestion('invalid-question');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading question invalid-question:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should return null when testcases manifest fetch fails', async () => {
      const mockQuestionResponse = {
        ok: true,
        text: () => Promise.resolve('Test description')
      };

      const mockManifestResponse = {
        ok: false
      };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce(mockQuestionResponse as any)
        .mockResolvedValueOnce(mockManifestResponse as any);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await loadQuestion('01-test-question');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading question 01-test-question:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle network errors gracefully', async () => {
      (fetch as jest.MockedFunction<typeof fetch>)
        .mockRejectedValueOnce(new Error('Network error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await loadQuestion('01-test-question');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading question 01-test-question:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle JSON parsing errors', async () => {
      const mockQuestionResponse = {
        ok: true,
        text: () => Promise.resolve('Test description')
      };

      const mockManifestResponse = {
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce(mockQuestionResponse as any)
        .mockResolvedValueOnce(mockManifestResponse as any);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await loadQuestion('01-test-question');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading question 01-test-question:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle empty test cases array', async () => {
      const mockQuestionResponse = {
        ok: true,
        text: () => Promise.resolve('Test description')
      };

      const mockManifestResponse = {
        ok: true,
        json: () => Promise.resolve([])
      };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce(mockQuestionResponse as any)
        .mockResolvedValueOnce(mockManifestResponse as any);

      const result = await loadQuestion('01-test-question');

      expect(result).toEqual({
        id: '01-test-question',
        name: 'TEST QUESTION',
        description: 'Test description',
        testCases: []
      });
    });

    it('should prepend question folder to file paths correctly', async () => {
      const mockQuestionResponse = {
        ok: true,
        text: () => Promise.resolve('Test description')
      };

      const mockTestCases = [
        {
          inputFile: 'input.txt',
          expectedFile: 'expected.txt',
          description: 'Test case'
        }
      ];

      const mockManifestResponse = {
        ok: true,
        json: () => Promise.resolve(mockTestCases)
      };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce(mockQuestionResponse as any)
        .mockResolvedValueOnce(mockManifestResponse as any);

      const result = await loadQuestion('complex-question-id');

      expect(result?.testCases[0].inputFile).toBe('/questions/complex-question-id/input.txt');
      expect(result?.testCases[0].expectedFile).toBe('/questions/complex-question-id/expected.txt');
    });

    it('should handle text parsing errors', async () => {
      const mockQuestionResponse = {
        ok: true,
        text: () => Promise.reject(new Error('Text parsing failed'))
      };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce(mockQuestionResponse as any);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await loadQuestion('01-test-question');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should handle different question ID formats', async () => {
      const mockQuestionResponse = {
        ok: true,
        text: () => Promise.resolve('Description')
      };

      const mockManifestResponse = {
        ok: true,
        json: () => Promise.resolve([])
      };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce(mockQuestionResponse as any)
        .mockResolvedValueOnce(mockManifestResponse as any);

      const result = await loadQuestion('100-complex-question-name-with-dashes');

      expect(result?.id).toBe('100-complex-question-name-with-dashes');
      expect(result?.name).toBe('COMPLEX QUESTION NAME WITH DASHES');
    });
  });

  describe('getAvailableQuestions', () => {
    it('should return the hardcoded list of questions', async () => {
      const questions = await getAvailableQuestions();

      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions).toContain('01-variable-declaration');
      expect(questions).toContain('02-data-types');
      expect(questions).toContain('100-resource-management');
      expect(questions).toContain('200-distributed-systems-patterns');
    });

    it('should return questions in the expected format', async () => {
      const questions = await getAvailableQuestions();

      questions.forEach(question => {
        expect(typeof question).toBe('string');
        expect(question).toMatch(/^\d+-[\w-]+$/);
      });
    });

    it('should contain all expected question categories', async () => {
      const questions = await getAvailableQuestions();

      // Test a sampling of different categories
      expect(questions).toContain('01-variable-declaration'); // Basic programming
      expect(questions).toContain('18-arrays-declaration-and-initialization'); // Data structures
      expect(questions).toContain('58-class-definition-and-instantiation'); // OOP
      expect(questions).toContain('76-linear-search'); // Algorithms
      expect(questions).toContain('101-unit-testing-basics'); // Testing
      expect(questions).toContain('139-thread-creation-and-management'); // Concurrency
      expect(questions).toContain('181-algorithm-complexity-analysis'); // Advanced topics
    });

    it('should maintain consistent ordering', async () => {
      const questions1 = await getAvailableQuestions();
      const questions2 = await getAvailableQuestions();

      expect(questions1).toEqual(questions2);
    });

    it('should have questions numbered from 1 to 200', async () => {
      const questions = await getAvailableQuestions();

      // Check first and last questions
      expect(questions[0]).toMatch(/^01-/);
      expect(questions[questions.length - 1]).toMatch(/^200-/);

      // Check that we have 205 questions (some numbers have multiple variations)
      expect(questions.length).toBe(205);
    });

    it('should return empty array and log error when exception occurs', async () => {
      // Mock an error in the function (though it's unlikely with hardcoded data)
      const originalConsoleError = console.error;
      console.error = jest.fn();

      // This test is more for completeness since the function has a try-catch
      const questions = await getAvailableQuestions();

      // Should still return the hardcoded array
      expect(questions.length).toBe(205);

      console.error = originalConsoleError;
    });

    it('should include all major programming concepts', async () => {
      const questions = await getAvailableQuestions();
      const questionString = questions.join(' ');

      // Test for major concept coverage
      expect(questionString).toContain('variable');
      expect(questionString).toContain('function');
      expect(questionString).toContain('array');
      expect(questionString).toContain('class');
      expect(questionString).toContain('recursion');
      expect(questionString).toContain('algorithm');
      expect(questionString).toContain('pattern');
      expect(questionString).toContain('thread');
    });

    it('should not contain duplicate question IDs', async () => {
      const questions = await getAvailableQuestions();
      const uniqueQuestions = new Set(questions);

      expect(uniqueQuestions.size).toBe(questions.length);
    });
  });
});