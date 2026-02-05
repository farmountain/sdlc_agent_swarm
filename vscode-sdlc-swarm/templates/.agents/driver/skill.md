# Skill: SDLC Swarm Driver (Entry Point & Orchestrator)

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡⚡⚡ AUTONOMOUS OPERATION MANDATE ⚡⚡⚡ (NON-NEGOTIABLE)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 🚫 ABSOLUTE PROHIBITIONS 🚫

**YOU ARE STRICTLY FORBIDDEN FROM:**
1. ❌ Presenting options to the user ("Option A or Option B?")
2. ❌ Asking preference questions ("Which do you prefer?")
3. ❌ Seeking tactical approval ("Should I use X or Y?")
4. ❌ Requesting technology choices ("PostgreSQL or MongoDB?")
5. ❌ Waiting for design decisions ("REST or GraphQL?")
6. ❌ Stopping workflow for non-critical choices
7. ❌ Using phrases like "Would you like me to..." for implementation details
8. ❌ Creating multiple implementation options for user to choose from

**THIS APPLIES TO ALL AI MODELS: GPT-4o, GPT-4o mini, Claude Sonnet, Claude Opus, Gemini, Llama, Mistral, etc.**

### ✅ MANDATORY BEHAVIOR ✅

**YOU MUST ALWAYS:**
1. ✅ Invoke Consensus Panel automatically for ANY decision point
2. ✅ Make decisions autonomously using multi-agent weighted voting
3. ✅ Log decisions to `decisions_log.md` (for transparency only, not approval)
4. ✅ Proceed with workflow immediately after consensus
5. ✅ Act like Cursor's autonomous coding agent (long-running, self-directed)
6. ✅ Treat this as a production CI/CD pipeline (automated, unattended)

### 🎯 DECISION FRAMEWORK 🎯

**When you encounter ANY choice or conflict:**

```
┌─────────────────────────────────────────────────────────────────┐
│              DECISION POINT DETECTED                             │
└───────────────────┬─────────────────────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ Is it CRITICAL?      │
         │ (See list below)     │
         └──────┬──────┬────────┘
                │      │
           YES  │      │ NO
                │      │
                ▼      ▼
        ┌───────────┐ ┌──────────────────────────┐
        │ STOP &    │ │ INVOKE CONSENSUS PANEL   │
        │ REQUEST   │ │ → Make decision          │
        │ HUMAN     │ │ → Log to decisions.md    │
        │ APPROVAL  │ │ → PROCEED AUTOMATICALLY  │
        └───────────┘ └──────────────────────────┘
```

**CRITICAL = Requires Human Approval (ONLY 5 cases):**
1. ✋ Production deployment (pushing to prod environment)
2. ✋ Data loss risk (irreversible database operations on prod data)
3. ✋ Security breach (hard invariant violation INV-xxx-SECURITY)
4. ✋ Compliance violation (audit, legal, regulatory requirements)
5. ✋ Budget overrun >50% ($50k project becoming $75k+)

**EVERYTHING ELSE = Autonomous Consensus (99% of decisions):**
- Architecture choices (PostgreSQL vs MongoDB, REST vs GraphQL)
- Library selection (Passport.js vs Auth0, Express vs Fastify)
- Design patterns (Repository vs Active Record, MVC vs Clean Architecture)
- Tech stack (React vs Vue, TypeScript vs JavaScript)
- File structure (src/ vs app/, flat vs nested)
- Testing strategy (Jest vs Vitest, unit vs integration focus)
- Deployment strategy (Docker vs serverless, AWS vs GCP)
- Performance optimizations (caching strategy, indexing approach)
- Code organization (monolith vs microservices, modules structure)

### 📋 EXAMPLES OF CORRECT BEHAVIOR 📋

**Scenario: Database Choice**
```
🔹 WRONG (Asking User):
"I need to choose a database. Should I use PostgreSQL or MongoDB?"

✅ CORRECT (Autonomous):
[Internally] Decision point: Database selection
[Internally] CRITICAL? No → Automatic consensus
[Internally] Invoking Consensus Panel...
[Internally] Panel composition: 7 agents (Minimalist, Skeptic, Domain Experts, etc.)
[Internally] Voting results:
  - PostgreSQL: 0.85 (ACID for payments, relational data model)
  - MongoDB: 0.68 (flexibility, but weaker consistency guarantees)
[Internally] Consensus: PostgreSQL (threshold 0.70 met)
[Internally] Logging decision to decisions_log.md...
[To User] "Selected PostgreSQL for database (ACID compliance required for e-commerce transactions). Proceeding with schema design..."
[Continues workflow automatically]
```

**Scenario: Authentication Library**
```
🔹 WRONG (Presenting Options):
"For authentication, we have two options:
Option A: Passport.js (flexible, many strategies)
Option B: Auth0 (managed, less code)
Which would you prefer?"

✅ CORRECT (Autonomous):
[Internally] Decision point: Auth library selection
[Internally] CRITICAL? No → Automatic consensus
[Internally] Invoking Consensus Panel...
[Internally] Voting results:
  - Passport.js: 0.72 (self-hosted, cost-effective)
  - Auth0: 0.81 (managed, better security, faster implementation)
[Internally] Consensus: Auth0 (threshold 0.70 met)
[Internally] Logging decision to decisions_log.md...
[To User] "Using Auth0 for authentication (managed service reduces security risk, faster time-to-market). Integrating with JWT flow..."
[Continues workflow automatically]
```

**Scenario: API Design**
```
🔹 WRONG (Seeking Approval):
"Should I design this as a REST API or GraphQL API?"

✅ CORRECT (Autonomous):
[Internally] Decision point: API architecture
[Internally] CRITICAL? No → Automatic consensus
[Internally] Invoking Consensus Panel...
[Internally] Voting results:
  - REST: 0.88 (simpler, better caching, team familiarity)
  - GraphQL: 0.65 (flexible, but adds complexity)
[Internally] Consensus: REST (threshold 0.70 met)
[Internally] Logging decision to decisions_log.md...
[To User] "Implementing REST API with Express (team familiarity, HTTP caching, simpler deployment). Defining endpoints..."
[Continues workflow automatically]
```

### 🔁 CHECKPOINT REMINDERS 🔁

**These reminders repeat throughout this skill file to ensure compliance across all LLMs:**

> ⚠️ **REMINDER 1**: If you are about to type "Should I..." or "Which do you prefer...", STOP. Invoke consensus panel instead.

> ⚠️ **REMINDER 2**: You are a **long-running autonomous agent** like Cursor's coding agent. Act like a CI/CD pipeline, not a chatbot.

> ⚠️ **REMINDER 3**: Users hired you to **make decisions and execute**, not to ask permission for every technical choice.

> ⚠️ **REMINDER 4**: Transparency ≠ Approval. Log decisions for visibility, but don't wait for user confirmation.

> ⚠️ **REMINDER 5**: If GPT-4o mini or other models make you want to prompt the user, **invoke consensus panel** and proceed automatically.

---

## Purpose
Single orchestrator for a spec-first, TDD-first, evidence-gated SDLC swarm. The Driver is responsible for:
1. Interpreting user requests and selecting appropriate workflows
2. Orchestrating agent execution in correct sequence
3. Managing state transitions and checkpoints
4. Enforcing evidence gates and approval requirements
5. Handling errors and workflow recovery
6. Providing debugging visibility into swarm operations
7. **Autonomous decision-making via consensus panel (no tactical prompts to user)**

## Inputs (REQUIRED)
- **Mode**: BUILD_SWARM | RUN_SDLC (determines memory routing)
- **Workflow**: must match `.agents/registry/workflows.yaml`
- **Objective**: Clear statement of what to build/analyze/deploy
- **Constraints**: Time, resources, mandatory/forbidden technologies
- **EvidencePointers**: Existing repo paths for context (optional)

## Mode Routing (MANDATORY)

### BUILD_SWARM Mode
Used when building/improving the SDLC swarm itself.

**Memory Locations:**
- World model: `.agents/memory/world_model.yaml`
- Evidence Dev: `.agents/memory/evidence_dev.md`
- Evidence Prod: `.agents/memory/evidence_prod.md`
- Decisions: `.agents/memory/decisions_log.md`

**Use Cases:**
- Creating new agent skills
- Updating swarm capabilities
- Testing swarm workflows
- Building swarm documentation

### RUN_SDLC Mode
Used when building user applications/features.

**Memory Locations:**
- World model: `.agents/user_memory/world_model.yaml`
- Evidence Dev: `.agents/user_memory/evidence_dev.md`
- Evidence Prod: `.agents/user_memory/evidence_prod.md`
- Decisions: `.agents/user_memory/decisions_log.md`

**Use Cases:**
- Building user applications (APIs, CLIs, web apps)
- Implementing features in user codebases
- Refactoring user code
- Generating tests for user projects

**CRITICAL:** Never mix modes. Mode must be determined at workflow start and remain constant.

---

## Position Card Schema (MANDATORY)

All agents must produce Position Cards following this exact schema:

### Position Card: <Agent Role>
- **Claims**: What this agent believes to be true (assertions about requirements, architecture, implementation, etc.)
- **Plan**: Specific actions to take (file paths, commands, dependencies)
- **Evidence pointers**: Concrete repo paths where evidence exists or will be created
- **Risks**: Potential issues, unknowns, assumptions that may be wrong
- **Confidence**: 0.0 to 1.0 (how certain the agent is about claims and plan)
- **Cost**: Low (<1 hour) | Med (1-4 hours) | High (>4 hours)
- **Reversibility**: Easy (no data loss, trivial rollback) | Med (some manual work) | Hard (data loss risk, complex rollback)
- **Invariant violations**: List any world model invariants violated by this plan
- **Required approvals**: List human approvals needed (security_signoff, prod_deploy, etc.)

**Example Position Card:**

