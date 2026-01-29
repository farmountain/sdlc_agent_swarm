# Extension-Stable Interface (ESI)

## The Contract Surface the Extension Can Safely Rely On

These paths, schemas, and protocols **must be stable and backwards-compatible** across all weeks and phases.

Extensions assume these exist and work predictably.

---

## ESI-1: Fixed Paths (Non-Negotiable Locations)

These paths are **canonical** and must never move:

### Driver & Orchestration

```
.agents/driver/skill.md              # Driver agent definition
.agents/driver/approval.md           # Approval gate templates
.agents/driver/runbook.md            # Execution protocol
```

### Registry (Configuration)

```
.agents/registry/agents.yaml         # Agent roles + permissions
.agents/registry/workflows.yaml      # Workflow definitions
.agents/registry/collapse_policy.md  # Scoring + consensus rules
.agents/registry/risk_policy.yaml    # Risk categorization + escalation
.agents/registry/personas.yaml       # User personas for prompts
```

### Memory (Persistent State)

```
.agents/memory/world_model.yaml      # Enterprise requirements + invariants
.agents/memory/evidence_dev.md       # Development evidence ledger
.agents/memory/evidence_prod.md      # Product evidence ledger
.agents/memory/decisions_log.md      # Decision history + approvals
.agents/memory/snapshots/            # Timestamped state records
```

### Capabilities (Product Definition)

```
/capabilities/capability_map.md      # Capability taxonomy
/capabilities/quality_gates.md       # Testable acceptance criteria
/capabilities/telemetry_kpis.md      # Success metrics + KPIs
```

### Distribution (Metadata)

```
/distribution/INSTALL.md             # Installation guide
/distribution/UPGRADE.md             # Safe upgrade procedures
/distribution/EXTENSION_CONTRACT.md  # This contract
/distribution/EXTENSION_MAPPING.md   # Commands ↔ Workflows
```

---

## ESI-2: Workflow Invocation Protocol (Text-Based, Immutable)

All workflows are invoked by sending a **structured request** to Copilot Agent Mode.

### Canonical Invocation Payload

```markdown
Use Driver.

Mode: [BUILD_SWARM | RUN_SDLC]
Workflow: [workflow_name]
Objective: [user goal]
Constraints: [optional limitations]
Context: [optional file pointers]
```

### Example 1: Product builder invoking workflow

```
Use Driver.
Mode: BUILD_SWARM
Workflow: release_readiness
Objective: Prepare swarm v0.2 for release
EvidencePointers: .agents/memory/evidence_dev.md
```

### Example 2: User project invoking workflow

```
Use Driver.
Mode: RUN_SDLC
Workflow: plan_to_prd
Objective: Feature PRD for SSO integration
Constraints: No new external dependencies
WorldModel: .agents/memory/world_model.yaml
```

### Protocol Guarantees

✅ This invocation protocol must:

- Be deterministic (same input → same orchestration)
- Be backwards-compatible (older requests still work)
- Be routable via Copilot Agent Mode
- Produce Position Cards from all agents
- Require no extension-specific syntax

✅ Extensions can rely on:

- Workflow names in `workflows.yaml`
- Mode values (BUILD_SWARM, RUN_SDLC)
- Deterministic step ordering
- Position Card outputs

---

## ESI-3: Position Card Schema (Agent Output Format)

All agents output the **same structured format**. This is the "API" between agents and the system.

### Canonical Position Card Template

```markdown
## [Agent Role] Position Card

**Claim(s)**
- [What is true / what we know / what must happen]

**Plan**
- Step 1: [concrete action]
- Step 2: [concrete action]
- Step 3: [concrete action]

**Evidence**
- [Artifact 1](path/to/artifact.md)
- [Artifact 2](link)
- [Standard reference](link)

**Risks**
- Risk 1 (Severity: HIGH/MED/LOW)
  - Mitigation: [how to address]
- Risk 2 (Severity: HIGH/MED/LOW)

**Confidence**: [0.0 - 1.0]
**Cost**: [Low | Medium | High]
**Reversibility**: [Easy | Hard]

**Invariant Violations** (if any)
- [violated invariant 1]: [why]
- [violated invariant 2]: [why]

**Required Approvals** (if any)
- [approval gate]: [why needed]
```

### Why This Matters

- **Extension can parse** Position Cards to extract decisions
- **Verifier uses same schema** to validate claims
- **Memory Agent preserves** this structure for audit trail
- **Future AI systems** can work with the same format

### Backwards Compatibility Rule

✅ You can **add** new optional fields to Position Card.
❌ You must **never** remove or rename existing fields.

---

