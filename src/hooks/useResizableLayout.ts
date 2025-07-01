import { useState, useEffect, useRef } from "react";
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

  const handleMouseMove = (e: MouseEvent) => {
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
  };

  const handleMouseUp = () => {
    setLayoutState((prev) => ({
      ...prev,
      isDraggingHorizontal: false,
      isDraggingVertical: false,
    }));
  };

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
  }, [layoutState.isDraggingHorizontal, layoutState.isDraggingVertical]);

  return {
    layoutState,
    containerRef,
    rightPaneRef,
    handleHorizontalMouseDown,
    handleVerticalMouseDown,
  };
};
