import { MigrationRunner } from '../../src/runner/MigrationRunner';
import { MigrationLoader } from '../../src/loader/MigrationLoader';
import { LockManager } from '../../src/lock/LockManager';
import { StateTracker } from '../../src/state/StateTracker';
import { IDatabaseAdapter, ILogger, Migration } from '../../src/types';

function createLogger(): ILogger {
  return {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}

function createAdapter(): IDatabaseAdapter {
  return {
    databaseType: 'postgres',
    connect: jest.fn(),
    disconnect: jest.fn(),
    executeQuery: jest.fn(),
    beginTransaction: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn(),
    acquireLock: jest.fn(),
    releaseLock: jest.fn(),
    ensureMigrationsTable: jest.fn(),
  };
}

function createMigration(name: string): Migration {
  return {
    name,
    upFilePath: '/tmp/up.sql',
    downFilePath: '/tmp/down.sql',
    upSql: 'CREATE TABLE test(id INT);',
    downSql: 'DROP TABLE test;',
    checksum: 'abc',
    timestamp: 20260101010101,
  };
}

describe('MigrationRunner', () => {
  it('runs dry-run without acquiring lock', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = { withLock: jest.fn() } as unknown as LockManager;
    const stateTracker = {
      ensureTable: jest.fn(),
      getAppliedNames: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedNames as jest.Mock).mockResolvedValueOnce(new Set());
    (loader.loadPending as jest.Mock).mockResolvedValueOnce([
      createMigration('20260101010101_create_users'),
    ]);

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    const results = await runner.up({ dryRun: true });

    expect(results).toHaveLength(1);
    expect(lockManager.withLock).not.toHaveBeenCalled();
    expect(adapter.beginTransaction).not.toHaveBeenCalled();
  });

  it('throws when rollback migration file is missing', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = { withLock: jest.fn() } as unknown as LockManager;
    const stateTracker = {
      getAppliedMigrations: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedMigrations as jest.Mock).mockResolvedValueOnce([
      {
        id: 1,
        name: '20260101010101_create_users',
        appliedAt: new Date(),
        appliedBy: 'tester',
        checksum: 'abc',
        durationMs: 10,
        status: 'SUCCESS',
        errorMessage: null,
      },
    ]);
    (loader.loadByName as jest.Mock).mockResolvedValueOnce(null);

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);

    await expect(runner.down({ count: 1 })).rejects.toThrow('Migration file not found');
  });

  it('applies migrations successfully', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = {
      withLock: jest.fn(async (fn: () => Promise<unknown>) => fn()),
    } as unknown as LockManager;
    const stateTracker = {
      ensureTable: jest.fn(),
      getAppliedNames: jest.fn(),
      markApplied: jest.fn(),
      markFailed: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedNames as jest.Mock).mockResolvedValueOnce(new Set());
    (loader.loadPending as jest.Mock).mockResolvedValueOnce([
      createMigration('20260101010101_create_users'),
    ]);

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    const results = await runner.up();

    expect(results).toHaveLength(1);
    expect(adapter.beginTransaction).toHaveBeenCalled();
    expect(adapter.commit).toHaveBeenCalled();
    expect(stateTracker.markApplied).toHaveBeenCalled();
  });

  it('rolls back on migration failure', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = {
      withLock: jest.fn(async (fn: () => Promise<unknown>) => fn()),
    } as unknown as LockManager;
    const stateTracker = {
      ensureTable: jest.fn(),
      getAppliedNames: jest.fn(),
      markApplied: jest.fn(),
      markFailed: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedNames as jest.Mock).mockResolvedValueOnce(new Set());
    (loader.loadPending as jest.Mock).mockResolvedValueOnce([
      createMigration('20260101010101_create_users'),
    ]);
    (adapter.executeQuery as jest.Mock).mockRejectedValueOnce(new Error('boom'));

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    const results = await runner.up();

    expect(results[0]?.success).toBe(false);
    expect(adapter.rollback).toHaveBeenCalled();
    expect(stateTracker.markFailed).toHaveBeenCalled();
  });

  it('returns empty array when no pending migrations', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = { withLock: jest.fn() } as unknown as LockManager;
    const stateTracker = {
      ensureTable: jest.fn(),
      getAppliedNames: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedNames as jest.Mock).mockResolvedValueOnce(new Set());
    (loader.loadPending as jest.Mock).mockResolvedValueOnce([]);

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    const results = await runner.up();

    expect(results).toHaveLength(0);
    expect(logger.info).toHaveBeenCalledWith('No pending migrations');
  });

  it('limits migrations with count option', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = {
      withLock: jest.fn(async (fn: () => Promise<unknown>) => fn()),
    } as unknown as LockManager;
    const stateTracker = {
      ensureTable: jest.fn(),
      getAppliedNames: jest.fn(),
      markApplied: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedNames as jest.Mock).mockResolvedValueOnce(new Set());
    (loader.loadPending as jest.Mock).mockResolvedValueOnce([
      createMigration('20260101010101_create_users'),
      createMigration('20260102010101_add_email'),
      createMigration('20260103010101_add_index'),
    ]);

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    const results = await runner.up({ count: 2 });

    expect(results).toHaveLength(2);
  });

  it('returns empty array when no migrations to rollback', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = { withLock: jest.fn() } as unknown as LockManager;
    const stateTracker = {
      getAppliedMigrations: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedMigrations as jest.Mock).mockResolvedValueOnce([]);

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    const results = await runner.down({ count: 1 });

    expect(results).toHaveLength(0);
    expect(logger.info).toHaveBeenCalledWith('No migrations to rollback');
  });

  it('successfully executes rollback migrations', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = { withLock: jest.fn() } as unknown as LockManager;
    const stateTracker = {
      getAppliedMigrations: jest.fn(),
      markRolledBack: jest.fn(),
    } as unknown as StateTracker;

    const appliedMigration = { name: '20260101010101_create_users' };
    (stateTracker.getAppliedMigrations as jest.Mock).mockResolvedValueOnce([appliedMigration]);
    const migration = createMigration('20260101010101_create_users');
    (loader.loadByName as jest.Mock).mockResolvedValueOnce(migration);
    (lockManager.withLock as jest.Mock).mockImplementation(async (fn: () => Promise<unknown>) =>
      fn(),
    );

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    const results = await runner.down({ count: 1 });

    expect(results).toHaveLength(1);
    expect(results[0]?.success).toBe(true);
    expect(stateTracker.markRolledBack).toHaveBeenCalledWith('20260101010101_create_users');
  });

  it('warns on destructive operations in dry-run', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = { withLock: jest.fn() } as unknown as LockManager;
    const stateTracker = {
      ensureTable: jest.fn(),
      getAppliedNames: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedNames as jest.Mock).mockResolvedValueOnce(new Set());
    const destructiveMigration = createMigration('20260101010101_drop_table');
    destructiveMigration.upSql = 'DROP TABLE test;';
    (loader.loadPending as jest.Mock).mockResolvedValueOnce([destructiveMigration]);

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    await runner.up({ dryRun: true });

    expect(logger.warn).toHaveBeenCalledWith(
      '[DRY-RUN] Destructive operation detected',
      expect.objectContaining({ migration: '20260101010101_drop_table' }),
    );
  });

  it('logs warnings for destructive operations when confirmation is required', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = { withLock: jest.fn() } as unknown as LockManager;
    const stateTracker = {
      ensureTable: jest.fn(),
      getAppliedNames: jest.fn(),
      markApplied: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedNames as jest.Mock).mockResolvedValueOnce(new Set());
    const destructiveMigration = createMigration('20260101010101_drop_table');
    destructiveMigration.upSql = 'DROP TABLE test;';
    (loader.loadPending as jest.Mock).mockResolvedValueOnce([destructiveMigration]);
    (lockManager.withLock as jest.Mock).mockImplementation(async (fn: () => Promise<unknown>) =>
      fn(),
    );

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    await runner.up({ requireConfirmation: true });

    expect(logger.warn).toHaveBeenCalledWith(
      'Destructive operation detected',
      expect.objectContaining({ migration: '20260101010101_drop_table' }),
    );
  });

  it('detects SQL validation errors in dry-run', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const loader = { loadPending: jest.fn(), loadByName: jest.fn() } as unknown as MigrationLoader;
    const lockManager = { withLock: jest.fn() } as unknown as LockManager;
    const stateTracker = {
      ensureTable: jest.fn(),
      getAppliedNames: jest.fn(),
    } as unknown as StateTracker;

    (stateTracker.getAppliedNames as jest.Mock).mockResolvedValueOnce(new Set());
    const invalidMigration = createMigration('20260101010101_invalid');
    invalidMigration.upSql = 'SELECT ( FROM test;'; // Missing closing parenthesis
    (loader.loadPending as jest.Mock).mockResolvedValueOnce([invalidMigration]);

    const runner = new MigrationRunner(adapter, loader, lockManager, stateTracker, logger);
    const results = await runner.up({ dryRun: true });

    expect(results[0]?.success).toBe(false);
    expect(results[0]?.error?.message).toContain('Unmatched parentheses');
  });
});
