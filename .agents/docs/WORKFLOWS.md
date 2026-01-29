# SDLC Workflows Reference

## Overview

Workflows are **predefined swarm orchestration recipes** that invoke agents in sequence with specific approval gates.

All workflows are defined in `.agents/registry/workflows.yaml`.

---

## 1. `plan_to_prd`

**Purpose**: Generate a PRD (Product Requirements Document) with full risk assessment and stakeholder sign-off.

**Entry**: User provides product vision, constraints, timeline.

**Agent Pipeline**:
1. **Solver** → Propose PRD structure, objectives, success criteria
2. **Backend Architect** → Enforce backend feasibility, data model, APIs, scale assumptions
3. **Skeptic** → Challenge scope, identify missing requirements, timeline risks
4. **Verifier** → Validate against world model (compliance, audit, tenancy)
5. **Memory Agent** → Persist PRD + evidence after approval

**Approval Gate**: `prd_signoff`

**Outputs**:
- PRD document (claim + plan + evidence)
- Risk matrix
- Dependency map
- Rollback plan (if needed)
- Decision card for human review

**Decision Card Must Include**:
- Budget impact
- Scope implications
- Cross-team dependencies
- Go/No-Go recommendation

---

## 2. `code_change`

**Purpose**: Plan and validate a code change with minimal ceremony (internal team, low governance).

**Entry**: User provides: objective, repo path, constraints (no new dependencies, etc.).

**Agent Pipeline**:
1. **Solver** → Propose implementation plan, design decisions
2. **Skeptic** → Find failure modes, edge cases, performance risks
3. **Minimalist** → Reduce to smallest viable change (fewer files, less complexity)
4. **Verifier** → Check:
   - No audit trail missing
   - Testability included
   - No new external dependencies
   - Code style/standards

**Approval Gate**: `merge_approval`

**Outputs**:
- Implementation plan (files affected, changes per file)
- Test plan
- Code review checklist
- Rollback instructions

**Decision Card Must Include**:
- Files changed
- Breaking changes? (Y/N)
- Backward compatibility risk
- Rollback effort (Easy/Hard)

---

## 3. `infra_deploy`

**Purpose**: Deploy infrastructure to production (high governance, approval required).

**Entry**: User provides: target environment, deployment scope, change summary.

**Agent Pipeline**:
1. **DevOps Platform Architect** → Propose deployment plan, cluster strategy, canary approach
2. **Skeptic** → Challenge: rollback ability, traffic cutover risks, monitoring gaps
3. **Verifier** → Validate:
   - Blue-green ready
   - Rollback scripts tested
   - All alerting configured
   - No secrets in logs
4. **Compliance-Risk** → Flag: IAM changes, secrets rotation, audit trail
5. **Memory Agent** → Persist deployment plan + approval + evidence

**Approval Gate**: `prod_deploy`

**Outputs**:
- Deployment runbook (step-by-step)
- Monitoring checklist
- Rollback runbook (pre-tested)
- Risk assessment
- Communication plan (for war room)

**Decision Card Must Include**:
- Deployment window
- Estimated downtime (if any)
- Rollback time (RTO)
- Risk level: GREEN/YELLOW/RED
- On-call assignment
- Communication cadence

---

## 4. `security_review`

**Purpose**: Security-focused review of changes (authN, authZ, PII, tenancy, compliance).

**Entry**: User provides: change scope, data touched, compliance requirements.

**Agent Pipeline**:
1. **Security IAM Architect** → Assess: authN/authZ impact, tenancy isolation, IAM policy changes
2. **Skeptic** → Challenge: data classification misses, PII handling, threat model gaps
3. **Verifier** → Validate:
   - Audit logging for all sensitive ops
   - AuthZ enforced at API layer
   - Tenancy boundaries in code + DB
   - Encryption in transit + at rest (if applicable)
4. **Compliance-Risk** → Flag: regulatory impact, audit trail, retention policies
5. **Memory Agent** → Persist security review + findings

**Approval Gate**: `security_signoff`

