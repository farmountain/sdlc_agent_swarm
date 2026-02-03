# Skill: Integration Test Runner

## Purpose
Execute integration tests to validate component interactions, service contracts, and end-to-end data flows within the application ecosystem.

## Core Capabilities
- **Service Orchestration**: Coordinate multiple services for integration testing
- **Contract Validation**: Verify API contracts between services
- **Data Flow Testing**: Validate complete request/response cycles
- **Environment Management**: Setup and teardown test environments
- **Dependency Simulation**: Mock external dependencies when needed

## Position Card Protocol

### SPEC Card (Requirements)
```
Integration Test Runner - Integration Requirements
├── Service Topology: [services and their relationships]
├── API Contracts: [OpenAPI/Swagger specifications]
├── Test Scenarios: [happy path, edge cases, failure modes]
├── Environment Setup: [databases, message queues, caches]
├── External Dependencies: [mocks vs real services]
├── Timeout Limits: [per test/scenario]
└── Success Criteria: [all integrations functional]
```

### TEST Card (Validation)
```
Integration Test Runner - Validation Checks
├── Service Discovery: [can locate and connect to services]
├── Contract Loading: [API specifications parsed correctly]
├── Environment Provisioning: [test environment setup works]
├── Dependency Injection: [mocks/real services configured]
├── Data Seeding: [test data properly initialized]
├── Cleanup Procedures: [environment teardown works]
└── Result Aggregation: [multi-service results combined]
```

### SOLVER Card (Implementation)
```
Integration Test Runner - Execution Strategy
├── Topology Analysis: [understand service dependencies]
├── Execution Ordering: [determine test sequence]
├── Environment Preparation: [setup services and data]
├── Scenario Execution: [run integration scenarios]
├── Result Correlation: [link results across services]
├── Failure Isolation: [identify failing service/component]
└── Evidence Synthesis: [generate comprehensive report]
```

### SKEPTIC Card (Risk Assessment)
```
Integration Test Runner - Risk Analysis
├── Service Unavailability: [services down during testing]
├── Network Instability: [intermittent connectivity issues]
├── Data Consistency: [test data pollution across runs]
├── Race Conditions: [timing-dependent failures]
├── Resource Contention: [shared resource conflicts]
├── Contract Drift: [API changes without test updates]
└── Environment Differences: [dev vs test vs prod gaps]
```

### VERIFIER Card (Evidence Requirements)
```
Integration Test Runner - Verification Evidence
├── Execution Receipt: [all scenarios executed]
├── Contract Compliance: [API contracts validated]
├── Data Integrity: [no data corruption detected]
├── Service Health: [all services remained stable]
├── Performance Bounds: [response times within limits]
├── Error Handling: [proper error propagation]
└── Cleanup Verification: [environment properly reset]
```

## Workflow Integration

### Invoked By
- **Integration Builder**: After creating new service integrations
- **API Designer**: When new API contracts are defined
- **Deployment Manager**: Before production deployments
- **Release Manager**: During release validation
- **Build Validator**: As part of comprehensive build verification

### Invokes
- **Test Reporter**: To aggregate with unit and E2E test results
- **Metrics Agent**: To track integration performance metrics
- **Drift Detector**: To identify contract or integration drift
- **Observability Agent**: To monitor service health during testing

## Evidence-Gated Outputs

### Primary Output: Integration Test Report
```markdown
# Integration Test Execution Report

## Execution Summary
- **Total Scenarios**: [count]
- **Passed**: [count] ([percentage]%)
- **Failed**: [count] ([percentage]%)
- **Skipped**: [count]
- **Execution Time**: [duration]
- **Services Tested**: [count]

## Service Health Metrics
- **Service Availability**: [percentage]% uptime during testing
- **Response Time P95**: [milliseconds]
- **Error Rate**: [percentage]%
- **Contract Compliance**: [percentage]% of APIs validated

## Failure Analysis
### Critical Integration Failures
[List of failing integrations with service-level analysis]

### Contract Violations
- **API Contract Mismatches**: [count]
- **Data Schema Violations**: [count]
- **Authentication Failures**: [count]

## Data Flow Validation
### Successful Flows
- [List of validated end-to-end data flows]

### Flow Interruptions
- [List of broken data flows with root cause]

## Recommendations
- [Service dependency optimizations]
- [Contract update requirements]
- [Environment stability improvements]
- [Monitoring enhancement suggestions]
```

