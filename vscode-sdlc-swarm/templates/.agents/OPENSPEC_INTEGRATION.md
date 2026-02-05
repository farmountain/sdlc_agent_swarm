# OpenSpec Integration Architecture

## Overview

This document defines how SDLC Agent Swarm integrates with [OpenSpec](https://github.com/Fission-AI/OpenSpec) - a spec-driven development framework for AI coding assistants.

## Why OpenSpec Integration?

Many developers already use OpenSpec for their development workflow. OpenSpec provides:
- Structured change management (`openspec/changes/` folder)
- Artifact-based planning (proposal → specs → design → tasks)
- Iterative, fluid specifications (not rigid waterfall)
- Support for 20+ AI coding assistants

**Key Integration Goal**: When developers have OpenSpec artifacts in their project, SDLC Agent Swarm should **respect those specifications as the primary intent contract** instead of creating duplicate PRDs.

---

## OpenSpec Folder Structure

```
project/
├── openspec/
│   ├── changes/
│   │   ├── add-feature-x/
│   │   │   ├── proposal.md          # Why we're building, what's changing
│   │   │   ├── specs/               # Requirements and scenarios
│   │   │   │   ├── requirements.md
│   │   │   │   └── scenarios.md
│   │   │   ├── design.md            # Technical approach, architecture
│   │   │   └── tasks.md             # Implementation checklist
│   │   └── archive/
│   │       └── 2025-01-23-add-dark-mode/
│   └── .openspec/
│       └── agent-instructions.md    # OpenSpec slash commands for AI
└── .sdlc/
    ├── .agents/                      # SDLC Agent Swarm framework
    └── ...
```

---

## Artifact Mapping: OpenSpec ↔ SDLC Swarm

| OpenSpec Artifact | SDLC Swarm Equivalent | Integration Strategy |
|-------------------|------------------------|----------------------|
| `proposal.md` | `PRD.md` | Use OpenSpec proposal as primary PRD source. Don't regenerate. |
| `specs/requirements.md` | `FEATURES.md` | Use OpenSpec specs/ as user stories and acceptance criteria. |
| `specs/scenarios.md` | Test cases in `TESTING.md` | Map scenarios to test scenarios. |
| `design.md` | `ARCHITECTURE.md` | Use OpenSpec design as architecture doc. Supplement with diagrams if needed. |
| `tasks.md` | Implementation tasks | Use OpenSpec tasks as implementation checklist. |

---

## Detection Logic

**How SDLC Agent Swarm Detects OpenSpec Projects:**

1. Check for `openspec/` folder at workspace root
2. Check for `.openspec/` folder (OpenSpec configuration)
3. Check for `package.json` with `@fission-ai/openspec` dependency
4. Check for OpenSpec change folders: `openspec/changes/*/`

**Detection Result:**
- If detected → Use OpenSpec artifacts as intent contract
- If not detected → Use standard SDLC workflows (PRD generation, etc.)

---

## Workflow Integration

### Scenario 1: OpenSpec Project with Active Change

**User has:** `openspec/changes/add-payment-gateway/` with `proposal.md`, `specs/`, `design.md`, `tasks.md`

**SDLC Swarm Behavior:**
1. **Skip PRD generation** → Read `proposal.md` instead
2. **Skip requirements gathering** → Read `specs/requirements.md` instead
3. **Skip architecture phase** → Read `design.md` instead
4. **Use tasks.md** → Map to implementation agents
5. **Add verification** → SDLC Verifier validates against OpenSpec specs
6. **Add testing** → Generate tests based on `specs/scenarios.md`

**Workflow Mapping:**
```
OpenSpec Workflow:                    SDLC Swarm Workflow:
/opsx:new add-payment-gateway         (Already done - detect change folder)
/opsx:ff (generate all docs)          (Already done - read existing artifacts)
/opsx:apply                    →      SDLC cmd: feature_development
                                      → Use tasks.md as implementation guide
                                      → Generate code per tasks
                                      → Verifier validates against specs/
/opsx:archive                         (User handles - or add SDLC archive workflow)
```

---

### Scenario 2: New OpenSpec Project (No Active Change)

**User has:** Empty `openspec/` folder or wants to start new change

**SDLC Swarm Behavior:**
1. Detect OpenSpec project structure
2. Offer OpenSpec-native workflow: "I see you're using OpenSpec. Would you like to create a new change using `/opsx:new` first, or should I run standard SDLC workflows?"
3. If user prefers standard SDLC → Run normal workflows (PRD → Architecture → Code)
4. If user prefers OpenSpec → Guide them to use `/opsx:new <feature-name>` first

---

### Scenario 3: Brownfield OpenSpec Project

**User has:** Existing codebase + OpenSpec structure + multiple archived changes

**SDLC Swarm Behavior:**
1. Read `openspec/changes/archive/` to understand project history
2. Use archived proposals + designs to build project context
3. Offer workflows:
   - **Assess Project** → Read all archived changes to build comprehensive context
   - **Technical Debt Audit** → Analyze code against historical design docs
   - **Incremental Improvement** → Read current specs, suggest refinements
   - **Legacy Modernization** → Compare archived designs with current code

---

## Driver Skill Integration

### New OpenSpec-Aware Workflow

**Workflow ID:** `openspec_feature_development`

**Trigger:** User runs SDLC command when OpenSpec change folder detected

**Steps:**
1. **Detect OpenSpec context**
   - Check for `openspec/changes/<change-name>/`
   - Verify artifacts exist: `proposal.md`, `specs/`, `design.md`, `tasks.md`
   
2. **Load OpenSpec artifacts as intent contract**
   - Driver reads `proposal.md` → Extract objectives, constraints
   - Driver reads `specs/requirements.md` → Extract user stories, acceptance criteria
   - Driver reads `specs/scenarios.md` → Extract test scenarios
   - Driver reads `design.md` → Extract architecture decisions, tech stack
   - Driver reads `tasks.md` → Extract implementation checklist

3. **Invoke SDLC agents with OpenSpec context**
   - **Architect Agent**: Supplement `design.md` with diagrams, patterns (don't recreate)
   - **Tester Agent**: Generate test code based on `specs/scenarios.md`
   - **Coder Agent**: Implement using `tasks.md` as checklist
   - **Verifier Agent**: Validate code against `specs/requirements.md`

4. **Write evidence back to SDLC memory**
   - Evidence points to OpenSpec artifacts (don't duplicate)
   - Log: "Used OpenSpec proposal as PRD: openspec/changes/add-payment-gateway/proposal.md"
   - Log: "Validated against OpenSpec specs: openspec/changes/add-payment-gateway/specs/"

---

## Verifier Skill Integration

### OpenSpec-Aware Verification

**Enhanced Verification Logic:**

```markdown
## Evidence Trails Verification

### Standard SDLC Projects
- Check for: projects/<name>/PRD.md, ARCHITECTURE.md, TESTING.md
- Validate: Evidence chain PRD → Architecture → Code → Tests

### OpenSpec Projects
- Check for: openspec/changes/<name>/proposal.md, specs/, design.md
- Validate: Evidence chain OpenSpec artifacts → Code → Tests
- Special validation:
  * Code implements ALL items in tasks.md checklist
  * Tests cover ALL scenarios in specs/scenarios.md
  * Architecture matches design.md decisions
  * No requirements from specs/requirements.md are unimplemented
```

**Example Verifier Output:**

```markdown
### Verification Receipt: Feature Development (OpenSpec Project)

✅ **Intent Contract Source**: openspec/changes/add-payment-gateway/proposal.md
✅ **Requirements Coverage**: 8/8 requirements from specs/requirements.md implemented
✅ **Test Coverage**: 12/12 scenarios from specs/scenarios.md have passing tests
✅ **Architecture Alignment**: Code follows design.md (Express + Stripe SDK + PostgreSQL)
✅ **Task Completion**: 15/15 tasks from tasks.md checked off
⚠️  **Recommendation**: Consider archiving change with `/opsx:archive` after deployment

**Evidence Pointers:**
- Intent: openspec/changes/add-payment-gateway/proposal.md
- Specs: openspec/changes/add-payment-gateway/specs/
- Design: openspec/changes/add-payment-gateway/design.md
- Implementation: src/payment-gateway.ts, src/payment-gateway.test.ts
```

---

## Extension Commands

### New Command: `SDLC Swarm: Feature Development (OpenSpec)`

**When to use:** User has OpenSpec change folder with complete artifacts

**Behavior:**
1. Prompt user to select OpenSpec change folder (from `openspec/changes/`)
2. Read all artifacts (proposal, specs, design, tasks)
3. Run `openspec_feature_development` workflow
4. Generate code implementing tasks
5. Generate tests covering scenarios
6. Verify against specs
7. Report completion

**Command Registration:**
```json
{
  "command": "sdlc-swarm.openspecFeatureDevelopment",
  "title": "SDLC Swarm: Feature Development (OpenSpec)",
  "category": "SDLC Swarm (OpenSpec)",
  "when": "workspaceContainsOpenSpec"
}
```

---

## Implementation Checklist

### Phase 1: Detection & Reading
- [ ] Add OpenSpec detection logic to `extension.ts`
- [ ] Create `detectOpenSpec()` function
- [ ] Create `readOpenSpecArtifacts()` function
- [ ] Test detection with sample OpenSpec project

### Phase 2: Workflow Integration
- [ ] Add `openspec_feature_development` workflow to `workflows.yaml`
- [ ] Update Driver skill to handle OpenSpec context
- [ ] Update Verifier skill to validate against OpenSpec specs
- [ ] Test workflow with OpenSpec change folder

### Phase 3: Extension Commands
- [ ] Add `openspecFeatureDevelopment` command to `package.json`
- [ ] Add command handler to `extension.ts`
- [ ] Add OpenSpec category to command palette
- [ ] Test command with OpenSpec project

### Phase 4: Documentation
- [ ] Create `OPENSPEC_GUIDE.md` in templates
- [ ] Update main README with OpenSpec integration
- [ ] Add examples to extension README
- [ ] Create demo video/screenshots

---

## Benefits of Integration

### For OpenSpec Users
✅ **Respect existing specs** - Don't create duplicate PRDs
✅ **Seamless workflow** - Continue using `/opsx` commands, add SDLC for implementation
✅ **Enhanced verification** - Get evidence-gated validation on top of OpenSpec
✅ **Test generation** - Auto-generate tests from OpenSpec scenarios
✅ **Autonomous coding** - Get long-running autonomous agent after planning

### For SDLC Swarm Users
✅ **Industry standard** - OpenSpec has 22k+ stars, widely adopted
✅ **Better planning** - OpenSpec's iterative spec workflow is battle-tested
✅ **Tool diversity** - Works with 20+ AI assistants (Cursor, Windsurf, Claude, Copilot, etc.)
✅ **No vendor lock-in** - OpenSpec is open source and tool-agnostic

---

## Design Principles

1. **Non-intrusive**: OpenSpec users keep their workflow, SDLC adds value on top
2. **Spec respect**: OpenSpec artifacts are primary source of truth (no duplication)
3. **Bidirectional**: Works for OpenSpec→SDLC and SDLC→OpenSpec projects
4. **Transparent**: Always log which specs are being used (OpenSpec or SDLC)
5. **Optional**: Integration is automatic when detected, but users can opt out

---

## Future Enhancements

### Phase 2 (Future)
- [ ] Auto-archive OpenSpec changes after deployment
- [ ] Sync SDLC evidence to OpenSpec artifacts
- [ ] Generate OpenSpec proposals from user requests
- [ ] OpenSpec change history analyzer (read all archived changes)

### Phase 3 (Future)
- [ ] Multi-agent OpenSpec workflow visualization
- [ ] OpenSpec change impact analysis (what changed, what needs testing)
- [ ] OpenSpec-to-SDLC migration tool (convert existing OpenSpec projects)
- [ ] SDLC-to-OpenSpec export (convert PRDs to OpenSpec format)

---

## References

- **OpenSpec GitHub**: https://github.com/Fission-AI/OpenSpec
- **OpenSpec Docs**: https://github.com/Fission-AI/OpenSpec/blob/main/docs/
- **OpenSpec Philosophy**: Fluid, iterative, easy, brownfield-friendly, scalable
- **SDLC Swarm Philosophy**: Spec-first, test-first, evidence-gated, autonomous
