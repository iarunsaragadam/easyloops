import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { Play, Check, X, Clock, MemoryStick } from 'lucide-react'
import { useStore } from '../store/useStore'
import * as api from '../api/api'

interface Problem {
  id: string
  title: string
  description: string
  difficulty: string
  test_cases: TestCase[]
}

interface TestCase {
  input: string
  expected_output: string
}

interface TestResult {
  passed: boolean
  execution_time_ms: number
  memory_used_mb: number
  stdout: string
  stderr: string
  error?: string
}

interface RunCodeResponse {
  success: boolean
  results: TestResult[]
  error?: string
}

export default function ProblemSolver() {
  const { id } = useParams<{ id: string }>()
  const [problem, setProblem] = useState<Problem | null>(null)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('python')
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const { addSolvedProblem, getCodeForProblem, saveCodeForProblem } = useStore()

  useEffect(() => {
    if (id) {
      loadProblem(id)
      const savedCode = getCodeForProblem(id, language)
      if (savedCode) {
        setCode(savedCode)
      } else {
        setCode(getDefaultCode(language))
      }
    }
  }, [id, language])

  useEffect(() => {
    // Auto-save code every 5 seconds
    const interval = setInterval(() => {
      if (id && code) {
        saveCodeForProblem(id, language, code)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [id, language, code])

  const loadProblem = async (problemId: string) => {
    try {
      const result = await api.getProblem(problemId)
      setProblem(result)
    } catch (error) {
      console.error('Failed to load problem:', error)
    }
  }

  const getDefaultCode = (lang: string) => {
    switch (lang) {
      case 'python':
        return '# Write your solution here\ndef solution():\n    pass\n\n# Test your code\nif __name__ == "__main__":\n    solution()'
      case 'go':
        return 'package main\n\nimport "fmt"\n\n// Write your solution here\nfunc main() {\n    fmt.Println("Hello, World!")\n}'
      default:
        return ''
    }
  }

  const runCode = async () => {
    if (!problem) return

    setIsRunning(true)
    setShowResults(false)

    try {
      const response: RunCodeResponse = await api.runCode({
        code,
        language,
        problem_id: problem.id,
      })

      setResults(response.results)
      setShowResults(true)

      // If all tests passed, mark as solved
      if (response.success) {
        addSolvedProblem(problem.id)
        await api.submitSolution(problem.id, code, language, 'Accepted')
      }
    } catch (error) {
      console.error('Failed to run code:', error)
    } finally {
      setIsRunning(false)
    }
  }

  if (!problem) {
    return (
      <div className="problem-solver-container">
        <div className="loading">Loading problem...</div>
      </div>
    )
  }

  return (
    <div className="problem-solver-container">
      <div className="problem-header">
        <div className="problem-info">
          <h1>{problem.title}</h1>
          <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>
        
        <div className="problem-actions">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-selector"
          >
            <option value="python">Python</option>
            <option value="go">Go</option>
          </select>
          
          <button
            onClick={runCode}
            disabled={isRunning}
            className="run-button"
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="problem-content">
        <div className="problem-description">
          <h2>Description</h2>
          <p>{problem.description}</p>
          
          <h3>Test Cases</h3>
          <div className="test-cases">
            {problem.test_cases.slice(0, 2).map((testCase, index) => (
              <div key={index} className="test-case">
                <div className="test-case-section">
                  <strong>Input:</strong>
                  <pre>{testCase.input || '(no input)'}</pre>
                </div>
                <div className="test-case-section">
                  <strong>Expected Output:</strong>
                  <pre>{testCase.expected_output}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="code-editor">
          <Editor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      {showResults && (
        <div className="results-panel">
          <h3>Test Results</h3>
          <div className="results-summary">
            <span>
              {results.filter(r => r.passed).length} / {results.length} tests passed
            </span>
          </div>
          
          <div className="test-results">
            {results.map((result, index) => (
              <div key={index} className={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                <div className="test-result-header">
                  <div className="test-result-status">
                    {result.passed ? (
                      <Check className="success-icon" size={16} />
                    ) : (
                      <X className="error-icon" size={16} />
                    )}
                    <span>Test Case {index + 1}</span>
                  </div>
                  
                  <div className="test-result-metrics">
                    <span className="metric">
                      <Clock size={14} />
                      {result.execution_time_ms}ms
                    </span>
                    <span className="metric">
                      <MemoryStick size={14} />
                      {result.memory_used_mb.toFixed(1)}MB
                    </span>
                  </div>
                </div>

                {result.stdout && (
                  <div className="test-output">
                    <strong>Output:</strong>
                    <pre>{result.stdout}</pre>
                  </div>
                )}

                {result.stderr && (
                  <div className="test-error">
                    <strong>Error:</strong>
                    <pre>{result.stderr}</pre>
                  </div>
                )}

                {result.error && (
                  <div className="test-error">
                    <strong>Runtime Error:</strong>
                    <pre>{result.error}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}