# Dry Run A — BUILD_SWARM (Week 5)

## Configuration
- **Mode**: BUILD_SWARM
- **Workflow**: architecture_review
- **Objective**: Resolve competing design choices for swarm extensibility
- **Constraints**: extension compatibility, no hidden state
- **Evidence Pointers**: .agents/memory/experience_ledger.md

---

## Expected Flow

### 1. Driver (Orchestrator)
- Input: Workflow=architecture_review, Mode=BUILD_SWARM
- Action: Invoke spec_agent → test_agent → nfr_agent → domain experts → skeptic → experience_agent → risk_scorer → collapse_agent → verifier

### 2. SpecAgent
- Input: Competing extensibility approaches
- Output: SPEC Card
  - Claim: "Extensions can add domain experts without breaking core swarm"
  - Requirements: Registry-based discovery, skill isolation, version compatibility
  - World model: BUILD_SWARM invariants + G5 adaptive governance

### 3. TestAgent
- Input: SPEC Card
- Output: TEST Card
  - Functional tests: Extensions can register agents, workflows remain stable
  - NFR tests: Performance, compatibility, rollback scenarios
  - Evidence required: extension contract, registry validation

### 4. NFRAgent
- Input: SPEC Card, TEST Card
- Output: NFR TEST Card
  - Performance: Extension load time < 200ms
  - Compatibility: Existing workflows unaffected
  - Observability: Extension health metrics
  - Safety: Failed extensions don't crash swarm

### 5. Domain Experts (Parallel)

#### BackendArchitect
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (Backend Architecture)
  - Claim: "Registry-based plugin architecture preferred"
  - Rationale: Clean separation, testable, version-safe
  - Risks: Registry becomes bottleneck
  - Confidence: HIGH (based on past system patterns)

#### DevOpsPlatform
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (DevOps)
  - Claim: "Hot-reload extensions without restart"
  - Rationale: Better UX, faster iteration
  - Risks: State corruption during reload
  - Confidence: MEDIUM (novel for this swarm)

#### SecurityIAM
- Input: SPEC, TEST, NFR TEST Cards
- Output: Position Card (Security)
  - Claim: "Extensions must be sandboxed"
  - Rationale: Prevent malicious skills from accessing memory
  - Risks: Sandbox limits legitimate use cases
  - Confidence: HIGH (security first principle)

### 6. Skeptic
- Input: Solver + Domain Expert Position Cards
- Output: Skeptic Card
  - Conflicts identified:
    - Hot-reload vs. state safety
    - Sandbox strictness vs. functionality
  - Questions:
    - How to test extension isolation?
    - What's rollback strategy for bad extensions?
  - Residual risks: Extension versioning complexity

### 7. ExperienceAgent (NEW)
- Input: Verification Receipts from past architecture reviews
- Output: Experience Records
  - Past outcome: "Plugin systems without version management led to breakage (W02)"
  - Relevant signals: Version pinning prevented 3 incidents
  - Confidence impact: +0.2 to version-safe approaches
  - Reusability: Applies to all extension patterns

### 8. RiskScorer (NEW)
- Input: SPEC, TEST, NFR, Domain Expert Cards, Experience Records
- Output: Risk Score Card
  - Risk score: 65/100 (MEDIUM-HIGH)
  - Dimensions:
    - Novelty: HIGH (new extension pattern)
    - Blast radius: MEDIUM (affects all workflows)
    - Security: MEDIUM (sandboxing needed)
    - Reliability: MEDIUM (state management complexity)
  - Drivers: Novel pattern + state safety concerns
  - Required governance: MED → Domain + NFR mandatory

### 9. CollapseAgent (NEW)
- Input: Solver, Skeptic, Domain Expert Position Cards + Risk Score + Experience Records
- Output: Collapse Decision
  - **Accepted plan**: Registry-based + version pinning + sandboxed extensions
  - **Rejected alternatives**: 
    - Hot-reload without state safety → too risky given experience
    - No sandbox → violates security position
  - **Weighting rationale**:
    - SecurityIAM position (HIGH confidence) + past security incidents → sandbox required
    - Past versioning experience (+0.2) → version pinning included
    - DevOps hot-reload desire → deferred to post-MVP
  - **Residual risks**: Extension discovery performance needs monitoring
  - **Required follow-ups**: Define extension contract in Week 6

### 10. Verifier (Enhanced)
- Input: All cards + Collapse Decision
- Output: Verification Receipt
  - Status: **PASS**
  - Checks performed:
    - ✅ SPEC complete
    - ✅ TEST + NFR coverage exists
    - ✅ Domain experts consulted (3/3)
    - ✅ Collapse Decision exists
    - ✅ Weighting rationale explicit (evidence > opinion)
    - ✅ Risk score (65) aligns with MED governance applied
    - ✅ No unresolved conflicts remain
  - Evidence verified:
    - .agents/registry/agents.yaml (extensible structure)
    - .agents/memory/experience_ledger.md (past incidents)
  - Recommendation: APPROVE with follow-ups tracked

### 11. ApprovalGate
- Input: Verification Receipt (PASS) + Risk Score (MED)
- Action: Security signoff required (per workflow definition)
- Output: Approval granted

### 12. MemoryAgent
- Input: Verification Receipt (PASS)
- Action: Append to .agents/memory/world_model.yaml
  - Extension contract principles added
  - Collapse decision recorded in experience_ledger.md
  - Risk score logged in risk_ledger.md

---

## Key Week 5 Behaviors Demonstrated

1. **Experience Extraction**: Past versioning incidents inform current decision
2. **Risk Quantification**: Novel + state complexity → MED risk → domain + NFR mandatory
3. **Weighted Convergence**: Evidence-based weighting favors proven patterns over desires
4. **Adaptive Governance**: Risk score 65 triggers MED governance level correctly
5. **Deterministic Resolution**: Conflicts resolved by explicit rationale, not vibes

---

## Expected Outcomes

✅ Collapse decision references past experience  
✅ Risk score adjusts governance level  
✅ Verifier validates convergence criteria  
✅ Memory captures decision rationale for future reuse  
✅ Swarm improves over time (compounding intelligence)
