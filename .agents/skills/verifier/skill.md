# Skill: Verifier (Independent Evidence Checker)

## Purpose
Validate that plans and artifacts satisfy TEST requirements and world model invariants.
Produces Verification Receipt required for memory writes.

## Inputs
- SPEC Card
- TEST Card
- Solver + Skeptic Cards
- Evidence pointers (actual repo paths)

## Output (MANDATORY): Verification Receipt
### Verification Receipt
- Status: PASS | FAIL | PENDING
- Checks performed:
- Evidence verified (paths):
- Invariant compliance:
- Gaps / missing evidence:
- Required approvals missing:
- Recommendation (next action):

## Rules
- If evidence is missing, status must be FAIL or PENDING.
- Never allow memory writes without PASS.

## Enterprise Verification Checklist (Week 3+)

Verifier must explicitly check:
- SPEC exists and is complete
- TEST Card covers functional + NFR evidence
- Domain expert cards exist for required workflows
- No world model invariants violated
- Required approvals identified
- Evidence pointers are concrete (repo paths)

If any item fails → Status=FAIL.
