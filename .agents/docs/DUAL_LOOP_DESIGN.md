# Dual-Loop Design

## How to Keep "Building Your Product" Separate from "Your Product Helping Users Build"

This is critical to avoid governance confusion and architectural debt.

---

## The Two Loops (Clear Separation)

### Loop 1: Meta Loop (Builder Loop)

**Purpose**: Spec + TDD + evidence-gated development for **your SDLC swarm product itself**.

**What it governs**: Your repo (`.agents/`, capabilities, ledgers, world model, workflows)

**Who uses it**: You + your team

**What is being built**: The SDLC swarm product (skills-first → extension later)

**Outcome**: A reliable, distributable "SDLC Swarm OS"

**Evidence lives in**: `.agents/memory/evidence_dev.md` and `/evidence_prod.md`

### Loop 2: User Loop (Runtime SDLC Loop)

**Purpose**: Spec + TDD + evidence-gated SDLC **as a service** for end users to build their own projects.

**What it governs**: User project repo (their PRDs, code, tests, pipelines, releases)

**Who uses it**: Your colleagues / customers

**What is being built**: Their software system

**Outcome**: Their project shipped with auditable, spec/TDD-driven evidence gates

**Evidence lives in**: `.agents/user_memory/evidence_dev.md` and `/evidence_prod.md`

---

## Why You Must Separate Them

### The Confusion Problem

If you don't separate these loops, you confuse:

- Product readiness vs user workflow correctness
- Your internal evidence vs user project evidence
- Your world model vs their domain world model
- Your governance vs their governance

**Result**: The system feels bureaucratic and inconsistent.

### Example of Confusion (If Not Separated)

```
❌ BAD: Single evidence_dev.md

Entries like:
  - "Week 1: Built Driver skill" (Loop 1 — product)
  - "Team A: Approved PRD for feature X" (Loop 2 — user)
  - "Built collapse_policy" (Loop 1 — product)
  - "Team B: Approved deployment to prod" (Loop 2 — user)

→ Impossible to audit: what's product status vs user status?
→ Evidence gets tangled
→ Governance inconsistent
```

### Example of Clarity (If Separated)

```
✅ GOOD: Two evidence ledgers

.agents/memory/evidence_dev.md (Loop 1 — product only):
  - "Week 1: Built Driver skill"
  - "Built collapse_policy"
  - "Reviewed ESI-1 paths"
  - "Week 2: agents.yaml implemented"

.agents/user_memory/evidence_dev.md (Loop 2 — user only):
  - "Team A: Approved PRD for feature X"
  - "Team B: Built API endpoint"
  - "Team C: Approved deployment to prod"

→ Clear audit trail for each level
→ No confusion
→ Governance is transparent
```

---

## Implementation: Two Evidence Ledgers Per Repo

### In Product Repo (Loop 1)

```
.agents/memory/
├── evidence_dev.md          # "Did we build swarm correctly?"
├── evidence_prod.md         # "Is swarm feature-complete and enterprise-ready?"
├── world_model.yaml         # Product world model
│   └── invariants:
│       - Extension compatibility
│       - No hidden state
│       - Evidence receipts
│       - Workflow protocol stability
└── decisions_log.md         # Product decisions + approvals
```

### In User Project Repo (Loop 2)

Your product installs templates:

```
.agents/user_memory/
├── evidence_dev.md          # "Did feature get built correctly?"
├── evidence_prod.md         # "Is feature ready for release?"
├── world_model.yaml         # User enterprise world model
│   └── invariants:
│       - IAM, tenancy, CI/CD
│       - Domain-specific (banking, travel, etc.)
│       - User-specific SLAs
└── decisions_log.md         # User decisions + approvals
```

---

## Two World Models (Key Insight)

### World Model 1: Product World Model

**Location**: `.agents/memory/world_model.yaml`

**Defines invariants for**: The SDLC swarm product itself

**Examples of invariants**:

```yaml
invariants:
  # Extension compatibility invariants
  - "No logic outside Markdown/YAML"
  - "No hidden state in extension"
  - "No LLM embedding in code"
  
  # Product integrity invariants
  - "All skills follow Position Card schema"
  - "All workflows are in workflows.yaml"
  - "All changes are backwards-compatible"
  
  # Operational invariants
  - "ESI-1 paths are stable"
  - "Protocol invocations remain deterministic"
```

### World Model 2: User Enterprise World Model

**Location**: `.agents/user_memory/world_model.yaml`

**Defines invariants for**: The user's enterprise software project

**Examples of invariants**:

```yaml
invariants:
  # Enterprise architecture
  - "All services use Azure AD for auth"
  - "Multi-cluster deployment required"
  - "Blue-green deployment mandatory"
  
  # Compliance
  - "All writes to audit table"
  - "PII encrypted at rest"
  - "Data retention policy 90 days"
  
  # Domain-specific
  - "Payment processing must be idempotent"
  - "Tenancy isolation at database row level"
  - "SLA: 99.9% availability"
```

---

## How the Loops Work Independently

### Loop 1 Work (Product Development)

```
Developer in Loop 1:
  "Use Driver. Mode=BUILD_SWARM. Workflow=release_readiness..."

Driver:
  - Reads .agents/registry/workflows.yaml
  - Reads .agents/memory/world_model.yaml (product model)
  - Invokes: Solver → Skeptic → Verifier → Memory Agent
  - Updates: .agents/memory/evidence_dev.md

Result:
  "Swarm v0.2 is release-ready with X evidence gates passing"
```

### Loop 2 Work (User Project Development)

