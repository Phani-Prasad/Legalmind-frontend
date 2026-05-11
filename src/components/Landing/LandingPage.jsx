import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Scale, Zap, CheckCircle, ArrowRight, HelpCircle, Play, FileText } from 'lucide-react';
import LegalmindLogo from '../Branding/LegalmindLogo';
import BrandLogo from '../Branding/BrandLogo';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="landing-nav glass">
        <div className="nav-content">
          <div className="landing-logo">
            <BrandLogo size={40} textSize="1.8rem" />
          </div>
          <div className="nav-auth-links">
            <Link to="/login" className="btn btn-ghost">Sign In</Link>
            <Link to="/register" className="btn btn-primary gold-gradient">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-background">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
        </div>
        <div className="hero-content fade-in">
          <div className="badge-kslu-wrapper">
            <span className="badge-kslu">KSLU Student Companion</span>
          </div>
          <h1 className="serif hero-title">
            Master the Law with <span className="gradient-text">Precision.</span>
          </h1>
          <p className="hero-subtitle">
            The AI-powered tutor designed exclusively for KSLU law students. 
            Summarize cases, evaluate answers, and simplify complex legal concepts in seconds.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-hero gold-gradient">
              Start Learning Free <ArrowRight size={20} />
            </Link>
            <a href="#features" className="btn btn-hero-outline">
              Explore Features
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">98%</span>
              <span className="stat-label">Exam Accuracy</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">10k+</span>
              <span className="stat-label">Case Summaries</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">24/7</span>
              <span className="stat-label">AI Mentorship</span>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="serif section-title">
            The <span style={{ color: 'var(--primary)' }}>Leg</span><span style={{ color: 'var(--gold)' }}>ai</span><span style={{ color: 'var(--primary)' }}>fy<sup style={{ fontSize: '0.6em' }}>™</sup></span> Learning Advantage
          </h2>
          <p className="section-subtitle">Comprehensive tools built for the modern law student.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass hover-lift">
            <div className="feature-icon-wrapper">
              <BookOpen className="feature-icon" />
            </div>
            <h3 className="feature-name">Master Teacher</h3>
            <p className="feature-desc">AI-driven explanations for any KSLU syllabus topic, mapped directly to your curriculum.</p>
          </div>

          <div className="feature-card glass hover-lift">
            <div className="feature-icon-wrapper">
              <Scale className="feature-icon" />
            </div>
            <h3 className="feature-name">Judicial Summaries</h3>
            <p className="feature-desc">Get instant, structured summaries of complex case laws with key principles and precedents.</p>
          </div>

          <div className="feature-card glass hover-lift">
            <div className="feature-icon-wrapper">
              <FileText className="feature-icon" />
            </div>
            <h3 className="feature-name">Answer Evaluator</h3>
            <p className="feature-desc">Submit your practice answers and get detailed feedback, grading, and improvement tips.</p>
          </div>

          <div className="feature-card glass hover-lift">
            <div className="feature-icon-wrapper">
              <HelpCircle className="feature-icon" />
            </div>
            <h3 className="feature-name">Exam Quiz</h3>
            <p className="feature-desc">Test your knowledge with AI-generated quizzes based on past KSLU exam patterns.</p>
          </div>

          <div className="feature-card glass hover-lift">
            <div className="feature-icon-wrapper">
              <Shield className="feature-icon" />
            </div>
            <h3 className="feature-name">Document AI</h3>
            <p className="feature-desc">Upload textbooks or notes and chat with them to extract specific legal insights instantly.</p>
          </div>

          <div className="feature-card glass hover-lift">
            <div className="feature-icon-wrapper">
              <Play className="feature-icon" />
            </div>
            <h3 className="feature-name">Video AI</h3>
            <p className="feature-desc">Convert YouTube lectures into structured study notes, highlighting key cases and sections.</p>
          </div>

          <div className="feature-card glass hover-lift">
            <div className="feature-icon-wrapper">
              <Zap className="feature-icon" />
            </div>
            <h3 className="feature-name">Smart Planner</h3>
            <p className="feature-desc">Automatically generate study schedules based on your exam dates and remaining syllabus.</p>
          </div>
        </div>
      </section>

      {/* Syllabus Roadmap Section */}
      <section className="syllabus-roadmap">
        <div className="section-header">
          <h2 className="serif section-title">The KSLU Mastery Roadmap™</h2>
          <p className="section-subtitle">A comprehensive guide through your 3-Year LL.B. journey.</p>
        </div>

        <div className="roadmap-grid">
          {[
            {
              sem: "1st Semester",
              subjects: ["Constitutional Law - I", "Contract - I", "Law of Torts", "Family Law - I (Hindu Law)", "Criminal Law - I (IPC)", "English"]
            },
            {
              sem: "2nd Semester",
              subjects: ["Constitutional Law - II", "Contract - II", "Labour Law - I", "Property Law", "Family Law - II", "Kannada / Kannada Kali"]
            },
            {
              sem: "3rd Semester",
              subjects: ["Jurisprudence", "Labour Law - II", "Law of Taxation", "Criminal Law - II (Cr.P.C)", "Administrative Law"]
            },
            {
              sem: "4th Semester",
              subjects: ["Public International Law", "Human Rights / Insurance Law", "Banking Law / RTI", "Professional Ethics", "ADR Systems"]
            },
            {
              sem: "5th Semester",
              subjects: ["Company Law", "Civil Procedure Code", "IPR - I / Penology", "Interpretation of Statutes", "Drafting & Pleading"]
            },
            {
              sem: "6th Semester",
              subjects: ["Law of Evidence", "Environmental Law", "IPR - II / White Collar Crimes", "Land Law", "Moot Court & Internship"]
            }
          ].map((item, idx) => (
            <div key={idx} className="roadmap-card glass hover-lift">
              <div className="sem-badge">{item.sem}</div>
              <ul className="subject-list">
                {item.subjects.map((sub, sIdx) => (
                  <li key={sIdx}>
                    <CheckCircle size={14} className="check-icon" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card gold-gradient">
          <div className="cta-content">
            <h2 className="serif cta-title">Ready to Ace Your Exams?</h2>
            <p className="cta-subtitle">Join thousands of students using Legaify to simplify their law journey.</p>
            <Link to="/register" className="btn btn-cta">
              Create Your Account Now
            </Link>
          </div>
          <div className="cta-visual">
            <div className="cta-icon-blob">
              <BrandLogo size={60} textSize="2.5rem" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <BrandLogo size={24} textSize="1.1rem" />
            <p style={{ marginTop: '15px' }}>Empowering KSLU students with AI-driven intelligence.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#">Features</a>
              <a href="#">Syllabus</a>
              <a href="#">Case Laws</a>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">Feedback</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Legaify™. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
