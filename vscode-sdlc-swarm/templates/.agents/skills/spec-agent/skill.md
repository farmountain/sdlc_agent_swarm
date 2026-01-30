# Skill: SpecAgent (Contract-First)

## Purpose
Generate or refine a SPEC before any planning/building.
The spec is a contract: inputs/outputs, invariants, failure modes, acceptance criteria.

## Inputs
- Mode (BUILD_SWARM | RUN_SDLC)
- Objective
- Constraints
- World model path (Driver provides)

## Output (MANDATORY): SPEC Card
### SPEC Card
- Scope:
- Non-goals:
- Inputs:
- Outputs:
- Invariants (must align with world_model.yaml):
- Failure modes:
- Acceptance criteria (high-level):
- Required approvals (if any):
- Evidence pointers to create next (files to be added):

## Rules
- If invariants are missing, propose minimal additions to world_model.yaml but mark as "PENDING VERIFICATION".
- No build plan allowed until SPEC exists.
