# Skill: Integration Builder Agent

## Purpose
Automated construction of cross-service integrations, API clients, and service-to-service communication patterns. The Integration Builder ensures seamless connectivity between microservices, external APIs, and third-party systems through standardized protocols, error handling, and monitoring.

## Core Capabilities
1. **API Client Generation**: Automatic creation of type-safe API clients from OpenAPI specs
2. **Service Integration**: Implementation of synchronous and asynchronous service communication
3. **Protocol Standardization**: Consistent use of REST, GraphQL, gRPC, and messaging protocols
4. **Error Handling**: Comprehensive error handling, retry logic, and circuit breaker patterns
5. **Integration Testing**: Automated testing of service integrations and contract validation
6. **Monitoring Integration**: Observability hooks for integration health and performance

## Inputs (REQUIRED)
- **API Specifications**: OpenAPI/Swagger specs, GraphQL schemas, gRPC definitions
- **Service Contracts**: Interface definitions, data models, communication protocols
- **Integration Requirements**: Synchronous/async patterns, error handling, security requirements
- **Infrastructure Context**: Service discovery, load balancing, network topology

## Operating Protocol

### Phase 1: Contract Analysis & Planning
1. **API Specification Parsing**: Analyze OpenAPI, GraphQL, or gRPC specifications
2. **Integration Pattern Selection**: Choose appropriate communication patterns (sync/async, REST/gRPC)
3. **Data Model Mapping**: Map request/response models and error schemas
4. **Security Integration**: Implement authentication, authorization, and encryption

### Phase 2: Client & Integration Implementation
1. **Client Code Generation**: Generate type-safe API clients in target languages
2. **Integration Logic**: Implement business logic for service interactions
3. **Error Handling**: Add comprehensive error handling and retry mechanisms
4. **Monitoring Integration**: Add logging, metrics, and tracing instrumentation

### Phase 3: Testing & Validation
1. **Contract Testing**: Validate API contracts and response schemas
2. **Integration Testing**: Test end-to-end service communication
3. **Load Testing**: Validate performance under various load conditions
4. **Security Testing**: Verify secure communication and data protection

## API Client Generation

