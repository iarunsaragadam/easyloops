import React from 'react';
import { LayoutState } from '@/shared/types';
import { useWindowSize, DraggableDivider } from '@/shared';

interface MainLayoutProps {
  layoutState: LayoutState;
  containerRef: React.RefObject<HTMLDivElement>;
  rightPaneRef: React.RefObject<HTMLDivElement>;
  onHorizontalMouseDown: (e: React.MouseEvent) => void;
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  layoutState,
  containerRef,
  rightPaneRef,
  onHorizontalMouseDown,
  leftPane,
  rightPane,
}) => {
  const { isMobile } = useWindowSize();

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col md:flex-row overflow-hidden layout-container"
      style={{
        cursor: layoutState.isDraggingHorizontal ? 'col-resize' : 'default',
      }}
    >
      {/* Left Pane - Problem Description */}
      <div
        className="bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 overflow-y-auto left-pane"
        style={{
          width: isMobile ? '100%' : undefined,
          height: isMobile ? '50vh' : 'auto',
          minHeight: isMobile ? '300px' : 'auto',
        }}
      >
        <div className="p-4 md:p-6">{leftPane}</div>
      </div>

      {/* Horizontal Draggable Divider - Hidden on mobile */}
      {!isMobile && (
        <DraggableDivider
          onMouseDown={onHorizontalMouseDown}
          orientation="horizontal"
        />
      )}

      {/* Right Pane - Code Editor and Test Results */}
      <div
        ref={rightPaneRef}
        className="bg-white dark:bg-gray-900 flex flex-col flex-1 right-pane"
        style={{
          width: isMobile ? '100%' : undefined,
          height: isMobile ? '50vh' : 'auto',
          minHeight: isMobile ? '300px' : 'auto',
        }}
      >
        {rightPane}
      </div>
    </div>
  );
};

export default MainLayout;
