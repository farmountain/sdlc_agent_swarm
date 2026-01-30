# Extension Readiness Strategy

## Executive Summary

**Your skills-only SDLC swarm is already 80–90% of a VS Code extension.**

If architected correctly now, converting to an extension is **low risk, low effort, and mostly mechanical** — not a rewrite.

This document ensures **Week 1 and beyond lock in the constraints** that make extension conversion trivial later.

---

## Why This Works (First Principles)

A VS Code extension is fundamentally:

```
(1) Static assets + (2) activation hooks + (3) command registration
```

Your system already provides:

| Component | You Have | Extension Gets |
|-----------|----------|-----------------|
| Static assets | skill.md, registries, workflows, policies | Bundled templates |
| Deterministic behavior | Driver protocol + collapse rules | Runtime routing |
| Human-in-the-loop | Approval gates + decision cards | Modal UI (optional sugar) |
| Configuration | YAML + Markdown | Extension config |
| Intelligence | Copilot Agent Mode (external) | Same (delegated) |

**The extension does NOT implement intelligence.** It only **exposes, installs, and routes** what already exists.

That's the key win.

---

## Clean Conversions (1:1 Mapping)

These artifacts map directly to extension equivalents with **zero redesign**:

| Artifact | Extension Equivalent | Effort | Notes |
|----------|----------------------|--------|-------|
| `.agents/skills/**` | Bundled skill templates | None | Copy into extension bundle |
| `agents.yaml` | Extension config | None | Read at activation |
| `workflows.yaml` | Command → workflow mapping | None | Route commands to driver |
| `collapse_policy.md` | Runtime policy text | None | Pass to Copilot Agent |
| `approval.md` | Confirmation logic | Light | Simple modal UI (optional) |
| `world_model.yaml` | Read-only resource | None | Expose as workspace config |
| `evidence_dev.md` | Evidence ledger | None | Open in Markdown viewer |
| `evidence_prod.md` | Evidence ledger | None | Open in Markdown viewer |
| Copilot prompts | Chat participant instructions | None | Register as `@SDLC-Driver` |

---

## Light Glue (Minimal TypeScript)

These need simple plumbing but **no architectural change**:

| Need | What | Effort | TS File Count |
|------|------|--------|---------------|
| Command palette entries | Register 4–6 commands | 1–2 hrs | 1 |
| Chat participant | Register `@SDLC-Driver` alias | 30 min | 1 |
| Copy skills | Install `.agents/` to workspace | 1 hr | 1 |
| Approval dialogs | VS Code modal UI | 2–3 hrs | 1 |
| Settings UI | Extension config schema | 1 hr | 0 (JSON schema) |

**Total estimated plumbing: 5–10 hours TypeScript for the entire extension.**

---

## What NOT to Do in the Extension

To keep conversion easy, follow these rules:

| Don't | Why | Alternative |
|------|-----|-------------|
| ❌ Embed LLM logic | Couples you to one LLM | Use Copilot Agent Mode |
| ❌ Implement orchestration in TS | Duplicates Driver protocol | Call Driver skill via Copilot |
| ❌ Hardcode workflows | Defeats the whole point | Read from `workflows.yaml` |
| ❌ Replace Copilot Agent Mode | That's the AI engine | Delegate to it entirely |
| ❌ Store decision logic in extension | Makes testing hard | Keep it in skill Markdown |

**Extension is a launcher + distributor, not a brain.**

---

## Distribution Strategy (Two Phases)

### Phase 1: Skills-First (Now — Weeks 1–18)

**Distribution method**: GitHub repo + Zip archive

```
User flow:
  1. Clone repo or download .agents/ zip
  2. Copy .agents/ into project
  3. Use Copilot Chat: "Use Driver. Workflow: plan_to_prd..."
  4. (Optional) VS Code commands if extension installed
```

**Advantages**:
- ✅ Zero dependencies
- ✅ Maximum flexibility
- ✅ Any LLM provider works
- ✅ Vendor-independent
- ✅ Easy to customize locally

---

### Phase 2: Thin Extension (After Weeks 1–18)

**Distribution method**: VS Code Marketplace

```
User flow:
  1. Install extension from marketplace
  2. Command: "SDLC: Initialize Swarm" → copies .agents/ to workspace
  3. Use Copilot Chat: "Use Driver..." (same as Phase 1)
  4. OR use commands: "SDLC: Plan Feature", "SDLC: Code Review", etc.
  5. See approvals as modals + evidence ledgers in sidebar
```

**What extension does**:
- Activates on workspace open
- Registers commands + chat participant
- Offers one-click `.agents/` installation
- Surfaces approval modals
- Opens evidence ledgers in viewers

**What extension does NOT do**:
- Process language models
- Orchestrate workflows
- Persist decisions
- Implement collapse logic
- Manage secrets/approval state

---

## Thin Extension Architecture (Future Reference)

