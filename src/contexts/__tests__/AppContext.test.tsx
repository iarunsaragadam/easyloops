import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AppProvider, useAppContext } from '../AppContext';
import appReducer from '@/store/slices/appSlice';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock the shared lib functions
jest.mock('@/shared/lib', () => ({
  getAvailableQuestions: jest
    .fn()
    .mockResolvedValue(['question-1', 'question-2']),
  loadQuestion: jest.fn().mockResolvedValue({
    id: 'question-1',
    name: 'Test Question',
    description: 'Test description',
    testCases: [],
  }),
  loadCodeStub: jest.fn().mockResolvedValue('print("Hello, World!")'),
}));

// Create a test store
const createTestStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
    },
  });

// Test component that uses the context
const TestComponent = () => {
  const { selectedLanguage, handleLanguageChange, getCurrentCode } =
    useAppContext();
  return (
    <div>
      <span data-testid="selected-language">{selectedLanguage}</span>
      <span data-testid="current-code">{getCurrentCode()}</span>
      <button onClick={() => handleLanguageChange('go')}>Change to Go</button>
    </div>
  );
};

describe('AppContext', () => {
  it('provides app state and actions', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <AppProvider>
          <TestComponent />
        </AppProvider>
      </Provider>
    );

    // Should render without throwing
    expect(screen.getByTestId('selected-language')).toBeInTheDocument();
    expect(screen.getByText('Change to Go')).toBeInTheDocument();
  });

  it('handles language changes correctly', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <AppProvider>
          <TestComponent />
        </AppProvider>
      </Provider>
    );

    // Initial state
    expect(screen.getByTestId('selected-language')).toHaveTextContent('python');

    // Change language
    fireEvent.click(screen.getByText('Change to Go'));

    // Should update
    expect(screen.getByTestId('selected-language')).toHaveTextContent('go');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAppContext must be used within an AppProvider');

    consoleSpy.mockRestore();
  });

  it('syncs with Redux state', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <AppProvider>
          <TestComponent />
        </AppProvider>
      </Provider>
    );

    // Update Redux state directly
    store.dispatch({ type: 'app/setSelectedLanguage', payload: 'go' });

    // Wait for context to reflect the change
    await waitFor(() => {
      expect(screen.getByTestId('selected-language')).toHaveTextContent('go');
    });
  });
});
