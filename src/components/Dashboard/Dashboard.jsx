import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../../config';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Scale, FileText, ChevronRight, GraduationCap, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [syllabus, setSyllabus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All Subjects');
  const [judgmentIndex, setJudgmentIndex] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dynamic Greeting based on time
  const hour = new Date().getHours();
  const greetingTime = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const firstName = user?.name ? user.name.split(' ')[0] : 'Counselor';

  // Category Mapping for KSLU 1st Semester
  const categoryMap = {
    'Law_of_Torts': 'Civil',
    'Law_of_Contracts': 'Civil',
    'Constitutional_Law': 'Constitutional',
    'Criminal_Law_BNS': 'Criminal'
  };

  // Landmark Judgments Data
  const judgments = [
    {
      title: "Kesavananda Bharati v. State of Kerala (1973)",
      issue: "Amendment of the Constitution",
      ratio: "Parliament cannot alter the 'Basic Structure' of the Constitution."
    },
    {
      title: "Maneka Gandhi v. Union of India (1978)",
      issue: "Personal Liberty under Art. 21",
      ratio: "Procedure established by law must be 'just, fair and reasonable' (Due Process)."
    },
    {
      title: "Vishaka v. State of Rajasthan (1997)",
      issue: "Sexual Harassment at Workplace",
      ratio: "Judicial guidelines in absence of legislation to protect rights of women."
    },
    {
      title: "K.S. Puttaswamy v. Union of India (2017)",
      issue: "Right to Privacy",
      ratio: "Privacy is a fundamental right under Articles 14, 19, and 21."
    }
  ];

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/tutor/syllabus`);
        setSyllabus(response.data);
      } catch (err) {
        console.error("Failed to fetch syllabus", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, []);

  const handleSubjectClick = (subjectKey) => {
    navigate(`/tutor?subject=${subjectKey}`);
  };

  const nextJudgment = () => {
    setJudgmentIndex((prev) => (prev + 1) % judgments.length);
  };

  if (loading) return <div className="loading-screen">Loading Legaify Dashboard...</div>;

  // Robust Dynamic Extraction
  let subjects = [];
  let semesterData = null;

  if (syllabus) {
    try {
      if (syllabus['BA_LLB'] && syllabus['BA_LLB']['1st_Semester']) {
        semesterData = syllabus['BA_LLB']['1st_Semester'];
      } else {
        const firstProgramKey = Object.keys(syllabus)[0];
        if (firstProgramKey && syllabus[firstProgramKey]) {
          const firstSemesterKey = Object.keys(syllabus[firstProgramKey])[0];
          if (firstSemesterKey) {
            semesterData = syllabus[firstProgramKey][firstSemesterKey];
          }
        }
      }
      if (semesterData) subjects = Object.keys(semesterData);
    } catch (err) {
      console.error("Syllabus parsing error:", err);
    }
  }

  // Final Fallback
  if (subjects.length === 0 && !loading) {
    subjects = ['Law_of_Torts', 'Law_of_Contracts', 'Constitutional_Law', 'Criminal_Law_BNS'];
    semesterData = {
      'Law_of_Torts': { Unit_I: {} },
      'Law_of_Contracts': { Unit_I: {} },
      'Constitutional_Law': { Unit_I: {} },
      'Criminal_Law_BNS': { Unit_I: {} }
    };
  }

  const filteredSubjects = subjects.filter(subKey => {
    if (!filter || filter === 'All Subjects') return true;
    const subjectCategory = categoryMap[subKey] || 'Civil';
    return subjectCategory === filter;
  });

  const currentJudgment = judgments[judgmentIndex];

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="serif">{greetingTime}, {firstName}</h1>
          <p className="text-muted">Let’s continue where you left off</p>
        </div>
        <div className="date-badge glass">
          <Clock size={16} />
          {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="dashboard-top-grid">
        <div className="welcome-banner glass">
          <div className="banner-text">
            <h2 className="serif">Syllabus Progress</h2>
            <p>Your preparation for the upcoming semester exams is 45% complete. Focus on <b>Constitutional Law</b> today.</p>
            <div className="progress-large">
              <div className="progress-fill" style={{width: '45%'}}></div>
              <span className="progress-label">45% Consumed</span>
            </div>
          </div>
        </div>

        <div className="judgment-card card gold-gradient shadow-sm" onClick={nextJudgment} style={{cursor: 'pointer'}}>
          <div className="maxim-header">
            <Scale size={18} />
            <span>Landmark Judgment Library</span>
          </div>
          <h3 className="serif judgment-title">{currentJudgment.title}</h3>
          <div className="judgment-body">
            <p className="judgment-issue"><b>Issue:</b> {currentJudgment.issue}</p>
            <p className="judgment-ratio"><b>Ratio:</b> {currentJudgment.ratio}</p>
          </div>
          <div className="next-tip">Tap card for next case →</div>
        </div>
      </div>

      <section className="syllabus-explorer-section">
        <div className="section-header">
          <h2 className="serif">Syllabus Compass</h2>
          <div className="filter-pills">
            {['All Subjects', 'Civil', 'Criminal', 'Constitutional'].map(f => (
              <span 
                key={f}
                className={`pill ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="subject-grid">
          {filteredSubjects.length > 0 ? filteredSubjects.map((subKey) => {
            const subjectData = semesterData[subKey];
            if (!subjectData) return null;
            const unitCount = Object.keys(subjectData).length;
            
            return (
              <div key={subKey} className="subject-card-new card hover-lift" onClick={() => handleSubjectClick(subKey)}>
                <div className="subject-icon-box">
                  <BookOpen size={20} />
                </div>
                <div className="subject-info">
                  <h3 className="subject-title">{subKey.replace(/_/g, ' ')}</h3>
                  <div className="subject-footer">
                    <span>{unitCount} Units</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="empty-state">No subjects found in this category.</div>
          )}
        </div>
      </section>

      <section className="quick-intel-section">
        <div className="section-header">
          <h2 className="serif">Academic Intelligence</h2>
        </div>
        <div className="intel-grid">
          <div className="intel-card card glass" onClick={() => navigate('/evaluator')}>
            <div className="intel-icon red"><FileText size={20} /></div>
            <div>
              <h3>Answer Evaluation</h3>
              <p>Get instant KSLU-standard grading on your answers.</p>
            </div>
          </div>
          <div className="intel-card card glass" onClick={() => navigate('/videos')}>
            <div className="intel-icon blue"><GraduationCap size={20} /></div>
            <div>
              <h3>Lecture Analysis</h3>
              <p>Transcribe and summarize legal lectures from YouTube.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
