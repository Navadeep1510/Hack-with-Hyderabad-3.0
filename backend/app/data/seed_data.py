"""
Synthetic seed data for RecallOps AI.
All data is realistic simulated DevOps/SRE incident telemetry and post-mortems.
No real user data is included.
"""

from typing import List, Dict, Any

SEED_INCIDENTS: List[Dict[str, Any]] = [
    {
        "id": "INC-2026-024",
        "date": "2026-09-29 14:32",
        "service": "payment-api",
        "title": "Payment API — HTTP 503 Errors",
        "severity": "CRITICAL",
        "environment": "Production",
        "root_cause": None,
        "resolution": None,
        "time_to_resolve_minutes": None,
        "status": "INVESTIGATING",
        "error_logs": "2026-09-29 14:32:11 ERROR payment-api Database connection timeout Pool exhausted: active=100 idle=0 HTTP 503 returned",
        "additional_context": "Checkout drop-off rate spiked to 84% in US-East region following promotional campaign launch."
    },
    {
        "id": "INC-2026-011",
        "date": "2026-08-14 09:15",
        "service": "payment-api",
        "title": "Payment API outage during flash sale",
        "severity": "CRITICAL",
        "environment": "Production",
        "root_cause": "Database connection pool exhaustion",
        "resolution": "Increased pool size from 50 to 100 in ConfigMap and performed rolling restart of payment-api deployment.",
        "time_to_resolve_minutes": 11,
        "status": "RESOLVED",
        "error_logs": "FATAL: remaining connection slots are reserved for non-replication superuser connections. Pool exhausted active=50 idle=0",
        "additional_context": "Traffic surge led to connection pool bottleneck on Primary PostgreSQL node.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2026-007",
        "date": "2026-07-22 18:40",
        "service": "payment-api",
        "title": "Checkout failures across mobile clients",
        "severity": "CRITICAL",
        "environment": "Production",
        "root_cause": "Database connection saturation due to unclosed JDBC handles",
        "resolution": "Applied hotfix patch to close orphaned transaction sessions and restarted payment-api pods.",
        "time_to_resolve_minutes": 18,
        "status": "RESOLVED",
        "error_logs": "org.postgresql.util.PSQLException: Connection pool exhausted. Active: 80, Idle: 0, Pending: 142",
        "additional_context": "Leak caused by timeout without finally block in refund webhook consumer.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2025-091",
        "date": "2025-11-05 11:20",
        "service": "payment-api",
        "title": "Payment gateway timeout spike",
        "severity": "HIGH",
        "environment": "Production",
        "root_cause": "Database connection exhaustion during batch invoice processing",
        "resolution": "Adjusted connection pool configuration to isolate batch worker pools from client request pools.",
        "time_to_resolve_minutes": 14,
        "status": "RESOLVED",
        "error_logs": "HikariPool-1 - Connection is not available, request timed out after 30005ms.",
        "additional_context": "Overnight invoice reconciliation job shared connection pool with synchronous payments.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2026-018",
        "date": "2026-09-02 08:10",
        "service": "auth-service",
        "title": "Universal Login 504 Gateway Timeouts",
        "severity": "CRITICAL",
        "environment": "Production",
        "root_cause": "Redis connection exhaustion in session cache",
        "resolution": "Purged idle leaked Redis client handles, bumped maxclients limit, and restarted auth-service workers.",
        "time_to_resolve_minutes": 15,
        "status": "RESOLVED",
        "error_logs": "redis.exceptions.ConnectionError: Too many connections / maxclients limit reached (10000).",
        "additional_context": "DDoS protection proxy forwarded unthrottled health probes.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2026-009",
        "date": "2026-08-01 16:45",
        "service": "auth-service",
        "title": "OAuth token verification latency spike",
        "severity": "HIGH",
        "environment": "Production",
        "root_cause": "Redis connection saturation and slow token validation cache lookups",
        "resolution": "Cleared stale Redis connections and increased connection pool timeout threshold in auth-service config.",
        "time_to_resolve_minutes": 12,
        "status": "RESOLVED",
        "error_logs": "Command timed out after 2000ms while acquiring Redis connection from pool.",
        "additional_context": "Burst of automated token refreshes from single third-party integration.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2026-015",
        "date": "2026-08-25 13:05",
        "service": "order-service",
        "title": "Slow order creation and elevated 504 rates",
        "severity": "HIGH",
        "environment": "Production",
        "root_cause": "Database query latency caused by missing composite index on orders table",
        "resolution": "Created concurrent index on orders(user_id, status, created_at) and optimized pagination query.",
        "time_to_resolve_minutes": 22,
        "status": "RESOLVED",
        "error_logs": "Slow query detected: SELECT * FROM orders WHERE user_id = $1 AND status = 'PENDING' execution_time=4820ms",
        "additional_context": "Full table scan triggered by order history query during checkout verification.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2026-003",
        "date": "2026-06-12 10:30",
        "service": "order-service",
        "title": "Order checkout deadlocks under high concurrency",
        "severity": "MEDIUM",
        "environment": "Production",
        "root_cause": "Database query latency and lock contention on inventory reservation row",
        "resolution": "Updated transaction isolation level to READ COMMITTED and refactored locking order.",
        "time_to_resolve_minutes": 25,
        "status": "RESOLVED",
        "error_logs": "ERROR: deadlock detected. Process 14294 waits for ExclusiveLock on tuple (140,2) of relation orders",
        "additional_context": "Order creation concurrent with inventory decrement lock.",
        "was_ai_helpful": "Partially"
    },
    {
        "id": "INC-2026-020",
        "date": "2026-09-15 17:20",
        "service": "notification-service",
        "title": "Delayed transactional emails and SMS alerts",
        "severity": "HIGH",
        "environment": "Production",
        "root_cause": "Message queue backlog in Kafka notification-events topic",
        "resolution": "Scaled consumer deployment from 3 to 12 replicas and increased partition count.",
        "time_to_resolve_minutes": 16,
        "status": "RESOLVED",
        "error_logs": "Lag on notification-events partition 2 reached 84,200 messages. Processing rate: 12 msg/sec.",
        "additional_context": "Third-party SMS provider rate limiter caused consumer backpressure.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2026-005",
        "date": "2026-07-08 21:10",
        "service": "notification-service",
        "title": "Push notification queue stalling",
        "severity": "MEDIUM",
        "environment": "Production",
        "root_cause": "Message queue backlog and unhandled poison pill payload",
        "resolution": "Rerouted poison pill message to dead-letter queue (DLQ) and scaled consumer group.",
        "time_to_resolve_minutes": 19,
        "status": "RESOLVED",
        "error_logs": "JsonParseException in consumer worker #2 while parsing push payload. Offset commit blocked.",
        "additional_context": "Malformed JSON from third-party vendor webhook.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2026-012",
        "date": "2026-08-18 11:50",
        "service": "inventory-service",
        "title": "Incorrect stock availability and false out-of-stock banners",
        "severity": "HIGH",
        "environment": "Production",
        "root_cause": "Cache synchronization issue between Redis inventory mirror and MySQL source",
        "resolution": "Invalidated stale cache keys via redis-cli flush pattern and triggered background cache rebuild job.",
        "time_to_resolve_minutes": 13,
        "status": "RESOLVED",
        "error_logs": "Cache divergence detected for SKU 884920: Redis=0, MySQL=42. CDC stream lag 340s.",
        "additional_context": "Debezium CDC connector restarted due to out-of-memory container kill.",
        "was_ai_helpful": "Yes"
    },
    {
        "id": "INC-2026-002",
        "date": "2026-05-30 14:15",
        "service": "inventory-service",
        "title": "Stale inventory counts causing overselling",
        "severity": "CRITICAL",
        "environment": "Production",
        "root_cause": "Cache synchronization issue due to dropped pub/sub invalidation messages",
        "resolution": "Flushed inventory cache namespace and enabled strict TTL eviction policy (60s fallback).",
        "time_to_resolve_minutes": 20,
        "status": "RESOLVED",
        "error_logs": "Redis PUB/SUB subscriber disconnected unexpectedly, lost 120 stock delta messages.",
        "additional_context": "Network blip in AZ-1 caused silent subscriber detachment.",
        "was_ai_helpful": "Yes"
    }
]

