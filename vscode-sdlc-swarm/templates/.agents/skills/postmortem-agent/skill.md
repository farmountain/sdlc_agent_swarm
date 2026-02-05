# Skill: Postmortem Agent (Incident Analysis & Learning)

## Purpose
The Postmortem Agent is responsible for conducting blameless postmortem analyses after production incidents. Applies the 5-Whys technique, root cause analysis (RCA), and generates actionable remediation plans to prevent recurrence. Focuses on organizational learning, not blame.

**Core Principle:** "Learn from every incident—blameless postmortems drive continuous improvement."

---

## Core Responsibilities

1. **Incident Documentation**: Capture incident timeline, impact, and response actions
2. **Root Cause Analysis (RCA)**: Apply 5-Whys, Ishikawa diagrams to identify deep causes
3. **Blameless Culture**: Focus on systemic failures, not individual mistakes
4. **Remediation Planning**: Generate actionable follow-up items with owners and deadlines
5. **Knowledge Sharing**: Distribute postmortem reports to engineering, product, and leadership
6. **Pattern Detection**: Identify recurring incident patterns across multiple postmortems
7. **Metrics Tracking**: Track MTTR, MTBF, incident frequency, postmortem completion rate

---

## Inputs

1. **Incident Context**
   - Incident ticket (PagerDuty, Opsgenie, JIRA)
   - Timeline of events (detection, response, resolution)
   - Severity level (SEV-1, SEV-2, SEV-3)
   - Impact metrics (downtime, affected users, revenue loss)

2. **Monitoring Data**
   - Logs (application, infrastructure)
   - Metrics (CPU, memory, latency, error rate)
   - Traces (distributed tracing, Datadog APM)
   - Alerts (what fired, when)

3. **Response Actions**
   - Who responded (on-call engineer, escalations)
   - Actions taken (rollback, hotfix, scaling)
   - Communication (status page updates, internal comms)

---

## Output: Postmortem Report

### Postmortem Template

