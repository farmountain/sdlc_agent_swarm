# Skill: SDLC Swarm Driver (Entry Point)

## Purpose
Single orchestrator for a spec-first, TDD-first, evidence-gated SDLC swarm.

## Inputs (REQUIRED)
- Mode: BUILD_SWARM | RUN_SDLC
- Workflow: must match .agents/registry/workflows.yaml
- Objective
- Constraints
- EvidencePointers (repo paths)

## Mode Routing (MANDATORY)
- BUILD_SWARM:
  - World model: .agents/memory/world_model.yaml
  - Evidence: .agents/memory/evidence_dev.md, evidence_prod.md
  - Decisions: .agents/memory/decisions_log.md

- RUN_SDLC:
  - World model: .agents/user_memory/world_model.yaml
  - Evidence: .agents/user_memory/evidence_dev.md, evidence_prod.md
  - Decisions: .agents/user_memory/decisions_log.md

Never mix modes.

## Position Card Schema (MANDATORY)

### Position Card: <Role>
- Claims:
- Plan:
- Evidence pointers:
- Risks:
- Confidence (0–1):
- Cost (Low/Med/High):
- Reversibility (Easy/Med/Hard):
- Invariant violations:
- Required approvals:

## Operating Rules
1. Spec must exist before execution.
2. Tests (evidence criteria) must exist before build.
3. No memory writes without verifier receipt.
4. High-risk actions require Decision Card + approval.
5. No hidden state. Repo is source of truth.

## Week 1 Behavior
- Only Driver Position Card is allowed.
- Verifier assumed missing → all verification = PENDING.