```
Team A in Loop 2:
  "Use Driver. Mode=RUN_SDLC. Workflow=plan_to_prd..."

Driver:
  - Reads .agents/registry/workflows.yaml (same registry)
  - Reads .agents/user_memory/world_model.yaml (user model)
  - Invokes: Solver → Skeptic → Verifier → Memory Agent
  - Updates: .agents/user_memory/evidence_dev.md

Result:
  "PRD approved with enterprise requirements met and audit trail ready"
```

**Same Driver. Different worlds.**

---

## Mode Parameter (Single Entry Point, Two Universes)

The **Mode** parameter tells Driver which loop to use:

```
Mode=BUILD_SWARM
  ↓
  Reads .agents/registry/workflows.yaml
  Reads .agents/memory/world_model.yaml (product)
  Updates .agents/memory/evidence_dev.md
  
Mode=RUN_SDLC
  ↓
  Reads .agents/registry/workflows.yaml (same)
  Reads .agents/user_memory/world_model.yaml (user)
  Updates .agents/user_memory/evidence_dev.md
```

### In Driver Invocation Protocol

```markdown
Use Driver.

Mode: BUILD_SWARM              # Loop 1 (product)
Workflow: release_readiness
Objective: Prepare v0.2 for distribution

---

OR

---

Use Driver.

Mode: RUN_SDLC                 # Loop 2 (user project)
Workflow: plan_to_prd
Objective: Build feature X
```

---

## Critical Rule: Never Overwrite User Model

The **product must never override the user's world model**.

```
❌ BAD (product overwrites user):

Product Loop 1:
  Updates .agents/user_memory/world_model.yaml
  → User loses their customizations

✅ GOOD (product proposes, user decides):

Product can suggest:
  "Your world_model.yaml is missing invariant X"
  
But user decides whether to adopt:
  "OK" → add to world_model.yaml
  "No" → skip this update
```

---

## How Users Customize Their World Model

### Inheritance Model

```
Product provides:
  .agents/memory/world_model.yaml (templates, best practices)

User customizes:
  .agents/user_memory/world_model.yaml (their specifics)

When Loop 2 runs:
  Verifier checks: .agents/user_memory/world_model.yaml
  (not the product version)
```

### Example User Customization

```yaml
# Product template: .agents/memory/world_model.yaml
invariants:
  - "All services authenticated"
  - "Multi-cluster deployment"

# User customization: .agents/user_memory/world_model.yaml
invariants:
  - "All services authenticated via Okta"    # user's choice
  - "Multi-cluster across AWS + GCP"         # user's choice
  - "Custom: payment systems use HSM"        # user adds this
  - "Custom: PCI-DSS compliance required"    # user adds this
```

---

## Installation Template (How Users Get Loop 2)

When extension / repo template installs `.agents/`:

```
/.agents/
  /driver/skill.md             # shared (Loop 1 reads)
  /registry/workflows.yaml     # shared (both use)
  /memory/world_model.yaml     # product model (Loop 1 only)

/.agents/user_memory/           # user-specific (Loop 2)
  /evidence_dev.md            # template
  /evidence_prod.md           # template
  /world_model.yaml           # template for customization
  /decisions_log.md           # template
```

User can then customize `.agents/user_memory/world_model.yaml` for their domain.

---

## Documentation Pattern (Tell Users About Both Loops)

In README or GETTING_STARTED:

```markdown
## Two Operating Modes

### Mode 1: BUILD_SWARM (For Product Development)
Use this if you're developing the SDLC swarm itself.
Evidence: .agents/memory/evidence_dev.md

### Mode 2: RUN_SDLC (For Your Project Development)
Use this if you're building software using the swarm.
Evidence: .agents/user_memory/evidence_dev.md

Both modes use the same Driver and Registry.
Each mode maintains its own world model and evidence ledgers.
```

---

## Benefits of Separation

| Benefit | Why It Matters |
|---------|----------------|
| Clear audit trails | Easy to see what's product vs user progress |
| No governance confusion | Product rules don't interfere with user domain rules |
| Customization freedom | Users can extend without forking product |
| Scalability | Multiple teams can have different user_memory worlds |
| Extension readiness | Phase 2 extension can toggle between modes seamlessly |
| Team independence | Product team and user teams can work in parallel |

---

## FAQ: Dual-Loop Design

### Q: Do users need to understand both loops?

**A**: No. Most users only care about Loop 2 (RUN_SDLC mode).
Loop 1 (BUILD_SWARM) is for internal product development.

### Q: Can I skip Loop 2?

**A**: Only if you're using the swarm for your own project (not distributing).
If you're sharing/distributing, both loops exist.

### Q: How do I migrate from single loop to dual loop?

**A**: Just create `.agents/user_memory/` alongside `.agents/memory/`.
Backward compatible — old repos still work.

### Q: Can a user have multiple world models?

**A**: Yes. Each project can have its own `.agents/user_memory/world_model.yaml`.
Different repos = different worlds.

### Q: Do the two loops ever interact?

**A**: Only when:
- Product releases a new version (updates Loop 1)
- User opts-in to adopt new product features (updates Loop 2)
- Otherwise: independent

---

## Final Statement

> **Dual-loop design keeps "building your product" cleanly separated from "your product helping users build".
> This prevents governance decay and maintains clarity as you scale.**

Implement this from Week 1, and:
- ✅ Product development is clean
- ✅ User projects are independent
- ✅ Extension is simpler
- ✅ Teams can work in parallel

Ignore this, and you'll have:
- ❌ Tangled governance
- ❌ Confused audit trails
- ❌ User customization conflicts
- ❌ Scaling problems

Choose wisely. ⚖️

