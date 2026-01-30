# 📐 Week 9 Architecture Diagram

## System Layers (Thin Extension Architecture)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER                                     │
│                    (VS Code User)                                │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ Clicks Command or
             │ Types @SDLC-Driver
             ↓
┌─────────────────────────────────────────────────────────────────┐
│              VS CODE EXTENSION (Thin Layer)                      │
│                  vscode-sdlc-swarm                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  extension.ts (238 lines, 0 intelligence)               │  │
│  │                                                           │  │
│  │  • Command registration                                  │  │
│  │  • Prompt injection                                      │  │
│  │  • Template scaffolding                                  │  │
│  │  • Protected file checks                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  DOES:                          NEVER DOES:                     │
│  ✅ Register commands            ❌ Orchestration logic          │
│  ✅ Inject prompts               ❌ Evidence validation          │
│  ✅ Copy templates               ❌ Risk scoring                 │
│  ✅ Open dashboards              ❌ Memory writes                │
│                                 ❌ LLM calls                     │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ Injects canonical prompt:
             │ Mode=RUN_SDLC
             │ Workflow=plan_to_prd
             │ Objective=<user input>
             ↓
┌─────────────────────────────────────────────────────────────────┐
│              GITHUB COPILOT AGENT MODE                          │
│                   (LLM Runtime)                                  │
│                                                                  │
│  Receives prompt → Looks for agent skills → Executes            │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ Reads directly from workspace
             ↓
┌─────────────────────────────────────────────────────────────────┐
│              WORKSPACE: .agents/                                 │
│            (All Intelligence Lives Here)                         │
│                                                                  │
│  driver/                                                         │
│  ├─ skill.md         ← Orchestration logic                      │
│  ├─ runbook.md       ← Step-by-step protocol                    │
│  └─ approval.md      ← Approval gates                           │
│                                                                  │
│  registry/                                                       │
│  ├─ workflows.yaml   ← Workflow definitions                     │
│  ├─ agents.yaml      ← Agent roles                              │
│  └─ collapse_policy  ← Consensus rules                          │
│                                                                  │
│  memory/                                                         │
│  ├─ world_model.yaml ← Enterprise requirements                  │
│  ├─ decisions_log.md ← Decision history (PROTECTED)             │
│  └─ evidence_log.md  ← Evidence trail (PROTECTED)               │
│                                                                  │
│  skills/                                                         │
│  ├─ solver/          ← Solution generation                      │
│  ├─ skeptic/         ← Critical analysis                        │
│  ├─ verifier/        ← Evidence validation                      │
│  └─ domain/          ← Domain experts                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Command Flow (Example: "SDLC: Plan to PRD")

```
1. USER CLICKS
   ┌──────────────────────┐
   │  User clicks:        │
   │  SDLC: Plan to PRD   │
   └──────────┬───────────┘
              ↓
2. EXTENSION PROMPTS
   ┌──────────────────────────────────┐
   │  Input box appears:              │
   │  "What is your objective?"       │
   │  User types: "Add OAuth login"   │
   └──────────┬───────────────────────┘
              ↓
3. EXTENSION DETECTS EVIDENCE
   ┌────────────────────────────────────┐
   │  Scans .agents/ for evidence_*.md  │
   │  Builds EvidencePointers list      │
   └──────────┬─────────────────────────┘
              ↓
4. EXTENSION INJECTS PROMPT
   ┌─────────────────────────────────────────┐
   │  Use the SDLC Swarm Driver skill.       │
   │                                          │
   │  Mode=RUN_SDLC                          │
   │  Workflow=plan_to_prd                   │
   │  Objective=Add OAuth login              │
   │  EvidencePointers=.agents/evidence_*.md │
   └──────────┬──────────────────────────────┘
              ↓
5. COPILOT READS SKILL
   ┌────────────────────────────────────┐
   │  Opens: .agents/driver/skill.md    │
   │  Follows: driver orchestration     │
   │  Reads: workflows.yaml             │
   │  Loads: world_model.yaml           │
   └──────────┬─────────────────────────┘
              ↓
6. SWARM EXECUTES
   ┌────────────────────────────────────┐
   │  Solver → proposes                 │
   │  Skeptic → challenges              │
   │  Domain Experts → enforce          │
   │  Verifier → validates evidence     │
   │  Memory → requires receipt         │
   └──────────┬─────────────────────────┘
              ↓
7. APPROVAL GATE (if needed)
   ┌────────────────────────────────────┐
   │  Driver checks: approval.md        │
   │  Requires: Human decision card     │
   │  Blocks: Until approved            │
   └──────────┬─────────────────────────┘
              ↓
8. OUTPUT TO USER
   ┌────────────────────────────────────┐
   │  PRD document                      │
   │  Next 3 actions                    │
   │  Evidence requirements             │
   │  Risk assessment                   │
   └────────────────────────────────────┘
```

---

## Protected Files Flow

