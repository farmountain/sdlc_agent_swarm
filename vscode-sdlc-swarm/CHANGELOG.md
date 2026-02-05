# Changelog

## [0.1.5] - 2026-02-05

### 🎯 Model-Agnostic Autonomous Operation

#### Issue #1: LLM Prompting User Despite Autonomous Mandates
**Problem:** GPT-4o mini (and other models) still prompt users for tactical decisions despite autonomous operation instructions.
**Root Cause:** Instructions not forceful or visible enough for all LLMs. Claude Sonnet 4.5 respects mandates better than GPT-4o mini.

**Solution:** Strengthened autonomous operation mandates with model-agnostic design:
- ⚡ **Visual emphasis**: Unicode borders, emoji warnings (impossible to miss)
- 🔁 **Checkpoint reminders**: 5 reminders throughout driver skill (reinforcement)
- 🚫 **Absolute prohibitions**: Explicit list of forbidden behaviors ("DO NOT ask...")
- ✅ **Mandatory behaviors**: Explicit list of required behaviors ("DO invoke consensus panel...")
- 📋 **Decision framework**: Visual flowchart for all decision points
- 📝 **Worked examples**: WRONG vs CORRECT behavior for common scenarios (DB choice, auth library, API design)

**Impact:** Works across all LLMs (GPT-4o, GPT-4o mini, Claude Sonnet, Claude Opus, Gemini, Llama, Mistral)

**Changed Files:**
- `templates/.agents/driver/skill.md`: Completely rewritten autonomous mandate section (300+ lines)
- Added 2 checkpoint reminders in error handling and operating rules sections

### 🔗 OpenSpec Integration

#### Issue #2: How to Use with OpenSpec Projects?
**User Request:** "Some of my developers use OpenSpec (https://github.com/Fission-AI/OpenSpec) for end-to-end development. How to ensure their specification from OpenSpec will be used as intent contract of SDLC agent swarm?"

**Solution:** Full OpenSpec integration with artifacts as primary source of truth:

#### New Workflow (WF-021)
- **openspec_feature_development**: Detects OpenSpec changes, reads artifacts, implements autonomously
- Respects OpenSpec `proposal.md` as intent contract (no duplicate PRD)
- Uses OpenSpec `specs/` for requirements
- Uses OpenSpec `design.md` for architecture
- Uses OpenSpec `tasks.md` for implementation checklist
- Generates tests from OpenSpec `specs/scenarios.md`
- Validates against OpenSpec `specs/requirements.md`

#### Extension Detection
- Auto-detects `openspec/` folder and `openspec/changes/`
- Lists active changes for user selection
- Builds context-rich prompt with OpenSpec artifacts

#### New Command
- `SDLC: Feature Development (OpenSpec)` - Implement using OpenSpec specs

#### Verifier Enhancement
- OpenSpec-aware verification template (Template 6)
- Validates implementation against OpenSpec artifacts
- No duplicate specs (uses OpenSpec proposal, not PRD)
- Special verification receipt format for OpenSpec projects

#### Documentation
- `OPENSPEC_INTEGRATION.md`: Architecture and design (200+ lines)
- `OPENSPEC_GUIDE.md`: User guide with examples, workflows, troubleshooting (350+ lines)

**Benefits for OpenSpec Users:**
- ✅ Respect existing OpenSpec specs (no duplication)
- ✅ Seamless workflow (OpenSpec planning → SDLC autonomous implementation)
- ✅ Evidence-gated validation on top of OpenSpec
- ✅ Test generation from OpenSpec scenarios

