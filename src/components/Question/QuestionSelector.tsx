import React from 'react';
import { QuestionSelectorProps } from '@/types';
import { formatQuestionName } from '@/lib/formatters';

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  selectedQuestionId,
  availableQuestions,
  onQuestionChange,
  isLoading = false,
}) => {
  return (
    <div className="flex items-center space-x-2 w-full md:w-auto">
      <span className="text-sm text-gray-600 whitespace-nowrap">Question:</span>
      <select
        value={selectedQuestionId}
        onChange={(e) => onQuestionChange(e.target.value)}
        className="text-sm border border-gray-300 rounded px-2 py-1 bg-white flex-1 md:flex-none md:min-w-[200px] truncate max-w-[200px] md:max-w-none"
        disabled={availableQuestions.length === 0 || isLoading}
      >
        {availableQuestions.length === 0 || isLoading ? (
          <option>Loading questions...</option>
        ) : (
          availableQuestions.map((id) => (
            <option key={id} value={id}>
              {formatQuestionName(id)}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default QuestionSelector;
