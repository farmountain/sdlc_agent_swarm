# Week 02 — Core Spec & TDD Agents (Dual Loop)

## Goals
Implement the minimum agent set to enforce:
SPEC → TEST → PLAN → VERIFY → RECORD
without coding.

## Deliverables
- Skill agents: spec-agent, test-agent, solver, skeptic, verifier, memory-agent, approval-gate
- Updated workflows to include SPEC and TEST steps
- EGD ledgers updated with Week 2 entries

## DoD
- Driver refuses to proceed if Spec or Tests are missing
- Verifier outputs a Verification Receipt
- MemoryAgent writes only when receipt is present
- RUN_SDLC and BUILD_SWARM remain isolated

## Dry Runs
A) BUILD_SWARM: define Week 3 scope as Spec+Tests
B) RUN_SDLC: create Spec+Tests for "Azure AD SSO feature"
