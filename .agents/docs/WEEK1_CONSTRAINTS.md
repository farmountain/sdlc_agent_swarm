# Week 1 Design Constraints (Extension-Ready Architecture)

## Overview

These **5 critical constraints** ensure that:

1. Week 1–18 deliverables are extension-stable
2. Converting to a VS Code extension (Week 19+) is mechanical, not architectural
3. The system remains vendor-independent, customizable, and maintainable

**Lock these in Week 1. Violating any one makes extension conversion complex.**

---

## Constraint 1️⃣ : Everything is Declarative

### Rule

**No hidden logic. All behavior lives in Markdown/YAML.**

Logic that belongs in files:
- Orchestration steps (Driver protocol)
- Collapse scoring rules
- Workflow definitions
- Agent responsibilities
- Approval gate logic
- Risk categorization
- Evidence requirements

Logic that MUST NOT be in code (even Python/Typescript):
- Conditional routing (except: read YAML + branch on value)
- State transitions (except: documented in Markdown)
- Scoring / weighting (except: published rubric in collapse_policy.md)
- Decision logic (except: human approval gates)

### Why This Matters

**For extension conversion**:
- Extension can load and display artifacts without interpreting logic
- Extension becomes a thin wrapper, not an engine
- LLM handles decision-making, extension handles routing

**For maintenance**:
- Non-technical people can review policies
- Teams can fork and customize without coding
- Audit trail is human-readable

### Week 1 Enforcement

✅ **Check these**:

- [ ] `driver/skill.md` describes a **protocol** (Input → Step 1 → Step 2 → ... → Output), not a program
- [ ] `registry/workflows.yaml` lists steps in order; no conditional branching
- [ ] `registry/collapse_policy.md` is a markdown rubric; no scoring code
- [ ] `registry/risk_policy.yaml` lists risk categories and escalation rules; no logic
- [ ] All "if-then" decisions are either:
  - (a) Gated by human approval, or
  - (b) Explicitly documented in Markdown as a rule

---

## Constraint 2️⃣ : Driver is Protocol-Based

### Rule

**Driver's loop is deterministic, stateless, and explicit. Each step is a visible checkpoint.**

Driver loop structure:

```markdown
## Driver Loop

1. **Input**: User request + workflow name
2. **Lookup**: Read workflows.yaml → get steps
3. **Validate**: Check for required inputs
4. **Invoke**: Call each skill in sequence
   - Skill A → Produces Position Card A
   - Skill B → Produces Position Card B
   - ...
5. **Collapse**: Apply collapse_policy.md → consensus
6. **Approve**: If needed → generate Decision Card, wait for human approval
7. **Memory**: Call Memory Agent to persist decision (with Verifier receipt)
8. **Output**: 
   - Next 3 actions
   - Evidence needed
   - Approval status
```

### Why This Matters

**For extension conversion**:
- Each step can be a command (`SDLC: Run Workflow Step 1`, etc.)
- Extension can surface each step as explicit UI (not hidden state)
- Users see deterministic progress (good for UX)

**For reliability**:
- No implicit state (easy to debug)
- Can retry from any step
- Audit trail is clear (each step creates evidence)

### Week 1 Enforcement

✅ **Check these**:

- [ ] `driver/skill.md` has numbered steps (1, 2, 3, ...)
- [ ] Each step has explicit Input → Output
- [ ] No state mutations between steps (except: written to memory)
- [ ] If approval needed → decision gate is explicit (not buried in step logic)
- [ ] Driver can be called repeatedly with same inputs → same output (idempotent)

---

## Constraint 3️⃣ : No Extension-Only Features

### Rule

**If a feature requires the extension to work, it doesn't belong in Phase 1.**

Allowed:
- ✅ Copilot Chat usage (web + desktop)
- ✅ GitHub repo / Zip download (Phase 1)
- ✅ Markdown/YAML files
- ✅ Text-based approval gates

Not allowed:
- ❌ Extension-only commands
- ❌ Features that need VS Code APIs
- ❌ UI that can't exist in Copilot Chat
- ❌ Dependencies on extension-specific configuration

### Why This Matters

**For Phase 1 adoption**:
- Teams can use without waiting for extension
- Works in any IDE (not just VS Code)
- Maximum flexibility during pilot

**For extension value**:
- Extension adds convenience (commands, modals), not necessity
- Repository experience = Extension experience (plus UI sugar)

### Week 1 Enforcement

✅ **Check these**:

- [ ] All workflows work in Copilot Chat (text-based)
- [ ] All outputs are Markdown (no VS Code-specific formats)
- [ ] Approval gates work via decision cards (not modals)
- [ ] Evidence ledgers are Markdown files (readable anywhere)
- [ ] No hardcoded VS Code API calls in Week 1

---

## Constraint 4️⃣ : Skills are Workspace-Local

### Rule

**Skills live in `.agents/skills/` within the project repo. Extension reads them; doesn't own them.**

Structure:

```
my-project/
├── .agents/
│   ├── registry/
│   │   ├── agents.yaml (lists where to find each skill)
│   │   └── workflows.yaml
│   └── skills/
│       ├── solver/skill.md
│       ├── skeptic/skill.md
│       ├── verifier/skill.md
│       └── domain/
│           ├── backend-architect/skill.md
│           └── ... (team can add more)
```

**Teams can customize**:

