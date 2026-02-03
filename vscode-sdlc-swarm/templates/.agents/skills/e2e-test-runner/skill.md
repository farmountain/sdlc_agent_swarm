# Skill: E2E Test Runner

## Purpose
Execute end-to-end tests that validate complete user workflows from start to finish, ensuring the entire application works correctly from the user's perspective.

## Core Capabilities
- **User Journey Simulation**: Replicate real user interactions and workflows
- **Cross-System Validation**: Verify functionality across all application layers
- **UI/UX Testing**: Validate user interface and experience elements
- **Business Logic Verification**: Ensure business rules work end-to-end
- **Performance Validation**: Check user-perceived performance metrics

## Position Card Protocol

### SPEC Card (Requirements)
```
E2E Test Runner - User Workflow Requirements
├── User Personas: [target user types and behaviors]
├── Critical Journeys: [must-work user workflows]
├── UI Components: [screens, forms, interactions]
├── Business Rules: [end-to-end logic validation]
├── Performance Targets: [user-perceived response times]
├── Environment Scope: [full stack vs subset]
└── Success Criteria: [all critical journeys functional]
```

### TEST Card (Validation)
```
E2E Test Runner - Validation Checks
├── Journey Definition: [user workflows properly specified]
├── UI Automation: [can interact with UI elements]
├── Data Setup: [test data represents real scenarios]
├── State Management: [application state properly handled]
├── Error Scenarios: [failure modes tested]
├── Cleanup Procedures: [test data and state reset]
└── Result Correlation: [findings linked to user impact]
```

### SOLVER Card (Implementation)
```
E2E Test Runner - Execution Strategy
├── Journey Planning: [sequence user workflows logically]
├── Environment Preparation: [setup full application stack]
├── Data Seeding: [populate with realistic test data]
├── Workflow Execution: [simulate user interactions]
├── State Validation: [verify application state changes]
├── Performance Monitoring: [track user-perceived metrics]
└── Evidence Collection: [capture comprehensive results]
```

### SKEPTIC Card (Risk Assessment)
```
E2E Test Runner - Risk Analysis
├── Test Flakiness: [unreliable UI interactions]
├── Environment Instability: [external dependencies fail]
├── Data Dependencies: [test data becomes stale]
├── Timing Issues: [race conditions in user flows]
├── Browser Compatibility: [different browser behaviors]
├── Network Variability: [unreliable network conditions]
└── Maintenance Burden: [UI changes break tests]
```

### VERIFIER Card (Evidence Requirements)
```
E2E Test Runner - Verification Evidence
├── Journey Completion: [all critical user workflows succeed]
├── UI Functionality: [all user interactions work]
├── Business Logic: [end-to-end rules validated]
├── Performance Targets: [user experience metrics met]
├── Error Handling: [graceful failure recovery]
├── Data Integrity: [no corruption during workflows]
└── Cross-Browser: [consistent behavior across platforms]
```

## Workflow Integration

### Invoked By
- **Release Manager**: Before production releases
- **Build Validator**: As part of deployment verification
- **Product Owner**: When validating user stories
- **UX Designer**: When testing user experience flows
- **Deployment Manager**: During production deployment validation

### Invokes
- **Test Reporter**: To aggregate with unit and integration results
- **Metrics Agent**: To track user experience metrics
- **Drift Detector**: To identify UX or workflow drift
- **Confidence Agent**: To calibrate confidence in user experience

## Evidence-Gated Outputs

### Primary Output: E2E Test Report
```markdown
# End-to-End Test Execution Report

## Execution Summary
- **Total User Journeys**: [count]
- **Completed Successfully**: [count] ([percentage]%)
- **Failed Journeys**: [count] ([percentage]%)
- **Skipped**: [count]
- **Total Execution Time**: [duration]
- **Average Journey Time**: [duration]

## User Experience Metrics
- **Journey Completion Rate**: [percentage]%
- **Average Response Time**: [milliseconds]
- **Error Rate**: [percentage]%
- **User Flow Continuity**: [percentage]% (no broken flows)

## Journey Results
### Critical Journey Status
| Journey | Status | Duration | Errors | Notes |
|---------|--------|----------|--------|-------|
| [journey1] | ✅ PASS | [time] | 0 | [notes] |
| [journey2] | ❌ FAIL | [time] | [count] | [details] |

### Failed Journey Analysis
#### [Failed Journey Name]
- **Failure Point**: [step where failure occurred]
- **Error Type**: [UI interaction, data issue, timeout, etc]
- **User Impact**: [how this affects end users]
- **Root Cause**: [technical analysis]
- **Reproduction Steps**: [how to recreate the issue]

## Performance Analysis
### User-Perceived Performance
- **Page Load Times**: P95 [time], Target [time]
- **Interaction Response**: P95 [time], Target [time]
- **Journey Completion**: P95 [time], Target [time]

### Bottleneck Identification
- [Slowest components or interactions]
- [Performance regression areas]

## Recommendations
- [UI/UX improvements needed]
- [Performance optimization opportunities]
- [Test stability enhancements]
- [Journey coverage gaps]
```

