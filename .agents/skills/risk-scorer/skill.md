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