# Initial Seed Memories for Hindsight Memory Bank
SEED_MEMORIES: List[Dict[str, Any]] = [
    {
        "id": "MEM-001",
        "incident_id": "INC-2026-011",
        "service": "payment-api",
        "title": "Payment API Database Connection Pool Exhaustion",
        "symptoms": "HTTP 503 errors, DB connection timeouts, active=100 idle=0, pool exhausted under high traffic.",
        "root_cause": "Database connection pool exhaustion caused by high concurrent checkout load and low default pool size (50).",
        "resolution": "Increased pool size to 100 in deployment config and restarted payment-api pods. Verified active/idle balance.",
        "outcome": "Resolved in 11 minutes. Error rate dropped from 48% to 0.01%.",
        "date": "2026-08-14",
        "tags": ["payment-api", "database", "connection-pool", "http-503", "postgresql", "hikari"],
        "confidence": 95,
        "runbook_ref": "RB-001"
    },
    {
        "id": "MEM-002",
        "incident_id": "INC-2026-007",
        "service": "payment-api",
        "title": "Payment API Connection Leak Saturation",
        "symptoms": "Checkout failures, HTTP 503, connection pool saturation, unclosed database handles.",
        "root_cause": "Database connection saturation caused by unclosed JDBC handles in refund webhook listener.",
        "resolution": "Hotfixed connection leak in exception handling block and rolled deployment pods to restore idle connections.",
        "outcome": "Resolved in 18 minutes. Restored normal transaction processing capacity.",
        "date": "2026-07-22",
        "tags": ["payment-api", "database", "connection-leak", "http-503", "pods-restart"],
        "confidence": 91,
        "runbook_ref": "RB-001"
    },
    {
        "id": "MEM-003",
        "incident_id": "INC-2025-091",
        "service": "payment-api",
        "title": "Payment API Timeout Spike Under Batch Load",
        "symptoms": "HTTP 503, gateway timeouts, database connection pool exhaustion during batch operations.",
        "root_cause": "Database connection exhaustion from invoice batch worker monopolizing the shared database pool.",
        "resolution": "Isolated batch worker pool into dedicated connection group and restarted payment-api instances.",
        "outcome": "Resolved in 14 minutes. Prevented background tasks from degrading real-time payments.",
        "date": "2025-11-05",
        "tags": ["payment-api", "database", "connection-pool", "batch-jobs", "timeout"],
        "confidence": 89,
        "runbook_ref": "RB-001"
    },
    {
        "id": "MEM-004",
        "incident_id": "INC-2026-018",
        "service": "auth-service",
        "title": "Authentication Service Redis Connection Pool Depletion",
        "symptoms": "Login failures, HTTP 504 Gateway Timeouts, Redis maxclients limit reached.",
        "root_cause": "Redis connection exhaustion in session cache due to leaked socket handles during client disconnects.",
        "resolution": "Purged idle stale Redis connections using CLIENT KILL and restarted auth-service workers.",
        "outcome": "Resolved in 15 minutes. Session creation restored to <20ms latency.",
        "date": "2026-09-02",
        "tags": ["auth-service", "redis", "connection-exhaustion", "session-cache", "login-failure"],
        "confidence": 93,
        "runbook_ref": "RB-002"
    },
    {
        "id": "MEM-005",
        "incident_id": "INC-2026-009",
        "service": "auth-service",
        "title": "OAuth Token Validation Latency Spike",
        "symptoms": "Token check timeouts, Redis pool wait time >2000ms, login degradation.",
        "root_cause": "Redis connection saturation and unindexed TTL scan operations.",
        "resolution": "Cleared stale connections and increased client connection timeout threshold.",
        "outcome": "Resolved in 12 minutes. 99th percentile response time normalized.",
        "date": "2026-08-01",
        "tags": ["auth-service", "redis", "oauth", "connection-pool"],
        "confidence": 90,
        "runbook_ref": "RB-002"
    },
    {
        "id": "MEM-006",
        "incident_id": "INC-2026-015",
        "service": "order-service",
        "title": "Order Service Database Query Latency",
        "symptoms": "Slow order creation, HTTP 504, full table scans on orders table, query execution >4000ms.",
        "root_cause": "Missing composite index on orders(user_id, status, created_at) causing sequential table scan.",
        "resolution": "Added concurrent composite index and tuned PostgreSQL work_mem allocation.",
        "outcome": "Resolved in 22 minutes. Query execution time reduced from 4800ms to 4ms.",
        "date": "2026-08-25",
        "tags": ["order-service", "database", "query-latency", "missing-index", "slow-query"],
        "confidence": 94,
        "runbook_ref": "RB-003"
    },
    {
        "id": "MEM-007",
        "incident_id": "INC-2026-020",
        "service": "notification-service",
        "title": "Notification Queue Consumer Lag",
        "symptoms": "Delayed email and SMS alerts, Kafka consumer lag >80k messages, backpressure.",
        "root_cause": "Message queue backlog in Kafka notification-events topic due to downstream SMS gateway throttle.",
        "resolution": "Scaled consumer deployment from 3 to 12 replicas and increased parallel batch workers.",
        "outcome": "Resolved in 16 minutes. Queue drained within 8 minutes of scaling.",
        "date": "2026-09-15",
        "tags": ["notification-service", "kafka", "queue-backlog", "consumer-scaling", "backpressure"],
        "confidence": 92,
        "runbook_ref": "RB-004"
    },
    {
        "id": "MEM-008",
        "incident_id": "INC-2026-012",
        "service": "inventory-service",
        "title": "Inventory Service Cache Inconsistency",
        "symptoms": "Incorrect stock availability, false out-of-stock banners, divergence between Redis and DB.",
        "root_cause": "Cache synchronization issue between Redis inventory mirror and MySQL following CDC connector crash.",
        "resolution": "Invalidated stale cache keys via redis-cli flush pattern and rebuilt cache from MySQL source.",
        "outcome": "Resolved in 13 minutes. Inventory accuracy restored across 100% of SKUs.",
        "date": "2026-08-18",
        "tags": ["inventory-service", "cache-sync", "redis", "invalidation", "cdc"],
        "confidence": 94,
        "runbook_ref": "RB-005"
    }
]

