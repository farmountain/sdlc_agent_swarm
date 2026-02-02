# Week 2: Agent Registry & Workflows

**Sprint Duration**: Weeks 1-3 (Foundation Phase)  
**Completion Date**: 2026-02-02  
**Status**: ✅ **COMPLETED**

---

## Sprint Overview

Week 2 completes the **Agent Registry & Workflow System**—defining all 38 agents across the SDLC spectrum and the workflows that orchestrate them.

### Goals
1. Define **complete agent registry** with all 38 agents (roles, permissions, capabilities)
2. Create **comprehensive workflow definitions** (15+ SDLC workflows from discovery to operations)
3. Document **agent integration points** (how agents call each other)
4. Establish **workflow patterns** (happy path, error handling, reflexion loops)
5. Validate **registry completeness** against 35 enterprise invariants

### Success Criteria
- [ ] agents.yaml with all 38 agents defined
- [ ] workflows.yaml with 15+ SDLC workflows
- [ ] Agent-to-agent integration documented
- [ ] Workflow specifications complete
- [ ] Evidence gates passing

---

## Agent Spectrum (38 Agents Across 7 Categories)

### Discovery & Product (5 agents)
1. **prd_generator** — Product requirements definition
2. **backlog_manager** — User story and sprint planning
3. **stakeholder_agent** — Requirements gathering and approval
4. **competitor_analyst** — Market research and competitive analysis
5. **tech_radar** — Technology trends and recommendations

### Architecture & Design (6 agents)
6. **solution_architect** — System design and architecture decisions
7. **domain_modeler** — Entity modeling and domain design
8. **nfr_agent** — Non-functional requirements
9. **threat_modeler** — Security threat modeling
10. **api_designer** — API design and contracts
11. **cost_estimator** — Cloud cost estimation

### Build (5 agents)
12. **code_generator** ⭐ — Production code generation ✅ SKILL EXISTS
13. **test_generator** ⭐ — Test generation ✅ SKILL EXISTS
14. **refactor_agent** — Code refactoring
15. **integration_builder** — Cross-service integration
16. **build_validator** — Build verification

### Test & Quality (7 agents)
17. **unit_test_runner** — Unit test execution
18. **integration_test_runner** — Integration test execution
19. **e2e_test_runner** — End-to-end test execution
20. **performance_tester** — Performance and load testing
21. **reliability_tester** — Chaos engineering
22. **test_data_factory** — Test data generation
23. **test_reporter** — Test result aggregation

### Security & Compliance (5 agents)
24. **iam_agent** ⭐ — Authentication, authorization, RBAC
25. **secrets_manager** — Secrets management and rotation
26. **compliance_checker** — Compliance validation
27. **sbom_generator** — Software Bill of Materials
28. **vulnerability_scanner** — Security vulnerability scanning

### Release & DevOps (5 agents)
29. **cicd_agent** ⭐ — CI/CD pipeline orchestration
30. **release_manager** ⭐ — Release planning and coordination
31. **deployment_manager** — Deployment execution
32. **rollback_orchestrator** — Automated rollback
33. **change_approver** — Change approval workflow

### Operations & Learning (5 agents)
34. **observability_agent** ⭐ — Logging, metrics, tracing, alerting
35. **sre_agent** — Site reliability engineering
36. **incident_responder** — Incident response
37. **postmortem_agent** — Postmortem analysis
38. **tech_debt_tracker** — Technical debt tracking

**Core 12 Legend**: ⭐ = Core 12 high priority | ✅ = Skill already exists

---

## Workflow Catalog (15+ Workflows)

### Discovery (2 workflows)
1. **plan_to_prd** — Stakeholder → PRD → Approval
2. **backlog_prioritization** — PRD → Backlog → Sprint plan

### Architecture (3 workflows)
3. **architecture_design** — PRD → Architecture → Design docs
4. **threat_modeling** — Architecture → Threat model → Security review
5. **cost_estimation** — Architecture → Cost estimate → Budget approval

### Build (4 workflows)
6. **build_feature** ✅ — PRD → Tests → Code → Build (IMPLEMENTED)
7. **generate_code** ✅ — Spec → Code → Review (IMPLEMENTED)
8. **refactor_code** ✅ — Debt → Refactor → Validation (IMPLEMENTED)
9. **build_integration** ✅ — API spec → Integration → Tests (IMPLEMENTED)

