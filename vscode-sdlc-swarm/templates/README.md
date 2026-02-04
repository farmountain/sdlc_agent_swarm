# Templates Directory

This directory contains **verbatim copies** of the SDLC Swarm framework files that get installed into user workspaces under `.sdlc/`.

## Installation Structure

When users run "SDLC: Initialize Workspace", these templates are copied to:

```
<workspace_root>/
├─ .sdlc/                    # ← Framework files (isolated from user projects)
│  ├─ .agents/               # ← Agent skills, registry, memory
│  ├─ capabilities/          # ← Capability documentation
│  ├─ weeks/                 # ← Week-by-week learning guides
│  └─ adoption/              # ← Onboarding documentation
├─ projects/                 # ← User project files (separate from framework)
│  ├─ my-api/
│  ├─ my-cli/
│  └─ ...
├─ README.md                 # ← User's project README (not framework README)
└─ ...                       # ← Other user files
```

## Required Structure

```
templates/
├─ .agents/
│  ├─ driver/
│  ├─ verifier/
│  ├─ skills/
│  ├─ registry/
│  ├─ memory/
│  └─ user_memory/
├─ capabilities/
│  └─ (capability files)
├─ weeks/
│  ├─ week-01/
│  ├─ week-02/
│  └─ (other weeks)
└─ adoption/
   └─ (adoption guides)
```

## Design Principles

### 1. Framework Isolation
- **All framework files** live under `.sdlc/`
- **User project files** live in workspace root or `projects/`
- **No mixing**: Framework READMEs don't conflict with project READMEs

### 2. Clean Separation
- `.sdlc/.agents/` - Agent skills and framework logic
- `.sdlc/.agents/memory/` - Framework development evidence (BUILD_SWARM mode)
- `.sdlc/.agents/user_memory/` - User project evidence (RUN_SDLC mode)
- `projects/` - User-generated projects, APIs, CLIs, apps

### 3. Upgrade-Safe
- Users can upgrade framework by deleting `.sdlc/` and re-initializing
- User projects in `projects/` are never touched by extension

## How to Populate

When building the extension for distribution:

1. Copy the entire `.agents/` folder from the main repository
2. Copy the entire `capabilities/` folder
3. Copy relevant `weeks/` content (or all of it)
4. Copy the entire `adoption/` folder

## Safety Rules

The extension will **never overwrite** these files during initialization:
- `evidence_*.md`
- `decisions_log.md`
- `experience_ledger.md`
- `risk_ledger.md`
- `metrics_ledger.md`
- `confidence_ledger.md`
- `drift_ledger.md`

## Why This Exists

This folder allows users to:
- Install the SDLC Swarm framework with one command
- Keep framework separate from their projects
- Get started without manual folder creation
- Receive framework updates without touching their code
- Have clean project READMEs that don't conflict with framework docs

The extension remains **thin** - it only copies files to `.sdlc/`, never executes logic.
