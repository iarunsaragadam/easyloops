import { renderHook, act, fireEvent } from '@testing-library/react';
import { useResizableLayout } from '../useResizableLayout';

// Mock constants
jest.mock('../../constants', () => ({
  LAYOUT_CONSTANTS: {
    DEFAULT_LEFT_PANE_WIDTH: 40,
    DEFAULT_TEST_RESULTS_HEIGHT: 150,
    MIN_LEFT_PANE_WIDTH: 20,
    MAX_LEFT_PANE_WIDTH: 80,
    MIN_TEST_RESULTS_HEIGHT: 100,
    MAX_TEST_RESULTS_HEIGHT: 400,
  }
}));

describe('useResizableLayout', () => {
  beforeEach(() => {
    // Reset document body styles
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    
    // Clear any existing event listeners
    document.removeEventListener('mousemove', () => {});
    document.removeEventListener('mouseup', () => {});
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useResizableLayout());

    expect(result.current.layoutState).toEqual({
      leftPaneWidth: 40,
      testResultsHeight: 150,
      isDraggingHorizontal: false,
      isDraggingVertical: false
    });

    expect(result.current.containerRef.current).toBeNull();
    expect(result.current.rightPaneRef.current).toBeNull();
    expect(typeof result.current.handleHorizontalMouseDown).toBe('function');
    expect(typeof result.current.handleVerticalMouseDown).toBe('function');
  });

  it('should initialize with custom values', () => {
    const { result } = renderHook(() => useResizableLayout(50 as any, 200 as any));

    expect(result.current.layoutState).toEqual({
      leftPaneWidth: 50,
      testResultsHeight: 200,
      isDraggingHorizontal: false,
      isDraggingVertical: false
    });
  });

  it('should handle horizontal mouse down', () => {
    const { result } = renderHook(() => useResizableLayout());

    const mockEvent = {
      preventDefault: jest.fn()
    } as any;

    act(() => {
      result.current.handleHorizontalMouseDown(mockEvent);
    });

    expect(result.current.layoutState.isDraggingHorizontal).toBe(true);
    expect(result.current.layoutState.isDraggingVertical).toBe(false);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should handle vertical mouse down', () => {
    const { result } = renderHook(() => useResizableLayout());

    const mockEvent = {
      preventDefault: jest.fn()
    } as any;

    act(() => {
      result.current.handleVerticalMouseDown(mockEvent);
    });

    expect(result.current.layoutState.isDraggingVertical).toBe(true);
    expect(result.current.layoutState.isDraggingHorizontal).toBe(false);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should add event listeners when dragging starts', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const { result } = renderHook(() => useResizableLayout());

    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(document.body.style.cursor).toBe('col-resize');
    expect(document.body.style.userSelect).toBe('none');

    addEventListenerSpy.mockRestore();
  });

  it('should set row-resize cursor for vertical dragging', () => {
    const { result } = renderHook(() => useResizableLayout());

    act(() => {
      result.current.handleVerticalMouseDown({ preventDefault: jest.fn() } as any);
    });

    expect(document.body.style.cursor).toBe('row-resize');
    expect(document.body.style.userSelect).toBe('none');
  });

  it('should remove event listeners when dragging stops', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { result } = renderHook(() => useResizableLayout());

    // Start dragging
    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse up
    act(() => {
      fireEvent.mouseUp(document);
    });

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(document.body.style.cursor).toBe('');
    expect(document.body.style.userSelect).toBe('');

    removeEventListenerSpy.mockRestore();
  });

  it('should handle horizontal mouse move and constrain width', () => {
    const { result } = renderHook(() => useResizableLayout());

    // Mock container element
    const mockContainer = {
      getBoundingClientRect: () => ({
        left: 0,
        width: 1000
      })
    };
    result.current.containerRef.current = mockContainer as any;

    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse move to 300px (should be 30% of 1000px container)
    act(() => {
      fireEvent.mouseMove(document, { clientX: 300 });
    });

    expect(result.current.layoutState.leftPaneWidth).toBe(30);
  });

  it('should constrain horizontal width to minimum', () => {
    const { result } = renderHook(() => useResizableLayout());

    const mockContainer = {
      getBoundingClientRect: () => ({
        left: 0,
        width: 1000
      })
    };
    result.current.containerRef.current = mockContainer as any;

    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse move to 100px (10% of container, below min 20%)
    act(() => {
      fireEvent.mouseMove(document, { clientX: 100 });
    });

    expect(result.current.layoutState.leftPaneWidth).toBe(20); // Constrained to MIN
  });

  it('should constrain horizontal width to maximum', () => {
    const { result } = renderHook(() => useResizableLayout());

    const mockContainer = {
      getBoundingClientRect: () => ({
        left: 0,
        width: 1000
      })
    };
    result.current.containerRef.current = mockContainer as any;

    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse move to 900px (90% of container, above max 80%)
    act(() => {
      fireEvent.mouseMove(document, { clientX: 900 });
    });

    expect(result.current.layoutState.leftPaneWidth).toBe(80); // Constrained to MAX
  });

  it('should handle vertical mouse move and constrain height', () => {
    const { result } = renderHook(() => useResizableLayout());

    // Mock right pane element
    const mockRightPane = {
      getBoundingClientRect: () => ({
        bottom: 600
      })
    };
    result.current.rightPaneRef.current = mockRightPane as any;

    act(() => {
      result.current.handleVerticalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse move to clientY 400 (bottom 600 - clientY 400 = 200px height)
    act(() => {
      fireEvent.mouseMove(document, { clientY: 400 });
    });

    expect(result.current.layoutState.testResultsHeight).toBe(200);
  });

  it('should constrain vertical height to minimum', () => {
    const { result } = renderHook(() => useResizableLayout());

    const mockRightPane = {
      getBoundingClientRect: () => ({
        bottom: 600
      })
    };
    result.current.rightPaneRef.current = mockRightPane as any;

    act(() => {
      result.current.handleVerticalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse move to clientY 550 (bottom 600 - clientY 550 = 50px, below min 100px)
    act(() => {
      fireEvent.mouseMove(document, { clientY: 550 });
    });

    expect(result.current.layoutState.testResultsHeight).toBe(100); // Constrained to MIN
  });

  it('should constrain vertical height to maximum', () => {
    const { result } = renderHook(() => useResizableLayout());

    const mockRightPane = {
      getBoundingClientRect: () => ({
        bottom: 600
      })
    };
    result.current.rightPaneRef.current = mockRightPane as any;

    act(() => {
      result.current.handleVerticalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse move to clientY 100 (bottom 600 - clientY 100 = 500px, above max 400px)
    act(() => {
      fireEvent.mouseMove(document, { clientY: 100 });
    });

    expect(result.current.layoutState.testResultsHeight).toBe(400); // Constrained to MAX
  });

  it('should not resize when not dragging', () => {
    const { result } = renderHook(() => useResizableLayout());

    const mockContainer = {
      getBoundingClientRect: () => ({
        left: 0,
        width: 1000
      })
    };
    result.current.containerRef.current = mockContainer as any;

    // Simulate mouse move without dragging
    act(() => {
      fireEvent.mouseMove(document, { clientX: 300 });
    });

    expect(result.current.layoutState.leftPaneWidth).toBe(40); // Should remain unchanged
  });

  it('should not resize when container ref is null', () => {
    const { result } = renderHook(() => useResizableLayout());

    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse move with null container ref
    act(() => {
      fireEvent.mouseMove(document, { clientX: 300 });
    });

    expect(result.current.layoutState.leftPaneWidth).toBe(40); // Should remain unchanged
  });

  it('should not resize when right pane ref is null', () => {
    const { result } = renderHook(() => useResizableLayout());

    act(() => {
      result.current.handleVerticalMouseDown({ preventDefault: jest.fn() } as any);
    });

    // Simulate mouse move with null right pane ref
    act(() => {
      fireEvent.mouseMove(document, { clientY: 400 });
    });

    expect(result.current.layoutState.testResultsHeight).toBe(150); // Should remain unchanged
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { result, unmount } = renderHook(() => useResizableLayout());

    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(document.body.style.cursor).toBe('');
    expect(document.body.style.userSelect).toBe('');

    removeEventListenerSpy.mockRestore();
  });

  it('should handle mouse up event to stop dragging', () => {
    const { result } = renderHook(() => useResizableLayout());

    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.layoutState.isDraggingHorizontal).toBe(true);

    act(() => {
      fireEvent.mouseUp(document);
    });

    expect(result.current.layoutState.isDraggingHorizontal).toBe(false);
    expect(result.current.layoutState.isDraggingVertical).toBe(false);
  });

  it('should handle both horizontal and vertical dragging states independently', () => {
    const { result } = renderHook(() => useResizableLayout());

    // Start horizontal dragging
    act(() => {
      result.current.handleHorizontalMouseDown({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.layoutState.isDraggingHorizontal).toBe(true);
    expect(result.current.layoutState.isDraggingVertical).toBe(false);

    // Stop horizontal dragging
    act(() => {
      fireEvent.mouseUp(document);
    });

    // Start vertical dragging
    act(() => {
      result.current.handleVerticalMouseDown({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.layoutState.isDraggingHorizontal).toBe(false);
    expect(result.current.layoutState.isDraggingVertical).toBe(true);
  });
});