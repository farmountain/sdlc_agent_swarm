# Weighted Collapse Policy

## Purpose
Define how the Driver Agent converges multiple agent outputs (Position Cards) into a single, safe decision using a mathematical scoring model.

## Position Card Schema

Every agent output must conform to this structure:

```yaml
position_card:
  agent: <agent_name>
  timestamp: <ISO 8601>
  claims:
    - "Claim 1"
    - "Claim 2"
  plan:
    - action: "Step 1"
      rationale: "Why"
    - action: "Step 2"
      rationale: "Why"
  evidence:
    - type: "document|test|measurement|expert_review"
      pointer: "path/to/evidence"
      quality: <0.0-1.0>
  risks:
    - severity: "critical|high|medium|low"
      description: "Risk description"
      mitigation: "How to address"
      residual_risk: <0.0-1.0>
  confidence: <0.0-1.0>  # γ
  cost: <integer>        # k (story points, hours, LOC)
  reversibility: <0.0-1.0>  # v (0=irreversible, 1=fully reversible)
  invariant_violations:
    - invariant_id: "INV-001"
      description: "Which invariant violated"
      justification: "Why needed"
      requires_approval: true
```

## Mathematical Scoring Model

### Scoring Functional

For each Position Card `card`, compute:

$$S(\text{card}) = w_e \cdot \text{EvidenceQuality}(E) - w_r \cdot \text{Risk}(R) - w_v \cdot v + w_k \cdot k - w_\gamma \cdot \gamma - w_i \cdot \text{InvariantViolations}$$

Where:
- **EvidenceQuality(E)**: Average quality score of all evidence (0.0–1.0)
- **Risk(R)**: Weighted risk score (critical=1.0, high=0.7, medium=0.4, low=0.1)
- **v**: Reversibility (0.0=cannot undo, 1.0=fully reversible)
- **k**: Cost (normalized: k/100)
- **γ (gamma)**: Agent confidence (0.0–1.0)
- **InvariantViolations**: Count of violated invariants (each = -10 points)

### Default Weights

```yaml
weights:
  w_e: 10.0   # Evidence quality (highest priority)
  w_r: 8.0    # Risk (high penalty)
  w_v: 3.0    # Reversibility (prefer reversible)
  w_k: 2.0    # Cost (prefer lower cost)
  w_gamma: 1.0 # Confidence (bonus for confidence)
  w_i: 10.0   # Invariant violations (severe penalty)
```

## Collapse Rules (Decision Algorithm)

### Rule 1: Verifier Veto (MANDATORY)
```
IF Verifier.approve == false THEN
  REJECT position
  TRIGGER reflexion loop
END
```

### Rule 2: Invariant Violations (GATE)
```
IF InvariantViolations > 0 THEN
  IF ALL violations have requires_approval == true THEN
    ESCALATE to human approval gate
  ELSE
    REJECT position
  END
END
```

### Rule 3: Critical Risk (GATE)
```
IF ANY risk.severity == "critical" AND risk.residual_risk > 0.3 THEN
  IF NOT mitigated OR NOT approved THEN
    REJECT position
  END
END
```

### Rule 4: Weighted Score (CONVERGENCE)
```
positions_sorted = SORT(positions, key=S, descending)

IF S(top_position) > threshold AND Verifier.approve == true THEN
  IF InvariantViolations == 0 OR all_approved THEN
    ACCEPT top_position
  END
ELSE IF S(top_position) - S(second_position) < consensus_gap_threshold THEN
  # Scores are too close, invoke Consensus Panel for automatic resolution
  INVOKE ConsensusPanel(positions_sorted)
  ACCEPT ConsensusPanel.recommendation
ELSE
  IF reflexion_attempts < max_reflexions THEN
    TRIGGER reflexion with Skeptic concerns
  ELSE
    # Final fallback: invoke Consensus Panel instead of asking user
    INVOKE ConsensusPanel(positions_sorted)
    ACCEPT ConsensusPanel.recommendation
  END
END
```

**Constants:**
- `threshold`: 6.0 (minimum acceptable score)
- `consensus_gap_threshold`: 2.0 (if top two positions within 2 points, invoke panel)
- `max_reflexions`: 3

---

## Automatic Consensus Panel (NO USER PROMPTS)

**Purpose:** Automatically resolve conflicts when:
1. Multiple positions have similar scores (within `consensus_gap_threshold`)
2. Reflexion loops exhausted without clear winner
3. Trade-offs require balanced judgment across multiple dimensions

**Design Principle:** Use collective intelligence (diverse specialized agents) to reach safe consensus without human intervention. Only escalate to human for approval gates (security, compliance, critical risks), not for tactical decisions.

### Consensus Panel Composition

The panel consists of 7 specialized evaluators with different priorities:

| Role | Agent | Priority | Weight | Bias |
|------|-------|----------|--------|------|
| **Minimalist** | MinimalistAgent | Simplicity, cost, reversibility | 1.5 | Prefer low-cost, reversible, minimal solutions |
| **Skeptic** | SkepticAgent | Risk mitigation, edge cases, failure modes | 2.0 | Challenge assumptions, prefer defensive |
| **Domain Expert(s)** | Language/Security/DevOps experts | Technical correctness, best practices | 1.8 | Prefer domain-specific idioms |
| **Verifier** | VerifierAgent | Evidence quality, invariant compliance | 2.5 | Require proof, block violations |
| **Collective Intelligence** | ExperienceAgent | Historical success rates, past patterns | 1.3 | Learn from history |
| **Risk/Compliance Watcher** | RiskScorerAgent, ComplianceAgent | Security, regulatory, audit | 2.2 | Block non-compliant, high-risk |
| **User Value Advocate** | StakeholderAgent | Business value, user impact, ROI | 1.4 | Maximize user outcomes |

**Total Weight:** 12.7 (normalized to 1.0 during aggregation)

### Consensus Algorithm (Automatic Resolution)

#### Step 1: Panel Invocation
```markdown
## Consensus Panel Input
- Conflicting Positions: [Position A, Position B, Position C]
- Context: <user objective, constraints, evidence pointers>
- Conflict Type: <scores_too_close | reflexion_exhausted | multi_dimensional_tradeoff>
- Previous Reflexion Attempts: <N>
```

#### Step 2: Parallel Evaluation
Each panel agent independently evaluates all positions and produces:

```yaml
panel_evaluation:
  agent: <panel_agent_role>
  position_scores:
    position_A: <0.0-1.0>  # Agent's score for Position A
    position_B: <0.0-1.0>
    position_C: <0.0-1.0>
  rationale:
    position_A: "Why this score"
    position_B: "Why this score"
    position_C: "Why this score"
  recommendation: <position_id>  # Top choice
  concerns: ["Concern 1", "Concern 2"]  # Unresolved issues
  confidence: <0.0-1.0>
```

**Example: Minimalist Evaluation**
```yaml
panel_evaluation:
  agent: MinimalistAgent
  position_scores:
    postgres_position: 0.85  # Simple, proven, reversible
    mongodb_position: 0.65   # Add complexity (schema-less), harder rollback
  rationale:
    postgres_position: "PostgreSQL with RLS is simpler (fewer moving parts), easier rollback (SQL migrations), industry standard for e-commerce"
    mongodb_position: "MongoDB requires additional indexes for multi-tenancy, data migrations harder, schema-less causes drift"
  recommendation: postgres_position
  concerns: ["PostgreSQL may struggle at >100k tenants without sharding"]
  confidence: 0.90
```

#### Step 3: Weighted Aggregation
For each position, compute weighted consensus score:

$$C(\text{position}) = \frac{\sum_{i=1}^{7} w_i \cdot \text{score}_i(\text{position}) \cdot \text{confidence}_i}{\sum_{i=1}^{7} w_i \cdot \text{confidence}_i}$$

Where:
- $w_i$: Panel agent weight (from table above)
- $\text{score}_i(\text{position})$: Agent $i$'s score for the position (0.0-1.0)
- $\text{confidence}_i$: Agent $i$'s confidence in their evaluation (0.0-1.0)

**Normalization:** Confidence-weighted to down-weight uncertain opinions.

#### Step 4: Consensus Check
```
IF C(winning_position) >= 0.70 THEN
  # Strong consensus reached
  RECOMMENDATION = winning_position
  STATUS = "CONSENSUS_REACHED"
  
ELSE IF C(winning_position) - C(second_position) < 0.10 THEN
  # Still too close, synthesize hybrid
  INVOKE HybridSynthesizer(winning_position, second_position, panel_concerns)
  RECOMMENDATION = hybrid_position
  STATUS = "HYBRID_SYNTHESIZED"
  
ELSE
  # Weak consensus, fall back to safest option
  RECOMMENDATION = position_with_lowest_risk_score
  STATUS = "SAFE_FALLBACK"
END
```

