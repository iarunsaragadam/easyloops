import { useState, useEffect, useRef, useCallback } from 'react';
import { LayoutState } from '@/shared/types';
import { LAYOUT_CONSTANTS } from '@/shared/constants';

// Types for persisted layout state (excluding dragging states)
interface PersistedLayoutState {
  leftPaneWidth: number;
  testResultsHeight: number;
}

// Helper functions for localStorage operations
const saveLayoutState = (layoutState: PersistedLayoutState): void => {
  try {
    const serializedState = JSON.stringify(layoutState);
    localStorage.setItem(LAYOUT_CONSTANTS.STORAGE_KEY, serializedState);
  } catch {
    // ignore
  }
};

const loadLayoutState = (): PersistedLayoutState | null => {
  try {
    const serializedState = localStorage.getItem(LAYOUT_CONSTANTS.STORAGE_KEY);
    if (serializedState === null) {
      return null;
    }
    const parsedState = JSON.parse(serializedState);

    // Validate the loaded state
    const isValid =
      typeof parsedState.leftPaneWidth === 'number' &&
      typeof parsedState.testResultsHeight === 'number' &&
      parsedState.leftPaneWidth >= LAYOUT_CONSTANTS.MIN_LEFT_PANE_WIDTH &&
      parsedState.leftPaneWidth <= LAYOUT_CONSTANTS.MAX_LEFT_PANE_WIDTH &&
      parsedState.testResultsHeight >=
        LAYOUT_CONSTANTS.MIN_TEST_RESULTS_HEIGHT &&
      parsedState.testResultsHeight <= LAYOUT_CONSTANTS.MAX_TEST_RESULTS_HEIGHT;

    if (isValid) {
      return parsedState;
    } else {
      return null;
    }
  } catch {
    // ignore
    return null;
  }
};

export const useResizableLayout = (
  initialLeftWidth = LAYOUT_CONSTANTS.DEFAULT_LEFT_PANE_WIDTH,
  initialTestHeight = LAYOUT_CONSTANTS.DEFAULT_TEST_RESULTS_HEIGHT
) => {
  // Track if we're on the client to prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  // State for dragging interactions only
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);

  // Track layout changes to trigger saves
  const [layoutVersion, setLayoutVersion] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  // CSS variable management functions
  const setCSSVariable = useCallback((name: string, value: string): void => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(name, value);
      // Increment layout version to trigger save
      setLayoutVersion((prev) => prev + 1);
    }
  }, []);

  const getCSSVariable = useCallback((name: string): string => {
    if (containerRef.current) {
      return getComputedStyle(containerRef.current).getPropertyValue(name);
    }
    return '';
  }, []);

  // Initialize CSS variables and load saved state
  useEffect(() => {
    setIsClient(true);

    // Set initial CSS variables
    setCSSVariable('--left-pane-width', `${initialLeftWidth}%`);
    setCSSVariable('--test-results-height', `${initialTestHeight * 100}%`);

    // Load and apply saved state
    const savedState = loadLayoutState();
    if (savedState) {
      setCSSVariable('--left-pane-width', `${savedState.leftPaneWidth}%`);
      setCSSVariable(
        '--test-results-height',
        `${savedState.testResultsHeight * 100}%`
      );
    }
  }, [initialLeftWidth, initialTestHeight, setCSSVariable]);

  const handleHorizontalMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDraggingHorizontal(true);
    e.preventDefault();
  }, []);

  const handleVerticalMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDraggingVertical(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDraggingHorizontal && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newLeftWidth =
          ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Constrain to reasonable bounds
        const constrainedWidth = Math.max(
          LAYOUT_CONSTANTS.MIN_LEFT_PANE_WIDTH,
          Math.min(LAYOUT_CONSTANTS.MAX_LEFT_PANE_WIDTH, newLeftWidth)
        );

        // Update CSS variable
        setCSSVariable('--left-pane-width', `${constrainedWidth}%`);
      }

      if (isDraggingVertical && rightPaneRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newTestHeightPx = containerRect.bottom - e.clientY;
        const totalHeight = containerRect.height;
        let newTestHeightFrac = newTestHeightPx / totalHeight;
        newTestHeightFrac = Math.max(0, Math.min(1, newTestHeightFrac));

        // Update CSS variable
        setCSSVariable('--test-results-height', `${newTestHeightFrac * 100}%`);
      }
    },
    [isDraggingHorizontal, isDraggingVertical, setCSSVariable]
  );

  const handleMouseUp = useCallback(() => {
    setIsDraggingHorizontal(false);
    setIsDraggingVertical(false);
  }, []);

  useEffect(() => {
    if (isDraggingHorizontal || isDraggingVertical) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isDraggingHorizontal
        ? 'col-resize'
        : 'row-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [
    isDraggingHorizontal,
    isDraggingVertical,
    handleMouseMove,
    handleMouseUp,
  ]);

  // Save layout state to localStorage whenever it changes (only on client)
  useEffect(() => {
    if (isClient && layoutVersion > 0) {
      const leftPaneWidth =
        parseFloat(getCSSVariable('--left-pane-width')) || initialLeftWidth;
      const testResultsHeight =
        (parseFloat(getCSSVariable('--test-results-height')) ||
          initialTestHeight * 100) / 100;

      const persistedState: PersistedLayoutState = {
        leftPaneWidth,
        testResultsHeight,
      };
      saveLayoutState(persistedState);
    }
  }, [
    isClient,
    layoutVersion,
    initialLeftWidth,
    initialTestHeight,
    getCSSVariable,
  ]);

  // Return layout state for components that need it
  const layoutState: LayoutState = {
    leftPaneWidth:
      parseFloat(getCSSVariable('--left-pane-width')) || initialLeftWidth,
    testResultsHeight:
      (parseFloat(getCSSVariable('--test-results-height')) ||
        initialTestHeight * 100) / 100,
    isDraggingHorizontal,
    isDraggingVertical,
  };

  return {
    layoutState,
    containerRef,
    rightPaneRef,
    handleHorizontalMouseDown,
    handleVerticalMouseDown,
  };
};
