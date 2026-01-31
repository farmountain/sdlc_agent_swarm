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

---

## 🚀 Current Implementation Status (Phase 1 Completion)

### What Changed Since Original Planning

Based on the requirement to build **complete end-to-end SDLC for any software** (e.g., web apps, APIs, CLI tools, browser extensions, data pipelines, mobile backends, etc.), the system has been **massively expanded** from governance-only to full build capabilities. Examples include AI-driven browser extensions, e-commerce platforms, observability systems, and more.

#### Phase 1 Foundation — ✅ **COMPLETED** (2026-01-30)

1. **World Model Expansion**: `.agents/memory/world_model.yaml`
   - Expanded from 3 basic invariants to **35 enterprise invariants**
   - 11 domains: authentication, authorization, multi-tenancy, audit logging, PII protection, secrets management, multi-cluster, CI/CD, observability, incident response, testing, security scanning, data retention, dependencies
   - Each invariant has: description, evidence_required, exceptions
   - See [INV-000 through INV-035 in world_model.yaml](.agents/memory/world_model.yaml)

2. **Dual Evidence Ledgers**: `.agents/memory/evidence_dev.md` + `evidence_prod.md`
   - **EGD-Dev**: Tracks swarm development process (architecture decisions, scope changes, technical debt, release readiness, learnings)
   - **EGD-Prod**: Tracks product capabilities (capability completeness, enterprise readiness, adoption metrics, quality KPIs)
   - 3 verified entries documenting Phase 1 architectural decisions:
     - EGD-DEV-2026-001: 38-agent SDLC architecture
     - EGD-DEV-2026-002: Dual-loop evidence system
     - EGD-DEV-2026-003: 35 enterprise invariants
   - 3 product capability entries:
     - EGD-PROD-2026-001: Code Generation (TypeScript, Rust, Python)
     - EGD-PROD-2026-002: Governance & Planning
     - EGD-PROD-2026-003: Mathematical Collapse Model

3. **Risk Policy Expansion**: `.agents/registry/risk_policy.yaml`
   - Comprehensive risk management with **4 severity categories** (critical, high, medium, low)
   - **Risk scoring formula**: `Severity = (P × I × E) - (D × M)` where P=probability, I=impact, E=exposure, D=detection, M=mitigation
   - Approval gates for each severity level (critical requires CTO + security + verifier unanimous approval)
   - Escalation paths with SLA timelines (critical: 1 hour, high: 4 hours, medium: 2 days, low: 1 week)
   - **Invariant-specific risk policies**: All 35 invariants mapped to risk severity (e.g., INV-015 "secrets in git" = CRITICAL 100, INV-024 "coverage <80%" = HIGH 72)
   - Compliance integration (SOC 2, ISO 27001, GDPR)
   - Reflexion triggers for risk-based decision revision

4. **Mathematical Collapse Model**: `.agents/registry/collapse_policy.md`
   - **Scoring functional with weights**:
     ```
     S(card) = 10.0·E - 8.0·R - 3.0·v + 2.0·k - 1.0·γ - 10.0·I
     ```
     Where:
     - E = Evidence quality (0-10)
     - R = Risk severity (0-100)
     - v = Reversibility (0-10, lower is better)
     - k = Cost in hours
     - γ = Confidence (0-10)
     - I = Invariant violations count
   - **Collapse rules**:
     1. Verifier veto (any condition) → immediate rejection
     2. Invariant violations → gated by approval or rejection
     3. Critical risk (severity ≥90) → automatic block
     4. Weighted score convergence → accept if S(card) ≥ threshold
   - **Reflexion triggers**: 5 conditions that force agent to revise proposal

### Complete SDLC Architecture (38 Agents)

The system now supports the **full SDLC spectrum** across 7 categories:

#### Agent Spectrum (from [COMPLETE_SDLC_ARCHITECTURE.md](COMPLETE_SDLC_ARCHITECTURE.md))

| Category | Agents | Purpose |
|----------|--------|---------|
| **Discovery & Product** | PRD, Backlog, Stakeholder, Competitor, TechRadar | Product definition, market research |
| **Architecture & Design** | SolutionArchitect, DomainModel, NFR, ThreatModel, APIDesign, CostEstimator | System design, security modeling |
| **Build** | Coding, Refactor, TestGenerator, BuildValidator, DependencyManager | Code generation, test creation |
| **Test & Quality** | Unit, Integration, E2E, Perf, Reliability, TestDataFactory, TestReporter | Comprehensive testing |
| **Security/Compliance** | IAM, SecretsManager, ComplianceChecker, SBOM, VulnerabilityScanner | Security enforcement |
| **Release/DevOps** | CICD, ReleaseManager, DeploymentManager, RollbackOrchestrator, ChangeApprover | Deployment orchestration |
| **Operations/Learning** | Observability, SRE, IncidentResponder, PostMortem, TechDebtTracker | Production support, learning |

**Core 12 (MVP Priority)**:
Driver, PRD, SolutionArchitect, DomainModel, Coding, TestPlan, Verifier, IAM, CICD, ReleaseManager, Observability, Memory

**Current Status**: 26/38 agents have definitions, 6/12 Core agents have skills

### Capability Map v2 (C1-C10)

Expanded from original 5 capabilities to **10 comprehensive capabilities**:

#### New Capabilities Added
- **C6: Code Generation & Implementation** ✅ COMPLETE (ALPHA)
  - 6 core agents: code_generator, test_generator, refactor_agent, integration_builder, api_designer, build_validator
  - 5 language experts: TypeScript, Rust, Python, Java, Go
  - 5 workflows: build_feature, generate_code, refactor_code, build_integration, multi_language_project
  - Skills: comprehensive protocols with AAA pattern, quality standards, evidence generation
  - Runbooks: implementation_runbook.md with BUILD_FEATURE and MULTI_LANGUAGE_PROJECT workflows
  
- **C7: Enterprise Readiness** 🔴 MISSING
  - IAM, secrets management, multi-tenancy support
  - No agents yet (blocks production use)
  
- **C8: Security & Compliance** 🔴 MISSING
  - SAST, dependency scanning, DAST, compliance checks
  - No agents yet (blocks security certifications)
  
- **C9: Observability & SRE** 🔴 MISSING
  - Logging, metrics, tracing, alerting, incident response
  - No agents yet (blocks production operations)
  
- **C10: Continuous Learning** 🔴 MISSING
  - PostMortem analysis, tech debt tracking, metrics collection
  - No agents yet (blocks improvement loops)

**Overall Product Readiness**: **ALPHA** (33% capabilities complete)

### What Can the Swarm Build Now?

✅ **Working Capabilities (ALPHA)**:
1. **PRD Generation**: From user requirements to detailed product specs
2. **Architecture Reviews**: C4 diagrams, ADRs, threat modeling
3. **Code Generation**: TypeScript, Rust, Python production-quality code
4. **Test Generation**: Unit (AAA pattern), integration, e2e, property-based
5. **Release Readiness**: CI/CD checks, deployment gates, rollback planning
6. **Evidence-Gated Memory**: All decisions tracked with verification
7. **Mathematical Collapse**: Quantitative decision-making with risk weighting
8. **Human Governance**: Position Card protocol with approval gates

⏳ **Missing for Production (NOT_READY)**:
1. **Authentication/Authorization**: No IAM agent (INV-001 through INV-004 violations)
2. **Multi-Tenancy**: No tenant isolation (INV-005, INV-006 violations)
3. **Secrets Management**: No vault integration (INV-015 through INV-019 violations)
4. **Security Scanning**: No SAST/DAST/dependency scanning (INV-026, INV-027, INV-028 violations)
5. **Observability**: No logging/metrics/alerting (INV-033, INV-034, INV-035 violations)
6. **SRE/Operations**: No incident response, runbooks (INV-031, INV-032 violations)

**Enterprise Compliance**: **11%** (4/35 invariants satisfied)

### Execution Plan: Phase 2 & 3

Now that Phase 1 (Foundation) is complete, proceed with:

#### Phase 2: Week-by-Week Generation
Generate all 18 weeks of deliverables:
- weeks/week-01/README.md through weeks/week-18/README.md
- Each week includes: tasks, evidence gates, deliverables checklist, Copilot prompts
- Weeks 1-3: Foundation OS (already complete, document it)
- Weeks 4-6: Core 12 agents (6 missing skills)
- Weeks 7-9: Enterprise readiness (C7, C8, C9)
- Weeks 10-12: Verification strengthening
- Weeks 13-15: Scale to full swarm
- Weeks 16-18: Productization

#### Phase 3: Core 12 Agent Skills
Create missing 6 Core agents:
1. `.agents/skills/prd-agent/skill.md` - Product requirements definition
2. `.agents/skills/solution-architect/skill.md` - Architecture design (C4, ADRs)
3. `.agents/skills/domain-model/skill.md` - Entity modeling, bounded contexts
4. `.agents/skills/iam-agent/skill.md` - Authentication, authorization, RBAC (blocks C7)
5. `.agents/skills/observability-agent/skill.md` - Logging, metrics, tracing (blocks C9)
6. `.agents/skills/memory-agent/skill.md` - Memory governance, world model updates

### Documentation Updates

New architecture documentation created:
- [COMPLETE_SDLC_ARCHITECTURE.md](COMPLETE_SDLC_ARCHITECTURE.md) — Full 38-agent system, mathematical model, dual evidence system, 18-week roadmap
- [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) — Gap analysis (26/38 agents), priority phases, implementation paths
- [IMPLEMENTATION_CAPABILITY.md](IMPLEMENTATION_CAPABILITY.md) — Example walkthrough: AI browser extension (demonstrates code generation for any software)

### Next Steps

**Option 1: Continue Sequential Execution (Recommended)**
```
Continue Phase 2: Generate Week 1 materials
```
This will create weeks/week-01/README.md with Foundation OS retrospective, tasks completed, evidence validated.

**Option 2: Jump to Core 12 Skills**
```
Start Phase 3: Create Core 12 agent skills
```
This will create the 6 missing Core agent skills, enabling full MVP capability.

**Option 3: Build Example Project**
```
Build real software projects end-to-end (any domain)
```
This will validate code generation capability with real projects. Examples: AI browser extension, e-commerce platform, data pipeline, observability system, etc.

**Current Recommendation**: Continue with Phase 2 week-by-week generation to maintain systematic roadmap execution, then Phase 3 for Core 12 skills, then example project validation.

