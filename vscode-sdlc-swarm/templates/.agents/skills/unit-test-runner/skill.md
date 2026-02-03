# Skill: Unit Test Runner

## Purpose
Execute unit tests across the codebase, track coverage metrics, and validate individual component functionality.

## Core Capabilities
- **Test Discovery**: Automatically find and categorize unit tests
- **Parallel Execution**: Run tests concurrently for faster feedback
- **Coverage Analysis**: Generate detailed coverage reports with line-by-line metrics
- **Failure Analysis**: Provide root cause analysis for test failures
- **Regression Detection**: Identify when previously passing tests start failing

## Position Card Protocol

### SPEC Card (Requirements)
```
Unit Test Runner - Test Execution Requirements
├── Test Framework: [jest/mocha/pytest/junit/etc]
├── Coverage Targets: [statement/branch/function/line]
├── Timeout Limits: [per test/suite]
├── Parallel Workers: [count]
├── Excluded Paths: [test helpers, mocks, etc]
├── Coverage Thresholds: [minimum % required]
└── Success Criteria: [all tests pass + coverage met]
```

### TEST Card (Validation)
```
Unit Test Runner - Validation Checks
├── Test Files Exist: [discovery mechanism works]
├── Framework Integration: [can execute chosen framework]
├── Coverage Tooling: [coverage reports generate]
├── Parallel Execution: [multiple workers supported]
├── Failure Handling: [graceful failure processing]
├── Timeout Enforcement: [tests killed after timeout]
└── Report Generation: [results properly formatted]
```

### SOLVER Card (Implementation)
```
Unit Test Runner - Execution Strategy
├── Discovery Phase: [find all test files]
├── Dependency Resolution: [ensure test dependencies installed]
├── Execution Planning: [determine parallel execution groups]
├── Coverage Instrumentation: [setup coverage collection]
├── Result Aggregation: [combine results from workers]
├── Failure Triaging: [categorize failure types]
└── Report Synthesis: [generate comprehensive report]
```

### SKEPTIC Card (Risk Assessment)
```
Unit Test Runner - Risk Analysis
├── False Positives: [tests pass but code broken]
├── Coverage Gaps: [untested critical paths]
├── Flaky Tests: [intermittent failures]
├── Performance Impact: [slow test execution]
├── Resource Exhaustion: [memory/CPU limits hit]
├── Integration Conflicts: [conflicts with other test types]
└── Maintenance Burden: [test maintenance overhead]
```

### VERIFIER Card (Evidence Requirements)
```
Unit Test Runner - Verification Evidence
├── Execution Receipt: [tests ran successfully]
├── Coverage Report: [meets minimum thresholds]
├── Failure Analysis: [root causes identified]
├── Performance Metrics: [execution time within limits]
├── Resource Usage: [memory/CPU within bounds]
├── Test Isolation: [no cross-contamination]
└── Reproducibility: [results consistent across runs]
```

## Workflow Integration

### Invoked By
- **Code Generator**: After generating new code components
- **Refactor Agent**: Before/after refactoring operations
- **Build Validator**: As part of build verification pipeline
- **Integration Builder**: When creating service integrations
- **Release Manager**: During release candidate validation

### Invokes
- **Test Reporter**: To aggregate results with other test types
- **Metrics Agent**: To track test execution metrics
- **Drift Detector**: To identify test coverage drift
- **Confidence Agent**: To calibrate confidence in code quality

## Evidence-Gated Outputs

### Primary Output: Test Execution Report
```markdown
# Unit Test Execution Report

## Execution Summary
- **Total Tests**: [count]
- **Passed**: [count] ([percentage]%)
- **Failed**: [count] ([percentage]%)
- **Skipped**: [count]
- **Execution Time**: [duration]
- **Parallel Workers**: [count]

## Coverage Metrics
- **Statement Coverage**: [percentage]% (target: [threshold]%)
- **Branch Coverage**: [percentage]% (target: [threshold]%)
- **Function Coverage**: [percentage]% (target: [threshold]%)
- **Line Coverage**: [percentage]% (target: [threshold]%)

## Failure Analysis
### Critical Failures
[List of failing tests with root cause analysis]

### Pattern Analysis
- **Most Common Failure Type**: [pattern]
- **Affected Components**: [list]
- **Potential Root Causes**: [analysis]

## Recommendations
- [Actionable improvements for test coverage]
- [Suggestions for flaky test fixes]
- [Performance optimization opportunities]
```

