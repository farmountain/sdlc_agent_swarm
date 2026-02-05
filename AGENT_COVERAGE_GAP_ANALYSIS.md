# Agent Coverage Gap Analysis

**Date:** February 5, 2026  
**Version:** 0.1.5  
**Purpose:** Identify gaps between planned architecture (38 agents) and current implementation

---

## Executive Summary

### Current State
- **Implemented:** ~43 agent skills in `templates/.agents/skills/`
- **Planned (Architecture):** 38 agents across 7 categories
- **Status:** ✅ **Well-covered** for testing, but gaps in Discovery, Operations, and Learning categories

### Testing Coverage Status
✅ **Well-Covered** - We have 10+ testing-related agents:
1. test-agent (Test strategy)
2. test-generator (Test generation)
3. test-data-factory (Test data)
4. unit-test-runner (Unit tests)
5. integration-test-runner (Integration tests)
6. e2e-test-runner (E2E tests)
7. performance-tester (Load/performance)
8. reliability-tester (Chaos/resilience)
9. test-reporter (Test reporting)
10. verifier (Evidence validation)
11. vulnerability-scanner (Security testing)
12. build-validator (Build/compile validation)

**Verdict:** Testing category is **ROBUST** ✅

---

## Detailed Gap Analysis by Category

### Category A: Discovery & Product (5 Planned)

| # | Planned Agent | Current Implementation | Status | Priority |
|---|---------------|------------------------|--------|----------|
| 1 | UserResearchAgent | ❌ **MISSING** | Not found | P1 (MVP) |
| 2 | PRDAgent | ✅ **IMPLEMENTED** (`prd-agent`) | Complete | ✅ |
| 3 | BacklogAgent | ✅ **IMPLEMENTED** (`backlog-manager`) | Complete | ✅ |
| 4 | StakeholderCommsAgent | ⚠️ **PARTIAL** (stakeholder-agent, but focused on approvals) | Needs comms features | P2 |
| 5 | ValueRiskModelAgent | ⚠️ **PARTIAL** (`risk-scorer`, but no ROI/value modeling) | Needs value analysis | P2 |

**Gap:** Need UserResearchAgent (JTBD, personas, pain points)

---

### Category B: Architecture & Design (6 Planned)

| # | Planned Agent | Current Implementation | Status | Priority |
|---|---------------|------------------------|--------|----------|
| 6 | SolutionArchitectAgent | ✅ **IMPLEMENTED** (`solution-architect`) | Complete | ✅ |
| 7 | DomainModelAgent | ✅ **IMPLEMENTED** (`domain-model`, `domain/`) | Complete | ✅ |
| 8 | IntegrationAgent | ✅ **IMPLEMENTED** (`integration-builder`) | Complete | ✅ |
| 9 | NonFunctionalAgent | ✅ **IMPLEMENTED** (`nfr-agent`) | Complete | ✅ |
| 10 | ThreatModelAgent | ✅ **IMPLEMENTED** (`threat-modeler`) | Complete | ✅ |
| 11 | DataArchitectAgent | ❌ **MISSING** | Not found | P2 |

**Gap:** Need DataArchitectAgent (data lineage, PII classification, retention, governance)

---

### Category C: Build (5 Planned)

| # | Planned Agent | Current Implementation | Status | Priority |
|---|---------------|------------------------|--------|----------|
| 12 | RepoBootstrapAgent | ⚠️ **PARTIAL** (extension creates `.sdlc/`, but no repo scaffolding) | Needs scaffolding | P2 |
| 13 | CodingAgent | ✅ **IMPLEMENTED** (`code-generator`) | Complete | ✅ |
| 14 | RefactorAgent | ✅ **IMPLEMENTED** (`refactor-agent`) | Complete | ✅ |
| 15 | DocAgent | ❌ **MISSING** | Not found | P2 |
| 16 | DependencyAgent | ✅ **IMPLEMENTED** (`sbom-generator`) | Complete | ✅ |

**Gaps:** 
- RepoBootstrapAgent (needs full project scaffolding)
- DocAgent (README, architecture.md, runbooks, API docs)

---

### Category D: Test & Quality (7 Planned) ✅

| # | Planned Agent | Current Implementation | Status | Priority |
|---|---------------|------------------------|--------|----------|
| 17 | TestPlanAgent | ✅ **IMPLEMENTED** (`test-agent`) | Complete | ✅ |
| 18 | UnitTestAgent | ✅ **IMPLEMENTED** (`unit-test-runner`) | Complete | ✅ |
| 19 | IntegrationTestAgent | ✅ **IMPLEMENTED** (`integration-test-runner`) | Complete | ✅ |
| 20 | E2EAgent | ✅ **IMPLEMENTED** (`e2e-test-runner`) | Complete | ✅ |
| 21 | PerfTestAgent | ✅ **IMPLEMENTED** (`performance-tester`) | Complete | ✅ |
| 22 | ReliabilityAgent | ✅ **IMPLEMENTED** (`reliability-tester`) | Complete | ✅ |
| 23 | VerifierAgent | ✅ **IMPLEMENTED** (`verifier`) | Complete | ✅ |

