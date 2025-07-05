import React from 'react';
import { LayoutState } from '@/types';
import { useWindowSize } from '@/hooks/useWindowSize';
import DraggableDivider from '../ui/DraggableDivider';

interface MainLayoutProps {
  layoutState: LayoutState;
  containerRef: React.RefObject<HTMLDivElement | null>;
  rightPaneRef: React.RefObject<HTMLDivElement | null>;
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
      className="flex-1 flex flex-col md:flex-row overflow-hidden"
      style={{
        cursor: layoutState.isDraggingHorizontal ? 'col-resize' : 'default',
      }}
    >
      {/* Left Pane - Problem Description */}
      <div
        className="bg-white border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto"
        style={{
          width: isMobile ? '100%' : `${layoutState.leftPaneWidth}%`,
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
        className="bg-white flex flex-col flex-1"
        style={{
          width: isMobile ? '100%' : `${100 - layoutState.leftPaneWidth}%`,
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