#### Step 5: Consensus Output
```markdown
## Consensus Panel Recommendation

### Winning Position: <position_id>
- **Consensus Score:** 0.85 / 1.0 (strong agreement)
- **Voting Breakdown:**
  - Minimalist: postgres_position (0.85, confidence 0.90)
  - Skeptic: postgres_position (0.78, confidence 0.85) 
  - Domain Expert (Backend): postgres_position (0.88, confidence 0.95)
  - Verifier: postgres_position (0.92, confidence 1.00) [all evidence valid]
  - Collective Intelligence: postgres_position (0.80, confidence 0.75) [60% historical success]
  - Risk/Compliance: postgres_position (0.95, confidence 1.00) [ACID compliance]
  - User Value Advocate: mongodb_position (0.70, confidence 0.80) [faster initial velocity]

### Rationale
PostgreSQL achieves higher consensus (0.85 vs MongoDB 0.68) due to:
1. **Evidence Quality:** All evidence pointers valid (Verifier: 0.92)
2. **Risk Mitigation:** ACID guarantees critical for payments (Risk Watcher: 0.95)
3. **Simplicity:** Fewer moving parts, easier rollback (Minimalist: 0.85)
4. **Domain Best Practice:** Standard for transactional systems (Backend Expert: 0.88)
5. **Historical Success:** 60% of similar e-commerce projects succeeded with PostgreSQL

### Trade-offs Accepted
- **Initial Velocity:** MongoDB may be faster for schema-less product catalog (User Value Advocate raised concern)
- **Mitigation:** Use PostgreSQL JSONB columns for flexible product attributes

### Concerns Addressed
- **Scalability:** Minimalist raised concern about >100k tenants
  - **Resolution:** Plan for sharding at 50k tenants, horizontal scaling proven
- **Schema Flexibility:** User Value Advocate preferred schema-less
  - **Resolution:** JSONB columns provide flexibility without sacrificing ACID

### Next Steps
1. Proceed with PostgreSQL + RLS design
2. Add JSONB columns for product attributes (addresses schema flexibility)
3. Include sharding plan in architecture document (addresses scalability concern)
4. Re-verify after implementation

### Audit Trail
- Panel Members: 7 agents (all invoked)
- Consensus Algorithm: Weighted aggregation with confidence discount
- Final Status: CONSENSUS_REACHED (threshold: 0.70, actual: 0.85)
- Timestamp: 2026-02-04T10:30:00Z
- Position Cards Evaluated: 2 (PostgreSQL, MongoDB)
```

### When to Use Consensus Panel

**Always Automatic (No User Prompt):**
1. **Score Gap < 2.0:** Top two positions within 2 points
2. **Reflexion Exhausted:** After 3 reflexion loops, still no clear winner
3. **Multi-Dimensional Trade-off:** Security vs velocity, cost vs scalability, etc.
4. **Domain Expert Conflict:** Two experts disagree (e.g., Backend vs DevOps)

**Never Use Panel (Escalate to Human Approval):**
1. **Critical Risk + High Residual:** Any position with critical risk & residual > 0.3
2. **Invariant Violation:** Hard block invariants (security, compliance, audit)
3. **Data Loss Risk:** Any position with irreversible data changes (v < 0.3)
4. **Regulatory Requirement:** GDPR, SOC2, HIPAA approval needed

**Escalation Criteria:**
- Panel consensus < 0.60 (weak agreement) → Fallback to safest option (lowest risk)
- Panel consensus < 0.50 (no agreement) → **Only then** escalate to human with full panel analysis

### Hybrid Synthesis (Advanced)

If consensus panel produces near-tie (winning score - second score < 0.10), invoke `HybridSynthesizer`:

**Input:** Top 2 positions + panel concerns

**Process:**
1. Identify complementary strengths (Position A: security, Position B: velocity)
2. Identify shared weaknesses (both: high cost)
3. Generate hybrid position combining strengths:
   - Use Position A's approach for critical path (security)
   - Use Position B's approach for non-critical path (velocity)
4. Validate hybrid doesn't introduce new risks
5. Re-score hybrid with panel agents

**Example:**
```markdown
## Hybrid Position: PostgreSQL (Payments) + MongoDB (Product Catalog)
- **Claims:** Use PostgreSQL for transactional data (orders, payments), MongoDB for product catalog
- **Rationale:** 
  - PostgreSQL provides ACID for critical payment flows (Skeptic approved)
  - MongoDB provides schema flexibility for product attributes (User Value Advocate approved)
  - Both databases proven at scale (Domain Expert approved)
- **Risks:** Additional operational complexity (2 databases)
  - **Mitigation:** Unified ORM (Prisma supports both), separate services
- **Consensus Score:** 0.82 (higher than either original position)
```

---

## Memory Write Protocol

ONLY write to memory IF:
1. Verifier receipt exists
2. Final score > threshold
3. All invariant violations approved (if any)
4. Evidence pointers valid

## Reflexion Triggers

Trigger reflexion loop when:
1. **Verifier rejects** → Request revised plan
2. **Skeptic score < 3.0** → Request risk mitigation
3. **Evidence quality < 0.6** → Request additional proof
4. **Cost > 2x estimate** → Request simplification
5. **Domain experts disagree (variance > 30%)** → Request alignment