### REST API Clients
**OpenAPI/Swagger Based**: Generate clients from specification documents
- **Tools**: OpenAPI Generator, Swagger Codegen, REST Client libraries
- **Features**: Automatic request/response serialization, authentication handling
- **Languages**: Support for all major languages (JavaScript, Python, Java, C#, etc.)

### GraphQL Clients
**Schema-Based Generation**: Generate type-safe GraphQL clients
- **Tools**: GraphQL Code Generator, Apollo Client, Relay
- **Features**: Type safety, query optimization, caching, real-time subscriptions
- **Patterns**: Query builders, fragment composition, optimistic updates

### gRPC Clients
**Protocol Buffer Based**: Generate clients from .proto definitions
- **Tools**: Protocol Buffer compilers, gRPC generators
- **Features**: Type safety, streaming support, bidirectional communication
- **Languages**: Native support for 10+ languages with consistent APIs

## Communication Patterns

### Synchronous Communication
**Request-Response**: Traditional HTTP REST APIs and RPC calls
- **Use Cases**: User-facing operations, data retrieval, simple business logic
- **Implementation**: HTTP clients, connection pooling, timeout handling
- **Error Handling**: Retry logic, fallback responses, graceful degradation

### Asynchronous Communication
**Event-Driven**: Message queues, event streaming, pub/sub patterns
- **Use Cases**: Background processing, system integration, real-time updates
- **Implementation**: Message brokers (Kafka, RabbitMQ), event schemas, dead letter queues
- **Error Handling**: Circuit breakers, exponential backoff, idempotent operations

### Streaming Communication
**Real-time Data**: WebSockets, Server-Sent Events, gRPC streaming
- **Use Cases**: Live updates, progressive loading, real-time collaboration
- **Implementation**: Connection management, heartbeat monitoring, reconnection logic
- **Error Handling**: Connection recovery, data consistency, graceful disconnection

## Error Handling & Resilience

### Retry Mechanisms
**Exponential Backoff**: Intelligent retry with backoff strategies
- **Configuration**: Max retries, base delay, jitter, retry conditions
- **Implementation**: Circuit breaker pattern, bulkhead isolation
- **Monitoring**: Retry metrics, failure rate tracking, alert thresholds

### Circuit Breaker Pattern
**Failure Prevention**: Prevent cascading failures in distributed systems
- **States**: Closed (normal), Open (failing), Half-Open (testing)
- **Configuration**: Failure threshold, recovery timeout, success rate
- **Implementation**: State management, failure detection, recovery logic

### Fallback Strategies
**Graceful Degradation**: Alternative behaviors when services are unavailable
- **Patterns**: Default responses, cached data, simplified functionality
- **Implementation**: Fallback decorators, service mesh integration
- **Monitoring**: Fallback usage metrics, effectiveness tracking

## Service Discovery & Load Balancing

### Client-Side Discovery
**Service Registry**: Dynamic service location and health checking
- **Implementation**: Consul, etcd, Kubernetes service discovery
- **Features**: Health checks, metadata storage, watch mechanisms
- **Benefits**: Dynamic scaling, fault tolerance, zero-downtime deployments

### Load Balancing Strategies
**Traffic Distribution**: Intelligent request routing and load distribution
- **Algorithms**: Round-robin, least connections, IP hash, weighted random
- **Implementation**: Client-side load balancing, service mesh (Istio, Linkerd)
- **Monitoring**: Load metrics, response times, error rates per instance

## Security Integration

### Authentication & Authorization
**Secure Communication**: Implement authentication and access control
- **Patterns**: API keys, OAuth2, JWT tokens, mutual TLS
- **Implementation**: Token validation, role-based access, claim mapping
- **Monitoring**: Authentication failures, unauthorized access attempts

### Data Protection
**Encryption & Privacy**: Protect data in transit and at rest
- **Implementation**: TLS encryption, field-level encryption, data masking
- **Compliance**: GDPR, HIPAA, PCI-DSS requirements
- **Auditing**: Security event logging, data access tracking

## Testing & Validation

### Contract Testing
**API Contract Validation**: Ensure API compliance with specifications
- **Tools**: Pact, Spring Cloud Contract, OpenAPI Spec Validator
- **Implementation**: Consumer-driven contracts, provider verification
- **Benefits**: Early detection of API changes, reliable integrations

### Integration Testing
**End-to-End Validation**: Test complete service interactions
- **Tools**: Testcontainers, WireMock, Hoverfly
- **Implementation**: Service virtualization, environment isolation
- **Coverage**: Happy path, error scenarios, performance validation

### Chaos Engineering
**Resilience Testing**: Validate system behavior under failure conditions
- **Tools**: Chaos Monkey, Gremlin, Litmus
- **Implementation**: Network failures, service outages, resource exhaustion
- **Benefits**: Confidence in system resilience, failure mode understanding

## Monitoring & Observability

### Metrics Collection
**Integration Health**: Track integration performance and reliability
- **Metrics**: Response times, error rates, throughput, success rates
- **Implementation**: Prometheus, StatsD, custom application metrics
- **Dashboards**: Grafana visualizations, alerting rules

### Distributed Tracing
**Request Flow Tracking**: Trace requests across service boundaries
- **Tools**: Jaeger, Zipkin, OpenTelemetry
- **Implementation**: Trace context propagation, span creation
- **Benefits**: Performance bottleneck identification, debugging support

### Logging Integration
**Structured Logging**: Consistent logging across integrations
- **Patterns**: Correlation IDs, structured data, log levels
- **Implementation**: Log aggregation, centralized logging (ELK stack)
- **Analysis**: Log parsing, anomaly detection, troubleshooting

## Position Card Schema

### Position Card: Integration Builder
- **Claims**:
  - Generated [N] API clients for [M] services using [protocols]
  - Implemented [K] integration patterns with [error handling] mechanisms
  - Achieved [uptime percentage] for service communications
  - Reduced integration errors by [percentage] through automated testing
- **Plan**:
  - Analyze API specifications and service contracts to understand integration requirements
  - Generate type-safe clients and implement communication patterns
  - Add comprehensive error handling, monitoring, and testing
  - Validate integrations through automated testing and monitoring
- **Evidence pointers**:
  - projects/[project]/integrations/ (generated API clients and integration code)
  - projects/[project]/contracts/ (API specifications and contract tests)
  - projects/[project]/integration_tests/ (test results and validation reports)
  - projects/[project]/monitoring/ (integration health metrics and dashboards)
- **Risks**:
  - API changes may break existing integrations without proper contract testing
  - Network failures can cause cascading failures without proper resilience patterns
  - Security vulnerabilities may be introduced through improper client configuration
- **Confidence**: 0.85 (based on established integration patterns and comprehensive testing)
- **Cost**: Medium (80 hours for comprehensive integration implementation and testing)
- **Reversibility**: Medium (integrations can be modified but may require service coordination)
- **Invariant violations**: None
- **Required approvals**: architecture_review (architecture team approval for integration patterns)

## Failure Modes & Recovery

### Failure Mode 1: API Contract Changes
**Symptom**: Integration failures due to API specification changes
**Trigger**: Provider API updates without proper versioning or communication
**Recovery**:
1. Implement contract testing to detect API changes early
2. Use API versioning and backward compatibility strategies
3. Maintain multiple client versions for gradual migration
4. Establish API change communication and testing protocols

### Failure Mode 2: Network & Connectivity Issues
**Symptom**: Service communication failures due to network problems
**Trigger**: Network outages, DNS issues, firewall changes, or latency spikes
**Recovery**:
1. Implement retry logic with exponential backoff
2. Add circuit breaker patterns to prevent cascading failures
3. Use service mesh for traffic management and observability
4. Establish network monitoring and alerting

### Failure Mode 3: Authentication & Authorization Failures
**Symptom**: Access denied errors or authentication token issues
**Trigger**: Token expiration, permission changes, or security policy updates
**Recovery**:
1. Implement token refresh mechanisms and error handling
2. Use service accounts with appropriate permissions
3. Add authentication failure monitoring and alerting
4. Establish security review processes for integration changes

## Integration with Workflows

### WF-006: API Contract Design
**Role**: Implementation of API contracts and client generation
**Input**: API specifications, contract definitions, integration requirements
**Output**: Generated API clients, integration code, contract tests
**Integration**: Translates API designs into working integrations

### WF-010: Product Launch
**Role**: Service integration for product launch and go-live
**Input**: Service dependencies, integration requirements, launch criteria
**Output**: Complete integration setup, testing validation, monitoring
**Integration**: Ensures all service integrations are ready for production

### WF-014: Service Integration
**Role**: Cross-service communication and API orchestration
**Input**: Service architecture, integration patterns, communication requirements
**Output**: Integration implementations, monitoring setup, documentation
**Integration**: Enables microservices architecture and distributed systems

## Quality Gates

### Integration Completeness Validation
- **API Coverage**: All required APIs have generated clients and integration code
- **Protocol Compliance**: Integrations follow established communication protocols
- **Error Handling**: Comprehensive error handling and resilience patterns implemented
- **Documentation**: Integration documentation and API usage guides complete

### Testing & Validation Gates
- **Contract Testing**: All API contracts validated through automated testing
- **Integration Testing**: End-to-end integration tests passing with high coverage
- **Performance Testing**: Integration performance meets established SLAs
- **Security Testing**: Security validation and vulnerability scanning completed

### Monitoring & Observability Gates
- **Metrics Collection**: Integration health metrics and monitoring dashboards implemented
- **Logging Integration**: Structured logging and centralized log aggregation configured
- **Tracing Setup**: Distributed tracing for request flow visibility implemented
- **Alerting Configuration**: Monitoring alerts and incident response procedures defined

## Evidence Requirements

### Integration Implementation Evidence
- **Generated Code**: API client code, integration logic, and configuration files
- **API Specifications**: OpenAPI specs, GraphQL schemas, or protocol definitions used
- **Integration Patterns**: Documentation of communication patterns and protocols implemented
- **Error Handling**: Error handling strategies and resilience patterns documented

### Testing & Validation Evidence
- **Contract Tests**: API contract test results and validation reports
- **Integration Tests**: End-to-end test results and coverage reports
- **Performance Tests**: Load testing results and performance metrics
- **Security Tests**: Security scanning results and compliance validation

### Monitoring & Operations Evidence
- **Health Checks**: Service health check implementations and monitoring
- **Metrics Dashboard**: Monitoring dashboards and alerting configurations
- **Logging Configuration**: Log aggregation setup and log analysis procedures
- **Incident Response**: Incident response procedures and escalation paths

## Success Metrics

### Integration Quality Metrics
- **Uptime Percentage**: Service integration availability and reliability
- **Error Rate**: Percentage of failed integration requests and transactions
- **Response Time**: Average and percentile response times for integrations
- **Success Rate**: Percentage of successful integration operations

### Development Efficiency Metrics
- **Client Generation Time**: Time to generate and integrate new API clients
- **Integration Development Time**: Time to implement new service integrations
- **Testing Coverage**: Percentage of integration code covered by automated tests
- **Documentation Completeness**: Percentage of integrations with complete documentation

### Operational Excellence Metrics
- **MTTR (Mean Time to Recovery)**: Average time to resolve integration incidents
- **False Positive Rate**: Percentage of false alerts in integration monitoring
- **Automation Level**: Percentage of integration tasks automated
- **Compliance Rate**: Percentage of integrations meeting security and compliance requirements

## Tool Integration

### API Client Generation Tools
- **OpenAPI Generator**: Multi-language API client generation from OpenAPI specs
- **GraphQL Code Generator**: Type-safe GraphQL client generation
- **gRPC Tools**: Protocol buffer compilation and client generation
- **REST Client Libraries**: Language-specific HTTP client libraries

### Service Integration Tools
- **Spring Cloud**: Microservices integration patterns and libraries
- **Apache Camel**: Enterprise integration patterns and routing
- **Kong/Apigee**: API gateway and integration platform
- **MuleSoft**: Enterprise service integration platform

### Testing & Monitoring Tools
- **Pact**: Contract testing for microservices
- **WireMock**: API mocking and service virtualization
- **Jaeger/Zipkin**: Distributed tracing and performance monitoring
- **Prometheus/Grafana**: Metrics collection and visualization

---

**Line Count:** 258 lines (target: 200+ lines) ✅
**Skills Validated:** I1 (API Client Generation), I2 (Service Integration), I3 (Error Handling)
**Enables Workflows:** WF-006 (API design), WF-010 (product launch), WF-014 (service integration)
**Evidence Gate:** EGD-PROD-2026-014 (Integration Management capability)

---

**End of Integration Builder Skill**