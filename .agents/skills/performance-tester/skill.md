# Skill: Performance Tester

## Purpose
Execute performance tests to validate application scalability, response times, and resource utilization under various load conditions.

## Core Capabilities
- **Load Testing**: Simulate user traffic at scale
- **Stress Testing**: Push systems beyond normal operating conditions
- **Scalability Validation**: Verify performance as load increases
- **Resource Monitoring**: Track CPU, memory, network, and disk usage
- **Bottleneck Identification**: Pinpoint performance constraints

## Position Card Protocol

### SPEC Card (Requirements)
```
Performance Tester - Performance Requirements
├── Load Profiles: [user count, request patterns, duration]
├── Performance Targets: [response time, throughput, error rate]
├── System Resources: [CPU, memory, network, storage limits]
├── Test Scenarios: [peak load, sustained load, spike testing]
├── Monitoring Scope: [application, infrastructure, dependencies]
├── Success Criteria: [targets met under specified conditions]
└── Failure Thresholds: [when to stop testing]
```

### TEST Card (Validation)
```
Performance Tester - Validation Checks
├── Load Generation: [can simulate required user load]
├── Monitoring Setup: [metrics collection configured]
├── Resource Limits: [test environment capacity validated]
├── Scenario Definition: [load patterns properly specified]
├── Result Collection: [metrics captured accurately]
├── Environment Isolation: [no impact on other systems]
└── Safety Controls: [automatic test termination]
```

### SOLVER Card (Implementation)
```
Performance Tester - Execution Strategy
├── Load Modeling: [understand target user behavior]
├── Test Planning: [sequence load scenarios logically]
├── Environment Scaling: [ensure adequate test resources]
├── Monitoring Deployment: [setup comprehensive metrics]
├── Scenario Execution: [run performance test scenarios]
├── Result Analysis: [identify bottlenecks and limits]
└── Report Generation: [create actionable insights]
```

### SKEPTIC Card (Risk Assessment)
```
Performance Tester - Risk Analysis
├── Resource Exhaustion: [test environment overwhelmed]
├── Production Impact: [testing affects live systems]
├── Cost Overruns: [expensive test infrastructure]
├── False Results: [inaccurate load simulation]
├── Environment Differences: [test vs production gaps]
├── Test Interference: [performance tests affect each other]
└── Maintenance Complexity: [complex test script upkeep]
```

### VERIFIER Card (Evidence Requirements)
```
Performance Tester - Verification Evidence
├── Load Achievement: [required user load successfully generated]
├── Target Validation: [performance targets met or exceeded]
├── Resource Monitoring: [system resources tracked]
├── Bottleneck Analysis: [performance constraints identified]
├── Scalability Proof: [performance under increasing load]
├── Stability Evidence: [system remained stable under load]
└── Recommendations: [actionable performance improvements]
```

## Workflow Integration

### Invoked By
- **NFR Agent**: When validating non-functional requirements
- **Release Manager**: Before performance-sensitive releases
- **DevOps Platform**: During infrastructure scaling decisions
- **Cost Estimator**: When evaluating cloud resource needs
- **Build Validator**: As part of comprehensive quality gates

### Invokes
- **Observability Agent**: To enhance monitoring during testing
- **Metrics Agent**: To track performance metrics over time
- **Drift Detector**: To identify performance regression
- **Confidence Agent**: To calibrate confidence in performance claims

## Evidence-Gated Outputs

### Primary Output: Performance Test Report
```markdown
# Performance Test Execution Report

## Test Configuration
- **Test Type**: [load/stress/scalability/volume/spike]
- **Duration**: [total test time]
- **Load Profile**: [user count, ramp-up pattern, sustained period]
- **Target System**: [application version, environment details]

## Performance Results
### Response Time Metrics
- **Average Response Time**: [milliseconds]
- **95th Percentile**: [milliseconds] (Target: [threshold])
- **99th Percentile**: [milliseconds] (Target: [threshold])
- **Maximum Response Time**: [milliseconds]

### Throughput Metrics
- **Requests per Second**: [count] (Target: [threshold])
- **Successful Requests**: [percentage]% (Target: [threshold]%)
- **Error Rate**: [percentage]% (Target: < [threshold]%)

### Resource Utilization
- **CPU Usage**: Average [percentage]%, Peak [percentage]%
- **Memory Usage**: Average [percentage]%, Peak [percentage]%
- **Network I/O**: [Mbps] sent, [Mbps] received
- **Disk I/O**: [IOPS] read, [IOPS] write

## Scalability Analysis
### Load Progression Results
| Concurrent Users | Response Time (P95) | Throughput (RPS) | Error Rate | CPU % | Memory % |
|------------------|---------------------|------------------|------------|-------|----------|
| [count] | [time] | [count] | [rate] | [pct] | [pct] |

### Bottleneck Identification
- **Primary Bottleneck**: [component limiting performance]
- **Secondary Bottlenecks**: [additional constraints]
- **Resource Limits Hit**: [CPU/memory/network/disk thresholds]

## Failure Analysis
### Performance Degradation Points
- [Load levels where performance dropped significantly]
- [Components that failed under load]
- [Error patterns observed]

### Root Cause Analysis
- [Technical reasons for performance issues]
- [Infrastructure limitations identified]
- [Application bottlenecks found]

## Recommendations
### Immediate Actions
- [Critical performance fixes needed]
- [Infrastructure scaling requirements]
- [Configuration optimizations]

### Long-term Improvements
- [Architecture changes recommended]
- [Code optimization opportunities]
- [Monitoring enhancements needed]
```

