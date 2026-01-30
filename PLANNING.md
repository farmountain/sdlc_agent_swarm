# SDLC Agent Swarm — Complete Planning Document

## System Summary

**A skill-native agent operating system** for end-to-end SDLC inside VS Code.

- **No code required** for core logic (Markdown/YAML only)
- **Collective intelligence** with safe weighted consensus
- **Enterprise-ready** with approval gates, audit trails, memory persistence
- **Extension-ready** from Week 1 (conversion is mechanical in Week 19+)
- **18-week delivery roadmap** from Foundation OS → Productization

---

## Key Innovation: Mathematical Model

**Position Card Scoring Functional**:

$$S(\text{card}) = w_e \cdot \text{EvidenceQuality}(E) - w_r \cdot \text{Risk}(R) - w_v \cdot \text{Reversibility}(v) + w_k \cdot k - w_\gamma \cdot \gamma - w_i \cdot \text{InvariantViolations}$$

**Collapse Rule (Accept if)**:
- Verifier ✅ **AND**
- No InvariantViolations **OR** violations gated by approval **AND**
- Skeptic risks mitigated or accepted

This algorithm is **enforced purely via Markdown protocol**, not code.

---

## Core Architecture (6 Epics)

| Epic | Weeks | Goal | Outputs |
|------|-------|------|---------|
| **1: Swarm OS** | 1–3 | Driver + Registry + Orchestration | Foundation |
| **2: Collective Intelligence** | 4–6 | 12 core agents + happy path | PRD→Build workflow |
| **3: Memory OS** | 7–9 | Enterprise world model + verified writes | Persistence layer |
| **4: Risk Governance** | 7–9 | Approval gates + risk policy | Human-in-the-loop |
| **5: End-to-End SDLC** | 10–15 | Broader agents (SRE, compliance, etc.) | Full swarm |
| **6: Evidence-Gated** | 1–18 | EGD-Dev + EGD-Prod ledgers | Dual verification |

---

## Dual-Loop Evidence-Gated Design

### Loop A: Project Development (EGD-Dev)

Tracks: Scope changes, architecture decisions, "done" definition, release readiness

Artifacts: `.agents/memory/evidence_dev.md`

### Loop B: Product Capability (EGD-Prod)

Tracks: Capability completeness, enterprise readiness, adoption, quality KPIs

Artifacts: `.agents/memory/evidence_prod.md`

Both feed into decision-making and memory persistence.

---

## Repository Blueprint

```
.agents/
  ├── driver/
  │   ├── skill.md                 # Entry point protocol
  │   ├── approval.md              # Approval gate templates
  │   └── runbook.md               # Step-by-step execution
  ├── registry/
  │   ├── agents.yaml              # Agent roles + permissions
  │   ├── workflows.yaml           # SDLC recipes
  │   ├── collapse_policy.md       # Scoring + consensus rules
  │   ├── risk_policy.yaml         # Risk categorization
  │   └── personas.yaml            # User personas (for prompts)
  ├── memory/
  │   ├── world_model.yaml         # Enterprise invariants
  │   ├── evidence_dev.md          # Development evidence ledger
  │   ├── evidence_prod.md         # Product evidence ledger
  │   ├── decisions_log.md         # Decision history
  │   └── snapshots/               # Timestamped state records
  ├── skills/
  │   ├── solver/skill.md
  │   ├── skeptic/skill.md
  │   ├── minimalist/skill.md
  │   ├── verifier/skill.md
  │   ├── domain/
  │   │   ├── backend-architect/skill.md
  │   │   ├── frontend-architect/skill.md
  │   │   ├── devops-platform/skill.md
  │   │   ├── security-iam/skill.md
  │   │   └── data-architect/skill.md
  │   ├── compliance-risk/skill.md
  │   └── memory-agent/skill.md
  └── docs/
      ├── ARCHITECTURE.md
      ├── WORKFLOWS.md
      ├── AGENT_ROLES.md
      ├── GETTING_STARTED.md
      ├── EXTENSION_READINESS.md
      ├── DISTRIBUTION.md
      └── WEEK1_CONSTRAINTS.md

/capabilities/
  ├── capability_map.md            # Product capability taxonomy
  ├── capability_cards/            # Individual capability specs
  ├── quality_gates.md             # Testable criteria
  └── telemetry_kpis.md            # Success metrics

/weeks/
  ├── week-01/
  │   ├── README.md
  │   ├── tasks.md
  │   ├── prompts.md
  │   └── evidence_gates.md
  ├── week-02/ ... week-18/
```

---

## 4 GitHub Copilot Agent Mode Prompts

These are **repeatable generation engines** for all configs, personas, tests, data, plans.

### Prompt A: Create/Update a Skill