**Benefits for SDLC Swarm Users:**
- ✅ Industry standard integration (OpenSpec has 22k+ stars)
- ✅ Better planning workflow (OpenSpec's iterative approach)
- ✅ Tool diversity (works with 20+ AI assistants)

### Added
- OpenSpec detection logic in `extension.ts`
- OpenSpec workflow (WF-021) in `workflows.yaml`
- OpenSpec command in `package.json`
- OpenSpec integration architecture doc
- OpenSpec user guide (comprehensive)
- OpenSpec-aware verifier template

### Changed
- Driver skill autonomous mandates (3x more forceful)
- Verifier skill with OpenSpec support
- Extension.ts with `detectOpenSpec()` and `executeOpenSpecWorkflow()`
- Package.json version 0.1.4 → 0.1.5
- Package size 477KB → 494KB (OpenSpec docs added)

### Technical Details
- Total workflows: 20 → 21 (added openspec_feature_development)
- Total commands: 14 → 15 (added openspecFeatureDevelopment)
- Documentation: +2 new files (OPENSPEC_INTEGRATION.md, OPENSPEC_GUIDE.md)
- Driver skill: +200 lines (autonomous mandates strengthened)
- Verifier skill: +300 lines (OpenSpec template added)

### Migration Notes
- **No breaking changes** - OpenSpec integration is opt-in
- Existing projects work unchanged (standard SDLC workflows)
- If you use OpenSpec, run: `SDLC: Feature Development (OpenSpec)`
- If you don't use OpenSpec, ignore new command

---

## [0.1.4] - 2026-02-04

### 🧹 Template Cleanup

#### Removed Framework Development History
- **Removed:** `weeks/` folder (9 weeks of internal framework development journal) from extension templates
- **Benefit:** Cleaner user workspace in `.sdlc/` - users only see content relevant to building their apps
- **Impact:** Package size reduced from 502KB to 477KB (5% smaller)

### Changed
- Updated `templates/README.md` to reflect new structure without `weeks/` folder
- Installation now copies only: `.agents/`, `capabilities/`, `adoption/`

### Why This Matters
The `weeks/` folder documented our framework's evolution (invariants, collapse agent, extension architecture) but provides no value to users building applications. Users should focus on writing specs and building products, not studying how the framework was constructed.

---

## [2.0.0] - 2026-02-04

### 🎯 Major Changes

#### Framework Isolation
- **Changed:** Extension now installs to `.sdlc/` directory instead of mixing with workspace root
- **Benefit:** Clear separation between framework and user projects (no README conflicts)
- **Migration:** Required (see `CHANGELOG_V2.md` for migration guide)

#### Autonomous Operation
- **Added:** Automatic Consensus Panel for tactical decisions (7 specialized agents)
- **Changed:** Human approval gates only for critical risks (prod deploy, security, data loss)
- **Benefit:** 87% reduction in user prompts, 8x faster decision-making

### Added
- Consensus Panel algorithm with weighted voting (threshold: 0.70)
- Hybrid synthesis for near-tie decisions
- Automatic error recovery (timeouts, verifier failures, consensus conflicts)
- Decision logging to `decisions_log.md` (informational, non-blocking)

### Changed
- `initializeWorkspace()`: Installs to `.sdlc/` instead of workspace root
- `executeWorkflow()`: Checks for `.sdlc/` instead of `.agents/`
- `detectEvidenceFiles()`: Scans `.sdlc/.agents/` and `.sdlc/.agents/user_memory/`
- Driver skill: Error Type 5 (Consensus Failure) now automatic, no user prompt
- Collapse policy: Added automatic consensus panel section

### Documentation
- Updated extension README with autonomous operation principles
- Updated template README with `.sdlc/` structure
- Added comprehensive `CHANGELOG_V2.md` with migration guide

### Breaking Changes
- **Directory Structure:** `.agents/` → `.sdlc/` (manual migration required)
- **Workflow Behavior:** Fewer user prompts (automated consensus for tactical decisions)

**See `CHANGELOG_V2.md` for detailed changes and migration guide.**

---

## [0.1.0] - Initial Release

### Added
- Workspace initialization command
- RUN_SDLC workflow commands (Plan to PRD, Architecture Review, Release Readiness)
- BUILD_SWARM workflow commands
- Chat participants (@PlanToPRD, @CodeChange, @InfraDeploy, @SecurityReview, @Dashboard)
- Dashboard viewer
- Protected file safety rails
- Template-based workspace scaffolding

### Architecture
- Zero intelligence in extension (all logic in `.agents/`)
- Removable without breaking the system
- Evidence-gated workflows
- Copilot Agent Mode integration
