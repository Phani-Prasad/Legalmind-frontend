import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { BookOpen, Scale, FileText, Calendar, LayoutDashboard, HelpCircle, Play, Menu, X, LogOut } from 'lucide-react';

import { AuthProvider, useAuth } from './context/AuthContext';

import Tutor from './components/Tutor/Tutor';
import CaseSummarizer from './components/Tutor/CaseSummarizer';
import AnswerEvaluator from './components/Tutor/AnswerEvaluator';
import StudyPlanner from './components/Tutor/StudyPlanner';
import QuizGenerator from './components/Tutor/QuizGenerator';
import DocumentTutor from './components/Tutor/DocumentTutor';
import VideoTutor from './components/Tutor/VideoTutor';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import './App.css';

// ── Protected Route ────────────────────────────────────────────────────────────

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null; // wait for localStorage restore
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

// ── Main App Shell (shown when authenticated) ──────────────────────────────────

function AppShell() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeSidebar = () => setSidebarOpen(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    closeSidebar();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get initials from user name (e.g. "Rahul Sharma" → "RS")
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'LS';

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'sidebar-open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`sidebar glass ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="logo">
          <img src="/legaify_logo.png" alt="Legaify" style={{ width: '100%', maxWidth: '180px', marginBottom: '8px' }} />
          <span className="badge-kslu">KSLU Edition</span>
        </div>

        <nav className="side-nav">
          <Link to="/" className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavClick('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/tutor" className={`nav-item ${activeTab === 'tutor' ? 'active' : ''}`} onClick={() => handleNavClick('tutor')}>
            <BookOpen size={20} /> AI Tutor
          </Link>
          <Link to="/cases" className={`nav-item ${activeTab === 'cases' ? 'active' : ''}`} onClick={() => handleNavClick('cases')}>
            <Scale size={20} /> Case Summarizer
          </Link>
          <Link to="/evaluator" className={`nav-item ${activeTab === 'evaluator' ? 'active' : ''}`} onClick={() => handleNavClick('evaluator')}>
            <FileText size={20} /> Evaluator
          </Link>
          <Link to="/quiz" className={`nav-item ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => handleNavClick('quiz')}>
            <HelpCircle size={20} /> Exam Quiz
          </Link>
          <Link to="/documents" className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => handleNavClick('documents')}>
            <FileText size={20} /> Document AI
          </Link>
          <Link to="/videos" className={`nav-item ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => handleNavClick('videos')}>
            <Play size={20} /> Video AI
          </Link>
          <Link to="/planner" className={`nav-item ${activeTab === 'planner' ? 'active' : ''}`} onClick={() => handleNavClick('planner')}>
            <Calendar size={20} /> Study Planner
          </Link>
        </nav>

        <div className="sidebar-footer">
          {user && (
            <div className="user-info-sidebar">
              <div className="user-avatar-sm">{initials}</div>
              <div className="user-details">
                <span className="user-name-sm">{user.name}</span>
                <span className="user-email-sm">{user.email}</span>
              </div>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="sidebar-status glass" style={{ marginTop: '12px' }}>
          <span className="status-label">KSLU Session 2024-25</span>
          <div className="status-bar">
            <div className="status-fill" style={{ width: '12%' }}></div>
          </div>
          <span className="status-meta">1st Semester | 12% Progress</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="top-header">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(prev => !prev)}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="search-bar">
            <input type="text" placeholder="Search topic or case law..." />
          </div>
          <div className="user-profile" title={user?.name}>
            {initials}
          </div>
        </header>

        <div className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tutor" element={<Tutor />} />
            <Route path="/cases" element={<CaseSummarizer />} />
            <Route path="/evaluator" element={<AnswerEvaluator />} />
            <Route path="/planner" element={<StudyPlanner />} />
            <Route path="/quiz" element={<QuizGenerator />} />
            <Route path="/documents" element={<DocumentTutor />} />
            <Route path="/videos" element={<VideoTutor />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────────

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
