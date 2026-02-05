# SDLC Agent Swarm

A **no-code, text-driven multi-agent swarm** for end-to-end SDLC orchestration inside VS Code using **Agent Skills** (Markdown/YAML) as the open standard. **Build any software end-to-end**: web apps, APIs, CLI tools, browser extensions, data pipelines, mobile backends, and more.

## 🎯 Vision

**Collective intelligence with safe consensus collapse**: 
- Solver proposes → Skeptic challenges → Domain Experts enforce → Minimalist simplifies → Verifier validates → Memory persists
- **Human approval gates** for critical decisions
- **Enterprise world model** backing all decisions (requirements, invariants, compliance)
- **No code required** — pure Markdown/YAML configuration

## ⚡ NEW: Full-Stack Code Generation (C6)

**The swarm now builds complete projects end-to-end!**

- ✅ **Multi-language support**: TypeScript, Rust, Python, Java, Go
- ✅ **Full-stack generation**: Frontend + Backend + Database + APIs
- ✅ **Test-driven**: Generates comprehensive test suites (unit, integration, e2e)
- ✅ **Language experts**: TypeScript, Rust, Python specialists enforce best practices
- ✅ **Multi-language projects**: Orchestrate TypeScript + Rust + Python systems (e.g., AI-driven browser)
- ✅ **Refactoring & optimization**: Improve existing code with safety checks
- ✅ **Integration building**: Connect services, build APIs, manage data flow

**The swarm can build ANY software end-to-end** — web apps, APIs, CLI tools, browser extensions, data pipelines, mobile backends, observability systems, e-commerce platforms, etc.

**Example**: Say **"create an AI-driven browser using JavaScript/TypeScript and Rust"** → The swarm will:
1. Generate PRD and architecture
2. Create Rust rendering engine
3. Build TypeScript UI layer  
4. Integrate via WebAssembly
5. Generate comprehensive tests
6. Deliver working, buildable system

More examples: "Build e-commerce platform with multi-tenancy", "Create data pipeline with observability", "Design microservices API gateway", etc.

## 📦 VS Code Extension (Week 9)

**SDLC Swarm is now packaged as a thin VS Code extension!**

### Prerequisites

**Required:**
- **VS Code**: Version 1.85.0 or higher
- **GitHub Copilot**: Active subscription with Agent Mode enabled
- **Git**: For evidence tracking and version control

**Note:** The extension routes all requests to GitHub Copilot Agent Mode. A Copilot subscription is required for the swarm to function.

The extension provides:
- ✅ One-command workspace initialization
- ✅ 13 registered commands (Planning + Code Generation)
- ✅ **Autonomous operation enforcement** — Injects autonomous operation mandate into every prompt (v0.1.7)
- ✅ Chat participants (@PlanToPRD, @BuildFeature, @MultiLanguage, @RefactorCode, etc.)
- ✅ Protected file safety (never overwrites evidence or ledgers)
- ✅ **Zero intelligence** — all logic stays in `.agents/`
- ✅ **Clean uninstall** — No persistent state, leaves no traces when removed

**Key principle:** The extension is removable. If you uninstall it, your `.agents/` folder still works with Copilot.

📖 **Documentation:**
- [Week 9 Specification](weeks/week-09/README.md) — Full spec
- [Build Instructions](vscode-sdlc-swarm/BUILD.md) — How to package
- [Extension Contract](distribution/EXTENSION_CONTRACT.md) — Immutable contract
- [Command Mapping](distribution/EXTENSION_MAPPING.md) — Canonical mappings
- [Validation Report](weeks/week-09/VALIDATION_REPORT.md) — DoD validation
- [Quick Reference](weeks/week-09/QUICK_REFERENCE.md) — Cheat sheet
- [Changelog](vscode-sdlc-swarm/CHANGELOG.md) — Release history (current: v0.1.7)

**Status:** ✅ **v0.1.7 RELEASED** — Extension built and packaged (`sdlc-swarm-0.1.7.vsix`, 551KB, 142 files). 