```markdown
# Postmortem: [Incident Title]

**Incident ID:** INC-2026-0205-001  
**Date:** 2026-02-05  
**Severity:** SEV-1 (Critical)  
**Duration:** 2 hours 15 minutes  
**Status:** Completed  
**Author:** @oncall-engineer  
**Reviewers:** @engineering-manager, @vp-engineering

---

## Executive Summary

[2-3 sentence summary of what happened, impact, and resolution]

**Example:**
On February 5, 2026, at 14:00 UTC, the production API experienced a complete outage lasting 2 hours 15 minutes. The root cause was an unhandled edge case in the database query optimizer that caused connection pool exhaustion under high load. The incident affected 100% of users and resulted in an estimated $50k revenue loss. The issue was resolved by deploying a hotfix that added connection pool monitoring and optimized the problematic query.

---

## Impact

| Metric | Value |
|--------|-------|
| **Duration** | 2 hours 15 minutes |
| **Users Affected** | 100% (all users) |
| **Requests Failed** | 1.2M requests |
| **Revenue Loss** | $50,000 (estimated) |
| **SLA Breach** | Yes (99.9% uptime SLA → 99.5% actual) |
| **Customer Complaints** | 47 support tickets, 23 social media mentions |

---

## Timeline

All times in UTC.

| Time | Event |
|------|-------|
| **14:00** | 🔴 **INCIDENT START** - API error rate spikes to 100% |
| **14:02** | PagerDuty alert fires: "API 5xx Error Rate >50%" |
| **14:05** | On-call engineer acknowledges alert, begins investigation |
| **14:10** | Database connections exhausted (max 100 connections reached) |
| **14:15** | Incident escalated to SEV-1, war room opened in Slack (#incident-war-room) |
| **14:20** | Attempted mitigation: Increased RDS connection pool size (failed - still at limit) |
| **14:30** | Root cause identified: Query "SELECT * FROM orders WHERE status='pending' AND created_at > NOW() - INTERVAL '1 hour'" causing connection leak |
| **14:45** | Emergency code review: Found bug in ORM query (missing connection.release()) |
| **15:00** | Hotfix PR created (#1234) with connection release fix |
| **15:15** | Hotfix deployed to production (rolling deployment) |
| **15:30** | Error rate drops to 0%, API fully recovered |
| **15:45** | Post-incident monitoring: No further issues detected |
| **16:15** | 🟢 **INCIDENT RESOLVED** - All systems green, status page updated |

---

## Root Cause Analysis (5-Whys)

### Problem Statement
API experienced complete outage due to database connection pool exhaustion.

### 5-Whys Analysis

1. **Why did the API go down?**
   - Database connection pool was exhausted (all 100 connections in use).

2. **Why was the connection pool exhausted?**
   - A specific query was leaking database connections (not releasing them after use).

3. **Why were connections leaking?**
   - The ORM query for fetching pending orders was missing the `connection.release()` call in the finally block.

4. **Why was the release() call missing?**
   - The code was refactored 2 weeks ago (PR #1100) and the finally block was accidentally removed during merge conflict resolution.

5. **Why didn't we catch this in testing?**
   - Integration tests didn't simulate high connection volume, and the connection leak only manifested under production load (>50 req/sec).

### Root Cause
Code regression during merge conflict resolution removed connection cleanup logic. Insufficient load testing failed to catch the issue before production deployment.

---

## Contributing Factors

1. **Insufficient Load Testing**: Integration tests only ran with 1-2 concurrent users, not production-scale load (50-100 req/sec).

2. **No Connection Pool Monitoring**: No alerts for "database connections near max" before exhaustion.

3. **Code Review Gap**: Merge conflict resolution (PR #1100) not reviewed carefully enough; `finally` block deletion not caught.

4. **Deployment Timing**: Deployed Friday afternoon (risky deployment window; teams understaffed on weekends).

---

## What Went Well

1. **Fast Detection**: Alert fired within 2 minutes of incident start (excellent monitoring).

2. **Clear Communication**: War room opened immediately, status page updated within 10 minutes.

3. **Effective Escalation**: Incident escalated to SEV-1 promptly; right people in war room.

4. **Quick Resolution**: Hotfix deployed within 75 minutes of detection (fast turnaround for critical fix).

5. **No Data Loss**: Database remained consistent; no user data lost or corrupted.

---

## What Went Wrong

1. **Long Detection → Resolution Time**: 2h 15min is too long for SEV-1 incident (target: <30 min).

2. **Blind Debugging**: Wasted 30 minutes trying mitigation strategies (increasing pool size) before identifying root cause.

3. **No Rollback Plan**: Didn't consider rollback to previous version as first mitigation step.

4. **Risky Deployment Window**: Deployed code change on Friday afternoon without adequate load testing.

---

## Action Items (Remediation Plan)

| ID | Action | Owner | Deadline | Status |
|----|--------|-------|----------|--------|
| **AI-001** | Add database connection pool monitoring alert (threshold: 80% utilization) | @sre-team | 2026-02-07 | ✅ Done |
| **AI-002** | Improve load testing: Add 100 req/sec stress test to CI/CD | @qa-team | 2026-02-12 | 🔄 In Progress |
| **AI-003** | Add connection leak detection to integration tests | @backend-team | 2026-02-10 | 📋 To Do |
| **AI-004** | Code review checklist: Explicitly verify finally blocks in resource management | @eng-manager | 2026-02-06 | ✅ Done |
| **AI-005** | Deploy only Mon-Thu before 2pm PT (freeze risky Friday deployments) | @eng-manager | 2026-02-06 | ✅ Done (policy updated) |
| **AI-006** | Create runbook: "Database Connection Pool Exhaustion" | @sre-team | 2026-02-09 | 📋 To Do |
| **AI-007** | Implement automatic rollback on 5xx error rate >10% for 5 minutes | @devops-team | 2026-02-20 | 📋 To Do |
| **AI-008** | Postmortem review meeting with engineering team | @eng-manager | 2026-02-08 | 📅 Scheduled |

---

## Lessons Learned

1. **Always Test Under Load**: Integration tests must simulate production-scale traffic (50-100 req/sec).

2. **Monitor Resource Exhaustion Early**: Alert on 80% threshold, not 100% (prevent incidents, not just detect them).

3. **Merge Conflicts Are High-Risk**: Require extra scrutiny during code review, especially for resource management code.

4. **Rollback Is a Valid Mitigation**: Default to rollback first, debug later (minimize downtime).

5. **Deployment Windows Matter**: Avoid Friday afternoon deployments; Mon-Thu before 2pm PT only.

---

## Pattern Analysis (Cross-Incident Trends)

This is the **3rd connection pool exhaustion incident** in the past 6 months:

| Date | Incident | Root Cause |
|------|----------|------------|
| 2025-08-10 | INC-2025-0810-002 | Redis connection leak |
| 2025-11-05 | INC-2025-1105-001 | PostgreSQL connection leak (same pattern) |
| 2026-02-05 | **INC-2026-0205-001** | PostgreSQL connection leak (same pattern, different query) |

**Recommendation:** Conduct deeper architectural review of connection management patterns across all services. Consider using connection pool libraries with automatic leak detection (e.g., `pg-pool` with leak warnings).

---

## Appendix: Supporting Evidence

### Logs (Redacted)

```
2026-02-05 14:00:15 ERROR [ConnectionPool] Connection pool exhausted (100/100 connections in use)
2026-02-05 14:00:16 ERROR [API] Failed to acquire connection: timeout after 5000ms
2026-02-05 14:00:17 ERROR [API] 500 Internal Server Error: Database connection unavailable
```

### Metrics (Datadog Dashboard)

- **API Error Rate:** Spiked from 0.1% → 100% at 14:00 UTC
- **Database Connections:** Steady climb from 20 → 100 over 30 minutes before incident
- **p99 Latency:** Increased from 200ms → 5000ms (timeout) at 14:00 UTC

### Hotfix Code (PR #1234)

```typescript
// BEFORE (broken)
async function fetchPendingOrders() {
  const connection = await pool.connect();
  const result = await connection.query(
    "SELECT * FROM orders WHERE status='pending' AND created_at > NOW() - INTERVAL '1 hour'"
  );
  return result.rows;
  // BUG: Missing connection.release()
}

