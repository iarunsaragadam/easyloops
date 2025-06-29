import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Code, BarChart3, Home } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav className="sidebar">
        <div className="logo">
          <Code size={24} style={{ marginRight: '0.5rem' }} />
          CodeQuest
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}
          >
            <Home size={18} style={{ marginRight: '0.5rem' }} />
            Problems
          </Link>
          
          <Link 
            to="/progress" 
            className={`nav-link ${location.pathname === '/progress' ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <BarChart3 size={18} style={{ marginRight: '0.5rem' }} />
            Progress
          </Link>
        </div>
      </nav>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}