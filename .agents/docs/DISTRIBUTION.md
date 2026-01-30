# Distribution + Packaging Strategy

## Overview

This document outlines how the SDLC Agent Swarm will be **distributed** (repo-native vs extension) and **packaged** (for teams, orgs, internal adoption).

---

## Phase 1: Skills-First Distribution (Weeks 1–18)

### Primary Distribution Channel: GitHub Repository

**What users get**:

```
sdlc_agent_swarm/
├── .agents/
│   ├── driver/
│   ├── registry/
│   ├── memory/
│   ├── skills/
│   └── docs/
├── capabilities/
├── weeks/
└── README.md
```

**Installation**:

```bash
# Option A: Clone the repo
git clone https://github.com/your-org/sdlc_agent_swarm.git
cp -r sdlc_agent_swarm/.agents my-project/.agents

# Option B: Download as zip
unzip sdlc_agent_swarm.zip
cp -r sdlc_agent_swarm/.agents my-project/.agents

# Option C: Git submodule (for teams)
git submodule add https://github.com/your-org/sdlc_agent_swarm.git .agents
```

**Usage** (in Copilot Chat):

```
Use Driver. Workflow: plan_to_prd.
Product: My Feature.
Constraints: No new dependencies.
```

**Advantages**:

- ✅ Zero dependencies
- ✅ Works with any LLM (Copilot, Claude, Gemini, etc.)
- ✅ Fully customizable locally
- ✅ Vendors don't control your workflow
- ✅ Teams can fork and extend

---

### Secondary Distribution: Packaged Zip Archives

**For teams that want "ready to go"**:

```
releases/
├── sdlc-swarm-v1.0.0.zip
│   └── .agents/
├── sdlc-swarm-enterprise-v1.0.0.zip (with IAM/compliance)
│   └── .agents/ (+ extra agents)
└── sdlc-swarm-starter-v1.0.0.zip (core only)
    └── .agents/ (minimal)
```

**Variants**:

| Package | Agents Included | Use Case |
|---------|-----------------|----------|
| **Starter** | Solver, Skeptic, Verifier, core agents | Small teams, new projects |
| **Standard** | All core + domain experts | Product teams |
| **Enterprise** | All + IAM, Tenancy, Compliance, SRE | Large orgs, regulated industries |

---

## Phase 2: Thin Extension Distribution (After Week 18)

### Distribution Channel: VS Code Marketplace

**Package name**: `sdlc-swarm` or `agent-swarm-driver`

**What it does**:

1. **One-click installation** of `.agents/` to workspace
2. **Command palette entries**:
   - `SDLC: Initialize Swarm`
   - `SDLC: Plan Feature`
   - `SDLC: Code Review`
   - `SDLC: Deploy`
3. **Chat participants**: `@PlanToPRD`, `@CodeChange`, `@InfraDeploy`, `@SecurityReview`, `@Dashboard`
4. **Approval modal UI** (optional)
5. **Evidence ledger sidebar** (optional)

**Installation**:

```
User clicks: Install (in VS Code extensions marketplace)
↓
Extension activates on workspace open
↓
If .agents/ missing: "Initialize Swarm" button
↓
User clicks → .agents/ copied to workspace
↓
Use: Commands or chat participants (@PlanToPRD, @CodeChange, etc.)
```

---

## Distribution Matrix

| Need | Phase 1 (Now) | Phase 2 (Later) | Effort |
|------|---------------|-----------------|--------|
| Core swarm | ✅ GitHub repo | ✅ Extension bundle | None (same files) |
| LLM integration | ✅ Copilot Chat | ✅ Chat participant | ~30 min TS |
| Commands | ✅ Manual prompts | ✅ Palette commands | ~1 hr TS |
| Approval flow | ✅ Text decision cards | ✅ Modal UI (optional) | ~3 hrs TS |
| Team distribution | ✅ Zip + submodule | ✅ Marketplace | Built-in |
| Customization | ✅ Fork repo | ✅ Workspace overrides | Same as Phase 1 |

---

## Internal Adoption Strategy (For Your Organization)

### For Teams (< 20 people)

**How they get it**:

1. Shared repo link (GitHub URL)
2. Copy `.agents/` into their project
3. Start using in Copilot Chat
4. Optionally: Install extension (Phase 2)

**Support**:

- Documentation (README + `/docs/`)
- Example workflows (in `/weeks/`)
- Slack channel or wiki

---

### For Org (20–200 people)

**How they get it**:

1. **Org template repo**: `.github/sdlc-swarm-starter/`
   - New projects start with `.agents/` pre-installed
2. **Internal extension**: Published to internal marketplace
3. **Governance**: Org-wide world_model.yaml (audit, compliance, deployment standards)
4. **Training**: Onboarding sessions + runbooks

**Customization**:

```
org-standards/.agents/
├── registry/
│   └── org_agents.yaml (org-specific agent configs)
├── memory/
│   └── org_world_model.yaml (audit, security, deployment standards)
└── skills/
    └── org_agents/ (custom domain experts for your domains)

(Project team .agents/ inherits from org-standards)
```

---

### For Enterprise (200+ people, multi-team)

**How they get it**:

1. **Internal extension** (required, managed by platform team)
2. **Org template** (all new projects include .agents/)
3. **Central skill library** (shared domain experts, curated)
4. **Governance dashboard** (evidence ledgers, approval tracking)
5. **Telemetry** (which teams use which workflows, what evidence collected)

**Org Structure**:

```
platform-team/sdlc-swarm-enterprise/
├── extension/ (marketplace)
├── skills-library/ (curated, versioned)
├── org-world-model.yaml (enterprise standards)
├── audit-dashboard/ (telemetry + evidence aggregation)
└── governance-playbook.md

(Each team inherits from skills-library but can extend)
```

---

## Packaging Strategy (Constraints & Variants)

### Constraint 1: Always Distribute Source

Never distribute compiled/minified artifacts for skills.

```
✅ GOOD: Distribute .agents/skills/*/skill.md
❌ BAD: Distribute .agents/skills/*/skill.bin
```

**Why**: Teams need to read and customize skills.

---

### Constraint 2: All Configs in Workspace

All team-specific configs live in project `.agents/`, not in extension.

```
✅ GOOD: project/.agents/registry/agents.yaml (team customizes)
❌ BAD: Extension embeds agents.yaml
```

**Why**: Teams need to fork and override.

---

### Constraint 3: No "Phone-Home" Dependencies

Distribution must work offline or with clear optional dependencies.

```
✅ GOOD: Markdown files, YAML configs, local Copilot
❌ BAD: Extension requires cloud service to work
```

**Why**: Enterprise teams often have air-gapped environments.

---

## Versioning Strategy

### Skills Versioning

```
.agents/skills/solver/
├── skill.md
└── VERSION.md (documents: skill version, supported by driver v1.x+)

Example:
  Solver skill v1.2
  Compatible with: Driver v1.0+, Collapse policy v1.x
  Breaking changes: None
  New features: Reflexion retry budget increased to 3
```

### Registry Versioning

```
.agents/registry/
└── VERSION.md
    Swarm version: 1.0.0
    Agents: 12 (core)
    Workflows: 4 (plan_to_prd, code_change, infra_deploy, security_review)
    LTS until: 2027-01-31
```

### World Model Versioning

```
.agents/memory/
└── world_model.yaml
    version: 1.0.0
    invariants: 3 (audit, AuthZ, tenancy)
    last_updated: 2026-01-29
    org_version_override: (empty if using standard)
```

---

## Communication Strategy (When to Update Users)

### Phase 1 Launch (Week 1)

**Announce**:

```
"SDLC Agent Swarm v1.0.0 is ready.
- 12 core agents
- 4 workflows (PRD → Build → Release)
- Full documentation at /.agents/docs/

Start here: README.md
Try it: Use Driver. Workflow: plan_to_prd..."
```

**Target**: Early adopters, pilot teams

---

### Phase 1 Milestones (Weeks 4, 8, 12, 16)

**After week 4**: "Core Swarm Complete (PRD→Build happy path works)"
**After week 8**: "Enterprise Ready (IAM, Tenancy, CI/CD)"
**After week 12**: "Verification Strengthened (Tests, Perf, Audit)"
**After week 16**: "Ready for Team Distribution"

---

### Phase 2 Launch (Week 19+)

**Announce**:

```
"VS Code Extension now available (optional).
- Install from marketplace: 'sdlc-swarm'
- Or keep using GitHub repo (both work identically)
- Extension adds: Commands, modals, sidebar viewer"
```

---

## Checklist: "Ready to Distribute"

### Before Week 1 Ends

- ✅ Public GitHub repo with README
- ✅ `.agents/docs/` complete (ARCHITECTURE, WORKFLOWS, etc.)
- ✅ Week 1 deliverables repo-ready (no build step)
- ✅ Usage examples (in README + GETTING_STARTED)

### Before Week 4 Ends

- ✅ PRD→Build workflow fully working
- ✅ Capability map v1 (product model)
- ✅ EGD-Dev + EGD-Prod evidence gates documented

### Before Week 8 Ends

- ✅ Enterprise world_model seeded
- ✅ IAM + Tenancy agents complete
- ✅ Org-level adoption guide (if applicable)

### Before Week 16 Ends

- ✅ All docs updated for team distribution
- ✅ Zip packages created (starter, standard, enterprise)
- ✅ Governance playbook complete

### Before Week 19 (Extension)

- ✅ Extension skeleton ready
- ✅ marketplace metadata prepared
- ✅ Extension testing complete

---

## FAQ

### Q: Can I use the swarm without installing the extension?

**A**: Yes. GitHub repo usage (Phase 1) is primary. Extension (Phase 2) is optional convenience.

---

### Q: Can I customize skills for my team?

**A**: Yes. Fork `.agents/skills/` and override in your project. Extension will read your local version.

---

### Q: Can I distribute to my org?

**A**: Yes. Use internal template repo + internal extension (marketplace for private GitHub). See "Enterprise" section above.

---

### Q: What if I want different agents in different teams?

**A**: Each team has `.agents/registry/agents.yaml`. They inherit from org-standards but can customize.

---

### Q: Is the swarm tied to VS Code?

**A**: No. Core swarm (skills + Copilot prompts) works anywhere. VS Code is just the primary IDE integration.

---

## Success Metrics (Distribution Phase)

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| **Repo stars** | 500+ by end of year | GitHub insights |
| **Teams using** | 10+ by Week 12 | Adoption survey + telemetry |
| **Workflows executed** | 100+ by end of year | EGD-Dev log aggregation |
| **Extension installs** | 100+ by 6 months | Marketplace insights |
| **Satisfaction** | 4/5+ stars | User feedback + reviews |
| **Support burden** | < 2 hrs/week | Issue tracker metrics |

