import { store } from '../index';
import { DEFAULT_QUESTION_ID } from '@/shared/constants';

describe('Redux Store', () => {
  describe('store configuration', () => {
    it('should be properly configured', () => {
      expect(store).toBeDefined();
      expect(typeof store.dispatch).toBe('function');
      expect(typeof store.getState).toBe('function');
      expect(typeof store.subscribe).toBe('function');
    });

    it('should have the app and auth reducers', () => {
      const state = store.getState();
      expect(state).toHaveProperty('app');
      expect(state).toHaveProperty('auth');
    });

    it('should have correct initial state', () => {
      const state = store.getState();

      expect(state.app).toEqual({
        pythonCode: '',
        goCode: '',
        output: '',
        testResults: [],
        isRunning: false,
        currentQuestion: null,
        availableQuestions: [],
        selectedQuestionId: DEFAULT_QUESTION_ID,
        selectedLanguage: 'python',
        isLoadingQuestion: false,
      });
    });
  });

  describe('store integration', () => {
    it('should handle state updates correctly', () => {
      const initialState = store.getState();

      // Dispatch an action
      store.dispatch({ type: 'app/setSelectedLanguage', payload: 'go' });

      const updatedState = store.getState();

      expect(updatedState.app.selectedLanguage).toBe('go');
      expect(updatedState.app).not.toEqual(initialState.app);
    });

    it('should maintain state between dispatches', () => {
      // First dispatch
      store.dispatch({ type: 'app/setSelectedLanguage', payload: 'go' });

      // Second dispatch
      store.dispatch({ type: 'app/setPythonCode', payload: 'print("test")' });

      const state = store.getState();

      expect(state.app.selectedLanguage).toBe('go');
      expect(state.app.pythonCode).toBe('print("test")');
    });
  });

  describe('store subscription', () => {
    it('should notify subscribers of state changes', () => {
      const mockSubscriber = jest.fn();
      const unsubscribe = store.subscribe(mockSubscriber);

      // Dispatch an action
      store.dispatch({ type: 'app/setSelectedLanguage', payload: 'go' });

      expect(mockSubscriber).toHaveBeenCalled();

      unsubscribe();
    });

    it('should allow unsubscribing', () => {
      const mockSubscriber = jest.fn();
      const unsubscribe = store.subscribe(mockSubscriber);

      unsubscribe();

      // Dispatch an action
      store.dispatch({ type: 'app/setSelectedLanguage', payload: 'python' });

      expect(mockSubscriber).not.toHaveBeenCalled();
    });
  });

  describe('store persistence', () => {
    it('should maintain state across multiple getState calls', () => {
      store.dispatch({ type: 'app/setSelectedLanguage', payload: 'go' });

      const state1 = store.getState();
      const state2 = store.getState();

      expect(state1).toEqual(state2);
      expect(state1.app.selectedLanguage).toBe('go');
    });
  });
});
