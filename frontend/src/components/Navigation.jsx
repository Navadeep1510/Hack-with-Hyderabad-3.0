import React from 'react';
import { LayoutDashboard, PlusCircle, ShieldAlert, Brain, History, BookOpen, BarChart3 } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab, selectedIncidentId }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new_incident', label: 'New Incident', icon: PlusCircle },
    { id: 'analysis', label: 'Incident Analysis', icon: ShieldAlert, badge: selectedIncidentId ? `#${selectedIncidentId}` : 'Active' },
    { id: 'memory', label: 'Organizational Memory', icon: Brain },
    { id: 'history', label: 'Incident History', icon: History },
    { id: 'runbooks', label: 'Learned Runbooks', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="nav-tab-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span 
                className="badge-tag"
                style={{ 
                  fontSize: '0.65rem', 
                  padding: '0.1rem 0.4rem',
                  background: isActive ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#f8fafc' : '#94a3b8'
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