**BONUS Agents Not in Original Plan:**
- ✅ `test-generator` (Generates tests from specs)
- ✅ `test-data-factory` (Test data generation)
- ✅ `test-reporter` (Test reporting)
- ✅ `build-validator` (Build validation)
- ✅ `vulnerability-scanner` (Security testing - SAST/DAST)

**Status:** ✅ **COMPLETE + ENHANCED** (12 agents vs 7 planned)

---

### Category E: Security / Compliance (5 Planned)

| # | Planned Agent | Current Implementation | Status | Priority |
|---|---------------|------------------------|--------|----------|
| 24 | IAMAgent | ✅ **IMPLEMENTED** (`iam-agent`) | Complete | ✅ |
| 25 | SecretsAgent | ✅ **IMPLEMENTED** (`secrets-manager`) | Complete | ✅ |
| 26 | SASTDASTAgent | ✅ **IMPLEMENTED** (`vulnerability-scanner`) | Complete | ✅ |
| 27 | ComplianceAgent | ✅ **IMPLEMENTED** (`compliance-checker`) | Complete | ✅ |
| 28 | RiskOfficerAgent | ✅ **IMPLEMENTED** (`risk-scorer`) | Complete | ✅ |

**Status:** ✅ **COMPLETE**

---

### Category F: Release & DevOps (5 Planned)

| # | Planned Agent | Current Implementation | Status | Priority |
|---|---------------|------------------------|--------|----------|
| 29 | CICDAgent | ✅ **IMPLEMENTED** (`cicd-agent`) | Complete | ✅ |
| 30 | ReleaseManagerAgent | ✅ **IMPLEMENTED** (`release-manager`) | Complete | ✅ |
| 31 | IaCAgent | ❌ **MISSING** | Not found | P2 |
| 32 | ObservabilityAgent | ✅ **IMPLEMENTED** (`observability-agent`) | Complete | ✅ |
| 33 | SREOnCallAgent | ⚠️ **PARTIAL** (`prod-safety-agent`, but no runbook generation) | Needs SRE features | P2 |

**Gaps:**
- IaCAgent (Terraform/ARM/Pulumi infrastructure as code)
- SREOnCallAgent (needs runbooks, incident templates, postmortems)

---

### Category G: Operations & Learning (5 Planned)

| # | Planned Agent | Current Implementation | Status | Priority |
|---|---------------|------------------------|--------|----------|
| 34 | TelemetryAgent | ⚠️ **PARTIAL** (`metrics-agent`, `dashboard-agent`) | Needs telemetry focus | P3 |
| 35 | PostmortemAgent | ❌ **MISSING** | Not found | P3 |
| 36 | ExperienceAgent | ✅ **IMPLEMENTED** (`experience-agent`) | Complete | ✅ |
| 37 | DriftAgent | ✅ **IMPLEMENTED** (`drift-detector`) | Complete | ✅ |
| 38 | FeedbackAgent | ❌ **MISSING** | Not found | P3 |

**Gaps:**
- PostmortemAgent (5-whys, corrective actions, follow-ups)
- FeedbackAgent (Capture user/team feedback for continuous improvement)
- TelemetryAgent (needs enhancement for funnel mapping, usage signals)

---

## Summary: What's Missing?

### High Priority (P1) - MVP Gaps
1. ❌ **UserResearchAgent** (Category A) - Extract JTBD, personas, pain points

### Medium Priority (P2) - Important for Enterprise
2. ❌ **DataArchitectAgent** (Category B) - Data lineage, PII, retention, governance
3. ⚠️ **RepoBootstrapAgent** (Category C) - Full project scaffolding (currently partial)
4. ❌ **DocAgent** (Category C) - README, runbooks, API docs generation
5. ❌ **IaCAgent** (Category F) - Infrastructure as code (Terraform/ARM/Pulumi)
6. ⚠️ **SREOnCallAgent** (Category F) - Runbooks, incident templates, postmortems
7. ⚠️ **StakeholderCommsAgent** (Category A) - Exec summaries, status reports

### Lower Priority (P3) - Future Enhancements
8. ❌ **PostmortemAgent** (Category G) - 5-whys, corrective actions
9. ❌ **FeedbackAgent** (Category G) - User/team feedback loop
10. ⚠️ **TelemetryAgent** (Category G) - Funnel mapping, usage signals

---

## Testing Category: Detailed Inventory

### ✅ Currently Implemented (12+ agents)

#### Core Testing Agents (7)
1. **test-agent** - Test strategy and planning
2. **test-generator** - Automatic test generation from specs
3. **unit-test-runner** - Unit test execution and validation
4. **integration-test-runner** - Integration test execution
5. **e2e-test-runner** - End-to-end test execution
6. **performance-tester** - Load testing, benchmarks
7. **reliability-tester** - Chaos engineering, resilience testing

