# Dry Run B — RUN_SDLC (Week 5)

## Configuration
- **Mode**: RUN_SDLC
- **Workflow**: release_readiness
- **Objective**: Release Azure AD SSO with minimal blast radius
- **Constraints**: rollback <10 min, security approval
- **Evidence Pointers**: .agents/user_memory/experience_ledger.md

---

## Expected Flow

### 1. Driver (Orchestrator)
- Input: Workflow=release_readiness, Mode=RUN_SDLC
- Action: Invoke test_agent → nfr_agent → cicd_agent → prod_safety → domain experts → skeptic → experience_agent → risk_scorer → collapse_agent → verifier → release_manager

### 2. TestAgent
- Input: Azure AD SSO implementation
- Output: TEST Card
  - Functional tests: Login flow, token refresh, logout
  - Integration tests: Azure AD tenant config, user provisioning
  - Regression tests: Existing auth still works
  - Evidence: test/auth/azure_ad_spec.test.ts (85% coverage)

### 3. NFRAgent
- Input: TEST Card
- Output: NFR TEST Card
  - Performance: Login latency < 2s (p95)
  - Availability: 99.9% uptime during rollout
  - Security: Token rotation every 1hr, no plaintext secrets
  - Observability: Login metrics, error tracking
  - Evidence: perf tests pass, security scan clean

### 4. CICDAgent
- Input: TEST + NFR Cards
- Output: CI/CD Evidence Card
  - Pipeline: Azure Pipelines (multi-stage)
  - Stages: Build → Test → Staging → Prod (manual gate)
  - Coverage: Unit 85%, Integration 70%, E2E 60%
  - Artifacts: Docker image, Helm chart v1.3.2
  - Evidence: Pipeline run #4521 GREEN

### 5. ProdSafetyAgent
- Input: CI/CD Card + NFR Card
- Output: Production Safety Card
  - Rollback plan: Helm rollback to v1.3.1 (< 10 min)
  - Blast radius: 20% canary → 50% → 100% over 4 hours
  - Monitoring: Azure App Insights, login error alerts
  - Incident response: Oncall rotation updated, runbook v2.1
  - Evidence: Rollback tested in staging, runbook reviewed

### 6. Domain Expert (DevOpsPlatform)
- Input: All cards
- Output: Position Card (DevOps)
  - Claim: "Gradual rollout required for auth changes"
  - Rationale: Past auth incidents affected all users (W03 experience)
  - Risks: Azure AD throttling at 50%+ adoption
  - Confidence: HIGH (learned from previous incident)

### 7. Skeptic
- Input: All cards + DevOps Position
- Output: Skeptic Card
  - Concerns:
    - Azure AD tenant misconfiguration risk
    - Token refresh edge cases under load
    - Rollback might not preserve session state
  - Questions:
    - Have we tested rollback with active sessions?
    - What's the Azure AD throttling limit?
  - Residual risks: Multi-tenant scenarios not fully tested

### 8. ExperienceAgent (NEW)
- Input: Past release readiness receipts
- Output: Experience Records
  - **Past outcome 1**: "Auth rollback without session handling → 500 support tickets (W03)"
    - Signal: Session preservation critical
    - Confidence impact: +0.3 to rollback testing
  - **Past outcome 2**: "Canary rollout prevented full outage (W04)"
    - Signal: Gradual adoption works
    - Confidence impact: +0.2 to canary strategy
  - Reusability: Applies to all auth + user-facing changes

### 9. RiskScorer (NEW)
- Input: SPEC, TEST, NFR, CI/CD, Safety Cards, Domain Expert, Experience Records
- Output: Risk Score Card
  - Risk score: **78/100 (HIGH)**
  - Dimensions:
    - Security: HIGH (auth = crown jewels)
    - Blast radius: HIGH (all users affected)
    - Novelty: MEDIUM (Azure AD is new, auth is not)
    - Reliability: MEDIUM (rollback tested but session edge cases)
  - Drivers: Auth criticality + past incident experience
  - Required governance: **HIGH** → Domain + NFR + approvals + stricter verifier