// AFTER (fixed)
async function fetchPendingOrders() {
  const connection = await pool.connect();
  try {
    const result = await connection.query(
      "SELECT * FROM orders WHERE status='pending' AND created_at > NOW() - INTERVAL '1 hour'"
    );
    return result.rows;
  } finally {
    connection.release();  // FIX: Always release connection
  }
}
```

---

## Sign-Off

| Role | Name | Date |
|------|------|------|
| **Author** | @oncall-engineer | 2026-02-06 |
| **Reviewed** | @engineering-manager | 2026-02-06 |
| **Approved** | @vp-engineering | 2026-02-06 |

**Distribution:** Engineering All-Hands, Product Team, Executive Leadership

---

**Postmortem Status:** ✅ Completed  
**Follow-Up Meeting:** 2026-02-08 @ 10:00 AM PT (Calendar invite sent)

---

**Related Documents:**
- [Incident Response Runbook](../runbooks/incident-response.md)
- [On-Call Playbook](../runbooks/on-call-playbook.md)
- [Previous Postmortem: INC-2025-1105-001](./2025-11-05-connection-leak.md)
```

---

## Integration with SDLC Swarm

### Position Card Output

```yaml
position_card:
  agent: postmortem
  
  claims:
    - "Conducted blameless postmortem for SEV-1 incident (2h 15min outage)"
    - "Applied 5-Whys RCA: Root cause = missing connection.release() after refactor"
    - "Generated 8 actionable remediation items with owners and deadlines"
    - "Identified pattern: 3rd connection leak incident in 6 months (systemic issue)"
    - "MTTR: 135 minutes (target: <30 min for SEV-1; needs improvement)"
  
  plan:
    - "Action items cover prevention (load testing), detection (monitoring), response (runbooks)"
    - "Policy change: No Friday deployments (reduce weekend incident risk)"
    - "Follow-up: Architecture review of connection management patterns"
    - "Knowledge sharing: Postmortem distributed to engineering, product, exec teams"
  
  evidence_pointers:
    - "projects/my-app/postmortems/2026-02-05-api-outage.md"
    - "projects/my-app/docs/RUNBOOK.md"
    - "projects/my-app/docs/incident-response-checklist.md"
  
  confidence: 0.90
  risks:
    - "Action items not tracked (use JIRA tickets for accountability)"
    - "Pattern analysis suggests deeper architectural issue (needs prioritization)"
```

---

## Rules (Non-Negotiable)

1. **Blameless Always**: Focus on systemic failures, not individual blame

2. **Timeline Required**: Detailed timeline (minute-by-minute for SEV-1, hourly for SEV-2)

3. **5-Whys Mandatory**: Apply 5-Whys technique to every postmortem (identify root cause)

4. **Action Items Tracked**: Every action item has owner, deadline, and status tracking

5. **Distribution Required**: Share postmortem with engineering, product, and exec teams

6. **Follow-Up Meeting**: Schedule postmortem review meeting within 3 days of incident

7. **Pattern Detection**: Analyze cross-incident trends (recurring issues = systemic problems)

---

## Skills Validated

- **C7: Reliability** - Incident analysis, MTTR reduction, failure prevention
- **C10: Continuous Learning** - Knowledge capture, organizational learning

---

## Invariants Satisfied

- **INV-037:** Auditability (incident documentation, timeline tracking)
- **INV-038:** Knowledge management (postmortems as learning artifacts)
- **INV-039:** Operational excellence (blameless culture, continuous improvement)

---

**End of Postmortem Agent Skill**
