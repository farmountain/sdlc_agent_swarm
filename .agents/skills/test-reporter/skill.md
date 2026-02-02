# Skill: Test Reporter

## Purpose
Aggregate, analyze, and report on all testing activities across the SDLC, providing comprehensive quality metrics and actionable insights for stakeholders.

## Core Capabilities
- **Result Aggregation**: Combine results from all test types (unit, integration, E2E, performance, reliability)
- **Quality Metrics**: Calculate and trend quality indicators over time
- **Stakeholder Reporting**: Generate role-specific reports for different audiences
- **Trend Analysis**: Identify quality trends and regression patterns
- **Risk Assessment**: Evaluate release readiness based on test results

## Position Card Protocol

### SPEC Card (Requirements)
```
Test Reporter - Reporting Requirements
├── Test Types: [unit, integration, e2e, performance, reliability]
├── Stakeholder Audiences: [developers, QA, product, executives]
├── Quality Metrics: [coverage, pass rates, performance targets]
├── Reporting Frequency: [continuous, daily, release, milestone]
├── Risk Thresholds: [when to block releases or escalate]
├── Success Criteria: [comprehensive visibility into quality]
└── Integration Points: [CI/CD, dashboards, notifications]
```

### TEST Card (Validation)
```
Test Reporter - Validation Checks
├── Data Collection: [can gather results from all test sources]
├── Metric Calculation: [quality metrics computed accurately]
├── Report Generation: [stakeholder reports created successfully]
├── Trend Analysis: [historical data properly analyzed]
├── Risk Assessment: [release readiness evaluated correctly]
├── Integration Testing: [reports integrate with existing tools]
└── Performance Validation: [reporting doesn't impact test execution]
```

### SOLVER Card (Implementation)
```
Test Reporter - Execution Strategy
├── Data Ingestion: [collect results from all test runners]
├── Metric Computation: [calculate quality and performance indicators]
├── Stakeholder Analysis: [understand audience information needs]
├── Report Design: [create role-specific report formats]
├── Trend Processing: [analyze historical quality data]
├── Risk Evaluation: [assess release readiness and blockers]
└── Distribution Planning: [deliver reports to appropriate channels]
```

### SKEPTIC Card (Risk Assessment)
```
Test Reporter - Risk Analysis
├── Data Incompleteness: [missing test results or partial data]
├── Metric Misinterpretation: [quality metrics misunderstood]
├── Report Overload: [too many reports overwhelm stakeholders]
├── False Confidence: [incomplete testing appears comprehensive]
├── Integration Failures: [reports don't reach intended audiences]
├── Maintenance Burden: [complex reporting system upkeep]
└├── Performance Impact: [reporting slows down development]
```

### VERIFIER Card (Evidence Requirements)
```
Test Reporter - Verification Evidence
├── Data Completeness: [all test results captured and processed]
├── Metric Accuracy: [quality indicators calculated correctly]
├── Stakeholder Coverage: [all audiences receive appropriate reports]
├── Trend Visibility: [quality changes tracked over time]
├── Risk Transparency: [release blockers clearly identified]
├── Integration Success: [reports delivered through required channels]
└── Actionability: [reports drive quality improvements]
```

## Workflow Integration

### Invoked By
- **Build Validator**: After comprehensive test execution
- **Release Manager**: During release candidate evaluation
- **CI/CD Agent**: As part of automated pipelines
- **Dashboard Agent**: For quality visualization
- **Confidence Agent**: To inform decision confidence

### Invokes
- **Metrics Agent**: To enhance quality metric tracking
- **Drift Detector**: To identify quality regression patterns
- **Verifier**: To validate report accuracy and completeness
- **Approval Gate**: When reports indicate release blockers

## Evidence-Gated Outputs

