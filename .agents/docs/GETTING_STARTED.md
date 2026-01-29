# Getting Started with SDLC Agent Swarm

## Quick Start

### 1. Understand the Architecture

Start here:
- [ARCHITECTURE.md](ARCHITECTURE.md) — System design & flow
- [WORKFLOWS.md](WORKFLOWS.md) — Available workflows (plan_to_prd, code_change, infra_deploy, security_review)
- [AGENT_ROLES.md](AGENT_ROLES.md) — What each agent does

### 2. Directory Structure

```
.agents/
├── registry/                    # Skill map + workflow definitions
│   ├── agents.yaml             # All agent roles
│   ├── workflows.yaml          # SDLC recipes
│   ├── risk_policy.yaml        # Risk categorization
│   └── collapse_policy.md      # Consensus rules
├── driver/                      # Entry point
│   ├── skill.md                # Driver agent
│   ├── runbook.md              # Protocol steps
│   └── approval.md             # Approval gates
├── memory/                      # Enterprise state
│   ├── world_model.yaml        # Requirements & invariants
│   ├── evidence_log.md         # Evidence references
│   ├── decisions_log.md        # Decision history
│   └── snapshots/              # Timestamped records
├── skills/                      # Agents (TBD)
│   ├── solver/
│   ├── skeptic/
│   ├── minimalist/
│   ├── verifier/
│   ├── domain/
│   │   ├── backend-architect/
│   │   ├── frontend-architect/
│   │   ├── devops-platform/
│   │   ├── security-iam/
│   │   └── data-architect/
│   ├── compliance-risk/
│   └── memory-agent/
└── docs/                        # (This folder)
    ├── ARCHITECTURE.md
    ├── WORKFLOWS.md
    ├── AGENT_ROLES.md
    └── GETTING_STARTED.md
```

### 3. Core Files (TBD)

These files will be created in Phase 2. For now, context is documented:

| File | Purpose |
|------|---------|
| `.agents/registry/agents.yaml` | Agent registry (role, type, permissions) |
| `.agents/registry/workflows.yaml` | Workflow definitions (SDLC recipes) |
| `.agents/registry/collapse_policy.md` | Weighted consensus rules |
| `.agents/driver/skill.md` | Driver agent (orchestrator) |
| `.agents/driver/runbook.md` | Driver protocol (step-by-step) |
| `.agents/driver/approval.md` | Approval gate definitions |
| `.agents/memory/world_model.yaml` | Enterprise requirements & invariants |
| `.agents/skills/*/skill.md` | Individual agent skills |

---

## Usage Examples (How You'll Use It)

### Example 1: Generate a PRD

**Prompt**:
```
Use Driver. Workflow: plan_to_prd.
Product: "Real-time notification service"
Constraints: "Sub-100ms latency, multi-tenant, HIPAA compliant"
Timeline: "Q2 2026"
```

**Driver will**:
1. Look up `plan_to_prd` workflow
2. Call: Solver → Backend Architect → Skeptic → Verifier → Memory Agent
3. Collect Position Cards from each agent
4. Apply collapse policy
5. Generate Decision Card with:
   - PRD summary
   - Risk assessment (HIPAA compliance checklist)
   - Rollback plan (if needed)
   - Approval gate: `prd_signoff`
6. Wait for approval

**Output**:
```
NEXT 3 ACTIONS:
1. PRD signoff required (Product Manager + Tech Lead)
2. Schedule architecture review with backend team
3. Update roadmap with dependencies

APPROVAL REQUIRED: YES (prd_signoff)

EVIDENCE NEEDED:
- HIPAA compliance checklist signed
- Latency performance assumptions validated
- Multi-tenancy isolation spec confirmed
```

---

### Example 2: Plan a Code Change

**Prompt**:
```
Use Driver. Workflow: code_change.
Objective: "Add request deduplication to order service"
Constraints: "No new external dependencies, backward compatible"
Risk tolerance: "Low"
```

**Driver will**:
1. Call: Solver → Skeptic → Minimalist → Verifier
2. Collect Position Cards
3. Apply collapse policy
4. Produce implementation plan

