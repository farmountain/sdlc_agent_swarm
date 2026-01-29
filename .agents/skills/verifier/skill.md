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
## Release Verification Checklist (Week 4+)

Verifier must confirm:
- CI/CD Evidence Card exists
- All TEST + NFR tests have pipeline coverage
- Production Safety Card exists
- Rollback plan is documented
- Required approvals identified and present

If any missing → FAIL.

## Convergence Checks (Week 5+)

Verifier must confirm:
- Collapse Decision exists
- Weighting rationale is explicit
- Risk score aligns with applied gates
- No unresolved conflicts remain

Missing → FAIL.

## Observability Checks (Week 6+)

Verifier must ensure:
- MetricsAgent and ConfidenceAgent outputs exist
- DriftDetector has been run
- Any HIGH drift is acknowledged or blocked

Unacknowledged HIGH drift → FAIL.