### 10. CollapseAgent (NEW)
- Input: All position cards + Risk Score + Experience Records
- Output: Collapse Decision
  - **Accepted plan**: 
    - 10% canary (4 hours) → 30% (4 hours) → 60% (4 hours) → 100%
    - Session-aware rollback (preserve active sessions)
    - Azure AD throttling monitoring enabled
  - **Rejected alternatives**:
    - 50% initial canary → too aggressive given HIGH risk score
    - Rollback without session handling → past experience shows unacceptable UX
  - **Weighting rationale**:
    - DevOps position (HIGH confidence) + past incident (+0.3) → session handling mandatory
    - Risk score 78 (HIGH) → slower rollout than originally planned
    - Skeptic concerns validated by experience → throttling monitoring added
  - **Residual risks**: Multi-tenant edge cases (mitigated by canary)
  - **Required follow-ups**: Monitor Azure AD throttling at each stage

### 11. Verifier (Enhanced - HIGH governance)
- Input: All cards + Collapse Decision
- Output: Verification Receipt
  - Status: **PASS** (with conditions)
  - Checks performed:
    - ✅ TEST Card complete (85% coverage exceeds threshold)
    - ✅ NFR Card complete (all dimensions covered)
    - ✅ CI/CD pipeline GREEN (#4521)
    - ✅ Production Safety Card complete
    - ✅ Rollback plan documented AND session-aware
    - ✅ Collapse Decision exists
    - ✅ Weighting rationale explicit (experience-driven)
    - ✅ Risk score (78) aligns with HIGH governance applied
    - ✅ No unresolved conflicts
    - ⚠️ Multi-tenant testing partial → mitigated by canary
  - Evidence verified:
    - test/auth/azure_ad_spec.test.ts
    - docs/runbooks/auth_incident_response_v2.1.md
    - .agents/user_memory/experience_ledger.md (W03 incident)
  - **Stricter HIGH governance**: Approvals mandatory, partial test coverage requires explicit mitigation
  - Recommendation: APPROVE with staged rollout

### 12. ReleaseManager
- Input: Verification Receipt (PASS) + Risk Score (HIGH)
- Action: 
  - Approval: Security + Platform team signoff REQUIRED (HIGH risk)
  - Release plan: 4-stage canary over 16 hours
  - Monitoring: Dashboard + automated rollback triggers
- Output: Release approved for staging gate (prod pending canary metrics)

### 13. MemoryAgent
- Input: Verification Receipt (PASS)
- Action: Update .agents/user_memory/
  - experience_ledger.md: Record decision rationale
  - risk_ledger.md: Log HIGH risk release with mitigations
  - Evidence: Add Azure AD release to evidence_prod.md

---

## Key Week 5 Behaviors Demonstrated

1. **Experience Reuse**: W03 auth incident directly shapes rollback plan
2. **Risk-Adaptive Governance**: Score 78 → HIGH → stricter verifier + mandatory approvals
3. **Weighted Convergence**: Past session handling failure outweighs optimism about new approach
4. **Adaptive Quality Gates**: G5 triggers domain + NFR + approval requirements
5. **Learning Loop**: Canary success from W04 reinforced; session handling lesson from W03 applied

---

## Expected Outcomes

✅ Higher risk → stricter gates automatically  
✅ Collapse decision favors evidence-backed plans over aggressive rollout  
✅ Verifier enforces HIGH governance (approvals mandatory)  
✅ Experience from past incidents prevents repeat failures  
✅ RUN_SDLC loop improves user project outcomes over time

---

## Risk Score Impact Comparison

| Scenario | Risk Score | Governance | Approval Required | Rollout Speed |
|----------|------------|------------|-------------------|---------------|
| Low-risk feature | 25 | LOW | No | Fast (single deploy) |
| Standard API change | 45 | MED | Optional | Medium (2-stage) |
| **Auth change (this)** | **78** | **HIGH** | **Yes** | **Slow (4-stage)** |

**Week 5 enables**: Governance adapts to risk automatically, not by manual policy.
