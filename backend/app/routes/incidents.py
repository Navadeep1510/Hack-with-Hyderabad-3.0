"""
RecallOps AI - Incident API Routes
"""

from typing import List
from fastapi import APIRouter, HTTPException

from app.models.incident import (
    IncidentCreate,
    IncidentAnalysis,
    ResolutionSubmission,
    ResolutionResponse,
    IncidentRecord
)
from app.services.incident_service import incident_service

router = APIRouter(prefix="/api/incidents", tags=["incidents"])


@router.get("", response_model=List[IncidentRecord])
async def list_incidents():
    """Returns full history of recorded production incidents."""
    return incident_service.get_all_incidents()


@router.get("/active")
async def get_active_incident():
    """Returns currently investigating production incident."""
    active = incident_service.get_active_incident()
    return active


@router.get("/{incident_id}")
async def get_incident(incident_id: str):
    """Returns single incident details."""
    incident = incident_service.get_incident_by_id(incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail=f"Incident {incident_id} not found")
    return incident


@router.get("/{incident_id}/analysis", response_model=IncidentAnalysis)
async def get_analysis(incident_id: str):
    """
    Returns AI Incident Command Center analysis combining current alert telemetry
    with Hindsight organizational memory.
    """
    analysis = incident_service.get_incident_analysis(incident_id)
    if not analysis:
        raise HTTPException(status_code=404, detail=f"Analysis for incident {incident_id} not found")
    return analysis


@router.post("/investigate", response_model=IncidentAnalysis)
async def investigate_incident(payload: IncidentCreate):
    """
    Receives new incident report or alert.
    Queries Hindsight memory, compares current vs historical incidents,
    and returns prioritized diagnosis + recommended action plan.
    """
    try:
        analysis = incident_service.investigate_incident(payload)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Investigation failed: {str(e)}")


@router.post("/resolve", response_model=ResolutionResponse)
async def resolve_incident(payload: ResolutionSubmission):
    """
    Marks incident resolved, updates telemetry, and persists learned fix in Hindsight.
    """
    try:
        response = incident_service.resolve_incident(payload)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resolution capture failed: {str(e)}")
