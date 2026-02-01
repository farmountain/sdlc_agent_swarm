import { StateTracker } from '../../src/state/StateTracker';
import { IDatabaseAdapter, ILogger } from '../../src/types';

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

describe('StateTracker', () => {
  it('maps applied migrations from rows', async () => {
    const adapter = createAdapter();
    const logger = createLogger();

    (adapter.executeQuery as jest.Mock).mockResolvedValueOnce([
      {
        id: 1,
        name: '20260101010101_create_users',
        applied_at: '2026-01-01T00:00:00Z',
        applied_by: 'tester',
        checksum: 'abc',
        duration_ms: 42,
        status: 'SUCCESS',
        error_message: null,
      },
    ]);

    const tracker = new StateTracker(adapter, logger);
    const applied = await tracker.getAppliedMigrations();

    expect(applied).toHaveLength(1);
    expect(applied[0]!.name).toBe('20260101010101_create_users');
    expect(applied[0]!.appliedAt).toBeInstanceOf(Date);
  });

  it('handles both string and Date types for applied_at', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const now = new Date();

    (adapter.executeQuery as jest.Mock).mockResolvedValueOnce([
      {
        id: 1,
        name: '20260101010101_create_users',
        applied_at: now,
        applied_by: 'tester',
        checksum: 'abc',
        duration_ms: 42,
        status: 'SUCCESS',
        error_message: null,
      },
    ]);

    const tracker = new StateTracker(adapter, logger);
    const applied = await tracker.getAppliedMigrations();

    expect(applied[0]!.appliedAt).toBe(now);
  });

  it('records applied migration', async () => {
    const adapter = createAdapter();
    const logger = createLogger();

    const tracker = new StateTracker(adapter, logger);
    await tracker.markApplied('20260101010101_create_users', 'abc', 50, 'tester');

    expect(adapter.executeQuery).toHaveBeenCalled();
  });

  it('records failed migration', async () => {
    const adapter = createAdapter();
    const logger = createLogger();

    const tracker = new StateTracker(adapter, logger);
    await tracker.markFailed('20260101010101_create_users', 'abc', 50, 'boom', 'tester');

    expect(adapter.executeQuery).toHaveBeenCalled();
  });

  it('marks migration rolled back', async () => {
    const adapter = createAdapter();
    const logger = createLogger();

    const tracker = new StateTracker(adapter, logger);
    await tracker.markRolledBack('20260101010101_create_users');

    expect(adapter.executeQuery).toHaveBeenCalled();
  });

  it('returns null when no migrations applied', async () => {
    const adapter = createAdapter();
    const logger = createLogger();

    (adapter.executeQuery as jest.Mock).mockResolvedValueOnce([]);

    const tracker = new StateTracker(adapter, logger);
    const last = await tracker.getLastApplied();

    expect(last).toBeNull();
  });

  it('returns empty set when no migrations applied', async () => {
    const adapter = createAdapter();
    const logger = createLogger();

    (adapter.executeQuery as jest.Mock).mockResolvedValueOnce([]);

    const tracker = new StateTracker(adapter, logger);
    const names = await tracker.getAppliedNames();

    expect(names.size).toBe(0);
  });
});
