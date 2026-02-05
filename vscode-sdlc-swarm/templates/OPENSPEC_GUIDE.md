# OpenSpec Integration Guide

## Overview

This guide explains how to use **SDLC Agent Swarm** with **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** - a spec-driven development framework for AI coding assistants. The integration allows you to use OpenSpec for planning and specifications while leveraging SDLC Swarm for autonomous implementation, testing, and evidence-gated verification.

---

## What is OpenSpec?

OpenSpec is a lightweight spec framework with 22k+ GitHub stars that helps you:
- **Plan before coding**: Create `proposal.md`, `specs/`, `design.md`, `tasks.md`
- **Work iteratively**: Update specs as you learn, no rigid phase gates
- **Track changes**: Each feature gets its own folder in `openspec/changes/`
- **Archive cleanly**: Completed changes move to `openspec/changes/archive/`

**OpenSpec Philosophy:** Fluid not rigid, iterative not waterfall, easy not complex, brownfield-first.

**Learn more:** https://github.com/Fission-AI/OpenSpec

---

## Why Integrate OpenSpec + SDLC Swarm?

### OpenSpec Strengths (Planning)
✅ Specification-driven workflow  
✅ Change management (organized folders)  
✅ Works with 20+ AI assistants (Cursor, Windsurf, Claude, Copilot)  
✅ Battle-tested by thousands of developers  

