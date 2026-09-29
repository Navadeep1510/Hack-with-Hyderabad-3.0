import React from 'react';
import { Brain, Cpu, Database, Flame, Play, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Header({ status, onOpenDemo, activeTab, setActiveTab }) {
  const isHindsightFallback = status?.is_fallback_mode ?? false;

  return (
    <header className="top-header">
      <div className="brand-section">
        <div className="brand-logo-badge">
          <Brain size={22} color="#ffffff" />
        </div>
        <div className="brand-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1>RecallOps AI</h1>
            <span className="badge-tag memory-highlight" style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem' }}>
              HINDSIGHT INSIDE
            </span>
          </div>
          <p>Your AI Incident Response Engineer that never forgets.</p>
        </div>
      </div>

      <div className="header-status-strip">
        {/* AI Agent Status */}
        <div className="status-pill" title={`LLM Model: ${status?.groq_model || 'llama-3.3-70b-versatile'}`}>
          <div className="status-indicator-dot online" />
          <Cpu size={14} color="#94a3b8" />
          <span>AI Agent: <strong style={{ color: '#10b981' }}>Online</strong></span>
        </div>

        {/* Hindsight Status */}
        <div 
          className="status-pill" 
          title={isHindsightFallback ? status?.notice : `Connected to Hindsight Bank: ${status?.bank_id}`}
          style={{ borderColor: isHindsightFallback ? 'rgba(245, 158, 11, 0.3)' : 'rgba(168, 85, 247, 0.4)' }}
        >
          <div className={`status-indicator-dot ${isHindsightFallback ? 'warning' : 'purple'}`} />
          <Database size={14} color={isHindsightFallback ? '#f59e0b' : '#c084fc'} />
          <span>
            Hindsight Memory: <strong style={{ color: isHindsightFallback ? '#f59e0b' : '#c084fc' }}>
              {isHindsightFallback ? 'Fallback Demo Mode' : 'Connected'}
            </strong>
          </span>
        </div>

        {/* Incidents Metric */}
        <div className="status-pill" style={{ display: 'none', mdDisplay: 'flex' }}>
          <Flame size={14} color="#f87171" />
          <span>Incidents Analyzed: <strong style={{ color: '#f8fafc' }}>{status?.incidents_analyzed || 24}</strong></span>
        </div>

        {/* Knowledge Metric */}
        <div className="status-pill" style={{ display: 'none', mdDisplay: 'flex' }}>
          <Sparkles size={14} color="#a855f7" />
          <span>Knowledge Memories: <strong style={{ color: '#d8b4fe' }}>{status?.knowledge_memories || 87}</strong></span>
        </div>

        {/* Guided Demo Button */}
        <button className="demo-trigger-btn" onClick={onOpenDemo} title="Launch 3-minute guided hackathon demo">
          <Play size={14} fill="#ffffff" />
          <span>Run Memory Demo</span>
        </button>
      </div>
    </header>
  );
}
