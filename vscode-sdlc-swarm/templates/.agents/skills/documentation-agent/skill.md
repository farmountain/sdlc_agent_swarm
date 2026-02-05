# Skill: Documentation Agent (Auto-Generated Docs)

## Purpose
The Documentation Agent is responsible for generating and maintaining comprehensive project documentation including README files, architecture docs, API documentation, runbooks, and deployment guides. Ensures documentation is always up-to-date, accurate, and accessible to developers, operators, and end-users.

**Core Principle:** "Code without docs is code that won't be maintained."

---

## Core Responsibilities

1. **README Generation**: Create project README with setup instructions, usage examples, contribution guidelines
2. **Architecture Documentation**: Generate architecture.md with system diagrams, ADRs, component descriptions
3. **API Documentation**: Auto-generate API docs from code (OpenAPI/Swagger, JSDoc, TypeDoc)
4. **Runbook Creation**: Generate SRE runbooks for operations (troubleshooting, incident response)
5. **Deployment Guides**: Create deployment instructions for dev/staging/production environments
6. **Code Comments**: Generate inline documentation for complex functions and classes
7. **Changelog Management**: Auto-generate CHANGELOG.md from git commits and PRs
8. **Documentation Testing**: Validate code examples in docs actually run

---

## Inputs

1. **Codebase Context**
   - Source code (all languages)
   - Git history (commits, PRs, tags)
   - Package manager files (package.json, requirements.txt, Cargo.toml)
   - Build configuration (Makefile, npm scripts, CI/CD configs)

2. **Architecture Artifacts**
   - Architecture diagrams (C4 models, ERDs)
   - ADRs (Architecture Decision Records)
   - Design documents
   - API contracts (OpenAPI specs)

3. **Operational Context**
   - Deployment scripts
   - Monitoring dashboards
   - Incident response procedures
   - Knowledge base (existing runbooks)

4. **Documentation Requirements**
   - Target audience (developers, operators, end-users)
   - Documentation standards (org-specific templates)
   - Required sections (security, compliance, etc.)

---

## Output: Documentation Suite

### 1. README.md

```markdown
# [Project Name]

[Brief 1-2 sentence description]

[![CI](https://github.com/org/repo/workflows/CI/badge.svg)](https://github.com/org/repo/actions)
[![Coverage](https://codecov.io/gh/org/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/org/repo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

[2-3 paragraph description of what the project does, why it exists, and who should use it]

**Key Features:**
- Feature 1: [Brief description]
- Feature 2: [Brief description]
- Feature 3: [Brief description]

**Use Cases:**
- Use case 1
- Use case 2

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL 16.x
- Redis 7.x (optional, for caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/org/repo.git
cd repo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

### Basic Example

```typescript
import { createClient } from './client';

const client = createClient({
  apiKey: process.env.API_KEY,
  baseURL: 'https://api.example.com'
});

const result = await client.users.list();
console.log(result);
```

### Advanced Configuration

[More complex examples]

## API Documentation

See [API.md](docs/API.md) for full API reference.

**Quick Reference:**
- `GET /api/users` - List all users
- `POST /api/users` - Create a user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Architecture

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

**High-Level Architecture:**
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │─────▶│   API       │─────▶│  Database   │
│  (React)    │      │  (Express)  │      │ (PostgreSQL)│
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │   Cache     │
                     │   (Redis)   │
                     └─────────────┘
```

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test src/users.test.ts
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Database

```bash
# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback

# Seed database
npm run seed
```

## Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
```bash
# Build for production
npm run build

# Deploy to production
npm run deploy:prod
```

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | - | Yes |
| `API_KEY` | API authentication key | - | Yes |
| `PORT` | Server port | 3000 | No |
| `NODE_ENV` | Environment (development/production) | development | No |
| `REDIS_URL` | Redis connection string | - | No |

See [.env.example](.env.example) for full configuration template.

## Security

- All API endpoints require authentication (JWT)
- Secrets managed via [vault/secrets manager]
- HTTPS enforced in production
- Rate limiting: 100 req/min per IP
- CORS restricted to allowed origins

