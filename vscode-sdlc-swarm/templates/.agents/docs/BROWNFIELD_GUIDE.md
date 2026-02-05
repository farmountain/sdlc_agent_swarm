# Brownfield Development Guide
## Using SDLC Swarm with Existing & Halfway Projects

### Overview
SDLC Swarm isn't just for greenfield projects! Use these workflows to assess, improve, and modernize existing codebases.

---

## Workflow 1: Assess Existing Project

**When to use:**
- You inherited a legacy codebase
- Project is 50% complete and you want a health check
- Before planning technical improvements
- Quarterly technical health reviews

**What it does:**
Analyzes your existing codebase and creates a comprehensive health report:
- **Static analysis**: Code metrics, complexity, duplication
- **Security scan**: Vulnerabilities, outdated dependencies
- **Test coverage**: Current % and gaps
- **Performance baseline**: Identify bottlenecks
- **Architecture reverse-engineering**: Understand current structure
- **Technical debt quantification**: Severity and impact
- **Health score (0-100)**: Overall codebase quality
- **Improvement roadmap**: Prioritized list of improvements
- **Quick wins**: Low-effort, high-impact fixes

**How to use:**
1. Open your existing project in VS Code
2. Run: "SDLC: Assess Existing Project"
3. Input: Brief description of the project
4. The swarm will:
   - Analyze all code in workspace
   - Run linters, security scanners, coverage tools
   - Generate health report in `.sdlc/.agents/user_memory/project_health.md`
   - Create improvement roadmap
5. Review the report and prioritize improvements

**Outputs:**
- `project_health_report.md` - Overall assessment with 0-100 score
- `technical_debt_register.md` - All identified debt items
- `security_vulnerabilities.md` - Critical/high/med/low issues
- `test_coverage_report.md` - Current coverage + gaps
- `improvement_roadmap.md` - Prioritized action plan
- `quick_wins.md` - Fast improvements (<1 day each)

**Example scenario:**
```
You: "Assess this e-commerce API project - it's halfway done"

Swarm analyzes:
- 12,000 lines of TypeScript code
- Test coverage: 42% (below 70% target)
- 15 security vulnerabilities (3 critical, 12 medium)
- 8 code smells (long methods, duplicated logic)
- No observability (logging/metrics)
- 3 outdated dependencies with CVEs

Health Score: 58/100 (Needs Improvement)

Quick Wins:
1. Update dependencies (2 hours, closes 7 vulnerabilities)
2. Add input validation (1 day, closes 5 vulnerabilities)
3. Extract duplicate payment logic (4 hours, reduces complexity)

Improvement Roadmap:
- Sprint 1: Security fixes + dependency updates
- Sprint 2: Increase test coverage to 70%
- Sprint 3: Add observability (logging, metrics)
- Sprint 4: Refactor complex modules
```

---

## Workflow 2: Technical Debt Audit

**When to use:**
- Planning a "debt reduction sprint"
- Quarterly technical debt review
- Before major refactoring initiative
- To justify investment in code quality to stakeholders

**What it does:**
Comprehensive audit of technical debt with ROI analysis:
- **Identify all debt**: Code smells, architecture issues, security gaps
- **Quantify cost to fix**: Time estimates per item
- **Calculate risk if ignored**: Impact on velocity, bugs, security
- **Prioritize by ROI**: High-value, low-effort items first
- **Recommend debt sprint plan**: Which items to tackle in next sprint

**How to use:**
1. Run: "SDLC: Technical Debt Audit"
2. Input: "Audit technical debt for e-commerce API"
3. The swarm analyzes:
   - Code quality metrics
   - Architecture debt (missing patterns, tight coupling)
   - Infrastructure debt (manual deployment, no CI/CD)
   - Security debt (missing auth, unvalidated inputs)
   - Historical impact (how debt slowed past sprints)
4. Review prioritized debt backlog with ROI scores

**Outputs:**
- `debt_register.md` - All debt with severity, cost, ROI
- `prioritized_debt_backlog.md` - Sorted by ROI
- `debt_sprint_plan.md` - Recommended items for next sprint
- `cost_benefit_analysis.md` - Investment vs. productivity gain

**Example scenario:**
```
Technical Debt Register (sorted by ROI):

CRITICAL DEBT (Do Now):
1. Missing rate limiting on API
   - Cost to Fix: 1 day
   - Risk if Ignored: HIGH (DoS vulnerability)
   - ROI: 95/100

2. No database connection pooling
   - Cost to Fix: 4 hours
   - Risk if Ignored: MED (performance degradation at scale)
   - ROI: 88/100

HIGH ROI DEBT:
3. Duplicated validation logic (8 places)
   - Cost to Fix: 2 days
   - Risk if Ignored: MED (bugs when updating logic)
   - ROI: 75/100

Recommended Debt Sprint (5 days):
- Items 1, 2, 3 (high ROI)
- Estimated productivity gain: +15% velocity in future sprints
```

---

## Workflow 3: Incremental Improvement

