# Agent Roles Reference

## Overview

Each agent role has a specific responsibility in the swarm. All roles are declared in `.agents/registry/agents.yaml` and implemented in `.agents/skills/[role]/skill.md`.

---

## Core Agents

### 1. Driver (Orchestrator)

**Type**: Orchestrator  
**Permissions**: read, propose  
**Skill**: `.agents/driver/skill.md`

**Responsibility**:
- Entry point for all workflows
- Reads user request → matches workflow in `workflows.yaml`
- Invokes agent pipeline in correct sequence
- Collects "Position Cards" from all agents
- Applies collapse policy (weighted consensus)
- Determines if approval gate needed
- Escalates to humans with Decision Card
- After approval → triggers Memory Agent

**Output**:
- Orchestration log
- Consensus summary
- Next 3 actions
- Approval status (Y/N)
- Evidence needed

**Key Protocol**:
- Read `workflows.yaml` to determine steps
- Call each agent skill in sequence
- Aggregate Position Cards
- Apply penalties/boosts from collapse_policy.md
- Produce final recommendation
- Gate approval if needed

---

### 2. Solver (Generator)

**Type**: Generator  
**Permissions**: read, propose  
**Skill**: `.agents/skills/solver/skill.md`

**Responsibility**:
- Propose initial solution to the problem
- Outline plan with concrete steps
- Identify resources needed
- Estimate effort/timeline
- Baseline for consensus collapse

**Position Card Includes**:
- Clear claim(s) about what should happen
- Step-by-step plan
- Evidence from repo / docs / standards
- Initial risk list
- Confidence level
- Effort estimate (Low/Med/High)

