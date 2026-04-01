import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { API_BASE } from '../../config';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState('');
  const [error, setError] = useState('');

  const handleGenerateQuiz = async () => {
    if (!topic) return;
    setLoading(true);
    setError('');
    setQuiz('');

    try {
      const response = await axios.post(`${API_BASE}/api/tutor/quiz`, {
        topic,
        program: 'BA LLB', semester: '1st', subject: 'General', unit: 'All' // defaults
      });
      setQuiz(response.data.content);
    } catch (err) {
      setError('Failed to generate quiz. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-generator fade-in">
      <div className="planner-header" style={{marginBottom: '30px'}}>
        <h1 className="serif gradient-text">AI Quiz Master</h1>
        <p className="text-muted">Generate topic-specific MCQ tests to check your KSLU exam readiness.</p>
      </div>

      <div className="card glass" style={{maxWidth: '700px', margin: '0 auto 40px', textAlign: 'center'}}>
        <HelpCircle size={48} color="#d4af37" style={{marginBottom: '20px'}} />
        <div className="form-group" style={{marginBottom: '20px'}}>
          <input 
            type="text" 
            placeholder="Enter topic (e.g. Consideration, Vicarious Liability)..." 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{width: '100%', padding: '12px 20px', borderRadius: '10px', border: '1px solid var(--border)'}}
          />
        </div>
        <button className="btn btn-primary" style={{width: '100%'}} onClick={handleGenerateQuiz} disabled={loading}>
          {loading ? 'Generating specialized questions...' : 'Start New Quiz'}
        </button>
      </div>

      {loading && (
        <div className="loading-state card glass">
          <div className="spinner"></div>
          <p>Analyzing KSLU patterns and creating tricky MCQs...</p>
        </div>
      )}

      {quiz && (
        <div className="quiz-result card fade-in">
          <div className="content-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <span className="badge-kslu">Self-Assessment Test</span>
              <h2>{topic} Quiz</h2>
            </div>
            <button className="btn" onClick={() => setQuiz('')}><RotateCcw size={16} /> Reset</button>
          </div>
          <div className="markdown-body quiz-content">
            <ReactMarkdown>{quiz}</ReactMarkdown>
          </div>
          <div className="quiz-footer" style={{marginTop: '30px', padding: '20px', background: '#f8fafc', borderRadius: '10px'}}>
            <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>
              <strong>Tip:</strong> Legal terminology is key. Make sure you understand the 'Why' behind every correct answer.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