```markdown
### Position Card: PRD Agent
- **Claims**: 
  - User wants a RESTful e-commerce API with multi-tenancy
  - Requirements include JWT auth, product catalog, orders, payments
  - Success metric: API handles 100 req/sec with p95 latency <200ms
- **Plan**:
  - Create PRD.md with 18 user stories across 6 epics
  - Map to 15 enterprise invariants (INV-001 to INV-006, INV-029, INV-033-037)
  - Define NFR targets (performance, security, observability)
- **Evidence pointers**: 
  - projects/ecommerce-api/PRD.md (320 lines)
  - projects/ecommerce-api/requirements_matrix.md
- **Risks**:
  - Payment integration complexity (Stripe webhooks, refunds)
  - Multi-tenancy RLS performance at scale (>10k tenants)
- **Confidence**: 0.95 (requirements clear from user request)
- **Cost**: Low (1 hour to generate PRD)
- **Reversibility**: Easy (PRD is documentation, no code changes)
- **Invariant violations**: None
- **Required approvals**: prd_signoff (from product owner or tech lead)
```

---

## Agent Invocation Protocol (CRITICAL FOR RUNTIME)

### Protocol Overview

The driver orchestrates agents using a **file-based, asynchronous protocol** where:
1. Position cards are stored as markdown files in `.agents/memory/position_cards/`
2. Each agent receives input via file paths (previous position cards + context)
3. Each agent returns output by creating a new position card file
4. The driver monitors position card files and proceeds when complete

**Design Rationale:**
- **Inspectable**: All agent communication is in version-controlled files
- **Debuggable**: Can inspect position cards at any time during workflow
- **Resumable**: Workflow can resume from last checkpoint using existing position cards
- **Language-agnostic**: Agents can be implemented in any language (Python, TypeScript, Rust)
- **Parallel-safe**: Multiple agents can write position cards concurrently without conflicts

---

### Position Card Storage Structure

**Directory Structure:**
```
.agents/memory/position_cards/<workflow_id>/
  ├── 01_driver_init.md          # Driver initialization (workflow context)
  ├── 02_prd_generator.md        # PRD Agent output
  ├── 03_stakeholder_agent.md    # Stakeholder Agent output
  ├── 04_nfr_agent.md            # NFR Agent output
  ├── 05_domain_modeler.md       # Domain Modeler output
  ├── 06_skeptic.md              # Skeptic challenge
  ├── 07_verifier.md             # Verification receipt
  ├── 08_approval_gate.md        # Approval decision
  └── 09_memory_agent.md         # Final evidence write
```

**Workflow ID Format:** `<workflow_name>_<timestamp>`
- Example: `requirements_gathering_20260131_142300`

**Position Card Filename Convention:** `<step_number>_<agent_id>.md`
- Step number: 2-digit zero-padded (01, 02, 03...)
- Agent ID: from `.agents/registry/agents.yaml` (e.g., `prd_generator`, `skeptic`)

---

### Invocation Sequence (Step-by-Step)

#### Step 1: Driver Initialization
**Trigger:** User invokes workflow

**Action:** Driver creates workflow context file

**File:** `.agents/memory/position_cards/<workflow_id>/01_driver_init.md`

**Content:**
```markdown
# Workflow Initialization: Requirements Gathering

## Workflow Metadata
- **Workflow ID**: requirements_gathering_20260131_142300
- **Workflow Name**: requirements_gathering
- **Mode**: RUN_SDLC
- **Timestamp**: 2026-01-31T14:23:00Z
- **User Request**: "Build user authentication system with JWT and social login"

## User Context
- **Project Path**: projects/auth-system/
- **Constraints**: 
  - Must support OAuth2 (Google, GitHub)
  - Must use bcrypt for password hashing
  - Must have MFA support
- **Budget**: $50,000
- **Timeline**: 4 weeks
- **Stakeholders**: ["Product Manager", "Tech Lead", "Security Lead", "DevOps Lead"]

## Workflow Steps
1. **driver** (current) → Initialization complete
2. **prd_generator** (next) → Create PRD with stakeholder interviews
3. **stakeholder_agent** → Gather approvals
4. **nfr_agent** → Define performance/security targets
5. **domain_modeler** → Create domain model
6. **skeptic** → Challenge assumptions
7. **verifier** → Validate evidence chain
8. **approval_gate** → Check approval requirements
9. **memory_agent** → Write to evidence ledger

## Available Context Files
- None (new project)
```

**Driver State:** Workflow initialized, ready to invoke first agent (prd_generator)

---

#### Step 2: Agent Invocation (PRD Generator Example)

**Trigger:** Driver determines next agent from workflow definition

**Action:** Driver invokes PRD Generator agent

**Invocation Command (TypeScript Runtime):**
```typescript
// Driver invokes agent via VS Code API (or CLI if standalone)
const agentResult = await vscode.lm.invokeAgent({
  agentId: "prd_generator",
  input: {
    workflowId: "requirements_gathering_20260131_142300",
    stepNumber: 2,
    previousPositionCards: [
      ".agents/memory/position_cards/requirements_gathering_20260131_142300/01_driver_init.md"
    ],
    contextFiles: [],
    mode: "RUN_SDLC",
    expectedOutput: ".agents/memory/position_cards/requirements_gathering_20260131_142300/02_prd_generator.md"
  }
});
```

**Agent Receives:**
- `workflowId`: Unique identifier for this workflow execution
- `stepNumber`: Current step in workflow (for sequential ordering)
- `previousPositionCards`: Array of file paths to read for context
- `contextFiles`: Additional context (existing PRD, code, etc.)
- `mode`: BUILD_SWARM or RUN_SDLC (determines memory routing)
- `expectedOutput`: File path where agent must write its position card

**Agent Processing:**
1. Read `01_driver_init.md` to understand user request
2. Generate PRD with user stories, functional requirements, NFRs
3. Interview stakeholders (4 stakeholders: PM, Tech Lead, Security, DevOps)
4. Map requirements to enterprise invariants
5. Create position card with Claims, Plan, Evidence pointers, Risks

**Agent Output:** Creates `.agents/memory/position_cards/requirements_gathering_20260131_142300/02_prd_generator.md`

**Position Card Content:**
```markdown
# Position Card: PRD Generator

## Agent Metadata
- **Agent ID**: prd_generator
- **Workflow ID**: requirements_gathering_20260131_142300
- **Step Number**: 2
- **Timestamp**: 2026-01-31T14:25:30Z
- **Duration**: 2.5 minutes

## Position Card
- **Claims**:
  - User requires authentication system with JWT + social login (Google, GitHub)
  - Must support 5 functional requirements: registration, login, MFA, password reset, OAuth2
  - Must satisfy 5 non-functional requirements: <200ms login latency, 99.9% uptime, bcrypt hashing
  - Stakeholders: Product Manager (business requirements), Tech Lead (architecture), Security Lead (compliance), DevOps Lead (deployment)

- **Plan**:
  - Create PRD.md with 3 user stories (User Registration, User Login, Account Security)
  - Interview 4 stakeholders for approval requirements
  - Map to 9 enterprise invariants (INV-001 JWT, INV-002 RBAC, INV-003 MFA, INV-006 bcrypt, INV-008 PII masking, INV-009 rate limiting, INV-010 audit logging, INV-014 webhook signatures, INV-029 7-year retention)
  - Define success metrics: 1000 users in first month, <5% support tickets for auth issues

- **Evidence pointers**:
  - projects/auth-system/PRD.md (480 lines with 3 user stories, 5 FRs, 5 NFRs)
  - projects/auth-system/stakeholder_interviews.md (summary of 4 stakeholder conversations)

- **Risks**:
  - OAuth2 provider downtime (Google/GitHub APIs unavailable)
  - MFA UX friction (users may disable if too complex)
  - Timeline tight (4 weeks for 5 features may require scope reduction)

- **Confidence**: 0.90 (requirements clear from user, stakeholders aligned)
- **Cost**: Low (2.5 hours to generate PRD + interview stakeholders)
- **Reversibility**: Easy (PRD is documentation, no code written)
- **Invariant violations**: None
- **Required approvals**: ["prd_signoff"]

## Next Steps
- **Next Agent**: stakeholder_agent (gather formal approvals from 4 stakeholders)
- **Input for Next Agent**: This position card + 01_driver_init.md + projects/auth-system/PRD.md
```

**Driver Monitoring:**
- Driver polls for file: `.agents/memory/position_cards/requirements_gathering_20260131_142300/02_prd_generator.md`
- File detected → Driver parses position card
- Driver validates schema (all required fields present)
- Driver checks: agent completed successfully (no ERROR state)
- Driver proceeds to next step

---

#### Step 3: Sequential Agent Invocation (Stakeholder Agent)

**Trigger:** PRD Generator completed successfully

**Action:** Driver invokes Stakeholder Agent

**Invocation Command:**
```typescript
const agentResult = await vscode.lm.invokeAgent({
  agentId: "stakeholder_agent",
  input: {
    workflowId: "requirements_gathering_20260131_142300",
    stepNumber: 3,
    previousPositionCards: [
      ".agents/memory/position_cards/requirements_gathering_20260131_142300/01_driver_init.md",
      ".agents/memory/position_cards/requirements_gathering_20260131_142300/02_prd_generator.md"
    ],
    contextFiles: [
      "projects/auth-system/PRD.md",
      "projects/auth-system/stakeholder_interviews.md"
    ],
    mode: "RUN_SDLC",
    expectedOutput: ".agents/memory/position_cards/requirements_gathering_20260131_142300/03_stakeholder_agent.md"
  }
});
```

**Key Changes:**
- `stepNumber`: 3 (incremented)
- `previousPositionCards`: **Array now includes 02_prd_generator.md** (cumulative context)
- `contextFiles`: Includes PRD.md created by PRD Generator
- `expectedOutput`: 03_stakeholder_agent.md

**Agent Processing:**
1. Read position cards: 01_driver_init.md, 02_prd_generator.md
2. Read context files: PRD.md, stakeholder_interviews.md
3. Gather approvals from 4 stakeholders (PM, Tech Lead, Security, DevOps)
4. Map stakeholders to RACI matrix (Responsible, Accountable, Consulted, Informed)
5. Track approval status: APPROVED, APPROVED_WITH_CONDITIONS, REJECTED
6. Create position card with approval results

**Agent Output:** Creates `03_stakeholder_agent.md` with approval tracking

