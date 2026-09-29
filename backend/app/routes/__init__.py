from app.routes.incidents import router as incidents_router
from app.routes.memory import router as memory_router
from app.routes.analytics import router as analytics_router
from app.routes.demo import router as demo_router

__all__ = ["incidents_router", "memory_router", "analytics_router", "demo_router"]
