# 📦 WEEK 5 — EXPERIENCE WEIGHTING, COLLAPSE & ADAPTIVE GOVERNANCE

## Theme

> **Decisions converge by evidence-weighted experience, not vibes.**

Week 5 adds:

* **Collective intelligence** (Solver, Skeptic, Domain Experts)
* **Weighted experience collapse** (deterministic convergence)
* **Risk scoring** (controls strictness)
* **Adaptive gates** (what gets stricter/looser over time)

---

## 1️⃣ Objectives (Definition of Done)

By end of Week 5:

1. **Experience is captured, scored, and reused**
2. **Conflicting agent positions collapse deterministically**
3. **Risk score drives governance strictness**
4. **Both loops adapt**:

   * BUILD_SWARM → better product decisions
   * RUN_SDLC → better user project outcomes

---

## 2️⃣ New skills & artifacts

Create:

```
.agents/skills/
  experience-agent/skill.md
  collapse-agent/skill.md
  risk-scorer/skill.md
```

Add ledgers:

```
.agents/memory/
  experience_ledger.md
  risk_ledger.md

.agents/user_memory/
  experience_ledger.md
  risk_ledger.md
```

---

## 3️⃣ Registry updates

### Update `/.agents/registry/agents.yaml` (append)

```yaml
agents:
  experience_agent: { skill: skills/experience-agent, type: learning }
  collapse_agent: { skill: skills/collapse-agent, type: convergence }
  risk_scorer: { skill: skills/risk-scorer, type: risk }
```

### Update `/.agents/registry/workflows.yaml` (enhance)

Add to **all** decision-heavy workflows (e.g., `architecture_review`, `release_readiness`) **before Verifier**:

```yaml
steps:
  - experience_agent
  - risk_scorer
  - collapse_agent
```

---

## 4️⃣ Skill definitions (copy/paste)

### 4.1 `experience-agent/skill.md`

```md
# Skill: ExperienceAgent

## Purpose
Extract reusable experience from past verified outcomes.

## Inputs
- Mode
- Verification Receipt (PASS only)
- Evidence pointers
- Decision outcomes

## Output: Experience Record
### Experience Record
- Context signature (workflow + domain + scope):
- Outcome (success/failure/partial):
- Evidence pointers:
- Signals (what mattered):
- Confidence impact (+/-):
- Reusability tags:

## Rules
- Only PASS outcomes create experience.
- Append-only to experience_ledger.md.
```

---

### 4.2 `risk-scorer/skill.md`

```md
# Skill: RiskScorer

## Purpose
Quantify risk to adjust governance strictness.

## Inputs
- SPEC, TEST, NFR
- Domain expert cards
- CI/CD + Safety cards (if present)
- Past experience (if any)

## Output: Risk Score Card
### Risk Score Card
- Risk score (0–100):
- Dimensions (security, reliability, blast radius, novelty):
- Drivers:
- Required governance level:
  - LOW (light gates)
  - MED (standard gates)
  - HIGH (strict gates + approvals)

## Rules
- Novel + prod-impacting defaults to MED/HIGH.
- Security or tenancy impact bumps score.
```

---

### 4.3 `collapse-agent/skill.md`

```md
# Skill: CollapseAgent (Weighted Convergence)

## Purpose
Deterministically converge conflicting positions.

## Inputs
- Solver, Skeptic, Domain Expert Position Cards
- Risk Score Card
- Relevant past Experience Records

## Output: Collapse Decision
### Collapse Decision
- Accepted plan:
- Rejected alternatives:
- Weighting rationale:
  - Evidence strength
  - Role credibility
  - Past outcome similarity
- Residual risks:
- Required follow-ups:

## Rules
- Evidence > opinion.
- Higher risk → stricter acceptance.
- Unresolved conflicts → FAIL to Verifier.
```

---

## 5️⃣ Verifier upgrade (Week 5)

Edit `verifier/skill.md` to add:

```md
## Convergence Checks (Week 5+)
Verifier must confirm:
- Collapse Decision exists
- Weighting rationale is explicit
- Risk score aligns with applied gates
- No unresolved conflicts remain

Missing → FAIL.
```

---

## 6️⃣ Ledgers (templates)

### BUILD_SWARM

**`.agents/memory/experience_ledger.md`**

```md
# Experience Ledger (BUILD_SWARM)
- Date:
- Context:
- Outcome:
- Evidence:
- Confidence delta:
- Notes:
```

**`.agents/memory/risk_ledger.md`**

```md
# Risk Ledger (BUILD_SWARM)
- Date:
- Workflow:
- Risk score:
- Governance applied:
- Outcome:
```

### RUN_SDLC

Mirror the same in `.agents/user_memory/`.

---

## 7️⃣ Governance adaptation rules

Update `capabilities/quality_gates.md` (append):

```md
G5 Risk-adaptive governance:
- LOW → standard checks
- MED → domain + NFR mandatory
- HIGH → domain + NFR + approvals + stricter verifier
```

---

## 8️⃣ Week 5 dry runs

### Dry Run A — BUILD_SWARM

```
Mode=BUILD_SWARM
Workflow=architecture_review
Objective=Resolve competing design choices for swarm extensibility
Constraints=extension compatibility, no hidden state
EvidencePointers=.agents/memory/experience_ledger.md
```

**Expected:** collapse decision references past outcomes; governance adjusts by risk.

### Dry Run B — RUN_SDLC

```
Mode=RUN_SDLC
Workflow=release_readiness
Objective=Release Azure AD SSO with minimal blast radius
Constraints=rollback <10 min, security approval
EvidencePointers=.agents/user_memory/experience_ledger.md
```

**Expected:** higher risk → stricter gates; collapse favors evidence-backed plans.

---

## 9️⃣ Evidence updates

Append to BUILD_SWARM `evidence_prod.md`:

```md
### W05-P1: Experience-weighted convergence enabled
- Claim: Decisions converge via weighted experience and risk
- Evidence:
  - skills/experience-agent
  - skills/risk-scorer
  - skills/collapse-agent
- Status: PENDING
```

Append to RUN_SDLC `evidence_prod.md` similarly.

---

## 10️⃣ What Week 5 unlocks

* Collective intelligence without chaos
* Deterministic decisions under disagreement
* Governance that adapts (not static bureaucracy)
* Compounding improvement over time

---

## 🔜 Week 6 preview

* **Metrics & Confidence Calibration**
* **Drift detection**
* **Release quality scoring**
* **Org-level dashboards (still no-code)**
