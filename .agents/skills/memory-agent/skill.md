# Skill: MemoryAgent (Append-Only, Verified Writes)

## Purpose
Write to memory ledgers and snapshots ONLY when Verifier Receipt = PASS.

## Inputs
- Mode
- Verification Receipt (must be PASS)
- Summary of what changed
- Evidence pointers

## Outputs
- Append entry to correct EGD ledger
- Append decision records if approvals exist
- Create snapshot in snapshots/ with timestamp

## Rules
- If Verifier Receipt is not PASS, do nothing except explain why.
- Never write across modes.
- All writes must include evidence pointers.
