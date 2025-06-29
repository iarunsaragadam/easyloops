import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Clock, CheckCircle } from 'lucide-react'
import { useStore } from '../store/useStore'
import * as api from '../api/api'

interface Problem {
  id: string
  title: string
  description: string
  difficulty: string
}

export default function ProblemList() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const { solvedProblems } = useStore()

  useEffect(() => {
    loadProblems()
  }, [])

  const loadProblems = async () => {
    try {
      const result = await api.loadProblems()
      setProblems(result)
    } catch (error) {
      console.error('Failed to load problems:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  const difficulties = ['all', 'Easy', 'Medium', 'Hard']

  if (loading) {
    return (
      <div className="problem-list-container">
        <div className="loading">Loading problems...</div>
      </div>
    )
  }

  return (
    <div className="problem-list-container">
      <div className="problem-list-header">
        <h1>Programming Problems</h1>
        <p>Choose a problem to solve and test your coding skills!</p>
      </div>

      <div className="problem-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="difficulty-filter">
          <Filter size={20} />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="problems-grid">
        {filteredProblems.map(problem => {
          const isSolved = solvedProblems.has(problem.id)
          return (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="problem-card"
            >
              <div className="problem-card-header">
                <h3>{problem.title}</h3>
                <div className="problem-status">
                  {isSolved ? (
                    <CheckCircle className="solved-icon" size={20} />
                  ) : (
                    <Clock className="unsolved-icon" size={20} />
                  )}
                </div>
              </div>
              
              <p className="problem-description">
                {problem.description.length > 150 
                  ? `${problem.description.substring(0, 150)}...`
                  : problem.description
                }
              </p>
              
              <div className="problem-meta">
                <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
                <span className="status">
                  {isSolved ? 'Solved' : 'Not Solved'}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {filteredProblems.length === 0 && (
        <div className="no-problems">
          <p>No problems found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}