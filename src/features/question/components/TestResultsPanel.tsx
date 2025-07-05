import React, { useState } from 'react';
import { TestResultsPanelProps } from '@/shared/types';
import { CollapsibleSection } from '@/shared';

const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  testResults,
  output,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-gray-50 border-t border-gray-200 h-full">
      <div className="p-4 h-full overflow-y-auto space-y-4">
        {/* Learning Mode Info */}
        <CollapsibleSection
          title="Learning Mode Info"
          icon="💡"
          defaultExpanded={false}
          className="mb-4"
        >
          <div className="text-sm text-blue-700">
            <p>
              <strong>📝 How it works:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Each test case runs individually</li>
              <li>You&apos;ll see exactly which test case failed and why</li>
              <li>Compare expected vs actual output for each test</li>
            </ul>
          </div>
        </CollapsibleSection>

        {/* Output Section */}
        {output && (
          <CollapsibleSection
            title="Program Output"
            icon="📤"
            defaultExpanded={true}
            className="mb-4"
          >
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto text-gray-800 max-h-32 overflow-y-auto">
              {output}
            </pre>
          </CollapsibleSection>
        )}

        {/* Test Results Section with Tabs */}
        {testResults.length > 0 && (
          <CollapsibleSection
            title={`Test Results (${testResults.filter((r) => r.passed).length}/${testResults.length} passed)`}
            icon="🧪"
            defaultExpanded={true}
          >
            <div className="space-y-3">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-1 border-b border-gray-200">
                {testResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === index
                        ? 'bg-white border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          result.passed ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                      Test {index + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg border border-gray-200">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 ${activeTab === index ? 'block' : 'hidden'}`}
                  >
                    {/* Test Case Header */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {result.testCase}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result.passed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {result.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>

                    {/* Test Case Input (if available) */}
                    {result.input && (
                      <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Input:
                        </label>
                        <pre className="bg-gray-50 p-2 rounded text-xs border overflow-x-auto">
                          {result.input}
                        </pre>
                      </div>
                    )}

                    {/* Expected Output */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Expected Output:
                      </label>
                      <pre className="bg-gray-50 p-2 rounded text-xs border overflow-x-auto">
                        {result.expected}
                      </pre>
                    </div>

                    {/* Actual Output */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Actual Output:
                      </label>
                      <pre
                        className={`p-2 rounded text-xs border overflow-x-auto ${
                          result.passed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        {result.actual}
                      </pre>
                    </div>

                    {/* Error Details for Failed Tests */}
                    {!result.passed && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                        <h4 className="text-xs font-medium text-red-800 mb-2">
                          ❌ Test Failed
                        </h4>
                        <p className="text-xs text-red-700">
                          The output doesn&apos;t match the expected result.
                          Check your logic and try again.
                        </p>
                      </div>
                    )}

                    {/* Success Message for Passed Tests */}
                    {result.passed && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                        <h4 className="text-xs font-medium text-green-800 mb-2">
                          ✅ Test Passed
                        </h4>
                        <p className="text-xs text-green-700">
                          Great job! Your output matches the expected result.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        )}

        {/* Default state when no tests run */}
        {testResults.length === 0 && !output && (
          <div className="text-sm text-gray-500 text-center py-8">
            Click &quot;Run&quot; to execute your code and see test results.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultsPanel;
