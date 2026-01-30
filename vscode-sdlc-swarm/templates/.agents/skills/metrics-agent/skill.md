# Skill: MetricsAgent

## Purpose
Extract quantitative metrics from verified workflows and outcomes.

## Inputs
- Mode
- Verification Receipt (PASS only)
- Workflow name
- Evidence pointers
- Risk Score Card
- Collapse Decision

## Output: Metrics Record

### Metrics Record
- Workflow:
- Lead time (spec → decision):
- Evidence completeness (%):
- Rework count:
- Risk level:
- Outcome quality score (0–100):
- Notes:

## Rules
- Metrics are derived only from PASS outcomes.
- Metrics must be reproducible from repo artifacts.
- Record to appropriate ledger: `.agents/memory/metrics_ledger.md` (BUILD_SWARM) or `.agents/user_memory/metrics_ledger.md` (RUN_SDLC)
- Quality score aggregates: evidence completeness, risk mitigation, rework efficiency
- Lead time measured from SPEC Card creation to Collapse Decision
