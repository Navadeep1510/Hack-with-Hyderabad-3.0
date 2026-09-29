"""
RecallOps AI - Demo Scenario Route
Supports the 3-minute hackathon presentation flow:
Scene 1: First Incident (Limited Memory -> Engineer Resolves -> Stores in Hindsight)
Scene 2: Second Incident (Searching Hindsight -> "I Remember This" -> Precise Organizational Fix)
Scene 3: The Difference (Generic AI without memory vs RecallOps with Hindsight)
"""

from fastapi import APIRouter
from typing import Dict, Any

from app.services.incident_service import incident_service
from app.services.hindsight_service import hindsight_service

router = APIRouter(prefix="/api/demo", tags=["demo"])

DEMO_SCENARIO_DATA = {
    "scene_1": {
        "title": "Scene 1: First Incident — Cold Start Investigation",
        "description": "Payment API fails with HTTP 503. The agent has limited prior organizational history.",
        "incident": {
            "id": "DEMO-INC-001",
            "service": "payment-api",
            "title": "Payment API returning HTTP 503 during promo launch",
            "severity": "CRITICAL",
            "environment": "Production",
            "error_logs": "2026-09-29 14:02:10 ERROR payment-api: DB connection timeout pool exhausted active=50 idle=0",
            "additional_context": "First time observing this specific traffic surge."
        },
        "agent_response": {
            "summary": "Payment API is experiencing HTTP 503 errors due to database connection exhaustion.",
            "memory_status": "No specific historical fix recorded yet for this service version.",
            "general_actions": [
                "1. Verify database node CPU and connection metrics.",
                "2. Check for stalled database transactions.",
                "3. Restart payment-api pods.",
                "4. Monitor error rate."
            ]
        },
        "resolution": {
            "root_cause": "Database connection pool exhaustion",
            "actual_fix": "Increased DB pool size from 50 to 100 in ConfigMap and rolled payment-api pods.",
            "resolution_time_minutes": 28,
            "was_ai_helpful": "Partially",
            "learning_message": "🧠 RecallOps learned from this incident and stored the fix in Hindsight memory."
        }
    },
    "scene_2": {
        "title": "Scene 2: Second Incident — Hindsight Memory in Action",
        "description": "Two weeks later, Payment API experiences HTTP 503 again under new traffic.",
        "incident": {
            "id": "DEMO-INC-002",
            "service": "payment-api",
            "title": "Payment API returning HTTP 503",
            "severity": "CRITICAL",
            "environment": "Production",
            "error_logs": "2026-09-29 14:32:11 ERROR payment-api: Database connection timeout Pool exhausted: active=100 idle=0",
            "additional_context": "Checkout drop-off rate spiked to 84% in US-East."
        },
        "memory_search_steps": [
            "1. Extracting service tokens & error signatures (payment-api, HTTP 503, pool exhausted)...",
            "2. Querying Hindsight Memory Bank (recallops-org-memory)...",
            "3. Recalling historical incidents (INC-2026-011, INC-2026-007, INC-2025-091)...",
            "4. Detecting organizational pattern: Database Connection Pool Exhaustion...",
            "5. Synthesizing prioritized recommendation based on past organizational successes."
        ],
        "agent_quote": "I remember this. In incident INC-2026-011, payment-api suffered the exact same pool exhaustion during high checkout volume. The team resolved it in 11 minutes by increasing pool size and rolling pods.",
        "recommended_fix": "Increase DB connection pool size and perform rolling restart of payment-api deployment.",
        "expected_resolution_time": "11 minutes (down from 28 minutes without memory)"
    },
    "scene_3": {
        "title": "Scene 3: The Hindsight Difference",
        "comparison": {
            "without_memory": {
                "title": "Generic AI (Without Memory)",
                "description": "Answers from scratch every time with no organizational context.",
                "traits": [
                    "Repeats generic checklist: 'Check network, check database, check logs, restart server'",
                    "Unaware of your organization's architecture or previous failures",
                    "Cannot tell you what worked last time vs what failed",
                    "Forces on-call engineers to re-investigate known problems from scratch",
                    "Average resolution time: 28+ minutes"
                ]
            },
            "with_hindsight": {
                "title": "RecallOps AI (With Hindsight Memory)",
                "description": "Remembers past post-mortems, root causes, and successful fixes.",
                "traits": [
                    "Immediately recalls: 'This happened in INC-2026-011 during the flash sale'",
                    "Provides exact config changes previously proven to work",
                    "Cross-references 3 historical occurrences with 100% resolution success",
                    "Continuously learns after every resolved incident via Hindsight SDK",
                    "Average resolution time: 11-13 minutes (2.2x faster)"
                ]
            }
        }
    }
}


@router.get("/scenario")
async def get_demo_scenarios():
    """Returns the complete guided demo scenario payload."""
    return DEMO_SCENARIO_DATA


@router.post("/reset")
async def reset_demo_state():
    """Resets memory state and demo incidents to initial clean slate."""
    # Re-instantiate incident service and clean memory state
    incident_service.__init__()
    return {"status": "SUCCESS", "message": "Demo state reset to initial baseline."}