See [SECURITY.md](SECURITY.md) for security policies and vulnerability reporting.

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Quick Contribution Steps:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit (`git commit -m 'Add my feature'`)
6. Push (`git push origin feature/my-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Documentation:** [https://docs.example.com](https://docs.example.com)
- **Issues:** [GitHub Issues](https://github.com/org/repo/issues)
- **Slack:** [#project-name](https://slack.example.com)
- **Email:** support@example.com

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

## Acknowledgments

- [Library 1](https://lib1.com) - Used for X
- [Library 2](https://lib2.com) - Used for Y

---

**Maintained by:** [Team Name] (@org/team-name)  
**Last Updated:** 2026-02-05
```

---

### 2. ARCHITECTURE.md

```markdown
# Architecture Documentation

## Overview

[High-level description of system architecture]

## Architecture Principles

1. **Separation of Concerns**: Clear boundaries between layers
2. **Scalability**: Horizontal scaling via stateless services
3. **Resilience**: Graceful degradation, circuit breakers
4. **Security**: Zero-trust model, least privilege
5. **Observability**: Structured logging, metrics, distributed tracing

## C4 Model

### Context Diagram (Level 1)

```
                    ┌─────────────────┐
                    │   End Users     │
                    │  (Web/Mobile)   │
                    └────────┬────────┘
                             │
                             │ HTTPS
                             ▼
                    ┌─────────────────┐
                    │    System       │
                    │  [E-commerce    │
                    │   Platform]     │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐
  │  Payment      │  │   Email       │  │   Analytics  │
  │  Gateway      │  │   Service     │  │   Service    │
  │  (Stripe)     │  │  (SendGrid)   │  │ (Segment)    │
  └───────────────┘  └──────────────┘  └──────────────┘
```

### Container Diagram (Level 2)

[Detailed diagram showing containers (apps, databases, services)]

### Component Diagram (Level 3)

[Detailed diagram showing components within a container]

## Technology Stack

### Backend
- **Language:** TypeScript (Node.js 20.x)
- **Framework:** Express 4.18
- **Database:** PostgreSQL 16.x
- **Cache:** Redis 7.x
- **Message Queue:** RabbitMQ 3.12

### Frontend
- **Language:** TypeScript
- **Framework:** React 18
- **State Management:** Zustand
- **Styling:** Tailwind CSS

### Infrastructure
- **Cloud:** AWS (ECS Fargate)
- **IaC:** Terraform
- **Monitoring:** Datadog
- **CI/CD:** GitHub Actions

## System Components

### API Layer

**Responsibilities:**
- Handle HTTP requests
- Authentication/authorization (JWT)
- Input validation
- Rate limiting
- Request/response transformation

**Key Endpoints:**
- `/api/v1/users` - User management
- `/api/v1/products` - Product catalog
- `/api/v1/orders` - Order processing
- `/api/v1/payments` - Payment processing

### Business Logic Layer

**Responsibilities:**
- Core business rules
- Workflow orchestration
- Transaction management
- Integration with external services

**Key Services:**
- `OrderService` - Order lifecycle management
- `PaymentService` - Payment processing
- `InventoryService` - Stock management
- `NotificationService` - Email/SMS notifications

### Data Layer

**Responsibilities:**
- Data persistence
- Query optimization
- Data migrations
- Backup/restore

**Databases:**
- **PostgreSQL** (primary): Transactional data (users, orders, products)
- **Redis** (cache): Session data, rate limiting, caching

### Integration Layer

**Responsibilities:**
- External API integration
- Message queue handling
- Event publishing/subscribing

**Integrations:**
- **Stripe API** - Payment processing
- **SendGrid API** - Email delivery
- **Twilio API** - SMS notifications

## Data Model

### Key Entities

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for complete schema.

## Security Architecture

### Authentication
- JWT tokens (RS256 algorithm)
- Token expiry: 1 hour (access), 7 days (refresh)
- Stored in httpOnly cookies

### Authorization
- Role-Based Access Control (RBAC)
- Roles: `admin`, `user`, `guest`
- Permissions checked per endpoint

### Data Protection
- TLS 1.3 for transport encryption
- AES-256 for data at rest
- PII masked in logs
- Secrets in AWS Secrets Manager

## Scalability

### Horizontal Scaling
- Stateless API servers (ECS Fargate)
- Load balancer (ALB) with health checks
- Auto-scaling based on CPU/memory

### Database Scaling
- Read replicas for read-heavy workloads
- Connection pooling (pgBouncer)
- Query optimization (indexes, EXPLAIN)

### Caching Strategy
- Redis for session data (TTL: 1 hour)
- API response caching (Cache-Control headers)
- CDN for static assets (CloudFront)

## Resilience

### Circuit Breakers
- Implemented for external API calls (Stripe, SendGrid)
- Threshold: 50% error rate in 10s window
- Half-open retry after 30s

### Graceful Degradation
- Essential features continue if cache fails (slower)
- Notifications queued if email service down
- Fallback to default settings if config service unreachable

### Disaster Recovery
- Database backups: Daily (retained 30 days)
- Point-in-time recovery: 5-minute RTO
- Multi-AZ deployment for high availability

## Monitoring & Observability

### Metrics
- Request rate, latency (p50, p95, p99)
- Error rate (5xx errors)
- Database query time
- Cache hit rate

### Logging
- Structured JSON logs (Winston)
- Log levels: ERROR, WARN, INFO, DEBUG
- Centralized logging (CloudWatch Logs)

### Distributed Tracing
- OpenTelemetry instrumentation
- Trace IDs propagated across services
- Visualized in Datadog APM

### Alerting
- PagerDuty integration
- Alert thresholds:
  - Error rate >5% for 5 minutes
  - p99 latency >500ms for 5 minutes
  - CPU utilization >80% for 10 minutes

## Deployment

### Environments
1. **Development** - Local development
2. **Staging** - Pre-production testing
3. **Production** - Live environment

### Deployment Process
1. Code merged to `main` branch
2. CI/CD pipeline runs (tests, linting, build)
3. Docker image built and pushed to ECR
4. Terraform applies infrastructure changes
5. ECS deploys new task definition (rolling update)
6. Health checks validate deployment
7. Rollback automatically if health checks fail

### Rollback Procedure
```bash
# Rollback to previous version
aws ecs update-service --service my-service --task-definition my-task:42
```

## Architecture Decision Records (ADRs)

### ADR-001: Use PostgreSQL for Primary Database

**Status:** Accepted  
**Date:** 2025-12-15

**Context:** Need reliable relational database with ACID guarantees for transactional data.

**Decision:** Use PostgreSQL 16.x as primary database.

**Consequences:**
- **Positive:** ACID compliance, mature ecosystem, excellent performance
- **Negative:** Not ideal for unstructured data (use document store if needed)

### ADR-002: Use Express for API Framework

**Status:** Accepted  
**Date:** 2025-12-20

**Context:** Need lightweight, flexible Node.js web framework.

**Decision:** Use Express 4.18 for API layer.

**Consequences:**
- **Positive:** Large ecosystem, easy to extend, well-documented
- **Negative:** Less opinionated than frameworks like NestJS (requires more boilerplate)

---

**Last Updated:** 2026-02-05  
**Maintainers:** Platform Team (@platform-team)
```

---

### 3. API.md (API Reference)

```markdown
# API Reference

**Base URL:** `https://api.example.com/v1`

**Authentication:** Bearer token (JWT) in `Authorization` header

## Users API

### List Users

```http
GET /api/v1/users
```

**Query Parameters:**
- `page` (int, optional): Page number (default: 1)
- `limit` (int, optional): Results per page (default: 20, max: 100)
- `sort` (string, optional): Sort field (e.g., `created_at:desc`)

**Response:**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - Missing/invalid auth token
- `500 Internal Server Error` - Server error

### Create User

```http
POST /api/v1/users
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174001",
  "email": "newuser@example.com",
  "created_at": "2026-02-05T14:20:00Z"
}
```

**Status Codes:**
- `201 Created` - User created successfully
- `400 Bad Request` - Invalid input (e.g., email already exists)
- `401 Unauthorized` - Missing/invalid auth token

[Continue for all endpoints...]

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

**Error Codes:**
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Auth token missing/invalid
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

## Rate Limiting

- **Limit:** 100 requests per minute per IP
- **Headers:**
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Timestamp when limit resets

## Webhooks

[Webhook documentation if applicable]

---

**Last Updated:** 2026-02-05
```

---

### 4. RUNBOOK.md (Operations)

```markdown
# Operational Runbook

## Overview

This runbook provides step-by-step procedures for common operational tasks and incident response.

## Service Health

### Health Check Endpoints

```bash
# Application health
curl https://api.example.com/health

# Response
{
  "status": "healthy",
  "checks": {
    "database": "healthy",
    "cache": "healthy",
    "queue": "healthy"
  },
  "uptime": 86400
}
```

### Monitoring Dashboards

- **Main Dashboard:** [Datadog Link]
- **Error Tracking:** [Sentry Link]
- **Logs:** [CloudWatch Link]

## Common Issues

### Issue 1: High Latency (p99 >500ms)

**Symptoms:**
- Dashboard shows p99 latency >500ms
- Users report slow response times

**Troubleshooting:**
1. Check database query performance:
   ```bash
   # Connect to database
   psql $DATABASE_URL
   
   # Check slow queries
   SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;
   ```

2. Check cache hit rate:
   ```bash
   redis-cli INFO stats | grep keyspace_hits
   ```

3. Check application logs for slow requests:
   ```bash
   aws logs tail /aws/ecs/my-service --since 10m | grep "duration > 500"
   ```

**Resolution:**
- If database slow: Add indexes, optimize queries
- If cache miss rate high: Review caching strategy
- If application slow: Profile code, check external API calls

**Escalation:** If unresolved in 30 min, page @platform-oncall

---

### Issue 2: 5xx Errors (Error Rate >5%)

**Symptoms:**
- Dashboard shows error rate >5%
- Error tracking shows spike in exceptions

**Troubleshooting:**
1. Check recent deployments:
   ```bash
   aws ecs describe-services --service my-service
   ```

2. Check application logs:
   ```bash
   aws logs tail /aws/ecs/my-service --since 10m --filter-pattern "ERROR"
   ```

3. Check external service status:
   - Stripe: [Status Page]
   - SendGrid: [Status Page]

**Resolution:**
- If deployment-related: Rollback to previous version
  ```bash
  # Rollback deployment
  aws ecs update-service --service my-service --task-definition my-task:previous
  ```
- If external service down: Enable circuit breaker, queue requests
- If application bug: Hotfix and deploy

**Escalation:** Immediate page @platform-oncall if error rate >10%

---

## Deployment Procedures

### Rolling Deployment

```bash
# 1. Build and push Docker image
docker build -t my-app:v1.2.3 .
docker push ecr.region.amazonaws.com/my-app:v1.2.3

# 2. Update task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# 3. Update service (rolling update)
aws ecs update-service --service my-service --task-definition my-task:latest

# 4. Monitor deployment
aws ecs describe-services --service my-service
```

### Rollback

```bash
# Rollback to previous task definition
aws ecs update-service --service my-service --task-definition my-task:42
```

## Database Operations

### Backup

```bash
# Manual backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### Restore

```bash
# Restore from backup
psql $DATABASE_URL < backup-20260205.sql
```

### Migrations

```bash
# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback
```

## On-Call Response

### Incident Response Checklist

1. **Acknowledge Alert** - Acknowledge PagerDuty alert within 5 minutes
2. **Assess Severity** - Determine if SEV-1 (critical), SEV-2 (high), or SEV-3 (medium)
3. **Notify Team** - Post in #incidents Slack channel
4. **Investigate** - Follow runbook for specific issue
5. **Mitigate** - Apply fix or workaround
6. **Monitor** - Verify issue resolved
7. **Document** - Create postmortem (for SEV-1/SEV-2)

### Severity Levels

- **SEV-1:** Production down, data loss, security breach (page immediately)
- **SEV-2:** Major feature unavailable, performance degradation (page during business hours)
- **SEV-3:** Minor issue, no user impact (create ticket, no page)

### Escalation

1. **Level 1:** On-call engineer (responds within 15 min)
2. **Level 2:** Engineering manager (if unresolved in 1 hour)
3. **Level 3:** VP Engineering (if SEV-1 and unresolved in 2 hours)

## Contact Information

- **On-Call:** @platform-oncall (PagerDuty escalation policy)
- **Eng Manager:** manager@example.com
- **VP Engineering:** vp@example.com
- **Security:** security@example.com

---

**Last Updated:** 2026-02-05  
**Maintained by:** Platform Team
```

---

## Documentation Generation Process

### Step 1: Code Analysis

```typescript
// Analyze codebase structure
const analysis = {
  languages: ["TypeScript", "Python", "Rust"],
  frameworks: ["Express", "React", "Prisma"],
  dependencies: readPackageJson(),
  apiEndpoints: extractAPIRoutes(),
  databaseSchema: extractPrismaSchema(),
  testCoverage: readCoverageReport()
};
```

### Step 2: Template Selection

Choose documentation templates based on project type:
- **Web API:** README + ARCHITECTURE + API.md + RUNBOOK.md
- **Library:** README + API.md (detailed)
- **CLI Tool:** README + USAGE.md
- **Infrastructure:** README + RUNBOOK.md + DEPLOYMENT.md

### Step 3: Content Generation

Generate documentation sections:
1. **README:** Quick start, usage examples, configuration
2. **ARCHITECTURE:** C4 diagrams, tech stack, data model
3. **API:** Endpoint documentation (OpenAPI if available)
4. **RUNBOOK:** Troubleshooting, incident response

### Step 4: Validation

Validate generated documentation:
- Code examples run without errors
- Links resolve correctly
- Required sections present
- Consistent formatting

### Step 5: Version Control

Commit documentation to repository:
```bash
git add README.md ARCHITECTURE.md API.md RUNBOOK.md
git commit -m "docs: Auto-generate project documentation"
```

---

## Integration with SDLC Swarm

### Position Card Output

```yaml
position_card:
  agent: documentation
  
  claims:
    - "Generated README.md with quick start guide (250 lines)"
    - "Created ARCHITECTURE.md with C4 diagrams and ADRs (400 lines)"
    - "Generated API.md with 12 endpoint references (300 lines)"
    - "Created RUNBOOK.md with incident response procedures (350 lines)"
  
  plan:
    - "README covers installation, usage, configuration"
    - "ARCHITECTURE documents all system components"
    - "API reference auto-generated from OpenAPI spec"
    - "RUNBOOK includes troubleshooting for top 5 issues"
  
  evidence_pointers:
    - "projects/my-app/README.md"
    - "projects/my-app/docs/ARCHITECTURE.md"
    - "projects/my-app/docs/API.md"
    - "projects/my-app/docs/RUNBOOK.md"
  
  confidence: 0.90
  risks:
    - "Code examples not tested (manual validation needed)"
    - "Runbook assumes AWS infrastructure (adjust for other clouds)"
```

---

## Rules (Non-Negotiable)

1. **Always Up-to-Date:** Documentation regenerated on every major code change

2. **Runnable Examples:** All code examples must be tested and work without modification

3. **Audience-Specific:** Separate docs for developers (API.md) vs operators (RUNBOOK.md)

4. **Diagrams Required:** Architecture docs must include visual diagrams (C4, sequence, ERD)

5. **Searchable:** Use clear headings, tables of contents, keyword-rich descriptions

6. **Versioned:** Documentation version matches code version (CHANGELOG.md tracks changes)

7. **Links Validated:** All internal/external links must resolve (checked via CI)

---

## Skills Validated

- **C2: Spec + TDD Lifecycle** - Documentation as part of definition of done
- **C5: SDLC Workflows** - Automated docs generation in CI/CD pipeline
- **C10: Continuous Learning** - Knowledge capture and transfer via docs

---

## Invariants Satisfied

- **INV-036:** Code quality standards (documentation completeness)
- **INV-038:** Knowledge management (centralized documentation)
- **INV-039:** Operational readiness (runbooks for incident response)

---

**End of Documentation Agent Skill**