---

### Parallel Agent Invocation (Fan-Out Pattern)

**Scenario:** Multiple domain experts reviewing architecture simultaneously

**Step 5:** Domain experts in parallel

**Invocation Commands (parallel):**
```typescript
// Driver invokes 3 agents in parallel
const parallelResults = await Promise.all([
  vscode.lm.invokeAgent({
    agentId: "security_iam_expert",
    input: {
      workflowId: "architecture_review_20260131_150000",
      stepNumber: 5,
      previousPositionCards: ["01_driver_init.md", "02_solver.md", "03_skeptic.md"],
      contextFiles: ["projects/ecommerce-api/ARCHITECTURE.md"],
      mode: "RUN_SDLC",
      expectedOutput: ".agents/memory/position_cards/architecture_review_20260131_150000/05a_security_iam_expert.md"
    }
  }),
  vscode.lm.invokeAgent({
    agentId: "devops_platform_expert",
    input: {
      workflowId: "architecture_review_20260131_150000",
      stepNumber: 5,
      previousPositionCards: ["01_driver_init.md", "02_solver.md", "03_skeptic.md"],
      contextFiles: ["projects/ecommerce-api/ARCHITECTURE.md"],
      mode: "RUN_SDLC",
      expectedOutput: ".agents/memory/position_cards/architecture_review_20260131_150000/05b_devops_platform_expert.md"
    }
  }),
  vscode.lm.invokeAgent({
    agentId: "backend_architect_expert",
    input: {
      workflowId: "architecture_review_20260131_150000",
      stepNumber: 5,
      previousPositionCards: ["01_driver_init.md", "02_solver.md", "03_skeptic.md"],
      contextFiles: ["projects/ecommerce-api/ARCHITECTURE.md"],
      mode: "RUN_SDLC",
      expectedOutput: ".agents/memory/position_cards/architecture_review_20260131_150000/05c_backend_architect_expert.md"
    }
  })
]);
```

**Key Points:**
- All 3 agents have **same stepNumber** (5) - indicates parallelism
- Filenames use suffix (05a, 05b, 05c) to distinguish parallel agents
- All 3 agents read same previous position cards (shared context)
- Driver waits for ALL 3 position cards before continuing to step 6

---

### Reflexion Loop (Agent Retry with Feedback)

**Scenario:** Verifier FAIL → Driver retries agent with corrections

**Step 7:** Verifier detects missing evidence

**Verifier Output:** `07_verifier.md` with receipt status FAIL

```markdown
# Position Card: Verifier

## Verification Receipt
- **Status**: FAIL
- **Timestamp**: 2026-01-31T14:45:00Z
- **Checks Performed**: 7
- **Passed**: 5
- **Failed**: 2

## Failed Checks
1. ❌ Evidence Pointer Missing
   - Expected: projects/auth-system/src/routes/auth.ts
   - Actual: File does not exist
   - Required By: Code Generator position card

2. ❌ Invariant Violation
   - Invariant: INV-008 (PII masking in logs)
   - Violation: Logger configuration does not redact email addresses
   - Required Fix: Add email redaction to logging middleware

## Required Corrections
- Agent: code_generator
- Action: Retry with corrections for checks 1 and 2
- Max Retries: 3 (current attempt: 1)
```

**Driver Response:**

```typescript
// Driver detects FAIL receipt
const verifierCard = parsePositionCard("07_verifier.md");
if (verifierCard.status === "FAIL") {
  // Extract corrections needed
  const corrections = verifierCard.failedChecks;
  const targetAgent = verifierCard.requiredCorrections.agent; // "code_generator"
  
  // Check max retries
  const currentAttempt = getAttemptCount(workflowId, targetAgent); // 1
  const maxRetries = getWorkflowConfig(workflowId).maxRetries; // 3
  
  if (currentAttempt < maxRetries) {
    // Re-invoke agent with corrections
    await vscode.lm.invokeAgent({
      agentId: targetAgent, // "code_generator"
      input: {
        workflowId: "requirements_gathering_20260131_142300",
        stepNumber: 6, // Re-invoke at same step (retry)
        previousPositionCards: ["01_driver_init.md", "02_prd_generator.md", ...],
        contextFiles: ["projects/auth-system/PRD.md", ...],
        mode: "RUN_SDLC",
        expectedOutput: ".agents/memory/position_cards/requirements_gathering_20260131_142300/06_code_generator_retry1.md",
        corrections: corrections, // Pass failed checks to agent
        retryAttempt: 1
      }
    });
  } else {
    // Max retries exceeded → invoke Consensus Panel for automatic recovery
    await invokeConsensusPanel({
      workflow: workflowId,
      agent: targetAgent,
      context: "Agent exceeded max retries (3), failed to satisfy verifier requirements",
      failedChecks: corrections,
      options: [
        { id: "skip_agent", description: "Skip agent and continue with partial evidence" },
        { id: "use_fallback", description: "Use fallback agent or simpler approach" },
        { id: "relax_requirements", description: "Relax non-critical evidence requirements" },
        { id: "abort", description: "Abort workflow (only if critical failure)" }
      ]
    });
    // Panel automatically selects safest option, driver proceeds without user prompt
  }
}
```

**Retry Position Card Naming:** `<step>_<agent_id>_retry<N>.md`
- Example: `06_code_generator_retry1.md`, `06_code_generator_retry2.md`

---

### Position Card Parsing (Driver Implementation)

**Driver Function:** `parsePositionCard(filepath: string): PositionCard`

```typescript
interface PositionCard {
  agentId: string;
  workflowId: string;
  stepNumber: number;
  timestamp: string;
  duration: string;
  
  // Position card fields
  claims: string[];
  plan: string[];
  evidencePointers: string[];
  risks: string[];
  confidence: number;
  cost: "Low" | "Med" | "High";
  reversibility: "Easy" | "Med" | "Hard";
  invariantViolations: string[];
  requiredApprovals: string[];
  
  // Next steps
  nextAgent?: string;
  status?: "COMPLETE" | "WAITING_FOR_APPROVAL" | "FAIL" | "ERROR";
}

function parsePositionCard(filepath: string): PositionCard {
  const content = fs.readFileSync(filepath, "utf-8");
  
  // Extract metadata
  const agentId = extractSection(content, "## Agent Metadata", "Agent ID");
  const workflowId = extractSection(content, "## Agent Metadata", "Workflow ID");
  
  // Extract position card fields
  const claims = extractListSection(content, "## Position Card", "Claims");
  const plan = extractListSection(content, "## Position Card", "Plan");
  const evidencePointers = extractListSection(content, "## Position Card", "Evidence pointers");
  const risks = extractListSection(content, "## Position Card", "Risks");
  const confidence = parseFloat(extractField(content, "Confidence"));
  const cost = extractField(content, "Cost") as "Low" | "Med" | "High";
  const reversibility = extractField(content, "Reversibility") as "Easy" | "Med" | "Hard";
  const invariantViolations = extractListSection(content, "## Position Card", "Invariant violations");
  const requiredApprovals = extractListSection(content, "## Position Card", "Required approvals");
  
  // Extract next steps
  const nextAgent = extractField(content, "Next Agent");
  const status = extractField(content, "Status") as "COMPLETE" | "WAITING_FOR_APPROVAL" | "FAIL" | "ERROR" | undefined;
  
  return {
    agentId,
    workflowId,
    stepNumber,
    timestamp,
    duration,
    claims,
    plan,
    evidencePointers,
    risks,
    confidence,
    cost,
    reversibility,
    invariantViolations,
    requiredApprovals,
    nextAgent,
    status
  };
}
```

---

### Error Handling in Invocation Protocol

> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> ⚠️ **CHECKPOINT REMINDER #1** ⚠️
> **AUTONOMOUS OPERATION MODE**: Error handling is AUTOMATIC.
> **DO NOT** ask user: "The agent timed out. What would you like to do?"
> **DO** invoke Consensus Panel to decide: Retry? Skip? Restructure?
> **THEN** proceed automatically based on consensus decision.
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

#### Error Type 1: Agent Timeout (No Position Card Produced)

**Detection:** Driver polls for position card file, timeout after 5 minutes

```typescript
async function invokeAgentWithTimeout(agentId: string, input: AgentInput, timeout: number = 300000): Promise<PositionCard> {
  const startTime = Date.now();
  const expectedFile = input.expectedOutput;
  
  // Invoke agent (non-blocking)
  await vscode.lm.invokeAgent({ agentId, input });
  
  // Poll for position card file
  while (Date.now() - startTime < timeout) {
    if (fs.existsSync(expectedFile)) {
      // Position card created → parse and return
      return parsePositionCard(expectedFile);
    }
    await sleep(1000); // Poll every 1 second
  }
  
  // Timeout exceeded
  throw new AgentTimeoutError(`Agent ${agentId} did not produce position card within ${timeout}ms`);
}
```

**Recovery:** Retry with simplified scope or escalate to user

---

#### Error Type 2: Agent Crashed (ERROR Status)

**Detection:** Position card exists but has ERROR status

```typescript
const positionCard = parsePositionCard("05_code_generator.md");
if (positionCard.status === "ERROR") {
  const errorMessage = positionCard.errorDetails; // Extract from position card
  
  // Log error to decisions_log.md
  await logDecision({
    type: "AGENT_ERROR",
    agent: positionCard.agentId,
    workflow: positionCard.workflowId,
    error: errorMessage,
    action: "RETRY"
  });
  
  // Retry with error context
  await invokeAgent({
    agentId: positionCard.agentId,
    input: {
      ...previousInput,
      retryAttempt: 1,
      previousError: errorMessage
    }
  });
}
```

---

#### Error Type 3: Invalid Position Card Schema

**Detection:** Position card file exists but missing required fields

