# Skill: DriftDetector

## Purpose
Detect drift from specs, tests, world models, or governance norms.

## Inputs
- SPEC Card
- TEST Card
- World model
- Recent Metrics Records
- Recent Experience Records

## Output: Drift Report

### Drift Report
- Drift type:
  - Spec drift
  - Test drift
  - Invariant erosion
  - Governance bypass
- Severity: LOW | MED | HIGH
- Evidence pointers:
- Recommended action:

## Rules
- HIGH drift requires immediate flag to Driver.
- Repeated MED drift escalates to HIGH.
- Record to appropriate ledger: `.agents/memory/drift_ledger.md` (BUILD_SWARM) or `.agents/user_memory/drift_ledger.md` (RUN_SDLC)
- Spec drift: Implementation deviates from SPEC Card
- Test drift: Tests no longer align with specs or reality
- Invariant erosion: Core assumptions or constraints violated
- Governance bypass: Quality gates skipped or weakened without justification
- HIGH drift blocks release until addressed