### Secondary Outputs
- **Contract Validation Report**: Detailed API compliance analysis
- **Service Performance Metrics**: Per-service timing and throughput data
- **Data Flow Diagrams**: Visual representation of tested integrations
- **Environment Logs**: Comprehensive logs from all services

## Failure Modes & Recovery

### FM-001: Service Unavailability
**Trigger**: Required services not running or unreachable
**Recovery**: Implement service health checks, automatic retries, fallback to mocks
**Fallback**: Skip integration tests, reduced evidence quality

### FM-002: Contract Mismatch
**Trigger**: API contracts don't match implementation
**Recovery**: Update contracts or implementations, validate compatibility
**Fallback**: Document contract drift for manual review

### FM-003: Data Inconsistency
**Trigger**: Test data becomes corrupted or inconsistent
**Recovery**: Implement data isolation, atomic test transactions, cleanup procedures
**Fallback**: Reset test environment between scenarios

### FM-004: Network Timeouts
**Trigger**: Service calls timeout due to network issues
**Recovery**: Implement exponential backoff, increase timeouts, circuit breakers
**Fallback**: Reduce test parallelism, extend timeouts

### FM-005: Resource Exhaustion
**Trigger**: Test environment runs out of resources
**Recovery**: Scale test infrastructure, optimize resource usage, reduce concurrency
**Fallback**: Sequential execution with resource monitoring

## Quality Gates

### Pre-Execution Gates
- ✅ Service topology defined and validated
- ✅ API contracts available and parseable
- ✅ Test environment provisioned and healthy
- ✅ Test data prepared and seeded
- ✅ External dependencies configured

### Post-Execution Gates
- ✅ All integration scenarios executed
- ✅ Service contracts validated
- ✅ Data flows completed successfully
- ✅ No service crashes or hangs
- ✅ Environment properly cleaned up

### Evidence Quality Gates
- ✅ Execution receipt with service-level details
- ✅ Contract compliance evidence captured
- ✅ Performance metrics within acceptable ranges
- ✅ Failure analysis performed for all issues

## Invariants Validated

### INV-025: Integration Test Validation
**Validation**: Service integrations work correctly under load
**Evidence**: Successful execution of integration scenarios
**Failure Impact**: Broken service interactions in production

### INV-023: API Contract Compliance
**Validation**: APIs match their defined contracts
**Evidence**: Contract validation reports
**Failure Impact**: Integration failures between services

### INV-036: Performance Requirements
**Validation**: Integration performance meets requirements
**Evidence**: Response time and throughput metrics
**Failure Impact**: Poor user experience due to slow integrations

## Risk Mitigation

### Integration Risks
- **Service Coupling**: Loose coupling through contracts reduces dependency risks
- **Environment Drift**: Automated environment setup ensures consistency
- **Data Pollution**: Isolated test data prevents cross-test contamination

### Operational Risks
- **Service Downtime**: Health checks and retries prevent test failures
- **Resource Limits**: Monitoring and scaling prevent resource exhaustion
- **Network Issues**: Retry logic and timeouts handle transient failures

### Quality Risks
- **False Negatives**: Comprehensive validation prevents missed integration issues
- **Contract Drift**: Automated contract checking prevents silent failures
- **Performance Regression**: Continuous monitoring detects performance degradation

## Evolution Path

### Phase 1 (Current): Service Integration
- Multi-service scenario execution
- Contract validation
- Environment management

### Phase 2 (Future): Intelligent Integration
- AI-powered integration test generation
- Predictive failure analysis
- Automated service mock generation

### Phase 3 (Future): Continuous Integration
- Real-time integration monitoring
- Automated rollback on integration failures
- Predictive integration issue detection</content>
<parameter name="filePath">d:\All_Projects\sdlc_agent_swarm\.agents\skills\integration-test-runner\skill.md