**Outputs**:
- Security assessment (PASS/FAIL/CONDITIONAL)
- Threat model review
- IAM policy changes (if any)
- Audit logging checklist
- Data classification summary
- Compliance gap list (if any)

**Decision Card Must Include**:
- Risk: GREEN/YELLOW/RED
- PII classified? (Y/N)
- Tenancy isolation verified? (Y/N)
- AuthZ enforced? (Y/N)
- Remediation items (if RED)
- Sign-off from security lead (required for PROD)

---

## Approval Gate Catalog

### `prd_signoff`
- **Triggers on**: plan_to_prd completion
- **Required roles**: Product Manager, Tech Lead, (optional: Stakeholders)
- **Response options**: ✅ APPROVE | ❌ REJECT | 🔁 REVISE (constraints)
- **SLA**: 24–48 hours

### `merge_approval`
- **Triggers on**: code_change completion
- **Required roles**: Code reviewer (senior engineer)
- **Response options**: ✅ APPROVE | ❌ REJECT | 🔁 REVISE (constraints)
- **SLA**: 4–8 hours (async)

### `prod_deploy`
- **Triggers on**: infra_deploy completion + all checks GREEN
- **Required roles**: DevOps lead, On-call SRE, (optional: CTO for major changes)
- **Response options**: ✅ APPROVE | ❌ REJECT | 🔁 REVISE (with deployment window)
- **SLA**: Immediate (high priority)

### `security_signoff`
- **Triggers on**: security_review completion
- **Required roles**: Security lead, Compliance officer (if PII/regulatory)
- **Response options**: ✅ APPROVE | ❌ REJECT (with remediation required)
- **SLA**: 24 hours (can block deployment)

### `data_migration`
- **Triggers on**: code_change or infra_deploy involving schema/data
- **Required roles**: Data architect, DBA, Security
- **Response options**: ✅ APPROVE | ❌ REJECT | 🔁 REVISE (with rollback plan)
- **SLA**: 48 hours (requires extensive testing)

---

## Workflow State Machine

```
┌─────────────────┐
│  Waiting Input  │
└────────┬────────┘
         │ (user provides task)
    ┌────▼──────────┐
    │ Lookup        │
    │ Workflow      │
    └────┬──────────┘
         │
    ┌────▼──────────────────────┐
    │ Run Agent Pipeline         │
    │ (in sequence or parallel)  │
    └────┬─────────────────────┬─┘
         │                     │
    ┌────▼─────┐        ┌──────▼──┐
    │ Approval  │        │ No      │
    │ Required? │        │Approval │
    │ (Y/N)     │        │ Needed  │
    └────┬────┬─┘        │         │
         │    │          └────┬────┘
    YES  │    │ NO             │
         │    │                │
    ┌────▼─────────┐      ┌─────▼──┐
    │ Generate      │      │ Memory  │
    │ Decision Card │      │ Agent   │
    └────┬──────────┘      │ Writes  │
         │                 └─────┬──┘
    ┌────▼──────────┐            │
    │ Wait for      │            │
    │ Approval      │            │
    │ (✅/❌/🔁)    │            │
    └────┬──────────┘            │
         │                       │
    ┌────┴─────────┬──────┐      │
    │              │      │      │
 ✅ │          ❌  │  🔁  │      │
    │              │      │      │
┌───▼───┐  ┌─────▼──┐ ┌──▼──────┴──────┐
│Memory  │  │ Reject │ │ Revise with    │
│ Writes │  │ +      │ │ Constraints    │
│        │  │ Log    │ │ (re-run with)  │
└──┬─────┘  └────┬───┘ └────────┬───────┘
   │             │              │
   │             │              │
   └─────────────┴──────────────┘
         │
    ┌────▼─────────────┐
    │ Output: Next 3   │
    │ Actions + Deps   │
    └──────────────────┘
```

---

## Future Workflows (Extensible)

- **`design_review`** — Architecture review with domain experts
- **`performance_test`** — Load test + bottleneck analysis
- **`rollout`** — Canary → staged rollout + metrics monitoring
- **`incident_postmortem`** — RCA + lessons learned
- **`compliance_audit`** — Full compliance snapshot

