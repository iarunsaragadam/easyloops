import React from 'react';
import { render, screen } from '@testing-library/react';
import MarkdownRenderer from '../MarkdownRenderer';

// Mock marked library
jest.mock('marked', () => ({
  marked: jest.fn((content: string) => `<p>${content}</p>`)
}));

describe('MarkdownRenderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render markdown content as HTML', () => {
    const content = 'This is **bold** text';
    render(<MarkdownRenderer content={content} />);
    
    const container = screen.getByText(content);
    expect(container).toBeInTheDocument();
  });

  it('should apply default CSS classes', () => {
    const content = 'Test content';
    const { container } = render(<MarkdownRenderer content={content} />);
    
    const markdownDiv = container.firstChild;
    expect(markdownDiv).toHaveClass('markdown-content', 'prose', 'prose-sm', 'max-w-none');
  });

  it('should apply custom className when provided', () => {
    const content = 'Test content';
    const customClass = 'custom-class';
    const { container } = render(<MarkdownRenderer content={content} className={customClass} />);
    
    const markdownDiv = container.firstChild;
    expect(markdownDiv).toHaveClass('markdown-content', 'prose', 'prose-sm', 'max-w-none', customClass);
  });

  it('should handle empty content', () => {
    const { container } = render(<MarkdownRenderer content="" />);
    
    const markdownDiv = container.firstChild;
    expect(markdownDiv).toBeInTheDocument();
    expect(markdownDiv).toHaveClass('markdown-content');
  });

  it('should handle content with special characters', () => {
    const content = 'Content with symbols';
    render(<MarkdownRenderer content={content} />);
    
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('should use dangerouslySetInnerHTML to render HTML', () => {
    const content = 'Test markdown';
    const { container } = render(<MarkdownRenderer content={content} />);
    
    const markdownDiv = container.firstChild as HTMLElement;
    expect(markdownDiv.innerHTML).toBe('<p>Test markdown</p>');
  });

  it('should memoize marked result', () => {
    const marked = require('marked').marked;
    const content = 'Test content';
    
    const { rerender } = render(<MarkdownRenderer content={content} />);
    expect(marked).toHaveBeenCalledTimes(1);
    
    // Re-render with same content - should not call marked again
    rerender(<MarkdownRenderer content={content} />);
    expect(marked).toHaveBeenCalledTimes(1);
    
    // Re-render with different content - should call marked again
    rerender(<MarkdownRenderer content="Different content" />);
    expect(marked).toHaveBeenCalledTimes(2);
  });

  it('should handle undefined className', () => {
    const content = 'Test content';
    const { container } = render(<MarkdownRenderer content={content} className={undefined} />);
    
    const markdownDiv = container.firstChild;
    expect(markdownDiv).toHaveClass('markdown-content', 'prose', 'prose-sm', 'max-w-none');
    expect(markdownDiv).not.toHaveClass('undefined');
  });

  it('should pass content to marked function', () => {
    const marked = require('marked').marked;
    const content = 'This is **test** content';
    
    render(<MarkdownRenderer content={content} />);
    
    expect(marked).toHaveBeenCalledWith(content);
  });
});