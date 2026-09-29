import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Brain, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  RotateCcw, 
  Sparkles, 
  AlertOctagon, 
  ChevronRight, 
  ChevronLeft,
  Server,
  Zap,
  Bot,
  Database
} from 'lucide-react';
import { fetchDemoScenarios, resetDemoState } from '../services/api';

export default function DemoModal({ isOpen, onClose }) {
  const [currentScene, setCurrentScene] = useState(1);
  const [scenarioData, setScenarioData] = useState(null);
  const [isMemorySaved, setIsMemorySaved] = useState(false);
  const [animatingSearch, setAnimatingSearch] = useState(false);
  const [searchStepIndex, setSearchStepIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchDemoScenarios()
        .then(setScenarioData)
        .catch(console.error);
      setCurrentScene(1);
      setIsMemorySaved(false);
      setAnimatingSearch(false);
      setSearchStepIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveScene1Memory = () => {
    setIsMemorySaved(true);
  };

  const handleStartScene2Search = () => {
    setAnimatingSearch(true);
    setSearchStepIndex(0);

    const steps = [0, 1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSearchStepIndex(step);
        if (step === 4) {
          setAnimatingSearch(false);
        }
      }, (idx + 1) * 700);
    });
  };

  const scene1 = scenarioData?.scene_1;
  const scene2 = scenarioData?.scene_2;
  const scene3 = scenarioData?.scene_3;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 860, border: '1px solid rgba(168, 85, 247, 0.4)' }}
      >
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', 
              width: 32, 
              height: 32, 
              borderRadius: 8, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Sparkles size={18} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                RecallOps AI — Guided Hackathon Demo
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 600 }}>
                Interactive 3-Minute Proof of Hindsight Persistent Memory
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Scene Indicator Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[
            { id: 1, label: 'Scene 1: Cold Start' },
            { id: 2, label: 'Scene 2: "I Remember This"' },
            { id: 3, label: 'Scene 3: The Difference' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentScene(s.id)}
              style={{
                flex: 1,
                padding: '0.6rem 0.5rem',
                borderRadius: '8px',
                border: `1px solid ${currentScene === s.id ? 'var(--accent-purple)' : 'var(--border-subtle)'}`,
                background: currentScene === s.id ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                color: currentScene === s.id ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* SCENE 1: FIRST INCIDENT (COLD START) */}
        {currentScene === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '10px', padding: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge-tag critical">INCIDENT #1</span>
                <span className="badge-tag service-badge">payment-api</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cold Start (No previous memory)</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                Payment API — HTTP 503 Errors
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                The agent analyzes the issue from scratch without prior organizational memories:
              </p>
              
              <div className="code-logs-block" style={{ marginBottom: '0.85rem' }}>
                2026-09-29 14:02:10 ERROR payment-api: DB connection timeout pool exhausted active=50 idle=0
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', padding: '0.75rem', fontSize: '0.78rem' }}>
                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>AI AGENT INITIAL OUTPUT:</strong>
                <p style={{ color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  "Payment API is experiencing HTTP 503 errors. No specific historical fix recorded yet for this service version."
                </p>
                <div style={{ color: 'var(--text-muted)' }}>
                  Generic checklist: 1. Verify DB metrics. 2. Check stalled transactions. 3. Restart pods.
                </div>
              </div>
            </div>

            {/* Engineer Resolves & Learns */}
            <div style={{ 
              background: isMemorySaved ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
              border: `1px solid ${isMemorySaved ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
              borderRadius: '10px',
              padding: '1.15rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
                  ENGINEER INVESTIGATION & RESOLUTION
                </span>
                {isMemorySaved && (
                  <span className="badge-tag resolved">
                    STORED IN HINDSIGHT
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                After 28 minutes of manual troubleshooting, the engineer diagnosed <strong>Database connection pool exhaustion</strong> and 
                increased the DB pool size from 50 to 100 in the ConfigMap.
              </p>

              {isMemorySaved ? (
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)', 
                  border: '1px solid rgba(168, 85, 247, 0.4)', 
                  borderRadius: '8px', 
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Brain size={24} color="#c084fc" />
                  <div>
                    <h5 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.15rem' }}>
                      🧠 RecallOps learned something new!
                    </h5>
                    <p style={{ fontSize: '0.78rem', color: '#e9d5ff' }}>
                      Retained in Hindsight Memory Bank: "payment-api HTTP 503 was resolved by increasing DB connection pool to 100."
                    </p>
                  </div>
                </div>
              ) : (
                <button className="btn-primary" onClick={handleSaveScene1Memory} style={{ width: '100%', justifyContent: 'center' }}>
                  <Brain size={16} />
                  <span>Click: Save Learning to Hindsight Memory</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button 
                className="btn-primary" 
                onClick={() => setCurrentScene(2)}
                disabled={!isMemorySaved}
                style={{ opacity: isMemorySaved ? 1 : 0.5 }}
              >
                <span>Proceed to Scene 2</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* SCENE 2: SECOND INCIDENT (HINDSIGHT IN ACTION) */}
        {currentScene === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge-tag critical">INCIDENT #2</span>
                <span className="badge-tag service-badge">payment-api</span>
                <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 600 }}>Two Weeks Later...</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                Payment API returning HTTP 503 again
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                New checkout surge causes HTTP 503 errors. The on-call engineer clicks "Investigate Incident":
              </p>

              {/* Animated Memory Search */}
              <div style={{ 
                background: 'rgba(6, 9, 17, 0.95)', 
                border: '1px solid rgba(168, 85, 247, 0.3)', 
                borderRadius: '8px', 
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', marginBottom: '0.5rem', fontWeight: 700 }}>
                  <Brain size={15} />
                  <span>HINDSIGHT MEMORY QUERY EXECUTION:</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: '#cbd5e1' }}>
                  {(scene2?.memory_search_steps || [
                    "1. Extracting service tokens & error signatures...",
                    "2. Querying Hindsight Memory Bank (recallops-org-memory)...",
                    "3. Recalling historical incidents (INC-2026-011, INC-2026-007)...",
                    "4. Detecting organizational pattern: Database Connection Pool Exhaustion...",
                    "5. Synthesizing prioritized recommendation based on past organizational successes."
                  ]).map((step, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        color: idx <= searchStepIndex ? '#10b981' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      {idx <= searchStepIndex && <CheckCircle2 size={12} color="#10b981" />}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agent "I Remember This" Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)', 
              border: '1px solid rgba(168, 85, 247, 0.45)', 
              borderRadius: '10px', 
              padding: '1.25rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Brain size={18} color="#c084fc" />
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                  "I remember this."
                </h4>
              </div>

              <blockquote style={{ fontSize: '0.88rem', color: '#f8fafc', fontStyle: 'italic', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                "{scene2?.agent_quote || 'In incident INC-2026-011, payment-api suffered the exact same pool exhaustion during high checkout volume. The team resolved it in 11 minutes by increasing pool size and rolling pods.'}"
              </blockquote>

              <div style={{ 
                background: 'rgba(0, 0, 0, 0.3)', 
                borderRadius: '8px', 
                padding: '0.85rem', 
                fontSize: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>RECOMMENDED FIX</span>
                  <strong style={{ color: '#86efac' }}>Increase DB connection pool size & rolling restart</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>EXPECTED TIME TO RESOLVE</span>
                  <strong style={{ color: '#38bdf8' }}>11 min (Down from 28 min)</strong>
                </div>
              </div>
            </div>

            {/* Nav actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setCurrentScene(1)}>
                <ChevronLeft size={16} />
                <span>Back to Scene 1</span>
              </button>
              <button className="btn-primary" onClick={() => setCurrentScene(3)}>
                <span>Proceed to Scene 3: The Difference</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* SCENE 3: THE DIFFERENCE (SIDE-BY-SIDE VISUAL COMPARISON) */}
        {currentScene === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
                Why Memory Is Everything
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Comparing a traditional stateless LLM chatbot against RecallOps AI with Hindsight memory.
              </p>
            </div>

            {/* Side-by-side comparison cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              
              {/* Without Memory (Generic AI) */}
              <div style={{ 
                background: 'rgba(239, 68, 68, 0.05)', 
                border: '1px solid rgba(239, 68, 68, 0.25)', 
                borderRadius: '10px', 
                padding: '1.25rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Bot size={18} color="#f87171" />
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fca5a5' }}>
                    Generic AI (Without Memory)
                  </h5>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  Starts from scratch every time. No organizational context.
                </p>

                <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.1rem' }}>
                  <li>Repeats generic checklist: "Check network, check logs, restart server".</li>
                  <li>Unaware of your organization's specific services or previous outages.</li>
                  <li>Cannot tell you what worked last time vs what failed.</li>
                  <li>Forces engineers to rediscover the same solution repeatedly.</li>
                  <li><strong style={{ color: '#fca5a5' }}>Average MTTR: 28+ minutes</strong></li>
                </ul>
              </div>

              {/* With Hindsight Memory (RecallOps) */}
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)', 
                border: '1px solid rgba(168, 85, 247, 0.4)', 
                borderRadius: '10px', 
                padding: '1.25rem',
                boxShadow: 'var(--shadow-glow)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Brain size={18} color="#c084fc" />
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                    RecallOps AI (With Hindsight)
                  </h5>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#c084fc', marginBottom: '0.85rem', fontWeight: 600 }}>
                  Remembers every post-mortem, root cause, and successful fix.
                </p>

                <ul style={{ fontSize: '0.78rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.1rem' }}>
                  <li>Immediately recalls: "This happened in INC-2026-011 during the flash sale".</li>
                  <li>Provides exact config parameters previously proven to work.</li>
                  <li>Cross-references 3 historical occurrences with 100% resolution success.</li>
                  <li>Continuously gets smarter as more incidents are resolved.</li>
                  <li><strong style={{ color: '#10b981' }}>Average MTTR: 11 minutes (2.2x faster)</strong></li>
                </ul>
              </div>

            </div>

            {/* The Demo Punchline Banner */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.4)', 
              border: '1px solid var(--border-medium)', 
              borderRadius: '8px', 
              padding: '0.85rem 1rem', 
              textAlign: 'center',
              fontSize: '0.85rem',
              color: '#f8fafc'
            }}>
              "A generic AI knows what a database connection pool is.
              <br />
              <strong style={{ color: '#c084fc' }}>RecallOps knows what THIS organization did the LAST TIME this happened.</strong>"
            </div>

            {/* Reset / Done Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setCurrentScene(2)}>
                <ChevronLeft size={16} />
                <span>Back to Scene 2</span>
              </button>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => {
                    resetDemoState();
                    setCurrentScene(1);
                    setIsMemorySaved(false);
                  }}
                  title="Reset demo data to baseline"
                >
                  <RotateCcw size={14} />
                  <span>Reset Demo</span>
                </button>
                <button className="btn-primary" onClick={onClose}>
                  <span>Finish Presentation</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
