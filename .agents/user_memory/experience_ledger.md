# Experience Ledger (RUN_SDLC)

Records verified outcomes and extracted learning patterns from user projects.

---

## Record Template

- **Date:**
- **Context:**
- **Outcome:**
- **Evidence:**
- **Confidence delta:**
- **Notes:**

---

## Record #001 — W03 Auth Rollback Incident

- **Date:** 2025-12-15 (Week 3)
- **Context:** release_readiness / authentication update rollback
- **Outcome:** PARTIAL FAILURE — Rollback succeeded but 500 support tickets due to session loss
- **Evidence:**
  - Users logged out unexpectedly during rollback
  - Session state not preserved across versions
  - Mean time to resolution: 4 hours
- **Confidence delta:** +0.3 to session-aware rollback requirements
- **Notes:** Auth changes must preserve session state during rollback. Added to NFR requirements.

---

## Record #002 — W04 Canary Success

- **Date:** 2026-01-08 (Week 4)
- **Context:** release_readiness / payment service update
- **Outcome:** SUCCESS — Canary caught performance regression at 20%, prevented full outage
- **Evidence:**
  - 20% canary showed p95 latency spike (3.2s vs 1.1s)
  - Rolled back before broader impact
  - Zero customer complaints
- **Confidence delta:** +0.2 to gradual canary strategies
- **Notes:** Multi-stage canary proved value. Reinforced for HIGH risk changes.

---

## Record #003 — W05 Dry Run B

- **Date:** 2026-01-29
- **Context:** release_readiness / Azure AD SSO release
- **Outcome:** APPROVED WITH CONDITIONS — 4-stage canary over 16 hours, session-aware rollback
- **Evidence:**
  - Past auth incident (Record #001) mandated session preservation
  - Past canary success (Record #002) validated gradual rollout
  - Risk score 78 (HIGH) triggered stricter governance
  - Security + Platform approvals obtained
- **Confidence delta:** +0.2 to risk-adaptive governance effectiveness
- **Notes:** Experience-weighted collapse slowed rollout from 50% initial to 10% based on past incidents. Multi-tenant gaps mitigated by extended canary observation.

---

## Record #004 — W06 Dry Run B

- **Date:** 2026-01-29
- **Context:** release_readiness / Azure AD SSO with observability metrics
- **Outcome:** SUCCESS — Quality score 82/100, Solver 100% accurate, LOW drift detected and corrected
- **Evidence:**
  - MetricsAgent: Quality 82/100 (excellent for HIGH risk), lead time 3 weeks
  - ConfidenceAgent: Solver predicted 82% → actual 82% (**perfect calibration** ⭐)
  - DriftDetector: LOW spec drift (missing outage test) caught by Security IAM domain expert
  - Drift corrected via Collapse Decision condition before production
  - Dashboard: HIGH risk governance fully applied, no blockers
- **Confidence delta:** +0.4 to domain expert drift detection, +0.3 to confidence calibration accuracy
- **Notes:** Week 6 observability proved its value: domain expert caught spec gap that testing missed, preventing incomplete implementation from reaching production. Solver accuracy now at 100%, demonstrating system is learning. Experience from Records #001-002 informed conditions (session preservation, extended canary). HIGH risk weighting (0.4) correctly prioritized safety. Observability enables continuous improvement.

---