```
You are building a VS Code Agent Skill (no extension code).
Generate / update .agents/skills/<ROLE>/skill.md.

Must include:
- Purpose, when to use
- Inputs / outputs (Position Card schema)
- Tool usage rules (read vs propose vs write_memory)
- Evidence requirements
- Failure modes and reflexion triggers
- Constraints from /memory/world_model.yaml invariants

Output only the final Markdown content.
```

### Prompt B: Generate Registry + Workflows

```
Generate:
1) .agents/registry/agents.yaml (roles, permissions)
2) .agents/registry/workflows.yaml (end-to-end SDLC workflows)
3) .agents/registry/collapse_policy.md (scoring + collapse rules)
4) .agents/registry/risk_policy.yaml (approval gates)

Assume skills-only deployment, no coding.
Ensure human approval gates exist for high-risk actions.
```

### Prompt C: World Model + Capability Design System

```
Create / update:
- /memory/world_model.yaml with enterprise invariants
- /capabilities/capability_map.md and capability cards

Map each enterprise requirement (IAM, tenancy, CI/CD, multi-cluster, audit, observability, compliance) to:
- definition
- testable acceptance criteria
- required evidence
- telemetry/KPIs
```

### Prompt D: Evidence-Gated "Done" for a Sprint

```
Given week N goals, generate:
- EGD-Dev entries required to claim completion
- EGD-Prod entries required to claim capability readiness

Include evidence pointers (files that should exist) and verifier checklist.
```

---

## 5 Critical Design Constraints (Lock in Week 1)

These ensure extension conversion (Week 19) is mechanical, not architectural.

### 1️⃣ Everything is Declarative

- All behavior in Markdown/YAML
- No hidden logic
- No scoring code (just rubric)

### 2️⃣ Driver is Protocol-Based

- Deterministic, stateless loop
- Numbered steps (Input → Output)
- Idempotent (same input → same output)

### 3️⃣ No Extension-Only Features

- All workflows work in Copilot Chat
- All outputs are Markdown
- Approval via text (not UI-dependent)

### 4️⃣ Skills are Workspace-Local

- Skills in `.agents/skills/` within project
- Extension reads from workspace
- Teams can override and customize

### 5️⃣ Human Approvals are Textual

- Decision cards are Markdown
- Approval via email/Slack works
- Modal UI is optional sugar

---

## 18-Week Sprint Roadmap

### Weeks 1–3: Foundation OS

**W1**: Repo skeleton + Driver + Position Card schema + approval system
- Deliverables: driver/skill.md, driver/approval.md, driver/runbook.md, registry bootstraps, evidence templates

**W2**: agents.yaml + workflows.yaml + collapse_policy + risk_policy
- Deliverables: Complete registry definitions, workflow specs

**W3**: EGD-Dev + EGD-Prod + world_model v1
- Deliverables: Evidence ledgers, enterprise requirements, invariants

### Weeks 4–6: Core Swarm + 12 Agents

**W4**: Product agents (PRD, Backlog, Stakeholder) + capability_map v1
- Deliverables: Product agent skills, capability model

**W5**: Architecture agents (Solution, NFR, Threat Model, Domain Model)
- Deliverables: Architecture agent skills, architecture decision records

**W6**: Coding/TestPlan/Verifier + reflexion loop
- Deliverables: Build agents, reflexion protocol, happy path working end-to-end

### Weeks 7–9: Enterprise Readiness

**W7**: IAM/Secrets/Compliance/Risk agents
- Deliverables: Security agent skills, approval workflows for security gates

**W8**: CI/CD + Release Manager + release readiness evidence
- Deliverables: Release agents, deployment pipeline agents

**W9**: Multi-cluster + Tenancy + Rollback + Observability blueprint
- Deliverables: DevOps agents, deployment strategies, observability model

### Weeks 10–12: Verification Strengthening

**W10**: Unit/Integration/E2E test agents + test data generation protocol
- Deliverables: Test agent skills, test data factories

**W11**: Perf/Reliability agents + chaos/rollback rehearsal templates
- Deliverables: Performance & reliability agent skills, rehearsal protocols

**W12**: Audit logs + evidence receipts + world-model update discipline
- Deliverables: Audit agent skills, verification strengthening

### Weeks 13–15: Scale to Swarm SDLC

**W13**: Refactor/Dependency/SBOM + Documentation/runbooks
- Deliverables: Refactoring agents, documentation agents

**W14**: SRE/oncall/postmortems + telemetry KPIs
- Deliverables: SRE agent skills, incident response patterns

**W15**: ExperienceRanker (weighted experience) + memory snapshots governance
- Deliverables: Learning agents, memory governance protocols

### Weeks 16–18: Productization & Capstone

**W16**: Team distribution kit + skill packaging + governance playbook
- Deliverables: Distribution docs, packaging templates, governance guides

**W17**: Bench/evaluation suite (EGD + verifier outcomes)
- Deliverables: Evaluation framework, benchmark tests

**W18**: Capstone: end-to-end SDLC demo project + readiness scorecards
- Deliverables: Full demo, go/no-go checklist, team readiness scorecard