## ESI-4: Approval Gate Protocol (Text, Not Code)

All approval gates work via **Decision Cards** — Markdown documents, not code.

### Canonical Decision Card Location

```
.agents/memory/decisions_log.md
```

### Decision Card Format (Immutable Schema)

```markdown
# DECISION CARD — [Workflow] — [Date]

**Workflow**: [workflow_name]
**Date**: [ISO 8601]
**Decision ID**: [uuid]
**Risk Level**: [GREEN | YELLOW | RED]

## What's Being Decided?
[Clear, concise description of choice]

## Options
- [ ] ✅ APPROVE
- [ ] ❌ REJECT
- [ ] 🔁 REVISE (constraints)

## Evidence
- [Link 1]: [description]
- [Link 2]: [description]

## Rollback Plan
[Steps to undo if wrong]

## Human Approval Response
→ [email | Slack | extension modal | GitHub comment]

## Outcome
- [ ] Approved on [date] by [person]
- [ ] Rejected on [date] by [person]
- [ ] Revised on [date] with constraints
```

### Why This Matters

- Extension can display Decision Card in a modal
- Same approval flow works without extension (email response)
- Decisions are auditable (appended to decisions_log.md)
- No extension state → portable across IDEs

---

## ESI-5: World Model Invariants (Immutable Rules)

The world model defines **constraints that never change** (unless explicitly updated via verifier receipt).

### Canonical Invariants (Non-Negotiable)

```yaml
invariants:
  - "All write operations require audit trail"
  - "AuthZ must gate every sensitive endpoint"
  - "Tenancy boundaries must be enforced at data + API layers"
  - "All decisions must have evidence pointers"
  - "Memory writes require Verifier receipt"
  - "Approval gates prevent unreviewed risky actions"
```

### Why This Matters

- Verifier checks these (no updates without proof)
- Extensions can assume these are enforced
- No agent is allowed to violate these
- They form the **non-negotiable contract** with the system

---

## ESI-6: Memory Write Protocol (No Hidden State)

All state changes to `.agents/memory/**` follow a **strict receipt protocol**.

### Canonical Memory Write Flow

```
Verifier ✅ APPROVES
    ↓
Verifier produces "Verification Receipt"
    ↓
Memory Agent reads receipt
    ↓
Memory Agent appends to decisions_log.md
    ↓
Memory Agent creates snapshot: snapshots/YYYY-MM-DD_HHMM.md
    ↓
Memory Agent updates evidence_index in world_model.yaml
    ↓
COMPLETE (all state changes logged)
```

### Why This Matters

- Extension can trust that state in `.agents/memory/**` is:
  - Verified
  - Audited
  - Replayed
  - Snapshot'd

- No hidden mutations outside the protocol

---

## ESI-7: Backwards Compatibility Rules

All changes to ESI must maintain these **compatibility guarantees**:

### ✅ Allowed Changes

- Add new optional fields to Position Card
- Add new risk categories to risk_policy.yaml
- Add new invariants to world_model.yaml
- Add new workflows to workflows.yaml
- Add new agents to agents.yaml

### ❌ Forbidden Changes

- Remove or rename existing fields in Position Card
- Remove or rename workflow names
- Remove or rename paths (ESI-1)
- Change approval gate protocol structure
- Break world model invariants (only via explicit process)

---

## ESI Audit Checklist

Before any PR merge (Weeks 1–18):

- [ ] All ESI paths are stable (no moves, renames)
- [ ] Workflow invocation protocol is unchanged
- [ ] Position Card schema has no breaking changes
- [ ] Approval gates follow canonical format
- [ ] World model invariants are documented
- [ ] Memory write protocol is enforced
- [ ] Backwards compatibility is maintained

If any violation → fix before merge.

---

## Extension Can Build On This Foundation

Once ESI-1 through ESI-7 are locked, the extension can safely:

- ✅ Read `.agents/registry/workflows.yaml` to populate commands
- ✅ Invoke workflows via canonical protocol
- ✅ Parse Position Cards
- ✅ Display Decision Cards
- ✅ Navigate `.agents/memory/**`
- ✅ Assume invariants are enforced

No special logic needed in extension. It's just a file router.

---

## Final Contract

> **If ESI-1 through ESI-7 are honored, the extension is guaranteed to be:
> - Simple (no intelligence)
> - Stable (can't break)
> - Portable (works offline, any LLM)
> - Future-proof (Phase 1 → Phase 2 costs ~40 hours)**

Honor ESI, and extension conversion is mechanical.

Break ESI, and you'll rewrite everything in Phase 2.

Choose wisely. ⚖️

