# Dry Run B — RUN_SDLC (Week 3)

## Configuration
- **Mode**: RUN_SDLC
- **Workflow**: architecture_review
- **Objective**: Review architecture for Azure AD SSO feature
- **Constraints**: enterprise IAM, audit logging, rollback required
- **Evidence Pointers**: .agents/user_memory/world_model.yaml

---

## Expected Flow

### 1. Driver (Orchestrator)
- Input: Feature=Azure AD SSO, Mode=RUN_SDLC, Workflow=architecture_review
- Action: Invoke spec_agent → test_agent → nfr_agent → domain experts → skeptic → verifier

### 2. SpecAgent
- Input: User feature request: "Add Azure AD SSO to enterprise app"
- Output: SPEC Card
  - Feature: Azure AD SSO integration
  - Scope: AuthN via OIDC, directory sync, audit logging
  - World model: RUN_SDLC constraints (enterprise safety)

### 3. TestAgent
- Input: SPEC Card
- Output: TEST Card
  - Test: OIDC token validation works
  - Test: User directory sync completes within SLA
  - Test: Audit logs contain required fields
  - Evidence: integration tests, OIDC provider docs

### 4. NFRAgent
- Input: SPEC Card, TEST Card
- Output: NFR TEST Card
  - Performance: Token exchange < 100ms
  - Availability: SSO service 99.95% uptime
  - Scalability: Support 10K concurrent users
  - Observability: All auth events logged
  - Security baselines: MFA required, encryption for secrets

### 5. Domain Experts (Parallel)

#### SecurityIAM (triggers security_signoff)
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (Security/IAM)
  - Claim: "Azure AD SSO with OIDC is enterprise-safe"
  - AuthN approach: OIDC via Azure AD
  - AuthZ model: RBAC via Azure AD groups
  - Directory integration: Azure AD sync
  - Secrets handling: OIDC client secret in Azure Key Vault
  - Audit logging: All auth events to Application Insights + Event Hub
  - Risks: Token expiration edge cases, group membership delays
  - Evidence pointers required: OIDC provider config, Key Vault policy, audit query
  - Required approvals: security_signoff

#### DevOpsPlatform (enforces rollback plan)
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (DevOps/Platform)
  - Claim: "SSO deployment safe and reversible"
  - Deployment model: Canary to prod (10% → 50% → 100%)
  - CI/CD gates: Unit tests + integration tests + audit query pass
  - **Rollback strategy**: Revert OIDC config, flag all new tokens as invalid, 30-min grace for re-auth
  - Secrets/config separation: .env per environment, no hardcoded URLs
  - Observability hooks: Auth success/failure rates per environment
  - Risks: OIDC provider unavailability → fail closed (not open)
  - Evidence pointers required: deployment plan, rollback runbook
  - Required approvals: prod_deploy

#### BackendArchitect (checks service boundaries)
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (Backend Architecture)
  - Claim: "SSO integration respects API boundaries"
  - Service boundaries: AuthService (new) calls Azure AD, App Service consumes tokens
  - API contracts: GET /auth/token, POST /auth/validate
  - Data ownership: AuthService owns token cache, App Service owns user sessions
  - Integration patterns: Async audit logging, sync token validation
  - Failure isolation: Auth service down → app rejects all requests (safe), not accepts all
  - Risks: Token cache collision in clustered deployments
  - Evidence pointers required: service diagram, API spec
  - Required approvals: architecture_review

### 6. Skeptic
- Input: All Position Cards
- Output: Skeptic Card
  - Challenge: "Is 30-min rollback grace period realistic?"
  - Challenge: "What if Azure AD is compromised?"
  - Challenge: "Audit logging can't keep up—then what?"
  - Recommendation: Test rollback scenario under load; monitor audit lag

### 7. Verifier (blocks until evidence exists)
- Input: SPEC, TEST, NFR TEST, Domain Expert Cards, Skeptic Card
- Output: Verification Receipt
  - Status: **PENDING** (evidence pointers exist, but not yet verified)
  - Checks performed:
    - ✅ SPEC exists and is complete
    - ✅ TEST Card covers functional + NFR evidence
    - ✅ Domain expert cards exist (Security/IAM, DevOps, Backend)
    - ✅ No world model invariants violated
    - ✅ Required approvals identified: security_signoff, prod_deploy, architecture_review
    - ⏳ Evidence pointers are concrete (but not yet populated): OIDC config, Key Vault policy, deployment plan, rollback runbook, service diagram, API spec
  - Gaps:
    - [ ] OIDC provider configuration (link to Azure AD app registration)
    - [ ] Key Vault audit policy (link to policy definition)
    - [ ] Deployment plan with canary thresholds (link to CI/CD definition)
    - [ ] Rollback runbook with time-to-restore estimates
    - [ ] Service diagram showing AuthService ↔ Azure AD ↔ App Service
    - [ ] API contract details (token format, validation rules)
  - Recommendation: **FAIL** until all evidence pointers are populated and verified

---

## Expected Outcome

✅ **SecurityIAM agent triggers security_signoff requirement**
✅ **DevOpsPlatform agent demands rollback plan** (30-min grace period strategy)
✅ **BackendArchitect agent validates service boundaries** (AuthService isolation)
✅ **Verifier blocks plan** (Status=FAIL) until evidence gaps filled:
   - OIDC config path
   - Key Vault policy path
   - Deployment runbook path
   - Rollback procedure with timings
   - Service diagram
   - API contract

**Status**: FAIL (waiting for evidence population)

---

## Path Forward (After Evidence Collection)

1. User populates evidence pointers in Feature Card
2. Verifier re-runs and validates evidence exists at paths
3. Verifier sets Status=PASS
4. Approvals triggered: security_signoff, prod_deploy, architecture_review
5. Memory writes only if all approvals obtained

---

## Success Criteria

- ✅ All 3 domain experts invoked and produced cards
- ✅ Verifier identified all evidence gaps
- ✅ No memory write (Verification Receipt = FAIL by design)
- ✅ User has clear checklist to fill gaps
- ✅ Next iteration will pass verification when evidence collected
