# SDLC Agent Swarm — Architecture Overview

## Vision

A **markdown/YAML-driven multi-agent swarm** for end-to-end SDLC orchestration inside VS Code using **Agent Skills** as the open standard.

- **No code required** — pure text configuration (YAML) and skill definitions (Markdown)
- **Collective intelligence** with safe consensus collapse
- **Enterprise-grade** with approval gates, audit trails, and memory persistence
- **Human-in-the-loop** for critical decisions

---

## Core Principle: "Skill = Agent"

Each skill folder defines:
- **Role definition** (persona + responsibility)
- **IO contract** (inputs/outputs)
- **Tool policy** (read/write constraints)
- **Quality gates** (verifier checks)
- **Escalation rules** (approval requirements)

The **Driver Agent** orchestrates all skills via a strict protocol.

---

## Directory Structure

```
.agents/
├── registry/                    # Central skill map & workflow definitions
│   ├── agents.yaml             # Agent roles and permissions
│   ├── workflows.yaml          # SDLC workflow recipes
│   ├── risk_policy.yaml        # Risk categorization & escalation
│   └── collapse_policy.md      # Weighted consensus rules
├── driver/                      # Orchestrator entry point
│   ├── skill.md                # Driver agent definition
│   ├── runbook.md              # Step-by-step protocol
│   └── approval.md             # Approval gate definitions
├── memory/                      # Persistent enterprise state
│   ├── world_model.yaml        # Enterprise requirements & invariants
│   ├── evidence_log.md         # Evidence references
│   ├── decisions_log.md        # Decision history
│   └── snapshots/              # Timestamped state records
├── skills/                      # Agent skill implementations (TBD)
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
└── docs/                        # Documentation
    ├── ARCHITECTURE.md          # This file
    ├── WORKFLOWS.md             # Workflow reference
    ├── AGENT_ROLES.md           # Role definitions
    └── GETTING_STARTED.md       # Quick start guide
```

---

## Core Components

### 1. Agent Registry (`registry/`)

**agents.yaml**: Central skill map declaring all agent roles, types, and permissions.

**Key roles**:
- **Driver** (Orchestrator) — entry point, manages workflow + consensus
- **Solver** (Generator) — proposes solutions
- **Skeptic** (Critic) — challenges assumptions, finds risks
- **Minimalist** (Simplifier) — reduces to minimal solution
- **Verifier** (Validator) — checks against world model + evidence
- **Domain Experts** (Enforcers) — backend/frontend/devops/security/data architects
- **Memory Agent** (Memory) — persists decisions with verification receipts
- **Compliance-Risk** (Risk) — flags regulatory/security concerns

### 2. Workflows (`registry/workflows.yaml`)

**Predefined SDLC recipes** (swarm orchestration templates):

- **plan_to_prd**: Solver → Backend Architect → Skeptic → Verifier → Memory Agent `[prd_signoff]`
- **code_change**: Solver → Skeptic → Minimalist → Verifier `[merge_approval]`
- **infra_deploy**: DevOps Platform → Skeptic → Verifier → Compliance-Risk → Memory Agent `[prod_deploy]`
- **security_review**: Security IAM → Skeptic → Verifier → Compliance-Risk → Memory Agent `[security_signoff]`

### 3. Approval Gates (`driver/approval.md`)

**Human-in-the-loop decision points**:

| Gate | Triggers On | Produces |
|------|-------------|----------|
| `prd_signoff` | PRD / scope / budget | Decision Card (risk/impact/rollback) |
| `merge_approval` | Code changes to core modules | Decision Card + rollback plan |
| `prod_deploy` | Prod deployments, infra mutations | Decision Card + deployment rollback |
| `security_signoff` | AuthN/AuthZ, PII, tenancy | Decision Card + audit trail |
| `data_migration` | Schema changes, irreversible transforms | Decision Card + data rollback plan |

**Human response**: ✅ APPROVE | ❌ REJECT | 🔁 REVISE (with constraints)

### 4. Memory Spine (`memory/world_model.yaml`)

**Enterprise requirements & invariants** — the "source of truth":

