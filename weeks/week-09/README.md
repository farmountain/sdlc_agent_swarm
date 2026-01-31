# 📦 WEEK 9 — THIN VS CODE EXTENSION (VSIX PACKAGING)

## Mission (locked)

> Produce a **real, installable VS Code extension (.vsix)** that:

* installs the SDLC Swarm into a workspace
* exposes commands + chat aliases
* routes to Copilot Agent Mode
* **adds zero intelligence**

If the extension is removed, **everything still works**.

---

## 1️⃣ What we are shipping (scope control)

### The extension DOES:

✅ Scaffold folders (`.agents/`, `capabilities/`, `weeks/`, `adoption/`)  
✅ Register commands  
✅ Register chat participants (aliases)  
✅ Inject prompt text into Copilot Agent Mode  
✅ Open dashboards / ledgers

### The extension NEVER does:

❌ Orchestration logic  
❌ Evidence validation  
❌ Memory writes  
❌ Risk scoring  
❌ Approval logic  
❌ LLM calls  
❌ Config storage

> **Rule of thumb:**  
> If logic is not in `.agents/`, it does not belong in the extension.

---

## 2️⃣ Extension architecture (minimal, safe)

```
vscode-sdlc-swarm/
├─ package.json
├─ src/
│  └─ extension.ts
├─ templates/
│  ├─ .agents/
│  ├─ capabilities/
│  ├─ weeks/
│  └─ adoption/
└─ README.md
```

* `templates/` is a **verbatim copy** of your repo artifacts
* `extension.ts` only does:
  * file copy (if missing)
  * command registration
  * prompt injection

---

## 3️⃣ Commands to register (exact)

### RUN_SDLC (Governance & Planning)

```
sdlc.planToPrd
sdlc.architectureReview
sdlc.releaseReadiness
sdlc.showDashboard
```

### BUILD_FEATURE (Code Generation) ⚡ NEW

```
sdlc.buildFeature
sdlc.generateCode
sdlc.refactorCode
sdlc.buildIntegration
sdlc.multiLanguageProject
```

### BUILD_SWARM (Alternative Namespace)

```
swarm.planNextSprint
swarm.architectureReview
swarm.releaseReadiness
swarm.showDashboard
swarm.buildFeature
```

Each command is a **thin wrapper** around a prompt.

---

## 4️⃣ Canonical prompt injection (the heart of it)

Every command injects **exactly this structure** into Copilot Agent Mode:

```text
Use the SDLC Swarm Driver skill.

Mode=RUN_SDLC
Workflow=plan_to_prd
Objective=<ask user via input box>
Constraints=<optional>
EvidencePointers=<auto-detected paths if present>
```

That's it.

No branching.  
No interpretation.  
No retries.

---

## 5️⃣ Chat participants (workflow agents)

Register these SDLC workflow agents:

### Governance & Planning Workflows

| Chat Participant   | Workflow          | Purpose                                  |
| ------------------ | ----------------- | ---------------------------------------- |
| `@PlanToPRD`       | `plan_to_prd`     | Generate PRD with risk assessment        |
| `@CodeChange`      | `code_change`     | Plan and validate code changes           |
| `@InfraDeploy`     | `infra_deploy`    | Infrastructure deployment planning       |
| `@SecurityReview`  | `security_review` | Security review (authN/authZ/PII)        |
| `@Dashboard`       | `dashboard_view`  | Show project status and metrics          |

### Code Generation Workflows ⚡ NEW

| Chat Participant      | Workflow                | Purpose                                           |
| --------------------- | ----------------------- | ------------------------------------------------- |
| `@BuildFeature`       | `build_feature`         | End-to-end feature implementation with tests      |
| `@GenerateCode`       | `generate_code`         | Generate production-ready code from specs         |
| `@RefactorCode`       | `refactor_code`         | Refactor existing code with safety checks         |
| `@BuildIntegration`   | `build_integration`     | Build API integrations and service connections    |
| `@MultiLanguage`      | `multi_language_project`| Orchestrate multi-language projects (TS+Rust+etc) |

These map to end-to-end SDLC workflows.  
Internal agents (Driver, Verifier, Domain Experts) work behind the scenes.

---

## 6️⃣ Workspace initialization command (critical)

### Command: `SDLC: Initialize Workspace`

Behavior:

1. Check for `.agents/`
2. If missing:
   * Copy from `templates/`
3. If present:
   * Do nothing
4. Print summary:
   * what was installed
   * what already existed

**Never overwrite evidence or decisions.**

---

## 7️⃣ Safety rails (hard rules)

In `extension.ts`, enforce:

```ts
// NEVER overwrite:
evidence_*.md
decisions_log.md
experience_ledger.md
risk_ledger.md
confidence_ledger.md
drift_ledger.md
```

If an overwrite is requested → abort.

This is **non-negotiable**.

---

## 8️⃣ README for the Marketplace (copy-paste)

```md
# SDLC Swarm (No-Code, Evidence-Gated)

An agentic SDLC assistant for VS Code.
Spec-first. Test-first. Evidence-gated.

## What it does
- Helps teams plan, review, and release safely
- Makes risks and evidence explicit
- Keeps humans in control

## What it does NOT do
- No auto-approvals
- No hidden logic
- No vendor lock-in

## How it works
All intelligence lives in your repo under `.agents/`.
This extension only exposes it.

## Get started
1. Install extension
2. Run: "SDLC: Initialize Workspace"
3. Run: "SDLC: Plan to PRD"
```

---

## 9️⃣ Week 9 Definition of Done

Week 9 is complete when:

* [ ] Extension installs cleanly
* [ ] Commands appear in Command Palette
* [ ] Copilot Agent Mode receives correct prompt
* [ ] Removing extension does not break the system
* [ ] No intelligence exists outside `.agents/`

If any logic sneaks into the extension → **fail the week**.

---

## 10️⃣ Why this step is critical (don't underestimate it)

This does three things simultaneously:

1. **Validates your architecture**
   * Thin contract is real, not theoretical
2. **Enables real adoption**
   * Colleagues can try it safely
3. **Protects long-term evolution**
   * Federation and OpenSpec stay optional

Most systems collapse here because they blur boundaries.  
Yours won't — because we kept this boring on purpose.

---

## 🔜 What comes next (only after Week 9 ships)

After people actually install and try it, the *correct* next moves are:

* **Week 10:** Feedback-driven refinement (not features)
* **Week 11+:** Multi-team federation (only if multiple teams emerge)
* **Later:** OpenSpec generation (only if duplication hurts)
