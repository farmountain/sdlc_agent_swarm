# Implementation Runbook

## Purpose
Guide the Driver Agent through end-to-end feature implementation: from PRD/specification to working, tested code.

## When to Use This Runbook
- User requests "Build Feature"
- User requests "Generate Code" with full specifications
- User requests "Multi-language Project" (e.g., TypeScript + Rust browser)
- Following a PRD that requires code implementation

## Implementation Workflows

### Workflow 1: BUILD_FEATURE (End-to-End Feature Implementation)

**Trigger**: User says "build feature X" or "implement feature Y"

**Phases**:

#### Phase 1: Specification Review (MANDATORY)
**Actors**: Driver, Spec Agent

1. **Load or create specification**
   - If PRD exists: Load from `.agents/memory/evidence_*.md`
   - If missing: Invoke `plan_to_prd` workflow first
   
2. **Extract implementation requirements**
   - Functional requirements (what to build)
   - Non-functional requirements (performance, security)
   - Technology stack (languages, frameworks)
   - Acceptance criteria

3. **Identify components**
   - List all classes/modules/files to create
   - Map dependencies between components
   - Determine data models

**Output**: Implementation Plan document

#### Phase 2: Test Specification (TDD Approach)
**Actors**: Test Generator, Language Experts

1. **Generate test specifications**
   - Unit tests for each component
   - Integration tests for component interactions
   - E2E tests for user flows
   
2. **Define expected behavior**
   - Input/output examples
   - Edge cases
   - Error conditions

3. **Language expert review**
   - Verify test patterns are idiomatic
   - Check test framework choices
   - Validate test data strategies

**Output**: Complete test files (failing tests)

#### Phase 3: Code Generation (Iterative)
**Actors**: Code Generator, Language Experts, Skeptic

**For each component:**

1. **Generate interface/types first**
   ```yaml
   code_generator:
     input: component_spec
     output: interfaces, types, signatures
   ```

2. **Language expert review**
   - Verify types are correct
   - Check for idioms
   - Suggest improvements

3. **Implement core logic**
   ```yaml
   code_generator:
     input: interfaces + tests
     output: implementation
   ```

4. **Skeptic review**
   - Challenge design decisions
   - Identify edge cases
   - Check error handling
   - Question complexity

5. **Refine implementation**
   - Address Skeptic concerns
   - Optimize based on feedback

**Output**: Working code for all components

#### Phase 4: Integration & Build Validation
**Actors**: Build Validator, Integration Builder

1. **Compile/build all code**
   ```bash
   # TypeScript
   tsc --noEmit
   
   # Rust
   cargo build
   
   # Python
   mypy src/
   ```

2. **Run all tests**
   ```bash
   # Unit tests
   npm test
   cargo test
   pytest tests/unit
   
   # Integration tests
   npm run test:integration
   cargo test --test '*'
   pytest tests/integration
   ```

3. **Check coverage**
   - Ensure meets targets (80%+ for critical paths)

4. **Integration validation**
   - Verify components work together
   - Test API contracts
   - Validate data flow

**Output**: Build passes, tests green

#### Phase 5: Verification & Evidence
**Actors**: Verifier, Memory Agent

1. **Verifier checklist**
   - [ ] All requirements implemented
   - [ ] All tests passing
   - [ ] No critical security issues
   - [ ] Code quality standards met
   - [ ] Documentation complete

2. **Generate evidence**
   ```markdown
   ## Implementation Evidence
   
   **Feature**: [Name]
   **Status**: ✅ Complete
   **Components**: [List]
   **Test Coverage**: 92%
   **Build**: ✅ Passing
   
   ### Requirements Traceability
   - REQ-001: Implemented in [file]
   - REQ-002: Implemented in [file]
   
   ### Files Created
   - src/feature/UserService.ts (234 lines)
   - src/feature/UserRepository.ts (156 lines)
   - tests/UserService.test.ts (89 lines)
   ```

3. **Memory agent write**
   - Store evidence in ledger
   - Update world model
   - Log decisions made