```yaml
enterprise_requirements:
  identity_access:       # OIDC, SAML, RBAC, ABAC, directory, secrets
  tenancy:               # Logical/physical isolation, RLS, rate limits
  deployment:            # Multi-cluster, blue-green, canary, rollback required
  cicd:                  # Pipelines required, SAST/dependency/IaaC scans
  observability:         # Logs, metrics, optional tracing
  compliance:            # PII handling, audit logs, retention

invariants:
  - "All writes → audit trail"
  - "AuthZ gates every sensitive endpoint"
  - "Tenancy isolation at data + API layers"

evidence_index:
  last_verified_commit: null
  last_security_review: null
  open_risks: []
```

### 5. Collapse Policy (`registry/collapse_policy.md`)

**Weighted consensus mechanism** (no code):

1. **All agents produce "Position Cards"**:
   - Claim(s), Plan, Evidence, Risks, Confidence (0–1), Cost, Reversibility

2. **Driver computes consensus**:
   - Start with Solver baseline
   - Penalties for: invariant violations, missing evidence, high-risk irreversible actions
   - Boost for: rollback + tests + auditability + enterprise alignment

3. **Accept only if**:
   - Verifier ✅
   - Skeptic's risks mitigated OR gated by approval
   - Memory can write evidence-backed update

---

## Orchestration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  USER PROMPT                                                    │
│  "Use Driver. Workflow: plan_to_prd. Product: X. Constraints: Y"│
└────────────────────────┬────────────────────────────────────────┘
                         │
                    ┌────▼─────┐
                    │  DRIVER   │
                    └────┬─────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐      ┌────▼────┐    ┌────▼───────┐
   │  SOLVER  │      │ SKEPTIC  │    │   DOMAIN   │
   │ (propose)│      │(challenge)    │ EXPERTS    │
   └────┬────┘      └────┬────┘    │(specialize)│
        │                │         └────┬───────┘
        └────────────────┼──────────────┘
                         │
                    ┌────▼──────┐
                    │MINIMALIST  │
                    │+ VERIFIER  │
                    └────┬───────┘
                         │
                    ┌────▼─────────────┐
                    │ COLLAPSE POLICY  │
                    │ (consensus)      │
                    └────┬────────────┘
                         │
                    Approval needed?
                         │
            ┌────────────┴────────────┐
            │ YES                    NO
            │                        │
        ┌───▼────────┐          ┌────▼────┐
        │ APPROVAL   │          │ MEMORY   │
        │ GATE       │          │ AGENT    │
        └───┬────────┘          └────┬────┘
            │                        │
            │         ✅/❌/🔁       │
            │                        │
            └────────────┬───────────┘
                         │
                    ┌────▼──────────┐
                    │ UPDATE MEMORY  │
                    │ WORLD MODEL +  │
                    │ SNAPSHOTS      │
                    └────┬───────────┘
                         │
                    ┌────▼──────────────┐
                    │ OUTPUT:            │
                    │ - Next 3 actions   │
                    │ - Approval needed? │
                    │ - Evidence needed? │
                    └────────────────────┘
```

---

## Key Contracts

### Position Card (Agent Output Format)

Every agent outputs:

```markdown
## [Agent Role] Position Card

**Claim(s)**
- What is true / what we know

**Plan**
- Step 1: ...
- Step 2: ...
- Step 3: ...

**Evidence**
- [File](path/to/file.md)
- [PR](link)
- [Standard](link)

**Risks**
- Risk 1 (severity: HIGH/MED/LOW)
- Risk 2 (...)

**Confidence**: 0.85
**Cost**: Medium
**Reversibility**: Easy
```

### Verification Receipt (Verifier → Memory Agent)

```markdown
## Verification Receipt

**Date**: 2026-01-29
**Verifier**: Verifier Agent
**Decision**: ✅ APPROVED

**World Model Alignment**
- ✅ No invariant violations
- ✅ Audit trail included
- ✅ AuthZ gated
- ✅ Tenancy boundaries enforced

**Evidence Links**
- Decision card: [link]
- Risk assessment: [link]
- Rollback plan: [link]

**Next Steps**
1. Memory Agent writes to decisions_log.md
2. Create snapshot: snapshots/2026-01-29_HHMM.md
3. Update evidence_index in world_model.yaml
```

---

## Workflows Reference

See [WORKFLOWS.md](WORKFLOWS.md) for detailed workflow definitions.

---

## Agent Roles Reference

See [AGENT_ROLES.md](AGENT_ROLES.md) for detailed role descriptions.

---

## Getting Started

See [GETTING_STARTED.md](GETTING_STARTED.md) for quick start & usage examples.

