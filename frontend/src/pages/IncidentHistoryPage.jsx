import React, { useState, useEffect } from 'react';
import { History, Search, Filter, Server, AlertOctagon, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { fetchIncidents } from '../services/api';

export default function IncidentHistoryPage({ onSelectIncident }) {
  const [incidents, setIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');

  useEffect(() => {
    fetchIncidents()
      .then(setIncidents)
      .catch(console.error);
  }, []);

  const filteredIncidents = incidents.filter(inc => {
    if (selectedService && inc.service !== selectedService) return false;
    if (selectedSeverity && inc.severity !== selectedSeverity) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const text = `${inc.id} ${inc.title} ${inc.service} ${inc.root_cause || ''} ${inc.resolution || ''}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Production Incident History
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Log of all handled production incidents, severity levels, root causes, and verified recovery metrics.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card-devops" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <input 
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.2rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search incident ID, title, root cause..."
          />
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <div style={{ width: 180 }}>
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

        <div style={{ width: 160 }}>
          <select 
            className="form-select"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
          >
            <option value="">All Severities</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      {/* Incident History Table */}
      <div className="card-devops" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table-devops">
          <thead>
            <tr>
              <th>Incident ID</th>
              <th>Date</th>
              <th>Service</th>
              <th>Severity</th>
              <th>Root Cause</th>
              <th>Resolution Fix</th>
              <th>TT Resolve</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((inc) => (
              <tr key={inc.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f8fafc' }}>
                  {inc.id}
                </td>
                <td style={{ whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
                  {inc.date}
                </td>
                <td>
                  <span className="badge-tag service-badge">
                    {inc.service}
                  </span>
                </td>
                <td>
                  <span className={`badge-tag ${inc.severity.toLowerCase()}`}>
                    {inc.severity}
                  </span>
                </td>
                <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={inc.root_cause}>
                  {inc.root_cause || <span style={{ color: 'var(--text-muted)' }}>Investigating...</span>}
                </td>
                <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={inc.resolution}>
                  {inc.resolution || <span style={{ color: 'var(--text-muted)' }}>Pending remediation</span>}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {inc.time_to_resolve_minutes ? (
                    <span style={{ color: '#38bdf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} />
                      {inc.time_to_resolve_minutes}m
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                  )}
                </td>
                <td>
                  <span className={`badge-tag ${inc.status === 'RESOLVED' ? 'resolved' : 'critical'}`}>
                    {inc.status}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => onSelectIncident(inc.id)}
                    style={{
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      color: '#a5b4fc',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '5px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}
                  >
                    <span>Analyze</span>
                    <ChevronRight size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
