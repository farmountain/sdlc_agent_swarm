# Skill: Reliability Tester

## Purpose
Execute chaos engineering and reliability tests to validate system resilience, fault tolerance, and graceful degradation under failure conditions.

## Core Capabilities
- **Chaos Engineering**: Introduce controlled failures to test resilience
- **Fault Injection**: Simulate infrastructure and application failures
- **Recovery Validation**: Verify automatic recovery mechanisms
- **Graceful Degradation**: Test behavior when components fail
- **Stability Monitoring**: Track system behavior during chaos events

## Position Card Protocol

### SPEC Card (Requirements)
```
Reliability Tester - Resilience Requirements
├── Failure Scenarios: [infrastructure, application, network failures]
├── Recovery Targets: [MTTR, RTO, RPO requirements]
├── Degradation Modes: [acceptable behavior when components fail]
├── Monitoring Scope: [system health, user impact, recovery metrics]
├── Test Boundaries: [what can/cannot be disrupted]
├── Success Criteria: [system remains operational under chaos]
└── Safety Controls: [when to stop chaos testing]
```

### TEST Card (Validation)
```
Reliability Tester - Validation Checks
├── Failure Injection: [can simulate required failure types]
├── Recovery Monitoring: [recovery mechanisms observable]
├── Safety Boundaries: [chaos contained within test scope]
├── Health Monitoring: [system state tracked during chaos]
├── Degradation Detection: [graceful degradation validated]
├── Result Correlation: [failures linked to system impact]
└── Cleanup Procedures: [system restored after testing]
```

### SOLVER Card (Implementation)
```
Reliability Tester - Execution Strategy
├── Failure Planning: [design chaos experiments safely]
├── Impact Assessment: [predict failure consequences]
├── Monitoring Deployment: [setup comprehensive observability]
├── Experiment Execution: [introduce failures systematically]
├── Recovery Validation: [verify automatic healing]
├── Impact Analysis: [measure user and system impact]
└── Learning Synthesis: [extract reliability insights]
```

### SKEPTIC Card (Risk Assessment)
```
Reliability Tester - Risk Analysis
├── Uncontrolled Chaos: [failures escape test boundaries]
├── Production Impact: [chaos affects live systems]
├── Incomplete Recovery: [system left in broken state]
├── False Confidence: [tests don't reflect real failures]
├── Resource Damage: [infrastructure harmed by chaos]
├── Team Disruption: [alerts and notifications during testing]
└── Maintenance Burden: [complex chaos script upkeep]
```

### VERIFIER Card (Evidence Requirements)
```
Reliability Tester - Verification Evidence
├── Chaos Execution: [planned failures successfully injected]
├── Recovery Validation: [system recovered automatically]
├── Degradation Graceful: [acceptable behavior during failures]
├── User Impact Minimal: [user experience maintained]
├── Monitoring Comprehensive: [all aspects tracked]
├── Safety Maintained: [no uncontrolled damage]
└── Insights Generated: [actionable reliability improvements]
```

## Workflow Integration

### Invoked By
- **SRE Agent**: When implementing reliability engineering practices
- **DevOps Platform**: During infrastructure reliability validation
- **Release Manager**: Before reliability-critical releases
- **NFR Agent**: When validating reliability requirements
- **Threat Modeler**: When testing security failure scenarios

### Invokes
- **Observability Agent**: To monitor system behavior during chaos
- **Metrics Agent**: To track reliability metrics over time
- **Drift Detector**: To identify reliability degradation
- **Confidence Agent**: To calibrate confidence in system resilience

## Evidence-Gated Outputs

### Primary Output: Chaos Engineering Report
```markdown
# Chaos Engineering Experiment Report

## Experiment Overview
- **Experiment Name**: [descriptive name]
- **Hypothesis**: [what we expect to learn or validate]
- **Duration**: [total experiment time]
- **Scope**: [systems and components under test]
- **Safety Controls**: [blast radius limits and termination conditions]

## Failure Scenarios Executed
### Scenario 1: [Failure Type - e.g., Database Connection Loss]
- **Failure Method**: [how failure was injected]
- **Duration**: [how long failure was active]
- **Expected Impact**: [predicted system behavior]
- **Actual Impact**: [observed system behavior]
- **Recovery Time**: [MTTR measured]
- **User Impact**: [effect on user experience]

### Scenario 2: [Failure Type - e.g., Service Instance Termination]
- **Failure Method**: [how failure was injected]
- **Duration**: [how long failure was active]
- **Expected Impact**: [predicted system behavior]
- **Actual Impact**: [observed system behavior]
- **Recovery Time**: [MTTR measured]
- **User Impact**: [effect on user experience]

## System Resilience Metrics
### Recovery Time Objectives (RTO)
- **Target RTO**: [requirement]
- **Measured RTO**: [actual performance]
- **Compliance**: ✅ MET / ❌ MISSED

### Recovery Point Objectives (RPO)
- **Target RPO**: [requirement]
- **Measured RPO**: [actual performance]
- **Compliance**: ✅ MET / ❌ MISSED

### Availability Metrics
- **Target Availability**: [percentage]% uptime
- **Measured Availability**: [percentage]% during chaos
- **Downtime Duration**: [total minutes of service impact]

## Degradation Analysis
### Graceful Degradation Validation
- **Degraded Features**: [functionality that gracefully degraded]
- **Maintained Services**: [critical functions that remained operational]
- **User Communication**: [error messages and status updates]

### Failure Mode Analysis
- **Single Points of Failure**: [components that caused cascading failures]
- **Cascading Effects**: [how failures propagated through the system]
- **Containment Effectiveness**: [how well failures were isolated]

## Observability Insights
### Monitoring Gaps Identified
- [Metrics that should have been monitored]
- [Alerts that didn't trigger appropriately]
- [Observability blind spots discovered]

### Alert Quality Assessment
- **False Positives**: [unnecessary alerts during chaos]
- **False Negatives**: [missed alerts for real issues]
- **Alert Clarity**: [how well alerts communicated the situation]

## Recommendations
### Immediate Reliability Fixes
- [Critical reliability issues requiring immediate attention]
- [Monitoring and alerting improvements needed]
- [Recovery mechanism enhancements]

### Long-term Resilience Improvements
- [Architecture changes for better fault tolerance]
- [Additional chaos experiments to run]
- [Reliability engineering practices to adopt]

### Experiment Refinements
- [Improvements to chaos testing methodology]
- [Additional failure scenarios to test]
- [Better safety controls and monitoring]
```

