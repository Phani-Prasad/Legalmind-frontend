import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { API_BASE } from '../../config';
import { Calendar, Clock, BookOpen, CheckCircle } from 'lucide-react';

const StudyPlanner = () => {
  const [subject, setSubject] = useState('Law of Contracts');
  const [topicCount, setTopicCount] = useState('15');
  const [examDate, setExamDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState('');
  const [error, setError] = useState('');

  const handleGeneratePlan = async () => {
    if (!subject || !topicCount || !examDate) return;
    setLoading(true);
    setError('');
    setPlan('');

    try {
      const response = await axios.post(`${API_BASE}/api/tutor/plan`, {
        subject,
        topic_count: topicCount,
        exam_date: examDate,
        program: "BA LLB" // Default for now
      });
      setPlan(response.data.content);
    } catch (err) {
      setError('Failed to generate study plan. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="study-planner fade-in">
      <div className="planner-header" style={{marginBottom: '30px'}}>
        <h1 className="serif gradient-text">KSLU Study Planner</h1>
        <p className="text-muted">Create a personalized exam-focused study schedule.</p>
      </div>

      <div className="planner-config card glass" style={{maxWidth: '600px', margin: '0 auto 40px'}}>
        <div className="grid-form" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Total Topics</label>
            <input type="number" value={topicCount} onChange={(e) => setTopicCount(e.target.value)} />
          </div>
          <div className="form-group" style={{gridColumn: 'span 2'}}>
            <label>Exam Date</label>
            <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary" style={{width: '100%'}} onClick={handleGeneratePlan} disabled={loading}>
          {loading ? 'Designing your schedule...' : 'Generate Study Plan'}
        </button>
      </div>

      {loading && (
        <div className="loading-state card glass">
          <div className="spinner"></div>
          <p>Calculating daily targets and revision cycles...</p>
        </div>
      )}

      {plan && (
        <div className="plan-result card fade-in">
          <div className="content-header">
            <span className="badge-kslu">Recommended Schedule</span>
            <h2>Your Exam Prep Guide</h2>
          </div>
          <div className="markdown-body">
            <ReactMarkdown>{plan}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;
