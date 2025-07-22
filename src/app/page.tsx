'use client';

import React from 'react';
import Link from 'next/link';
import { DEFAULT_QUESTION_ID } from '@/shared/constants';
import { SimpleHeader, AnimatedText } from '@/shared/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <SimpleHeader />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Master </span>
            <AnimatedText
              words={['Programming', 'Logic']}
              interval={3000}
              className="text-gray-900 dark:text-white"
            />
            <span className="text-blue-600 dark:text-blue-400">
              {' '}
              One Problem at a Time
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive coding challenges designed to build your programming
            skills systematically. From basic concepts to advanced algorithms,
            practice with real-time feedback and comprehensive test cases.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={`/questions/${DEFAULT_QUESTION_ID}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Start Learning
            </Link>
            <Link
              href="/questions"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-3 px-8 rounded-lg text-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-200"
            >
              Browse Problems
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Interactive Editor
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Write, run, and test your code in real-time with our powerful
              online editor supporting Python and Go.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">🧪</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Comprehensive Testing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get instant feedback with multiple test cases and detailed results
              to understand where your code succeeds or fails.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Structured Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Progress through carefully curated problems from basic concepts to
              advanced algorithms and design patterns.
            </p>
          </div>
        </div>

        {/* Problem Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl mb-2">🔢</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Fundamentals
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Variables, data types, operators
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl mb-2">🔄</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Control Flow
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Loops, conditionals, functions
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Data Structures
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Arrays, lists, trees, graphs
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Algorithms
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Sorting, searching, optimization
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Programming Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of learners who have improved their coding skills
            with easyloops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/questions/${DEFAULT_QUESTION_ID}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Begin with Your First Problem
            </Link>
            <Link
              href="/help"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-3 px-8 rounded-lg text-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-200"
            >
              How You Can Help
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>
              &copy; 2024 easyloops. Learn programming, one problem at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
