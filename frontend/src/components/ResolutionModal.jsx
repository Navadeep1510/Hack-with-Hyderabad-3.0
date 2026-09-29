import React, { useState } from 'react';
import { Brain, CheckCircle2, X, Sparkles, Clock, Check, Loader2, ArrowRight } from 'lucide-react';
import { resolveIncident } from '../services/api';

export default function ResolutionModal({ isOpen, onClose, incidentId, defaultService, defaultRootCause, onResolutionSuccess }) {
  const [rootCause, setRootCause] = useState(defaultRootCause || 'Database connection pool exhaustion');
  const [actualFix, setActualFix] = useState('Increased DB pool size from 50 to 100 in ConfigMap and restarted payment-api deployment.');
  const [resolutionTime, setResolutionTime] = useState(11);
  const [wasHelpful, setWasHelpful] = useState('Yes');
  const [notes, setNotes] = useState('Incident verified resolved. Checkout error rate returned to 0.01%.');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedLearning, setCompletedLearning] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        incident_id: incidentId || 'INC-2026-024',
        root_cause: rootCause,
        actual_fix: actualFix,
        resolution_time_minutes: parseInt(resolutionTime, 10),
        was_ai_helpful: wasHelpful,
        additional_notes: notes
      };

      const result = await resolveIncident(payload);
      setCompletedLearning(result);
      if (onResolutionSuccess) {
        onResolutionSuccess(result);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to record resolution');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              width: 32, 
              height: 32, 
              borderRadius: 8, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <CheckCircle2 size={18} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                {completedLearning ? '🧠 Memory Updated' : 'Mark Resolution & Retain in Hindsight'}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Incident #{incidentId || 'INC-2026-024'} • {defaultService || 'payment-api'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* If learning completed, show success feedback */}
        {completedLearning ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)', 
              border: '1px solid rgba(168, 85, 247, 0.4)', 
              borderRadius: '10px', 
              padding: '1.25rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#c084fc', fontWeight: 700, fontSize: '0.95rem' }}>
                <Brain size={18} />
                <span>RecallOps learned from this incident!</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '1rem' }}>
                The resolution has been retained in Hindsight memory. When future incidents occur with similar symptoms, 
                RecallOps will automatically recommend this verified fix.
              </p>

              {/* What was learned breakdown */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.35)', 
                borderRadius: '8px', 
                padding: '0.85rem 1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
                fontSize: '0.78rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Service:</span>
                  <strong style={{ color: '#f8fafc' }}>{completedLearning.service}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Failure Pattern:</span>
                  <strong style={{ color: '#f8fafc' }}>HTTP 503 / Pool Exhaustion</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Root Cause:</span>
                  <strong style={{ color: '#fca5a5' }}>{completedLearning.root_cause}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Successful Fix:</span>
                  <strong style={{ color: '#86efac' }}>{completedLearning.successful_fix}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Resolution Time:</span>
                  <strong style={{ color: '#38bdf8' }}>{completedLearning.resolution_time_minutes} minutes</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Hindsight Status:</span>
                  <strong style={{ color: '#c084fc' }}>
                    {completedLearning.hindsight_stored ? 'Persisted to Memory Bank' : 'Retained in Session'}
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn-primary" onClick={onClose} style={{ padding: '0.65rem 1.4rem' }}>
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          /* Resolution Form */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {errorMsg && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', padding: '0.65rem', color: '#fca5a5', fontSize: '0.8rem' }}>
                {errorMsg}
              </div>
            )}

            <div>
              <label className="form-label">Confirmed Root Cause *</label>
              <input 
                type="text" 
                className="form-input"
                value={rootCause}
                onChange={(e) => setRootCause(e.target.value)}
                required
                placeholder="e.g. Database connection pool exhaustion"
              />
            </div>

            <div>
              <label className="form-label">Actual Fix Applied *</label>
              <textarea 
                className="form-textarea"
                style={{ minHeight: '80px', fontSize: '0.82rem' }}
                value={actualFix}
                onChange={(e) => setActualFix(e.target.value)}
                required
                placeholder="e.g. Increased DB pool size from 50 to 100 in ConfigMap and restarted deployment."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Resolution Time (Minutes) *</label>
                <input 
                  type="number" 
                  className="form-input"
                  min="1"
                  max="1440"
                  value={resolutionTime}
                  onChange={(e) => setResolutionTime(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Was AI Recommendation Helpful?</label>
                <select 
                  className="form-select"
                  value={wasHelpful}
                  onChange={(e) => setWasHelpful(e.target.value)}
                >
                  <option value="Yes">Yes — Exactly matched previous fix</option>
                  <option value="Partially">Partially — Helped with initial triage</option>
                  <option value="No">No — New failure pattern</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Additional SRE Post-Mortem Notes</label>
              <textarea 
                className="form-textarea"
                style={{ minHeight: '65px', fontSize: '0.82rem' }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific architectural lessons, runbook pointers, or follow-up action items..."
              />
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '0.75rem', 
              borderTop: '1px solid var(--border-subtle)', 
              paddingTop: '1rem',
              marginTop: '0.5rem'
            }}>
              <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn-success" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving to Hindsight...</span>
                  </>
                ) : (
                  <>
                    <Brain size={16} />
                    <span>Save Learning to Memory</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
