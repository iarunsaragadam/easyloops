import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, Problem } from '../store/useStore';
import { API } from '../utils/api';
import { Search, Filter } from 'lucide-react';

export function ProblemList() {
  const navigate = useNavigate();
  const { problems, setProblems } = useStore();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  useEffect(() => {
    loadProblems();
  }, []);

  const loadProblems = async () => {
    try {
      setLoading(true);
      const problemList = await API.loadProblems();
      setProblems(problemList);
    } catch (error) {
      console.error('Failed to load problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || 
                             problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  const handleProblemClick = (problem: Problem) => {
    navigate(`/problem/${problem.id}`);
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div>Loading problems...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="navigation">
        <h1 style={{ margin: 0, color: '#fff' }}>Programming Problems</h1>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', padding: '0 1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#2d2d2d',
              color: '#fff',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="#9ca3af" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="language-selector"
            style={{ minWidth: '120px' }}
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="problem-list">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            className="problem-card"
            onClick={() => handleProblemClick(problem)}
          >
            <div className="problem-title">{problem.title}</div>
            <div style={{ marginBottom: '1rem' }}>
              <span className={`problem-difficulty ${getDifficultyClass(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.4' }}>
              {problem.description.length > 150 
                ? problem.description.substring(0, 150) + '...'
                : problem.description
              }
            </div>
            <div style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.8rem' }}>
              {problem.test_cases.length} test case{problem.test_cases.length !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>

      {filteredProblems.length === 0 && !loading && (
        <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '4rem' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No problems found</div>
          <div>Try adjusting your search or filter criteria</div>
        </div>
      )}
    </div>
  );
}