from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class IncidentSeverity(str, Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class IncidentStatus(str, Enum):
    INVESTIGATING = "INVESTIGATING"
    IDENTIFIED = "IDENTIFIED"
    MONITORING = "MONITORING"
    RESOLVED = "RESOLVED"


class IncidentCreate(BaseModel):
    title: str = Field(..., example="Payment API returning HTTP 503")
    service: str = Field(..., example="payment-api")
    severity: IncidentSeverity = Field(default=IncidentSeverity.CRITICAL)
    environment: str = Field(default="Production", example="Production")
    timestamp: Optional[str] = Field(default=None)
    error_logs: str = Field(
        ...,
        example="2026-09-29 14:32:11 ERROR payment-api Database connection timeout Pool exhausted: active=100 idle=0 HTTP 503 returned"
    )
    additional_context: Optional[str] = Field(default="", example="Spike in user checkout traffic detected")


class HistoricalIncidentMatch(BaseModel):
    incident_id: str
    title: str
    service: str
    root_cause: str
    resolution: str
    outcome: str
    similarity_score: float = Field(default=0.92, description="Calculated memory similarity score 0-1")
    date: str
    why_matched: str


class RootCauseHypothesis(BaseModel):
    cause: str
    confidence: int = Field(description="AI estimated confidence percentage (0-100)")
    explanation: str
    evidence_type: str = Field(default="historical_memory", description="historical_memory | current_evidence | ai_inference")


class IncidentAnalysis(BaseModel):
    incident_id: str
    title: str
    service: str
    severity: IncidentSeverity
    summary: str
    root_cause_hypotheses: List[RootCauseHypothesis]
    similar_incidents: List[HistoricalIncidentMatch]
    memory_insight: str
    pattern_name: str
    historical_success_rate: str
    most_successful_previous_action: str
    recommended_actions: List[str]
    why_this_recommendation: str
    memory_confidence: int
    memory_source: str
    is_learned_pattern: bool = True


class ResolutionSubmission(BaseModel):
    incident_id: str
    root_cause: str
    actual_fix: str
    resolution_time_minutes: int
    was_ai_helpful: str = Field(default="Yes", description="Yes | Partially | No")
    additional_notes: Optional[str] = None


class ResolutionResponse(BaseModel):
    status: str
    message: str
    incident_id: str
    service: str
    failure_pattern: str
    root_cause: str
    successful_fix: str
    resolution_time_minutes: int
    memory_id: str
    hindsight_stored: bool
    hindsight_details: Dict[str, Any]


class MemoryItemModel(BaseModel):
    id: str
    incident_id: str
    service: str
    title: str
    symptoms: str
    root_cause: str
    resolution: str
    outcome: str
    date: str
    tags: List[str]
    confidence: int
    runbook_ref: Optional[str] = None
    source: str = "Hindsight Memory Bank"


class RunbookModel(BaseModel):
    id: str
    title: str
    service: str
    failure_pattern: str
    symptoms: List[str]
    recommended_actions: List[str]
    source: str = "Learned from previous incidents"
    times_used: int
    success_rate: str
    last_updated: str


class IncidentRecord(BaseModel):
    id: str
    date: str
    service: str
    title: str
    severity: IncidentSeverity
    root_cause: Optional[str] = None
    resolution: Optional[str] = None
    time_to_resolve_minutes: Optional[int] = None
    status: IncidentStatus
    environment: str = "Production"
    error_logs: Optional[str] = None
    additional_context: Optional[str] = None
    was_ai_helpful: Optional[str] = None


class SystemStatus(BaseModel):
    ai_agent_status: str
    hindsight_status: str
    hindsight_provider: str
    hindsight_url: str
    bank_id: str
    incidents_analyzed: int
    knowledge_memories: int
    groq_model: str
    is_fallback_mode: bool
    notice: Optional[str] = None
