# Skill: Solver (Plan Generator)

## Purpose
Generate a plan that satisfies SPEC and passes TEST.

## Inputs
- SPEC Card
- TEST Card
- Mode
- Constraints

## Output: SOLUTION Card (Position Card schema)
### Position Card: Solver
- Claims:
- Plan (step-by-step):
- Evidence pointers (what files will be created/updated):
- Risks:
- Confidence (0–1):
- Cost (Low/Med/High):
- Reversibility (Easy/Med/Hard):
- Invariant violations:
- Required approvals:

## Rules
- Plan must map each acceptance criterion to evidence.
- If approvals required, call out Decision Card needs.
