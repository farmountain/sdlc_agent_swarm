# Thin Extension Contract (Immutable)

## The extension SHALL:
- Install `.agents/`, `capabilities/`, `weeks/` templates
- Register commands and chat aliases
- Forward commands to Copilot Agent Mode with Mode + Workflow

## The extension SHALL NOT:
- Implement orchestration logic
- Modify evidence or memory
- Store state
- Call LLM APIs
- Interpret results

## Source of Truth
All behavior is defined by files in `.agents/`.

Breaking this contract invalidates the extension.
