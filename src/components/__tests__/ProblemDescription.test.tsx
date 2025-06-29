import React from 'react';
import { render, screen } from '@testing-library/react';
import ProblemDescription from '../ProblemDescription';
import { ProblemDescriptionProps, Question } from '@/types';

// Mock MarkdownRenderer component
jest.mock('../MarkdownRenderer', () => {
  return function MockMarkdownRenderer({ content }: { content: string }) {
    return <div data-testid="markdown-content">{content}</div>;
  };
});

describe('ProblemDescription', () => {
  const mockQuestion: Question = {
    id: '01-test-question',
    name: 'Test Question',
    description: 'This is a test question description with **markdown**',
    testCases: [
      {
        inputFile: 'input1.txt',
        expectedFile: 'expected1.txt',
        description: 'Test case 1'
      }
    ]
  };

  const defaultProps: ProblemDescriptionProps = {
    question: mockQuestion,
    isLoading: false
  };

  it('should render loading state when isLoading is true', () => {
    render(<ProblemDescription question={null} isLoading={true} />);
    
    expect(screen.getByText('Loading question...')).toBeInTheDocument();
    expect(screen.getByText('Loading question...')).toHaveClass('text-gray-500');
  });

  it('should render empty state when no question is provided and not loading', () => {
    render(<ProblemDescription question={null} isLoading={false} />);
    
    expect(screen.getByText('Select a question to begin')).toBeInTheDocument();
    expect(screen.getByText('Select a question to begin')).toHaveClass('text-gray-500');
  });

  it('should render question details when question is provided', () => {
    render(<ProblemDescription {...defaultProps} />);
    
    expect(screen.getByText('🏷️ Test Question')).toBeInTheDocument();
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText('01-test-question')).toBeInTheDocument();
  });

  it('should render markdown content using MarkdownRenderer', () => {
    render(<ProblemDescription {...defaultProps} />);
    
    const markdownContent = screen.getByTestId('markdown-content');
    expect(markdownContent).toBeInTheDocument();
    expect(markdownContent).toHaveTextContent('This is a test question description with **markdown**');
  });

  it('should apply correct CSS classes for question header', () => {
    render(<ProblemDescription {...defaultProps} />);
    
    const title = screen.getByText('🏷️ Test Question');
    expect(title).toHaveClass('text-lg', 'font-semibold', 'text-gray-900', 'mb-2');
  });

  it('should apply correct CSS classes for question ID', () => {
    render(<ProblemDescription {...defaultProps} />);
    
    const idLabel = screen.getByText('ID:');
    expect(idLabel).toHaveClass('font-medium');
    
    const idContainer = idLabel.parentElement;
    expect(idContainer).toHaveClass('text-sm', 'text-gray-600', 'mb-4');
  });

  it('should apply correct CSS classes for prose content', () => {
    render(<ProblemDescription {...defaultProps} />);
    
    const proseContainer = screen.getByTestId('markdown-content').parentElement;
    expect(proseContainer).toHaveClass('prose', 'prose-sm', 'max-w-none');
  });

  it('should handle question with minimal data', () => {
    const minimalQuestion: Question = {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple',
      testCases: []
    };

    render(<ProblemDescription question={minimalQuestion} isLoading={false} />);
    
    expect(screen.getByText('🏷️ Minimal')).toBeInTheDocument();
    expect(screen.getByText('minimal')).toBeInTheDocument();
    expect(screen.getByTestId('markdown-content')).toHaveTextContent('Simple');
  });

  it('should handle empty question name gracefully', () => {
    const questionWithEmptyName: Question = {
      id: 'test-id',
      name: '',
      description: 'Test description',
      testCases: []
    };

    render(<ProblemDescription question={questionWithEmptyName} isLoading={false} />);
    
    expect(screen.getByText('🏷️')).toBeInTheDocument();
    expect(screen.getByText('test-id')).toBeInTheDocument();
  });

  it('should center loading and empty states', () => {
    const { rerender } = render(<ProblemDescription question={null} isLoading={true} />);
    
    let container = screen.getByText('Loading question...').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'h-full');

    rerender(<ProblemDescription question={null} isLoading={false} />);
    
    container = screen.getByText('Select a question to begin').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'h-full');
  });
});