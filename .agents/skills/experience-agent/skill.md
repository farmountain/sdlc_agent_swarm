# Skill: ExperienceAgent

## Purpose
Extract reusable experience from past verified outcomes.

## Inputs
- Mode
- Verification Receipt (PASS only)
- Evidence pointers
- Decision outcomes

## Output: Experience Record

### Experience Record
- Context signature (workflow + domain + scope):
- Outcome (success/failure/partial):
- Evidence pointers:
- Signals (what mattered):
- Confidence impact (+/-):
- Reusability tags:

## Rules
- Only PASS outcomes create experience.
- Append-only to experience_ledger.md.