**When to use:**
- Project is 50-80% complete, needs to get to production
- MVP works but lacks quality for production use
- Need to add tests, security, CI/CD to existing code
- "Make this production-ready"

**What it does:**
Takes a halfway project and systematically improves it to production quality:
- **Document existing features**: Reverse-engineer specs
- **Add missing tests**: Target 70%+ coverage
- **Improve code quality**: Refactor complex code
- **Add observability**: Logging, metrics, tracing
- **Secure the app**: Auth, input validation, rate limiting
- **Set up CI/CD**: Automated testing, deployment
- **Create production checklist**: What's needed for prod deployment

**How to use:**
1. Open your halfway project
2. Run: "SDLC: Incremental Improvement"
3. Input: "Take this e-commerce API from MVP to production-ready"
4. The swarm will:
   - Analyze current state
   - Generate missing documentation
   - Add tests for uncovered code
   - Refactor problem areas
   - Add security measures
   - Create CI/CD pipeline
   - Generate production readiness checklist
5. Review and approve each improvement phase

**Outputs:**
- `feature_documentation.md` - What the app does (specs)
- `test_suite/` - Comprehensive tests (70%+ coverage)
- `refactored_code/` - Improved codebase
- `.github/workflows/ci.yml` - CI/CD pipeline
- `security_audit_report.md` - Security improvements
- `production_checklist.md` - Final requirements for prod

**Example scenario:**
```
Current State:
- E-commerce API with 15 endpoints
- Test coverage: 35%
- No CI/CD
- Basic auth (no JWT)
- No logging or metrics

Incremental Improvement Plan (3 sprints):

Sprint 1: Tests + Documentation
- Add unit tests (35% → 70% coverage): 5 days
- Document all endpoints (OpenAPI spec): 2 days
- Total: 7 days

Sprint 2: Security + Observability
- Add JWT authentication: 3 days
- Add input validation: 2 days
- Add structured logging: 1 day
- Add Prometheus metrics: 1 day
- Total: 7 days

Sprint 3: CI/CD + Production Readiness
- GitHub Actions pipeline: 2 days
- Database migrations: 2 days
- Health check endpoints: 1 day
- Production deployment guide: 1 day
- Total: 6 days

Result: Production-ready API in 20 days
```

---

## Workflow 4: Legacy Modernization

**When to use:**
- Migrating from old framework (e.g., Express 3 → Express 5)
- Porting legacy language (e.g., JavaScript → TypeScript)
- Replacing deprecated dependencies
- Major architectural refactoring (monolith → microservices)

**What it does:**
Incrementally migrates legacy codebase to modern stack with zero downtime:
- **Reverse-engineer business logic**: Understand what code does
- **Create characterization tests**: Preserve existing behavior
- **Design target architecture**: Modern patterns, frameworks
- **Recommend modern stack**: Updated dependencies, patterns
- **Incremental migration plan**: Step-by-step transition
- **Dual-running validation**: Run old + new side-by-side
- **Feature parity check**: Ensure nothing breaks
- **Rollback plan**: Safety net if migration fails

**How to use:**
1. Run: "SDLC: Legacy Modernization"
2. Input: "Migrate this Node.js 12 / Express 3 API to Node.js 20 / Express 5"
3. The swarm will:
   - Analyze legacy codebase
   - Identify breaking changes in target stack
   - Create characterization tests (lock current behavior)
   - Plan incremental migration
   - Modernize code in safe steps
   - Validate feature parity at each step
   - Provide rollback plan for each stage
4. Review migration plan and execute incrementally

**Outputs:**
- `legacy_analysis.md` - Current tech stack and risks
- `target_architecture.md` - Modern design
- `migration_plan.md` - Incremental steps (weeks/months)
- `characterization_tests/` - Tests locking current behavior
- `modernized_codebase/` - Updated code
- `rollback_plan.md` - How to revert if needed
- `feature_parity_validation.md` - Proof nothing broke

**Example scenario:**
```
Legacy System:
- Node.js 12 (EOL), Express 3
- JavaScript (no TypeScript)
- Callback-based (no async/await)
- MongoDB 3.x driver
- No tests

Target System:
- Node.js 20 LTS, Express 5
- TypeScript
- Async/await
- MongoDB 6.x driver
- 70%+ test coverage

Incremental Migration Plan (12 weeks):

Phase 1: Add safety net (3 weeks)
- Create characterization tests for all endpoints
- Set up TypeScript compilation
- Run old code through TS compiler

Phase 2: Incremental TypeScript migration (4 weeks)
- Convert models to TypeScript (week 1)
- Convert controllers to TypeScript (week 2)
- Convert routes to TypeScript (week 3)
- Convert utils to TypeScript (week 4)

Phase 3: Update dependencies (2 weeks)
- Update Express 3 → 5 (week 1)
- Update MongoDB driver (week 2)

Phase 4: Modernize patterns (3 weeks)
- Convert callbacks → async/await (week 1)
- Add error handling middleware (week 2)
- Add input validation (week 3)

Each week:
- Dual-run old + new code
- Validate feature parity
- If tests fail: rollback and fix
- If tests pass: continue migration

Result: Fully modernized codebase in 12 weeks
```

