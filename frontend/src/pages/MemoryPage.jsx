import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Search, 
  Sparkles, 
  Filter, 
  Server, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  X,
  Layers,
  Database
} from 'lucide-react';
import { fetchMemoryItems, searchMemory } from '../services/api';

const SAMPLE_QUERIES = [
  'payment API database issues',
  'previous Redis failures',
  'authentication outages',
  'similar 503 errors'
];

export default function MemoryPage({ onSelectIncident }) {
  const [memories, setMemories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadMemories();
  }, [selectedService]);

  const loadMemories = async () => {
    try {
      const data = await fetchMemoryItems('', selectedService);
      setMemories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      loadMemories();
      return;
    }
    setIsSearching(true);
    try {
      const data = await fetchMemoryItems(searchQuery, selectedService);
      setMemories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const applySampleQuery = (q) => {
    setSearchQuery(q);
    setIsSearching(true);
    fetchMemoryItems(q, selectedService)
      .then(setMemories)
      .finally(() => setIsSearching(false));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Page Title & Hindsight Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Organizational Memory
            </h2>
            <span className="badge-tag memory-highlight">
              HINDSIGHT BANK: recallops-org-memory
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Persistent long-term incident post-mortems, verified fixes, and learned patterns that never get forgotten.
          </p>
        </div>
      </div>

      {/* Memory Statistics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        <div className="card-devops" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            TOTAL INCIDENTS REMEMBERED
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>24</span>
            <span style={{ fontSize: '0.75rem', color: '#c084fc' }}>Across all clusters</span>
          </div>
        </div>

        <div className="card-devops" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            SUCCESSFUL RESOLUTIONS
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#10b981' }}>21</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>87% verified</span>
          </div>
        </div>

        <div className="card-devops" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            KNOWN FAILURE PATTERNS
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f59e0b' }}>9</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Classified</span>
          </div>
        </div>

        <div className="card-devops" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            LEARNED RUNBOOKS
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#6366f1' }}>7</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Synthesized</span>
          </div>
        </div>

      </div>

      {/* Search & Filter Bar */}
      <div className="card-devops" style={{ padding: '1.25rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
            <input 
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.4rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search organizational memory... (e.g. 'payment API database issues', 'Redis failures')"
            />
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <div style={{ width: 200 }}>
            <select 
              className="form-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">All Services</option>
              <option value="payment-api">payment-api</option>
              <option value="auth-service">auth-service</option>
              <option value="order-service">order-service</option>
              <option value="notification-service">notification-service</option>
              <option value="inventory-service">inventory-service</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            <Search size={16} />
            <span>Search Memory</span>
          </button>
        </form>

        {/* Example Query Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>EXAMPLE QUERIES:</span>
          {SAMPLE_QUERIES.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applySampleQuery(q)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: '#cbd5e1',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-purple)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Memory Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {memories.map((mem) => (
          <div 
            key={mem.id}
            className="card-devops interactive"
            onClick={() => setSelectedMemory(mem)}
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="badge-tag service-badge">
                    <Server size={11} />
                    {mem.service}
                  </span>
                  <span className="badge-tag" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-muted)' }}>
                    {mem.incident_id}
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {mem.date}
                </span>
              </div>

              {/* Title */}
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.65rem' }}>
                {mem.title}
              </h4>

              {/* Symptoms Preview */}
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-muted)' }}>Symptoms: </strong>
                {mem.symptoms}
              </p>

              {/* Root Cause & Resolution */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.25)', 
                borderRadius: '8px', 
                padding: '0.75rem',
                fontSize: '0.78rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                marginBottom: '0.85rem'
              }}>
                <div>
                  <span style={{ color: '#f87171', fontWeight: 700 }}>Root Cause: </span>
                  <span style={{ color: '#fca5a5' }}>{mem.root_cause}</span>
                </div>
                <div>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>Resolution: </span>
                  <span style={{ color: '#a7f3d0' }}>{mem.resolution}</span>
                </div>
              </div>
            </div>

            {/* Footer / Outcome */}
            <div style={{ 
              borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
              paddingTop: '0.65rem', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: '0.74rem'
            }}>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>{mem.outcome}</span>
              <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                View Memory <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Complete Remembered Context Modal */}
      {selectedMemory && (
        <div className="modal-overlay" onClick={() => setSelectedMemory(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span className="badge-tag memory-highlight">
                    MEMORY ID: {selectedMemory.id}
                  </span>
                  <span className="badge-tag service-badge">
                    {selectedMemory.service}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Linked Incident: {selectedMemory.incident_id}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                  {selectedMemory.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedMemory(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>SYMPTOMS RECORDED</span>
                <p style={{ color: '#f8fafc', marginTop: '0.2rem' }}>{selectedMemory.symptoms}</p>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>CONFIRMED ROOT CAUSE</span>
                <p style={{ color: '#fca5a5', fontWeight: 600, marginTop: '0.2rem' }}>{selectedMemory.root_cause}</p>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>SUCCESSFUL FIX</span>
                <p style={{ color: '#86efac', fontWeight: 600, marginTop: '0.2rem' }}>{selectedMemory.resolution}</p>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>MEASURED OUTCOME</span>
                <p style={{ color: '#38bdf8', marginTop: '0.2rem' }}>{selectedMemory.outcome}</p>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>HINDSIGHT METADATA TAGS</span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                  {(selectedMemory.tags || []).map((t, idx) => (
                    <span key={idx} className="badge-tag" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#cbd5e1' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <button className="btn-secondary" onClick={() => setSelectedMemory(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
