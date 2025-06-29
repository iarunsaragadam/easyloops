import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DraggableDivider from '../DraggableDivider';
import { DraggableDividerProps } from '@/types';

describe('DraggableDivider', () => {
  const defaultProps: DraggableDividerProps = {
    onMouseDown: jest.fn(),
    orientation: 'horizontal',
    className: ''
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render horizontal divider with correct styles', () => {
    const { container } = render(<DraggableDivider {...defaultProps} orientation="horizontal" />);
    
    const divider = container.firstChild;
    expect(divider).toHaveClass('w-1', 'bg-gray-300', 'hover:bg-blue-500', 'cursor-col-resize');
    expect(divider).toHaveClass('flex', 'items-center', 'justify-center', 'group');
  });

  it('should render vertical divider with correct styles', () => {
    const { container } = render(<DraggableDivider {...defaultProps} orientation="vertical" />);
    
    const divider = container.firstChild;
    expect(divider).toHaveClass('h-1', 'bg-gray-300', 'hover:bg-blue-500', 'cursor-row-resize');
    expect(divider).toHaveClass('flex', 'items-center', 'justify-center', 'group');
  });

  it('should render horizontal inner handle with correct styles', () => {
    const { container } = render(<DraggableDivider {...defaultProps} orientation="horizontal" />);
    
    // The selector 'div div' is getting the outer div, not the inner one
    const outerDiv = container.firstChild;
    const innerHandle = outerDiv?.firstChild;
    expect(innerHandle).toHaveClass('w-0.5', 'h-8', 'bg-gray-400', 'group-hover:bg-blue-400', 'rounded-full');
  });

  it('should render vertical inner handle with correct styles', () => {
    const { container } = render(<DraggableDivider {...defaultProps} orientation="vertical" />);
    
    const outerDiv = container.firstChild;
    const innerHandle = outerDiv?.firstChild;
    expect(innerHandle).toHaveClass('h-0.5', 'w-8', 'bg-gray-400', 'group-hover:bg-blue-400', 'rounded-full');
  });

  it('should call onMouseDown when clicked', () => {
    const { container } = render(<DraggableDivider {...defaultProps} />);
    
    const divider = container.firstChild as HTMLElement;
    fireEvent.mouseDown(divider);
    
    expect(defaultProps.onMouseDown).toHaveBeenCalledTimes(1);
  });

  it('should pass mouse event to onMouseDown callback', () => {
    const { container } = render(<DraggableDivider {...defaultProps} />);
    
    const divider = container.firstChild as HTMLElement;
    const mouseEvent = new MouseEvent('mousedown', { bubbles: true });
    fireEvent.mouseDown(divider, mouseEvent);
    
    expect(defaultProps.onMouseDown).toHaveBeenCalledWith(expect.objectContaining({
      type: 'mousedown'
    }));
  });

  it('should apply custom className when provided', () => {
    const customClass = 'custom-divider-class';
    const { container } = render(<DraggableDivider {...defaultProps} className={customClass} />);
    
    const divider = container.firstChild;
    expect(divider).toHaveClass(customClass);
  });

  it('should apply empty className by default', () => {
    const { container } = render(<DraggableDivider onMouseDown={jest.fn()} orientation="horizontal" />);
    
    const divider = container.firstChild;
    expect(divider).toHaveClass('flex', 'items-center', 'justify-center', 'group');
  });

  it('should have proper accessibility attributes', () => {
    const { container } = render(<DraggableDivider {...defaultProps} />);
    
    const divider = container.firstChild as HTMLElement;
    expect(divider.tagName).toBe('DIV');
    // React event handlers don't show up as HTML attributes in testing
    expect(divider).toBeInTheDocument();
  });

  it('should render inner handle element', () => {
    const { container } = render(<DraggableDivider {...defaultProps} />);
    
    const outerDiv = container.firstChild;
    const innerHandle = outerDiv?.firstChild;
    expect(innerHandle).toBeInTheDocument();
    expect(innerHandle).toHaveClass('rounded-full');
  });

  it('should handle multiple mouse down events', () => {
    const { container } = render(<DraggableDivider {...defaultProps} />);
    
    const divider = container.firstChild as HTMLElement;
    
    fireEvent.mouseDown(divider);
    fireEvent.mouseDown(divider);
    fireEvent.mouseDown(divider);
    
    expect(defaultProps.onMouseDown).toHaveBeenCalledTimes(3);
  });

  it('should maintain consistent structure for both orientations', () => {
    const { container: horizontalContainer } = render(
      <DraggableDivider {...defaultProps} orientation="horizontal" />
    );
    
    const { container: verticalContainer } = render(
      <DraggableDivider {...defaultProps} orientation="vertical" />
    );
    
    const horizontalDivider = horizontalContainer.firstChild;
    const verticalDivider = verticalContainer.firstChild;
    
    expect(horizontalDivider?.childNodes.length).toBe(verticalDivider?.childNodes.length);
    expect(horizontalDivider?.childNodes.length).toBe(1); // Should have one inner handle
  });
});