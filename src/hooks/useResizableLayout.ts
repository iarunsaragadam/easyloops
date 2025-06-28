import { useState, useEffect, useRef, useCallback } from "react";
import { LayoutState } from "@/types";
import { LAYOUT_CONSTANTS } from "@/constants";

export const useResizableLayout = (
  initialLeftWidth = LAYOUT_CONSTANTS.DEFAULT_LEFT_PANE_WIDTH,
  initialTestHeight = LAYOUT_CONSTANTS.DEFAULT_TEST_RESULTS_HEIGHT
) => {
  const [layoutState, setLayoutState] = useState<LayoutState>({
    leftPaneWidth: initialLeftWidth,
    testResultsHeight: initialTestHeight,
    isDraggingHorizontal: false,
    isDraggingVertical: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  const handleHorizontalMouseDown = (e: React.MouseEvent) => {
    setLayoutState((prev) => ({ ...prev, isDraggingHorizontal: true }));
    e.preventDefault();
  };

  const handleVerticalMouseDown = (e: React.MouseEvent) => {
    setLayoutState((prev) => ({ ...prev, isDraggingVertical: true }));
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (layoutState.isDraggingHorizontal && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Constrain to reasonable bounds
      const constrainedWidth = Math.max(
        LAYOUT_CONSTANTS.MIN_LEFT_PANE_WIDTH,
        Math.min(LAYOUT_CONSTANTS.MAX_LEFT_PANE_WIDTH, newLeftWidth)
      );
      setLayoutState((prev) => ({ ...prev, leftPaneWidth: constrainedWidth }));
    }

    if (layoutState.isDraggingVertical && rightPaneRef.current) {
      const rightPaneRect = rightPaneRef.current.getBoundingClientRect();
      const newTestHeight = rightPaneRect.bottom - e.clientY;

      // Constrain to reasonable bounds
      const constrainedHeight = Math.max(
        LAYOUT_CONSTANTS.MIN_TEST_RESULTS_HEIGHT,
        Math.min(LAYOUT_CONSTANTS.MAX_TEST_RESULTS_HEIGHT, newTestHeight)
      );
      setLayoutState((prev) => ({
        ...prev,
        testResultsHeight: constrainedHeight,
      }));
    }
  }, [layoutState.isDraggingHorizontal, layoutState.isDraggingVertical]);

  const handleMouseUp = useCallback(() => {
    setLayoutState((prev) => ({
      ...prev,
      isDraggingHorizontal: false,
      isDraggingVertical: false,
    }));
  }, []);

  useEffect(() => {
    if (layoutState.isDraggingHorizontal || layoutState.isDraggingVertical) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = layoutState.isDraggingHorizontal
        ? "col-resize"
        : "row-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [layoutState.isDraggingHorizontal, layoutState.isDraggingVertical, handleMouseMove, handleMouseUp]);

  return {
    layoutState,
    containerRef,
    rightPaneRef,
    handleHorizontalMouseDown,
    handleVerticalMouseDown,
  };
};
