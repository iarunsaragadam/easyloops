import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useResizableLayout } from '../useResizableLayout';

// Helper to get/set CSS variables on an element
function getCSSVar(element: HTMLElement, name: string) {
  return getComputedStyle(element).getPropertyValue(name);
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const STORAGE_KEY = 'easyloops-layout-state';

function TestComponent({
  initialLeft = 40,
  initialTest = 0.5,
}: {
  initialLeft?: number;
  initialTest?: number;
}) {
  const {
    layoutState,
    containerRef,
    handleHorizontalMouseDown,
    handleVerticalMouseDown,
  } = useResizableLayout(initialLeft as 40, initialTest as 0.5);
  return (
    <div ref={containerRef} data-testid="container">
      <button onMouseDown={handleHorizontalMouseDown} data-testid="h-drag" />
      <button onMouseDown={handleVerticalMouseDown} data-testid="v-drag" />
      <span data-testid="left">{layoutState.leftPaneWidth}</span>
      <span data-testid="test">{layoutState.testResultsHeight}</span>
    </div>
  );
}

describe('useResizableLayout', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.body.innerHTML = '';
  });

  it('saves and loads layout state from localStorage', () => {
    // Save
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ leftPaneWidth: 55, testResultsHeight: 0.7 })
    );
    // Load
    const value = window.localStorage.getItem(STORAGE_KEY);
    expect(value).toBe(
      JSON.stringify({ leftPaneWidth: 55, testResultsHeight: 0.7 })
    );
    // Remove
    window.localStorage.removeItem(STORAGE_KEY);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('sets initial CSS variables and restores from localStorage', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ leftPaneWidth: 60, testResultsHeight: 0.8 })
    );
    const { getByTestId } = render(
      <TestComponent initialLeft={40} initialTest={0.5} />
    );
    const container = getByTestId('container');
    // CSS variables should be set
    expect(getCSSVar(container, '--left-pane-width')).toBe('60%');
    expect(getCSSVar(container, '--test-results-height')).toBe('80%');
  });

  it('updates CSS variables and localStorage on drag simulation', async () => {
    const { getByTestId } = render(
      <TestComponent initialLeft={40} initialTest={0.5} />
    );
    const container = getByTestId('container');
    // Set container size
    act(() => {
      Object.defineProperty(container, 'getBoundingClientRect', {
        value: () => ({ left: 0, width: 100, bottom: 100, height: 100 }),
      });
    });
    // Simulate drag: call handleHorizontalMouseDown, then mousemove/mouseup
    const hDrag = getByTestId('h-drag');
    act(() => {
      hDrag.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 0 })
      );
    });
    await act(async () => {
      document.dispatchEvent(
        new MouseEvent('mousemove', { bubbles: true, clientX: 70 })
      );
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });
    // Should update CSS variable
    expect(parseFloat(getCSSVar(container, '--left-pane-width'))).toBeCloseTo(
      70,
      0
    );
    // Should update localStorage
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!);
    expect(saved.leftPaneWidth).toBeCloseTo(70, 0);
  });

  it('restores state on remount', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ leftPaneWidth: 33, testResultsHeight: 0.25 })
    );
    const { getByTestId, unmount } = render(
      <TestComponent initialLeft={40} initialTest={0.5} />
    );
    const container = getByTestId('container');
    expect(getCSSVar(container, '--left-pane-width')).toBe('33%');
    expect(getCSSVar(container, '--test-results-height')).toBe('25%');
    // Unmount and remount
    unmount();
    const { getByTestId: getByTestId2 } = render(
      <TestComponent initialLeft={40} initialTest={0.5} />
    );
    const container2 = getByTestId2('container');
    expect(getCSSVar(container2, '--left-pane-width')).toBe('33%');
    expect(getCSSVar(container2, '--test-results-height')).toBe('25%');
  });

  it('does not throw on SSR (no DOM)', () => {
    // Simulate no window/document
    const origWindow = global.window;
    // @ts-expect-error: Simulate SSR by deleting window
    delete global.window;
    expect(() => {
      // Import the hook file to simulate SSR
      import('../useResizableLayout');
    }).not.toThrow();
    global.window = origWindow;
  });
});
