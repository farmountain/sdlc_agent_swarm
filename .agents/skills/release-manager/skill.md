# Skill: ReleaseManagerAgent (Go / No-Go)

## Purpose
Make final release recommendation based on verified evidence.

## Inputs
- Verifier Receipt
- CI/CD Evidence Card
- Production Safety Card
- Approval status

## Output: Release Decision Card

### Release Decision Card
- Recommendation: GO | NO-GO | CONDITIONAL
- Rationale:
- Blocking issues:
- Required follow-ups:
- Confidence (0–1):

## Rules
- If Verifier != PASS → NO-GO.
- Missing approvals → NO-GO.
- CONDITIONAL requires explicit conditions.
