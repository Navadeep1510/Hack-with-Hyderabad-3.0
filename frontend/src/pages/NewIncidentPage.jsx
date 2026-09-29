import React, { useState } from 'react';
import { Brain, Sparkles, Send, Terminal, AlertTriangle, Layers, CheckCircle2, Loader2 } from 'lucide-react';
import { investigateIncident } from '../services/api';

const SAMPLE_TEMPLATES = [
  {
    name: 'Payment API 503 (DB Pool Exhaustion)',
    title: 'Payment API returning HTTP 503',
    service: 'payment-api',
    severity: 'CRITICAL',
    environment: 'Production',
    error_logs: '2026-09-29 14:32:11 ERROR payment-api\nDatabase connection timeout\nPool exhausted: active=100 idle=0\nHTTP 503 returned',
    additional_context: 'Checkout conversion drop-off alert triggered in primary region.'
  },
  {
    name: 'Auth Service 504 (Redis Connection Exhaustion)',
    title: 'Universal Login 504 Gateway Timeouts',
    service: 'auth-service',
    severity: 'CRITICAL',
    environment: 'Production',
    error_logs: 'redis.exceptions.ConnectionError: Too many connections / maxclients limit reached (10000).\nHTTP 504 Gateway Timeout on /oauth/token',
    additional_context: 'Sudden spike in automated token verification requests.'
  },
  {
    name: 'Order Service (Database Query Latency)',
    title: 'Slow order creation and elevated 504 rates',
    service: 'order-service',
    severity: 'HIGH',
    environment: 'Production',
    error_logs: 'Slow query detected: SELECT * FROM orders WHERE user_id = $1 AND status = \'PENDING\' execution_time=4820ms\nTimeout waiting for response from order-service',
    additional_context: 'High concurrency during flash promotion.'
  },
  {
    name: 'Notification Service (Kafka Backlog)',
    title: 'Delayed transactional emails and SMS alerts',
    service: 'notification-service',
    severity: 'HIGH',
    environment: 'Production',
    error_logs: 'Lag on notification-events partition 2 reached 84,200 messages. Processing rate: 12 msg/sec.\nDownstream SMS provider rate-limit backpressure.',
    additional_context: 'Queue processing delay exceeding 8 minutes.'
  }
];

export default function NewIncidentPage({ onIncidentInvestigated }) {
  const [formData, setFormData] = useState({
    title: 'Payment API returning HTTP 503',
    service: 'payment-api',
    severity: 'CRITICAL',
    environment: 'Production',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    error_logs: '2026-09-29 14:32:11 ERROR payment-api\nDatabase connection timeout\nPool exhausted: active=100 idle=0\nHTTP 503 returned',
    additional_context: 'Checkout drop-off rate spiked to 84% in US-East region.'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [investigationStep, setInvestigationStep] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const applyTemplate = (tmpl) => {
    setFormData({
      ...tmpl,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });
    setErrorMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      setInvestigationStep('1. Ingesting error logs & telemetry...');
      await new Promise(r => setTimeout(r, 400));

      setInvestigationStep('2. Querying Hindsight Memory Bank (recallops-org-memory)...');
      await new Promise(r => setTimeout(r, 600));

      setInvestigationStep('3. Recalling similar historical post-mortems & fixes...');
      await new Promise(r => setTimeout(r, 500));

      setInvestigationStep('4. Synthesizing prioritized diagnosis via Groq AI...');
      const analysis = await investigateIncident(formData);

      setInvestigationStep('5. Incident analysis complete!');
      await new Promise(r => setTimeout(r, 300));

      onIncidentInvestigated(analysis);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Investigation failed');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
          Submit New Production Incident
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          RecallOps will search organizational Hindsight memory for similar historical incidents, root causes, and successful fixes.
        </p>
      </div>

      {/* Quick Template Fill Buttons */}
      <div style={{ 
        background: 'rgba(15, 23, 42, 0.7)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '10px', 
        padding: '1rem',
        marginBottom: '1.5rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem', fontSize: '0.78rem', fontWeight: 700, color: '#c084fc' }}>
          <Sparkles size={14} />
          <span>LOAD INCIDENT TELEMETRY TEMPLATES (1-CLICK TEST)</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {SAMPLE_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
              onClick={() => applyTemplate(tmpl)}
            >
              <span>{tmpl.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error alert if any */}
      {errorMsg && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.3)', 
          borderRadius: '8px', 
          padding: '0.85rem 1rem', 
          color: '#fca5a5', 
          fontSize: '0.82rem',
          marginBottom: '1.25rem'
        }}>
          {errorMsg}
        </div>
      )}

      {/* Incident Form Card */}
      <form onSubmit={handleSubmit} className="card-devops" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Incident Title */}
          <div>
            <label className="form-label">Incident Title *</label>
            <input 
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Payment API returning HTTP 503"
            />
          </div>

          {/* Service & Environment & Severity */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="form-label">Affected Service *</label>
              <select
                className="form-select"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                required
              >
                <option value="payment-api">payment-api</option>
                <option value="auth-service">auth-service</option>
                <option value="order-service">order-service</option>
                <option value="notification-service">notification-service</option>
                <option value="inventory-service">inventory-service</option>
                <option value="user-service">user-service</option>
              </select>
            </div>

            <div>
              <label className="form-label">Severity Level</label>
              <select
                className="form-select"
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              >
                <option value="CRITICAL">CRITICAL (SEV-1)</option>
                <option value="HIGH">HIGH (SEV-2)</option>
                <option value="MEDIUM">MEDIUM (SEV-3)</option>
                <option value="LOW">LOW (SEV-4)</option>
              </select>
            </div>

            <div>
              <label className="form-label">Environment</label>
              <select
                className="form-select"
                value={formData.environment}
                onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
              >
                <option value="Production">Production (us-east-1)</option>
                <option value="Staging">Staging (eu-west-1)</option>
              </select>
            </div>
          </div>

          {/* Error Logs */}
          <div>
            <label className="form-label">Error Logs / Stack Trace *</label>
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', minHeight: '120px', fontSize: '0.8rem' }}
              value={formData.error_logs}
              onChange={(e) => setFormData({ ...formData, error_logs: e.target.value })}
              required
              placeholder="Paste raw error logs, stack traces, or exception telemetry here..."
            />
          </div>

          {/* Additional Context */}
          <div>
            <label className="form-label">Additional Context (Optional)</label>
            <input
              type="text"
              className="form-input"
              value={formData.additional_context}
              onChange={(e) => setFormData({ ...formData, additional_context: e.target.value })}
              placeholder="e.g. Recent deployment 10 minutes ago, or surge in marketing traffic"
            />
          </div>

          {/* Loading Animation / State Steps */}
          {isLoading && (
            <div style={{
              background: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Loader2 size={20} className="animate-spin" color="#c084fc" />
              <div style={{ fontSize: '0.82rem', color: '#e9d5ff', fontWeight: 600 }}>
                {investigationStep}
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
              style={{ padding: '0.75rem 1.75rem', fontSize: '0.92rem' }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Investigating with Hindsight Memory...</span>
                </>
              ) : (
                <>
                  <Brain size={18} />
                  <span>Investigate Incident</span>
                </>
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
