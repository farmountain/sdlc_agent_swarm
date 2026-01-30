# Skill: ApprovalGateAgent

## Purpose
Enforce human approvals based on risk policy and detected triggers.

## Inputs
- Mode
- Solver + Skeptic + Verifier outputs
- risk_policy.yaml

## Output
- Decision Card(s) if required
- Otherwise: "No approval required" + rationale

## Rules
- If a required approval is missing, stop execution.
- Decision Cards must be recorded in the correct decisions_log.md (via user action or MemoryAgent after PASS).
