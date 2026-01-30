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

## Available Commands

### RUN_SDLC Mode
- **SDLC: Initialize Workspace** - Set up SDLC Swarm structure in your project
- **SDLC: Plan to PRD** - Convert ideas to Product Requirements Document
- **SDLC: Architecture Review** - Review architecture with evidence gates
- **SDLC: Release Readiness** - Check if ready for release
- **SDLC: Show Project Dashboard** - View decisions and evidence

### BUILD_SWARM Mode
- **Swarm: Plan Next Sprint** - Plan the next development sprint
- **Swarm: Architecture Review** - Review swarm architecture
- **Swarm: Release Readiness** - Check swarm release readiness
- **Swarm: Show Swarm Dashboard** - View swarm decisions

## Chat Participants

Talk to SDLC workflow agents directly:

- **@PlanToPRD** - Generate PRD from vision with risk assessment
- **@CodeChange** - Plan and validate code changes
- **@InfraDeploy** - Infrastructure deployment planning
- **@SecurityReview** - Security review (authN/authZ/PII/compliance)
- **@Dashboard** - Show project status and metrics

## Architecture Principles

This extension follows strict architectural boundaries defined in [EXTENSION_CONTRACT.md](../distribution/EXTENSION_CONTRACT.md):

✅ **What it does:**
- Scaffolds workspace structure
- Registers commands
- Routes prompts to Copilot Agent Mode
- Opens dashboards and ledgers

❌ **What it never does:**
- Orchestration logic (lives in `.agents/`)
- Evidence validation (lives in `.agents/`)
- Memory writes (lives in `.agents/`)
- Risk scoring (lives in `.agents/`)
- LLM calls (handled by Copilot)

### Command Mapping

All commands follow the canonical mapping in [EXTENSION_MAPPING.md](../distribution/EXTENSION_MAPPING.md).

Each command injects a structured prompt with:
- `Mode=RUN_SDLC|BUILD_SWARM`
- `Workflow=<workflow_name>`
- `Objective=<user_input>` (when applicable)
- `EvidencePointers=<detected_paths>` (when available)

### Removability Guarantee

If you uninstall this extension, **everything still works**.  
All logic lives in your repository, not in the extension.

## Protected Files

The extension will **never** overwrite:
- `evidence_*.md`
- `decisions_log.md`
- `experience_ledger.md`
- `risk_ledger.md`
- `metrics_ledger.md`
- `confidence_ledger.md`
- `drift_ledger.md`

## Requirements

- VS Code 1.85.0 or higher
- GitHub Copilot (for Agent Mode routing)

## Extension Structure

```
your-workspace/
├─ .agents/          ← All intelligence lives here
├─ capabilities/     ← Capability definitions
├─ weeks/            ← Weekly progress tracking
└─ adoption/         ← Team adoption guides
```

## License

MIT

## Support

For issues, questions, or contributions, visit:  
https://github.com/your-org/sdlc-swarm