### Secondary Outputs
- **Chaos Timelines**: Visual timeline of failure injection and recovery
- **System Health Graphs**: Metrics showing system behavior during chaos
- **Failure Logs**: Detailed logs of system responses to failures
- **Recovery Playbooks**: Updated procedures based on experiment results

## Failure Modes & Recovery

### FM-001: Uncontrolled Failure Propagation
**Trigger**: Chaos experiments cause cascading failures beyond test scope
**Recovery**: Implement stronger safety controls, blast radius limits, automatic termination
**Fallback**: Immediate experiment termination, system restoration from backups

### FM-002: Incomplete System Recovery
**Trigger**: System doesn't fully recover after chaos experiments
**Recovery**: Implement comprehensive health checks, automated recovery procedures, manual intervention protocols
**Fallback**: Complete system restoration, document recovery gaps

### FM-003: Monitoring Blind Spots
**Trigger**: Cannot observe system behavior during failures adequately
**Recovery**: Enhance monitoring setup, add missing metrics, improve observability
**Fallback**: Limit experiment scope to well-monitored components

### FM-004: Safety Control Failure
**Trigger**: Safety mechanisms fail to prevent damage during chaos
**Recovery**: Implement multiple layers of safety controls, manual oversight, gradual failure injection
**Fallback**: Conservative chaos approach with minimal disruption

### FM-005: Experiment Design Flaws
**Trigger**: Chaos experiments don't represent real-world failure scenarios
**Recovery**: Validate experiment design against real incidents, incorporate historical failure data
**Fallback**: Focus on well-understood failure patterns

## Quality Gates

### Pre-Execution Gates
- ✅ Failure scenarios designed and peer-reviewed
- ✅ Safety controls implemented and tested
- ✅ System backups and recovery procedures ready
- ✅ Monitoring and observability fully configured
- ✅ Experiment scope approved by stakeholders

### Post-Execution Gates
- ✅ All planned failure scenarios executed
- ✅ System recovered to normal operation
- ✅ No permanent damage or data loss
- ✅ User impact within acceptable boundaries
- ✅ Comprehensive results and insights captured

### Evidence Quality Gates
- ✅ Failure injection evidence captured
- ✅ Recovery process fully documented
- ✅ System impact accurately measured
- ✅ Recommendations actionable and prioritized

## Invariants Validated

### INV-036: Reliability Requirements
**Validation**: System maintains operation under failure conditions
**Evidence**: Successful chaos experiments with graceful degradation
**Failure Impact**: System downtime and user disruption

### INV-031: Runbook Validation
**Validation**: Incident response procedures work correctly
**Evidence**: Recovery during chaos matches documented runbooks
**Failure Impact**: Ineffective incident response

### INV-032: Monitoring Completeness
**Validation**: All critical system components are monitored
**Evidence**: Comprehensive observability during failure scenarios
**Failure Impact**: Undetected system issues

## Risk Mitigation

### Reliability Risks
- **Unplanned Downtime**: Safety controls prevent uncontrolled failures
- **Data Loss**: Comprehensive backups protect against permanent damage
- **User Impact**: Gradual failure injection minimizes disruption

### Operational Risks
- **Recovery Complexity**: Automated recovery procedures reduce manual effort
- **Alert Fatigue**: Intelligent alerting prevents unnecessary notifications
- **Resource Strain**: Controlled chaos prevents infrastructure damage

### Business Risks
- **False Confidence**: Realistic failure scenarios prevent overconfidence
- **Compliance Issues**: Reliability validation supports regulatory requirements
- **Reputation Damage**: Proactive chaos testing prevents production incidents

## Evolution Path

### Phase 1 (Current): Chaos Engineering Basics
- Controlled failure injection
- Recovery validation
- Basic resilience testing

### Phase 2 (Future): Intelligent Chaos
- AI-powered failure scenario generation
- Predictive reliability analysis
- Automated chaos experiment design

### Phase 3 (Future): Continuous Resilience
- Real-time chaos engineering in production
- Automated reliability optimization
- Predictive failure prevention</content>
<parameter name="filePath">d:\All_Projects\sdlc_agent_swarm\.agents\skills\reliability-tester\skill.md