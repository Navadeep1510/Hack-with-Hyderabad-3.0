"""
RecallOps AI - Analytics API Route
"""

from fastapi import APIRouter
from app.services.incident_service import incident_service

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("")
async def get_analytics():
    """
    Returns metrics on resolution speedup, memory-assisted rate, and incident categories.
    """
    return incident_service.get_analytics()
