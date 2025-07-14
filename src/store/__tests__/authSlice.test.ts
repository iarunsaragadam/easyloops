import { configureStore } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import authReducer, {
  setUser,
  setLoading,
  setError,
  clearError,
  loginWithGoogle,
  logoutUser,
  selectUser,
  selectIsAuthenticated,
  selectIsAuthorizedForGo,
  selectAuthLoading,
  selectAuthError,
} from '../slices/authSlice';

// Mock Firebase auth functions
jest.mock('@/shared/lib', () => ({
  signInWithGoogle: jest.fn(),
  signOutUser: jest.fn(),
  onAuthStateChange: jest.fn(),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });

describe('Auth Slice', () => {
  describe('initial state', () => {
    it('should have correct initial state', () => {
      const store = createTestStore();
      const state = store.getState();

      expect(state.auth).toEqual({
        user: null,
        loading: true,
        isAuthorizedForGo: false,
        error: null,
      });
    });
  });

  describe('reducers', () => {
    it('should handle setUser', () => {
      const store = createTestStore();
      const mockUser = { uid: '123', email: 'test@example.com' } as User;

      store.dispatch(setUser(mockUser));

      const state = store.getState();
      expect(state.auth.user).toEqual(mockUser);
      expect(state.auth.isAuthorizedForGo).toBe(true);
      expect(state.auth.loading).toBe(false);
      expect(state.auth.error).toBe(null);
    });

    it('should handle setUser with null', () => {
      const store = createTestStore();

      store.dispatch(setUser(null));

      const state = store.getState();
      expect(state.auth.user).toBe(null);
      expect(state.auth.isAuthorizedForGo).toBe(false);
      expect(state.auth.loading).toBe(false);
    });

    it('should handle setLoading', () => {
      const store = createTestStore();

      store.dispatch(setLoading(false));

      const state = store.getState();
      expect(state.auth.loading).toBe(false);
    });

    it('should handle setError', () => {
      const store = createTestStore();

      store.dispatch(setError('Test error'));

      const state = store.getState();
      expect(state.auth.error).toBe('Test error');
    });

    it('should handle clearError', () => {
      const store = createTestStore();

      // Set an error first
      store.dispatch(setError('Test error'));
      expect(store.getState().auth.error).toBe('Test error');

      // Clear the error
      store.dispatch(clearError());
      expect(store.getState().auth.error).toBe(null);
    });
  });

  describe('selectors', () => {
    it('should select user correctly', () => {
      const store = createTestStore();
      const mockUser = { uid: '123', email: 'test@example.com' } as User;

      store.dispatch(setUser(mockUser));

      const user = selectUser(store.getState());
      expect(user).toEqual(mockUser);
    });

    it('should select isAuthenticated correctly', () => {
      const store = createTestStore();

      // Initially not authenticated
      expect(selectIsAuthenticated(store.getState())).toBe(false);

      // After setting user
      const mockUser = { uid: '123', email: 'test@example.com' } as User;
      store.dispatch(setUser(mockUser));
      expect(selectIsAuthenticated(store.getState())).toBe(true);
    });

    it('should select isAuthorizedForGo correctly', () => {
      const store = createTestStore();

      // Initially not authorized
      expect(selectIsAuthorizedForGo(store.getState())).toBe(false);

      // After setting user
      const mockUser = { uid: '123', email: 'test@example.com' } as User;
      store.dispatch(setUser(mockUser));
      expect(selectIsAuthorizedForGo(store.getState())).toBe(true);
    });

    it('should select loading correctly', () => {
      const store = createTestStore();

      expect(selectAuthLoading(store.getState())).toBe(true);

      store.dispatch(setLoading(false));
      expect(selectAuthLoading(store.getState())).toBe(false);
    });

    it('should select error correctly', () => {
      const store = createTestStore();

      expect(selectAuthError(store.getState())).toBe(null);

      store.dispatch(setError('Test error'));
      expect(selectAuthError(store.getState())).toBe('Test error');
    });
  });

  describe('async thunks', () => {
    it('should handle loginWithGoogle.pending', () => {
      const store = createTestStore();

      store.dispatch(loginWithGoogle.pending('', undefined));

      const state = store.getState();
      expect(state.auth.loading).toBe(true);
      expect(state.auth.error).toBe(null);
    });

    it('should handle loginWithGoogle.fulfilled', () => {
      const store = createTestStore();
      const mockUser = { uid: '123', email: 'test@example.com' } as User;

      store.dispatch(loginWithGoogle.fulfilled(mockUser, '', undefined));

      const state = store.getState();
      expect(state.auth.user).toEqual(mockUser);
      expect(state.auth.isAuthorizedForGo).toBe(true);
      expect(state.auth.loading).toBe(false);
      expect(state.auth.error).toBe(null);
    });

    it('should handle loginWithGoogle.rejected', () => {
      const store = createTestStore();

      store.dispatch(
        loginWithGoogle.rejected(
          new Error('Login failed'),
          '',
          undefined,
          'Login failed'
        )
      );

      const state = store.getState();
      expect(state.auth.loading).toBe(false);
      expect(state.auth.error).toBe('Login failed');
    });

    it('should handle logoutUser.fulfilled', () => {
      const store = createTestStore();

      // Set a user first
      const mockUser = { uid: '123', email: 'test@example.com' } as User;
      store.dispatch(setUser(mockUser));

      // Then logout
      store.dispatch(logoutUser.fulfilled(null, '', undefined));

      const state = store.getState();
      expect(state.auth.user).toBe(null);
      expect(state.auth.isAuthorizedForGo).toBe(false);
      expect(state.auth.loading).toBe(false);
      expect(state.auth.error).toBe(null);
    });
  });
});
