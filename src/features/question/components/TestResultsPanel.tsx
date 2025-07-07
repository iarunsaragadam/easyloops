import React, { useState } from 'react';
import { TestResultsPanelProps } from '@/shared/types';

const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  testResults,
  output,
}) => {
  const [activeTab, setActiveTab] = useState<'output' | number>('output');

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex overflow-x-auto">
          {/* Output Tab */}
          <button
            onClick={() => setActiveTab('output')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'output'
                ? 'border-b-2 border-blue-500 text-blue-600 bg-white dark:bg-gray-900 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Console
          </button>

          {/* Test Result Tabs */}
          {testResults.map((result, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === index
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-white dark:bg-gray-900 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  result.passed ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              Test Case {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Output Content */}
        {activeTab === 'output' && (
          <div className="p-4 h-full">
            {output ? (
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Output:
                </h3>
                <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-100 overflow-x-auto border dark:border-gray-700">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-sm">No output to display</p>
                  <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
                    Run your code to see the output
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Test Result Content */}
        {typeof activeTab === 'number' && testResults[activeTab] && (
          <div className="p-4">
            {(() => {
              const result = testResults[activeTab];
              return (
                <div className="space-y-4">
                  {/* Status Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Test Case {activeTab + 1}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        result.passed
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}
                    >
                      {result.passed ? 'Accepted' : 'Wrong Answer'}
                    </span>
                  </div>

                  {/* Input Section */}
                  {result.input && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Input:
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-3">
                        <pre className="text-sm font-mono text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
                          {result.input}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Expected Output */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected Output:
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-3">
                      <pre className="text-sm font-mono text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
                        {result.expected}
                      </pre>
                    </div>
                  </div>

                  {/* Actual Output */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Output:
                    </h4>
                    <div
                      className={`border rounded-lg p-3 ${
                        result.passed
                          ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800'
                      }`}
                    >
                      <pre className="text-sm font-mono text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
                        {result.actual}
                      </pre>
                    </div>
                  </div>

                  {/* Status Message */}
                  {result.passed ? (
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-200 bg-green-50 dark:bg-green-900 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Test passed! Your output matches the expected result.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-200 bg-red-50 dark:bg-red-900 p-3 rounded-lg border border-red-200 dark:border-red-800">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Test failed. Your output doesn&apos;t match the expected
                        result.
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Default state when no tests run */}
        {testResults.length === 0 && !output && (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <p className="text-lg font-medium mb-2">
                Ready to test your code?
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Click &quot;Run&quot; to execute your code and see the results
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultsPanel;
