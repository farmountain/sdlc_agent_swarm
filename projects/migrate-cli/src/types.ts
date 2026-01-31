/**
 * Core type definitions for MigrateCLI
 * 
 * This file defines the interfaces and types used throughout the migration system.
 * All types follow TypeScript strict mode (ADR-001).
 */

/**
 * Migration represents a single database schema change.
 * Migrations are loaded from .sql files in the migrations directory.
 */
export interface Migration {
  /** Unique name with timestamp prefix (e.g., 20260131153000_create_users) */
  name: string;
  
  /** Absolute file path to .up.sql file */
  upFilePath: string;
  
  /** Absolute file path to .down.sql file */
  downFilePath: string;
  
  /** SQL content to apply (from .up.sql) */
  upSql: string;
  
  /** SQL content to rollback (from .down.sql) */
  downSql: string;
  
  /** SHA-256 checksum of .up.sql file content */
  checksum: string;
  
  /** Timestamp extracted from filename (YYYYMMDDHHMMSS) */
  timestamp: number;
}

/**
 * AppliedMigration represents a migration that has been executed.
 * This is stored in the migrations_history table.
 */
export interface AppliedMigration {
  /** Database-generated ID */
  id: number;
  
  /** Migration name (matches Migration.name) */
  name: string;
  
  /** When the migration was applied (ISO 8601 timestamp) */
  appliedAt: Date;
  
  /** OS username or $USER env var */
  appliedBy: string;
  
  /** SHA-256 checksum (must match Migration.checksum) */
  checksum: string;
  
  /** Execution time in milliseconds */
  durationMs: number;
  
  /** Migration status */
  status: MigrationStatus;
  
  /** Error message if status is FAILED, null otherwise */
  errorMessage: string | null;
}

/**
 * Migration execution status
 */
export type MigrationStatus = 'SUCCESS' | 'FAILED' | 'ROLLED_BACK';

/**
 * Configuration loaded from migrate.json or environment variables
 */
export interface MigrateConfig {
  /** Database connection string (postgres://, mysql://, sqlite://) */
  databaseUrl: string;
  
  /** Directory containing migration .sql files (default: ./migrations) */
  migrationsDir: string;
  
  /** Advisory lock key for PostgreSQL (default: 12345) */
  lockKey: number;
  
  /** Advisory lock timeout in seconds (default: 30) */
  lockTimeout: number;
  
  /** Transaction mode: auto (wrap each migration) or manual */
  transactionMode: 'auto' | 'manual';
  
  /** Logging configuration */
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text';
    outputFile?: string;
  };
}

/**
 * Database type detected from connection string
 */
export type DatabaseType = 'postgres' | 'mysql' | 'sqlite';

/**
 * Migration execution result
 */
export interface MigrationResult {
  /** Migration that was executed */
  migration: Migration;
  
  /** Execution time in milliseconds */
  durationMs: number;
  
  /** Whether execution succeeded */
  success: boolean;
  
  /** Error if execution failed, undefined otherwise */
  error?: Error;
}

/**
 * CLI command options for migrate up
 */
export interface UpOptions {
  /** Number of migrations to apply (default: all pending) */
  count?: number;
  
  /** Apply migrations up to this one (by name or timestamp) */
  to?: string;
  
  /** Preview changes without applying */
  dryRun: boolean;
  
  /** Skip interactive prompts (for CI/CD) */
  yes: boolean;
}

/**
 * CLI command options for migrate down
 */
export interface DownOptions {
  /** Number of migrations to rollback (default: 1) */
  count?: number;
  
  /** Rollback down to this migration (by name or timestamp) */
  to?: string;
  
  /** Skip interactive prompts (for CI/CD) */
  yes: boolean;
}

/**
 * CLI command options for migrate status
 */
export interface StatusOptions {
  /** Output format */
  format: 'table' | 'json';
}

/**
 * CLI command options for migrate test
 */
export interface TestOptions {
  /** Output JUnit XML for CI/CD integration */
  junit?: string;
}

/**
 * Migration status summary
 */
export interface MigrationStatusSummary {
  /** Applied migrations */
  applied: AppliedMigration[];
  
  /** Pending migrations (not yet applied) */
  pending: Migration[];
  
  /** Summary statistics */
  summary: {
    appliedCount: number;
    pendingCount: number;
    lastApplied?: AppliedMigration;
  };
}

/**
 * Database adapter interface (ADR-004)
 * 
 * This interface abstracts database-specific operations to support
 * PostgreSQL, MySQL, and SQLite with a single codebase.
 */
export interface IDatabaseAdapter {
  /** Database type (used for logging and error messages) */
  readonly databaseType: DatabaseType;
  
  /**
   * Connect to database using connection string.
   * @throws Error if connection fails
   */
  connect(connectionString: string): Promise<void>;
  
  /**
   * Disconnect from database.
   * Closes all open connections and releases resources.
   */
  disconnect(): Promise<void>;
  
  /**
   * Execute SQL query with optional parameters.
   * Parameters are automatically escaped to prevent SQL injection.
   * @param sql SQL statement (use $1, $2 for PostgreSQL; ? for MySQL/SQLite)
   * @param params Optional parameters for prepared statement
   * @returns Query result (database-specific format)
   */
  executeQuery<T = unknown>(sql: string, params?: unknown[]): Promise<T>;
  
  /**
   * Begin database transaction.
   * @throws Error if transaction already in progress
   */
  beginTransaction(): Promise<void>;
  
  /**
   * Commit current transaction.
   * @throws Error if no transaction in progress
   */
  commit(): Promise<void>;
  
  /**
   * Rollback current transaction.
   * Safe to call even if no transaction in progress (no-op).
   */
  rollback(): Promise<void>;
  
  /**
   * Acquire advisory lock to prevent concurrent migrations.
   * Blocks until lock is acquired or timeout expires.
   * @param key Lock key (integer for PostgreSQL, string for MySQL)
   * @param timeoutSeconds Timeout in seconds (default: 30)
   * @throws Error if lock timeout expires
   */
  acquireLock(key: number, timeoutSeconds: number): Promise<void>;
  
  /**
   * Release advisory lock.
   * Safe to call even if lock not held (no-op).
   */
  releaseLock(key: number): Promise<void>;
  
  /**
   * Ensure migrations_history table exists.
   * Creates table if it doesn't exist, no-op if it already exists.
   */
  ensureMigrationsTable(): Promise<void>;
}

/**
 * Logger interface for structured logging
 */
export interface ILogger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}
