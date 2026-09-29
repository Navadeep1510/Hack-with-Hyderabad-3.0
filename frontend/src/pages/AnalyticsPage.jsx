import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingDown, Clock, CheckCircle2, Brain, AlertTriangle, Sparkles, Layers } from 'lucide-react';
import { fetchAnalytics } from '../services/api';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics()
      .then(setData)
      .catch(console.error);
  }, []);

  const timeline = data?.resolution_timeline || [
    { incident: 'INC-2025-091', time: 14, memory_used: false, date: 'Nov 2025' },
    { incident: 'INC-2026-003', time: 25, memory_used: false, date: 'Jun 2026' },
    { incident: 'INC-2026-007', time: 18, memory_used: true, date: 'Jul 2026' },
    { incident: 'INC-2026-011', time: 11, memory_used: true, date: 'Aug 2026' },
    { incident: 'INC-2026-015', time: 22, memory_used: true, date: 'Aug 2026' },
    { incident: 'INC-2026-018', time: 15, memory_used: true, date: 'Sep 2026' },
    { incident: 'INC-2026-020', time: 16, memory_used: true, date: 'Sep 2026' },
  ];

  const categories = data?.top_categories || [
    { name: 'Database Connection Issues', count: 4, percentage: 33 },
    { name: 'Redis / Cache Saturation', count: 3, percentage: 25 },
    { name: 'Query Latency & Indexing', count: 2, percentage: 17 },
    { name: 'Message Queue Lag', count: 2, percentage: 17 },
    { name: 'Cache Inconsistency', count: 1, percentage: 8 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Incident & Memory Analytics
          </h2>
          <span className="badge-tag" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-muted)' }}>
            SYNTHETIC DEMO BENCHMARKS
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Demonstrating how organizational memory with Hindsight drastically compresses Mean Time to Resolution (MTTR).
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        <div className="card-devops" style={{ padding: '1.15rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>AVERAGE RESOLUTION TIME</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.35rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>
              {data?.average_resolution_time_minutes || 18} min
            </span>
            <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <TrendingDown size={14} /> -42%
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Down from 28m without memory</span>
        </div>

        <div className="card-devops" style={{ padding: '1.15rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>INCIDENTS RESOLVED</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.35rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>
              {data?.resolution_rate_percent || 87}%
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>21 of 24</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>High closure rate</span>
        </div>

        <div className="card-devops" style={{ padding: '1.15rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>MEMORY-ASSISTED RATE</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.35rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc' }}>
              {data?.memory_assisted_rate_percent || 74}%
            </span>
            <span style={{ fontSize: '0.75rem', color: '#e9d5ff' }}>Hindsight matched</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Recalled prior root causes</span>
        </div>

        <div className="card-devops" style={{ padding: '1.15rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>MOST COMMON ROOT CAUSE</span>
          <div style={{ marginTop: '0.35rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>
              {data?.most_common_root_cause || 'Database Connection'}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Most affected: payment-api</span>
          </div>
        </div>

      </div>

      {/* Visual Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Chart 1: Resolution Time Over Time (MTTR Reduction) */}
        <div className="card-devops" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                Incident Resolution Time Trend
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Resolution time drops as organizational memory expands
              </p>
            </div>
            <span className="badge-tag resolved">
              -60% MTTR
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: 180, paddingTop: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            {timeline.map((item, idx) => {
              const maxMinutes = 30;
              const barHeight = (item.time / maxMinutes) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.7rem', color: item.memory_used ? '#c084fc' : '#94a3b8', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {item.time}m
                  </span>
                  <div style={{
                    width: '100%',
                    height: `${barHeight}%`,
                    background: item.memory_used ? 'linear-gradient(180deg, #a855f7 0%, #6366f1 100%)' : 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: item.memory_used ? '0 0 10px rgba(168, 85, 247, 0.3)' : 'none'
                  }} />
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', textAlign: 'center' }}>
                    {item.incident.replace('INC-', '#')}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(255, 255, 255, 0.2)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Cold Start (No Memory)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'linear-gradient(135deg, #a855f7, #6366f1)' }} />
              <span style={{ color: '#c084fc', fontWeight: 600 }}>Hindsight Memory Assisted</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Top Incident Categories */}
        <div className="card-devops" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
              Top Incident Categories
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Breakdown by recurring failure classification
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {categories.map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#f8fafc', fontWeight: 600 }}>{cat.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{cat.count} ({cat.percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${cat.percentage}%`,
                    height: '100%',
                    background: idx === 0 ? '#ef4444' : (idx === 1 ? '#a855f7' : (idx === 2 ? '#f59e0b' : '#06b6d4')),
                    borderRadius: 3
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Speedup Callout */}
          <div style={{ 
            marginTop: '1.5rem', 
            background: 'rgba(16, 185, 129, 0.08)', 
            border: '1px solid rgba(16, 185, 129, 0.25)', 
            borderRadius: '8px', 
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#86efac', fontWeight: 700 }}>ORGANIZATIONAL SPEEDUP</span>
              <span style={{ fontSize: '0.82rem', color: '#f8fafc' }}>Without Memory: 28m → With Hindsight: 11m</span>
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981' }}>2.2x Faster</span>
          </div>
        </div>

      </div>

    </div>
  );
}
