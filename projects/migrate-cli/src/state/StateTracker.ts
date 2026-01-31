/**
 * State Tracker
 * 
 * Tracks which migrations have been applied by reading/writing the migrations_history table.
 * Provides methods to query, mark applied, and mark rolled back.
 * 
 * Architecture: Component Diagram - StateTracker Component
 */

import { IDatabaseAdapter, AppliedMigration, MigrationStatus, ILogger } from '../types';

export class StateTracker {
  constructor(
    private readonly adapter: IDatabaseAdapter,
    private readonly logger: ILogger
  ) {}
  
  /**
   * Ensure migrations_history table exists.
   * Safe to call multiple times (creates if not exists).
   */
  async ensureTable(): Promise<void> {
    await this.adapter.ensureMigrationsTable();
  }
  
  /**
   * Get all applied migrations from migrations_history table.
   * @returns Array of applied migrations sorted by applied_at DESC
   */
  async getAppliedMigrations(): Promise<AppliedMigration[]> {
    const rows = await this.adapter.executeQuery<
      Array<{
        id: number;
        name: string;
        applied_at: string | Date;
        applied_by: string;
        checksum: string;
        duration_ms: number;
        status: string;
        error_message: string | null;
      }>
    >('SELECT * FROM migrations_history ORDER BY applied_at DESC');
    
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      appliedAt: typeof row.applied_at === 'string' ? new Date(row.applied_at) : row.applied_at,
      appliedBy: row.applied_by,
      checksum: row.checksum,
      durationMs: row.duration_ms,
      status: row.status as MigrationStatus,
      errorMessage: row.error_message,
    }));
  }
  
  /**
   * Get set of applied migration names for quick lookups.
   * @returns Set of migration names
   */
  async getAppliedNames(): Promise<Set<string>> {
    const applied = await this.getAppliedMigrations();
    return new Set(applied.map((m) => m.name));
  }
  
  /**
   * Mark a migration as successfully applied.
   * @param name Migration name
   * @param checksum SHA-256 checksum
   * @param durationMs Execution time in milliseconds
   * @param appliedBy OS username or $USER env var
   */
  async markApplied(
    name: string,
    checksum: string,
    durationMs: number,
    appliedBy: string
  ): Promise<void> {
    this.logger.info('Marking migration as applied', {
      migration: name,
      durationMs,
    });
    
    await this.adapter.executeQuery(
      `INSERT INTO migrations_history (name, checksum, duration_ms, applied_by, status)
       VALUES (?, ?, ?, ?, 'SUCCESS')`,
      [name, checksum, durationMs, appliedBy]
    );
  }
  
  /**
   * Mark a migration as failed.
   * @param name Migration name
   * @param checksum SHA-256 checksum
   * @param durationMs Execution time in milliseconds
   * @param errorMessage Error message
   * @param appliedBy OS username or $USER env var
   */
  async markFailed(
    name: string,
    checksum: string,
    durationMs: number,
    errorMessage: string,
    appliedBy: string
  ): Promise<void> {
    this.logger.error('Marking migration as failed', {
      migration: name,
      durationMs,
      error: errorMessage,
    });
    
    await this.adapter.executeQuery(
      `INSERT INTO migrations_history (name, checksum, duration_ms, error_message, applied_by, status)
       VALUES (?, ?, ?, ?, ?, 'FAILED')`,
      [name, checksum, durationMs, errorMessage, appliedBy]
    );
  }
  
  /**
   * Mark a migration as rolled back.
   * Deletes the row from migrations_history table.
   * @param name Migration name
   */
  async markRolledBack(name: string): Promise<void> {
    this.logger.info('Marking migration as rolled back', {
      migration: name,
    });
    
    await this.adapter.executeQuery(
      'DELETE FROM migrations_history WHERE name = ?',
      [name]
    );
  }
  
  /**
   * Get the last applied migration.
   * @returns Last applied migration or null if none
   */
  async getLastApplied(): Promise<AppliedMigration | null> {
    const applied = await this.getAppliedMigrations();
    return applied.length > 0 ? applied[0] : null;
  }
}
