# Skill: Test Data Factory

## Purpose
Generate, manage, and maintain realistic test data for all testing activities, ensuring data privacy, consistency, and relevance across test environments.

## Core Capabilities
- **Data Generation**: Create realistic test data that matches production schemas
- **Privacy Protection**: Ensure no real user data enters test environments
- **Data Consistency**: Maintain referential integrity across related datasets
- **Scenario Coverage**: Generate data for various test scenarios and edge cases
- **Data Lifecycle**: Manage test data creation, usage, and cleanup

## Position Card Protocol

### SPEC Card (Requirements)
```
Test Data Factory - Data Requirements
├── Data Schemas: [database tables, API payloads, file formats]
├── Privacy Rules: [PII fields, data retention policies]
├── Test Scenarios: [happy path, edge cases, failure modes]
├── Data Volume: [records needed per scenario]
├── Relationships: [foreign keys, dependencies, constraints]
├── Freshness Requirements: [how often data needs refresh]
└── Success Criteria: [data supports all required test scenarios]
```

### TEST Card (Validation)
```
Test Data Factory - Validation Checks
├── Schema Compliance: [generated data matches target schemas]
├── Privacy Compliance: [no real PII in test data]
├── Relationship Integrity: [foreign keys and constraints maintained]
├── Scenario Coverage: [all required test cases supported]
├── Data Quality: [realistic and consistent data values]
├── Generation Performance: [data created within time limits]
└── Cleanup Procedures: [test data properly removed]
```

### SOLVER Card (Implementation)
```
Test Data Factory - Execution Strategy
├── Schema Analysis: [understand data models and relationships]
├── Privacy Assessment: [identify and protect sensitive fields]
├── Generation Planning: [design data creation workflows]
├── Scenario Mapping: [link data to specific test requirements]
├── Factory Implementation: [build data generation pipelines]
├── Quality Assurance: [validate generated data quality]
└── Lifecycle Management: [handle data refresh and cleanup]
```

### SKEPTIC Card (Risk Assessment)
```
Test Data Factory - Risk Analysis
├── Privacy Violations: [real data accidentally included]
├── Data Staleness: [test data becomes outdated]
├── Schema Drift: [data models change without factory updates]
├── Performance Issues: [slow data generation blocks testing]
├── Storage Costs: [excessive test data storage requirements]
├── Maintenance Burden: [complex factory upkeep]
└── Test Interference: [data pollution across test runs]
```

### VERIFIER Card (Evidence Requirements)
```
Test Data Factory - Verification Evidence
├── Schema Validation: [generated data matches all schemas]
├── Privacy Audit: [no PII detected in test environments]
├── Relationship Checks: [all constraints satisfied]
├── Scenario Support: [all test cases have required data]
├── Data Quality Metrics: [realism and consistency scores]
├── Generation Metrics: [performance and success rates]
└── Cleanup Verification: [test data properly managed]
```

## Workflow Integration

### Invoked By
- **Test Data Factory**: When setting up test environments
- **Unit Test Runner**: For isolated test data needs
- **Integration Test Runner**: For multi-service test data
- **E2E Test Runner**: For complete user journey data
- **Performance Tester**: For load testing data sets

### Invokes
- **Verifier**: To validate data quality and privacy compliance
- **Metrics Agent**: To track data generation and usage metrics
- **Drift Detector**: To identify schema or data drift
- **Compliance Checker**: To ensure privacy and regulatory compliance

## Evidence-Gated Outputs

### Primary Output: Test Data Generation Report
```markdown
# Test Data Generation Report

## Generation Summary
- **Total Records Generated**: [count]
- **Data Schemas Covered**: [count]
- **Test Scenarios Supported**: [count]
- **Generation Time**: [duration]
- **Storage Used**: [size]

## Schema Compliance
### Database Tables
| Table | Records | Schema Match | Relationships | Quality Score |
|-------|---------|--------------|---------------|---------------|
| [table1] | [count] | ✅ 100% | ✅ Valid | 95% |
| [table2] | [count] | ✅ 100% | ⚠️ Warnings | 87% |

### API Payloads
| Endpoint | Payloads | Schema Match | Data Realism | Privacy Check |
|----------|----------|--------------|--------------|---------------|
| [api1] | [count] | ✅ Valid | ✅ Realistic | ✅ Compliant |
| [api2] | [count] | ✅ Valid | ✅ Realistic | ✅ Compliant |

## Privacy & Compliance
### PII Protection
- **Fields Scrubbed**: [count] sensitive fields protected
- **Data Sources**: [synthetic/realistic/fake] data used
- **Compliance Level**: [GDPR/HIPAA/SOC2] requirements met
- **Audit Trail**: All data generation logged and traceable

### Data Quality Metrics
- **Realism Score**: [percentage]% (how realistic data appears)
- **Consistency Score**: [percentage]% (referential integrity maintained)
- **Completeness Score**: [percentage]% (required fields populated)
- **Uniqueness Score**: [percentage]% (appropriate data diversity)

## Scenario Coverage
### Test Scenario Support
| Scenario | Data Sets | Records | Edge Cases | Quality |
|----------|-----------|---------|------------|---------|
| Happy Path | [count] | [total] | [count] | ✅ Complete |
| Error Cases | [count] | [total] | [count] | ✅ Complete |
| Performance | [count] | [total] | [count] | ✅ Complete |

## Data Relationships
### Foreign Key Validation
- **Constraints Checked**: [count]
- **Violations Found**: [count] (should be 0)
- **Orphaned Records**: [count] (should be 0)
- **Circular References**: [detected/resolved]

## Generation Performance
### Timing Metrics
- **Average Generation Rate**: [records/second]
- **Peak Memory Usage**: [MB]
- **I/O Operations**: [reads/writes per second]
- **Parallel Workers**: [count] (for concurrent generation)

## Recommendations
### Data Quality Improvements
- [Fields needing better realism]
- [Relationships requiring enhancement]
- [Edge cases to add]

### Performance Optimizations
- [Generation speed improvements]
- [Memory usage optimizations]
- [Storage efficiency enhancements]

### Maintenance Tasks
- [Schema updates needed]
- [Privacy rule refinements]
- [Scenario coverage gaps]
```

