import React from 'react';
import { render, screen } from '@testing-library/react';
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

// Create a test store
const createTestStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
    },
  });

// Test component that uses the context
const TestComponent = () => {
  const { selectedLanguage, handleLanguageChange } = useAppContext();
  return (
    <div>
      <span data-testid="selected-language">{selectedLanguage}</span>
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
});