**Does NOT**:
- Deep-dive into failure modes (that's Skeptic)
- Enforce enterprise rules (that's Verifier/Domain Experts)
- Minimize solution (that's Minimalist)

---

### 3. Skeptic (Critic)

**Type**: Critic  
**Permissions**: read, challenge  
**Skill**: `.agents/skills/skeptic/skill.md`

**Responsibility**:
- Challenge Solver's assumptions
- Identify failure modes
- Surface edge cases
- Find missing requirements / gaps
- Escalate risky blind spots

**Position Card Includes**:
- Top 3–5 risks with the Solver plan
- Missing assumptions
- Edge cases not addressed
- Alternative approaches (if better)
- Skepticism score (how risky is this?)
- Mitigation paths

**Example Challenge**:
- "No rollback plan if DB migration fails"
- "Single point of failure in cache layer"
- "Missing handling for concurrent requests"

---

### 4. Minimalist (Simplifier)

**Type**: Simplifier  
**Permissions**: read, propose  
**Skill**: `.agents/skills/minimalist/skill.md`

**Responsibility**:
- Reduce Solver plan to **smallest viable solution**
- Remove "nice-to-haves"
- Consolidate steps
- Minimize dependencies / complexity
- Keep core functionality only

**Position Card Includes**:
- Simplified plan (fewer steps)
- Removed items (and why)
- New dependencies eliminated?
- Effort reduction (estimated)
- Risk increase (if any, from simplification)
- Justification

**Example Simplification**:
- Instead of: "Migrate old DB → new DB → validate → cutover"
- Simpler: "Run dual-write → validate silent → cutover"

---

### 5. Verifier (Validator)

**Type**: Validator  
**Permissions**: read, verify  
**Skill**: `.agents/skills/verifier/skill.md`

**Responsibility**:
- Validate final plan against **world model invariants**
- Check for compliance violations
- Verify audit trail requirements
- Enforce authorization gates
- Ensure tenancy isolation
- Approve or flag for remediation

**Position Card Includes**:
- World model alignment check (✅/❌ per invariant)
- Evidence that invariants are met
- Audit trail compliance
- AuthZ enforcement
- Tenancy isolation verification
- Remediation items (if any)
- **Verification Receipt** (for Memory Agent)

**Invariants Checked** (from world_model.yaml):
- ✅ All writes have audit trail
- ✅ AuthZ gates every sensitive endpoint
- ✅ Tenancy boundaries enforced (data + API)
- ✅ No secrets in logs/config
- ✅ Compliance requirements met
- ✅ Rollback plan exists (if irreversible)

---

### 6. Domain Experts (Specialist Enforcers)

#### 6a. Backend Architect

**Type**: Specialist  
**Permissions**: read, propose  
**Skill**: `.agents/skills/domain/backend-architect/skill.md`

**Responsibility**:
- Backend feasibility (APIs, data model, scale, performance)
- Database design (normalization, indexing, partitioning)
- Async/queue design
- Cache strategy
- API versioning / contracts

**Position Card Includes**:
- Backend design (API spec, data model sketch)
- Scale assumptions (QPS, data volume)
- Database strategy
- Async/job strategy
- Performance risks
- Tech debt implications

---

#### 6b. Frontend Architect

**Type**: Specialist  
**Permissions**: read, propose  
**Skill**: `.agents/skills/domain/frontend-architect/skill.md`

**Responsibility**:
- Frontend feasibility (UX, performance, accessibility)
- Component architecture
- State management
- Performance (FCP, LCP, CLS)
- Mobile / cross-browser concerns

**Position Card Includes**:
- Frontend design (layout, components, state)
- Performance targets (FCP, LCP, etc.)
- Accessibility checklist
- Mobile concerns
- Browser compatibility
- Build / bundle strategy

---

#### 6c. DevOps Platform Architect

**Type**: Specialist  
**Permissions**: read, propose  
**Skill**: `.agents/skills/domain/devops-platform/skill.md`

**Responsibility**:
- Infrastructure design (k8s, VMs, containers)
- Multi-cluster strategy
- Blue-green / canary deployment
- Scaling strategy
- Monitoring / alerting
- Disaster recovery

**Position Card Includes**:
- Deployment architecture (target clusters/regions)
- Canary strategy (% rollout, metrics gates)
- Monitoring requirements
- Rollback procedure (tested?)
- Performance assumptions
- Cost estimate

---

#### 6d. Security IAM Architect

**Type**: Specialist  
**Permissions**: read, propose  
**Skill**: `.agents/skills/domain/security-iam/skill.md`

**Responsibility**:
- Authentication (OIDC, SAML, mTLS)
- Authorization (RBAC, ABAC, policy engines)
- Secrets management
- Encryption (in transit, at rest)
- Tenancy isolation
- Audit logging

**Position Card Includes**:
- AuthN approach (OIDC, SAML, etc.)
- AuthZ model (RBAC/ABAC, policy spec)
- Secrets rotation strategy
- Encryption strategy
- Tenancy isolation mechanism (code + DB enforcement)
- Audit logging requirements
- Compliance checklist

---

#### 6e. CLI Development Expert

**Type**: Specialist  
**Permissions**: read, propose  
**Skill**: `.agents/skills/domain/cli-expert/skill.md`

**Responsibility**:
- Command structure (single vs multi-command)
- Argument parsing & validation
- Help text and usage examples
- Exit codes and error handling
- CLI UX (progress indicators, JSON output)
- Build & distribution (bundling, packaging)

**Position Card Includes**:
- Command definitions and options schema
- Validation rules and defaults
- Help text examples
- Exit code map (0-7)
- Packaging & distribution notes
- CLI test strategy

---

#### 6f. Data Architect

**Type**: Specialist  
**Permissions**: read, propose  
**Skill**: `.agents/skills/domain/data-architect/skill.md`

**Responsibility**:
- Data model design
- ETL / data pipeline design
- Schema evolution strategy
- Data migration (reversibility)
- Data governance (PII classification, retention)
- Analytics / BI strategy

**Position Card Includes**:
- Data model (schema, relationships)
- Data pipeline architecture
- Schema migration strategy (reversible?)
- PII classification
- Retention policy
- Analytics considerations
- Data quality / validation

---

### 7. Memory Agent (Memory Persistence)

**Type**: Memory  
**Permissions**: read, write_memory  
**Skill**: `.agents/skills/memory-agent/skill.md`

**Responsibility**:
- Never write to memory without **Verification Receipt** from Verifier
- Persist decisions to `.agents/memory/`
- Create timestamped snapshots
- Maintain evidence index
- Update decisions log

**Write Protocol**:
1. Receive Verification Receipt from Verifier (must include ✅)
2. Extract consensus decision + evidence
3. Write to:
   - `.agents/memory/decisions_log.md` (append)
   - `.agents/memory/snapshots/YYYY-MM-DD_HHMM.md` (new file)
   - Update `.agents/memory/world_model.yaml` (evidence_index)
4. Include:
   - What changed
   - Why (decision rationale)
   - Evidence pointers (links to files/PRs/docs)
   - Timestamp + approver
   - Rollback plan (if applicable)

**Does NOT**:
- Write memory for rejected decisions
- Invent evidence
- Overwrite previous decisions
- Write without Verifier approval

---

### 8. Compliance-Risk (Risk Assessor)

**Type**: Risk  
**Permissions**: read, flag_risk  
**Skill**: `.agents/skills/compliance-risk/skill.md`

**Responsibility**:
- Flag regulatory / compliance risks
- Assess breach severity (LOW/MED/HIGH/CRITICAL)
- Recommend remediation
- Escalate to compliance team if needed
- Track open risks in world_model.yaml

**Position Card Includes**:
- Risk findings (regulatory, compliance, security)
- Severity per risk (LOW/MED/HIGH/CRITICAL)
- Compliance framework (SOC2, HIPAA, GDPR, etc.)
- Remediation items
- Timeline to remediate
- Escalation recommendation

---

## Agent Communication Protocol

### Position Card (Standard Output)

All agents produce:

```markdown
## [Agent Role] Position Card

**Claim(s)**
- Claim 1
- Claim 2

**Plan**
- Step 1: ...
- Step 2: ...
- Step 3: ...

**Evidence**
- [Evidence 1](link)
- [Evidence 2](link)

**Risks**
- Risk 1 (Severity: HIGH)
- Risk 2 (Severity: LOW)

**Confidence**: 0.85 (0–1)
**Cost**: Medium (Low/Med/High)
**Reversibility**: Easy (Easy/Hard)
```

### Collapse Rule (Driver → Consensus)

1. **Baseline**: Start with Solver Position Card
2. **Apply Skeptic**: If Skeptic finds HIGH-risk gaps → request mitigation
3. **Apply Domain Experts**: If any expert finds violations → request remediation
4. **Apply Minimalist**: If more complex than needed → simplify
5. **Apply Verifier**: If any invariant violated → request fix
6. **Apply Compliance-Risk**: If regulatory flag → escalate to approval gate
7. **Consensus**:
   - Accept if: Verifier ✅ AND (no HIGH risks OR risks mitigated OR gated by approval)
   - Reject if: Verifier ❌ OR Skeptic finds unmitigated fatal flaw
   - Request Revision if: Fixable gaps found

---

## Adding New Agents (Extension Points)

To add a new domain expert or specialist:

1. Create folder: `.agents/skills/[new_role]/`
2. Create `skill.md` with Position Card template
3. Add to `.agents/registry/agents.yaml` with role/permissions
4. Reference in relevant workflows `.agents/registry/workflows.yaml`
5. Define approval gates (if needed) in `.agents/driver/approval.md`

