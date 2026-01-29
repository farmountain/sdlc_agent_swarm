# Dry Run A — BUILD_SWARM: Week 3 Domain Experts Plan

**Date:** 2026-01-29  
**Mode:** BUILD_SWARM  
**Workflow:** plan_to_prd  
**Objective:** Define Week 3 plan to add Domain Experts (IAM, DevOps) and strengthen evidence gates

---

## SPEC Card: Week 3 Domain Experts + Evidence Gates

**Scope:**
- Add 3 domain expert skill agents: security-iam, devops-platform, backend-architect
- Strengthen verifier checklists with domain-specific invariants
- Implement decision card templates for approval gates
- Update registries to wire domain experts into workflows

**Non-goals:**
- Implement domain logic; only define expert skills in Markdown
- No extension code generation
- No production deployment changes

**Inputs:**
- Current architecture: .agents/registry/agents.yaml, workflows.yaml
- Quality gates: capabilities/quality_gates.md
- World model: .agents/memory/world_model.yaml
- Week 2 evidence: .agents/memory/evidence_dev.md

**Outputs:**
- Domain expert skill files (.agents/skills/domain/*)
- Updated agents.yaml with domain experts wired in
- Enhanced verifier checklist templates
- Decision card template in collapse_policy.md

**Invariants (from world_model.yaml):**
- Never mix BUILD_SWARM and RUN_SDLC memory paths
- All skill agents must have Position Card output
- Approvals required before memory writes
- Domain expert tasks must reference quality gates

**Failure modes:**
- Domain experts not invoked → skills remain unused
- Invariants missing from checklists → verification gaps
- Decision cards not enforced → approval bypass risk

**Acceptance criteria (high-level):**
1. All 3 domain expert skills exist and are documented
2. Verifier checklist includes domain-specific validation rules
3. Workflows reference domain experts conditionally (based on objective)
4. Evidence pointers in .agents/memory/evidence_dev.md updated

**Required approvals:**
- Security review of IAM skill scope
- None (Week 3 plan itself is governance)

**Evidence pointers to create next (files to be added):**
- .agents/skills/domain/security-iam/skill.md
- .agents/skills/domain/devops-platform/skill.md
- .agents/skills/domain/backend-architect/skill.md
- .agents/verifier/checklist_templates.md (new)

---

## TEST Card: Week 3 Domain Experts + Evidence Gates

**Test objectives:**
1. Verify domain expert skills are correctly defined and referenced
2. Verify verifier checklist includes domain-specific rules
3. Verify decision cards are enforced before memory writes
4. Verify no cross-mode memory contamination

**Evidence required (list of repo artifacts, logs, checklists):**
- skill.md files for all 3 domain experts in .agents/skills/domain/*/
- Updated agents.yaml lists domain experts with correct types
- Updated workflows.yaml conditionally invokes domain experts
- Verifier checklist_templates.md contains domain-specific validation rules
- Decision card log entries in .agents/memory/decisions_log.md (from dry run executions)
- No entries in .agents/user_memory/ (cross-mode contamination check)

**Verification method (how verifier will check):**
- File existence check: all skill.md files present
- YAML structure validation: agents.yaml and workflows.yaml parse correctly
- Grep check: verifier checklist contains IAM, DevOps, architecture invariants
- Memory integrity: no BUILD_SWARM artifacts in user_memory paths
- Decision card presence: at least one approval gate invocation recorded

**Negative tests / falsifiers (what would prove failure):**
- Any skill.md file missing → FAIL
- agents.yaml still missing domain_experts key → FAIL
- Verifier checklist empty or missing domain rules → FAIL
- Any file created in .agents/user_memory/ during BUILD_SWARM execution → FAIL
- Approval gate not invoked before memory write → FAIL

**Risk-triggered approval tests (when Decision Card is mandatory):**
- Domain expert scope expansion beyond IAM/DevOps/Backend → requires decision card
- Changes to invariant set → requires decision card
- Changes to approval gate logic → requires decision card

---

## Position Card: Solver

**Claims:**
- Domain experts can be added without refactoring existing agents
- Verifier can be strengthened incrementally
- Approval gates integrate cleanly into memory-write path

**Plan (step-by-step):**
1. Create .agents/skills/domain/ subdirectory structure
2. Write security-iam/skill.md (IAM invariants, approval triggers, evidence rules)
3. Write devops-platform/skill.md (deployment gates, infrastructure invariants)
4. Write backend-architect/skill.md (architectural invariants, domain patterns)
5. Update .agents/registry/agents.yaml to reference domain experts under new key
6. Create .agents/verifier/checklist_templates.md with domain-specific rules
7. Update workflows.yaml to conditionally invoke domain experts
8. Record evidence pointers in evidence_dev.md

**Evidence pointers (what files will be created/updated):**
- .agents/skills/domain/security-iam/skill.md (new)
- .agents/skills/domain/devops-platform/skill.md (new)
- .agents/skills/domain/backend-architect/skill.md (new)
- .agents/registry/agents.yaml (updated)
- .agents/verifier/checklist_templates.md (new)
- .agents/registry/workflows.yaml (updated)
- .agents/memory/evidence_dev.md (appended)

**Risks:**
- Domain expert scope creep (mitigation: freeze skill boundaries)
- Verifier checklists become too complex (mitigation: modular templates)
- Approval gate logic duplicates existing checks (mitigation: centralize in collapse_policy.md)

**Confidence:** 0.85 (clear scope, low coupling to existing agents)

**Cost:** Medium (3 new skills + 2 template files)

**Reversibility:** Easy (all new files, non-breaking registry updates)

**Invariant violations:** None identified

**Required approvals:** None (governance update, not production change)

---

## Position Card: Skeptic

**Claims (what is wrong / missing):**
- Solver doesn't define *when* domain experts are invoked (conditional logic missing)
- Verifier checklist templates may be too prescriptive (brittleness risk)
- Decision card enforcement not explicitly tested in plan
- No rollback procedure if domain expert skill proves incompatible

**Plan (how to fix or strengthen):**
1. Add "invocation rules" to each domain expert skill (e.g., "invoked if objective contains 'security'")
2. Make verifier checklist modular with optional rules
3. Add decision card enforcement test to dry run
4. Document rollback procedure (skill disable via agents.yaml)
5. Add "soft launch" flag to domain expert definitions

**Evidence pointers needed:**
- Conditional invocation rules in each domain expert skill.md
- Verifier checklist with [REQUIRED] vs [OPTIONAL] markers
- Test case showing decision card being issued and respected
- Rollback documentation in .agents/docs/

**Risks (top 5):**
1. Domain experts become single point of failure (no fallback)
2. Verifier checklists diverge from world model (consistency risk)
3. Conditional invocation logic is implicit (hard to audit)
4. Decision cards issued but ignored (enforcement gap)
5. User mode pollutes BUILD_SWARM memory due to misconfiguration

**Confidence:** 0.70 (many assumptions about invocation and enforcement)

**Cost:** Medium (adds defensive checks and documentation)

**Reversibility:** Medium (some logic changes may be deeply coupled)

**Invariant violations:** Potential risk of cross-mode contamination if conditional logic is flawed

**Required approvals:** Governance review of conditional invocation rules

---

## Verification Receipt: Week 3 Domain Experts Plan

**Status:** PENDING (dry run executed; awaiting actual skill implementation)

**Checks performed:**
- ✓ Scope clarity: Week 3 plan is well-defined and scoped
- ✓ TEST coverage: test card covers file existence, structure, and cross-mode isolation
- ✓ Solver + Skeptic balance: plan is strengthened by skeptic feedback
- ⚠ Conditional invocation logic: not yet formally tested
- ⚠ Decision card enforcement: not yet proven in workflow

**Evidence verified (paths):**
- .agents/registry/agents.yaml (exists, Week 2 format)
- .agents/registry/workflows.yaml (exists, Week 2 format)
- .agents/memory/world_model.yaml (assumed to exist)
- capabilities/quality_gates.md (assumed to exist)

**Invariant compliance:**
- ✓ No cross-mode contamination in this plan
- ✓ All agents follow Position Card schema
- ⚠ Conditional invocation not yet formalized in invariants

**Gaps / missing evidence:**
- Domain expert skill files not yet created (expected for Week 3)
- Verifier checklist templates not yet instantiated
- Conditional invocation rules not yet formalized
- Rollback procedure documentation missing

**Required approvals missing:**
- None for plan itself; governance review recommended before implementation

**Recommendation (next action):**
1. Record this dry run in evidence_dev.md as W02-DRY-RUN-A
2. Proceed to implement domain expert skills in Week 3
3. Formalize conditional invocation rules before full rollout
4. Add rollback and enforcement tests to Verifier checklist

---

## Memory Write Status

**Verifier Receipt Status:** PENDING  
→ MemoryAgent **will not write** until receipt is PASS

**Why PENDING:**
- Domain expert skill files not yet created (implementation deferred to Week 3)
- Conditional invocation logic not yet tested
- Verifier checklist templates not yet validated

**Action:** Record dry run evidence only; implementation follows in Week 3.
