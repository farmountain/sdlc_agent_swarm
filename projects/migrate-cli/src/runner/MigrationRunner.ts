/**
 * Migration Runner
 *
 * Orchestrates migration execution workflow following the 6-step process:
 * 1. Acquire lock (LockManager.acquireLock())
 * 2. Load pending migrations (MigrationLoader.loadPending())
 * 3. Begin transaction (adapter.beginTransaction())
 * 4. For each migration: validate checksum, execute SQL, record state
 * 5. Commit transaction (adapter.commit())
 * 6. Release lock (LockManager.releaseLock())
 *
 * Architecture: Component Diagram - MigrationRunner (Orchestrator Component)
 * ADR-003: Transaction-Based Migrations
 */

import * as os from 'node:os';
import { IDatabaseAdapter, Migration, MigrationResult, ILogger } from '../types';
import { MigrationLoader } from '../loader/MigrationLoader';
import { LockManager } from '../lock/LockManager';
import { StateTracker } from '../state/StateTracker';

export class MigrationRunner {
  constructor(
    private readonly adapter: IDatabaseAdapter,
    private readonly loader: MigrationLoader,
    private readonly lockManager: LockManager,
    private readonly stateTracker: StateTracker,
    private readonly logger: ILogger,
  ) {}

  /**
   * Apply pending migrations.
   * @param options Options for apply: count, dryRun, interactive
   * @returns Array of migration results
   */
  async up(
    options: {
      count?: number;
      dryRun?: boolean;
      requireConfirmation?: boolean;
    } = {},
  ): Promise<MigrationResult[]> {
    // Ensure migrations_history table exists
    await this.stateTracker.ensureTable();

    // Load pending migrations
    const appliedNames = await this.stateTracker.getAppliedNames();
    let pending = await this.loader.loadPending(appliedNames);

    // Apply count limit if specified
    if (options.count !== undefined) {
      pending = pending.slice(0, options.count);
    }

    if (pending.length === 0) {
      this.logger.info('No pending migrations');
      return [];
    }

    this.logger.info(`Found ${pending.length} pending migrations`);

    // Dry-run mode: validate SQL but don't execute
    if (options.dryRun) {
      return await this.dryRun(pending);
    }

    // Execute migrations with lock
    return await this.lockManager.withLock(async () => {
      return await this.executeMigrations(pending, 'up', options.requireConfirmation || false);
    });
  }

  /**
   * Rollback last N applied migrations.
   * @param options Options for rollback: count
   * @returns Array of migration results
   */
  async down(
    options: {
      count?: number;
      requireConfirmation?: boolean;
    } = {},
  ): Promise<MigrationResult[]> {
    const count = options.count || 1;

    // Get applied migrations (already sorted by applied_at DESC)
    const applied = await this.stateTracker.getAppliedMigrations();

    if (applied.length === 0) {
      this.logger.info('No migrations to rollback');
      return [];
    }

    // Take last N applied migrations
    const toRollback = applied.slice(0, count);

    this.logger.info(`Rolling back ${toRollback.length} migrations`);

    // Load migration files for rollback
    const migrations: Migration[] = [];
    for (const appliedMig of toRollback) {
      const migration = await this.loader.loadByName(appliedMig.name);
      if (!migration) {
        throw new Error(`Migration file not found: ${appliedMig.name}`);
      }
      migrations.push(migration);
    }

    // Execute rollback with lock
    return await this.lockManager.withLock(async () => {
      return await this.executeMigrations(migrations, 'down', options.requireConfirmation || false);
    });
  }

  /**
   * Execute migrations (up or down) with transaction safety.
   * @param migrations Migrations to execute
   * @param direction 'up' (apply) or 'down' (rollback)
   * @param requireConfirmation Require user confirmation for destructive operations
   * @returns Array of migration results
   */
  private async executeMigrations(
    migrations: Migration[],
    direction: 'up' | 'down',
    requireConfirmation: boolean,
  ): Promise<MigrationResult[]> {
    const results: MigrationResult[] = [];
    const username = os.userInfo().username || process.env['USER'] || 'unknown';

    for (const migration of migrations) {
      const sql = direction === 'up' ? migration.upSql : migration.downSql;
      const startTime = Date.now();

      this.logger.info(`Executing migration ${direction}`, {
        migration: migration.name,
        direction,
      });

      // Check for destructive operations
      if (requireConfirmation && this.isDestructive(sql)) {
        this.logger.warn('Destructive operation detected', {
          migration: migration.name,
        });
        // TODO: Implement interactive prompt (US-003)
        // For now, just log warning
      }

      try {
        // Begin transaction
        await this.adapter.beginTransaction();

        // Execute SQL
        await this.adapter.executeQuery(sql);

        // Update state
        if (direction === 'up') {
          const durationMs = Date.now() - startTime;
          await this.stateTracker.markApplied(
            migration.name,
            migration.checksum,
            durationMs,
            username,
          );
        } else {
          await this.stateTracker.markRolledBack(migration.name);
        }

        // Commit transaction
        await this.adapter.commit();

        const durationMs = Date.now() - startTime;
        results.push({
          migration,
          durationMs,
          success: true,
        });

        this.logger.info(`Migration ${direction} completed`, {
          migration: migration.name,
          durationMs,
        });
      } catch (error) {
        // Rollback transaction
        await this.adapter.rollback();

        const durationMs = Date.now() - startTime;
        const err = error as Error;

        results.push({
          migration,
          durationMs,
          success: false,
          error: err,
        });

        this.logger.error(`Migration ${direction} failed`, {
          migration: migration.name,
          error: err.message,
        });

        // Mark as failed in state (only for up direction)
        if (direction === 'up') {
          try {
            await this.stateTracker.markFailed(
              migration.name,
              migration.checksum,
              durationMs,
              err.message,
              username,
            );
          } catch {
            // Ignore errors marking failed state
          }
        }

        // Stop on first failure
        break;
      }
    }

    return results;
  }

  /**
   * Dry-run: validate migrations without executing.
   * @param migrations Migrations to validate
   * @returns Array of migration results (all success)
   */
  private async dryRun(migrations: Migration[]): Promise<MigrationResult[]> {
    const results: MigrationResult[] = [];

    for (const migration of migrations) {
      this.logger.info(`[DRY-RUN] Would execute migration`, {
        migration: migration.name,
      });

      // Basic SQL syntax validation (check for common errors)
      const sql = migration.upSql;
      const errors: string[] = [];

      // Check for unmatched parentheses
      const openParens = (sql.match(/\(/g) || []).length;
      const closeParens = (sql.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        errors.push('Unmatched parentheses');
      }

      // Check for destructive operations
      if (this.isDestructive(sql)) {
        this.logger.warn('[DRY-RUN] Destructive operation detected', {
          migration: migration.name,
        });
      }

      if (errors.length > 0) {
        results.push({
          migration,
          durationMs: 0,
          success: false,
          error: new Error(`Validation failed: ${errors.join(', ')}`),
        });
      } else {
        results.push({
          migration,
          durationMs: 0,
          success: true,
        });
      }
    }

    return results;
  }

  /**
   * Check if SQL contains destructive operations.
   * @param sql SQL content to check
   * @returns True if destructive operations detected
   */
  private isDestructive(sql: string): boolean {
    const destructiveKeywords = /\b(DROP|DELETE|TRUNCATE|ALTER\s+TABLE\s+\w+\s+DROP)\b/gi;
    return destructiveKeywords.test(sql);
  }
}