### Test (2 workflows)
10. **comprehensive_testing** — Code → All tests → Report
11. **chaos_testing** — NFRs → Chaos tests → Resilience

### Release (2 workflows)
12. **release_readiness** — Tests → Compliance → Approval
13. **deploy_to_production** — Approval → Deploy → Monitor

### Operations (2 workflows)
14. **incident_response** — Alert → Incident → Postmortem
15. **continuous_improvement** — Postmortem → Remediation → Validation

---

## Evidence Gates

### Gate 1: Registry Completeness
✅ **PASSED** (2026-02-02)
- [x] All 38 agents defined in agents.yaml
- [x] Each agent has: id, name, category, purpose, outputs, permissions, invokes, evidence_required, invariants_checked, skill_path
- [x] Core 12 agents marked with `core_12: true`
- [x] Agent categories align with 7 SDLC phases
- [x] 9 domain experts defined (TypeScript, Rust, Python, Backend, Frontend, Database, DevOps, CLI, Bundler)

### Gate 2: Workflow Coverage
✅ **PASSED** (2026-02-02)
- [x] 16 workflows defined in workflows.yaml (exceeds 15+ target)
- [x] Each workflow has: id, category, intent, trigger, steps, decision_points, outputs, evidence_gates, reflexion, approvals
- [x] Workflows cover full SDLC (Discovery, Architecture, Build, Test, Release, Operations)
- [x] Reflexion loops specified with triggers, max_iterations, and fallback strategies

### Gate 3: Integration Validation
✅ **PASSED** (2026-02-02)
- [x] Agent invocations are valid (no circular dependencies)
- [x] All workflow steps reference existing agents (38/38 agents used)
- [x] Decision points have clear approval criteria (19 decision points defined)
- [x] Evidence requirements are verifiable (validation report generated)

### Gate 4: Invariant Coverage
✅ **PASSED** (2026-02-02)
- [x] All 35 invariants have enforcing agents (100% coverage)
- [x] Security invariants mapped to security agents (iam_agent, secrets_manager, vulnerability_scanner, threat_modeler)
- [x] Compliance invariants validated in workflows (compliance_checker in WF-013)
- [x] No gaps in invariant coverage (29 unique agents enforce 35 invariants)

---

## Deliverables

### Registry Files (Completed)
- [x] `.agents/registry/agents.yaml` — 38 agent definitions ✅ (2026-02-02)
- [x] `.agents/registry/workflows.yaml` — 16 workflow definitions ✅ (2026-02-02)

### Documentation (Completed)
- [x] Agent integration patterns — See VALIDATION_REPORT.md (agent invocation matrix) ✅
- [x] Workflow execution protocol — 16 workflows with decision points and reflexion ✅
- [x] Error handling strategy — Reflexion loops in 15/16 workflows ✅
- [x] Evidence requirements mapping — Invariant-to-agent mapping complete ✅
- [x] Validation report — weeks/week-02/VALIDATION_REPORT.md ✅ (2026-02-02)

---

## Copilot Prompts

### Use These Prompts to Generate Week 2 Deliverables

**Prompt 1: Generate agents.yaml**
```
Generate .agents/registry/agents.yaml with all 38 SDLC agents.
Reference: weeks/week-02/README.md (agent list with purposes)
Include for each agent: id, name, category, purpose, outputs, permissions, invokes, evidence_required, invariants_checked, skill_path
Mark Core 12 agents with core_12: true
```

**Prompt 2: Generate workflows.yaml**
```
Generate .agents/registry/workflows.yaml with 15+ SDLC workflows.
Reference: weeks/week-02/README.md (workflow catalog)
Include for each workflow: id, name, category, trigger, steps, decision_points, outputs, evidence_gates, reflexion config
Map workflows to agents from agents.yaml
```

**Prompt 3: Validate Integration**
```
Validate .agents/registry/agents.yaml and workflows.yaml integration.
Check: valid agent references, permission alignment, invariant coverage (35), circular dependencies
Output: validation report with PASS/FAIL status
```

---

**Week 2 Status**: 🔄 **IN PROGRESS** (Target: 2026-02-07)  
**To Complete**: Use Copilot Prompts 1-3 to generate registry files and validate integration  
**Next Week**: Week 3 — Workflow refinement and happy path validation
