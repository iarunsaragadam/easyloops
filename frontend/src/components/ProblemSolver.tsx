import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { useStore } from '../store/useStore';
import { API } from '../utils/api';
import { Play, Send, ArrowLeft } from 'lucide-react';

const DEFAULT_CODE = {
  python: `# Write your solution here
def solution():
    pass

if __name__ == "__main__":
    solution()
`,
  go: `package main

import (
    "fmt"
)

func main() {
    // Write your solution here
}
`,
};

export function ProblemSolver() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentProblem,
    setCurrentProblem,
    code,
    setCode,
    language,
    setLanguage,
    results,
    setResults,
    isRunning,
    setIsRunning,
  } = useStore();

  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (id) {
      loadProblem(id);
    }
  }, [id]);

  useEffect(() => {
    // Auto-save code to localStorage
    if (currentProblem && code) {
      localStorage.setItem(`code_${currentProblem.id}_${language}`, code);
    }
  }, [code, currentProblem, language]);

  useEffect(() => {
    // Load saved code from localStorage
    if (currentProblem) {
      const savedCode = localStorage.getItem(`code_${currentProblem.id}_${language}`);
      if (savedCode) {
        setCode(savedCode);
      } else {
        setCode(DEFAULT_CODE[language as keyof typeof DEFAULT_CODE] || '');
      }
    }
  }, [currentProblem, language]);

  const loadProblem = async (problemId: string) => {
    try {
      setLoading(true);
      const problem = await API.getProblem(problemId);
      setCurrentProblem(problem);
      
      // Load saved code or set default
      const savedCode = localStorage.getItem(`code_${problem.id}_${language}`);
      if (savedCode) {
        setCode(savedCode);
      } else {
        setCode(DEFAULT_CODE[language as keyof typeof DEFAULT_CODE] || '');
      }
    } catch (error) {
      console.error('Failed to load problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunCode = async () => {
    if (!currentProblem || !code.trim()) return;

    try {
      setIsRunning(true);
      setShowResults(true);
      
      const response = await API.runCode({
        code,
        language,
        problem_id: currentProblem.id,
      });

      setResults(response.results);
    } catch (error) {
      console.error('Failed to run code:', error);
      setResults([]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentProblem || !code.trim() || results.length === 0) return;

    const allPassed = results.every(result => result.passed);
    const verdict = allPassed ? 'Accepted' : 'Wrong Answer';

    try {
      await API.submitSolution(currentProblem.id, code, language, verdict);
      alert(`Solution submitted! Verdict: ${verdict}`);
    } catch (error) {
      console.error('Failed to submit solution:', error);
      alert('Failed to submit solution');
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Results are no longer valid for the new language
    setResults([]);
    setShowResults(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div>Loading problem...</div>
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div>Problem not found</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft size={16} />
            Back to Problems
          </button>
          <h2 style={{ margin: 0, color: '#fff' }}>{currentProblem.title}</h2>
        </div>

        <div className="action-buttons">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="language-selector"
          >
            <option value="python">Python</option>
            <option value="go">Go</option>
          </select>
          
          <button
            className="btn btn-primary"
            onClick={handleRunCode}
            disabled={isRunning || !code.trim()}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={results.length === 0 || !results.every(r => r.passed)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-panel">
          <div className="code-editor">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: language === 'python' ? 4 : 2,
                insertSpaces: true,
              }}
            />
          </div>

          {showResults && (
            <div className="results-panel">
              <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Test Results</h3>
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>Test Case {index + 1}</strong>
                    <span style={{ color: result.passed ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                      {result.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                    <div>Time: {result.execution_time_ms}ms | Memory: {result.memory_used_mb.toFixed(2)}MB</div>
                    {result.stdout && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <strong>Output:</strong> <code>{result.stdout}</code>
                      </div>
                    )}
                    {result.stderr && (
                      <div style={{ marginTop: '0.5rem', color: '#ef4444' }}>
                        <strong>Error:</strong> <code>{result.stderr}</code>
                      </div>
                    )}
                    {result.error && (
                      <div style={{ marginTop: '0.5rem', color: '#ef4444' }}>
                        <strong>Error:</strong> {result.error}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="problem-panel">
          <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Problem Description</h3>
          <div style={{ lineHeight: '1.6' }}>
            <ReactMarkdown>{currentProblem.description}</ReactMarkdown>
          </div>

          <h4 style={{ margin: '2rem 0 1rem 0', color: '#fff' }}>Test Cases</h4>
          {currentProblem.test_cases.map((testCase, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#2d2d2d', borderRadius: '4px' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Input:</strong>
                <pre style={{ margin: '0.5rem 0', padding: '0.5rem', backgroundColor: '#1e1e1e', borderRadius: '4px', fontSize: '0.9rem' }}>
                  {testCase.input || '(empty)'}
                </pre>
              </div>
              <div>
                <strong>Expected Output:</strong>
                <pre style={{ margin: '0.5rem 0', padding: '0.5rem', backgroundColor: '#1e1e1e', borderRadius: '4px', fontSize: '0.9rem' }}>
                  {testCase.expected_output}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}