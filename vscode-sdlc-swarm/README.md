# SDLC Swarm (No-Code, Evidence-Gated, Autonomous)

An agentic SDLC assistant for VS Code.  
Spec-first. Test-first. Evidence-gated. **Autonomous by default.**

## Prerequisites

**Required:**
- **VS Code**: Version 1.85.0 or higher
- **GitHub Copilot**: Active subscription with Agent Mode enabled
- **Git**: For evidence tracking and version control

**Note:** This extension routes all requests to GitHub Copilot Agent Mode. A Copilot subscription is required for the swarm to function.

## What it does

- Helps teams plan, review, and release safely
- Makes risks and evidence explicit
- **Automates tactical decisions** using multi-agent consensus
- Keeps humans in control for critical approvals only

## What it does NOT do

- No auto-approvals for critical risks (security, prod deploy, data loss)
- No hidden logic
- No vendor lock-in

## Key Design Principles

### 1. Framework Isolation
- All SDLC Swarm framework files live in `.sdlc/` directory
- Your project files stay in workspace root or `projects/`
- **No mixing**: Your README.md never conflicts with framework docs

### 2. Autonomous Operation
- **Multi-agent consensus** for tactical decisions (architecture, design patterns, libraries)
- **Automatic recovery** from errors, timeouts, and conflicts
- **Human approval gates** only for critical risks:
  - Production deployments
  - Security/compliance violations
  - Data loss risks
  - Budget/timeline overruns >50%

### 3. Collective Intelligence
When conflicts arise, the swarm automatically invokes a **Consensus Panel**:
- **Minimalist**: Simplicity, cost, reversibility
- **Skeptic**: Risk mitigation, edge cases
- **Domain Expert(s)**: Technical correctness
- **Verifier**: Evidence quality, invariants
- **Collective Intelligence**: Historical patterns
- **Risk/Compliance Watcher**: Security, regulatory
- **User Value Advocate**: Business value, ROI

The panel reaches weighted consensus (threshold: 0.70) and proceeds automatically. You're informed via decision logs, but **not prompted for every choice**.

## How it works

All intelligence lives in your repo under `.sdlc/`.  
This extension only exposes it.

**File Structure After Initialization:**
```
<workspace_root>/
├─ .sdlc/                    # ← Framework (agents, skills, evidence)
│  ├─ .agents/
│  ├─ capabilities/
│  ├─ weeks/
│  └─ adoption/
├─ projects/                 # ← Your generated projects
│  ├─ my-api/
│  ├─ my-cli/
│  └─ ...
├─ README.md                 # ← Your project README
└─ ...                       # ← Your other files
```

## Get started

1. Install extension
2. Run: "SDLC: Initialize Workspace"
3. Run: "SDLC: Plan to PRD"

The swarm will work autonomously, pausing only for critical approvals.

## Available Commands

### RUN_SDLC Mode
- **SDLC: Initialize Workspace** - Set up SDLC Swarm structure (installs to `.sdlc/`)
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