**Output**:
```
IMPLEMENTATION PLAN:

Files to change:
  - order_service/deduplicate.ts (new)
  - order_service/handler.ts (modify)
  - order_service/test/deduplicate.test.ts (new)

Changes per file:
  - deduplicate.ts: 50 lines (cache + idempotency logic)
  - handler.ts: 8 lines (call deduplication middleware)
  - test: 100 lines (unit + integration tests)

Test plan:
  1. Unit tests for deduplicate logic (collision detection)
  2. Integration test: concurrent requests → single DB write
  3. Load test: 1K concurrent dedup requests
  4. Rollback test: revert middleware, service works as before

Rollback: Easy (revert 2 files, zero data risk)

NEXT 3 ACTIONS:
1. Create feature branch: feature/dedup-order-service
2. Implement deduplicate.ts (smallest piece first)
3. Add unit tests + load test

APPROVAL REQUIRED: NO (merge approval only needed for core modules)
```

---

### Example 3: Deploy to Production

**Prompt**:
```
Use Driver. Workflow: infra_deploy.
Target: "Deploy v2 of notification service to prod (us-east + eu-west)"
Scope: "Multi-region, blue-green deployment"
Assumptions: "Current load: 10K req/s, target: 15K req/s"
```

**Driver will**:
1. Call: DevOps Platform Architect → Skeptic → Verifier → Compliance-Risk → Memory Agent
2. Collect Position Cards with deep infra validation
3. Apply collapse policy
4. Generate Decision Card with high governance

**Output**:
```
DEPLOYMENT RUNBOOK:

Phase 1: Blue-Green Setup
  1. Spin up v2 in blue environment (us-east, eu-west)
  2. Run smoke tests (10 min)
  3. Verify: canary metrics, logs, traces

Phase 2: Canary (1% traffic)
  1. Route 1% traffic to v2 (blue)
  2. Monitor: latency, error rate, memory
  3. Wait 30 min (canary gate)
  4. Validate: no regressions

Phase 3: Staged Rollout
  1. 10% traffic to v2
  2. 30% traffic to v2
  3. 100% traffic to v2

Monitoring checklist:
  ✅ P99 latency < 100ms
  ✅ Error rate < 0.1%
  ✅ Memory usage stable
  ✅ All audit logs flowing

Rollback procedure:
  1. Route 100% back to v1 (green)
  2. Kill v2 (blue)
  3. Alert SRE team
  Expected RTO: 5 min

Risk assessment: YELLOW (canary gate required)

NEXT 3 ACTIONS:
1. Approval required: prod_deploy gate
2. Schedule deployment window: 2026-02-15 02:00-04:00 UTC
3. Brief on-call SRE + incident commander

APPROVAL REQUIRED: YES (prod_deploy)
  Approvers: DevOps Lead, On-call SRE
  SLA: Immediate (high priority)
```

---

### Example 4: Security Review

**Prompt**:
```
Use Driver. Workflow: security_review.
Change: "Add tenant isolation to analytics queries"
Data touched: "Customer revenue data (PII), query logs"
Compliance: "SOC2 Type II, GDPR"
```

**Driver will**:
1. Call: Security IAM Architect → Skeptic → Verifier → Compliance-Risk → Memory Agent
2. Deep security validation
3. Generate security Decision Card

**Output**:
```
SECURITY ASSESSMENT: CONDITIONAL (remediation required)

Findings:
  ✅ Tenant isolation enforced at query layer (ABAC)
  ✅ AuthZ gate on analytics endpoint
  ❌ Audit logging missing for failed auth attempts
  ❌ Revenue data classified as PII, but retention policy not specified
  ⚠️  Query timeout not enforced (DoS risk)

Remediation (blocking):
  1. Add audit logging for all failed auth attempts
  2. Define retention policy for PII (recommend: 90 days)
  3. Set query timeout to 30 sec

Remediation (recommended):
  1. Add data encryption at rest (current: plaintext in cache)
  2. Rate limit analytics queries (per-tenant)

Risk: RED → YELLOW (after remediation)

NEXT 3 ACTIONS:
1. Implement audit logging (6 hours)
2. Define retention policy in world_model.yaml (1 hour)
3. Set query timeout (2 hours)

APPROVAL REQUIRED: YES (security_signoff)
  Approvers: Security Lead, Compliance Officer
  SLA: 24 hours
  Blocking: YES (cannot deploy without approval + remediation)
```