```
SCENARIO: User runs "SDLC: Initialize Workspace" twice

First Run:
┌────────────────────────┐
│  .agents/ not found    │
└──────────┬─────────────┘
           ↓
┌────────────────────────────────┐
│  Copy all from templates/      │
│  ✅ .agents/                    │
│  ✅ capabilities/               │
│  ✅ weeks/                      │
│  ✅ adoption/                   │
└────────────────────────────────┘

Second Run:
┌────────────────────────┐
│  .agents/ exists       │
└──────────┬─────────────┘
           ↓
┌────────────────────────────────────────┐
│  Check each file:                      │
│                                         │
│  skill.md         → Already exists     │
│  workflow.yaml    → Already exists     │
│  evidence_auth.md → PROTECTED (skip)   │
│  decisions_log.md → PROTECTED (skip)   │
│  new_skill.md     → Copy (new file)    │
└─────────────────────────────────────────┘
           ↓
┌────────────────────────────────────────┐
│  Result:                               │
│  ✅ New files added                     │
│  ⚠️  Protected files preserved          │
│  ℹ️  Existing files unchanged           │
└─────────────────────────────────────────┘
```

---

## Version Independence

```
┌─────────────────────────────────────────────────────────┐
│              EXTENSION VERSION (0.1.0)                  │
│                 (package.json)                          │
│                                                          │
│  Tracks: Packaging iteration                            │
│  Changes when: Command UX, build process, metadata      │
│  Does NOT track: Intelligence, workflows, skills        │
└─────────────────────────────────────────────────────────┘
                              ≠
┌─────────────────────────────────────────────────────────┐
│           SWARM CONTENT VERSION (0.1.0)                 │
│              (templates/VERSION)                        │
│                                                          │
│  Tracks: Agent skills, workflows, capabilities          │
│  Changes when: New agent, new workflow, new skill       │
│  Does NOT track: Extension packaging                    │
└─────────────────────────────────────────────────────────┘

EXAMPLE:
  Extension 0.2.0 + Swarm Content 0.1.0  ← Valid
  Extension 0.1.0 + Swarm Content 0.2.0  ← Valid
  Extension 1.5.0 + Swarm Content 2.3.0  ← Valid

Rule: Versions evolve independently
```

---

## Removability Proof

```
WITH EXTENSION:
User → Extension → Copilot → .agents/ → Output
        ↑
        └─ Convenience layer (prompt injection)

WITHOUT EXTENSION:
User → Copilot Chat (manual) → .agents/ → Output
        ↑
        └─ Types: "Use the SDLC Swarm Driver skill. Mode=RUN_SDLC..."

RESULT: Same behavior, extension just automates prompt construction

Extension = Optional convenience
.agents/ = Required intelligence
```

---

## Safety Rails Visualization

```
PROTECTED FILES (7 types):

evidence_*.md          🛡️ NEVER OVERWRITTEN
decisions_log.md       🛡️ NEVER OVERWRITTEN
experience_ledger.md   🛡️ NEVER OVERWRITTEN
risk_ledger.md         🛡️ NEVER OVERWRITTEN
metrics_ledger.md      🛡️ NEVER OVERWRITTEN
confidence_ledger.md   🛡️ NEVER OVERWRITTEN
drift_ledger.md        🛡️ NEVER OVERWRITTEN

Implementation:
┌───────────────────────────────────────┐
│  isProtectedFile(filename):           │
│    for pattern in PROTECTED_FILES:    │
│      if match(filename, pattern):     │
│        return SKIP                    │
│    return ALLOW                       │
└───────────────────────────────────────┘

Result: Evidence integrity guaranteed
```

---

## Week 9 Achievement Summary

```
┌──────────────────────────────────────────────────────┐
│           BEFORE WEEK 9                              │
│  - Swarm architecture defined                        │
│  - Workflows documented                              │
│  - Agent roles specified                             │
│  - BUT: Only accessible via manual Copilot prompts   │
└──────────────────────────────────────────────────────┘
                         ↓
                   WEEK 9 ADDS
                         ↓
┌──────────────────────────────────────────────────────┐
│           AFTER WEEK 9                               │
│  ✅ One-command installation                         │
│  ✅ Command Palette integration                      │
│  ✅ Chat participant aliases                         │
│  ✅ Protected file safety                            │
│  ✅ Packaging for distribution                       │
│  ✅ Version tracking                                 │
│  ✅ Architecture validation proof                    │
└──────────────────────────────────────────────────────┘
                         ↓
                  WHAT THIS UNLOCKS
                         ↓
┌──────────────────────────────────────────────────────┐
│  🚀 Real user adoption (colleagues can try)          │
│  🏗️ Architecture confidence (thin contract proven)   │
│  🔌 Federation readiness (clean boundaries work)     │
│  📜 OpenSpec readiness (intelligence is external)    │
└──────────────────────────────────────────────────────┘
```

---

## The Boring Victory

**Week 9 validates the architecture by proving it's boring enough to package.**

```
If packaging was hard → Architecture was wrong
Packaging was easy   → Architecture is right
```

The extension is:
- **Thin** (238 lines, 0 intelligence)
- **Safe** (protected files enforced)
- **Removable** (workspace-independent)
- **Boring** (no clever logic)

**That's the point.**
