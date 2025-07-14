// Session persistence service for storing user's current code per question and language
export interface SessionData {
  [questionId: string]: {
    [language: string]: string;
  };
}

const SESSION_STORAGE_KEY = 'easyloops_session_code';

export class SessionPersistenceService {
  /**
   * Save code for a specific question and language
   */
  static saveCode(questionId: string, language: string, code: string): void {
    try {
      const existingData = this.loadAllSessions();

      if (!existingData[questionId]) {
        existingData[questionId] = {};
      }

      existingData[questionId][language] = code;

      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.warn('Failed to save session code to localStorage:', error);
    }
  }

  /**
   * Load code for a specific question and language
   */
  static loadCode(questionId: string, language: string): string | null {
    try {
      const sessionData = this.loadAllSessions();
      return sessionData[questionId]?.[language] || null;
    } catch (error) {
      console.warn('Failed to load session code from localStorage:', error);
      return null;
    }
  }

  /**
   * Load all sessions
   */
  static loadAllSessions(): SessionData {
    try {
      const data = localStorage.getItem(SESSION_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.warn('Failed to load sessions from localStorage:', error);
      return {};
    }
  }

  /**
   * Clear session for a specific question
   */
  static clearQuestionSession(questionId: string): void {
    try {
      const existingData = this.loadAllSessions();
      delete existingData[questionId];
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.warn(
        'Failed to clear question session from localStorage:',
        error
      );
    }
  }

  /**
   * Clear all sessions
   */
  static clearAllSessions(): void {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear all sessions from localStorage:', error);
    }
  }

  /**
   * Get all question IDs that have saved sessions
   */
  static getQuestionIdsWithSessions(): string[] {
    try {
      const sessionData = this.loadAllSessions();
      return Object.keys(sessionData);
    } catch (error) {
      console.warn('Failed to get question IDs with sessions:', error);
      return [];
    }
  }

  /**
   * Check if a question has any saved sessions
   */
  static hasQuestionSession(questionId: string): boolean {
    try {
      const sessionData = this.loadAllSessions();
      return (
        questionId in sessionData &&
        Object.keys(sessionData[questionId]).length > 0
      );
    } catch (error) {
      console.warn('Failed to check question session:', error);
      return false;
    }
  }

  /**
   * Get the size of stored sessions (for debugging/monitoring)
   */
  static getStorageSize(): number {
    try {
      const data = localStorage.getItem(SESSION_STORAGE_KEY);
      return data ? new Blob([data]).size : 0;
    } catch (error) {
      console.warn('Failed to get storage size:', error);
      return 0;
    }
  }
}
