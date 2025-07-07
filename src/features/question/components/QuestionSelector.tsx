import React, { useState, useRef, useEffect } from 'react';
import { QuestionSelectorProps } from '@/shared/types';
import { formatQuestionName } from '@/shared';

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  selectedQuestionId,
  availableQuestions,
  onQuestionChange,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel =
    availableQuestions.find((id) => id === selectedQuestionId) &&
    formatQuestionName(selectedQuestionId);

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 min-w-[160px]"
        aria-label="Select question"
        disabled={isLoading || availableQuestions.length === 0}
      >
        <span className="text-sm font-medium truncate max-w-[120px]">
          {isLoading ? 'Loading...' : selectedLabel || 'Select Question'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && availableQuestions.length > 0 && !isLoading && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="py-1">
            {availableQuestions.map((id) => (
              <button
                key={id}
                onClick={() => {
                  onQuestionChange(id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors truncate ${
                  selectedQuestionId === id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <span className="text-sm truncate">
                  {formatQuestionName(id)}
                </span>
                {selectedQuestionId === id && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionSelector;
