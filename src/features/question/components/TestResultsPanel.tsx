import React from 'react';
import { TestResultsPanelProps } from '@/shared/types';
import { CollapsibleSection } from '@/shared';

const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  testResults,
  output,
}) => {
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

        {/* Test Results Section */}
        {testResults.length > 0 && (
          <CollapsibleSection
            title={`Test Results (${testResults.filter((r) => r.passed).length}/${testResults.length} passed)`}
            icon="🧪"
            defaultExpanded={true}
          >
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded border ${
                    result.passed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {result.testCase}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        result.passed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {result.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  {!result.passed && (
                    <div className="mt-2 text-sm space-y-1">
                      <div>
                        Expected:{' '}
                        <pre className="bg-gray-100 px-1 rounded mt-1 text-xs">
                          {result.expected}
                        </pre>
                      </div>
                      <div>
                        Actual:{' '}
                        <pre className="bg-gray-100 px-1 rounded mt-1 text-xs">
                          {result.actual}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