---

## Extension Readiness (Phase 2, After Week 18)

### Current State (Skills-First)

- ✅ GitHub repo distribution
- ✅ Copilot Chat usage
- ✅ Text-based decision cards
- ✅ Markdown outputs
- ✅ No extension required

### Future State (Thin Extension)

- ✅ VS Code Marketplace
- ✅ Command palette entries
- ✅ Chat participants: @PlanToPRD, @CodeChange, @InfraDeploy, @SecurityReview, @Dashboard (map to workflows)
- ✅ Approval modals (optional)
- ✅ Evidence sidebar viewer (optional)

### Conversion Effort

- Phase 1 (Weeks 1–18): ~400 hrs
- Phase 2 Extension (Week 19+): ~40 hrs
- **Total: ~440 hrs** (no redesign)

### Artifact Mapping

| Your Artifact | Extension Equivalent | Effort |
|---------------|----------------------|--------|
| `.agents/skills/**` | Bundled templates | None |
| `agents.yaml` | Config | None |
| `workflows.yaml` | Command mapping | None |
| `collapse_policy.md` | Runtime text | None |
| `approval.md` | Modal template | 3 hrs |
| Copilot prompts | Chat participant | 0.5 hrs |

---

## Distribution Strategy

### Phase 1: Repository-Native (Weeks 1–18)

**Primary**: GitHub repo (public)
**Secondary**: Zip archives (starter, standard, enterprise)
**Adoption**: Teams clone and copy `.agents/` to project

**Advantages**:
- Zero dependencies
- Works with any LLM (Copilot, Claude, Gemini, etc.)
- Fully customizable
- Vendor-independent

### Phase 2: Extension (Week 19+)

**Primary**: VS Code Marketplace (public extension)
**Secondary**: Internal marketplace (for enterprises)
**Adoption**: Install extension + initialize swarm

**Distribution channels**:
- Public VS Code Marketplace (free)
- Internal GitHub Marketplace (for enterprises)
- Org template repos (GitHub)
- Internal skill libraries (curated)

---

## Evidence-Gated Verification

### Evidence Gate A: Technical Readiness

- ✅ All skills in Markdown
- ✅ Orchestration is deterministic protocol
- ✅ Extension can start Driver without embedding logic
- ✅ Workflows are declarative YAML
- ✅ Artifacts work without extension

### Evidence Gate B: Product Readiness

- ✅ Teams get same behavior with/without extension
- ✅ Local customization works without rebuilding extension
- ✅ Approvals work outside VS Code
- ✅ Extension is optional (nice-to-have)

---

## Success Metrics

| Metric | Phase 1 Target | Phase 2 Target |
|--------|-----------------|-----------------|
| **Repo stars** | 100+ by W18 | 500+ by 6 months |
| **Teams using** | 5+ by W12 | 50+ by 12 months |
| **Workflows executed** | 50+ by W18 | 1000+ by 12 months |
| **Extension installs** | N/A | 200+ by 12 months |
| **Satisfaction** | 4/5 | 4.5/5 |
| **Support burden** | < 5 hrs/week | < 10 hrs/week |

---

## What Happens Next

When you say **"Start Week 1"**, I will deliver:

1. `/weeks/week-01/README.md` — Sprint overview
2. **Repo-ready files**:
   - `.agents/driver/skill.md` (complete, protocol-based)
   - `.agents/driver/approval.md` (decision card template)
   - `.agents/registry/` bootstrap files
   - `/memory/evidence_dev.md` + `/memory/evidence_prod.md` templates
   - `/capabilities/capability_map.md` v0

3. **Copilot prompts** — Week 1 task-specific variants of Prompts A-D
4. **Evidence gates** — EGD-Dev/EGD-Prod entries for "done"
5. **Persona library** — User/role personas for Week 1 agents
6. **Test data** — Sample inputs/outputs for validation
7. **Verification checklist** — Verifier requirements

All in **one coherent deliverable. No back-and-forth.**

---

## Key Resources

### Documentation (Already Created)

- [ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md) — Full system design
- [WORKFLOWS.md](.agents/docs/WORKFLOWS.md) — Workflow specifications
- [AGENT_ROLES.md](.agents/docs/AGENT_ROLES.md) — Agent responsibilities
- [GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md) — Usage examples
- [EXTENSION_READINESS.md](.agents/docs/EXTENSION_READINESS.md) — Future-proofing
- [DISTRIBUTION.md](.agents/docs/DISTRIBUTION.md) — Distribution & packaging
- [WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md) — Design constraints

### Deliverables (Pending Week 1 Signal)

- `/weeks/week-01/` → Full sprint package
- All registry files, skill templates, evidence ledgers
- Copilot prompts (A–D variants)
- Verification checklists

---

## Ready to Proceed?

**To start Week 1 delivery, just say**:

```
Start Week 1
```

I'll generate the complete foundation in one deliverable.