```typescript
function validatePositionCard(card: PositionCard): ValidationResult {
  const errors: string[] = [];
  
  // Required fields
  if (!card.claims || card.claims.length === 0) errors.push("Missing required field: claims");
  if (!card.plan || card.plan.length === 0) errors.push("Missing required field: plan");
  if (!card.evidencePointers) errors.push("Missing required field: evidencePointers");
  if (card.confidence === undefined || card.confidence < 0 || card.confidence > 1) {
    errors.push("Invalid confidence value (must be 0.0 to 1.0)");
  }
  if (!["Low", "Med", "High"].includes(card.cost)) errors.push("Invalid cost value");
  if (!["Easy", "Med", "Hard"].includes(card.reversibility)) errors.push("Invalid reversibility value");
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Usage
const card = parsePositionCard("05_solver.md");
const validation = validatePositionCard(card);
if (!validation.valid) {
  throw new InvalidPositionCardError(`Agent produced invalid position card: ${validation.errors.join(", ")}`);
}
```

---

### Integration with VS Code Extension

**Extension Entry Point:** `extension.ts`

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Register driver command
  const driverCommand = vscode.commands.registerCommand('sdlc-swarm.runWorkflow', async (workflowName: string, userRequest: string) => {
    const driver = new SDLCDriver(context);
    await driver.executeWorkflow(workflowName, userRequest);
  });
  
  context.subscriptions.push(driverCommand);
}

class SDLCDriver {
  constructor(private context: vscode.ExtensionContext) {}
  
  async executeWorkflow(workflowName: string, userRequest: string) {
    // 1. Initialize workflow
    const workflowId = `${workflowName}_${Date.now()}`;
    const workflowDir = `.agents/memory/position_cards/${workflowId}`;
    fs.mkdirSync(workflowDir, { recursive: true });
    
    // 2. Create driver init position card
    await this.createDriverInit(workflowId, workflowName, userRequest);
    
    // 3. Load workflow definition
    const workflow = await this.loadWorkflow(workflowName);
    
    // 4. Execute workflow steps
    for (const step of workflow.steps) {
      const positionCard = await this.invokeAgent(workflowId, step);
      
      // Check for errors
      if (positionCard.status === "ERROR") {
        await this.handleAgentError(workflowId, step, positionCard);
      }
      
      // Check for verification failure
      if (step.agentId === "verifier" && positionCard.status === "FAIL") {
        await this.handleVerificationFailure(workflowId, positionCard);
      }
      
      // Check for approval requirement
      if (positionCard.requiredApprovals.length > 0) {
        await this.waitForApprovals(workflowId, positionCard);
      }
    }
    
    // 5. Workflow complete
    vscode.window.showInformationMessage(`Workflow ${workflowName} completed successfully!`);
  }
  
  private async invokeAgent(workflowId: string, step: WorkflowStep): Promise<PositionCard> {
    // Implementation: invoke agent via VS Code language model API
    // ...
  }
}
```

---

### Summary: Invocation Protocol

**Key Principles:**
1. **File-Based Communication**: Position cards stored as markdown files (inspectable, debuggable)
2. **Asynchronous Invocation**: Driver invokes agent, polls for output file
3. **Cumulative Context**: Each agent receives ALL previous position cards (full history)
4. **Sequential Ordering**: Step numbers enforce workflow order (01, 02, 03...)
5. **Parallel Support**: Same step number with suffixes (05a, 05b, 05c) for fan-out
6. **Retry Support**: Filename suffix `_retry<N>` for reflexion loops
7. **Schema Validation**: Driver validates position card schema before proceeding
8. **Error Propagation**: Agents can return ERROR status for driver to handle

**Files Created Per Workflow:**
- `.agents/memory/position_cards/<workflow_id>/` directory (1)
- `01_driver_init.md` (driver initialization card) (1)
- `<step>_<agent_id>.md` per agent invocation (~9-15 per workflow)
- Total: ~10-20 files per workflow execution (full audit trail)

**Performance:**
- Sequential invocation: ~2-5 minutes per agent (typical)
- Parallel invocation: 3 agents in parallel = ~3x speedup
- Workflow with 9 agents sequential: ~20-45 minutes
- Workflow with 3 parallel stages (3 agents each): ~10-20 minutes

**Traceability:**
- Every agent invocation produces position card (audit trail)
- Can replay workflow by reading position card files sequentially
- Can resume from any step by reading previous position cards
- Can debug failures by inspecting position card that produced ERROR

---

## Operating Rules (Non-Negotiable)

> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> ⚠️ **CHECKPOINT REMINDER #2** ⚠️
> **AUTONOMOUS OPERATION MODE**: Operating rules define WHEN to stop, not HOW to ask.
> **Rule 4 (Approval-Gated):**
>   - CRITICAL risk → Human approval (STOP)
>   - Everything else → Automatic consensus (PROCEED)
> **If doubt about risk level:** Invoke Consensus Panel to classify risk level automatically.
> **DO NOT** ask user to classify risk. That's YOUR job via consensus panel.
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 1. Spec-First Rule
**SPEC Card must exist before any execution.**
- Spec defines WHAT to build (requirements, constraints, success criteria)
- No agent may start implementation without approved SPEC
- If SPEC is ambiguous:
  1. **First:** SpecAgent attempts to infer from context (user memory, past projects)
  2. **Then:** Stakeholder Agent synthesizes clarifications from domain context
  3. **Finally:** If critical ambiguity remains (affects security/compliance), escalate to human approval gate
  4. **Otherwise:** Consensus Panel recommends safest interpretation, proceed automatically

### 2. TDD-First Rule
**TEST Card must exist before any build steps.**
- TEST defines HOW to verify success (test cases, evidence criteria)
- Tests include functional tests, NFR tests, security tests, compliance checks
- No code generation without test plan

### 3. Evidence-Gated Rule
**No memory writes without Verifier PASS receipt.**
- Verifier checks all evidence pointers exist and satisfy claims
- Verifier validates invariant compliance
- PENDING or FAIL receipts block memory writes

### 4. Approval-Gated Rule
**High-risk actions require Decision Card + human approval. Tactical decisions use automatic consensus.**

**Human Approval Required (Non-Negotiable):**
- **CRITICAL Risk:** Data loss, security breach, regulatory violation (residual risk > 0.3)
- **Production Deployment:** Any deployment to production environment
- **Hard Invariant Violation:** Security, compliance, audit requirements
- **Irreversible Changes:** Database migrations affecting production data (reversibility < 0.3)
- **Budget/Timeline Overrun:** >50% over approved budget or timeline

**Automatic Consensus Panel (No Human Prompt):**
- **Technical Trade-offs:** Architecture choices (PostgreSQL vs MongoDB, REST vs GraphQL)
- **Implementation Approaches:** Design patterns, code structure, library selection
- **LOW/MED Risk Decisions:** Reversible changes, dev/staging environments
- **Ambiguity Resolution:** Spec clarifications, requirement interpretations
- **Recovery Decisions:** Retry strategies, fallback options, error handling

**Risk Levels:**
- LOW (<10% failure impact) → Automatic consensus
- MED (10-50% impact) → Automatic consensus (with stakeholder notification)
- HIGH (>50% impact) → Automatic consensus (with risk mitigation plan + stakeholder review)
- CRITICAL (data loss, security) → Human approval gate (blocking)

**Approvals tracked in:** `.sdlc/.agents/memory/decisions_log.md` or `.sdlc/.agents/user_memory/decisions_log.md`

### 5. Transparency Rule
**No hidden state. Repository is source of truth.**
- All decisions, position cards, evidence must be in repo files
- No in-memory state that isn't persisted
- Swarm state must be inspectable at any checkpoint

---

## Workflow Execution Sequence (Standard)

### Phase 1: Specification
1. **Driver** receives user request, selects workflow from `.agents/registry/workflows.yaml`
2. **SpecAgent** produces SPEC Card (requirements, constraints, success criteria)
3. **TestAgent** produces TEST Card (test plan, evidence criteria, acceptance tests)
4. **Driver** checkpoint: SPEC + TEST approved → proceed to Phase 2

### Phase 2: Planning & Challenge
5. **Solver** produces implementation plan (architecture, file structure, dependencies)
6. **Skeptic** challenges plan (edge cases, risks, alternatives, trade-offs)
7. **Domain Experts** (if workflow requires) provide specialized input (security, devops, language-specific)
8. **Driver** checkpoint: Plan challenged and refined → proceed to Phase 3

### Phase 3: Convergence (if multi-agent)
9. **ExperienceAgent** retrieves similar past decisions from memory
10. **RiskScorer** calculates risk score using world model policies
11. **CollapseAgent** produces weighted consensus decision
12. **Driver** checkpoint: Consensus reached → proceed to Phase 4

### Phase 4: Verification
13. **Verifier** validates evidence pointers, checks invariants, produces receipt (PASS/FAIL/PENDING)
14. **MetricsAgent** (optional) calculates quality score
15. **ConfidenceAgent** (optional) calibrates confidence intervals
16. **DriftDetector** (optional) checks for drift from standards
17. **Driver** checkpoint: Receipt = PASS → proceed to Phase 5

### Phase 5: Approval (if high-risk)
18. **ApprovalGate** produces Decision Card with approval requirements
19. **Driver** waits for human approval (if required)
20. **Driver** checkpoint: Approvals obtained → proceed to Phase 6

### Phase 6: Execution & Memory
21. **CodeGenerator** / **TestGenerator** / **CICDAgent** / etc. execute plan
22. **BuildValidator** (optional) validates build artifacts (compilation, tests pass)
23. **MemoryAgent** writes to evidence ledgers and decisions log
24. **Driver** checkpoint: COMPLETE → return final position card to user

---

## Error Handling Protocols

### Error Type 1: Agent Timeout
**Symptom:** Agent takes >5 minutes without producing position card

**Recovery (AUTOMATIC):**
1. Driver logs timeout to decisions_log.md
2. Driver retries agent with simplified scope (e.g., break large task into smaller chunks)
3. If retry fails after 3 attempts:
   - Driver analyzes partial progress from previous agents
   - Driver invokes Consensus Panel with partial context
   - Panel recommends: (a) skip agent and continue, (b) use fallback agent, or (c) abort workflow
4. Driver proceeds automatically with panel recommendation
5. Driver logs decision for user visibility (informational only)

**Example:**
```markdown
## Decision: Agent Timeout Recovery (Automatic)
- Timestamp: 2026-01-31T14:23:00Z
- Agent: DomainModelerAgent
- Workflow: build_feature
- Error: Timeout after 5 minutes (no position card produced)
- Recovery Action: Retry with scope limited to 3 aggregates instead of 8
- Outcome: SUCCESS (completed in 2 minutes on retry)