---

## Workflow 5: Refactor Code (Already Existing)

**When to use:**
- Code smells detected (long methods, duplication)
- Complexity too high (hard to maintain)
- Performance issues (slow functions)
- Preparing for new features (clean up first)

**How to use:**
1. Run: "SDLC: Refactor Code"
2. Input: "Refactor order processing module - too complex"
3. The swarm will:
   - Analyze code smells and complexity
   - Generate comprehensive tests first (safety net)
   - Propose refactoring approaches
   - Apply refactorings incrementally
   - Validate tests still pass after each change
   - Ensure no behavior changes
4. Review refactored code with metrics

See [refactor-agent skill](../.agents/skills/refactor-agent/skill.md) for details.

---

## Choosing the Right Workflow

| Situation | Recommended Workflow |
|-----------|---------------------|
| "I just inherited this codebase" | **Assess Existing Project** |
| "Planning technical improvements" | **Technical Debt Audit** |
| "MVP works, need production-ready" | **Incremental Improvement** |
| "Update from old framework" | **Legacy Modernization** |
| "Code is messy, hard to maintain" | **Refactor Code** |
| "Quarterly health check" | **Assess Existing Project** |
| "Justify investment to management" | **Technical Debt Audit** |

---

## Best Practices

### 1. Start with Assessment
Always run "Assess Existing Project" first to:
- Get baseline metrics
- Understand current state
- Prioritize improvements

### 2. Incremental Over Rewrite
Use incremental workflows (not "big bang" rewrites):
- Lower risk
- Continuous delivery
- Rollback at any point

### 3. Tests First
Before refactoring or modernizing:
- Add characterization tests
- Lock current behavior
- Refactor with confidence

### 4. Measure Before/After
Track metrics:
- Test coverage (%)
- Code complexity (cyclomatic)
- Security vulnerabilities (count)
- Performance (latency, throughput)
- Productivity (velocity, bug rate)

### 5. Autonomous Decisions
The swarm makes tactical decisions automatically:
- Which refactorings to apply
- Which tests to add
- Which dependencies to update
- You're only prompted for approvals (prod deploy, security)

---

## Common Scenarios

### Scenario 1: Inherited Legacy Code
```
1. Run: "SDLC: Assess Existing Project"
   - Get health score (e.g., 42/100)
   - Review improvement roadmap

2. Run: "SDLC: Technical Debt Audit"
   - Prioritize debt by ROI
   - Plan debt reduction sprint

3. Run: "SDLC: Incremental Improvement"
   - Add tests (42% → 70% coverage)
   - Fix security issues
   - Add CI/CD

4. Run: "SDLC: Legacy Modernization" (if old stack)
   - Migrate to modern framework
   - Update dependencies
   - Validate feature parity
```

### Scenario 2: Halfway Project (50% Complete)
```
1. Run: "SDLC: Assess Existing Project"
   - Understand current state

2. Document what exists:
   - Run: "SDLC: Plan to PRD" (reverse-engineer specs)
   - Or: "SDLC: Architecture Review"

3. Run: "SDLC: Incremental Improvement"
   - Add missing tests
   - Improve code quality
   - Make production-ready

4. Continue greenfield workflows:
   - Add new features with "SDLC: Build Feature"
   - Deploy with "SDLC: Release Readiness"
```

### Scenario 3: Quarterly Maintenance
```
1. Run: "SDLC: Assess Existing Project"
   - Quarterly health check
   - Track trends (improving or degrading?)

2. Run: "SDLC: Technical Debt Audit"
   - Update debt register
   - Plan next debt reduction sprint

3. Run: "SDLC: Refactor Code" (for problem areas)
   - Address high-complexity modules
   - Fix code smells

4. Monitor metrics:
   - Test coverage trend
   - Velocity trend
   - Bug rate trend
```

---

## Evidence & Traceability

All brownfield workflows produce evidence:
- **Health reports**: `.sdlc/.agents/user_memory/project_health.md`
- **Debt registers**: `.sdlc/.agents/user_memory/debt_register.md`
- **Migration plans**: `.sdlc/.agents/user_memory/migration_plan.md`
- **Decisions log**: `.sdlc/.agents/user_memory/decisions_log.md`

Every decision is logged automatically. You know:
- What was analyzed
- What was changed
- Why it was changed
- What risks were considered
- What trade-offs were made

---

## Next Steps

1. **Try the assessment workflow:**
   ```
   Open existing project → "SDLC: Assess Existing Project"
   ```

2. **Review the health report:**
   ```
   .sdlc/.agents/user_memory/project_health.md
   ```

3. **Pick an improvement workflow:**
   - Debt audit
   - Incremental improvement
   - Legacy modernization
   - Refactoring

4. **Iterate:**
   - Assess → Improve → Measure
   - Track metrics over time
   - Celebrate wins!

---

**Questions?** See [adoption/team_onboarding.md](../adoption/team_onboarding.md) or open an issue.
