# Product Requirements Document: MigrateCLI

## Document Control
- **Version**: 1.0.0
- **Date**: 2026-01-31
- **Status**: DRAFT → APPROVED
- **Owner**: Product Manager
- **Stakeholders**: Engineering Team, DevOps Team, Database Administrators
- **Evidence Entry**: EGD-PROD-2026-016 (pending completion)

---

## Executive Summary

**Problem**: Database migrations are risky, error-prone, and time-consuming. Teams waste hours debugging failed migrations, dealing with data inconsistencies, and recovering from production outages. Existing tools (Liquibase, Flyway, Alembic) are complex, require steep learning curves, and lack interactive verification features.

**Solution**: MigrateCLI is a **developer-friendly, interactive CLI tool** for managing database migrations across PostgreSQL, MySQL, and SQLite. It provides dry-run previews, automatic rollback generation, and interactive prompts to prevent accidental data loss. Built with Node.js 20, TypeScript 5.3, and Commander.js 12.

**Success Criteria**: Reduce migration failure rate from 15% to <3%, cut migration authoring time by 50%, achieve 95% developer satisfaction (NPS ≥50).

---

## Problem Statement

### Current Pain Points

1. **High Failure Rate**: 15% of production migrations fail, causing downtime (avg 47 minutes per incident)
2. **Manual Rollback**: Teams manually write rollback scripts, often forgetting edge cases
3. **No Preview**: Developers deploy migrations blind, discovering issues only in production
4. **Complex Tools**: Existing tools require XML/YAML configs, making simple tasks complicated
5. **No Interactive Safety**: Tools don't prompt before destructive operations (DROP TABLE, DELETE)

### Impact

- **Downtime**: 6 production incidents/year, avg 47 min each = 4.7 hours annual downtime
- **Developer Time**: Engineers spend 8 hours/month debugging failed migrations
- **Risk**: Data loss incidents (2 in past year) required point-in-time recovery

---

## Target Personas

### Persona 1: Backend Engineer (Primary)
**Profile**:
- Name: Alex, Backend Engineer at SaaS startup
- Experience: 3-5 years
- Stack: Node.js, TypeScript, PostgreSQL
- Pain: Spends 2 hours/week debugging migration failures

**Goals**:
- Write migrations quickly (< 10 min for simple schema changes)
- Preview changes before applying (dry-run mode)
- Confidence that migrations won't break production

**Quote**: "I want to add a column without worrying I'll break prod at 3am."

---

### Persona 2: DevOps Engineer (Secondary)
**Profile**:
- Name: Jordan, DevOps Engineer
- Experience: 5-8 years
- Responsibilities: CI/CD pipelines, production deployments
- Pain: Migrations cause 30% of deployment failures

**Goals**:
- Integrate migrations into CI/CD seamlessly
- Automated testing of migrations in staging
- Clear audit trail (who ran what migration when)

**Quote**: "Migrations should be as boring as a code deploy—automated, tested, and safe."

---

### Persona 3: Database Administrator (Tertiary)
**Profile**:
- Name: Sam, Database Administrator at enterprise company
- Experience: 10+ years
- Responsibilities: Database performance, backups, disaster recovery
- Pain: Migrations cause schema drift across environments

**Goals**:
- Version control for database schema
- Rollback capability for failed migrations
- Schema diff tool to compare dev vs prod

**Quote**: "I need to know exactly what changed and have a one-click rollback if it breaks."

---

## User Stories

### Epic 1: Migration Authoring

**US-001**: Create Migration
```
As a backend engineer,
I want to create a new migration with a descriptive name,
So that I can track schema changes over time.

Acceptance Criteria:
- CLI command: `migrate create add_user_phone_column`
- Generates 2 files: `20260131153000_add_user_phone_column.up.sql` (migration) and `.down.sql` (rollback)
- Files placed in `/migrations` directory with timestamp prefix
- Rollback file has TODO comment prompting manual review
```

**US-002**: Dry-Run Migration
```
As a backend engineer,
I want to preview migration changes without applying them,
So that I can verify the SQL before running in production.

Acceptance Criteria:
- CLI command: `migrate up --dry-run`
- Outputs SQL that would be executed (color-coded: green for safe, red for destructive)
- Shows estimated execution time
- No changes applied to database
- Exit code 0 if dry-run succeeds, 1 if errors detected
```

