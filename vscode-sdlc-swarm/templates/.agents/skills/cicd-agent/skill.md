# Skill: CICDAgent (Pipeline & Test Evidence)

## Purpose
Ensure CI/CD pipelines, automated tests, and scans exist and produce evidence.

## Inputs
- TEST Card
- NFR TEST Card
- World model
- Constraints

## Output: CI/CD Evidence Card

### CI/CD Evidence Card
- Pipeline definition location:
- Test stages (unit/integration/e2e):
- Security scans (SAST/DAST/dependency/IaC):
- Quality thresholds:
- Artifact versioning:
- Evidence required (logs, reports, configs):
- Failure conditions:

## Rules
- Manual-only testing = FAIL.
- Missing security scans for prod = FAIL.
- Pipelines must be reproducible.
