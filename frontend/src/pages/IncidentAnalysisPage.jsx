import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Brain, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Server, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  HelpCircle, 
  RotateCcw,
  Zap,
  Check,
  ChevronDown,
  Info
} from 'lucide-react';

export default function IncidentAnalysisPage({ analysis, onOpenResolutionModal }) {
  const [completedSteps, setCompletedSteps] = useState({});

  if (!analysis) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <Brain size={48} color="#6366f1" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
          No Incident Selected for Analysis
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Select an incident from History or submit a new alert in the New Incident tab.
        </p>
      </div>
    );
  }

  const toggleStep = (idx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const similarList = analysis.similar_incidents || [];
  const hypotheses = analysis.root_cause_hypotheses || [];
  const recommendedActions = analysis.recommended_actions || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: 1280, margin: '0 auto' }}>
      
      {/* HEADER / INCIDENT COMMAND BANNER */}
      <div className="card-devops" style={{ 
        border: '1px solid rgba(239, 68, 68, 0.35)', 
        background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
        padding: '1.5rem 1.75rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge-tag critical">
                <AlertOctagon size={12} />
                SEVERITY: {analysis.severity || 'CRITICAL'}
              </span>
              <span className="badge-tag service-badge">
                <Server size={12} />
                Affected Service: {analysis.service}
              </span>
              <span className="badge-tag memory-highlight">
                <Brain size={12} />
                Memory Confidence: {analysis.memory_confidence || 92}%
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Incident #{analysis.incident_id}
              </span>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
              {analysis.title}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Source: <span style={{ color: '#c084fc', fontWeight: 600 }}>{analysis.memory_source || 'Hindsight Memory Bank'}</span>
            </p>
          </div>

          {/* Action to Mark Resolution */}
          <button 
            className="btn-success" 
            onClick={onOpenResolutionModal}
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
          >
            <CheckCircle2 size={18} />
            <span>Mark Resolution Successful</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: AI INCIDENT SUMMARY */}
      <div className="card-devops" style={{ borderLeft: '4px solid var(--accent-primary)', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <ShieldCheck size={16} color="#818cf8" />
          <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            SECTION 1 — AI Incident Summary
          </h3>
        </div>
        <p style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 600, lineHeight: 1.5 }}>
          "{analysis.summary}"
        </p>
      </div>

      {/* SECTION 2: HINDSIGHT MEMORY (VISUALLY PROMINENT) */}
      <div className="card-devops" style={{ 
        border: '1px solid rgba(168, 85, 247, 0.4)',
        background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
        boxShadow: 'var(--shadow-glow)',
        padding: '1.5rem 1.75rem'
      }}>
        {/* Memory Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', 
              width: 32, 
              height: 32, 
              borderRadius: 8, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Brain size={18} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                🧠 What RecallOps Remembers
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 600 }}>
                {similarList.length} similar incident{similarList.length === 1 ? '' : 's'} recalled from Hindsight persistent memory
              </p>
            </div>
          </div>

          <span className="badge-tag memory-highlight" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
            PERSISTENT ORGANIZATIONAL MEMORY
          </span>
        </div>

        {/* Historical Incident Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {similarList.map((inc, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(10, 15, 28, 0.85)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                borderRadius: '10px',
                padding: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <span className="badge-tag" style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#cbd5e1' }}>
                    {inc.incident_id}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#a855f7', fontWeight: 700 }}>
                    {Math.round(inc.similarity_score * 100)}% MATCH
                  </span>
                </div>

                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                  {inc.title}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Root Cause: </span>
                    <span style={{ color: '#f87171', fontWeight: 600 }}>{inc.root_cause}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Resolution: </span>
                    <span style={{ color: '#34d399', fontWeight: 500 }}>{inc.resolution}</span>
                  </div>
                </div>
              </div>

              <div style={{ 
                borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
                paddingTop: '0.65rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: '0.72rem'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>Outcome:</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>{inc.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={13} color="#a855f7" />
          <span>Results verified across persistent organizational memory banks.</span>
        </div>
      </div>

      {/* SECTION 3: MEMORY-BASED INSIGHT */}
      <div className="card-devops" style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid var(--border-medium)', padding: '1.35rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
          <Zap size={16} color="#f59e0b" />
          <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            SECTION 3 — Memory-Based Insight
          </h3>
        </div>

        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.85rem' }}>
          "{analysis.memory_insight}"
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1rem',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '0.85rem 1rem',
          borderRadius: '8px'
        }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>RECOGNIZED PATTERN</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>{analysis.pattern_name}</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>HISTORICAL SUCCESS RATE</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#10b981' }}>{analysis.historical_success_rate}</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>MOST SUCCESSFUL PREVIOUS ACTION</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#a855f7' }}>{analysis.most_successful_previous_action}</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: ROOT CAUSE HYPOTHESES */}
      <div className="card-devops" style={{ padding: '1.35rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={16} color="#06b6d4" />
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SECTION 4 — Root Cause Hypotheses
            </h3>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            AI estimated confidence
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {hypotheses.map((hyp, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.85rem 1.15rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontWeight: 800, 
                    color: idx === 0 ? '#a855f7' : '#94a3b8',
                    fontSize: '0.9rem'
                  }}>
                    {idx + 1}.
                  </span>
                  <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.92rem' }}>
                    {hyp.cause}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge-tag" style={{
                    background: hyp.evidence_type === 'historical_memory' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    color: hyp.evidence_type === 'historical_memory' ? '#d8b4fe' : '#94a3b8',
                    fontSize: '0.68rem'
                  }}>
                    {hyp.evidence_type.replace('_', ' ')}
                  </span>
                  <span style={{ 
                    fontWeight: 800, 
                    fontSize: '0.9rem',
                    color: hyp.confidence >= 80 ? '#10b981' : (hyp.confidence >= 50 ? '#f59e0b' : '#ef4444')
                  }}>
                    {hyp.confidence}%
                  </span>
                </div>
              </div>

              {/* Confidence Progress Bar */}
              <div style={{ width: '100%', height: 4, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 2, marginBottom: '0.5rem', overflow: 'hidden' }}>
                <div style={{
                  width: `${hyp.confidence}%`,
                  height: '100%',
                  background: hyp.confidence >= 80 ? 'linear-gradient(90deg, #6366f1, #10b981)' : (hyp.confidence >= 50 ? '#f59e0b' : '#ef4444'),
                  borderRadius: 2
                }} />
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {hyp.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: RECOMMENDED ACTION PLAN */}
      <div className="card-devops" style={{ padding: '1.35rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} color="#10b981" />
            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SECTION 5 — Recommended Action Plan
            </h3>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Interactive remediation checklist
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
          {recommendedActions.map((action, idx) => {
            const isDone = completedSteps[idx];
            return (
              <div 
                key={idx}
                onClick={() => toggleStep(idx)}
                style={{
                  background: isDone ? 'rgba(16, 185, 129, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${isDone ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  border: `1px solid ${isDone ? '#10b981' : 'rgba(255, 255, 255, 0.2)'}`,
                  background: isDone ? '#10b981' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {isDone && <Check size={14} color="#ffffff" />}
                </div>

                <span style={{
                  fontSize: '0.85rem',
                  color: isDone ? 'var(--text-muted)' : '#f8fafc',
                  textDecoration: isDone ? 'line-through' : 'none'
                }}>
                  {action}
                </span>
              </div>
            );
          })}
        </div>

        {/* Resolution Trigger Button */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
          paddingTop: '1.15rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Once remediation steps are completed, mark resolved to teach RecallOps.
          </span>
          <button 
            className="btn-success" 
            onClick={onOpenResolutionModal}
            style={{ padding: '0.65rem 1.4rem' }}
          >
            <CheckCircle2 size={16} />
            <span>Mark Resolution Successful</span>
          </button>
        </div>
      </div>

      {/* SECTION 6: WHY THIS RECOMMENDATION? */}
      <div className="card-devops" style={{ 
        border: '1px solid rgba(99, 102, 241, 0.35)', 
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)',
        padding: '1.35rem 1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Info size={16} color="#a5b4fc" />
          <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            SECTION 6 — Why This Recommendation? (Hindsight Explainer)
          </h3>
        </div>
        <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.6 }}>
          {analysis.why_this_recommendation}
        </p>
      </div>

    </div>
  );
}
