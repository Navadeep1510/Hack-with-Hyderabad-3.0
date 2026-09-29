import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, CheckCircle2, Server, ArrowRight, Shield, Layers } from 'lucide-react';
import { fetchRunbooks } from '../services/api';

export default function RunbooksPage() {
  const [runbooks, setRunbooks] = useState([]);

  useEffect(() => {
    fetchRunbooks()
      .then(setRunbooks)
      .catch(console.error);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Learned Runbooks
          </h2>
          <span className="badge-tag memory-highlight">
            SYNTHESIZED FROM INCIDENT MEMORY
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Operational remediation playbooks dynamically synthesized and updated as engineers resolve incidents and capture fixes in Hindsight.
        </p>
      </div>

      {/* Runbooks Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {runbooks.map((rb) => (
          <div 
            key={rb.id} 
            className="card-devops"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              border: '1px solid var(--border-subtle)' 
            }}
          >
            <div>
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge-tag service-badge">
                  <Server size={12} />
                  {rb.service}
                </span>
                <span className="badge-tag resolved" style={{ fontSize: '0.68rem' }}>
                  {rb.success_rate} SUCCESS RATE
                </span>
              </div>

              {/* Title & Pattern */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                {rb.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 600, marginBottom: '0.85rem' }}>
                Pattern: {rb.failure_pattern}
              </p>

              {/* Symptoms */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Observed Symptoms
                </span>
                <ul style={{ paddingLeft: '1.15rem', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  {(rb.symptoms || []).map((sym, sIdx) => (
                    <li key={sIdx}>{sym}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Steps */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#86efac', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Verified Remediation Actions
                </span>
                <ol style={{ paddingLeft: '1.15rem', fontSize: '0.8rem', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {(rb.recommended_actions || []).map((act, aIdx) => (
                    <li key={aIdx} style={{ lineHeight: 1.4 }}>{act}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Footer / Provenance */}
            <div style={{ 
              borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
              paddingTop: '0.75rem', 
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontStyle: 'italic' }}>{rb.source}</span>
              <span>Updated: {rb.last_updated}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
