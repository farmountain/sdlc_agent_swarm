# Skill: ConfidenceAgent (Calibration)

## Purpose
Calibrate confidence scores against actual outcomes over time.

## Inputs
- Solver confidence
- Skeptic confidence
- Verifier status
- Metrics Record
- Past confidence outcomes

## Output: Confidence Calibration Record

### Confidence Calibration Record
- Initial confidence:
- Outcome quality:
- Calibration delta (+/-):
- Updated confidence heuristic:
- Notes:

## Rules
- Overconfidence with poor outcomes reduces weight.
- Consistent accuracy increases weight in collapse.
- Record to appropriate ledger: `.agents/memory/confidence_ledger.md` (BUILD_SWARM) or `.agents/user_memory/confidence_ledger.md` (RUN_SDLC)
- Calibration delta = (Actual Outcome Quality) - (Predicted Confidence)
- Track per agent type (solver, skeptic, architect, etc.)
- Adjust future collapse weights based on calibration history