**Latest:** Autonomous operation enforcement - Extension automatically injects autonomous operation mandate into every Copilot Chat prompt, eliminating "Should I..." prompts for routine decisions.

## 🏗️ Architecture

```
AGENT SWARM ORCHESTRATION

User Request
    ↓
┌───────────────────────────────────────────────┐
│           DRIVER AGENT (Orchestrator)         │
│   Reads: workflows.yaml, agents.yaml          │
└───────────────────────────────────────────────┘
    ↓
Parallel Ideation + Critique:
  [Solver] [Skeptic] [Domain Experts]
    ↓
  [Minimalist] [Verifier]
    ↓
Collapse Policy (Weighted Consensus)
    ↓
Approval Gate (if needed) → Human Decision
    ↓
Memory Agent (Verification Receipt Required)
    ↓
Output: Next 3 Actions + Evidence Log
```

## 🗂️ Directory Structure

```
.agents/
├── registry/                    # Skill map + workflow definitions
│   ├── agents.yaml             # All agent roles and permissions
│   ├── workflows.yaml          # SDLC recipes (plan_to_prd, build_feature, multi_language_project)
│   ├── risk_policy.yaml        # Risk categorization
│   └── collapse_policy.md      # Weighted consensus rules
├── driver/                      # Entry point + orchestration
│   ├── skill.md                # Driver agent definition
│   ├── runbook.md              # Planning & governance protocol
│   ├── implementation_runbook.md # ⚡ Code generation protocol
│   └── approval.md             # Approval gate definitions
├── memory/                      # Persistent enterprise state
│   ├── world_model.yaml        # Enterprise requirements & invariants
│   ├── evidence_log.md         # Evidence references
│   ├── decisions_log.md        # Decision history
│   └── snapshots/              # Timestamped state records
├── skills/                      # Agent implementations
│   ├── solver/
│   ├── skeptic/
│   ├── minimalist/
│   ├── verifier/
│   ├── code-generator/         # ⚡ NEW: Production code generation
│   ├── test-generator/         # ⚡ NEW: Comprehensive test generation
│   ├── refactor-agent/         # ⚡ NEW: Code improvement & optimization
│   ├── integration-builder/    # ⚡ NEW: API & service integration
│   ├── domain/
│   │   ├── backend-architect/
│   │   ├── frontend-architect/
│   │   ├── devops-platform/
│   │   ├── security-iam/
│   │   ├── data-architect/
│   │   ├── typescript-expert/  # ⚡ NEW: TypeScript best practices
│   │   ├── rust-expert/        # ⚡ NEW: Rust best practices
│   │   ├── python-expert/      # ⚡ NEW: Python best practices
│   │   ├── java-expert/        # ⚡ NEW: Java best practices
│   │   └── go-expert/          # ⚡ NEW: Go best practices
│   ├── compliance-risk/
│   └── memory-agent/
└── docs/                        # Full documentation
    ├── ARCHITECTURE.md          # System design & orchestration flow
    ├── WORKFLOWS.md             # Workflow specifications
    ├── AGENT_ROLES.md           # Agent role definitions
    └── GETTING_STARTED.md       # Quick start & usage examples
```

## 📚 Documentation

### 🚀 Quick Start

1. **[NAVIGATION_MAP.md](NAVIGATION_MAP.md)** — Find what you need (guided navigation)
2. **[PLANNING.md](PLANNING.md)** — Complete 18-week delivery roadmap
3. **[CONTEXT_DELIVERY_CHECKLIST.md](CONTEXT_DELIVERY_CHECKLIST.md)** — What's been created

### 📖 Core Documentation

1. **[`.agents/docs/ARCHITECTURE.md`](.agents/docs/ARCHITECTURE.md)** — System design, orchestration flow, and core principles
2. **[`.agents/docs/WORKFLOWS.md`](.agents/docs/WORKFLOWS.md)** — Available workflows (plan_to_prd, code_change, infra_deploy, security_review)
3. **[`.agents/docs/AGENT_ROLES.md`](.agents/docs/AGENT_ROLES.md)** — What each agent does (Solver, Skeptic, Verifier, Domain Experts, Memory Agent)
4. **[`.agents/docs/GETTING_STARTED.md`](.agents/docs/GETTING_STARTED.md)** — Usage examples and quick start guide