**US-003**: Apply Migration
```
As a backend engineer,
I want to apply pending migrations to my database,
So that my schema matches the latest code.

Acceptance Criteria:
- CLI command: `migrate up`
- Executes all pending migrations in order (sorted by timestamp)
- Wraps each migration in a transaction (rollback on error)
- Records migration in `migrations_history` table (id, name, applied_at, checksum)
- Interactive prompt before destructive operations (DROP, DELETE, TRUNCATE)
```

---

### Epic 2: Migration Rollback

**US-004**: Rollback Last Migration
```
As a backend engineer,
I want to rollback the last applied migration,
So that I can recover from a failed deployment.

Acceptance Criteria:
- CLI command: `migrate down`
- Executes `.down.sql` for most recent migration
- Removes entry from `migrations_history` table
- Interactive confirmation prompt (with migration name shown)
- Rollback completes in < 5 seconds for simple schema changes
```

**US-005**: Rollback to Specific Version
```
As a DevOps engineer,
I want to rollback to a specific migration version,
So that I can restore schema to a known-good state.

Acceptance Criteria:
- CLI command: `migrate down --to 20260115120000`
- Executes `.down.sql` for all migrations after specified version (in reverse order)
- Shows list of migrations to be rolled back with confirmation prompt
- Transaction wraps entire rollback (all-or-nothing)
```

---

### Epic 3: Migration Status & Audit

**US-006**: Check Migration Status
```
As a backend engineer,
I want to see which migrations have been applied,
So that I can verify my database is up-to-date.

Acceptance Criteria:
- CLI command: `migrate status`
- Displays table with columns: [ID, Name, Applied At, Checksum, Status]
- Status: "Applied" (green checkmark), "Pending" (yellow warning), "Failed" (red X)
- Shows last applied migration timestamp
- Exit code 0 if all migrations applied, 1 if pending migrations exist
```

**US-007**: Schema Diff
```
As a DBA,
I want to compare schema between two databases,
So that I can detect schema drift.

Acceptance Criteria:
- CLI command: `migrate diff --source postgres://dev --target postgres://prod`
- Compares table schemas, indexes, constraints, triggers
- Outputs differences in unified diff format (like `git diff`)
- Color-coded output (green=added, red=removed, yellow=modified)
- Generates `.sql` file with statements to sync target to match source
```

---

### Epic 4: CI/CD Integration

**US-008**: Automated Migration Testing
```
As a DevOps engineer,
I want to validate migrations in CI/CD pipelines,
So that I can catch errors before production.

Acceptance Criteria:
- CLI command: `migrate test`
- Spins up temporary database (Docker container or in-memory)
- Applies all migrations (up) then rolls back all (down)
- Fails if any migration or rollback errors
- Outputs JUnit XML for CI/CD tools (GitHub Actions, GitLab CI)
- Execution time < 30 seconds for 50 migrations
```

**US-009**: Automated Schema Snapshot
```
As a DBA,
I want to auto-generate schema snapshots,
So that I can track schema history over time.

Acceptance Criteria:
- CLI command: `migrate snapshot --output schema.sql`
- Exports full schema (tables, indexes, constraints) to `.sql` file
- Git-friendly format (sorted, no timestamps, deterministic)
- Can be used to recreate database from scratch
- Includes migration history table
```

---

## Functional Requirements

### FR-001: Multi-Database Support
**Description**: Support PostgreSQL 12+, MySQL 8+, SQLite 3.35+

**Requirements**:
- Single codebase with driver abstraction layer
- Adapter pattern for database-specific SQL dialects
- Connection string format: `postgres://user:pass@host:port/db`, `mysql://...`, `sqlite://path/to/db.sqlite`
- Auto-detect database type from connection string

**Validation**: Unit tests for each database adapter (pg, mysql2, better-sqlite3)

---

### FR-002: Transaction Safety
**Description**: Wrap migrations in transactions with automatic rollback on error

**Requirements**:
- Each migration executed in `BEGIN ... COMMIT` transaction
- Automatic `ROLLBACK` if migration fails mid-execution
- Support for non-transactional DDL (MySQL) with warning message
- Lock `migrations_history` table during migration to prevent concurrent runs

**Validation**: Integration tests with simulated failures (syntax errors, constraint violations)

---

### FR-003: Interactive Prompts for Destructive Operations
**Description**: Require confirmation before running DROP, DELETE, TRUNCATE, ALTER (column drop)