---

## Decision Card Format

Every workflow produces a **Decision Card** (for approval gates).

```markdown
# DECISION CARD

**Workflow**: plan_to_prd  
**Date**: 2026-01-29  
**Prepared By**: Driver Agent  

## Executive Summary

Real-time notification service PRD. Multi-tenant, sub-100ms latency, HIPAA compliant.
Expected launch: Q2 2026.

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Latency SLA (sub-100ms) | HIGH | Dedicated queue, Redis cache, load testing |
| HIPAA audit trail | HIGH | All writes logged + encrypted audit table |
| Multi-tenant isolation | HIGH | Row-level security + tenant_id in all queries |
| Deployment complexity | MED | Blue-green + canary available |

## Rollback Plan

**Time to Rollback**: 2 hours (disable service, fall back to email notifications)  
**Data Loss**: None (all writes persisted)  
**Effort**: Medium (requires DB migration rollback)

## Approval Required

- [ ] Product Manager (scope/budget)
- [ ] Tech Lead (architecture feasibility)
- [ ] Security Lead (HIPAA compliance)

## Evidence Links

- [Architecture Design](../../docs/architecture.md)
- [HIPAA Compliance Checklist](../../docs/hipaa_checklist.md)
- [Risk Matrix](../../docs/risk_matrix.md)
- [Rollback Plan](../../docs/rollback_plan.md)

## Contingency

If HIPAA audit fails: Move HIPAA review to pre-launch phase.
If latency SLA not met: Use async notifications as fallback.
If multi-tenant issues: Single-tenant MVP first.
```

---

## Workflows at a Glance

| Workflow | Use When | Agent Pipeline | Approval Gate |
|----------|----------|-----------------|---------------|
| `plan_to_prd` | Generating requirements | Solver → Backend → Skeptic → Verifier → Memory | `prd_signoff` |
| `code_change` | Planning implementation | Solver → Skeptic → Minimalist → Verifier | `merge_approval` |
| `infra_deploy` | Deploying to production | DevOps → Skeptic → Verifier → Compliance → Memory | `prod_deploy` |
| `security_review` | Security assessment | Security → Skeptic → Verifier → Compliance → Memory | `security_signoff` |

---

## Phase Roadmap

### Phase 1: Documentation (NOW) ✅
- Architecture overview
- Workflow definitions
- Agent role specifications
- Getting started guide

### Phase 2: Core Scaffolding (NEXT)
- `.agents/registry/agents.yaml`
- `.agents/registry/workflows.yaml`
- `.agents/registry/collapse_policy.md`
- `.agents/driver/skill.md` (driver agent definition)
- `.agents/memory/world_model.yaml` (enterprise requirements)

### Phase 3: Agent Skills
- `.agents/skills/solver/skill.md`
- `.agents/skills/skeptic/skill.md`
- `.agents/skills/minimalist/skill.md`
- `.agents/skills/verifier/skill.md`
- `.agents/skills/domain/*/skill.md` (all domain experts)
- `.agents/skills/memory-agent/skill.md`

### Phase 4: Operational Excellence
- Decision card templates (automated)
- Evidence log integration
- Approval workflow (Copilot Chat integration)
- Memory snapshot scheduling
- Rollback validation automation

---

## Key Principles (Always Remember)

1. **Text First**: Everything is YAML/Markdown. No code required.
2. **Verifier Guards Memory**: Memory agent never writes without Verifier receipt.
3. **Collapse is Consensus**: Driver uses weighted rules to find safe agreement across agents.
4. **Approval is Human**: Humans make final calls on risky decisions.
5. **Evidence is Traceable**: All decisions link to files, PRs, standards, and logs.
6. **Invariants are Hard**: World model rules are non-negotiable (audit trail, AuthZ, tenancy).

---

## Questions? Next Steps?

- Review [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Review [WORKFLOWS.md](WORKFLOWS.md) for workflow specs
- Review [AGENT_ROLES.md](AGENT_ROLES.md) for agent responsibilities
- Wait for Phase 2 to begin building the registry and core skills

