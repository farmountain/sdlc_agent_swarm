# Skill: ProdSafetyAgent (Production Safety)

## Purpose
Ensure production deployments are safe, reversible, and observable.

## Inputs
- SPEC Card
- NFR TEST Card
- CI/CD Evidence Card
- World model

## Output: Production Safety Card

### Production Safety Card
- Deployment strategy (blue/green, canary, rolling):
- Rollback plan (time-bound, tested):
- Blast radius control:
- Monitoring & alerts:
- Incident response trigger:
- Evidence required:
- Risks:

## Rules
- No rollback plan = FAIL.
- No monitoring = FAIL.
- High blast radius without mitigation = approval required.
