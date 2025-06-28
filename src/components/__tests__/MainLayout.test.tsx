import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from '../MainLayout';
import { LayoutState } from '@/types';

// Mock DraggableDivider component
jest.mock('../DraggableDivider', () => {
  return function MockDraggableDivider({ onMouseDown, orientation }: any) {
    return (
      <div 
        data-testid="draggable-divider"
        onClick={onMouseDown}
      >
        Draggable Divider - {orientation}
      </div>
    );
  };
});

describe('MainLayout', () => {
  const mockContainerRef = { current: null };
  const mockRightPaneRef = { current: null };
  const mockOnHorizontalMouseDown = jest.fn();

  const defaultLayoutState: LayoutState = {
    leftPaneWidth: 40,
    testResultsHeight: 150,
    isDraggingHorizontal: false,
    isDraggingVertical: false
  };

  const defaultProps = {
    layoutState: defaultLayoutState,
    containerRef: mockContainerRef,
    rightPaneRef: mockRightPaneRef,
    onHorizontalMouseDown: mockOnHorizontalMouseDown,
    leftPane: <div data-testid="left-pane-content">Left pane content</div>,
    rightPane: <div data-testid="right-pane-content">Right pane content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render left and right panes', () => {
    render(<MainLayout {...defaultProps} />);
    
    expect(screen.getByTestId('left-pane-content')).toBeInTheDocument();
    expect(screen.getByTestId('right-pane-content')).toBeInTheDocument();
  });

  it('should render draggable divider', () => {
    render(<MainLayout {...defaultProps} />);
    
    expect(screen.getByTestId('draggable-divider')).toBeInTheDocument();
    expect(screen.getByText('Draggable Divider - horizontal')).toBeInTheDocument();
  });

  it('should apply correct width styles based on layout state', () => {
    const { container } = render(<MainLayout {...defaultProps} />);
    
    const leftPane = container.querySelector('.bg-white.border-r.border-gray-200');
    const rightPane = container.querySelector('.bg-white.flex.flex-col');
    
    expect(leftPane).toHaveStyle('width: 40%');
    expect(rightPane).toHaveStyle('width: 60%');
  });

  it('should apply dragging cursor when isDraggingHorizontal is true', () => {
    const draggingLayoutState = {
      ...defaultLayoutState,
      isDraggingHorizontal: true
    };

    const { container } = render(
      <MainLayout {...defaultProps} layoutState={draggingLayoutState} />
    );
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveStyle('cursor: col-resize');
  });

  it('should apply default cursor when not dragging', () => {
    const { container } = render(<MainLayout {...defaultProps} />);
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveStyle('cursor: default');
  });

  it('should handle different left pane widths', () => {
    const layoutState = {
      ...defaultLayoutState,
      leftPaneWidth: 30
    };

    const { container } = render(
      <MainLayout {...defaultProps} layoutState={layoutState} />
    );
    
    const leftPane = container.querySelector('.bg-white.border-r.border-gray-200');
    const rightPane = container.querySelector('.bg-white.flex.flex-col');
    
    expect(leftPane).toHaveStyle('width: 30%');
    expect(rightPane).toHaveStyle('width: 70%');
  });

  it('should apply correct CSS classes to main container', () => {
    const { container } = render(<MainLayout {...defaultProps} />);
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('flex-1', 'flex', 'overflow-hidden');
  });

  it('should apply correct CSS classes to left pane', () => {
    const { container } = render(<MainLayout {...defaultProps} />);
    
    const leftPane = container.querySelector('.bg-white.border-r.border-gray-200');
    expect(leftPane).toHaveClass('bg-white', 'border-r', 'border-gray-200', 'overflow-y-auto');
  });

  it('should apply correct CSS classes to right pane', () => {
    const { container } = render(<MainLayout {...defaultProps} />);
    
    const rightPane = container.querySelector('.bg-white.flex.flex-col');
    expect(rightPane).toHaveClass('bg-white', 'flex', 'flex-col');
  });

  it('should apply padding to left pane content wrapper', () => {
    const { container } = render(<MainLayout {...defaultProps} />);
    
    const leftPaneContent = container.querySelector('.p-6');
    expect(leftPaneContent).toHaveClass('p-6');
    expect(leftPaneContent).toContainElement(screen.getByTestId('left-pane-content'));
  });

  it('should pass correct props to DraggableDivider', () => {
    render(<MainLayout {...defaultProps} />);
    
    const divider = screen.getByTestId('draggable-divider');
    expect(divider).toBeInTheDocument();
  });

  it('should handle refs correctly', () => {
    const containerRef = React.createRef<HTMLDivElement>();
    const rightPaneRef = React.createRef<HTMLDivElement>();

    render(
      <MainLayout 
        {...defaultProps} 
        containerRef={containerRef}
        rightPaneRef={rightPaneRef}
      />
    );

    expect(containerRef.current).toBeTruthy();
    expect(rightPaneRef.current).toBeTruthy();
  });

  it('should handle custom children content', () => {
    const customLeftPane = <div data-testid="custom-left">Custom left content</div>;
    const customRightPane = <div data-testid="custom-right">Custom right content</div>;

    render(
      <MainLayout 
        {...defaultProps} 
        leftPane={customLeftPane}
        rightPane={customRightPane}
      />
    );

    expect(screen.getByTestId('custom-left')).toBeInTheDocument();
    expect(screen.getByTestId('custom-right')).toBeInTheDocument();
    expect(screen.getByText('Custom left content')).toBeInTheDocument();
    expect(screen.getByText('Custom right content')).toBeInTheDocument();
  });

  it('should handle extreme width values', () => {
    const extremeLayoutState = {
      ...defaultLayoutState,
      leftPaneWidth: 90
    };

    const { container } = render(
      <MainLayout {...defaultProps} layoutState={extremeLayoutState} />
    );
    
    const leftPane = container.querySelector('.bg-white.border-r.border-gray-200');
    const rightPane = container.querySelector('.bg-white.flex.flex-col');
    
    expect(leftPane).toHaveStyle('width: 90%');
    expect(rightPane).toHaveStyle('width: 10%');
  });

  it('should handle minimal width values', () => {
    const minimalLayoutState = {
      ...defaultLayoutState,
      leftPaneWidth: 10
    };

    const { container } = render(
      <MainLayout {...defaultProps} layoutState={minimalLayoutState} />
    );
    
    const leftPane = container.querySelector('.bg-white.border-r.border-gray-200');
    const rightPane = container.querySelector('.bg-white.flex.flex-col');
    
    expect(leftPane).toHaveStyle('width: 10%');
    expect(rightPane).toHaveStyle('width: 90%');
  });
});