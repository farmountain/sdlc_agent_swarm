# SDLC Agentic Lifecycle

## The 7-Stage Evidence-Gated Development Loop

This is the **canonical lifecycle** that governs all development (product development and user project development).

Each stage is **agent-enforced**, **evidence-gated**, and **reflexion-enabled**.

---

## The Lifecycle (Canonical Form)

```
SPEC → TEST → PLAN → EXECUTE → VERIFY → RECORD → REFLECT
```

Each stage is a **gate**. You cannot proceed to the next stage without evidence from the previous one.

---

## Stage 1️⃣ : SPEC (Contract-First, No Execution Without It)

### Purpose

Define *what must be true* before any work is allowed.

### Artifacts Produced

- **Capability Card** (what capability is being built)
- **World Model constraints** (what enterprise requirements apply)
- **Workflow definition** (what steps are needed)
- **Position Card template** (what agents must address)

### Agents Involved

- **Driver** (orchestrator)
- **Domain Experts** (early feasibility signal)
- **Compliance-Risk** (early risk signal)

### Outputs

- Explicit inputs / outputs
- Preconditions (what must be true first)
- Postconditions (what must be true when done)
- Invariants (what must always be true)
- Acceptance criteria (how we know it's done)

### Evidence Gate

```
❌ No SPEC → ❌ No execution allowed
```

### Why This Matters

This is **Spec-Driven Development**:
> "You cannot build it until you've defined what 'it' means."

---

## Stage 2️⃣ : TEST (TDD Without Code)

### Purpose

Define *verifiable claims with required evidence*.

### Artifacts Produced

- **EGD-Dev entry** (project-level test)
- **EGD-Prod entry** (capability-level test)
- **Quality Gates** (acceptance criteria)
- **Verifier checklist** (what verifier will check)

### Agents Involved

- **Verifier** (independent truth check)
- **Skeptic** (adversarial testing)
- **Minimalist** (simplification requirements)

### Outputs

- "What evidence must exist for this to be considered done?"
- "What would falsify this claim?"
- "What artifacts prove correctness?"

### Evidence Gate

```
❌ No TEST defined → ❌ No execution allowed
```

### Why This Matters

This is **TDD at system scale**:
> "You must know how to measure success before you execute."

**Key insight**: A test is not executable code. A test is a **verifiable claim with required evidence**.

---

## Stage 3️⃣ : PLAN (Solver Phase, Constrained by Spec + Tests)

### Purpose

Propose *how to satisfy the spec* **and** *pass the tests*.

### Artifacts Produced

- **Position Cards** from Solver (baseline plan)
- **Position Cards** from Domain Experts (domain constraints)
- **Position Cards** from Skeptic (risk identification)
- **Minimalist position** (simplified approach)

### Agents Involved

- **Solver** (proposes solution)
- **Domain Experts** (enforce domain constraints)
- **Skeptic** (find failure modes)
- **Minimalist** (reduce to essential pieces)

### Rules

- Plans must **reference spec clauses**
- Plans must **reference test criteria**
- Plans must **acknowledge world model invariants**

### Outputs

- Multiple **Position Cards** representing different viewpoints
- Risks identified
- Evidence expectations (what we'll need to prove)

### Evidence Gate

```
❌ Plan not yet verified → Provisional (can be rejected later)
```

### Why This Matters

This is **collaborative planning**:
> "Better plans come from diverse viewpoints, not individual genius."

---

## Stage 4️⃣ : EXECUTE (Bounded, Permissioned Action)

### Purpose

Generate *artifacts* that satisfy the plan.

In Weeks 1–6, this might be Markdown/YAML.
In later weeks, this might be code generation, IaC generation, test generation, etc.

### Artifacts Produced

- Code / Markdown / YAML / configs
- Tests
- Documentation
- Logs

### Agents Involved

- **CodingAgent** / **DocAgent** / **IaCAgent** (later weeks)
- **Driver** (permission enforcement)

### Constraints

- ❌ No irreversible actions without approval
- ❌ No memory writes without verifier receipt
- ✅ All actions are logged
- ✅ Rollback plans exist

### Evidence Gate

```
✅ Execution complete → artifacts exist
❌ But not yet considered "done" (goes to VERIFY)
```

### Why This Matters

This is **bound execution**:
> "You can try, but only within approved boundaries, and everything is logged."

---

## Stage 5️⃣ : VERIFY (Independent Truth Check)

### Purpose

**Check independently** that execution satisfies spec + tests.

This is the **heart of Evidence-Gated Development**.

### Artifacts Produced

- **Verification Receipt** (from Verifier)
- **Rejection reasons** (if failed)
- **Reflexion triggers** (if fixable gaps found)

### Agents Involved

- **Verifier** (mandatory)
- **Skeptic** (adversarial review)
- **Compliance-Risk** (if regulatory concern)

### Checks

- Do artifacts satisfy the tests?
- Do they violate world model invariants?
- Is evidence reproducible?
- Are risks mitigated?

### Evidence Gate

```
❌ FAIL → Reflexion (go back to PLAN or EXECUTE)
✅ PASS → Verification Receipt issued (proceed to RECORD)
```

### Why This Matters

This is **independent verification**:
> "Just because the builder thinks it's done doesn't mean it is."

---

## Stage 6️⃣ : RECORD (Memory as Truth Ledger)

### Purpose

Make the decision **auditable and replayable**.

### Artifacts Produced

- **Memory snapshot** (timestamped state)
- **Evidence ledger entry** (what was done, why, evidence)
- **Decision log** (approval records, if applicable)

### Agents Involved

- **Memory Agent** (persistence)
- **Driver** (coordination)

### Rules

- ✅ Memory writes are **append-only**
- ✅ Snapshots are **immutable**
- ✅ Evidence pointers are **required**
- ❌ No memory writes without Verifier receipt

### Evidence Gate

```
✅ Verification Receipt exists → Memory Agent can write
❌ Otherwise → No memory write allowed
```

### Why This Matters

This is **organizational memory**:
> "Decisions are preserved so future work builds on what we know, not tribal memory."

---

## Stage 7️⃣ : REFLECT (Learning Loop)

### Purpose

Improve future decisions without retraining models.

### Artifacts Produced

- **Updated heuristics**
- **Updated capability definitions**
- **Updated quality gates**
- **Updated world model** (if invariants need adjustment)

### Agents Involved

- **ExperienceRanker** (learned patterns)
- **Memory Agent** (aggregate patterns)
- **Driver** (propose improvements)

### Outputs

- Next planning cycle starts with better spec
- Tests are more precise
- Plans avoid previous failure modes

### Evidence Gate

```
✅ Memory contains evidence of patterns → Reflection yields better spec
```

### Why This Matters

This is **organizational learning**:
> "The system gets smarter as it decides, because it learns from decisions."

---

## How These 7 Stages Interact (No Redundancy)

### Single Source of Truth

| Stage | Defines |
|-------|---------|
| SPEC | What |
| TEST | Proof of what |
| PLAN | How |
| EXECUTE | Artifacts |
| VERIFY | Correctness |
| RECORD | Truth ledger |
| REFLECT | Learning |

No duplication. Each stage flows into the next.

---

## Ordering Constraint (Non-Negotiable)

```
You CANNOT skip a stage.

SPEC must exist before TEST
TEST must exist before PLAN
PLAN must exist before EXECUTE
EXECUTE must complete before VERIFY
VERIFY must PASS before RECORD
RECORD must complete before REFLECT
```

This ordering is what makes the system reliable.

---

## Why This Is TDD (Properly Understood)

Classical TDD:

```
test → code → refactor
```

Your Agentic SDLC TDD:

```
TEST → PLAN → EXECUTE → VERIFY → RECORD → REFLECT
```

**It's TDD lifted to the system level, not the function level.**

| Classical TDD | Agentic SDLC |
|---------------|--------------|
| Function-level | Capability-level |
| Code tests | Evidence tests |
| CI pipeline | Verifier + world model |
| Refactor code | Refactor decisions |
| Human discipline | Enforced by agents |

---

## Reflexion Loops (How to Handle Failures)

If verification **FAILS**, two reflexion paths:

### Reflexion Path 1: Return to PLAN

```
VERIFY fails with major flaw
  ↓
Return to PLAN stage
  ↓
Solver + Skeptic + Experts revise plan
  ↓
New EXECUTE attempt
  ↓
Re-VERIFY
```

### Reflexion Path 2: Return to EXECUTE

```
VERIFY fails with minor fix
  ↓
Return to EXECUTE stage
  ↓
Fix the artifact
  ↓
Re-VERIFY
```

Both paths are **tracked** in evidence ledgers so the system learns.

---

## Applying This to Dual Modes (Build vs Run)

### BUILD_SWARM Mode (Building Your Product)

The 7 stages apply to building the SDLC swarm itself:

```
1. SPEC: What should the swarm do?
2. TEST: How do we know it works?
3. PLAN: How should we build it?
4. EXECUTE: Build the skills/registries/etc
5. VERIFY: Does it meet our criteria?
6. RECORD: Log the decision
7. REFLECT: What did we learn?
```

Evidence goes into `.agents/memory/evidence_dev.md` and `/evidence_prod.md`.

---

### RUN_SDLC Mode (Helping Users Build Their Projects)

The 7 stages apply to user projects:

```
1. SPEC: What feature are they building?
2. TEST: How do they know it's ready for production?
3. PLAN: How should they implement it?
4. EXECUTE: Build the code/IaC/tests
5. VERIFY: Does it meet their enterprise model?
6. RECORD: Log the decision
7. REFLECT: What patterns help next features?
```

Evidence goes into `.agents/user_memory/evidence_dev.md` and `/evidence_prod.md`.

Same lifecycle. Different "universe".

---

## Why This Lifecycle Prevents Waste

Without this lifecycle:

- ❌ People build before defining what "done" means
- ❌ No one verifies independently
- ❌ Decisions are lost (tribal memory)
- ❌ Same mistakes repeat

With this lifecycle:

- ✅ Spec forces clarity before work
- ✅ Tests ensure measurable progress
- ✅ Plans are collaborative
- ✅ Verify catches problems early
- ✅ Record preserves organizational memory
- ✅ Reflect prevents repeat mistakes

---

## Final Statement

> **This 7-stage lifecycle is the operating law of your SDLC Swarm.
> No agent is allowed to execute, decide, or remember without passing those gates.**

This is now **formally and irrevocably true** of your system design.

Honor this lifecycle from Week 1, and you'll build systems that:
- Stay coherent as they scale
- Learn from decisions
- Resist corruption
- Remain auditable

Violate it, and you'll reintroduce chaos.

Choose wisely. ⚖️

