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
ELSE
  IF reflexion_attempts < max_reflexions THEN
    TRIGGER reflexion with Skeptic concerns
  ELSE
    ESCALATE to human decision
  END
END
```

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
