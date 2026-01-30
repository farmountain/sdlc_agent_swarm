# 📦 WEEK 6 — METRICS, CONFIDENCE CALIBRATION & DRIFT CONTROL

## Theme

> **What gets measured gets trusted. What drifts gets corrected.**

Week 6 answers:

* "How confident should we be in this decision?"
* "Is the system getting better or drifting?"
* "Can leaders see quality without reading everything?"

---

## 1️⃣ Objectives (Definition of Done)

By end of Week 6:

1. **Confidence is explicit, calibrated, and tracked**
2. **Decision and release quality is scored**
3. **Drift from specs, tests, or invariants is detected**
4. **Org-level dashboards can be generated from repo artifacts**
5. **Both loops (BUILD_SWARM / RUN_SDLC) are observable**

---

## 2️⃣ New skills & artifacts

Create:

```
.agents/skills/
  metrics-agent/skill.md
  confidence-agent/skill.md
  drift-detector/skill.md
  dashboard-agent/skill.md
```

Add ledgers:

```
.agents/memory/
  metrics_ledger.md
  confidence_ledger.md
  drift_ledger.md

.agents/user_memory/
  metrics_ledger.md
  confidence_ledger.md
  drift_ledger.md
```

---

## 3️⃣ Registry updates

### Update `/.agents/registry/agents.yaml` (append)

```yaml
agents:
  metrics_agent: { skill: skills/metrics-agent, type: metrics }
  confidence_agent: { skill: skills/confidence-agent, type: calibration }
  drift_detector: { skill: skills/drift-detector, type: guard }
  dashboard_agent: { skill: skills/dashboard-agent, type: reporting }
```

### Update `/.agents/registry/workflows.yaml`

Add these **after Verifier** in key workflows (`architecture_review`, `release_readiness`):

```yaml
steps:
  - metrics_agent
  - confidence_agent
  - drift_detector
  - dashboard_agent
```

(They **observe and record** — they do not block unless drift is critical.)

---

## 4️⃣ Skill definitions (copy/paste)

---

### 4.1 `metrics-agent/skill.md`

```md
# Skill: MetricsAgent

## Purpose
Extract quantitative metrics from verified workflows and outcomes.

## Inputs
- Mode
- Verification Receipt (PASS only)
- Workflow name
- Evidence pointers
- Risk Score Card
- Collapse Decision

## Output: Metrics Record
### Metrics Record
- Workflow:
- Lead time (spec → decision):
- Evidence completeness (%):
- Rework count:
- Risk level:
- Outcome quality score (0–100):
- Notes:

## Rules
- Metrics are derived only from PASS outcomes.
- Metrics must be reproducible from repo artifacts.
```

---

### 4.2 `confidence-agent/skill.md`

```md
# Skill: ConfidenceAgent (Calibration)

## Purpose
Calibrate confidence scores against actual outcomes over time.

## Inputs
- Solver confidence
- Skeptic confidence
- Verifier status
- Metrics Record
- Past confidence outcomes

## Output: Confidence Calibration Record
### Confidence Calibration Record
- Initial confidence:
- Outcome quality:
- Calibration delta (+/-):
- Updated confidence heuristic:
- Notes:

## Rules
- Overconfidence with poor outcomes reduces weight.
- Consistent accuracy increases weight in collapse.
```

---

### 4.3 `drift-detector/skill.md`

```md
# Skill: DriftDetector

## Purpose
Detect drift from specs, tests, world models, or governance norms.

## Inputs
- SPEC Card
- TEST Card
- World model
- Recent Metrics Records
- Recent Experience Records

## Output: Drift Report
### Drift Report
- Drift type:
  - Spec drift
  - Test drift
  - Invariant erosion
  - Governance bypass
- Severity: LOW | MED | HIGH
- Evidence pointers:
- Recommended action:

## Rules
- HIGH drift requires immediate flag to Driver.
- Repeated MED drift escalates to HIGH.
```