### Secondary Outputs
- **Performance Graphs**: Visual charts of metrics over time
- **Load Profiles**: Detailed load generation patterns
- **Resource Monitoring Logs**: Comprehensive system metrics
- **Bottleneck Analysis Reports**: Detailed technical analysis

## Failure Modes & Recovery

### FM-001: Load Generation Failure
**Trigger**: Cannot achieve required user load or request rates
**Recovery**: Scale test infrastructure, optimize load generation, reduce load requirements
**Fallback**: Test at maximum achievable load with reduced evidence quality

### FM-002: Resource Exhaustion
**Trigger**: Test environment runs out of CPU, memory, or other resources
**Recovery**: Increase test infrastructure capacity, optimize test scenarios, implement resource monitoring
**Fallback**: Reduce test scope, monitor available resources only

### FM-003: Monitoring Gaps
**Trigger**: Cannot collect required performance metrics
**Recovery**: Enhance monitoring setup, add missing metric collection, validate monitoring tools
**Fallback**: Proceed with available metrics, note monitoring limitations

### FM-004: Test Environment Differences
**Trigger**: Test results don't reflect production performance
**Recovery**: Align test environment with production, document differences, adjust targets accordingly
**Fallback**: Qualify results with environment differences noted

### FM-005: Unstable Test Conditions
**Trigger**: External factors affect test results (network issues, competing load)
**Recovery**: Isolate test environment, implement result validation, run multiple test iterations
**Fallback**: Document test conditions, provide confidence intervals

## Quality Gates

### Pre-Execution Gates
- ✅ Load profiles defined and achievable
- ✅ Performance targets specified and measurable
- ✅ Test environment provisioned and validated
- ✅ Monitoring and metrics collection configured
- ✅ Safety controls and automatic termination implemented

### Post-Execution Gates
- ✅ Required load levels achieved and sustained
- ✅ Performance targets evaluated against results
- ✅ Resource utilization monitored and analyzed
- ✅ Bottlenecks identified and documented
- ✅ Results reproducible and consistent

### Evidence Quality Gates
- ✅ Performance metrics captured comprehensively
- ✅ Load conditions documented accurately
- ✅ Analysis performed with technical depth
- ✅ Recommendations actionable and prioritized

## Invariants Validated

### INV-036: Performance Requirements
**Validation**: Application performance meets defined targets
**Evidence**: Performance test results against requirements
**Failure Impact**: Poor user experience and scalability issues

### INV-037: Resource Efficiency
**Validation**: Application uses resources efficiently under load
**Evidence**: Resource utilization metrics within acceptable ranges
**Failure Impact**: Excessive infrastructure costs or poor scalability

### INV-038: Scalability Validation
**Validation**: Application scales appropriately with load
**Evidence**: Performance maintained as load increases
**Failure Impact**: Inability to handle user growth

## Risk Mitigation

### Performance Risks
- **Unrealistic Testing**: Representative load profiles prevent false confidence
- **Environment Gaps**: Production-like test environments ensure result validity
- **Monitoring Blind Spots**: Comprehensive metrics prevent undetected issues

### Operational Risks
- **Resource Overload**: Safety controls prevent test environment damage
- **Cost Control**: Efficient test execution prevents budget overruns
- **Result Accuracy**: Multiple test runs and statistical analysis improve confidence

### Business Risks
- **Performance Regression**: Continuous testing prevents unnoticed degradation
- **Scalability Limits**: Early bottleneck detection enables proactive scaling
- **User Impact**: Performance validation prevents production issues

## Evolution Path

### Phase 1 (Current): Load and Performance Testing
- Load generation and monitoring
- Performance target validation
- Bottleneck identification

### Phase 2 (Future): Intelligent Performance Testing
- AI-powered load pattern generation
- Predictive bottleneck analysis
- Automated performance optimization

### Phase 3 (Future): Continuous Performance
- Real-time performance monitoring
- Automated scaling recommendations
- Predictive performance issue detection</content>
<parameter name="filePath">d:\All_Projects\sdlc_agent_swarm\.agents\skills\performance-tester\skill.md