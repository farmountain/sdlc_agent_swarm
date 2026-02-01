import { LockManager } from '../../src/lock/LockManager';
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

describe('LockManager', () => {
  it('uses default lock parameters when not provided', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const manager = new LockManager(adapter, logger);

    await manager.acquireLock();
    await manager.releaseLock();

    expect(adapter.acquireLock).toHaveBeenCalledWith(12345, 30);
    expect(adapter.releaseLock).toHaveBeenCalledWith(12345);
  });

  it('acquires and releases lock', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const manager = new LockManager(adapter, logger, 999, 5);

    await manager.acquireLock();
    await manager.releaseLock();

    expect(adapter.acquireLock).toHaveBeenCalledWith(999, 5);
    expect(adapter.releaseLock).toHaveBeenCalledWith(999);
  });

  it('throws descriptive error when lock acquisition fails', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const manager = new LockManager(adapter, logger, 123, 2);

    (adapter.acquireLock as jest.Mock).mockRejectedValueOnce(new Error('timeout'));

    await expect(manager.acquireLock()).rejects.toThrow('Failed to acquire migration lock');
  });

  it('releases lock even when function throws error', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const manager = new LockManager(adapter, logger, 999, 5);
    const error = new Error('Function failed');

    await expect(
      manager.withLock(async () => {
        throw error;
      }),
    ).rejects.toThrow('Function failed');

    expect(adapter.acquireLock).toHaveBeenCalledWith(999, 5);
    expect(adapter.releaseLock).toHaveBeenCalledWith(999);
  });

  it('executes function and releases lock on success', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const manager = new LockManager(adapter, logger, 999, 5);

    const result = await manager.withLock(async () => 'success');

    expect(result).toBe('success');
    expect(adapter.acquireLock).toHaveBeenCalledWith(999, 5);
    expect(adapter.releaseLock).toHaveBeenCalledWith(999);
  });

  it('warns when release lock fails', async () => {
    const adapter = createAdapter();
    const logger = createLogger();
    const manager = new LockManager(adapter, logger, 999, 5);

    (adapter.releaseLock as jest.Mock).mockRejectedValueOnce(new Error('release failed'));

    await manager.releaseLock();

    expect(logger.warn).toHaveBeenCalledWith(
      'Failed to release advisory lock (may not have been held)',
      expect.objectContaining({ lockKey: 999 }),
    );
  });
});