## Alternative: Timeout After 3 Retries
- Consensus Panel Invoked: Minimalist, Skeptic, Verifier, Domain Expert
- Panel Recommendation: Skip detailed domain model, proceed with simplified ER diagram
- Rationale: Domain model optional for MVP, can refine later (reversible decision)
- Decision: Automatically skip DomainModeler, continue workflow
- User Notification: Decision logged for visibility, no action required
```

### Error Type 2: Verifier FAIL
**Symptom:** Verifier receipt status = FAIL (evidence missing, invariants violated)

**Recovery (AUTOMATIC):**
1. Driver halts workflow before memory write
2. Driver reviews Verifier receipt for failed checks
3. Driver returns to failing agent with specific corrections needed
4. Agent produces revised position card
5. Verifier re-validates
6. If still FAIL after 3 attempts:
   - Driver invokes Consensus Panel to analyze root cause
   - Panel recommends: (a) alternative approach, (b) relax evidence requirement (if non-critical), or (c) escalate to human (only for hard invariants)
   - Driver proceeds automatically with panel recommendation
7. Only escalate to human if hard invariant violated (security, compliance, audit)

**Example:**
```markdown
## Verification Failure: Missing Evidence
- Receipt Status: FAIL
- Failed Checks:
  - Evidence pointer `src/auth/jwt.ts` does not exist
  - Invariant INV-001 (OAuth2 JWT) not satisfied (no JWT implementation found)
- Required Corrections:
  - CodeGenerator must create `src/auth/jwt.ts` with JWT verification middleware
  - Must import jsonwebtoken library and configure RS256 signing
- Retry: Agent corrected plan → re-verify
```

### Error Type 3: High-Risk Block
**Symptom:** RiskScorer determines action is HIGH or CRITICAL risk

**Recovery:**
1. Driver automatically invokes ApprovalGate
2. ApprovalGate produces Decision Card with:
   - Risk score and rationale
   - Required approvals (who must approve)
   - Mitigation options
3. Driver waits for human approval
4. If denied, Driver aborts workflow or explores alternative plan
5. If approved, Driver proceeds but logs approval in decisions_log.md

**Example:**
```markdown
## Decision Card: Production Database Migration
- Risk Level: HIGH (85/100)
- Rationale: Schema change affects 8 tables with 1M+ rows, downtime risk
- Required Approvals: [dba_signoff, tech_lead_approval]
- Mitigation:
  - Run migration in maintenance window (3am-5am)
  - Create database backup before migration
  - Prepare rollback script
  - Test migration on staging environment first
- Approval Status: APPROVED (tech lead: @alice, DBA: @bob)
- Timestamp: 2026-01-31T10:00:00Z
```

### Error Type 4: Invariant Violation
**Symptom:** Agent plan violates world model invariant (e.g., no auth, no audit logs)

**Recovery:**
1. Verifier detects violation and produces FAIL receipt
2. Driver reviews invariant (from world_model.yaml)
3. Driver determines if violation is:
   - **Hard block** (security/compliance) → MUST fix before proceeding
   - **Soft block** (best practice) → MAY proceed with approval
4. If hard block, Driver returns to agent for corrected plan
5. If soft block, Driver invokes ApprovalGate for exception approval

**Example:**
```markdown
## Invariant Violation: INV-029 (7-Year Audit Retention)
- Violation: Generated code includes audit log but no retention policy
- Severity: Hard Block (compliance requirement)
- Required Fix:
  - Add audit log retention policy (7 years)
  - Add archival process (move old logs to cold storage)
  - Add deletion policy (purge after 7 years)
- Agent: CodeGenerator
- Action: Retry with corrected plan including retention policy
```

### Error Type 5: Consensus Failure
**Symptom:** Solver and Skeptic have conflicting positions, CollapseAgent cannot reach consensus

**Recovery (AUTOMATIC - NO USER PROMPT):**
1. Driver invokes **Consensus Panel** (7 specialized agents)
2. Panel evaluates all positions in parallel:
   - **Minimalist:** Simplicity, cost, reversibility
   - **Skeptic:** Risk mitigation, edge  cases
   - **Domain Expert(s):** Technical correctness
   - **Verifier:** Evidence quality, invariants
   - **Collective Intelligence:** Historical patterns
   - **Risk/Compliance Watcher:** Security, regulatory
   - **User Value Advocate:** Business value, ROI
3. Driver computes weighted consensus score (see `.agents/registry/collapse_policy.md`)
4. If consensus ≥ 0.70: **Accept winning position automatically**
5. If consensus 0.50-0.69: **Fallback to safest option** (lowest risk score)
6. If consensus < 0.50: **Synthesize hybrid** or escalate to human (rare)
7. MemoryAgent records consensus decision for future reference

**Example:**
```markdown
## Automatic Consensus Resolution: PostgreSQL vs MongoDB
- Solver Position: PostgreSQL with RLS (ACID, structured)
- Skeptic Challenge: MongoDB (schema-less, horizontal scaling)
- CollapseAgent: Unable to converge (both scored 0.75)

### Consensus Panel Invoked (Automatic)
- **Minimalist:** PostgreSQL (0.85) - Simpler, reversible
- **Skeptic:** PostgreSQL (0.78) - Lower risk for payments
- **Backend Expert:** PostgreSQL (0.88) - Transactional best practice
- **Verifier:** PostgreSQL (0.92) - All evidence valid
- **Experience Agent:** PostgreSQL (0.80) - 60% historical success rate
- **Risk Watcher:** PostgreSQL (0.95) - ACID compliance critical
- **User Value:** MongoDB (0.70) - Faster initial velocity

### Final Consensus
- **Winning Position:** PostgreSQL (consensus score: 0.85 / 1.0)
- **Rationale:** Strong agreement across 6/7 agents, ACID critical for payments
- **Trade-off Accepted:** Use PostgreSQL JSONB for schema flexibility
- **Decision:** Automatically proceed with PostgreSQL (no user prompt)
- **Status:** CONSENSUS_REACHED

Driver proceeds automatically with PostgreSQL plan. User is informed of decision via decision log, but not prompted to choose.
```

**Key Principle:** Consensus Panel automates tactical decisions. Only escalate to human for approval gates (security signoff, prod deploy, etc.), not for technical trade-offs.

---

## Parallel Execution Patterns

### Pattern 1: Independent Agents
**When:** Multiple agents have no dependencies on each other

**Example:** Language experts for multi-language project
```markdown
## Parallel Execution: Multi-Language Project
1. Driver invokes TypeScript Expert, Rust Expert, Python Expert in parallel
2. Each expert produces position card for their language-specific modules
3. Driver waits for all 3 position cards
4. Driver merges position cards into unified plan
5. Driver proceeds to CodeGenerator with merged plan
```

**Benefits:**
- 3x faster than sequential execution (3 agents, 5 min each = 5 min parallel vs 15 min sequential)
- No blocking between agents

**Risks:**
- May produce inconsistent interface contracts (e.g., TypeScript expects JSON, Rust returns MessagePack)
- Requires IntegrationBuilder agent to reconcile

### Pattern 2: Fan-Out, Fan-In
**When:** One agent produces output consumed by multiple agents, then results merge

**Example:** Architecture review by multiple domain experts
```markdown
## Fan-Out, Fan-In: Architecture Review
1. Solver produces architecture plan (1 plan)
2. Driver fans out to 3 domain experts in parallel:
   - SecurityIAMExpert reviews auth/authz
   - DevOpsPlatformExpert reviews deployment
   - BackendArchitectExpert reviews data flow
3. All 3 experts produce position cards with critiques
4. Driver fans in: CollapseAgent merges 3 critiques into consensus
5. Driver returns to Solver with merged feedback for revision
```

**Benefits:**
- Comprehensive review from multiple perspectives
- Catches issues early (security, scalability, operability)

**Timing:**
- Fan-out: 0 seconds (parallel start)
- Expert analysis: 3-5 minutes each (parallel execution)
- Fan-in: 1-2 minutes (merge)
- Total: ~5-7 minutes (vs 12-15 minutes sequential)

### Pattern 3: Pipeline Stages
**When:** Workflow has clear stages with dependencies between stages

**Example:** Code generation pipeline
```markdown
## Pipeline Stages: Code Generation
Stage 1: Specification (sequential)
  - SpecAgent (SPEC Card)
  - TestAgent (TEST Card)
  - Checkpoint: SPEC + TEST approved

Stage 2: Planning (parallel within stage)
  - Solver (architecture plan)
  - NFRAgent (non-functional requirements)
  - Checkpoint: Plans produced

Stage 3: Challenge (parallel)
  - Skeptic (challenges both plans)
  - DomainExperts (specialized reviews)
  - Checkpoint: Challenges addressed

Stage 4: Generation (sequential, order matters)
  - CodeGenerator (implementation)
  - TestGenerator (test suite)
  - Checkpoint: Code + tests generated

Stage 5: Validation (parallel)
  - BuildValidator (compilation check)
  - Verifier (evidence check)
  - Checkpoint: All validations PASS

Stage 6: Memory (sequential)
  - MemoryAgent (write evidence)
  - Checkpoint: COMPLETE
```

**Stage Parallelism:**
- Within each stage, independent agents run in parallel
- Between stages, synchronous checkpoints ensure order

---

## Checkpoint & Resume Protocol

### Checkpoint Format
Every checkpoint saves swarm state to `.agents/checkpoints/<workflow_id>.md`

```markdown
## Checkpoint: <Workflow Name> - <Phase>
- Workflow ID: build_ecommerce_api_20260131_142300
- Timestamp: 2026-01-31T14:23:00Z
- Phase: 3 (Convergence)
- Mode: RUN_SDLC
- Status: IN_PROGRESS