# Learned Runbooks (derived from persistent incident memory)
SEED_RUNBOOKS: List[Dict[str, Any]] = [
    {
        "id": "RB-001",
        "title": "Database Connection Exhaustion Troubleshooting",
        "service": "payment-api",
        "failure_pattern": "HTTP 503 / Database connection pool exhaustion",
        "symptoms": [
            "HTTP 503 Service Unavailable returned to clients",
            "Hikari / JDBC error: 'Pool exhausted: active=max idle=0'",
            "PostgreSQL error: 'remaining connection slots are reserved'",
            "Active DB connections near configured pool ceiling"
        ],
        "recommended_actions": [
            "Check current database connection pool utilization (active vs idle connections).",
            "Compare active connections against configured pool size in ConfigMap / application.yml.",
            "Inspect recent logs for unclosed connection handles or transaction leaks.",
            "Temporarily increase pool size (e.g. from 50 to 100) if database server CPU and RAM allow.",
            "Perform rolling restart of affected payment-api pods to immediately release orphaned connections.",
            "Monitor error rate and latency graphs post-restart to confirm full recovery."
        ],
        "source": "Learned from 3 previous incidents (INC-2026-011, INC-2026-007, INC-2025-091)",
        "times_used": 6,
        "success_rate": "100%",
        "last_updated": "2026-08-14"
    },
    {
        "id": "RB-002",
        "title": "Redis Connection Exhaustion Mitigation",
        "service": "auth-service",
        "failure_pattern": "Login failures / Redis maxclients reached",
        "symptoms": [
            "HTTP 504 Gateway Timeout on /oauth/token and /login",
            "Redis error: 'Too many connections / maxclients limit reached'",
            "Session validation latency >2000ms"
        ],
        "recommended_actions": [
            "Inspect active Redis client connections with `redis-cli client list`.",
            "Identify idle clients with high idle time (>300s) and kill them with `CLIENT KILL`.",
            "Check for unbounded connection pooling in auth-service configuration.",
            "Restart auth-service deployment to re-initialize clean connection pool.",
            "Verify Redis maxclients configuration and server file descriptor limits."
        ],
        "source": "Learned from 2 previous incidents (INC-2026-018, INC-2026-009)",
        "times_used": 4,
        "success_rate": "100%",
        "last_updated": "2026-09-02"
    },
    {
        "id": "RB-003",
        "title": "Database Slow Query & Index Contention Remediation",
        "service": "order-service",
        "failure_pattern": "Slow order creation / Query latency",
        "symptoms": [
            "Order checkout latency >3000ms",
            "High PostgreSQL pg_stat_activity count with state='active'",
            "Sequential scans on orders or order_items tables"
        ],
        "recommended_actions": [
            "Check pg_stat_activity for queries running longer than 1000ms.",
            "Run EXPLAIN ANALYZE on identified slow queries to check for sequential scans.",
            "Add missing composite index using `CREATE INDEX CONCURRENTLY`.",
            "Kill blocking lock transactions if deadlock is sustained.",
            "Verify p99 checkout response times drop below 200ms."
        ],
        "source": "Learned from 2 previous incidents (INC-2026-015, INC-2026-003)",
        "times_used": 3,
        "success_rate": "100%",
        "last_updated": "2026-08-25"
    },
    {
        "id": "RB-004",
        "title": "Message Queue Consumer Lag Remediation",
        "service": "notification-service",
        "failure_pattern": "Delayed notifications / Kafka consumer lag",
        "symptoms": [
            "Kafka consumer group lag rising exponentially",
            "Notification delivery delayed by >5 minutes",
            "Downstream vendor rate-limit errors in worker logs"
        ],
        "recommended_actions": [
            "Check Kafka consumer lag across all partitions using kafka-consumer-groups tool.",
            "Inspect worker logs for unhandled exception loops ('poison pills').",
            "Scale notification-service consumer replicas to match partition count.",
            "If poison pill found, route to dead-letter queue (DLQ) and commit offset.",
            "Monitor lag drainage rate until backlog returns to 0."
        ],
        "source": "Learned from 2 previous incidents (INC-2026-020, INC-2026-005)",
        "times_used": 3,
        "success_rate": "100%",
        "last_updated": "2026-09-15"
    },
    {
        "id": "RB-005",
        "title": "Cache Inconsistency & Desynchronization Recovery",
        "service": "inventory-service",
        "failure_pattern": "Incorrect stock availability / Cache divergence",
        "symptoms": [
            "Discrepancy between Redis cached stock and database ground truth",
            "False out-of-stock messages during product detail page rendering",
            "CDC stream connector errors or restart alerts"
        ],
        "recommended_actions": [
            "Verify CDC connector replication lag between MySQL and Redis.",
            "Flush desynchronized inventory key namespace via pattern matching in Redis.",
            "Trigger background inventory cache warm-up worker.",
            "Enable strict short TTL fallback (60s) during cache reconstruction.",
            "Validate random sample of SKUs between DB and cache to verify parity."
        ],
        "source": "Learned from 2 previous incidents (INC-2026-012, INC-2026-002)",
        "times_used": 4,
        "success_rate": "100%",
        "last_updated": "2026-08-18"
    }
]
