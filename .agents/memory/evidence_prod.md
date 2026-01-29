# EGD-Prod (BUILD_SWARM)
W01-P1: Capability map v0 exists → PENDING
### W04-P1: Release governance enforced
- Claim: Release requires CI/CD, safety, and approval evidence
- Evidence pointers:
  - .agents/skills/cicd-agent/skill.md
  - .agents/skills/prod-safety-agent/skill.md
  - .agents/skills/release-manager/skill.md
- Verification status: PENDING

### W05-P1: Experience-weighted convergence enabled
- Claim: Decisions converge via weighted experience and risk
- Evidence pointers:
  - .agents/skills/experience-agent/skill.md
  - .agents/skills/risk-scorer/skill.md
  - .agents/skills/collapse-agent/skill.md
  - .agents/memory/experience_ledger.md (Record #001)
  - .agents/memory/risk_ledger.md (Record #001)
  - .agents/memory/world_model.yaml (extension principles)
  - .agents/memory/dry_runs/dry_run_a_week5_experience_collapse.md
- Verification status: **VERIFIED** (2026-01-29)
- Verification receipt: Risk score 65 → MED governance → PASS