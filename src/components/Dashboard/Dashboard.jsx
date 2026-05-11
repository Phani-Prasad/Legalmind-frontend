import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../../config';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Scale, FileText, ChevronRight, GraduationCap, Clock, Pin, Search, Bookmark } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [syllabus, setSyllabus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('1st_Semester');
  const [pinnedSubjects, setPinnedSubjects] = useState(() => {
    const saved = localStorage.getItem('pinnedSubjects');
    return saved ? JSON.parse(saved) : [];
  });
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

  useEffect(() => {
    localStorage.setItem('pinnedSubjects', JSON.stringify(pinnedSubjects));
  }, [pinnedSubjects]);

  const togglePin = (e, subjectKey) => {
    e.stopPropagation();
    setPinnedSubjects(prev => 
      prev.includes(subjectKey) 
        ? prev.filter(s => s !== subjectKey) 
        : [...prev, subjectKey]
    );
  };

  const handleSubjectClick = (subjectKey, semesterKey = selectedSemester) => {
    navigate(`/dashboard/tutor?subject=${subjectKey}&semester=${semesterKey}`);
  };

  const nextJudgment = () => {
    setJudgmentIndex((prev) => (prev + 1) % judgments.length);
  };

  if (loading) return <div className="loading-screen">Loading Legaify Dashboard...</div>;

  const semesters = syllabus?.BA_LLB ? Object.keys(syllabus.BA_LLB) : [];
  const currentSemesterSubjects = syllabus?.BA_LLB?.[selectedSemester] 
    ? Object.keys(syllabus.BA_LLB[selectedSemester]) 
    : [];

  const filteredSubjects = currentSemesterSubjects.filter(subKey => 
    subKey.replace(/_/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedList = pinnedSubjects.filter(s => {
    // Check if pinned subject exists in total syllabus
    for (const sem in syllabus?.BA_LLB) {
      if (syllabus.BA_LLB[sem][s]) return true;
    }
    return false;
  });

  const currentJudgment = judgments[judgmentIndex];

  // Calculate dynamic progress
  const calculateProgress = () => {
    if (!syllabus?.BA_LLB?.[selectedSemester]) return 0;
    
    const completed = JSON.parse(localStorage.getItem('completedTopics') || '[]');
    let totalTopics = 0;
    let completedInSem = 0;

    const subjects = syllabus.BA_LLB[selectedSemester];
    for (const subKey in subjects) {
      const units = subjects[subKey];
      for (const unitKey in units) {
        const topics = units[unitKey].topics || [];
        totalTopics += topics.length;
        topics.forEach(t => {
          if (completed.includes(`${selectedSemester}-${subKey}-${t}`)) {
            completedInSem++;
          }
        });
      }
    }

    return totalTopics > 0 ? Math.round((completedInSem / totalTopics) * 100) : 0;
  };

  const progressPercent = calculateProgress();

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
            <p>Your preparation for the <b>{selectedSemester.replace('_', ' ')}</b> exams is {progressPercent}% complete. Keep going!</p>
            <div className="progress-large">
              <div className="progress-fill" style={{width: `${progressPercent}%`}}></div>
              <span className="progress-label">{progressPercent}% Consumed</span>
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
          <div className="search-box-inline glass">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Quick search subjects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {pinnedList.length > 0 && (
          <div className="pinned-section">
            <h3 className="section-mini-title"><Bookmark size={14} /> Pinned Subjects</h3>
            <div className="subject-grid">
              {pinnedList.map(subKey => {
                // Find which semester this subject belongs to
                let subSemester = selectedSemester;
                for (const sem in syllabus?.BA_LLB) {
                  if (syllabus.BA_LLB[sem][subKey]) {
                    subSemester = sem;
                    break;
                  }
                }

                return (
                  <div key={subKey} className="subject-card-new card pinned hover-lift" onClick={() => handleSubjectClick(subKey, subSemester)}>
                  <div className="subject-icon-box gold">
                    <BookOpen size={20} />
                  </div>
                  <div className="subject-info">
                    <h3 className="subject-title">{subKey.replace(/_/g, ' ')}</h3>
                    <div className="subject-footer">
                      <span className="pinned-label">Active</span>
                      <Pin size={16} className="pin-icon active" onClick={(e) => togglePin(e, subKey)} />
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="semester-tabs-container">
          <div className="semester-tabs">
            {semesters.map(sem => (
              <button 
                key={sem} 
                className={`sem-tab ${selectedSemester === sem ? 'active' : ''}`}
                onClick={() => setSelectedSemester(sem)}
              >
                {sem.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="subject-grid">
          {filteredSubjects.length > 0 ? filteredSubjects.map((subKey) => {
            const isPinned = pinnedSubjects.includes(subKey);
            
            return (
              <div key={subKey} className="subject-card-new card hover-lift" onClick={() => handleSubjectClick(subKey)}>
                <div className="subject-icon-box">
                  <BookOpen size={20} />
                </div>
                <div className="subject-info">
                  <h3 className="subject-title">{subKey.replace(/_/g, ' ')}</h3>
                  <div className="subject-footer">
                    <span>Syllabus Covered</span>
                    <Pin 
                      size={16} 
                      className={`pin-icon ${isPinned ? 'active' : ''}`} 
                      onClick={(e) => togglePin(e, subKey)} 
                    />
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="empty-state">No subjects found for this semester.</div>
          )}
        </div>
      </section>

      <section className="quick-intel-section">
        <div className="section-header">
          <h2 className="serif">Academic Intelligence</h2>
        </div>
        <div className="intel-grid">
          <div className="intel-card card glass" onClick={() => navigate('/dashboard/evaluator')}>
            <div className="intel-icon red"><FileText size={20} /></div>
            <div>
              <h3>Answer Evaluation</h3>
              <p>Get instant KSLU-standard grading on your answers.</p>
            </div>
          </div>
          <div className="intel-card card glass" onClick={() => navigate('/dashboard/videos')}>
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
