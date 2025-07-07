import {
  SubmissionResult,
  SubmissionService,
  TestResult,
  SubmissionSnapshot,
  TestCase,
} from '@/shared/types';

export class LocalSubmissionService implements SubmissionService {
  private static readonly STORAGE_KEY = 'easyloops_submissions';
  private static readonly SNAPSHOTS_KEY = 'easyloops_snapshots';

  async submitCode(
    code: string,
    testCases: TestCase[],
    language: string,
    questionId: string
  ): Promise<SubmissionResult> {
    // Dummy implementation for local
    const submission = this.createSubmission(
      code,
      questionId,
      language,
      [], // testResults dummy
      0 // executionTime dummy
    );
    await this.saveSubmission(submission);
    return submission;
  }

  createSubmission(
    code: string,
    questionId: string,
    language: string,
    testResults: TestResult[],
    executionTime: number
  ): SubmissionResult {
    const passedCount = testResults.filter((result) => result.passed).length;
    const failedCount = testResults.length - passedCount;
    const totalCount = testResults.length;

    let overallStatus: 'PASSED' | 'FAILED' | 'PARTIAL';
    if (passedCount === totalCount) {
      overallStatus = 'PASSED';
    } else if (passedCount === 0) {
      overallStatus = 'FAILED';
    } else {
      overallStatus = 'PARTIAL';
    }

    return {
      id: this.generateId(),
      timestamp: new Date(),
      questionId,
      language,
      code,
      testResults,
      passedCount,
      failedCount,
      totalCount,
      executionTime,
      overallStatus,
      success: passedCount === totalCount,
      message: overallStatus,
    };
  }

  async saveSubmission(submission: SubmissionResult): Promise<void> {
    try {
      const existingSubmissions = await this.getSubmissions();
      const updatedSubmissions = [...existingSubmissions, submission];

      // Keep only the latest 100 submissions per question
      const filteredSubmissions = this.pruneSubmissions(updatedSubmissions);

      localStorage.setItem(
        LocalSubmissionService.STORAGE_KEY,
        JSON.stringify(filteredSubmissions)
      );

      // Create snapshot
      const snapshot: SubmissionSnapshot = {
        id: this.generateId(),
        timestamp: submission.timestamp,
        questionId: submission.questionId,
        language: submission.language,
        code: submission.code,
        testResults: submission.testResults,
      };

      await this.saveSnapshot(snapshot);
    } catch (error) {
      console.error('Failed to save submission:', error);
      throw new Error('Failed to save submission');
    }
  }

  async getSubmissions(questionId?: string): Promise<SubmissionResult[]> {
    try {
      const stored = localStorage.getItem(LocalSubmissionService.STORAGE_KEY);
      if (!stored) return [];

      const submissions: SubmissionResult[] = JSON.parse(stored).map(
        (submission: Partial<SubmissionResult> & { timestamp: string }) => ({
          ...submission,
          timestamp: new Date(submission.timestamp),
        })
      ) as SubmissionResult[];

      if (questionId) {
        return submissions.filter((s) => s.questionId === questionId);
      }

      return submissions;
    } catch (error) {
      console.error('Failed to get submissions:', error);
      return [];
    }
  }

  async getSubmissionById(id: string): Promise<SubmissionResult | null> {
    try {
      const submissions = await this.getSubmissions();
      return submissions.find((s) => s.id === id) || null;
    } catch (error) {
      console.error('Failed to get submission by ID:', error);
      return null;
    }
  }

  async getSnapshots(questionId?: string): Promise<SubmissionSnapshot[]> {
    try {
      const stored = localStorage.getItem(LocalSubmissionService.SNAPSHOTS_KEY);
      if (!stored) return [];

      const snapshots: SubmissionSnapshot[] = JSON.parse(stored).map(
        (
          snapshot: Partial<SubmissionSnapshot> & {
            timestamp: string;
            result: Partial<SubmissionResult> & { timestamp: string };
          }
        ) => ({
          ...snapshot,
          timestamp: new Date(snapshot.timestamp),
          result: {
            ...snapshot.result,
            timestamp: new Date(snapshot.result.timestamp),
          },
        })
      ) as SubmissionSnapshot[];

      if (questionId) {
        return snapshots.filter((s) => s.questionId === questionId);
      }

      return snapshots.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      );
    } catch (error) {
      console.error('Failed to get snapshots:', error);
      return [];
    }
  }

  private async saveSnapshot(snapshot: SubmissionSnapshot): Promise<void> {
    try {
      const existingSnapshots = await this.getSnapshots();
      const updatedSnapshots = [...existingSnapshots, snapshot];

      // Keep only the latest 20 snapshots per question
      const filteredSnapshots = this.pruneSnapshots(updatedSnapshots);

      localStorage.setItem(
        LocalSubmissionService.SNAPSHOTS_KEY,
        JSON.stringify(filteredSnapshots)
      );
    } catch (error) {
      console.error('Failed to save snapshot:', error);
      throw new Error('Failed to save snapshot');
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private pruneSubmissions(
    submissions: SubmissionResult[]
  ): SubmissionResult[] {
    // Group by question ID and keep only the latest 100 per question
    const grouped = submissions.reduce(
      (acc, submission) => {
        if (!acc[submission.questionId]) {
          acc[submission.questionId] = [];
        }
        acc[submission.questionId].push(submission);
        return acc;
      },
      {} as Record<string, SubmissionResult[]>
    );

    const pruned: SubmissionResult[] = [];
    Object.values(grouped).forEach((questionSubmissions) => {
      const sorted = questionSubmissions.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      );
      pruned.push(...sorted.slice(0, 100));
    });

    return pruned;
  }

  private pruneSnapshots(
    snapshots: SubmissionSnapshot[]
  ): SubmissionSnapshot[] {
    // Group by question ID and keep only the latest 20 per question
    const grouped = snapshots.reduce(
      (acc, snapshot) => {
        if (!acc[snapshot.questionId]) {
          acc[snapshot.questionId] = [];
        }
        acc[snapshot.questionId].push(snapshot);
        return acc;
      },
      {} as Record<string, SubmissionSnapshot[]>
    );

    const pruned: SubmissionSnapshot[] = [];
    Object.values(grouped).forEach((questionSnapshots) => {
      const sorted = questionSnapshots.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      );
      pruned.push(...sorted.slice(0, 20));
    });

    return pruned;
  }
}

export const submissionService = new LocalSubmissionService();
