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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 hover:text-blue-600"
              >
                🧠 EasyLoops
              </Link>
            </div>
            <nav className="flex space-x-8">
              <span className="text-gray-900 px-3 py-2 text-sm font-medium">
                Practice Problems
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Practice Problems
          </h1>
          <p className="text-gray-600">
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
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatQuestionName(questionId)}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {questionId.split('-')[0]}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Practice {questionId.replace(/-/g, ' ').replace(/\d+-/, '')}{' '}
                concepts and improve your skills.
              </p>
              <div className="flex items-center text-sm text-blue-600">
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
