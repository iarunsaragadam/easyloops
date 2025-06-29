import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { API } from '../utils/api';
import { Trophy, Calendar, Code, TrendingUp } from 'lucide-react';

export function ProgressPage() {
  const { userProgress, setUserProgress, submissions, setSubmissions } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const [progress, submissionList] = await Promise.all([
        API.getUserProgress(),
        API.getSubmissions(),
      ]);
      setUserProgress(progress);
      setSubmissions(submissionList);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSuccessRate = () => {
    if (!userProgress || userProgress.total_submissions === 0) return 0;
    return Math.round((userProgress.problems_solved / userProgress.total_submissions) * 100);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div>Loading progress...</div>
      </div>
    );
  }

  if (!userProgress) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div>Failed to load progress data</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="navigation">
        <h1 style={{ margin: 0, color: '#fff' }}>Your Progress</h1>
      </div>

      <div className="progress-stats">
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Trophy size={24} color="#3b82f6" style={{ marginRight: '0.5rem' }} />
            <h3 style={{ margin: 0, color: '#fff' }}>Problems Solved</h3>
          </div>
          <div className="stat-number">{userProgress.problems_solved}</div>
          <div className="stat-label">Total problems completed</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Code size={24} color="#10b981" style={{ marginRight: '0.5rem' }} />
            <h3 style={{ margin: 0, color: '#fff' }}>Total Submissions</h3>
          </div>
          <div className="stat-number">{userProgress.total_submissions}</div>
          <div className="stat-label">Code submissions made</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <TrendingUp size={24} color="#f59e0b" style={{ marginRight: '0.5rem' }} />
            <h3 style={{ margin: 0, color: '#fff' }}>Success Rate</h3>
          </div>
          <div className="stat-number">{getSuccessRate()}%</div>
          <div className="stat-label">Problems solved vs attempts</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Calendar size={24} color="#8b5cf6" style={{ marginRight: '0.5rem' }} />
            <h3 style={{ margin: 0, color: '#fff' }}>Last Solved</h3>
          </div>
          <div className="stat-number" style={{ fontSize: '1.2rem' }}>
            {userProgress.last_solved_at ? formatDate(userProgress.last_solved_at) : 'Never'}
          </div>
          <div className="stat-label">Most recent successful solution</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="stat-card">
          <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Language Breakdown</h3>
          {Object.entries(userProgress.language_breakdown).map(([language, count]) => (
            <div key={language} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ textTransform: 'capitalize' }}>{language}</span>
              <span className="stat-number" style={{ fontSize: '1.2rem' }}>{count}</span>
            </div>
          ))}
          {Object.keys(userProgress.language_breakdown).length === 0 && (
            <div style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>
              No submissions yet
            </div>
          )}
        </div>

        <div className="stat-card">
          <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Recent Activity</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {submissions.slice(0, 10).map((submission) => (
              <div key={submission.id} style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#1e1e1e', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ color: '#fff' }}>{submission.problem_id}</strong>
                  <span 
                    style={{ 
                      color: submission.verdict === 'Accepted' ? '#10b981' : '#ef4444',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}
                  >
                    {submission.verdict}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9ca3af' }}>
                  <span style={{ textTransform: 'capitalize' }}>{submission.language}</span>
                  <span>{formatDate(submission.submitted_at)}</span>
                </div>
              </div>
            ))}
            {submissions.length === 0 && (
              <div style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>
                No submissions yet
              </div>
            )}
          </div>
        </div>
      </div>

      {userProgress.problems_solved > 0 && (
        <div className="stat-card">
          <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Achievement Unlocked! 🎉</h3>
          <div style={{ color: '#9ca3af' }}>
            {userProgress.problems_solved === 1 && "Congratulations on solving your first problem!"}
            {userProgress.problems_solved >= 5 && userProgress.problems_solved < 10 && "You're on a roll! Keep solving problems."}
            {userProgress.problems_solved >= 10 && userProgress.problems_solved < 25 && "Double digits! You're becoming a problem-solving pro."}
            {userProgress.problems_solved >= 25 && "Amazing work! You've solved 25+ problems. You're a coding champion!"}
          </div>
        </div>
      )}
    </div>
  );
}