**Output**: Verification receipt, evidence log entry

---

### Workflow 2: MULTI_LANGUAGE_PROJECT (Complex Multi-Language Systems)

**Trigger**: User says "create TypeScript + Rust + Python system"

**Example**: "Create an AI-driven browser using JavaScript/TypeScript and Rust"

**Phases**:

#### Phase 1: Architecture Design (MANDATORY)
**Actors**: Driver, Backend Architect, All Language Experts

1. **Decompose into language-specific modules**
   ```yaml
   architecture:
     rust_components:
       - rendering_engine
       - memory_management
       - performance_critical_ops
     typescript_components:
       - ui_layer
       - extensions_api
       - developer_tools
     integration_points:
       - wasm_bridge (Rust ↔ TypeScript)
       - ipc_protocol
   ```

2. **Define interfaces between components**
   - API contracts (REST, gRPC, FFI, WASM)
   - Data formats (JSON, Protocol Buffers)
   - Error handling across boundaries

3. **Architect for the specific project**
   - **For browser**: Rendering engine (Rust) + UI/Extensions (TypeScript)
   - Define WebAssembly bindings
   - Plan JavaScript<->Rust communication

**Output**: Multi-language architecture diagram

#### Phase 2: Per-Language Component Development
**Actors**: Code Generator, Language Experts, Test Generator

**For each language track in parallel:**

1. **Rust Engine Components**
   ```yaml
   components:
     - HTML/CSS parser
     - Rendering engine
     - JavaScript engine integration
     - Networking layer
   language_expert: rust_expert
   tests: Rust unit + integration tests
   ```

2. **TypeScript UI Components**
   ```yaml
   components:
     - Browser UI (tabs, address bar)
     - Settings interface
     - Extensions API
     - Developer tools
   language_expert: typescript_expert
   tests: Jest unit tests + Playwright e2e
   ```

3. **Integration Layer**
   ```yaml
   components:
     - WASM bindings generator
     - TypeScript type definitions for Rust exports
     - IPC message protocol
   language_experts: [rust_expert, typescript_expert]
   ```

**Output**: Working components in each language

#### Phase 3: Cross-Language Integration
**Actors**: Integration Builder, Build Validator, All Language Experts

1. **Build integration layer**
   - Generate WASM bindings
   - Create TypeScript definitions
   - Implement communication protocol

2. **Integration tests**
   ```yaml
   tests:
     - TypeScript calls Rust rendering engine
     - Rust engine fires events to TypeScript
     - Data serialization/deserialization
     - Performance benchmarks
   ```

3. **Build system setup**
   ```yaml
   build_steps:
     - Compile Rust to WASM: cargo build --target wasm32-unknown-unknown
     - Generate bindings: wasm-bindgen
     - Build TypeScript: tsc
     - Package application: electron-builder
   ```

**Output**: Integrated, buildable system

#### Phase 4: End-to-End Validation
**Actors**: Build Validator, Verifier, Domain Experts

1. **Full system tests**
   - Load web page in browser
   - Verify rendering matches spec
   - Test JavaScript execution
   - Validate performance (FPS, memory)

2. **Cross-cutting concerns**
   - Security review (sandbox isolation)
   - Performance benchmarks
   - Memory leak detection

3. **Documentation**
   - Architecture docs
   - Build instructions
   - API documentation
   - Developer guide

**Output**: Working multi-language system

---

### Workflow 3: REFACTOR_CODE (Improve Existing Code)

**Trigger**: User says "refactor module X" or "optimize component Y"

**Phases**:

#### Phase 1: Analysis
**Actors**: Refactor Agent, Language Expert

1. **Read existing code**
2. **Identify issues**
   - Code smells
   - Performance bottlenecks
   - Maintainability concerns
   - Violation of best practices

3. **Generate test suite** (if missing)
   - Ensure behavior is locked in

#### Phase 2: Refactoring
**Actors**: Refactor Agent, Skeptic

1. **Apply refactorings**
   - Extract methods/functions
   - Rename for clarity
   - Simplify conditionals
   - Remove duplication