### 🔐 Governance & Extensibility

5. **[`.agents/docs/THIN_EXTENSION_CONTRACT.md`](.agents/docs/THIN_EXTENSION_CONTRACT.md)** — What the VS Code extension will/won't do (wrapper only)
6. **[`.agents/docs/EXTENSION_STABLE_INTERFACE.md`](.agents/docs/EXTENSION_STABLE_INTERFACE.md)** — Fixed paths, protocols, schemas (ESI-1 through ESI-7)
7. **[`.agents/docs/SDLC_AGENTIC_LIFECYCLE.md`](.agents/docs/SDLC_AGENTIC_LIFECYCLE.md)** — 7-stage lifecycle (SPEC → TEST → PLAN → EXECUTE → VERIFY → RECORD → REFLECT)
8. **[`.agents/docs/DUAL_LOOP_DESIGN.md`](.agents/docs/DUAL_LOOP_DESIGN.md)** — Loop 1 (builder/product) vs Loop 2 (user/runtime)

### 📦 Strategy & Planning

9. **[`.agents/docs/EXTENSION_READINESS.md`](.agents/docs/EXTENSION_READINESS.md)** — Future-proof for VS Code extension conversion
10. **[`.agents/docs/DISTRIBUTION.md`](.agents/docs/DISTRIBUTION.md)** — Phase 1 (repo-native) + Phase 2 (extension) strategy
11. **[`.agents/docs/WEEK1_CONSTRAINTS.md`](.agents/docs/WEEK1_CONSTRAINTS.md)** — 5 critical design constraints that keep the system extensible

### 🤝 Org Adoption Playbook

12. **[adoption/README.md](adoption/README.md)** — Adoption narrative anchor
13. **[adoption/team_onboarding.md](adoption/team_onboarding.md)** — Engineer onboarding
14. **[adoption/manager_faq.md](adoption/manager_faq.md)** — Manager FAQ
15. **[adoption/first_30_days.md](adoption/first_30_days.md)** — First 30 days rollout plan
16. **[adoption/anti_patterns.md](adoption/anti_patterns.md)** — Anti-patterns to avoid
17. **[adoption/success_metrics.md](adoption/success_metrics.md)** — Adoption success metrics

## 🤖 Agent Roles (40 Agents — 105% Coverage)

| Role | Type | Responsibility |
|------|------|----------------|
| **Driver** | Orchestrator | Entry point; manages workflow orchestration & consensus |
| **Solver** | Generator | Proposes solution + plan |
| **Skeptic** | Critic | Challenges assumptions; finds failure modes |
| **Minimalist** | Simplifier | Reduces to smallest viable solution |
| **Verifier** | Validator | Validates against world model invariants |
| **Domain Experts** | Specialist | Backend, Frontend, DevOps, Security, Data, TypeScript, Rust, Python, Java, Go |
| **Memory Agent** | Memory | Persists decisions (with Verifier receipt only) |
| **Compliance-Risk** | Risk | Flags regulatory/security risks |
| **Specialized Agents** | Contextual | User Research, Documentation, IaC, Postmortem, Feedback, Code Generator, Refactoring |

## 🔄 Workflows

Four core SDLC workflows (extensible):

1. **`plan_to_prd`** — Generate PRD with full risk assessment → `prd_signoff` gate
2. **`code_change`** — Plan implementation with minimal ceremony → `merge_approval` gate
3. **`infra_deploy`** — Deploy to production with high governance → `prod_deploy` gate
4. **`security_review`** — Security assessment of changes → `security_signoff` gate

## 🚀 How to Use (Once Built)

In Copilot Chat / Agent Mode:

```
Use Driver. Workflow: plan_to_prd. 
Product: "Real-time notification service". 
Constraints: "Sub-100ms latency, multi-tenant, HIPAA compliant"
```

