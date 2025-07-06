import { LocalSubmissionService } from '../SubmissionService';
import { TestResult } from '@/shared/types';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('LocalSubmissionService', () => {
  let service: LocalSubmissionService;

  beforeEach(() => {
    service = new LocalSubmissionService();
    jest.clearAllMocks();
  });

  describe('createSubmission', () => {
    it('should create a submission with correct data', () => {
      const testResults: TestResult[] = [
        {
          testCase: 'Test 1',
          expected: 'output1',
          actual: 'output1',
          passed: true,
          input: 'input1',
        },
        {
          testCase: 'Test 2',
          expected: 'output2',
          actual: 'wrong',
          passed: false,
          input: 'input2',
        },
      ];

      const submission = service.createSubmission(
        'print("hello")',
        'question-1',
        'python',
        testResults,
        1500
      );

      expect(submission.code).toBe('print("hello")');
      expect(submission.questionId).toBe('question-1');
      expect(submission.language).toBe('python');
      expect(submission.testResults).toEqual(testResults);
      expect(submission.passedCount).toBe(1);
      expect(submission.failedCount).toBe(1);
      expect(submission.totalCount).toBe(2);
      expect(submission.executionTime).toBe(1500);
      expect(submission.overallStatus).toBe('PARTIAL');
      expect(submission.id).toBeDefined();
      expect(submission.timestamp).toBeInstanceOf(Date);
    });

    it('should set status to PASSED when all tests pass', () => {
      const testResults: TestResult[] = [
        {
          testCase: 'Test 1',
          expected: 'output1',
          actual: 'output1',
          passed: true,
        },
        {
          testCase: 'Test 2',
          expected: 'output2',
          actual: 'output2',
          passed: true,
        },
      ];

      const submission = service.createSubmission(
        'code',
        'question-1',
        'python',
        testResults,
        1000
      );

      expect(submission.overallStatus).toBe('PASSED');
      expect(submission.passedCount).toBe(2);
      expect(submission.failedCount).toBe(0);
    });

    it('should set status to FAILED when no tests pass', () => {
      const testResults: TestResult[] = [
        {
          testCase: 'Test 1',
          expected: 'output1',
          actual: 'wrong1',
          passed: false,
        },
        {
          testCase: 'Test 2',
          expected: 'output2',
          actual: 'wrong2',
          passed: false,
        },
      ];

      const submission = service.createSubmission(
        'code',
        'question-1',
        'python',
        testResults,
        1000
      );

      expect(submission.overallStatus).toBe('FAILED');
      expect(submission.passedCount).toBe(0);
      expect(submission.failedCount).toBe(2);
    });
  });

  describe('saveSubmission', () => {
    it('should save submission to localStorage', async () => {
      const testResults: TestResult[] = [
        {
          testCase: 'Test 1',
          expected: 'output1',
          actual: 'output1',
          passed: true,
        },
      ];

      const submission = service.createSubmission(
        'code',
        'question-1',
        'python',
        testResults,
        1000
      );

      mockLocalStorage.getItem.mockReturnValue(null);

      await service.saveSubmission(submission);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'easyloops_submissions',
        expect.any(String)
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'easyloops_snapshots',
        expect.any(String)
      );
    });

    it('should handle localStorage errors gracefully', async () => {
      const testResults: TestResult[] = [
        {
          testCase: 'Test 1',
          expected: 'output1',
          actual: 'output1',
          passed: true,
        },
      ];

      const submission = service.createSubmission(
        'code',
        'question-1',
        'python',
        testResults,
        1000
      );

      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      await expect(service.saveSubmission(submission)).rejects.toThrow(
        'Failed to save submission'
      );
    });
  });

  describe('getSubmissions', () => {
    it('should return empty array when no submissions exist', async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const submissions = await service.getSubmissions();

      expect(submissions).toEqual([]);
    });

    it('should return all submissions', async () => {
      const mockSubmissions = [
        {
          id: '1',
          timestamp: new Date().toISOString(),
          questionId: 'question-1',
          language: 'python',
          code: 'code1',
          testResults: [],
          passedCount: 1,
          failedCount: 0,
          totalCount: 1,
          executionTime: 1000,
          overallStatus: 'PASSED',
        },
        {
          id: '2',
          timestamp: new Date().toISOString(),
          questionId: 'question-2',
          language: 'go',
          code: 'code2',
          testResults: [],
          passedCount: 0,
          failedCount: 1,
          totalCount: 1,
          executionTime: 2000,
          overallStatus: 'FAILED',
        },
      ];

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockSubmissions));

      const submissions = await service.getSubmissions();

      expect(submissions).toHaveLength(2);
      expect(submissions[0].id).toBe('1');
      expect(submissions[1].id).toBe('2');
      expect(submissions[0].timestamp).toBeInstanceOf(Date);
      expect(submissions[1].timestamp).toBeInstanceOf(Date);
    });

    it('should filter by questionId when provided', async () => {
      const mockSubmissions = [
        {
          id: '1',
          timestamp: new Date().toISOString(),
          questionId: 'question-1',
          language: 'python',
          code: 'code1',
          testResults: [],
          passedCount: 1,
          failedCount: 0,
          totalCount: 1,
          executionTime: 1000,
          overallStatus: 'PASSED',
        },
        {
          id: '2',
          timestamp: new Date().toISOString(),
          questionId: 'question-2',
          language: 'go',
          code: 'code2',
          testResults: [],
          passedCount: 0,
          failedCount: 1,
          totalCount: 1,
          executionTime: 2000,
          overallStatus: 'FAILED',
        },
      ];

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockSubmissions));

      const submissions = await service.getSubmissions('question-1');

      expect(submissions).toHaveLength(1);
      expect(submissions[0].id).toBe('1');
      expect(submissions[0].questionId).toBe('question-1');
    });

    it('should handle localStorage errors gracefully', async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const submissions = await service.getSubmissions();

      expect(submissions).toEqual([]);
    });
  });

  describe('getSubmissionById', () => {
    it('should return submission by ID', async () => {
      const mockSubmissions = [
        {
          id: '1',
          timestamp: new Date().toISOString(),
          questionId: 'question-1',
          language: 'python',
          code: 'code1',
          testResults: [],
          passedCount: 1,
          failedCount: 0,
          totalCount: 1,
          executionTime: 1000,
          overallStatus: 'PASSED',
        },
      ];

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockSubmissions));

      const submission = await service.getSubmissionById('1');

      expect(submission).toBeDefined();
      expect(submission!.id).toBe('1');
    });

    it('should return null if submission not found', async () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify([]));

      const submission = await service.getSubmissionById('nonexistent');

      expect(submission).toBeNull();
    });

    it('should handle localStorage errors gracefully', async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const submission = await service.getSubmissionById('1');

      expect(submission).toBeNull();
    });
  });

  describe('getSnapshots', () => {
    it('should return empty array when no snapshots exist', async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const snapshots = await service.getSnapshots();

      expect(snapshots).toEqual([]);
    });

    it('should return snapshots sorted by timestamp', async () => {
      const now = new Date();
      const earlier = new Date(now.getTime() - 1000);
      
      const mockSnapshots = [
        {
          id: '1',
          timestamp: earlier.toISOString(),
          questionId: 'question-1',
          language: 'python',
          code: 'code1',
          result: {
            id: '1',
            timestamp: earlier.toISOString(),
            questionId: 'question-1',
            language: 'python',
            code: 'code1',
            testResults: [],
            passedCount: 1,
            failedCount: 0,
            totalCount: 1,
            executionTime: 1000,
            overallStatus: 'PASSED',
          },
        },
        {
          id: '2',
          timestamp: now.toISOString(),
          questionId: 'question-1',
          language: 'python',
          code: 'code2',
          result: {
            id: '2',
            timestamp: now.toISOString(),
            questionId: 'question-1',
            language: 'python',
            code: 'code2',
            testResults: [],
            passedCount: 0,
            failedCount: 1,
            totalCount: 1,
            executionTime: 2000,
            overallStatus: 'FAILED',
          },
        },
      ];

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockSnapshots));

      const snapshots = await service.getSnapshots();

      expect(snapshots).toHaveLength(2);
      expect(snapshots[0].id).toBe('2'); // Most recent first
      expect(snapshots[1].id).toBe('1');
    });

    it('should handle localStorage errors gracefully', async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const snapshots = await service.getSnapshots();

      expect(snapshots).toEqual([]);
    });
  });
});