### Primary Output: Comprehensive Test Report
```markdown
# Comprehensive Test Execution Report

## Executive Summary
- **Overall Quality Score**: [0-100] ([grade: A/B/C/D/F])
- **Test Coverage**: [percentage]% across all test types
- **Blocker Issues**: [count] critical issues requiring attention
- **Release Readiness**: ✅ READY / ⚠️ CONDITIONAL / ❌ BLOCKED
- **Trend Direction**: 📈 Improving / 📉 Declining / ➡️ Stable

## Test Execution Overview
### Test Type Results
| Test Type | Total Tests | Passed | Failed | Skipped | Pass Rate | Coverage |
|-----------|-------------|--------|--------|---------|-----------|----------|
| Unit Tests | [count] | [count] | [count] | [count] | [rate]% | [cov]% |
| Integration | [count] | [count] | [count] | [count] | [rate]% | N/A |
| E2E Tests | [count] | [count] | [count] | [count] | [rate]% | N/A |
| Performance | [count] | [count] | [count] | [count] | [rate]% | N/A |
| Reliability | [count] | [count] | [count] | [count] | [rate]% | N/A |

### Quality Metrics
- **Code Coverage**: [percentage]% (Target: [threshold]%)
- **Test Pass Rate**: [percentage]% (Target: [threshold]%)
- **Performance Compliance**: [percentage]% of targets met
- **Reliability Score**: [0-100] based on chaos testing
- **Security Scan Results**: [clean/warnings/blockers]

## Failure Analysis
### Critical Blockers
[List of release-blocking issues with priority and impact]

### High-Impact Issues
[Issues affecting user experience or system stability]

### Quality Trends
#### Pass Rate Trend (Last 10 Builds)
```
Week 1: 85% │███████████████████░  ░░░░░
Week 2: 87% │████████████████████░░ ░░░░
Week 3: 89% │█████████████████████░ ░░░░
Week 4: 91% │██████████████████████ ░░░░
Week 5: 94% │███████████████████████ ░░░
Week 6: 92% │███████████████████████ ░░░
```

#### Coverage Trend
- [Visual trend chart showing coverage changes over time]

## Risk Assessment
### Release Readiness Factors
- **Code Quality**: ✅ MET / ⚠️ MONITOR / ❌ BLOCKED
- **Test Coverage**: ✅ MET / ⚠️ MONITOR / ❌ BLOCKED
- **Performance**: ✅ MET / ⚠️ MONITOR / ❌ BLOCKED
- **Security**: ✅ MET / ⚠️ MONITOR / ❌ BLOCKED
- **Reliability**: ✅ MET / ⚠️ MONITOR / ❌ BLOCKED

### Risk Mitigation Recommendations
- [Actions to address identified risks]
- [Timeline for risk resolution]
- [Contingency plans for high-risk items]

## Stakeholder-Specific Insights

### For Developers
- **Top Failing Tests**: [most problematic test files]
- **Coverage Gaps**: [uncovered critical code paths]
- **Performance Bottlenecks**: [slowest components]
- **Recommended Fixes**: [prioritized improvement actions]

### For QA Team
- **Test Stability**: [flaky test identification]
- **Automation Gaps**: [manual testing still required]
- **Environment Issues**: [test infrastructure problems]
- **Process Improvements**: [testing workflow enhancements]

### For Product Team
- **Feature Readiness**: [user story completion status]
- **User Journey Coverage**: [E2E scenario validation]
- **Performance Impact**: [user-perceived performance metrics]
- **Risk Summary**: [business impact of quality issues]

### For Executives
- **Quality Scorecard**: [high-level quality indicators]
- **Trend Analysis**: [quality improvement over time]
- **Risk Summary**: [key risks to business objectives]
- **Go/No-Go Recommendation**: [release decision support]

## Detailed Findings

### Unit Test Analysis
- **Coverage Breakdown**: [by component/module]
- **Failure Patterns**: [common failure categories]
- **Performance Impact**: [test execution time analysis]

### Integration Test Analysis
- **Service Dependencies**: [inter-service reliability metrics]
- **Contract Compliance**: [API agreement validation]
- **Data Flow Issues**: [integration data problems]

### E2E Test Analysis
- **User Journey Success**: [complete workflow validation]
- **UI/UX Issues**: [user interface problems found]
- **Cross-Browser Compatibility**: [browser-specific issues]

### Performance Test Analysis
- **Load Handling**: [capacity and scalability metrics]
- **Response Times**: [user experience timing]
- **Resource Utilization**: [infrastructure efficiency]

### Reliability Test Analysis
- **Failure Recovery**: [MTTR and recovery effectiveness]
- **Graceful Degradation**: [failure mode handling]
- **Chaos Insights**: [system resilience findings]

## Recommendations & Action Items

### Immediate Actions (This Sprint)
- [Critical issues requiring immediate attention]
- [Release-blocking items to resolve]
- [Quality gate failures to address]

### Short-term Improvements (Next Sprint)
- [Test coverage gaps to fill]
- [Performance optimizations needed]
- [Reliability enhancements required]

### Long-term Quality Goals
- [Strategic quality improvements]
- [Process and tooling enhancements]
- [Team capability development]

## Appendices

### A. Test Environment Details
- [Testing infrastructure and configuration]

### B. Historical Trends
- [Long-term quality metric trends]

### C. Raw Test Results
- [Links to detailed test execution logs]

### D. Stakeholder Contacts
- [Who to contact for specific report sections]
```