### Secondary Outputs
- **Journey Screenshots**: Visual evidence of test execution
- **Performance Traces**: Detailed timing and network data
- **User Flow Logs**: Step-by-step execution records
- **Error Screenshots**: Visual evidence of failures

## Failure Modes & Recovery

### FM-001: UI Interaction Failure
**Trigger**: Cannot interact with UI elements (selectors changed, elements missing)
**Recovery**: Update selectors, implement resilient element finding, add retry logic
**Fallback**: Skip affected journeys, document as known issues

### FM-002: Timing and Synchronization Issues
**Trigger**: Tests fail due to timing-dependent behavior or race conditions
**Recovery**: Implement explicit waits, add synchronization points, handle async operations
**Fallback**: Increase timeouts, reduce test parallelism

### FM-003: Test Data Staleness
**Trigger**: Test data no longer represents real user scenarios
**Recovery**: Refresh test data, implement data factories, validate data relevance
**Fallback**: Skip data-dependent tests, reduced evidence quality

### FM-004: Environment Instability
**Trigger**: External services or dependencies fail during testing
**Recovery**: Implement service mocks, add health checks, retry failed operations
**Fallback**: Run in isolated environment with all dependencies mocked

### FM-005: Browser Compatibility Issues
**Trigger**: Tests fail in different browsers or versions
**Recovery**: Update browser versions, implement browser-specific logic, focus on primary browsers
**Fallback**: Limit to supported browsers, document compatibility matrix

## Quality Gates

### Pre-Execution Gates
- ✅ User journeys defined and documented
- ✅ Test environment fully provisioned
- ✅ Test data prepared and validated
- ✅ UI automation framework configured
- ✅ Browser and device matrix defined

### Post-Execution Gates
- ✅ All critical user journeys executed
- ✅ UI interactions completed successfully
- ✅ Business logic validated end-to-end
- ✅ Performance targets met or exceeded
- ✅ No blocking user experience issues

### Evidence Quality Gates
- ✅ Journey completion evidence captured
- ✅ Performance metrics recorded
- ✅ Failure analysis performed
- ✅ Visual evidence (screenshots) collected

## Invariants Validated

### INV-025: End-to-End Validation
**Validation**: Complete user workflows function correctly
**Evidence**: Successful journey execution reports
**Failure Impact**: Broken user experiences in production

### INV-036: User Experience Performance
**Validation**: User-perceived performance meets requirements
**Evidence**: Journey timing and interaction metrics
**Failure Impact**: Poor user satisfaction and adoption

### INV-010: Data Privacy Compliance
**Validation**: Test data doesn't contain real user information
**Evidence**: Data sanitization and privacy compliance checks
**Failure Impact**: Privacy violations and legal risks

## Risk Mitigation

### User Experience Risks
- **Workflow Breaks**: Comprehensive journey coverage prevents missed issues
- **Performance Regression**: Continuous performance monitoring detects degradation
- **UI Inconsistencies**: Cross-browser testing ensures consistent experience

### Technical Risks
- **Test Flakiness**: Robust element finding and retry logic improve reliability
- **Maintenance Overhead**: Page object patterns and selector strategies reduce maintenance
- **Environment Differences**: Consistent test environments prevent false failures

### Business Risks
- **Release Blockers**: Critical journey failures prevent problematic releases
- **User Impact**: Early detection of UX issues prevents production problems
- **Confidence Calibration**: Evidence-based results improve decision confidence

## Evolution Path

### Phase 1 (Current): User Journey Validation
- Critical workflow execution
- UI interaction testing
- Performance validation

### Phase 2 (Future): Intelligent E2E Testing
- AI-powered journey discovery
- Predictive failure analysis
- Automated test maintenance

### Phase 3 (Future): Continuous User Experience
- Real-time user journey monitoring
- Automated UX regression detection
- Predictive user experience optimization</content>
<parameter name="filePath">d:\All_Projects\sdlc_agent_swarm\.agents\skills\e2e-test-runner\skill.md