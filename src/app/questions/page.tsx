'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAvailableQuestions } from '@/shared/lib';
import { formatQuestionName } from '@/shared/lib/formatters';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailableQuestions().then((questionList) => {
      setQuestions(questionList);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                🧠 EasyLoops
              </Link>
            </div>
            <nav className="flex space-x-8">
              <span className="text-gray-900 dark:text-white px-3 py-2 text-sm font-medium">
                Practice Problems
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Practice Problems
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose a problem to start practicing. Problems are organized by
            difficulty and topic.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((questionId) => (
            <Link
              key={questionId}
              href={`/questions/${questionId}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 hover:border-blue-300 dark:hover:border-blue-500"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatQuestionName(questionId)}
                </h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                  {questionId.split('-')[0]}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Practice {questionId.replace(/-/g, ' ').replace(/\d+-/, '')}{' '}
                concepts and improve your skills.
              </p>
              <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <span>Start Problem</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
