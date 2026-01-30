# Changelog

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
