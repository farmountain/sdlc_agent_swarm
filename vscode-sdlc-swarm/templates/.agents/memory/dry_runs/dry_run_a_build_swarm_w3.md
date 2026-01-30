# Dry Run A — BUILD_SWARM (Week 3)

## Configuration
- **Mode**: BUILD_SWARM
- **Workflow**: architecture_review
- **Objective**: Harden swarm architecture for enterprise adoption
- **Constraints**: extension compatibility, no hidden state
- **Evidence Pointers**: .agents/memory/world_model.yaml

---

## Expected Flow

### 1. Driver (Orchestrator)
- Input: Workflow=architecture_review, Mode=BUILD_SWARM
- Action: Invoke spec_agent → test_agent → nfr_agent → domain experts → skeptic → verifier

### 2. SpecAgent
- Input: Architecture requirements for enterprise SDLC
- Output: SPEC Card
  - Claim: "Domain experts (Security/IAM, DevOps, Backend) validate architecture"
  - Requirements: extension-compatible, no hidden state, evidence-gated
  - World model: BUILD_SWARM invariants

### 3. TestAgent
- Input: SPEC Card
- Output: TEST Card
  - Functional tests: Domain expert skills exist and are callable
  - NFR tests: Performance, security, scalability
  - Evidence required: skill file structure, registry entries, workflow steps

### 4. NFRAgent
- Input: SPEC Card, TEST Card
- Output: NFR TEST Card
  - Performance: Swarm invocation time < 500ms per agent
  - Scalability: Domain experts can be added without breaking workflow
  - Observability: Each agent step is traceable
  - Security: No PII in decision cards unless approved

### 5. Domain Experts (Parallel)

#### BackendArchitect
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (Backend Architecture)
  - Claim: "Service boundaries clear, no coupling"
  - Checks: Agent skill isolation, decision card boundaries
  - Risks: Hidden state in memory

#### SecurityIAM
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (Security/IAM)
  - Claim: "No auth data in logs, audit trail enforced"
  - Checks: Evidence handling in Verifier
  - Risks: Missing approval gates

#### DevOpsPlatform
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (DevOps/Platform)
  - Claim: "Rollback procedure exists for swarm changes"
  - Checks: No breaking changes to workflow definitions
  - Risks: Backwards compatibility with Week 2

### 6. Skeptic
- Input: All Position Cards
- Output: Skeptic Card
  - Challenge: "Are domain expert cards binding or advisory?"
  - Challenge: "Can Verifier really fail a plan?"
  - Recommendation: Make domain expert findings mandatory for prod_deploy

### 7. Verifier (Evidence Gate)
- Input: SPEC, TEST, NFR TEST, Domain Expert Cards, Skeptic Card
- Output: Verification Receipt
  - Status: **PENDING** (by design—Week 3 implementation just added the framework)
  - Checks performed:
    - ✅ SPEC exists and is complete
    - ✅ TEST Card covers functional + NFR evidence
    - ✅ Domain expert cards exist for required workflows
    - ❓ World model invariants validated (checking...)
    - ✅ Required approvals identified (security_signoff)
    - ✅ Evidence pointers are concrete (.agents/skills/domain/*, .agents/registry/workflows.yaml)
  - Gaps: W03-E1 verification status still PENDING (first dry run)
  - Recommendation: Move to prod (Week 3 artifacts ready) OR request more evidence

---

## Expected Outcome

✅ **NFRAgent invoked successfully**
✅ **3 Domain Experts produce Position Cards**
✅ **Verifier acknowledges enterprise checklist**
✅ **No memory write** (by design—dry run only)
✅ **Evidence pointers are concrete**

**Status**: PENDING (ready for user validation in Dry Run B)

---

## Rollback Plan (If Needed)

- Delete: `.agents/skills/domain/*`, `.agents/skills/nfr-agent/*`
- Restore: `.agents/registry/agents.yaml` to Week 2 version
- Restore: `.agents/registry/workflows.yaml` to Week 2 version
- Restore: `.agents/skills/verifier/skill.md` to Week 2 version
