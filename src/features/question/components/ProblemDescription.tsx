import React from 'react';
import { ProblemDescriptionProps } from '@/shared/types';
import { MarkdownRenderer, CollapsibleSection } from '@/shared';

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  question,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading question...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Select a question to begin</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Question Header - Always visible */}
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
          🏷️ {question.name}
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="font-medium">ID:</span> {question.id}
        </div>
      </div>

      {/* Collapsible Problem Description */}
      <CollapsibleSection
        title="Problem Description"
        icon="📚"
        defaultExpanded={true}
        className="mb-4"
      >
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <MarkdownRenderer content={question.description} />
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default ProblemDescription;
