import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import NewIncidentPage from './pages/NewIncidentPage';
import IncidentAnalysisPage from './pages/IncidentAnalysisPage';
import MemoryPage from './pages/MemoryPage';
import IncidentHistoryPage from './pages/IncidentHistoryPage';
import RunbooksPage from './pages/RunbooksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ResolutionModal from './components/ResolutionModal';
import DemoModal from './components/DemoModal';

import { fetchHealth, fetchActiveIncident, fetchIncidentAnalysis } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemStatus, setSystemStatus] = useState(null);
  const [activeIncident, setActiveIncident] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [selectedIncidentId, setSelectedIncidentId] = useState('INC-2026-024');

  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Load initial health and active incident
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [health, active] = await Promise.all([
        fetchHealth().catch(() => null),
        fetchActiveIncident().catch(() => null)
      ]);
      setSystemStatus(health);
      setActiveIncident(active);

      // Load initial analysis for active incident INC-2026-024
      if (active?.id) {
        const analysis = await fetchIncidentAnalysis(active.id).catch(() => null);
        setCurrentAnalysis(analysis);
        setSelectedIncidentId(active.id);
      }
    } catch (err) {
      console.error('Initial data load error:', err);
    }
  };

  const handleInvestigate = async (incidentId) => {
    try {
      const targetId = incidentId || selectedIncidentId || 'INC-2026-024';
      const analysis = await fetchIncidentAnalysis(targetId);
      setCurrentAnalysis(analysis);
      setSelectedIncidentId(targetId);
      setActiveTab('analysis');
    } catch (err) {
      console.error(err);
      setActiveTab('analysis');
    }
  };

  const handleIncidentInvestigated = (newAnalysis) => {
    setCurrentAnalysis(newAnalysis);
    setSelectedIncidentId(newAnalysis.incident_id);
    setActiveTab('analysis');
  };

  const handleSelectIncidentFromHistory = async (incidentId) => {
    try {
      const analysis = await fetchIncidentAnalysis(incidentId);
      setCurrentAnalysis(analysis);
      setSelectedIncidentId(incidentId);
      setActiveTab('analysis');
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolutionSuccess = (resolutionResult) => {
    // Refresh status and active incident
    loadInitialData();
  };

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <Header 
        status={systemStatus} 
        onOpenDemo={() => setIsDemoModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Tab Navigation Bar */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        selectedIncidentId={selectedIncidentId}
      />

      {/* Main View Area */}
      <main className="main-view-wrapper">
        {activeTab === 'dashboard' && (
          <DashboardPage 
            activeIncident={activeIncident}
            onInvestigate={handleInvestigate}
            onGoToMemory={() => setActiveTab('memory')}
            onGoToHistory={() => setActiveTab('history')}
            status={systemStatus}
          />
        )}

        {activeTab === 'new_incident' && (
          <NewIncidentPage 
            onIncidentInvestigated={handleIncidentInvestigated}
          />
        )}

        {activeTab === 'analysis' && (
          <IncidentAnalysisPage 
            analysis={currentAnalysis}
            onOpenResolutionModal={() => setIsResolutionModalOpen(true)}
          />
        )}

        {activeTab === 'memory' && (
          <MemoryPage 
            onSelectIncident={handleSelectIncidentFromHistory}
          />
        )}

        {activeTab === 'history' && (
          <IncidentHistoryPage 
            onSelectIncident={handleSelectIncidentFromHistory}
          />
        )}

        {activeTab === 'runbooks' && (
          <RunbooksPage />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage />
        )}
      </main>

      {/* Resolution & Learning Modal */}
      <ResolutionModal 
        isOpen={isResolutionModalOpen}
        onClose={() => setIsResolutionModalOpen(false)}
        incidentId={currentAnalysis?.incident_id || selectedIncidentId}
        defaultService={currentAnalysis?.service || 'payment-api'}
        defaultRootCause={currentAnalysis?.pattern_name || 'Database connection pool exhaustion'}
        onResolutionSuccess={handleResolutionSuccess}
      />

      {/* The Magic Demo Mode Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
