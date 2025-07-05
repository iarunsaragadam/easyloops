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
  } catch (error) {
    console.warn('Failed to save layout state to localStorage:', error);
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
    if (
      typeof parsedState.leftPaneWidth === 'number' &&
      typeof parsedState.testResultsHeight === 'number' &&
      parsedState.leftPaneWidth >= LAYOUT_CONSTANTS.MIN_LEFT_PANE_WIDTH &&
      parsedState.leftPaneWidth <= LAYOUT_CONSTANTS.MAX_LEFT_PANE_WIDTH &&
      parsedState.testResultsHeight >= LAYOUT_CONSTANTS.MIN_TEST_RESULTS_HEIGHT &&
      parsedState.testResultsHeight <= 1
    ) {
      return parsedState;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to load layout state from localStorage:', error);
    return null;
  }
};

export const useResizableLayout = (
  initialLeftWidth = LAYOUT_CONSTANTS.DEFAULT_LEFT_PANE_WIDTH,
  initialTestHeight = LAYOUT_CONSTANTS.DEFAULT_TEST_RESULTS_HEIGHT
) => {
  // Initialize state with saved values if available
  const [layoutState, setLayoutState] = useState<LayoutState>(() => {
    const savedState = loadLayoutState();
    return {
      leftPaneWidth: savedState?.leftPaneWidth ?? initialLeftWidth,
      testResultsHeight: savedState?.testResultsHeight ?? initialTestHeight,
      isDraggingHorizontal: false,
      isDraggingVertical: false,
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  const handleHorizontalMouseDown = useCallback((e: React.MouseEvent) => {
    setLayoutState((prev) => ({ ...prev, isDraggingHorizontal: true }));
    e.preventDefault();
  }, []);

  const handleVerticalMouseDown = useCallback((e: React.MouseEvent) => {
    setLayoutState((prev) => ({ ...prev, isDraggingVertical: true }));
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (layoutState.isDraggingHorizontal && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newLeftWidth =
          ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Constrain to reasonable bounds
        const constrainedWidth = Math.max(
          LAYOUT_CONSTANTS.MIN_LEFT_PANE_WIDTH,
          Math.min(LAYOUT_CONSTANTS.MAX_LEFT_PANE_WIDTH, newLeftWidth)
        );
        setLayoutState((prev) => ({
          ...prev,
          leftPaneWidth: constrainedWidth,
        }));
      }

      if (
        layoutState.isDraggingVertical &&
        rightPaneRef.current &&
        containerRef.current
      ) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newTestHeightPx = containerRect.bottom - e.clientY;
        const totalHeight = containerRect.height;
        let newTestHeightFrac = newTestHeightPx / totalHeight;
        newTestHeightFrac = Math.max(0, Math.min(1, newTestHeightFrac));
        setLayoutState((prev) => ({
          ...prev,
          testResultsHeight: newTestHeightFrac,
        }));
      }
    },
    [layoutState.isDraggingHorizontal, layoutState.isDraggingVertical]
  );

  const handleMouseUp = useCallback(() => {
    setLayoutState((prev) => ({
      ...prev,
      isDraggingHorizontal: false,
      isDraggingVertical: false,
    }));
  }, []);

  useEffect(() => {
    if (layoutState.isDraggingHorizontal || layoutState.isDraggingVertical) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = layoutState.isDraggingHorizontal
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
    layoutState.isDraggingHorizontal,
    layoutState.isDraggingVertical,
    handleMouseMove,
    handleMouseUp,
  ]);

  // Save layout state to localStorage whenever it changes
  useEffect(() => {
    const persistedState: PersistedLayoutState = {
      leftPaneWidth: layoutState.leftPaneWidth,
      testResultsHeight: layoutState.testResultsHeight,
    };
    saveLayoutState(persistedState);
  }, [layoutState.leftPaneWidth, layoutState.testResultsHeight]);

  return {
    layoutState,
    containerRef,
    rightPaneRef,
    handleHorizontalMouseDown,
    handleVerticalMouseDown,
  };
};
