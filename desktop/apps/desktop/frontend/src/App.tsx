import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProblemList from './components/ProblemList'
import ProblemSolver from './components/ProblemSolver'
import ProgressPage from './components/ProgressPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemSolver />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
