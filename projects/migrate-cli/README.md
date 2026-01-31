# MigrateCLI

Database migration management CLI tool for PostgreSQL, MySQL, and SQLite.

## Features

- ✅ **Multi-Database Support** - PostgreSQL 12+, MySQL 8+, SQLite 3.35+
- ✅ **Transaction Safety** - Automatic rollback on errors (ADR-003)
- ✅ **Checksum Validation** - Detects modified migrations (SHA-256)
- ✅ **Advisory Locks** - Prevents concurrent migration runs (ADR-005)
- ✅ **Dry-Run Mode** - Preview changes before applying
- ✅ **Structured Logging** - JSON logs with winston (NFR-005)

## Quick Start

### Installation

```bash
npm install -g @yourorg/migrate-cli
```

### Initialize Project

```bash
# Create migrate.json and migrations directory
migrate init

# Set database connection
export DATABASE_URL="postgres://user:password@localhost:5432/myapp"
```

### Create Migration

```bash
# Generate migration files
migrate create add_user_phone_column

# Edit files:
#   migrations/20260131153000_add_user_phone_column.up.sql
#   migrations/20260131153000_add_user_phone_column.down.sql
```

### Apply Migrations

```bash
# Preview changes (dry-run)
migrate up --dry-run

# Apply all pending migrations
migrate up

# Apply only next 3 migrations
migrate up --count 3
```

### Rollback Migrations

```bash
# Rollback last migration
migrate down

# Rollback last 3 migrations
migrate down --count 3
```

### Check Status

```bash
# Show applied vs pending migrations
migrate status

# JSON output (for CI/CD)
migrate status --json
```

## Configuration

### migrate.json

```json
{
  "databaseUrl": "postgres://user:password@localhost:5432/myapp",
  "migrationsDir": "./migrations",
  "lockKey": 12345,
  "lockTimeout": 30,
  "transactionMode": "auto",
  "logging": {
    "level": "info",
    "format": "text"
  }
}
```

### Environment Variables

- `DATABASE_URL` - Database connection string (required)
- `MIGRATIONS_DIR` - Migrations directory (default: `./migrations`)
- `LOCK_KEY` - Advisory lock key (default: `12345`)
- `LOCK_TIMEOUT` - Lock timeout in seconds (default: `30`)
- `LOG_LEVEL` - Log level: debug, info, warn, error (default: `info`)

## Connection Strings

### PostgreSQL
```
postgres://user:password@host:5432/database
```

### MySQL
```
mysql://user:password@host:3306/database
```

### SQLite
```
sqlite://path/to/database.sqlite
```

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for C4 diagrams, ADRs, and technical details.

### Technology Stack

- **Runtime**: Node.js 20 LTS + TypeScript 5.3
- **CLI Framework**: Commander.js 12
- **Database Drivers**: pg (PostgreSQL), mysql2 (MySQL), better-sqlite3 (SQLite)
- **Testing**: Jest 29 + Testcontainers
- **Build**: esbuild (fast TypeScript compilation)

### Architecture Decisions

- **ADR-001**: TypeScript with strict mode for type safety
- **ADR-002**: Commander.js for CLI (<100ms startup)
- **ADR-003**: Transaction-based migrations (automatic rollback)
- **ADR-004**: Database adapter pattern (single codebase, 3 databases)
- **ADR-005**: Advisory locks for concurrency control

## Development

### Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev up

# Run tests
npm test

# Run tests with coverage (requires ≥80%)
npm run test:coverage

# Lint and type-check
npm run lint
npm run type-check
```

### Build

```bash
# Build CLI tool
npm run build

# Output: dist/cli.js
```

### Testing

```bash
# Unit tests
npm test

# Integration tests (requires Docker for Testcontainers)
npm run test:integration

# Coverage report
npm run test:coverage
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Migrations
on: [push]

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          npm install -g @yourorg/migrate-cli
          migrate up --yes
```

### Exit Codes

- `0` - Success (all migrations applied)
- `1` - Failure (migration error, rollback error)
- `2` - Validation error (checksum mismatch, lock timeout)

## Troubleshooting

### Lock Timeout

```
Error: Failed to acquire migration lock (key: 12345, timeout: 30s)
```

**Cause**: Another migration process is running.

**Solution**: Wait for the other process to complete, or increase `LOCK_TIMEOUT`.

### Checksum Mismatch

```
Error: Checksum mismatch for migration: 20260131153000_create_users
```

**Cause**: Migration file was modified after being applied.

**Solution**: Revert file to original content (Git: `git checkout <file>`), or create a new migration.

### MySQL DDL Transaction Warning

```
Warning: MySQL DDL statements cause implicit commit. Transaction rollback may not be complete.
```

**Cause**: MySQL DDL (CREATE TABLE, ALTER TABLE) causes implicit commit, breaking transaction guarantees.

**Solution**: Keep migrations small (1 table per migration), test in staging environment.

## License

MIT

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Solution architecture with C4 diagrams
- [PRD.md](PRD.md) - Product requirements and user stories
- [VERIFICATION_RECEIPT_PRD.md](VERIFICATION_RECEIPT_PRD.md) - PRD verification (10/10 checks PASS)
- [VERIFICATION_RECEIPT_ARCH.md](VERIFICATION_RECEIPT_ARCH.md) - Architecture verification (12/12 checks PASS)

## Support

Report issues: https://github.com/yourorg/migrate-cli/issues