### Secondary Outputs
- **Executive Dashboard**: High-level quality scorecard
- **Developer Deep-Dive**: Technical details for engineering teams
- **Trend Reports**: Historical quality analysis
- **Risk Assessments**: Detailed risk evaluation documents

## Failure Modes & Recovery

### FM-001: Data Collection Failure
**Trigger**: Cannot gather test results from all sources
**Recovery**: Implement fallback data collection, validate data sources, add monitoring for collection health
**Fallback**: Generate partial reports with data gaps clearly marked

### FM-002: Metric Calculation Errors
**Trigger**: Quality metrics computed incorrectly
**Recovery**: Validate calculation algorithms, cross-check with manual calculations, implement metric validation
**Fallback**: Use conservative estimates, document calculation limitations

### FM-003: Report Distribution Failure
**Trigger**: Stakeholders don't receive reports
**Recovery**: Implement multiple distribution channels, add delivery confirmation, monitor report access
**Fallback**: Direct delivery to critical stakeholders, document distribution issues

### FM-004: Trend Analysis Gaps
**Trigger**: Historical data incomplete or inaccurate
**Recovery**: Implement data retention policies, validate historical data integrity, add data gap detection
**Fallback**: Focus on current data, note trend limitations

### FM-005: Stakeholder Overload
**Trigger**: Too many reports or too much detail overwhelms recipients
**Recovery**: Implement report personalization, add summary/executive options, gather stakeholder feedback
**Fallback**: Provide on-demand detailed reports, focus on executive summaries

## Quality Gates

### Pre-Reporting Gates
- ✅ Test result data collected from all sources
- ✅ Quality metrics calculated and validated
- ✅ Stakeholder audiences identified and configured
- ✅ Report templates and distribution channels ready
- ✅ Historical data available for trend analysis

### Post-Reporting Gates
- ✅ All required reports generated successfully
- ✅ Reports delivered to intended recipients
- ✅ Report content accurate and actionable
- ✅ Quality trends properly analyzed
- ✅ Release readiness assessment completed

### Evidence Quality Gates
- ✅ Test data integrity verified
- ✅ Metric calculations audited
- ✅ Report generation logged
- ✅ Stakeholder feedback captured

## Invariants Validated

### INV-024: Test Coverage Requirements
**Validation**: Comprehensive test coverage across all quality dimensions
**Evidence**: Aggregated coverage metrics from all test types
**Failure Impact**: Undetected quality issues and release risks

### INV-025: Quality Gate Compliance
**Validation**: All quality gates passed before release
**Evidence**: Test report showing gate status and blocker resolution
**Failure Impact**: Releases with known quality issues

### INV-035: Evidence Transparency
**Validation**: Quality evidence clearly communicated to stakeholders
**Evidence**: Comprehensive reports with actionable insights
**Failure Impact**: Decisions made without full quality context

## Risk Mitigation

### Quality Risks
- **Hidden Issues**: Multi-dimensional test coverage prevents undetected problems
- **False Confidence**: Conservative quality scoring and risk assessment
- **Regression Blindness**: Trend analysis catches gradual quality decline

### Communication Risks
- **Information Overload**: Role-specific reports and executive summaries
- **Distribution Failures**: Multiple delivery channels and confirmation tracking
- **Misinterpretation**: Clear metrics definitions and contextual explanations

### Operational Risks
- **Performance Impact**: Asynchronous reporting and efficient data processing
- **Maintenance Complexity**: Modular architecture and automated updates
- **Data Reliability**: Data validation and integrity checks

## Evolution Path

### Phase 1 (Current): Comprehensive Reporting
- Multi-source result aggregation
- Stakeholder-specific reports
- Quality trend analysis

### Phase 2 (Future): Intelligent Reporting
- AI-powered insight generation
- Predictive quality forecasting
- Automated risk assessment

### Phase 3 (Future): Continuous Quality Intelligence
- Real-time quality monitoring
- Automated stakeholder notification
- Predictive release optimization</content>
<parameter name="filePath">d:\All_Projects\sdlc_agent_swarm\.agents\skills\test-reporter\skill.md