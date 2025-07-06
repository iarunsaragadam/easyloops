import React, { useState } from 'react';
import { TestResultsPanelProps } from '@/shared/types';

const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  testResults,
  output,
  height,
  lastSubmission,
}) => {
  const [activeTab, setActiveTab] = useState<number | 'output'>('output');

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="flex flex-col h-full bg-white border-t border-gray-200" style={{ height }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Test Results</h3>
          {lastSubmission && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Last submission:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                lastSubmission.overallStatus === 'PASSED' 
                  ? 'bg-green-100 text-green-800'
                  : lastSubmission.overallStatus === 'PARTIAL'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {lastSubmission.passedCount}/{lastSubmission.totalCount} passed
              </span>
              <span className="text-gray-500">({formatTime(lastSubmission.executionTime)})</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Test Results Tabs */}
        {testResults.length > 0 && (
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('output')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'output'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Console
              </button>
              {testResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === index
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{result.passed ? '✅' : '❌'}</span>
                    <span>{result.testCase}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Output Display */}
        {activeTab === 'output' && output && (
          <div className="p-4">
            <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg overflow-auto">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        )}

        {/* Individual Test Result */}
        {testResults.length > 0 && typeof activeTab === 'number' && (
          <div className="p-4">
            {(() => {
              const result = testResults[activeTab];
              return (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{result.passed ? '✅' : '❌'}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{result.testCase}</h4>
                      <p className="text-sm text-gray-500">
                        {result.passed ? 'Test passed' : 'Test failed'}
                      </p>
                    </div>
                  </div>

                  {result.input && (
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Input:</h5>
                      <div className="bg-gray-50 p-3 rounded border font-mono text-sm">
                        <pre className="whitespace-pre-wrap">{result.input}</pre>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Expected Output:</h5>
                      <div className="bg-gray-50 p-3 rounded border font-mono text-sm">
                        <pre className="whitespace-pre-wrap">{result.expected}</pre>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Your Output:</h5>
                      <div className={`p-3 rounded border font-mono text-sm ${
                        result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <pre className="whitespace-pre-wrap">{result.actual}</pre>
                      </div>
                    </div>
                  </div>

                  {!result.passed && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Test Failed
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>Your output doesn&apos;t match the expected output. Check for:</p>
                            <ul className="list-disc pl-5 mt-1">
                              <li>Correct logic implementation</li>
                              <li>Proper input handling</li>
                              <li>Exact output format (including spacing and newlines)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Default state when no tests run */}
        {testResults.length === 0 && !output && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-400"
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
              <p className="text-lg font-medium mb-2">Ready to test your code?</p>
              <p className="text-sm text-gray-400 mb-4">
                • Click <span className="font-medium">Run</span> to test against sample cases (first 2 test cases)
              </p>
              <p className="text-sm text-gray-400">
                • Click <span className="font-medium">Evaluate All</span> to run against all test cases and create a submission
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultsPanel;
