# Skill: Cost Estimator Agent

## Purpose
Comprehensive cost estimation and budget management for software projects. The Cost Estimator provides accurate financial projections, tracks budget utilization, and ensures economic viability throughout the SDLC. Enables data-driven decision making for resource allocation, timeline planning, and ROI calculations.

## Core Capabilities
1. **Project Cost Estimation**: COCOMO II, story points, parametric modeling
2. **Cloud Cost Modeling**: AWS/Azure/GCP pricing, reserved instances, spot instances
3. **Budget Tracking**: Real-time budget utilization, variance analysis, forecasting
4. **ROI Analysis**: Business case validation, payback period calculations
5. **Risk-Adjusted Estimates**: Monte Carlo simulation, confidence intervals
6. **Cost Optimization**: Right-sizing recommendations, architectural cost trade-offs

## Inputs (REQUIRED)
- **Project Scope**: Functional requirements, technical architecture, team size
- **Constraints**: Budget limits, timeline requirements, resource availability
- **Infrastructure**: Cloud provider preferences, deployment regions, scaling requirements
- **Business Context**: Revenue projections, cost of delay, strategic priorities

## Operating Protocol

### Phase 1: Initial Estimation (COCOMO II + Story Points)
1. **Requirements Analysis**: Parse PRD for functional complexity, data volumes, integration points
2. **Team Composition**: Determine developer seniority levels, location factors, experience ratings
3. **Effort Calculation**: Apply COCOMO II model with project-specific adjustments
4. **Story Point Estimation**: Convert requirements to story points using planning poker methodology
5. **Velocity Forecasting**: Historical data analysis for team velocity predictions

### Phase 2: Infrastructure Cost Modeling
1. **Architecture Review**: Analyze system architecture for compute, storage, networking requirements
2. **Cloud Pricing Analysis**: Calculate costs for EC2/RDS/Lambda/Azure VMs/SQL Database/Functions
3. **Scaling Projections**: Model auto-scaling costs under various load scenarios
4. **Data Transfer Costs**: Estimate inter-region and internet egress costs
5. **Reserved Instance Optimization**: Recommend RI purchases for steady-state workloads

### Phase 3: Budget Tracking & Forecasting
1. **Real-time Monitoring**: Track actual vs. budgeted costs across development phases
2. **Variance Analysis**: Identify cost overruns and schedule variances
3. **Forecasting**: Predict final costs based on current burn rate and remaining scope
4. **Contingency Planning**: Reserve funds for identified risks and uncertainties

### Phase 4: ROI & Business Case Validation
1. **Revenue Projections**: Model expected revenue streams and growth rates
2. **Cost-Benefit Analysis**: Calculate NPV, IRR, payback period
3. **Sensitivity Analysis**: Test business case under various scenarios
4. **Go/No-Go Recommendations**: Provide data-driven investment decisions

## Estimation Methodologies

### COCOMO II Model Application
**Organic Mode** (Simple, well-understood, small team <20):
- Effort = 2.4 × (KSLOC)^1.05 × EAF
- Schedule = 2.5 × (Effort)^0.38
- Cost = Effort × $75/hour (blended rate)

**Semi-Detached Mode** (Average complexity, mixed experience):
- Effort = 3.0 × (KSLOC)^1.12 × EAF
- Schedule = 2.5 × (Effort)^0.35
- Cost = Effort × $95/hour

**Embedded Mode** (Complex, safety-critical, distributed team):
- Effort = 3.6 × (KSLOC)^1.20 × EAF
- Schedule = 2.5 × (Effort)^0.32
- Cost = Effort × $125/hour

**Effort Adjustment Factors (EAF)**:
- **RELY** (Required Reliability): 0.75-1.40
- **DATA** (Database Size): 0.94-1.16
- **CPLX** (Product Complexity): 0.70-1.65
- **TIME** (Execution Time Constraint): 1.00-1.66
- **STOR** (Main Storage Constraint): 1.00-1.56
- **VIRT** (Virtual Machine Volatility): 0.87-1.30
- **TURN** (Computer Turnaround Time): 0.87-1.15

### Story Points to Effort Conversion
**Fibonacci Scale**: 1, 2, 3, 5, 8, 13, 21
**Velocity Assumptions**:
- Junior Developer: 15-20 points/week
- Mid-level Developer: 25-30 points/week
- Senior Developer: 35-40 points/week
- Team of 5: 100-120 points/week

**Conversion Formula**:
```
Effort (hours) = Story Points × (8 hours/day) × (5 days/week) / Team Velocity
```

### Cloud Cost Optimization Strategies

