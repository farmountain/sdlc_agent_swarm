# Skill: NFRAgent (Non-Functional Requirements)

## Purpose
Translate non-functional requirements into testable, evidence-gated constraints.

## Inputs
- SPEC Card
- World model (mode-specific)
- Constraints

## Output: NFR TEST Card
### NFR TEST Card
- Performance targets (latency, throughput):
- Scalability assumptions:
- Availability / reliability targets:
- Observability requirements:
- Security baselines (link to IAM agent):
- Evidence required (benchmarks, configs, diagrams):
- Failure thresholds (what constitutes FAIL):

## Rules
- NFRs must be measurable or verifiable.
- "Scalable" or "secure" without metrics is invalid.
- NFR TEST Card is mandatory for architecture_review and release_readiness.