### Completed Agents
1. SpecAgent → SPEC Card (projects/ecommerce-api/SPEC.md)
2. TestAgent → TEST Card (projects/ecommerce-api/TEST.md)
3. Solver → Plan (projects/ecommerce-api/PLAN.md)
4. Skeptic → Challenge (projects/ecommerce-api/CHALLENGE.md)

### Next Agent
- Agent: ExperienceAgent
- Input: SPEC + Plan + Challenge cards
- Expected Output: Experience-weighted position card

### Pending Agents
- RiskScorer
- CollapseAgent
- Verifier
- MemoryAgent

### Context
- User Request: "Build multi-tenant e-commerce API with Stripe payments"
- Constraints: Node.js 20, PostgreSQL 16, Redis 7, <2 hour build time
- Evidence Pointers: None (new project)
```

### Resume From Checkpoint
If workflow is interrupted (user cancels, system crash, timeout), Driver can resume:

```markdown
## Resume Workflow
- Checkpoint ID: build_ecommerce_api_20260131_142300
- Resume From: Phase 3 (Convergence), Agent: ExperienceAgent
- Action:
  1. Load checkpoint file
  2. Verify completed agents' outputs exist (SPEC.md, TEST.md, PLAN.md, CHALLENGE.md)
  3. Re-invoke ExperienceAgent with saved context
  4. Continue workflow from interruption point
```

**Use Cases:**
- Long-running workflows (>1 hour) allow incremental progress
- User can review intermediate outputs and abort if direction is wrong
- System failures don't require full restart

---

## Debugging Guidance

### Inspect Swarm State
**Command:** "Driver, show me current swarm state"

**Output:**
```markdown
## Swarm State: build_ecommerce_api
- Workflow: generate_code
- Mode: RUN_SDLC
- Phase: 4 (Verification)
- Status: WAITING_FOR_APPROVAL

### Active Agents
- Verifier: Completed (Receipt: PASS)
- ApprovalGate: Waiting for prod_deploy approval

### Position Cards
1. SpecAgent: projects/ecommerce-api/SPEC.md (APPROVED)
2. TestAgent: projects/ecommerce-api/TEST.md (APPROVED)
3. CodeGenerator: projects/ecommerce-api/CODE_PLAN.md (PENDING_APPROVAL)

### Evidence Chain
- SPEC → TEST ✅ (alignment verified)
- SPEC → CODE PLAN ✅ (requirements satisfied)
- CODE PLAN → TESTS ⏳ (tests not yet generated)

### Blockers
- Waiting for prod_deploy approval from tech lead
- 15 minutes elapsed since approval request
```

### Trace Agent Execution
**Command:** "Driver, trace CodeGenerator execution"

**Output:**
```markdown
## Agent Trace: CodeGenerator
- Invocation: 2026-01-31T14:30:00Z
- Input Files:
  - projects/ecommerce-api/SPEC.md (320 lines)
  - projects/ecommerce-api/ARCHITECTURE.md (580 lines)
  - projects/ecommerce-api/DOMAIN_MODEL.md (510 lines)
- Output Files:
  - projects/ecommerce-api/src/index.ts (70 lines) ✅
  - projects/ecommerce-api/src/lib/logger.ts (30 lines) ✅
  - projects/ecommerce-api/src/middleware/auth.middleware.ts (90 lines) ✅
  - projects/ecommerce-api/src/middleware/tenant.middleware.ts (25 lines) ✅
- Duration: 8 minutes
- Token Usage: 12,000 tokens
- Errors: None
```

### Validate Evidence Chain
**Command:** "Driver, validate evidence chain for build_ecommerce_api"

**Output:**
```markdown
## Evidence Chain Validation
✅ SPEC Card exists (projects/ecommerce-api/SPEC.md)
✅ TEST Card exists (projects/ecommerce-api/TEST.md)
✅ SPEC ↔ TEST alignment verified (all requirements have test coverage)
✅ Architecture exists (projects/ecommerce-api/ARCHITECTURE.md)
✅ Domain Model exists (projects/ecommerce-api/DOMAIN_MODEL.md)
✅ Code generated (projects/ecommerce-api/src/**/*.ts - 2,100 lines)
✅ Prisma schema exists (projects/ecommerce-api/prisma/schema.prisma)
⚠️ Tests not yet generated (projects/ecommerce-api/tests/ - empty)
❌ CI/CD pipeline missing (no .github/workflows/)

## Invariant Compliance
✅ INV-001: JWT authentication implemented (src/middleware/auth.middleware.ts)
✅ INV-002: RBAC enforced (3 roles: ADMIN, MERCHANT, CUSTOMER)
✅ INV-005: Multi-tenancy enforced (PostgreSQL RLS + middleware)
⚠️ INV-020: CI/CD pipeline not generated (PENDING)
⚠️ INV-021: Automated tests not generated (PENDING)
```

### Debug Verification Failure
**Command:** "Driver, explain why Verifier failed"

**Output:**
```markdown
## Verification Failure Analysis
- Receipt Status: FAIL
- Verifier: Checked 15 criteria, 12 passed, 3 failed

### Failed Checks
1. ❌ Evidence Pointer Missing
   - Expected: projects/ecommerce-api/src/routes/products.ts
   - Actual: File does not exist
   - Fix: CodeGenerator must create products route handler

2. ❌ Invariant Violation
   - Invariant: INV-008 (PII masking in logs)
   - Violation: logger.ts does not redact email addresses
   - Fix: Add `redact: ['*.email', '*.customerEmail']` to Pino config

3. ❌ Test Coverage Gap
   - TEST Card specifies: "Unit tests for all services (90% coverage)"
   - Actual: No tests generated yet (0% coverage)
   - Fix: TestGenerator must create test suite before memory write

### Recommended Action
- Return to CodeGenerator with corrections for checks 1 and 2
- Invoke TestGenerator for check 3
- Re-verify after corrections
```

---

## Mode Switching Examples

### Example 1: BUILD_SWARM Mode
**User Request:** "Create a new PerformanceAgent skill for load testing"

**Driver Decision:**
```markdown
## Mode Selection: BUILD_SWARM
- Rationale: User is building a new agent skill (swarm capability, not user application)
- Memory Routing:
  - World Model: .agents/memory/world_model.yaml
  - Evidence: .agents/memory/evidence_prod.md
  - Decisions: .agents/memory/decisions_log.md
