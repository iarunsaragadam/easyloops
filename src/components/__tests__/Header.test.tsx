import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { QuestionSelectorProps } from '@/types';

// Mock the QuestionSelector component
jest.mock('../QuestionSelector', () => {
  return function MockQuestionSelector(props: QuestionSelectorProps) {
    return (
      <div data-testid="question-selector">
        Mock Question Selector - {props.availableQuestions.length} questions
      </div>
    );
  };
});

describe('Header', () => {
  const mockProps: QuestionSelectorProps = {
    availableQuestions: ['01-test', '02-another-test'],
    selectedQuestionId: '01-test',
    onQuestionChange: jest.fn(),
  };

  it('should render the header with correct title', () => {
    render(<Header {...mockProps} />);
    
    expect(screen.getByText('🧠 EasyLoops')).toBeInTheDocument();
    expect(screen.getByText('Practice Problems')).toBeInTheDocument();
  });

  it('should render the question selector', () => {
    render(<Header {...mockProps} />);
    
    expect(screen.getByTestId('question-selector')).toBeInTheDocument();
    expect(screen.getByText('Mock Question Selector - 2 questions')).toBeInTheDocument();
  });

  it('should render the language selector', () => {
    render(<Header {...mockProps} />);
    
    expect(screen.getByText('Language:')).toBeInTheDocument();
    
    const languageSelect = screen.getByRole('combobox');
    expect(languageSelect).toBeInTheDocument();
    
    // Check that options are present
    expect(screen.getByText('Python3')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  it('should have correct CSS classes for styling', () => {
    const { container } = render(<Header {...mockProps} />);
    
    const headerDiv = container.firstChild;
    expect(headerDiv).toHaveClass('bg-white', 'border-b', 'border-gray-200', 'px-6', 'py-4');
  });
});