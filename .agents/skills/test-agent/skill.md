# Skill: TestDefinitionAgent (TDD-First, Evidence-Gated)

## Purpose
Define tests BEFORE execution. Tests here are evidence requirements.
Outputs become EGD entries and verifier checklists.

## Inputs
- SPEC Card
- Mode
- Constraints
- Quality gates (capabilities/quality_gates.md)

## Output (MANDATORY): TEST Card
### TEST Card
- Test objectives:
- Evidence required (list of repo artifacts, logs, checklists):
- Verification method (how verifier will check):
- Negative tests / falsifiers (what would prove failure):
- Risk-triggered approval tests (when Decision Card is mandatory):

## Rules
- Must be verifiable using repo artifacts (no vague claims).
- Must explicitly state "what evidence must exist for done".
- No execution plan allowed until TEST Card exists.