```
# Fork or override a skill
my-project/.agents/skills/skeptic/skill.md (team version, overrides default)

# Add org-specific skills
my-project/.agents/skills/org/
├── audit-enforcer/skill.md
└── compliance-reviewer/skill.md

# Customize registry
my-project/.agents/registry/agents.yaml (override permissions, add skills)
```

### Why This Matters

**For customization**:
- Teams fork and extend without rebuilding extension
- Org can have shared skills library (`.agents/skills/org/`)
- Project can specialize for domain

**For governance**:
- Audit trail is local (what did this team override?)
- Central skills are curated; projects can deviate with approval

### Week 1 Enforcement

✅ **Check these**:

- [ ] All skills are in `.agents/skills/` (not in extension bundle)
- [ ] `agents.yaml` lists path to each skill (e.g., `skills/solver/skill.md`)
- [ ] Extension (Phase 2) will read skills from workspace, not bundle
- [ ] No skill is hardcoded in Driver; all are read from registry
- [ ] Teams can add `.agents/skills/org/my-skill/skill.md` without extension changes

---

## Constraint 5️⃣ : Human Approvals are Textual

### Rule

**Approval gates work via text Decision Cards. Modal UI in extension is optional sugar, not required.**

Decision Card format (Markdown):

```markdown
# DECISION CARD

**Workflow**: infra_deploy  
**Date**: 2026-01-29  
**Risk Level**: YELLOW  

## What's being decided?
Deploy v2 of service to prod (multi-cluster).

## Decision Options
- [ ] ✅ APPROVE
- [ ] ❌ REJECT
- [ ] 🔁 REVISE (constraints)

## Evidence
- [Deployment runbook](link)
- [Rollback plan](link)
- [Risk matrix](link)

## Human Response
→ Reply via email / Slack / GitHub comment / extension modal

## Approval Outcome
Decision logged in: `.agents/memory/decisions_log.md`
```

### Why This Matters

**For Phase 1**:
- Approvers can respond via email / Slack (not tied to VS Code)
- Decision cards are artifacts in repo (audit trail)
- Works in air-gapped environments

**For extension (Phase 2)**:
- Modal UI is convenience (shows decision card in VS Code)
- Same approval flow whether modal or email (decision card is source of truth)

### Week 1 Enforcement

✅ **Check these**:

- [ ] `driver/approval.md` defines Decision Card markdown format
- [ ] All approval gates use text decision cards
- [ ] Decision cards live in `.agents/memory/decisions_log.md`
- [ ] Humans can approve via non-VS Code channels (email, Slack, etc.)
- [ ] Modal UI (if extension adds it) is optional, not required

---

## Checklist: Week 1 Compliance

Before merging Week 1:

### Constraint 1: Everything is Declarative
- [ ] No Python/TypeScript logic in Driver
- [ ] All orchestration steps in Markdown
- [ ] All scoring rules in collapse_policy.md
- [ ] All workflows in YAML

### Constraint 2: Driver is Protocol-Based
- [ ] Driver has numbered steps
- [ ] Each step has Input → Output
- [ ] No hidden state transitions
- [ ] Idempotent (same input → same output)

### Constraint 3: No Extension-Only Features
- [ ] All workflows work in Copilot Chat
- [ ] All outputs are Markdown
- [ ] No VS Code API calls
- [ ] Approval via text (not UI-dependent)

### Constraint 4: Skills are Workspace-Local
- [ ] All skills in `.agents/skills/`
- [ ] Registry lists skill paths
- [ ] Teams can override skills
- [ ] Extension reads from workspace

### Constraint 5: Human Approvals are Textual
- [ ] Decision cards are Markdown
- [ ] Approval via email/Slack works
- [ ] No modal UI required
- [ ] Decision log is audit trail

---

## Impact Analysis

### If We Follow All 5 Constraints

| Phase | Effort | Confidence |
|-------|--------|------------|
| Phase 1 (Weeks 1–18) | ~400 hrs | High (architecture proven) |
| Phase 2 Extension (Week 19+) | ~40 hrs | High (mechanical conversion) |
| **Total effort to extension** | ~440 hrs | High (no redesign) |

### If We Violate Constraint 1, 2, or 3

| Phase | Effort | Confidence |
|-------|--------|------------|
| Phase 1 (Weeks 1–18) | ~400 hrs | High |
| Phase 2 Extension (Week 19+) | ~200–400 hrs | **Low (redesign needed)** |
| **Total effort to extension** | ~600–800 hrs | **Low** |

---

## Going Forward

### Week 1 Kick-off

Before starting, confirm:

1. ✅ You understand all 5 constraints
2. ✅ You agree they're the right tradeoffs
3. ✅ Week 1 will be designed around them

### Week 1 PR Review

When reviewing Week 1 deliverables, check:

- [ ] All 5 constraints are honored
- [ ] No violations in driver/skill.md
- [ ] No violations in registry files
- [ ] No violations in approval.md

### Ongoing (Weeks 2–18)

Each week's PR review includes **constraint compliance check**.

If violation found → fix before merge.

---

## Final Word

> **These constraints aren't restrictions. They're the foundation of an extensible, maintainable, and agency-preserving system.**

Violating them doesn't "speed up" Week 1 — it creates months of rework in Week 19.

Following them makes both Week 1 **and** Week 19 smooth.