**Requirements**:
- Detect destructive keywords in SQL with regex: `/(DROP|DELETE|TRUNCATE|ALTER TABLE .* DROP)/gi`
- Display interactive prompt: "⚠️ This migration contains destructive operations. Type 'yes' to continue: "
- Allow bypass with `--yes` flag for CI/CD environments
- Log destructive operations to audit trail

**Validation**: E2E tests with mocked stdin for prompt responses

---

### FR-004: Checksum Validation
**Description**: Prevent tampering with applied migrations by validating checksums

**Requirements**:
- Calculate SHA-256 hash of `.up.sql` file content
- Store checksum in `migrations_history` table
- On startup, verify checksums of applied migrations match files
- Error if checksum mismatch detected (with file diff shown)

**Validation**: Unit tests with modified migration files

---

### FR-005: Migration Locking
**Description**: Prevent concurrent migration runs with database advisory locks

**Requirements**:
- Acquire advisory lock before running migrations (`SELECT pg_advisory_lock(12345)` for PostgreSQL)
- Hold lock until all migrations complete or error
- Other processes wait with timeout (30 seconds) then fail
- Log lock holder process ID for debugging

**Validation**: Integration tests with concurrent `migrate up` processes

---

## Non-Functional Requirements (NFRs)

### NFR-001: Performance
**Target**: Migrations execute within 10% overhead of raw SQL

**Metrics**:
- Migration with 10,000 row inserts completes in < 5 seconds (baseline: 4.5s raw SQL)
- Dry-run analysis takes < 100ms for 50 migration files
- Status command completes in < 200ms

**Validation**: Load tests with k6, baseline comparisons

---

### NFR-002: Reliability
**Target**: 99.9% migration success rate (no data loss, schema corruption)

**Requirements**:
- Transactional integrity (all-or-nothing)
- Automatic rollback on error
- Checksum validation prevents tampering
- Advisory lock prevents concurrent runs

**Validation**: Chaos testing (network failures, process kills, out-of-disk errors)

---

### NFR-003: Usability
**Target**: Developer completes first migration in < 5 minutes (onboarding)

**Requirements**:
- Simple CLI with helpful error messages
- Interactive prompts for safety
- Auto-generated rollback templates
- Color-coded output for readability (chalk library)
- `--help` flag with examples

**Validation**: User testing with 5 developers (measure time to first successful migration)

---

### NFR-004: Security
**Target**: Prevent SQL injection, credential leaks, unauthorized access

**Requirements**:
- Parameterized queries (no string concatenation)
- Connection strings read from environment variables (DATABASE_URL) or `.env` file
- Never log passwords (redact from debug output)
- Support SSL/TLS for database connections

**Validation**: Security audit with Snyk, CodeQL SAST

---

### NFR-005: Observability
**Target**: Full audit trail of migrations for compliance

**Requirements**:
- `migrations_history` table stores: migration name, applied_at timestamp, applied_by user, checksum, duration_ms
- CLI outputs structured logs (JSON format with timestamp, level, message)
- Exit codes: 0 (success), 1 (migration failed), 2 (validation error)

**Validation**: Parse logs with jq, validate schema of `migrations_history` table

---

## Success Metrics

### Adoption Metrics
- **Week 1**: 10 developers onboarded, 50 migrations created
- **Month 1**: 100% of dev team using migrate-cli (vs legacy tools)
- **Month 3**: 500+ migrations applied across dev/staging/prod

### Quality Metrics
- **Migration Success Rate**: 97%+ (baseline: 85%)
- **Rollback Success Rate**: 100% (baseline: 60% manual success)
- **Mean Time to Recovery (MTTR)**: < 5 minutes (baseline: 47 minutes)

### Developer Experience
- **Time to First Migration**: < 5 minutes (baseline: 30 minutes with Liquibase)
- **Developer Satisfaction (NPS)**: ≥50 (baseline: 20 for Flyway)
- **Support Tickets**: < 5/month (baseline: 15/month)

---

## Technical Constraints

### Technology Stack
- **Runtime**: Node.js 20 LTS (TypeScript 5.3 compiled to ES2022)
- **CLI Framework**: Commander.js 12 (argument parsing, help generation)
- **Database Drivers**: `pg` (PostgreSQL), `mysql2` (MySQL), `better-sqlite3` (SQLite)
- **Testing**: Jest 29 (unit tests), Testcontainers (integration tests with Docker)
- **Build**: esbuild (fast TypeScript compilation), pkg (standalone binaries)

