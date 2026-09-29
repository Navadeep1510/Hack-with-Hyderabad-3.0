"""
RecallOps AI - Hindsight Memory API Routes
Exposes persistent organizational memory items, search, runbooks, and status.
"""

from typing import List, Optional
from fastapi import APIRouter, Query

from app.services.hindsight_service import hindsight_service
from app.models.incident import HistoricalIncidentMatch

router = APIRouter(prefix="/api/memory", tags=["memory"])


@router.get("/status")
async def get_memory_status():
    """Returns live connection status of Hindsight Memory Bank."""
    return hindsight_service.get_status()


@router.get("/items")
async def list_memories(
    q: Optional[str] = Query(None, description="Search term across memory cards"),
    service: Optional[str] = Query(None, description="Filter by affected microservice")
):
    """
    Returns searchable list of all remembered incident post-mortems in Hindsight.
    """
    all_mems = hindsight_service.get_all_memories()
    if not q and not service:
        return all_mems

    filtered = []
    q_lower = q.lower() if q else ""
    for mem in all_mems:
        match = True
        if service and mem.get("service") != service:
            match = False
        if q_lower:
            text_corpus = f"{mem.get('title', '')} {mem.get('root_cause', '')} {mem.get('symptoms', '')} {mem.get('resolution', '')}".lower()
            if q_lower not in text_corpus:
                match = False
        if match:
            filtered.append(mem)

    return filtered


@router.get("/search", response_model=List[HistoricalIncidentMatch])
async def search_memory(
    q: str = Query(..., description="Semantic search query (e.g. 'payment API database issues')"),
    service: Optional[str] = Query(None, description="Optional service context"),
    limit: int = Query(5, ge=1, le=20)
):
    """
    Searches Hindsight memory bank for related historical incidents.
    """
    return hindsight_service.search_incident_memory(query=q, service=service, limit=limit)


@router.get("/runbooks")
async def list_runbooks():
    """
    Returns learned runbooks synthesized from persistent incident memories.
    """
    return hindsight_service.get_all_runbooks()