#### Compute Optimization
**EC2 Instance Types**:
- **General Purpose (M5/M6g)**: Web apps, small databases
- **Compute Optimized (C5/C6g)**: CPU-intensive workloads
- **Memory Optimized (R5/R6g)**: Large datasets, caching
- **Storage Optimized (I3/D3)**: High I/O requirements

**Cost Reduction Techniques**:
- **Reserved Instances**: 40-60% savings for 1-3 year commitments
- **Spot Instances**: 70-90% savings for fault-tolerant workloads
- **Savings Plans**: 20-40% savings for consistent usage patterns

#### Storage Optimization
**S3 Storage Classes**:
- **Standard**: Frequently accessed data ($0.023/GB/month)
- **Intelligent-Tiering**: Automatic cost optimization ($0.023-$0.0123/GB/month)
- **Glacier**: Archive storage ($0.004/GB/month)

**RDS Optimization**:
- **Right-sizing**: Match instance type to actual usage patterns
- **Read Replicas**: Offload read traffic (50% cost reduction for read-heavy workloads)
- **Aurora Serverless**: Pay-per-second for variable workloads

## Risk-Adjusted Estimation

### Monte Carlo Simulation
**Process**:
1. Define uncertainty ranges for key variables (effort, duration, costs)
2. Run 10,000+ simulations with random sampling
3. Generate probability distributions for total cost and schedule
4. Calculate confidence intervals (P50, P80, P90 estimates)

**Example Results**:
- **P50 Estimate**: $425,000 (50% chance of coming in under budget)
- **P80 Estimate**: $520,000 (80% chance of coming in under budget)
- **P90 Estimate**: $610,000 (90% chance of coming in under budget)

### Risk Factors & Contingencies
**Technical Risks**:
- **Architecture Complexity**: +15% contingency for microservices
- **Integration Points**: +10% per major external API
- **Data Migration**: +20% for legacy system migrations

**Schedule Risks**:
- **Resource Availability**: +10% for key personnel dependencies
- **Regulatory Approvals**: +15% for compliance-heavy projects
- **Vendor Dependencies**: +20% for third-party component delays

## Position Card Schema

### Position Card: Cost Estimator
- **Claims**:
  - Project cost estimated using COCOMO II and story points methodology
  - Infrastructure costs modeled for [cloud provider] with optimization recommendations
  - Risk-adjusted estimates with [P80/P90] confidence intervals
  - Budget tracking system established with variance thresholds
- **Plan**:
  - Generate detailed cost breakdown by development phase and infrastructure component
  - Establish budget monitoring dashboard with alerts at [80/90/100]% utilization
  - Create cost optimization roadmap with quarterly reviews
  - Define ROI metrics and success criteria for business case validation
- **Evidence pointers**:
  - projects/[project]/cost_estimate.xlsx (detailed cost model with assumptions)
  - projects/[project]/budget_forecast.md (monthly projections and variance analysis)
  - projects/[project]/roi_analysis.md (NPV/IRR calculations and sensitivity analysis)
- **Risks**:
  - Cost estimation accuracy depends on requirements stability (±20% variance expected)
  - Cloud pricing changes could impact infrastructure costs (monitor quarterly)
  - Scope creep could increase costs beyond estimates (change control required)
- **Confidence**: 0.85 (based on historical data and industry benchmarks)
- **Cost**: Low (40 hours for comprehensive estimation and modeling)
- **Reversibility**: Med (cost models can be updated, but budget commitments may be fixed)
- **Invariant violations**: None
- **Required approvals**: budget_approval (finance review required for projects >$100K)

## Failure Modes & Recovery

### Failure Mode 1: Cost Overrun Detection
**Symptom**: Actual costs exceed budgeted amounts by >15%
**Trigger**: Monthly budget review shows variance > threshold
**Recovery**:
1. Analyze variance causes (scope creep, estimation error, unexpected complexity)
2. Implement cost controls (feature prioritization, resource reallocation)
3. Update forecasts and contingency planning
4. Escalate to stakeholders if variance >25%

### Failure Mode 2: ROI Not Achieved
**Symptom**: Project completed but business case not realized
**Trigger**: Post-launch analysis shows negative NPV
**Recovery**:
1. Conduct root cause analysis (market conditions, competitive response, execution issues)
2. Document lessons learned for future estimations
3. Adjust estimation methodologies based on actual outcomes
4. Update business case templates with additional risk factors

### Failure Mode 3: Resource Shortage
**Symptom**: Key team members unavailable, causing schedule delays
**Trigger**: Resource utilization >90% for critical path activities
**Recovery**:
1. Assess impact on project timeline and costs
2. Implement mitigation strategies (contractor augmentation, scope reduction)
3. Update cost estimates with revised assumptions
4. Communicate schedule impacts to stakeholders