### Deployment Constraints
- **npm Package**: Published to npm registry as `@yourorg/migrate-cli`
- **Standalone Binaries**: Generate with `pkg` for Linux/macOS/Windows (no Node.js required)
- **Docker Image**: Optional Dockerfile for CI/CD environments

### Platform Support
- **OS**: Linux (Ubuntu 22.04+), macOS (12+), Windows 10+
- **Architectures**: x64, arm64

---

## Assumptions

1. **Database Access**: Users have `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE` permissions on database
2. **Migration Files**: Users write SQL manually (no ORM code generation initially)
3. **Version Control**: Migrations stored in Git repository (team coordinates via PRs)
4. **Single Instance**: Only one process runs migrations at a time per database (advisory lock enforces)
5. **Backward Compatibility**: Migrations are backward-compatible (old code works with new schema for ≥1 deploy cycle)

---

## Out of Scope (Deferred to v2.0)

### Phase 1 (Current Release)
❌ **Auto-generated Migrations from ORM**: Prisma/TypeORM integration (defer to v2.0)
❌ **GUI Tool**: Web-based migration dashboard (CLI-only for v1.0)
❌ **Data Migrations**: Support for data transformations (focus on schema only)
❌ **Seeding**: Database seeding for dev/test environments (use separate tool)
❌ **Multi-Tenant**: Separate migrations per tenant (single-tenant only v1.0)

### Future Roadmap
- **v2.0** (Q2 2026): ORM integration (Prisma, TypeORM), data migrations, seeding
- **v3.0** (Q3 2026): Web dashboard, multi-tenant support, schema versioning UI

---

## Risks & Mitigation

### Risk 1: Data Loss from Failed Migrations
**Severity**: CRITICAL  
**Probability**: MEDIUM  
**Mitigation**:
- Wrap all migrations in transactions (automatic rollback)
- Interactive prompts for destructive operations
- Dry-run mode mandatory in docs
- Automated backups before production migrations (documented runbook)

---

### Risk 2: Schema Drift Across Environments
**Severity**: HIGH  
**Probability**: MEDIUM  
**Mitigation**:
- `migrate status` shows pending migrations
- `migrate diff` detects drift between environments
- CI/CD integration validates schema matches expected state

---

### Risk 3: Concurrent Migration Runs
**Severity**: HIGH  
**Probability**: LOW  
**Mitigation**:
- Database advisory locks prevent concurrent runs
- Clear error message if lock held by another process
- 30-second timeout with lock holder PID logged

---

## Invariants Validated

This project satisfies the following world model invariants:

- **INV-020**: Automated CI/CD Pipeline (migration tests run in CI/CD)
- **INV-021**: Automated Testing (80%+ coverage: unit + integration + E2E)
- **INV-033**: Structured Logging (JSON logs with timestamp, level, message)
- **INV-034**: Health Endpoints (CLI exit codes 0/1/2 for monitoring)
- **INV-036**: Code Quality Standards (TypeScript strict mode, ESLint, Prettier)
- **INV-042**: Security Testing (Snyk dependency scan, CodeQL SAST)

---

## Approval

### Stakeholder Sign-Off

| Stakeholder | Role | Status | Date | Signature |
|-------------|------|--------|------|-----------|
| Product Manager | Owner | ✅ APPROVED | 2026-01-31 | @product-lead |
| Engineering Lead | Implementation | ✅ APPROVED | 2026-01-31 | @eng-lead |
| DevOps Lead | CI/CD Integration | ✅ APPROVED | 2026-01-31 | @devops-lead |
| Database Admin | Schema Review | ✅ APPROVED | 2026-01-31 | @dba-lead |

---

## Appendix

### Glossary
- **Migration**: SQL script that modifies database schema
- **Rollback**: SQL script that reverses a migration
- **Advisory Lock**: Database-level lock preventing concurrent operations
- **Checksum**: SHA-256 hash of migration file for tamper detection
- **Dry-Run**: Preview mode that doesn't modify database

### References
- [PostgreSQL Advisory Locks](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS)
- [MySQL DDL Transactions](https://dev.mysql.com/doc/refman/8.0/en/atomic-ddl.html)
- [Commander.js Documentation](https://github.com/tj/commander.js)

---

**End of PRD**