```
VS Code Extension Package
│
├─ package.json
│   ├─ activationEvents: [ "workspaceContains:.agents" ]
│   ├─ commands: [
│   │     { "sdlc.startWorkflow": "Start a workflow" },
│   │     { "sdlc.requestApproval": "Request human approval" }
│   │   ]
│   └─ chatParticipants: [ "@SDLC-Driver" ]
│
├─ src/
│   ├─ extension.ts (100 lines)
│   │   ├─ registerCommands()
│   │   ├─ registerChatParticipant()
│   │   └─ initializeWorkspace()
│   │
│   ├─ commands.ts (100 lines)
│   │   ├─ startWorkflow()
│   │   └─ installSkills()
│   │
│   ├─ chat.ts (100 lines)
│   │   └─ driverChatHandler()
│   │
│   └─ ui.ts (100 lines)
│       ├─ showApprovalModal()
│       └─ openEvidenceLedger()
│
└─ bundled/
    └─ .agents/ (entire directory)
```

**Total source LOC: ~400 lines.**

---

## 5 Critical Design Constraints (Lock in Week 1)

These constraints ensure extension conversion stays easy. **Violating any one makes extension complex.**

### 1️⃣ Everything is Declarative

**Rule**: No hidden logic. All behavior in Markdown/YAML.

**Why**: Extension can load and display artifacts without interpreting them.

**Week 1 check**:
- ✅ Driver skill is a **protocol**, not a program
- ✅ Workflows defined in YAML, not hardcoded
- ✅ Collapse policy is markdown rules, not embedded scoring

---

### 2️⃣ Driver is Protocol-Based

**Rule**: Driver's loop is deterministic and stateless. No implicit state transitions.

**Why**: Extension can surface each step as explicit commands + UI.

**Week 1 check**:
- ✅ Driver input/output is well-defined
- ✅ No state stored in Driver's memory
- ✅ Each step asks for explicit human input

---

### 3️⃣ No Extension-Only Features

**Rule**: If a feature requires the extension to work, it doesn't belong in Phase 1.

**Why**: Keeps repo-native experience identical to extension experience.

**Week 1 check**:
- ✅ Everything works in GitHub Copilot Chat (no extension)
- ✅ Extension only adds convenience (commands, modals)
- ✅ "Core" features don't require extension UI

---

### 4️⃣ Skills are Workspace-Local

**Rule**: Skills live in `.agents/skills/` within project repo, not in extension bundle.

**Why**: Teams can fork and customize skills without rebuilding extension.

**Week 1 check**:
- ✅ Extension reads `.agents/skills/` from workspace
- ✅ Teams can override skills locally
- ✅ Skills are not extension dependencies

---

### 5️⃣ Human Approvals are Textual

**Rule**: Approval gates work via text decision cards + email/chat. Modal UI is optional later.

**Why**: Extension doesn't own approval flow; humans can approve from anywhere.

**Week 1 check**:
- ✅ Decision cards are markdown documents
- ✅ Humans respond via email / chat (no modal required)
- ✅ Modal UI in extension is convenience, not necessity

---

## Evidence Gates for Extension Readiness

### Evidence Gate A: Technical Readiness

**Questions**:

- ✅ Are all skills defined in Markdown?
- ✅ Is orchestration a deterministic protocol?
- ✅ Can an extension start the Driver without embedding logic?
- ✅ Are workflows declarative (YAML)?
- ✅ Do artifacts work without the extension?

**Pass Criteria**: All yes.

---

### Evidence Gate B: Product Readiness

**Questions**:

- ✅ Can a colleague install the extension and get the same behavior as repo-native?
- ✅ Can they customize locally without rebuilding the extension?
- ✅ Do approvals work outside the extension?
- ✅ Is the extension optional (nice-to-have, not required)?

**Pass Criteria**: All yes.

---

## Week 1 Commitment

When delivering Week 1, I will:

1. **Mark all artifacts** as "extension-stable"
2. **Add `/distribution/EXTENSION_STABLE.md`** checklist
3. **Design all files** to work repo-native + extension-friendly
4. **Avoid** any patterns that would require extension redesign later
5. **Document** where Phase 2 TypeScript glue will live

This means:

- Extension conversion in Week 17–18 is a checklist, not a redesign
- Teams can adopt before extension exists (repo-native)
- Extension is a distribution + convenience layer, not a rewrite

---

## Timeline (Extension Conversion When Ready)

| Phase | Timing | Effort | Outcome |
|-------|--------|--------|---------|
| Phase 1 | Weeks 1–18 | ~400 hrs (you) | Full SDLC swarm (skills-only, repo-native) |
| Phase 2 | After Week 18 | ~40 hrs (you + 1 eng) | Thin VS Code extension (marketplace) |
| Phase 2 QA | Week 19–20 | ~20 hrs | Marketplace readiness review |

---

## Key Insight

> **You're not "building an extension later."**
> **You're building an extension-ready system now, and packaging it in Week 19.**

The architecture is already sound. The constraints are already clear.

Extension conversion is mechanical because:

- Artifacts are already defined
- Protocols are already specified
- No intelligence is embedded in code
- Copilot Agent Mode is the LLM engine
- Humans remain in the loop

---

## Recommendation

Before **"Start Week 1"**, confirm:

1. ✅ You understand the 5 constraints
2. ✅ Week 1 will follow them
3. ✅ Extension readiness is a design principle, not an afterthought

Then deliver Week 1 **extension-ready from day one.**