### Secondary Outputs
- **Data Samples**: Example generated records for validation
- **Schema Mappings**: Documentation of data generation rules
- **Privacy Reports**: Detailed PII protection analysis
- **Usage Logs**: Audit trail of data generation and consumption

## Failure Modes & Recovery

### FM-001: Schema Mismatch
**Trigger**: Generated data doesn't match target database/API schemas
**Recovery**: Update data generation templates, validate against current schemas, implement schema change detection
**Fallback**: Manual data correction, reduced automation

### FM-002: Privacy Violation
**Trigger**: Real user data accidentally included in test datasets
**Recovery**: Implement stronger PII detection, add data sanitization layers, conduct regular privacy audits
**Fallback**: Immediate data destruction, privacy incident response

### FM-003: Relationship Integrity Failure
**Trigger**: Foreign key constraints violated in generated data
**Recovery**: Improve relationship modeling, add constraint validation, implement referential integrity checks
**Fallback**: Generate data in dependency order, manual relationship fixing

### FM-004: Performance Degradation
**Trigger**: Data generation becomes too slow for testing needs
**Recovery**: Optimize generation algorithms, implement parallel processing, cache frequently used data patterns
**Fallback**: Pre-generate common datasets, reduce data volume

### FM-005: Data Staleness
**Trigger**: Test data no longer reflects current business rules or schemas
**Recovery**: Implement schema change detection, automate data refresh, version data sets
**Fallback**: Manual data updates, document staleness limitations

## Quality Gates

### Pre-Generation Gates
- ✅ Target schemas documented and accessible
- ✅ Privacy requirements defined and implemented
- ✅ Test scenarios specified with data needs
- ✅ Generation environment configured
- ✅ Cleanup procedures defined

### Post-Generation Gates
- ✅ All required data generated successfully
- ✅ Schema compliance validated
- ✅ Privacy compliance verified
- ✅ Relationship integrity confirmed
- ✅ Test scenarios supported

### Evidence Quality Gates
- ✅ Generation process fully logged
- ✅ Data quality metrics captured
- ✅ Privacy audit completed
- ✅ Usage traceability established

## Invariants Validated

### INV-010: Data Privacy Compliance
**Validation**: Test data contains no real user information
**Evidence**: Privacy audit reports and data sanitization logs
**Failure Impact**: Privacy violations and legal risks

### INV-014: Data Integrity
**Validation**: Test data maintains referential integrity
**Evidence**: Constraint validation and relationship checks
**Failure Impact**: Invalid test results due to broken data relationships

### INV-039: Test Data Quality
**Validation**: Test data is realistic and supports comprehensive testing
**Evidence**: Quality metrics and scenario coverage reports
**Failure Impact**: Inadequate test coverage and false confidence

## Risk Mitigation

### Privacy Risks
- **Data Leakage**: Multi-layer PII detection and sanitization
- **Regulatory Violations**: Compliance checks built into generation pipeline
- **Audit Failures**: Complete audit trails for all data operations

### Quality Risks
- **Unrealistic Data**: Validation against production schemas and business rules
- **Inconsistent Data**: Relationship integrity checks and constraint validation
- **Stale Data**: Automated refresh mechanisms and change detection

### Operational Risks
- **Generation Delays**: Parallel processing and performance optimization
- **Storage Overload**: Efficient data compression and lifecycle management
- **Maintenance Complexity**: Modular factory design and automated updates

## Evolution Path

### Phase 1 (Current): Basic Data Generation
- Schema-compliant data creation
- Privacy protection
- Relationship integrity

### Phase 2 (Future): Intelligent Data Factory
- AI-powered realistic data generation
- Predictive scenario coverage
- Automated schema change adaptation

### Phase 3 (Future): Continuous Data Management
- Real-time data freshness monitoring
- Automated privacy compliance
- Predictive data requirement analysis</content>
<parameter name="filePath">d:\All_Projects\sdlc_agent_swarm\.agents\skills\test-data-factory\skill.md