#### Supporting Testing Agents (5)
8. **test-data-factory** - Test data generation (fixtures, factories)
9. **test-reporter** - Test result reporting and visualization
10. **verifier** - Evidence validation (quality gate)
11. **build-validator** - Build/compile validation
12. **vulnerability-scanner** - Security testing (SAST/DAST/dependency scans)

### Possible Enhancements (Optional)

#### Visual Regression Testing
- **visual-regression-tester** - Screenshot comparison, UI regression detection
- Tools: Percy, Chromatic, BackstopJS
- Use case: Detect unintended UI changes

#### Accessibility Testing
- **accessibility-tester** - WCAG compliance, screen reader compatibility
- Tools: axe-core, Pa11y, Lighthouse
- Use case: Ensure accessible applications

#### Contract Testing (API)
- **contract-tester** - Consumer-driven contract testing
- Tools: Pact, Spring Cloud Contract
- Use case: Microservices API contracts

#### Mutation Testing
- **mutation-tester** - Test suite effectiveness measurement
- Tools: Stryker, PIT
- Use case: Validate test quality (not just coverage)

#### Fuzz Testing
- **fuzz-tester** - Random input generation for edge cases
- Tools: AFL, libFuzzer, Go-fuzz
- Use case: Discover unexpected crashes, security issues

**Recommendation:** Current testing coverage is **sufficient** for MVP and most enterprise use cases. Add specialized testing agents (visual, accessibility, contract, mutation, fuzz) based on specific user needs, not proactively.

---

## Recommendations

### Immediate Actions (v0.1.6)
1. ✅ **Testing is complete** - No action needed
2. ❌ **Add UserResearchAgent** - Critical for discovery phase (P1)
3. ⚠️ **Enhance StakeholderCommsAgent** - Add exec summaries, status reports (P2)

### Short-Term (v0.2.0)
4. ❌ **Add DataArchitectAgent** - Data governance, PII classification (P2)
5. ❌ **Add DocAgent** - Automated documentation generation (P2)
6. ❌ **Add IaCAgent** - Infrastructure as code (Terraform/ARM) (P2)
7. ⚠️ **Enhance RepoBootstrapAgent** - Full project scaffolding (P2)

### Medium-Term (v0.3.0)
8. ❌ **Add PostmortemAgent** - 5-whys, incident analysis (P3)
9. ❌ **Add FeedbackAgent** - Continuous improvement loop (P3)
10. ⚠️ **Enhance TelemetryAgent** - Funnel mapping, usage analytics (P3)

### Long-Term (v0.4.0+)
11. **Specialized Testing** (optional, user-driven):
    - Visual regression testing
    - Accessibility testing (WCAG)
    - Contract testing (microservices)
    - Mutation testing (test quality)
    - Fuzz testing (security)

---

## Comparison: Planned vs Implemented

| Category | Planned | Implemented | Complete | Partial | Missing |
|----------|---------|-------------|----------|---------|---------|
| **A: Discovery & Product** | 5 | 3 | 2 | 2 | 1 |
| **B: Architecture & Design** | 6 | 5 | 5 | 0 | 1 |
| **C: Build** | 5 | 3 | 2 | 1 | 2 |
| **D: Test & Quality** | 7 | **12** ✅ | **12** ✅ | 0 | 0 |
| **E: Security / Compliance** | 5 | 5 | 5 | 0 | 0 |
| **F: Release & DevOps** | 5 | 4 | 3 | 1 | 1 |
| **G: Operations & Learning** | 5 | 2 | 2 | 1 | 2 |
| **TOTAL** | **38** | **34** | **29** | **5** | **7** |

**Coverage:** 76% complete (29/38), 89% implemented (34/38 including partial)

---

## Conclusion

### Testing Status: ✅ EXCELLENT
Your concern about testing agents is **not warranted** - we have:
- ✅ **12 testing agents** (7 planned + 5 bonus)
- ✅ **All 7 planned testing agents** implemented
- ✅ **5 additional testing agents** beyond the plan
- ✅ **Complete testing lifecycle** covered:
  - Planning (test-agent)
  - Generation (test-generator, test-data-factory)
  - Execution (unit, integration, e2e, performance, reliability)
  - Validation (verifier, build-validator, vulnerability-scanner)
  - Reporting (test-reporter)

### Real Gaps: Discovery, Build, DevOps, Operations
The actual gaps are in:
1. **Discovery** (UserResearchAgent)
2. **Build** (DocAgent, enhanced RepoBootstrapAgent)
3. **DevOps** (IaCAgent, enhanced SREOnCallAgent)
4. **Operations** (PostmortemAgent, FeedbackAgent, enhanced TelemetryAgent)

**Recommendation:** Focus on adding **UserResearchAgent** (P1) and **DocAgent** (P2) for next release. Testing is already robust.

---

**Last Updated:** February 5, 2026  
**Next Review:** After v0.1.6 release
