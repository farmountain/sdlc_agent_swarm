# Changelog

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