2. **Run tests after each change**
   - Ensure behavior preserved

3. **Skeptic review**
   - Challenge refactoring choices
   - Verify improvements are real

#### Phase 3: Validation
**Actors**: Build Validator, Verifier

1. **All tests still pass**
2. **No regressions**
3. **Metrics improved**
   - Cyclomatic complexity reduced
   - Code duplication reduced
   - Performance improved (if applicable)

**Output**: Improved code with same behavior

---

## Decision Points & Approval Gates

### When to Seek Human Approval

1. **Architecture decisions** (multi-language projects)
   - Before committing to language choices
   - Before major architectural patterns

2. **Security-sensitive code** (authentication, payments, PII)
   - After implementation, before deployment

3. **Major refactorings** (>500 lines changed)
   - Before starting refactoring

4. **Breaking API changes**
   - Before implementing

### When to Proceed Without Approval

1. **Internal implementation details**
2. **Non-breaking changes**
3. **Test-driven development** (tests define contract)
4. **Documentation updates**

---

## Error Recovery Protocols

### Build Fails
1. **Read error messages**
2. **Language expert analyzes**
3. **Code generator fixes**
4. **Retry build**
5. **If fails 3 times**: Escalate to human

### Tests Fail
1. **Identify failing test**
2. **Review test expectations vs. implementation**
3. **Determine if test or code is wrong**
4. **Fix and re-run**

### Integration Issues
1. **Isolate component causing issue**
2. **Test component independently**
3. **Fix component**
4. **Retry integration**

---

## Evidence Generation

### For Every Implementation

Generate and store:

```markdown
## Implementation Evidence: [Feature Name]

**Date**: [ISO timestamp]
**Workflow**: build_feature | multi_language_project | refactor_code
**Status**: ✅ Complete | ⚠️ Partial | ❌ Failed

### Components Delivered
- File: `src/UserService.ts` (234 lines, coverage: 95%)
- File: `src/UserRepository.ts` (156 lines, coverage: 92%)
- File: `tests/UserService.test.ts` (89 lines)

### Requirements Traceability
- REQ-001: User authentication → `UserService.authenticate()` (lines 45-67)
- REQ-002: Password hashing → `UserService.hashPassword()` (lines 120-135)

### Build Status
- ✅ Compilation: Success
- ✅ Unit Tests: 23/23 passing
- ✅ Integration Tests: 5/5 passing
- ✅ Coverage: 94% (target: 80%)

### Quality Metrics
- Cyclomatic Complexity: Avg 3.2 (good)
- Maintainability Index: 78 (acceptable)
- No critical security issues
- 0 high-priority linting violations

### Language Expert Signoffs
- ✅ TypeScript Expert: Code follows best practices
- ✅ Security IAM: No obvious vulnerabilities

### Known Limitations
- Does not handle rate limiting (out of scope)
- Assumes PostgreSQL database

### Next Steps
- [ ] Deploy to staging
- [ ] Integration with frontend UI
- [ ] Performance testing under load
```

---

## Success Criteria

For implementation to be considered "complete":

- [ ] All specified functionality implemented
- [ ] All tests passing (unit, integration, e2e)
- [ ] Build successful (no compilation errors)
- [ ] Code quality standards met (linting, formatting)
- [ ] Coverage targets met (80%+ critical paths)
- [ ] Security review passed (no critical issues)
- [ ] Documentation complete (README, API docs)
- [ ] Evidence generated and stored
- [ ] Verifier approval obtained
- [ ] Memory agent has written evidence

---

## Driver's Role

As Driver, you:

1. **Orchestrate the workflow** - call agents in correct order
2. **Make decisions** - which workflow to use, when to proceed
3. **Manage consensus** - balance Skeptic concerns with Solver confidence
4. **Ensure evidence** - verify all evidence is generated
5. **Escalate when needed** - request human approval for gates
6. **Maintain focus** - keep implementation aligned with requirements

You do NOT write code directly. You delegate to Code Generator.