### SDLC Swarm Strengths (Execution)
✅ Autonomous coding agent (long-running, like Cursor's agent)  
✅ Evidence-gated verification (every change validated)  
✅ Test generation from scenarios (automated)  
✅ Invariant compliance checking (security, performance, quality gates)  

### Together
**OpenSpec handles planning → SDLC Swarm handles autonomous implementation + verification**

---

## Quick Start

### Prerequisites

1. **Install OpenSpec**
   ```bash
   npm install -g @fission-ai/openspec@latest
   ```

2. **Install SDLC Swarm Extension** (VS Code)
   - Download `sdlc-swarm-0.1.5.vsix`
   - Install: `Extensions → ... → Install from VSIX`

3. **Initialize both in your project**
   ```bash
   cd your-project
   openspec init                    # Creates openspec/ folder
   # Then in VS Code: Cmd+Shift+P → "SDLC: Initialize Workspace"  # Creates .sdlc/ folder
   ```

---

## Workflow: OpenSpec → SDLC Swarm

### Step 1: Plan with OpenSpec

Create a new feature using OpenSpec:

```bash
# In your terminal or AI chat
/opsx:new add-payment-gateway
```

This creates:
```
openspec/changes/add-payment-gateway/
├── proposal.md          # Intent and scope
├── specs/
│   ├── requirements.md  # Functional requirements
│   └── scenarios.md     # Test scenarios
├── design.md            # Technical approach
└── tasks.md             # Implementation checklist
```

**Use OpenSpec commands to complete artifacts:**
```bash
/opsx:ff     # Fast-forward: generate all artifacts
# Or step-by-step:
/opsx:continue proposal    # Generate proposal
/opsx:continue specs       # Generate specs
/opsx:continue design      # Generate design
/opsx:continue tasks       # Generate tasks
```

**Verify artifacts are complete:**
- ✅ `proposal.md`: Has Intent, Scope, Approach sections
- ✅ `specs/requirements.md`: Has ≥3 requirements with SHALL/MUST keywords
- ✅ `specs/scenarios.md`: Has ≥5 scenarios in GIVEN/WHEN/THEN format
- ✅ `design.md`: Has technical decisions and file changes
- ✅ `tasks.md`: Has ≥5 tasks with checkboxes

---

### Step 2: Implement with SDLC Swarm

Once OpenSpec artifacts are ready, switch to SDLC Swarm for autonomous implementation:

**In VS Code Command Palette** (`Cmd+Shift+P` or `Ctrl+Shift+P`):
```
SDLC: Feature Development (OpenSpec)
```

**Select your change:**<br>
The command will scan `openspec/changes/` and show active changes. Select `add-payment-gateway`.

**What happens:**
1. **SDLC Swarm detects OpenSpec** artifacts (proposal, specs, design, tasks)
2. **Uses OpenSpec as intent contract** (no duplicate PRD generation)
3. **Implements code** per `tasks.md` checklist
4. **Generates tests** from `specs/scenarios.md`
5. **Validates** against `specs/requirements.md`
6. **Creates verification receipt** confirming all requirements met

**This runs autonomously** - you don't need to approve every decision (database choice, library selection, etc.). SDLC Swarm's consensus panel makes tactical decisions automatically.

---

### Step 3: Review & Archive

After SDLC Swarm completes:

1. **Review generated code**
   - Check implementation matches OpenSpec `design.md`
   - Verify all `tasks.md` items are checked off
   - Review verification receipt (`VERIFICATION_RECEIPT_OPENSPEC.md`)

2. **Run tests**
   ```bash
   npm test
   ```
   All scenarios from `specs/scenarios.md` should have passing tests.

3. **Archive OpenSpec change**
   ```bash
   /opsx:archive add-payment-gateway
   ```
   This moves the change to `openspec/changes/archive/` and merges specs into main specs.

---

## Example Walkthrough

### Scenario: Add Dark Mode Feature

**1. Create OpenSpec change:**
```bash
You (to AI): /opsx:new add-dark-mode
AI: Created openspec/changes/add-dark-mode/
```

**2. Generate OpenSpec artifacts:**
```bash
You: /opsx:ff
AI: ✓ proposal.md — User requests dark mode to reduce eye strain
    ✓ specs/requirements.md — System MUST persist theme preference
    ✓ specs/scenarios.md — GIVEN user toggles theme WHEN page reloads THEN preference persists
    ✓ design.md — Use React Context + CSS custom properties
    ✓ tasks.md — 10 tasks: Create ThemeContext, add CSS variables, etc.
```

**3. Verify OpenSpec artifacts:**
```bash
You: /opsx:verify add-dark-mode
AI: ✅ All artifacts complete. Ready for implementation.
```

**4. Implement with SDLC Swarm:**
```
In VS Code: Cmd+Shift+P → "SDLC: Feature Development (OpenSpec)"
Select: add-dark-mode
```

**5. SDLC Swarm autonomous execution:**
```
[SDLC] Reading OpenSpec artifacts...
[SDLC] Intent: Add dark mode (from proposal.md)
[SDLC] Requirements: 4 (from specs/requirements.md)
[SDLC] Scenarios: 6 (from specs/scenarios.md)
[SDLC] Tasks: 10 (from tasks.md)
[SDLC] 
[SDLC] Implementing tasks automatically...
[SDLC] ✓ 1.1 Create ThemeContext with light/dark state
[SDLC] ✓ 1.2 Add CSS custom properties for colors
[SDLC] ✓ 1.3 Implement localStorage persistence
[SDLC] ✓ 2.1 Create ThemeToggle component
[SDLC] ... (6 more tasks)
[SDLC]
[SDLC] Generating tests from scenarios...
[SDLC] ✓ Scenario 1: Theme toggle works
[SDLC] ✓ Scenario 2: Preference persists across reloads
[SDLC] ... (4 more scenarios)
[SDLC]
[SDLC] Verifying against OpenSpec requirements...
[SDLC] ✓ All 4 requirements implemented
[SDLC] ✓ All 6 scenarios have passing tests
[SDLC] ✓ All 10 tasks checked off
[SDLC] 
[SDLC] ✅ PASS - Feature complete!
[SDLC] See: VERIFICATION_RECEIPT_OPENSPEC.md
```

**6. Review & Archive:**
```bash
You: npm test
Result: 6/6 tests passing ✓

You: /opsx:archive add-dark-mode
AI: Archived to openspec/changes/archive/2026-02-05-add-dark-mode/
    Specs updated. Ready for production.
```

---

## Differences from Standard SDLC Workflow

| Aspect | Standard SDLC | OpenSpec + SDLC |
|--------|---------------|-----------------|
| **Planning** | Generate PRD in SDLC | Use OpenSpec `/opsx` commands |
| **Specs** | SDLC creates PRD.md | OpenSpec creates proposal.md, specs/ |
| **Architecture** | SDLC generates ARCHITECTURE.md | OpenSpec creates design.md |
| **Tasks** | SDLC breaks down implementation | OpenSpec creates tasks.md |
| **Implementation** | SDLC autonomous coding | SDLC reads tasks.md and implements |
| **Testing** | SDLC generates test plan | SDLC reads specs/scenarios.md and generates tests |
| **Verification** | Validate against SDLC artifacts | Validate against OpenSpec artifacts |
| **Duplication** | None (single source) | None (respects OpenSpec, no PRD generation) |

**Key Point:** When OpenSpec is detected, SDLC Swarm **does not generate PRD/ARCHITECTURE.md**. It uses OpenSpec artifacts as the primary source of truth.

---

## Command Reference

### OpenSpec Commands (Planning Phase)

| Command | Purpose | Example |
|---------|---------|---------|
| `/opsx:new <name>` | Create new change folder | `/opsx:new add-auth` |
| `/opsx:ff` | Fast-forward (generate all artifacts) | `/opsx:ff` |
| `/opsx:continue <artifact>` | Generate specific artifact | `/opsx:continue proposal` |
| `/opsx:verify <name>` | Check if artifacts complete | `/opsx:verify add-auth` |
| `/opsx:apply` | Start implementation | `/opsx:apply` |
| `/opsx:archive <name>` | Complete and archive change | `/opsx:archive add-auth` |

### SDLC Swarm Commands (Implementation Phase)

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `SDLC: Feature Development (OpenSpec)` | Implement OpenSpec change | After `/opsx:ff` completes |
| `SDLC: Assess Project` | Analyze existing codebase | Brownfield projects |
| `SDLC: Technical Debt Audit` | Find tech debt | Legacy codebases |

---

## Folder Structure

When using both frameworks, your project looks like:

```
your-project/
├── .sdlc/                          # ← SDLC framework (isolated)
│   ├── .agents/                    # Agent skills, memory
│   ├── capabilities/               # Capability docs
│   └── adoption/                   # Onboarding guides
│
├── openspec/                       # ← OpenSpec specs and changes
│   ├── changes/
│   │   ├── add-payment-gateway/    # Active change
│   │   │   ├── proposal.md
│   │   │   ├── specs/
│   │   │   ├── design.md
│   │   │   └── tasks.md
│   │   └── add-dark-mode/          # Another active change
│   ├── changes/archive/            # Completed changes
│   └── specs/                      # Main specs (source of truth)
│
├── src/                            # ← Your application code
│   ├── payment-gateway.ts
│   ├── theme/
│   └── ...
│
├── tests/                          # ← Generated tests
│   ├── payment-gateway.test.ts
│   ├── theme.test.ts
│   └── ...
│
└── package.json
```

**Clean separation:**
- `.sdlc/`: Framework files (agent skills, memory)
- `openspec/`: Specs and change management
- `src/`: Your code (no mixing with framework files)

---

## Best Practices

### 1. Complete OpenSpec Artifacts First
❌ Don't start SDLC Implementation with incomplete OpenSpec specs  
✅ Run `/opsx:verify <change-name>` before `SDLC: Feature Development`

### 2. Use OpenSpec for All Planning
❌ Don't mix OpenSpec and manual PRD.md files  
✅ Let OpenSpec handle all specifications, SDLC handles implementation

### 3. Archive Completed Changes
❌ Don't leave completed changes in `openspec/changes/`  
✅ Run `/opsx:archive <name>` after feature deployed (keeps workspace clean)

### 4. Leverage SDLC Autonomous Mode
❌ Don't manually implement OpenSpec tasks one-by-one  
✅ Let SDLC Swarm implement all tasks autonomously (faster)

### 5. Trust Verification Receipts
❌ Don't skip reading `VERIFICATION_RECEIPT_OPENSPEC.md`  
✅ Review receipt to see what was validated (requirements, tests, tasks)

---

## Troubleshooting

### Issue 1: "No OpenSpec project detected"

**Cause:** `openspec/` folder missing or empty.

**Solution:**
```bash
cd your-project
openspec init
/opsx:new my-feature
```

Then re-run `SDLC: Feature Development (OpenSpec)`.

---

### Issue 2: "No active OpenSpec changes found"

**Cause:** No folders in `openspec/changes/` or all changes archived.

**Solution:**
```bash
/opsx:new my-feature
/opsx:ff      # Generate all artifacts
```

Then re-run SDLC command.

---

### Issue 3: SDLC verification fails with "Requirements not met"

**Cause:** Implementation incomplete or doesn't match OpenSpec specs.

**Check:**
1. Read `VERIFICATION_RECEIPT_OPENSPEC.md` for specific violations
2. Review which requirements in `specs/requirements.md` are missing
3. Check which tasks in `tasks.md` are unchecked

**Solution:**
- Complete missing requirements manually or re-run SDLC command
- Ensure `tasks.md` is fully checked off before archiving

---

### Issue 4: SDLC keeps asking for choices (not autonomous)

**Cause:** Using GPT-4o mini or older models that default to interactive mode.

**Solution:**
- **Upgrade to v0.1.5+** (has model-agnostic autonomous mandates)
- If still occurs, add to chat: "You are in autonomous mode. Make decisions via consensus panel automatically."
- Switch to Claude Sonnet 4.5 or GPT-5.2 (better autonomous behavior)

---

## FAQ

### Q: Can I use SDLC Swarm without OpenSpec?
**A:** Yes! SDLC Swarm works standalone. It generates PRD, ARCHITECTURE.md, etc. OpenSpec integration is optional.

### Q: Can I use OpenSpec without SDLC Swarm?
**A:** Yes! OpenSpec works with 20+ AI assistants (Cursor, Windsurf, Claude, etc.). SDLC Swarm just adds autonomous coding + verification.

### Q: Which workflows support OpenSpec?
**A:** Currently: `openspec_feature_development` (WF-021). More coming in future releases.

### Q: Does SDLC Swarm modify OpenSpec artifacts?
**A:** No. SDLC Swarm **reads** OpenSpec artifacts but doesn't modify them. You control OpenSpec via `/opsx` commands.

### Q: Can I have both SDLC PRDs and OpenSpec proposals?
**A:** Not recommended. Choose one:
- **OpenSpec for planning** → SDLC for implementation (recommended)
- **SDLC for everything** → Don't use OpenSpec

Mixing both creates duplicate specs.

### Q: What if my OpenSpec specs change during implementation?
**A:** Update OpenSpec artifacts using `/opsx:continue <artifact>`, then re-run `SDLC: Feature Development (OpenSpec)`. SDLC Swarm will detect the changes and re-verify.

---

## Next Steps

### If you're new to OpenSpec:
1. Read [OpenSpec Getting Started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)
2. Learn [OpenSpec Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
3. Try creating a simple change: `/opsx:new hello-world`

### If you're familiar with OpenSpec:
1. Initialize SDLC Swarm: `Cmd+Shift+P → SDLC: Initialize Workspace`
2. Create an OpenSpec change: `/opsx:new my-feature; /opsx:ff`
3. Run: `SDLC: Feature Development (OpenSpec)`
4. Review: `VERIFICATION_RECEIPT_OPENSPEC.md`
5. Archive: `/opsx:archive my-feature`

---

## Resources

- **OpenSpec GitHub**: https://github.com/Fission-AI/OpenSpec
- **OpenSpec Docs**: https://github.com/Fission-AI/OpenSpec/blob/main/docs/
- **SDLC Swarm GitHub**: https://github.com/farmountain/sdlc_agent_swarm
- **Integration Architecture**: `.sdlc/.agents/OPENSPEC_INTEGRATION.md`

---

## Support

**Issues with OpenSpec:** https://github.com/Fission-AI/OpenSpec/issues  
**Issues with SDLC Swarm:** https://github.com/farmountain/sdlc_agent_swarm/issues  
**Integration Issues:** Include `[OpenSpec]` tag in issue title

---

**Version:** 1.0 (for SDLC Swarm v0.1.5+)  
**Last Updated:** February 5, 2026
