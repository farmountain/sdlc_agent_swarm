# Thin Extension Contract

## Locked: What the VS Code Extension WILL and WILL NOT Do

This contract ensures the extension **never becomes the system** — it remains a thin wrapper around the skills-native SDLC swarm.

---

## ✅ Extension WILL Do (Wrapper Only)

### 1. Install & Update Swarm Assets

- Copy `.agents/**`, `/capabilities/**`, `/memory/**` templates into workspace
- Provide one-click "Initialize Swarm" command
- Handle version upgrades safely (detect conflicts, preserve user customizations)

### 2. Expose Commands (Workflow Entry Points)

Command palette entries mapping to workflows:

```
SDLC: Plan Feature (→ plan_to_prd workflow)
SDLC: Code Review (→ code_change workflow)
SDLC: Deploy Release (→ infra_deploy workflow)
SDLC: Security Review (→ security_review workflow)
```

**Rule**: Commands must map 1:1 to workflow names in `workflows.yaml`.
No hidden orchestration; just command → workflow lookup.

### 3. Register Chat Participants & Aliases

- Register `@SDLC-Driver` chat participant
- Optional: Register specialized participants (`@SDLC-Verifier`, `@SDLC-Solver`)
- These are **chat aliases only** — they delegate to Copilot Agent Mode

### 4. Navigate Evidence Ledgers & Memory

UI shortcuts for read-only navigation:

- "SDLC: Open Evidence (Dev)" → opens `.agents/memory/evidence_dev.md`
- "SDLC: Open Evidence (Prod)" → opens `.agents/memory/evidence_prod.md`
- "SDLC: Open World Model" → opens `.agents/memory/world_model.yaml`
- "SDLC: Open Decision Log" → opens `.agents/memory/decisions_log.md`

**Rule**: No editing through these shortcuts; VS Code's native editor owns all writes.

### 5. Surface Approval Dialogs (Optional UI Sugar)

- When Driver needs human approval, extension can show a modal
- Modal displays Decision Card (Markdown formatted)
- Approval response is written to `.agents/memory/decisions_log.md` (repo owns the truth)

**Rule**: Decision cards are Markdown artifacts in repo, not extension state.
Approvals work even without extension (via email/Slack reply).

---

## ❌ Extension WILL NOT Do (Intelligence Stays Outside)

### 1. ❌ Implement Orchestration Logic in TypeScript

- Driver protocol lives in `driver/skill.md` (Markdown)
- No TS/JS reimplementation of orchestration
- No hidden state machines in extension

### 2. ❌ Implement Weighted Collapse Algorithm

- Collapse policy is `registry/collapse_policy.md` (Markdown rubric)
- Scoring happens in Copilot Agent Mode (LLM reasoning)
- No scoring code in extension

### 3. ❌ Maintain Hidden State Outside Repo

- Extension has **zero persistent state** that affects decisions
- All state is in `.agents/**`, `/memory/**`, `/capabilities/**`
- No extension local storage as "source of truth"

### 4. ❌ Embed LLM or Hardcode Provider Logic

- Extension does NOT call LLM APIs
- Extension does NOT implement prompt engineering
- Copilot Agent Mode is the LLM runtime
- Extension remains LLM-provider-agnostic

### 5. ❌ Require Proprietary Services

- Extension must work in air-gapped environments
- No cloud dependencies
- No "phone home" telemetry (unless explicitly opt-in + logged in repo)

### 6. ❌ Replace Copilot Agent Mode

- Copilot Chat is the "brain"
- Extension is the "hands" (file installer) + "eyes" (navigation)
- Reasoning stays in Copilot

---

## The Core Principle

> **Extension is a launcher + router + UI shortcut.**
> **Skills + Registry + Copilot is the system.**

---

## Extension Implementation Estimate

- **Total TypeScript**: ~400–500 lines
- **Main files**:
  - `extension.ts` (activation + command registration)
  - `commands.ts` (workflow commands)
  - `ui.ts` (dialogs + navigation)
  - `installer.ts` (template copying)

- **No special logic** — just file IO, command registration, modal display

---

## How This Makes Extension Conversion Easy

### Phase 1 (Weeks 1–18): Skills-First

- Users run entirely repo-native (no extension needed)
- `Use Driver. Workflow: plan_to_prd...` in Copilot Chat

### Phase 2 (Week 19+): Thin Extension

- Same `.agents/` files (no changes)
- Extension adds convenience (commands, modals)
- Same behavior with or without extension

**Conversion effort: ~40 hours** because extension does no intelligence — it just packages and routes.

---

## Contract Violations (What Breaks the Deal)

### 🚨 Critical: Never do this

- ❌ Move logic from `skill.md` into TypeScript
- ❌ Create extension-specific workflow features
- ❌ Store decisions in extension storage (not in repo)
- ❌ Hardcode agent behavior in extension
- ❌ Add extension-required dependencies to skills

If you violate these, you've created a **hidden system** inside the extension, and conversion becomes a rewrite.

---

## Audit: Is This Contract Maintained?

During PR reviews (Weeks 1–18):

- [ ] No TypeScript logic beyond file IO + routing
- [ ] All behavior is in Markdown/YAML
- [ ] All state is in `.agents/**`
- [ ] No new LLM provider integrations in extension
- [ ] All artifacts work in Copilot Chat alone

If any violation is found → fix before merge.

---

## Exception Process

If you need to violate this contract:

1. **Write an RFC** explaining why
2. **Get consensus** from team
3. **Document the exception** in `/distribution/EXTENSION_EXCEPTIONS.md`
4. **Plan the migration path** for Phase 2 (to keep extension thin later)

This ensures violations are conscious, rare, and tracked.

---

## Final Statement

> **This contract is non-negotiable.
> It is the foundation of the system's extensibility, portability, and maintainability.**

Honor it from Week 1, and the extension conversion in Week 19 is mechanical.
Violate it, and you'll rewrite the entire system.

Choose wisely. ⚖️

