# Week 03 — Domain Experts & Enterprise Architecture Gates

## Goals
Introduce enterprise domain expertise into the SDLC swarm and enforce
non-functional requirements (NFRs) as testable, evidence-gated constraints.

## Deliverables
- Domain expert skills: Security/IAM, DevOps/Platform, Backend Architecture
- NFRAgent for performance, reliability, scalability, observability
- Updated workflows enforcing domain + NFR review
- Stronger Verifier checklist using enterprise invariants

## Definition of Done
- Architecture workflows invoke domain experts automatically
- NFRs are defined as TEST artifacts (not prose)
- Verifier fails plans that violate enterprise constraints
- RUN_SDLC loop can reject non-enterprise-safe designs