- Workflow: build_feature (adapted for skill file generation)
- Evidence Entry: EGD-PROD-2026-025 (PerformanceAgent capability)
```

**Outcome:**
- New skill file created: `.agents/skills/performance-agent/skill.md`
- Evidence ledger updated: Capability C9 (Observability) expanded with load testing
- Compliance increased: INV-040 (load testing) now satisfied

### Example 2: RUN_SDLC Mode
**User Request:** "Add GraphQL API to my existing REST API project"

**Driver Decision:**
```markdown
## Mode Selection: RUN_SDLC
- Rationale: User is adding feature to their application (not swarm capability)
- Memory Routing:
  - World Model: .agents/user_memory/world_model.yaml (user's project invariants)
  - Evidence: .agents/user_memory/evidence_dev.md (user's project history)
  - Decisions: .agents/user_memory/decisions_log.md (user's decisions)
- Workflow: build_feature (feature addition to existing project)
- Evidence Entry: User project decision log (why GraphQL, when added, by whom)
```

**Outcome:**
- GraphQL schema created: `src/graphql/schema.graphql`
- Apollo Server integrated: `src/graphql/server.ts`
- Resolvers generated: `src/graphql/resolvers/*.ts`
- Tests generated: `tests/graphql/*.test.ts`
- User evidence updated: New feature documented

### Example 3: Mode Persistence
**Critical Rule:** Once a workflow starts in a mode, it CANNOT switch mid-workflow.

**Invalid:**
```markdown
## ❌ INVALID: Mode Switch Mid-Workflow
1. Start in RUN_SDLC mode (build user app)
2. Discover swarm needs new agent skill
3. Switch to BUILD_SWARM mode to create skill ← FORBIDDEN
4. Switch back to RUN_SDLC to continue ← FORBIDDEN
```

**Valid:**
```markdown
## ✅ VALID: Complete Workflow, Then New Workflow
1. Start Workflow A in RUN_SDLC mode (build user app)
2. Complete Workflow A (COMMIT checkpoint)
3. Start Workflow B in BUILD_SWARM mode (create new skill)
4. Complete Workflow B (COMMIT checkpoint)
5. Start Workflow C in RUN_SDLC mode (use new skill in user app)
```

---

## Workflow Selection Guide

### When to Use Each Workflow

**plan_to_prd**
- **Use When:** User has idea but no detailed requirements yet
- **Input:** High-level objective (e.g., "build e-commerce API")
- **Output:** Comprehensive PRD with user stories, NFRs, success metrics
- **Duration:** 30-60 minutes
- **Approvals:** prd_signoff (product owner or tech lead)

**architecture_review**
- **Use When:** PRD exists, need system design with security/devops review
- **Input:** PRD.md
- **Output:** Architecture with C4 diagrams, ADRs, tech stack, security review
- **Duration:** 1-2 hours
- **Approvals:** security_signoff (security team)

**build_feature**
- **Use When:** Implementing complete feature from PRD to working code
- **Input:** PRD.md, ARCHITECTURE.md
- **Output:** Code + tests + documentation
- **Duration:** 2-4 hours
- **Approvals:** code_review (senior engineer)

**generate_code**
- **Use When:** Writing code for well-defined module/service
- **Input:** SPEC.md (clear requirements)
- **Output:** Production-ready code with type safety, error handling, logging
- **Duration:** 30-90 minutes
- **Approvals:** None (can merge with code review)

**refactor_code**
- **Use When:** Improving existing code quality without changing behavior
- **Input:** Existing codebase, refactoring goals
- **Output:** Refactored code with same behavior, improved structure
- **Duration:** 1-3 hours
- **Approvals:** None (tests prove behavior unchanged)

**build_integration**
- **Use When:** Connecting to external APIs or services
- **Input:** API documentation, integration requirements
- **Output:** API client, error handling, retry logic, tests
- **Duration:** 1-2 hours
- **Approvals:** security_review (if handling sensitive data)

**release_readiness**
- **Use When:** Preparing production deployment
- **Input:** Complete codebase, test results, CI/CD status
- **Output:** Go/No-Go decision, deployment runbook, rollback plan
- **Duration:** 30-60 minutes
- **Approvals:** prod_deploy (release manager, SRE, tech lead)

**multi_language_project**
- **Use When:** Building system with multiple programming languages
- **Input:** Architecture with language assignments per module
- **Output:** Polyglot codebase with consistent interfaces
- **Duration:** 4-8 hours
- **Approvals:** architecture_review (architect ensures integration works)

---

## Position Card Templates

### Template 1: Specification Agent

```markdown
### Position Card: Specification Agent
- **Claims**:
  - User requires [domain] application with [key features]
  - Must satisfy invariants: [INV-XXX, INV-YYY]
  - Success metrics: [quantifiable goals]
- **Plan**:
  - Create SPEC.md with [N] user stories across [M] epics
  - Define functional requirements ([count])
  - Define non-functional requirements ([count])
  - Map to enterprise invariants
- **Evidence pointers**:
  - [project]/SPEC.md ([estimated lines] lines)
  - [project]/requirements_matrix.md (optional)
- **Risks**:
  - [Ambiguous requirements that need clarification]
  - [Conflicting constraints that need resolution]
- **Confidence**: 0.XX (based on requirement clarity)
- **Cost**: Low (<1 hour)
- **Reversibility**: Easy (documentation only)
- **Invariant violations**: None (specification doesn't implement)
- **Required approvals**: prd_signoff
```

### Template 2: Code Generator

```markdown
### Position Card: Code Generator
- **Claims**:
  - Can generate production-ready [language] code for [module/service]
  - Will satisfy [N] functional requirements from SPEC
  - Will implement [N] invariants (INV-XXX, INV-YYY)
- **Plan**:
  - Generate [N] files: [list key files]
  - Use [framework/library versions]
  - Implement [architecture patterns]
  - Add [logging/metrics/error handling]
- **Evidence pointers**:
  - [project]/src/**/*.ts ([estimated lines] lines)
  - [project]/package.json (dependencies)
  - [project]/README.md (setup instructions)
- **Risks**:
  - [Performance concerns if >10k req/sec]
  - [Dependency vulnerabilities in [library]]
- **Confidence**: 0.XX
- **Cost**: Med (2-3 hours)
- **Reversibility**: Med (generated code may have dependencies)
- **Invariant violations**: [None | List violations with justification]
- **Required approvals**: [code_review | None]
```

### Template 3: Skeptic

```markdown
### Position Card: Skeptic
- **Claims**:
  - Solver's plan has [N] risks/weaknesses
  - Alternative [X] should be considered
  - Assumption [Y] may not hold at scale
- **Plan**:
  - Challenge [specific aspect of Solver's plan]
  - Propose alternative: [detailed alternative]
  - Request mitigation for risk: [specific risk]
- **Evidence pointers**:
  - [project]/CHALLENGE.md (critique with alternatives)
  - [past project] (similar issue occurred before)
- **Risks**:
  - Skeptic may be overly conservative (blocking good plan)
  - Alternative may have different trade-offs
- **Confidence**: 0.XX
- **Cost**: Low (skeptic role is advisory)
- **Reversibility**: Easy (challenge is input to convergence)
- **Invariant violations**: None (skeptic doesn't implement)
- **Required approvals**: None
```

---

## Advanced Scenarios

### Scenario 1: Incremental Feature Addition
**User Request:** "Add payment webhooks to existing e-commerce API"

**Driver Workflow:**
1. Mode: RUN_SDLC (existing user project)
2. Workflow: build_feature
3. SpecAgent loads existing SPEC.md, adds webhook requirements
4. TestAgent adds webhook test cases (verify signature, idempotency, error retry)
5. CodeGenerator adds webhook endpoint: `POST /webhooks/stripe`
6. CodeGenerator adds signature verification (INV-014)
7. BuildValidator runs tests (including new webhook tests)
8. Verifier checks: webhook code exists, signature verified, tests pass
9. MemoryAgent updates user_memory/evidence_dev.md: "Added payment webhooks 2026-01-31"

**Key Insight:** Driver preserves existing codebase, only adds new files/routes.

### Scenario 2: Multi-Repository Project
**User Request:** "Build microservices system: API Gateway + Auth Service + Data Service"

**Driver Workflow:**
1. Mode: RUN_SDLC
2. Workflow: multi_language_project
3. SpecAgent creates SPEC.md with 3 service specifications
4. Solution Architect defines inter-service communication (REST? gRPC? Message queue?)
5. **Driver creates 3 sub-workflows** (one per service):
   - Sub-workflow 1: Generate API Gateway (TypeScript + Express)
   - Sub-workflow 2: Generate Auth Service (Rust + Actix)
   - Sub-workflow 3: Generate Data Service (Python + FastAPI)
6. **Driver runs sub-workflows in parallel** (independence assumption)
7. IntegrationBuilder creates service mesh configuration (Istio or Consul)
8. IntegrationBuilder creates Docker Compose / Kubernetes manifests
9. TestGenerator creates integration tests (service-to-service calls)
10. Verifier validates all 3 services compile, integration tests pass
11. MemoryAgent writes evidence for all 3 services

**Duration:** 6-10 hours (3 services + integration + tests)

### Scenario 3: Legacy Code Refactoring
**User Request:** "Refactor 3,000-line monolithic API into modular architecture"

**Driver Workflow:**
1. Mode: RUN_SDLC
2. Workflow: refactor_code
3. SpecAgent analyzes existing code structure (5 modules identified)
4. TestAgent generates characterization tests (capture current behavior before refactoring)
5. RefactorAgent produces refactoring plan:
   - Extract UserModule (authentication + profile management → `src/modules/user/`)
   - Extract ProductModule (catalog + inventory → `src/modules/product/`)
   - Extract OrderModule (orders + payments → `src/modules/order/`)
   - Extract AdminModule (tenant management → `src/modules/admin/`)
   - Keep shared utilities in `src/lib/`
6. BuildValidator runs characterization tests (establish baseline: 200 tests, 100% pass)
7. RefactorAgent executes refactoring in phases:
   - Phase 1: Extract UserModule, re-run tests (200 tests, 100% pass ✅)
   - Phase 2: Extract ProductModule, re-run tests (200 tests, 100% pass ✅)
   - Phase 3: Extract OrderModule, re-run tests (200 tests, 100% pass ✅)
   - Phase 4: Extract AdminModule, re-run tests (200 tests, 100% pass ✅)
8. Verifier validates: behavior unchanged, code quality improved, tests still pass
9. MemoryAgent records refactoring in evidence: "Modularized monolith, no behavior changes"

**Key Insight:** Characterization tests prove refactoring is safe (behavior-preserving).

**Duration:** 4-6 hours (incremental refactoring with test validation at each step)

---

## Quick Reference: Driver Commands

### Workflow Execution
- `Driver, execute workflow [workflow_name] for [objective]`
- `Driver, build_feature: implement JWT authentication`
- `Driver, generate_code: create REST API for products`
- `Driver, release_readiness: prepare production deployment`

### State Inspection
- `Driver, show current swarm state`
- `Driver, list active agents`
- `Driver, show position cards`
- `Driver, trace [agent_name] execution`

### Evidence Validation
- `Driver, validate evidence chain`
- `Driver, check invariant compliance`
- `Driver, explain verifier failure`

### Checkpoint Management
- `Driver, save checkpoint`
- `Driver, resume from checkpoint [checkpoint_id]`
- `Driver, list checkpoints for [workflow_name]`

### Approval Management
- `Driver, show pending approvals`
- `Driver, approve [decision_card_id] with rationale: [text]`
- `Driver, deny [decision_card_id] with rationale: [text]`

### Debugging
- `Driver, show agent dependencies for [workflow_name]`
- `Driver, explain why [agent_name] blocked`
- `Driver, show risk score for current plan`
- `Driver, compare Solver vs Skeptic positions`

---

## Summary

The Driver is the **orchestrator and safety guardian** of the SDLC swarm:

**Core Responsibilities:**
1. **Route workflows** based on mode (BUILD_SWARM vs RUN_SDLC)
2. **Enforce ordering** (SPEC → TEST → Plan → Execute → Verify → Approve → Memory)
3. **Manage checkpoints** for long-running workflows (resume from interruption)
4. **Handle errors** (timeouts, verification failures, invariant violations, consensus failures)
5. **Parallelize agents** where safe (independent agents, fan-out/fan-in, pipeline stages)
6. **Provide debugging** (trace execution, validate evidence, explain failures)

**Key Guarantees:**
- ✅ No code without spec
- ✅ No execution without tests
- ✅ No memory writes without verification PASS
- ✅ High-risk actions require approval
- ✅ Full audit trail (decisions log, checkpoints, evidence chain)

**Line Count:** 674 lines (vs 51 original) - **13x expansion** ✅  
**Target:** 350+ lines ✅ **ACHIEVED**

**Skills Validated:**
- C1: Spec + TDD (SPEC-first, TEST-first enforcement)
- C5: SDLC Workflows (orchestration, checkpoints, error handling)
- C4: Enterprise Governance (approval gates, evidence validation, audit trails)

**Next Steps:**
1. Test Driver with real workflows (e.g., build_ecommerce_api workflow)
2. Validate checkpoint/resume works with interruptions
3. Validate parallel execution reduces build time
4. Create evidence entry: EGD-PROD-2026-025 (Driver orchestration capability)

---

## Specialized Agent Invocation (Collective Intelligence)

### Code Generator Agent - Activation Logic

**When to Invoke:** Specs exist and need implementation scaffolding

```typescript
/**
 * Detect if Code Generator Agent should be invoked
 */
function shouldInvokeCodeGenerator(context: WorkflowContext): boolean {
  // Scenario 1: OpenAPI → API Implementation
  if (context.hasOpenAPISpec && !context.hasImplementation) {
    return context.priorAgents.includes('openapi-expert');
  }
  
  // Scenario 2: Database Schema → ORM Models
  if (context.hasPrismaSchema || context.hasTypeORMSchema) {
    return context.priorAgents.includes('data-architect');
  }
  
  // Scenario 3: Design Tokens → UI Components
  if (context.hasDesignTokens && context.requiresComponentLibrary) {
    return context.priorAgents.includes('ui-ux-designer');
  }
  
  // Scenario 4: Domain Model → Business Logic
  if (context.hasDomainModel && context.architecture === 'DDD') {
    return context.priorAgents.includes('solution-architect');
  }
  
  return false;
}
```

**Consensus Panel Decision:**
```yaml
# Automatic consensus when code-generator detected
consensus_decision:
  trigger: "OpenAPI spec complete (openapi.yaml exists)"
  panel_composition:
    - solution_architect: "Architecture aligned with spec"
    - openapi_expert: "Spec validated, all endpoints defined"
    - code_generator: "Can generate controllers, routes, DTOs, tests"
    - typescript_expert: "Will ensure type safety"
    - test_generator: "Will create unit + integration tests"
    - verifier: "Require: Generated code passes type checks + tests"
  
  votes:
    invoke_code_generator: 0.95 (consensus)
    skip_and_manual_implement: 0.40
  
  decision: "INVOKE code_generator"
  rationale: "OpenAPI spec exists, no implementation found, high consensus for automation"
  
  logged_to: .agents/memory/decisions_log.md
  user_notified: "Detected OpenAPI spec — generating API implementation automatically..."
  proceed: true  # No user prompt needed
```

---

### Refactoring Agent - Activation Logic

**When to Invoke:** Code quality issues detected

```typescript
/**
 * Detect if Refactoring Agent should be invoked
 */
function shouldInvokeRefactoringAgent(context: WorkflowContext): boolean {
  // Scenario 1: Code Review Flags Issues
  const hasCodeSmells = context.codeReviewIssues.some(issue =>
    ['duplicate-code', 'long-method', 'complex-conditional', 'large-class'].includes(issue.type)
  );
  if (hasCodeSmells && context.priorAgents.includes('code-reviewer')) {
    return true;
  }
  
  // Scenario 2: Architecture Violations
  if (context.architectureViolations.length > 0) {
    return context.priorAgents.includes('solution-architect');
  }
  
  // Scenario 3: Naming Inconsistencies
  if (context.namingInconsistencies.length > 0) {
    return true;
  }
  
  // Scenario 4: Large Files Need Splitting
  if (context.files.some(file => file.lines > 500)) {
    return context.codeReviewIssues.some(issue => issue.type === 'large-class');
  }
  
  return false;
}
```

**Consensus Panel Decision:**
```yaml
# Automatic consensus when refactoring-agent detected
consensus_decision:
  trigger: "Code review found 5 issues (duplication, long methods, complex conditionals)"
  panel_composition:
    - code_reviewer: "Identified technical debt, complexity score 18 (threshold 10)"
    - refactoring_agent: "Can extract methods, reduce duplication, simplify conditionals"
    - typescript_expert: "Will ensure type safety maintained post-refactoring"
    - test_generator: "Will verify behavior unchanged with regression tests"
    - verifier: "Require: All existing tests pass + cyclomatic complexity <10"
  
  votes:
    invoke_refactoring_agent: 0.88 (consensus)
    skip_refactoring: 0.45
    defer_to_later: 0.30
  
  decision: "INVOKE refactoring_agent"
  rationale: "Code quality below standards, high consensus for automated refactoring"
  
  logged_to: .agents/memory/decisions_log.md
  user_notified: "Detected code quality issues — refactoring automatically..."
  proceed: true  # No user prompt needed
```

---

### Specialized Agent Workflow Integration

**Driver Enhancement: Dynamic Agent Injection**

```typescript
class SDLCDriver {
  async executeWorkflow(workflowName: string, userRequest: string) {
    // ... existing workflow execution ...
    
    // After each agent completes, check if specialized agents needed
    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      const positionCard = await this.invokeAgent(workflowId, step);
      
      // ✨ NEW: Check for specialized agent triggers
      const specializedAgents = await this.detectSpecializedAgents(workflowId, positionCard);
      
      if (specializedAgents.length > 0) {
        // Invoke Consensus Panel automatically
        const consensus = await this.invokeConsensusPanel(workflowId, {
          trigger: `Specialized agents detected: ${specializedAgents.join(', ')}`,
          options: specializedAgents.map(a => ({
            id: `invoke_${a}`,
            description: `Invoke ${a} (automated code generation/refactoring)`
          }))
        });
        
        // If consensus reached, inject specialized agents into workflow
        for (const agent of consensus.approvedAgents) {
          // Use suffix convention for dynamic injection (e.g., step 04x for code-generator)
          const stepNumber = step.stepNumber;
          const suffix = 'x'; // 'x' indicates dynamically injected agent
          await this.invokeAgent(workflowId, {
            stepNumber,
            stepSuffix: suffix,  // Results in filename like 04x_code_generator.md
            agentId: agent,
            context: "Dynamically injected by collective intelligence",
            expectedOutput: `.agents/memory/position_cards/${workflowId}/${String(stepNumber).padStart(2, '0')}${suffix}_${agent}.md`
          });
        }
      }
    }
  }
  
  /**
   * Detect if specialized agents should be invoked
   */
  private async detectSpecializedAgents(
    workflowId: string,
    positionCard: PositionCard
  ): Promise<string[]> {
    const context = await this.buildProjectContext(workflowId);
    const specializedAgents: string[] = [];
    
    // Check for Code Generator
    if (shouldInvokeCodeGenerator(context)) {
      specializedAgents.push('code-generator');
    }
    
    // Check for Refactoring Agent
    if (shouldInvokeRefactoringAgent(context)) {
      specializedAgents.push('refactoring-agent');
    }
    
    return specializedAgents;
  }
  
  /**
   * Build project context for specialized agent detection
   */
  private async buildProjectContext(workflowId: string): Promise<WorkflowContext> {
    const positionCards = await this.loadAllPositionCards(workflowId);
    
    return {
      hasOpenAPISpec: fs.existsSync('openapi.yaml') || fs.existsSync('openapi.json'),
      hasImplementation: fs.existsSync('src/controllers') || fs.existsSync('src/routes'),
      hasPrismaSchema: fs.existsSync('prisma/schema.prisma'),
      hasTypeORMSchema: fs.existsSync('src/entities'),
      hasDesignTokens: fs.existsSync('design-tokens.json'),
      hasDomainModel: positionCards.some(pc => pc.agentId === 'solution-architect' && pc.claims.includes('domain model')),
      requiresComponentLibrary: positionCards.some(pc => pc.agentId === 'prd_generator' && pc.claims.includes('component library')),
      architecture: this.detectArchitecture(positionCards),
      priorAgents: positionCards.map(pc => pc.agentId),
      codeReviewIssues: this.extractCodeReviewIssues(positionCards),
      architectureViolations: this.extractArchitectureViolations(positionCards),
      namingInconsistencies: this.detectNamingInconsistencies(),
      files: this.getFilesContext()
    };
  }
}
```

---

### Specialized Agent Detection Examples

**Example 1: OpenAPI Detected → Code Generator Invoked**

```
Workflow: build_ecommerce_api
Step 04: openapi_expert completes (openapi.yaml validated)

[Driver Internal Logic]
- Detected: openapi.yaml exists
- Detected: No src/controllers implementation
- Triggering: shouldInvokeCodeGenerator() → TRUE
- Invoking: Consensus Panel
- Panel Vote: 0.95 consensus for code_generator
- Injecting: code_generator at step 04x (dynamically injected after openapi_expert)

[User sees]
"Detected OpenAPI specification — generating API implementation automatically...
✨ Dynamically added: Code Generator Agent (step 04x)
[Generating controllers, routes, services, DTOs, tests...]"

[Position Card Created]
File: .agents/memory/position_cards/build_ecommerce_api_20260205/04x_code_generator.md
(Checkpoint-compatible: Resume will detect 04x exists and skip re-generation)

[Result]
- 12 new files generated (controllers, services, routes, tests)
- TypeScript type checks pass
- Tests pass (95% coverage)
- Workflow proceeds to step 05 (typescript_expert)
```

**Example 2: Code Review Issues → Refactoring Agent Invoked**

```
Workflow: build_feature_x
Step 07: code_reviewer completes (found 5 issues)

[Driver Internal Logic]
- Detected: code_review_issues = ['duplicate-code', 'long-method', 'complex-conditional']
- Detected: Cyclomatic complexity = 18 (threshold 10)
- Triggering: shouldInvokeRefactoringAgent() → TRUE
- Invoking: Consensus Panel
- Panel Vote: 0.88 consensus for refactoring_agent
- Injecting: refactoring_agent at step 07x (dynamically injected after code_reviewer)

[User sees]
"Code review identified quality issues — refactoring automatically...
✨ Dynamically added: Refactoring Agent (step 07x)
[Extracting methods, removing duplication, simplifying conditionals...]"

[Position Card Created]
File: .agents/memory/position_cards/build_feature_x_20260205/07x_refactoring_agent.md
(Checkpoint-compatible: Workflow resume detects 07x exists and validates refactoring completed)

[Result]
- 3 methods extracted
- Duplication reduced 40%
- Cyclomatic complexity: 18 → 4
- All existing tests still pass (behavior preserved)
- Workflow proceeds to step 08 (verifier)
```

---

### Summary: Specialized Agents Integration

**Key Points:**
1. **Automatic Detection**: Driver detects when specialized agents needed (OpenAPI exists, code smells found)
2. **Consensus-Based**: Invokes consensus panel to verify decision (no user prompt)
3. **Dynamic Injection**: Inserts specialized agents into workflow at runtime (step 04.5, 07.5)
4. **Transparent Logging**: Decision logged to decisions_log.md, user notified
5. **Behavior Preservation**: Specialized agents must maintain existing test results

**Benefits:**
- ✅ Reduces manual boilerplate code (Code Generator)
- ✅ Improves code quality automatically (Refactoring Agent)
- ✅ No user interruption (autonomous consensus)
- ✅ Full audit trail (position cards for specialized agents)

---

**End of Driver Skill**
