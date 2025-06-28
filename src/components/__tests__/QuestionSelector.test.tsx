import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import QuestionSelector from '../QuestionSelector';
import { QuestionSelectorProps } from '@/types';

// Mock the formatters utility
jest.mock('../../utils/formatters', () => ({
  formatQuestionName: (id: string) => id.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase()
}));

describe('QuestionSelector', () => {
  const defaultProps: QuestionSelectorProps = {
    selectedQuestionId: '01-test-question',
    availableQuestions: ['01-test-question', '02-another-question'],
    onQuestionChange: jest.fn(),
    isLoading: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the question selector with available questions', () => {
    render(<QuestionSelector {...defaultProps} />);
    
    expect(screen.getByText('Question:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('TEST QUESTION')).toBeInTheDocument();
  });

  it('should render all available questions as options', () => {
    render(<QuestionSelector {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    const options = within(select).getAllByRole('option');
    
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('TEST QUESTION');
    expect(options[1]).toHaveTextContent('ANOTHER QUESTION');
  });

  it('should call onQuestionChange when a new question is selected', () => {
    render(<QuestionSelector {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '02-another-question' } });
    
    expect(defaultProps.onQuestionChange).toHaveBeenCalledWith('02-another-question');
  });

  it('should show loading state when isLoading is true', () => {
    render(<QuestionSelector {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('should show loading state when no questions are available', () => {
    render(<QuestionSelector {...defaultProps} availableQuestions={[]} />);
    
    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('should not be disabled when questions are available and not loading', () => {
    render(<QuestionSelector {...defaultProps} />);
    
    expect(screen.getByRole('combobox')).not.toBeDisabled();
  });

  it('should apply correct CSS classes', () => {
    render(<QuestionSelector {...defaultProps} />);
    
    const container = screen.getByRole('combobox').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'space-x-2');
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('text-sm', 'border', 'border-gray-300', 'rounded', 'px-2', 'py-1', 'bg-white', 'min-w-[200px]');
  });

  it('should handle empty selectedQuestionId', () => {
    const propsWithEmptyId = { 
      ...defaultProps, 
      selectedQuestionId: '',
      availableQuestions: [] // Also test empty questions array
    };
    render(<QuestionSelector {...propsWithEmptyId} />);
    
    // When no questions are available, it should show loading
    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});