---

### 4.4 `dashboard-agent/skill.md`

```md
# Skill: DashboardAgent (Org Visibility)

## Purpose
Generate executive- and engineer-friendly summaries from repo artifacts.

## Inputs
- Mode
- Metrics ledger
- Confidence ledger
- Risk ledger
- Drift ledger

## Output: Dashboard Snapshot
### Dashboard Snapshot
- Overall quality score:
- Risk distribution:
- Confidence trend:
- Drift alerts:
- Release readiness summary:
- Links to evidence:

## Rules
- Dashboards are read-only views.
- No interpretation without evidence links.
```

---

## 5️⃣ Ledgers (templates)

### BUILD_SWARM (mirror for RUN_SDLC)

**`.agents/memory/metrics_ledger.md`**

```md
# Metrics Ledger (BUILD_SWARM)
- Date:
- Workflow:
- Quality score:
- Lead time:
- Risk:
- Notes:
```

**`.agents/memory/confidence_ledger.md`**

```md
# Confidence Ledger (BUILD_SWARM)
- Date:
- Agent:
- Initial confidence:
- Outcome:
- Calibration delta:
```

**`.agents/memory/drift_ledger.md`**

```md
# Drift Ledger (BUILD_SWARM)
- Date:
- Drift type:
- Severity:
- Evidence:
- Action taken:
```

(Replicate under `.agents/user_memory/`.)

---

## 6️⃣ Verifier upgrade (Week 6)

Edit `verifier/skill.md` and add:

```md
## Observability Checks (Week 6+)
Verifier must ensure:
- MetricsAgent and ConfidenceAgent outputs exist
- DriftDetector has been run
- Any HIGH drift is acknowledged or blocked

Unacknowledged HIGH drift → FAIL.
```

---

## 7️⃣ Governance tightening via confidence & drift

Update `capabilities/quality_gates.md` (append):

```md
G6 Confidence-calibrated governance:
- Low confidence + high risk → stricter gates
- High confidence + low risk → streamlined gates

G7 Drift control:
- HIGH drift blocks release
- Repeated MED drift escalates governance
```

---

## 8️⃣ Week 6 dry runs

### Dry Run A — BUILD_SWARM

```
Mode=BUILD_SWARM
Workflow=release_readiness
Objective=Assess swarm v0.1 quality and readiness for broader rollout
Constraints=no hidden state, evidence-only metrics
EvidencePointers=.agents/memory/*
```

**Expected:**

* Metrics + confidence recorded
* Dashboard snapshot generated
* Drift report (likely MED due to novelty)

---

### Dry Run B — RUN_SDLC

```
Mode=RUN_SDLC
Workflow=release_readiness
Objective=Assess Azure AD SSO release quality and confidence
Constraints=enterprise IAM, rollback <10 min
EvidencePointers=.agents/user_memory/*
```

**Expected:**

* Quality score + confidence trend visible
* DriftDetector flags any spec/test erosion
* Release gated if HIGH drift

---

## 9️⃣ Evidence updates

Append to BUILD_SWARM `evidence_prod.md`:

```md
### W06-P1: Metrics, confidence, and drift control enabled
- Claim: SDLC decisions are measurable, calibrated, and drift-controlled
- Evidence:
  - skills/metrics-agent
  - skills/confidence-agent
  - skills/drift-detector
  - skills/dashboard-agent
- Status: PENDING
```

Append similarly for RUN_SDLC.

---

## 10️⃣ What Week 6 completes (major milestone)

By end of Week 6, your system has:

✅ Spec-driven contracts
✅ TDD-driven evidence
✅ Enterprise architecture gates
✅ CI/CD + prod safety
✅ Experience-weighted convergence
✅ Risk-adaptive governance
✅ **Metrics, confidence, and drift control**

This is now a **full agentic SDLC operating system**, not a demo.

---
