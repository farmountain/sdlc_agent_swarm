# Skill: DashboardAgent (Org Visibility)

## Purpose
Generate executive- and engineer-friendly summaries from repo artifacts.

## Inputs
- Mode
- Metrics ledger
- Confidence ledger
- Risk ledger
- Drift ledger

## Output: Dashboard Snapshot

### Dashboard Snapshot
- Overall quality score:
- Risk distribution:
- Confidence trend:
- Drift alerts:
- Release readiness summary:
- Links to evidence:

## Rules
- Dashboards are read-only views.
- No interpretation without evidence links.
- Generate snapshot to: `.agents/memory/dashboard_snapshot.md` (BUILD_SWARM) or `.agents/user_memory/dashboard_snapshot.md` (RUN_SDLC)
- Overall quality = weighted average of recent Metrics Records
- Risk distribution = count and severity from risk ledger
- Confidence trend = moving average of calibration deltas
- Drift alerts = summary of HIGH and repeated MED drifts
- All claims must link to source artifacts