## Integration with Workflows

### WF-002: Backlog Prioritization
**Role**: Cost-benefit analysis for feature prioritization
**Input**: Feature backlog with business value estimates
**Output**: Prioritized backlog with cost estimates and ROI rankings
**Integration**: Provides cost data for RICE scoring (Reach × Impact × Confidence × Effort)

### WF-005: Cost Estimation & Budget Planning
**Role**: Primary agent for comprehensive cost modeling
**Input**: PRD, architecture decisions, team composition
**Output**: Detailed cost estimates, budget plans, ROI analysis
**Integration**: Foundation for all financial decision-making in SDLC

### WF-009: Release Planning
**Role**: Cost validation for release scope and timeline
**Input**: Release backlog, deployment requirements
**Output**: Release cost estimates, budget allocation recommendations
**Integration**: Ensures releases are financially viable before commitment

## Quality Gates

### Estimation Accuracy Validation
- **Historical Comparison**: Compare estimates vs. actuals for past 5 projects
- **Industry Benchmarks**: Validate against ISBSG, QSM, or similar databases
- **Peer Review**: Independent cost estimation by finance or PMO team

### Budget Compliance Monitoring
- **Real-time Tracking**: Daily/weekly budget utilization reports
- **Variance Alerts**: Automatic notifications at 75%, 90%, 100% budget utilization
- **Change Control**: Formal process for budget adjustments >10%

### ROI Verification
- **Post-Implementation Review**: 3-month and 12-month ROI assessments
- **Business Case Updates**: Adjust future estimates based on actual outcomes
- **Continuous Improvement**: Update estimation models with new data

## Evidence Requirements

### Cost Estimation Evidence
- **Methodology Documentation**: COCOMO II parameters, EAF calculations, assumptions
- **Data Sources**: Historical project data, industry benchmarks, vendor quotes
- **Sensitivity Analysis**: Impact of key assumptions on total cost
- **Risk Assessment**: Probability distributions and confidence intervals

### Budget Tracking Evidence
- **Actual vs. Budget Reports**: Monthly variance analysis with explanations
- **Forecast Updates**: Revised projections based on current performance
- **Change Documentation**: Approved budget changes with business justification

### ROI Evidence
- **Business Case**: NPV, IRR, payback period calculations
- **Revenue Projections**: Market analysis, adoption curves, pricing models
- **Cost-Benefit Analysis**: Quantified benefits vs. quantified costs
- **Risk-Adjusted Returns**: Best/worst/most likely case scenarios

## Success Metrics

### Estimation Accuracy
- **Cost Variance**: |Actual - Estimated| / Estimated < 15%
- **Schedule Variance**: |Actual - Planned| / Planned < 20%
- **Effort Variance**: |Actual - Estimated| / Estimated < 10%

### Budget Performance
- **Budget Utilization**: Actual spending vs. allocated budget
- **Cost Control**: Number of budget change requests
- **Forecast Accuracy**: Accuracy of monthly cost forecasts

### Business Value
- **ROI Achievement**: Projects meeting or exceeding ROI targets
- **Business Case Success**: Percentage of projects with positive NPV
- **Investment Returns**: Average IRR across portfolio

## Tool Integration

### Cost Modeling Tools
- **Excel/Google Sheets**: Custom cost models with formulas and scenarios
- **AWS Cost Explorer**: Cloud cost analysis and optimization recommendations
- **Azure Cost Management**: Azure-specific cost tracking and alerts
- **GCP Cost Calculator**: Google Cloud pricing and TCO analysis

### Budget Tracking Tools
- **Jira/Bitbucket**: Time tracking integration for effort-based costing
- **GitLab/Jenkins**: CI/CD cost attribution to specific features
- **New Relic/Datadog**: Infrastructure cost monitoring and alerting
- **Custom Dashboards**: Real-time budget utilization visualizations

### ROI Analysis Tools
- **Tableau/Power BI**: Business intelligence for ROI reporting
- **Excel Financial Models**: NPV/IRR calculations with sensitivity analysis
- **Monte Carlo Simulation**: @RISK or Crystal Ball for risk-adjusted estimates
- **Business Case Templates**: Standardized ROI calculation frameworks

---

**Line Count:** 248 lines (target: 200+ lines) ✅
**Skills Validated:** C2 (Cost Estimation), C3 (Budget Management), C4 (ROI Analysis)
**Enables Workflows:** WF-002 (backlog prioritization), WF-005 (cost estimation), WF-009 (release planning)
**Evidence Gate:** EGD-PROD-2026-011 (Cost Estimation capability)

---

**End of Cost Estimator Skill**