Driver will:
1. Invoke swarm (Solver → Backend Architect → Skeptic → Verifier)
2. Collect Position Cards from each agent
3. Apply collapse policy (weighted consensus)
4. Produce Decision Card with approval gate
5. After human approval → update memory

**Output includes**:
- Next 3 actions
- Risk assessment
- Rollback plan
- Approval status

## 🏛️ Enterprise World Model

All decisions validated against:

```yaml
enterprise_requirements:
  identity_access: [OIDC, SAML, RBAC, ABAC, secrets rotation]
  tenancy: [logical isolation, row-level security, per-tenant rate limits]
  deployment: [multi-cluster, blue-green, canary, rollback required]
  cicd: [pipelines, SAST, dependency scan, IaaC scan]
  observability: [logs, metrics, tracing]
  compliance: [PII handling, audit logs, retention]

invariants:
  - "All write operations require audit trail"
  - "AuthZ must gate every sensitive endpoint"
  - "Tenancy boundaries enforced at data + API layers"
```

**Memory Agent writes only if Verifier ✅ and all invariants satisfied.**

## ✅ Approval Gates

Human-in-the-loop decisions:

- **`prd_signoff`** — PRD scope, budget, implications
- **`merge_approval`** — Code changes to core modules
- **`prod_deploy`** — Production deployments, infra mutations
- **`security_signoff`** — AuthN/AuthZ, PII, compliance
- **`data_migration`** — Schema changes, irreversible transforms

Human responds: ✅ APPROVE | ❌ REJECT | 🔁 REVISE

## 🔐 Key Principles

1. **Text First** — Everything is YAML/Markdown. No code required.
2. **Verifier Guards Memory** — Memory only writes with Verification Receipt.
3. **Collapse = Consensus** — Driver uses weighted collapse policy for safe agreement.
4. **Human Approval on Risk** — Risky decisions gated by human approval.
5. **Evidence is Traceable** — All decisions link to files, PRs, standards.
6. **Invariants are Hard** — World model rules are non-negotiable.

## 📋 Development Phases

- **Phase 1** ✅ **COMPLETE** — Architecture, workflows, agent roles, documentation
- **Phase 2** ✅ **COMPLETE** — Registry (5 files: agents.yaml, workflows.yaml, collapse_policy.md, risk_policy.yaml, personas.yaml) + World Model + Driver skill (5 files: skill.md, runbook.md, implementation_runbook.md, approval.md, WORKFLOW_VERIFICATION.md)
- **Phase 3** ✅ **COMPLETE** — 65 agent skill files (40 agents: Solver, Skeptic, Verifier, Domain Experts, Memory Agent, Specialized Agents)
- **Phase 4** 💭 **POTENTIAL EXPANSION** — Operational excellence (CI/CD automation, monitoring dashboards, telemetry, REST APIs, marketplace analytics)
  - ⚠️ **Note:** This phase would require traditional software engineering (TypeScript/Python code), which conflicts with the core "no-code" principle. The copyright owner is **not pursuing this expansion** due to limited time and resources. The system is considered **complete and production-ready** at Phase 3 + Extension v0.1.7.

## 🔗 Quick Links

- [ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md) — Read this first
- [WORKFLOWS.md](.agents/docs/WORKFLOWS.md) — See workflow specs
- [AGENT_ROLES.md](.agents/docs/AGENT_ROLES.md) — Understand agent responsibilities
- [GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md) — Usage examples & quick start
- [EXTENSION_READINESS.md](.agents/docs/EXTENSION_READINESS.md) — Future-proof for VS Code extension conversion
- [DISTRIBUTION.md](.agents/docs/DISTRIBUTION.md) — Phase 1 (repo-native) + Phase 2 (extension) strategy
- [WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md) — 5 critical design constraints that keep the system extensible
- [adoption/README.md](adoption/README.md) — Org adoption narrative
- [adoption/team_onboarding.md](adoption/team_onboarding.md) — Engineer onboarding
- [adoption/manager_faq.md](adoption/manager_faq.md) — Manager FAQ

---

**A quick replicate of the Codex Boaster project using VS Code's no-code agentic framework.**
