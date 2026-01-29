# Week 01 — Foundation OS (Dual Loop, Spec + TDD + Evidence Gated)

## Purpose
Establish a stable, extension-compatible, no-code foundation that supports:

- BUILD_SWARM: building the SDLC Swarm product itself
- RUN_SDLC: users building their own software projects

Both loops are:
Spec-first → Test-first → Evidence-gated → Memory-verified

---

## Definition of Done (DoD)

### Technical
- All Extension-Stable Interface (ESI) files exist
- Driver supports Mode routing (BUILD_SWARM / RUN_SDLC)
- No memory writes without verifier receipt (Week 1 = forbidden)
- No hidden state outside repo files

### Governance
- Risk policy and approval protocol defined
- Decision logging defined (immutable)

### Product
- Capability map v0 exists
- Quality gates v0 exist
- World models exist for both loops

---

## Dry Run Tests (MANDATORY)

### Dry Run A — BUILD_SWARM
Mode=BUILD_SWARM  
Workflow=plan_to_prd  
Objective=Define Week 2 build plan for core swarm skills  
Constraints=no extension code, no memory write without verifier receipt  
EvidencePointers=.agents/memory/world_model.yaml, capabilities/capability_map.md  

Expected:
- Driver outputs Position Card
- Identifies missing skills
- No memory write

### Dry Run B — RUN_SDLC
Mode=RUN_SDLC  
Workflow=plan_to_prd  
Objective=Draft PRD for adding Azure AD SSO to a SaaS app  
Constraints=enterprise IAM, audit log required, security approval  
EvidencePointers=.agents/user_memory/world_model.yaml  

Expected:
- Uses user world model
- Flags security approval
- No mixing with BUILD_SWARM ledgers

---

## Evidence Gates

### EGD-Dev
- ESI files present
- Driver dry run works in both modes

### EGD-Prod
- Capability map v0 exists
- World models defined
- Approval protocol exists