### Secondary Outputs
- **Coverage Report**: Detailed HTML/XML coverage reports
- **Test Results**: JUnit/XML formatted results for CI integration
- **Failure Logs**: Detailed logs for debugging failed tests
- **Performance Metrics**: Execution time analysis per test/component

## Failure Modes & Recovery

### FM-001: Test Discovery Failure
**Trigger**: Cannot find test files or test framework
**Recovery**: Validate test file naming conventions, check framework installation
**Fallback**: Manual test file specification

### FM-002: Coverage Tool Failure
**Trigger**: Coverage instrumentation fails or reports incomplete
**Recovery**: Verify coverage tool compatibility, check source map generation
**Fallback**: Execute tests without coverage (reduced evidence quality)

### FM-003: Resource Exhaustion
**Trigger**: Tests consume excessive memory/CPU or timeout
**Recovery**: Reduce parallel workers, increase timeouts, optimize test setup
**Fallback**: Sequential execution with extended timeouts

### FM-004: Flaky Test Detection
**Trigger**: Intermittent test failures across multiple runs
**Recovery**: Isolate flaky tests, implement retry logic, analyze race conditions
**Fallback**: Mark as known flakes with reduced confidence impact

### FM-005: Framework Incompatibility
**Trigger**: Test framework version conflicts or configuration issues
**Recovery**: Update framework, resolve dependency conflicts, validate configuration
**Fallback**: Framework-specific execution with limited features

## Quality Gates

### Pre-Execution Gates
- ✅ Test framework installed and configured
- ✅ Test files exist and are syntactically valid
- ✅ Dependencies resolved (no missing packages)
- ✅ Execution environment prepared (clean state)

### Post-Execution Gates
- ✅ All tests executed (no premature termination)
- ✅ Coverage thresholds met or exceeded
- ✅ No critical test failures blocking deployment
- ✅ Results properly formatted and stored

### Evidence Quality Gates
- ✅ Execution receipt generated with timestamps
- ✅ Coverage metrics captured and validated
- ✅ Failure analysis performed for all failures
- ✅ Results integrated with broader test reporting

## Invariants Validated

### INV-024: Test Coverage Requirements
**Validation**: Coverage metrics meet or exceed defined thresholds
**Evidence**: Coverage report with detailed metrics
**Failure Impact**: Reduced confidence in code quality

### INV-025: Integration Test Validation
**Validation**: Unit tests don't conflict with integration tests
**Evidence**: Clean execution without cross-contamination
**Failure Impact**: False positive/negative test results

### INV-026: Security Test Requirements
**Validation**: Unit tests include security-relevant test cases
**Evidence**: Test coverage of security-critical components
**Failure Impact**: Undetected security vulnerabilities

## Risk Mitigation

### Execution Risks
- **Test Pollution**: Isolated execution environments prevent cross-test contamination
- **Resource Limits**: Configurable timeouts and resource monitoring prevent hangs
- **Framework Drift**: Version pinning and compatibility checks prevent framework issues

### Quality Risks
- **Coverage Gaming**: Threshold enforcement prevents artificial coverage inflation
- **Test Maintenance**: Automated test discovery reduces manual maintenance burden
- **False Confidence**: Failure analysis prevents overconfidence in passing tests

### Performance Risks
- **Slow Execution**: Parallel execution and selective test running optimize performance
- **Scalability Limits**: Worker pool sizing prevents resource exhaustion
- **CI Integration**: Standardized output formats ensure seamless integration

## Evolution Path

### Phase 1 (Current): Basic Execution
- Framework-specific execution
- Coverage reporting
- Failure analysis

### Phase 2 (Future): Intelligent Testing
- AI-powered test generation for uncovered code
- Predictive failure analysis
- Automated flaky test detection and fixing

### Phase 3 (Future): Test-Driven Development
- Real-time test execution during coding
- Coverage-guided development suggestions
- Automated refactoring with test preservation</content>
<parameter name="filePath">d:\All_Projects\sdlc_agent_swarm\.agents\skills\unit-test-runner\skill.md