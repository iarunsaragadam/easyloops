import { useState, useEffect } from 'react'
import { Trophy, Target, Clock, Code } from 'lucide-react'
import { useStore } from '../store/useStore'
import * as api from '../api/api'

interface UserProgress {
  problems_solved: number
  total_submissions: number
  last_solved_at?: string
  language_breakdown: Record<string, number>
}

interface Submission {
  id: string
  problem_id: string
  code: string
  language: string
  verdict: string
  submitted_at: string
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const { solvedProblems } = useStore()

  useEffect(() => {
    loadProgressData()
  }, [])

  const loadProgressData = async () => {
    try {
      const [progressData, submissionsData] = await Promise.all([
        api.getUserProgress(),
        api.getSubmissions()
      ])
      
      setProgress(progressData)
      setSubmissions(submissionsData.slice(0, 10)) // Show latest 10 submissions
    } catch (error) {
      console.error('Failed to load progress data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="progress-container">
        <div className="loading">Loading progress...</div>
      </div>
    )
  }

  const totalProblems = 50 // This would come from the backend
  const solvedCount = progress?.problems_solved || solvedProblems.size
  const progressPercentage = (solvedCount / totalProblems) * 100

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h1>Your Progress</h1>
        <p>Track your coding journey and achievements</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Trophy className="icon trophy" />
          </div>
          <div className="stat-content">
            <h3>Problems Solved</h3>
            <div className="stat-number">{solvedCount}</div>
            <div className="stat-subtitle">out of {totalProblems} problems</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Target className="icon target" />
          </div>
          <div className="stat-content">
            <h3>Success Rate</h3>
            <div className="stat-number">{progressPercentage.toFixed(1)}%</div>
            <div className="stat-subtitle">completion rate</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Code className="icon code" />
          </div>
          <div className="stat-content">
            <h3>Total Submissions</h3>
            <div className="stat-number">{progress?.total_submissions || submissions.length}</div>
            <div className="stat-subtitle">submissions made</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock className="icon clock" />
          </div>
          <div className="stat-content">
            <h3>Last Solved</h3>
            <div className="stat-number">
              {progress?.last_solved_at ? 
                new Date(progress.last_solved_at).toLocaleDateString() : 
                'Never'
              }
            </div>
            <div className="stat-subtitle">most recent solution</div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h2>Overall Progress</h2>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="progress-text">
            {solvedCount} / {totalProblems} problems completed
          </span>
        </div>
      </div>

      {progress?.language_breakdown && Object.keys(progress.language_breakdown).length > 0 && (
        <div className="language-breakdown">
          <h2>Language Breakdown</h2>
          <div className="language-stats">
            {Object.entries(progress.language_breakdown).map(([language, count]) => (
              <div key={language} className="language-stat">
                <div className="language-name">{language}</div>
                <div className="language-count">{count} problems</div>
                <div className="language-bar">
                  <div 
                    className="language-fill"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(progress.language_breakdown))) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="recent-submissions">
          <h2>Recent Submissions</h2>
          <div className="submissions-list">
            {submissions.map(submission => (
              <div key={submission.id} className="submission-item">
                <div className="submission-info">
                  <div className="submission-problem">Problem {submission.problem_id}</div>
                  <div className="submission-language">{submission.language}</div>
                </div>
                <div className="submission-meta">
                  <span className={`verdict ${submission.verdict.toLowerCase()}`}>
                    {submission.verdict}
                  </span>
                  <span className="submission-date">
                    {new Date(submission.submitted_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}