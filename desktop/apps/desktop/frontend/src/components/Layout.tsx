import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Code, Trophy, BarChart3, Settings } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Problems', icon: Code },
    { path: '/progress', label: 'Progress', icon: BarChart3 },
  ]

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <Trophy className="logo-icon" />
          <h1>CodeQuest</h1>
        </div>
        
        <div className="nav-items">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}