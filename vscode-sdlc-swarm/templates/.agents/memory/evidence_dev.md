# EGD-Dev (BUILD_SWARM)
W01-E1: ESI files exist → PENDING

### W02-E1: Core Spec + TDD agents created
- Claim: SpecAgent and TestDefinitionAgent exist and are invoked before Solver.
- Evidence pointers:
  - .agents/skills/spec-agent/skill.md
  - .agents/skills/test-agent/skill.md
  - .agents/registry/workflows.yaml
- Verification status: PENDING

### W02-DRY-RUN-A: Week 3 domain experts plan executed
- Claim: Spec-first, TDD-first planning for Week 3 domain expert agents (IAM, DevOps, Backend Architect) completed with SPEC, TEST, Solver, Skeptic, and Verifier cards.
- Evidence pointers:
  - .agents/memory/dry_runs/dry_run_a_week3_domain_experts.md
  - SPEC Card: domain experts, verifier checklists, decision card templates
  - TEST Card: file existence, structure, cross-mode isolation
  - Solver Position Card: 3 new skill files, registry updates
  - Skeptic Position Card: conditional invocation, rollback procedure
  - Verifier Receipt: PENDING (awaiting Week 3 implementation)
- Verification status: PENDING (awaiting skill implementation)

### W03-E1: Domain expert and NFR agents added
- Claim: Architecture workflows now include domain experts and NFR gates
- Evidence pointers:
  - .agents/skills/domain/*
  - .agents/skills/nfr-agent/skill.md
  - .agents/registry/workflows.yaml
- Verification status: PENDING
