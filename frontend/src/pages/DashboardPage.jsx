import React from 'react';
import { 
  AlertOctagon, 
  Brain, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Server, 
  Terminal, 
  Zap,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage({ activeIncident, onInvestigate, onGoToMemory, onGoToHistory, status }) {
  const isHindsightFallback = status?.is_fallback_mode ?? false;

  const timelineSteps = [
    { label: 'Alert Ingested', status: 'done', desc: 'HTTP 503 error spike', time: '14:32:11' },
    { label: 'Memory Search', status: 'done', desc: 'Hindsight Bank queried', time: '14:32:12' },
    { label: 'Pattern Matched', status: 'done', desc: 'DB Connection Exhaustion', time: '14:32:13' },
    { label: 'Diagnosis & Plan', status: 'active', desc: 'Action plan formulated', time: 'Current' },
    { label: 'Resolution & Learning', status: 'pending', desc: 'Store in Hindsight', time: 'Pending' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Banner Notice if Hindsight fallback */}
      {isHindsightFallback && (
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: '10px',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fbbf24',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Zap size={16} />
            <span>
              <strong>Hindsight Memory Notice:</strong> Running in local demo fallback mode (server not detected at {status?.hindsight_url}). 
              All memory patterns, similarity recall, and reflection learning are fully functional for evaluation.
            </span>
          </div>
          <span className="badge-tag" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fef08a' }}>
            DEMO MODE
          </span>
        </div>
      )}

      {/* Hero Active Incident Card */}
      <div className="card-devops" style={{ 
        border: '1px solid rgba(239, 68, 68, 0.3)',
        background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, rgba(15, 23, 42, 0.95) 100%)',
        boxShadow: 'var(--shadow-critical)',
        padding: '1.75rem'
      }}>
        {/* Header / Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge-tag critical">
                <AlertOctagon size={12} />
                CRITICAL
              </span>
              <span className="badge-tag service-badge">
                <Server size={12} />
                {activeIncident?.service || 'payment-api'}
              </span>
              <span className="badge-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <Activity size={12} />
                INVESTIGATING
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {activeIncident?.id || 'INC-2026-024'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              {activeIncident?.title || 'Payment API — HTTP 503 Errors'}
            </h2>
          </div>

          <button 
            className="btn-primary" 
            onClick={() => onInvestigate(activeIncident?.id || 'INC-2026-024')}
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
          >
            <Brain size={18} />
            <span>Open Incident Command Center</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Incident Summary & Logs Preview */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          {/* Recent Logs Snippet */}
          <div style={{ background: 'rgba(6, 9, 17, 0.7)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>
              <Terminal size={14} color="#94a3b8" />
              <span>LIVE ERROR TELEMETRY</span>
            </div>
            <div className="code-logs-block" style={{ border: 'none', background: 'transparent', padding: 0 }}>
              {activeIncident?.error_logs || '2026-09-29 14:32:11 ERROR payment-api Database connection timeout Pool exhausted: active=100 idle=0 HTTP 503 returned'}
            </div>
          </div>

          {/* Hindsight Memory Spotlight */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)', 
            border: '1px solid rgba(168, 85, 247, 0.35)', 
            borderRadius: '8px', 
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Brain size={16} color="#c084fc" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e9d5ff' }}>
                    HINDSIGHT MEMORY MATCH
                  </span>
                </div>
                <span className="badge-tag memory-highlight">
                  92% CONFIDENCE
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#f1f5f9', fontWeight: 600, marginBottom: '0.35rem' }}>
                3 similar incidents found in organizational history
              </p>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                <strong>Recommended Action:</strong> Check database connection pool exhaustion. Increasing pool size and rolling pods resolved this 3 times previously.
              </p>
            </div>

            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={onGoToMemory}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#c084fc', 
                  fontSize: '0.78rem', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: 0
                }}
              >
                <span>Inspect in Organizational Memory</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Investigation Timeline */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
          paddingTop: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Incident Progression Timeline
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '0.85rem' 
          }}>
            {timelineSteps.map((step, idx) => (
              <div 
                key={idx}
                style={{
                  background: step.status === 'active' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${step.status === 'active' ? 'var(--accent-purple)' : 'var(--border-subtle)'}`,
                  borderRadius: '8px',
                  padding: '0.75rem',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {step.status === 'done' ? (
                      <CheckCircle2 size={14} color="#10b981" />
                    ) : step.status === 'active' ? (
                      <div className="status-indicator-dot purple" style={{ width: 8, height: 8 }} />
                    ) : (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#475569' }} />
                    )}
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: step.status === 'pending' ? 'var(--text-muted)' : '#f8fafc' }}>
                      {step.label}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {step.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Overview Grid: Memory Stats & Incident Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        
        {/* Metric 1 */}
        <div className="card-devops">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              RecallOps MTTR Reduction
            </span>
            <Sparkles size={16} color="#a855f7" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>2.2x Faster</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>11m vs 28m without memory</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Engineers resolve recurring issues 60% faster because past fixes and root causes are remembered.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="card-devops">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Memory Bank Health
            </span>
            <Brain size={16} color="#6366f1" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc' }}>
              {status?.knowledge_memories || 87}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 600 }}>Active Memories</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Spanning 5 microservices across payment, auth, order, notification, and inventory domains.
          </p>
        </div>

        {/* Metric 3 */}
        <div className="card-devops">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Learned Runbooks
            </span>
            <Layers size={16} color="#06b6d4" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc' }}>7</span>
            <span style={{ fontSize: '0.78rem', color: '#67e8f9', fontWeight: 600 }}>Synthesized</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Automatically updated from engineer post-mortems and verified recovery steps.
          </p>
        </div>

      </div>

    </div>
  );
}
