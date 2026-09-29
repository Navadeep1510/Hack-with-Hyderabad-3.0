/**
 * RecallOps AI - Frontend API Service
 * Centralizes all communication with FastAPI backend endpoints.
 */

const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Failed to fetch system health');
  return res.json();
}

export async function fetchActiveIncident() {
  const res = await fetch(`${API_BASE}/incidents/active`);
  if (!res.ok) throw new Error('Failed to fetch active incident');
  return res.json();
}

export async function fetchIncidents() {
  const res = await fetch(`${API_BASE}/incidents`);
  if (!res.ok) throw new Error('Failed to fetch incidents list');
  return res.json();
}

export async function fetchIncident(id) {
  const res = await fetch(`${API_BASE}/incidents/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch incident ${id}`);
  return res.json();
}

export async function fetchIncidentAnalysis(id) {
  const res = await fetch(`${API_BASE}/incidents/${id}/analysis`);
  if (!res.ok) throw new Error(`Failed to fetch analysis for ${id}`);
  return res.json();
}

export async function investigateIncident(incidentData) {
  const res = await fetch(`${API_BASE}/incidents/investigate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incidentData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Incident investigation failed');
  }
  return res.json();
}

export async function resolveIncident(resolutionData) {
  const res = await fetch(`${API_BASE}/incidents/resolve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resolutionData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to submit resolution');
  }
  return res.json();
}

export async function fetchMemoryItems(q = '', service = '') {
  const params = new URLSearchParams();
  if (q) params.append('q', q);
  if (service) params.append('service', service);
  const res = await fetch(`${API_BASE}/memory/items?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch memory items');
  return res.json();
}

export async function searchMemory(query, service = '') {
  const params = new URLSearchParams({ q: query });
  if (service) params.append('service', service);
  const res = await fetch(`${API_BASE}/memory/search?${params.toString()}`);
  if (!res.ok) throw new Error('Memory search failed');
  return res.json();
}

export async function fetchRunbooks() {
  const res = await fetch(`${API_BASE}/memory/runbooks`);
  if (!res.ok) throw new Error('Failed to fetch learned runbooks');
  return res.json();
}

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function fetchDemoScenarios() {
  const res = await fetch(`${API_BASE}/demo/scenario`);
  if (!res.ok) throw new Error('Failed to fetch demo scenario');
  return res.json();
}

export async function resetDemoState() {
  const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset demo state');
  return res.json();
}
