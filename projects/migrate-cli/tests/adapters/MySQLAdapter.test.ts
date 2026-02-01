import { MySQLAdapter } from '../../src/adapters/MySQLAdapter';

const mockExecute = jest.fn();
const mockQuery = jest.fn();
const mockEnd = jest.fn();
const mockConnection = {
  execute: mockExecute,
  query: mockQuery,
  end: mockEnd,
};

const createConnection = jest.fn();

jest.mock('mysql2/promise', () => ({
  createConnection: (...args: unknown[]) => createConnection(...args),
}));

describe('MySQLAdapter', () => {
  beforeEach(() => {
    mockExecute.mockReset();
    mockQuery.mockReset();
    mockEnd.mockReset();
    createConnection.mockReset();
  });

  it('connects and disconnects', async () => {
    createConnection.mockResolvedValueOnce(mockConnection);

    const adapter = new MySQLAdapter();
    await adapter.connect('mysql://user:pass@localhost:3306/db');
    await adapter.disconnect();

    expect(createConnection).toHaveBeenCalled();
    expect(mockEnd).toHaveBeenCalled();
  });

  it('executes queries and returns rows', async () => {
    createConnection.mockResolvedValueOnce(mockConnection);
    mockExecute.mockResolvedValueOnce([[{ id: 1 }]]);

    const adapter = new MySQLAdapter();
    await adapter.connect('mysql://user:pass@localhost:3306/db');

    const rows = await adapter.executeQuery<{ id: number }[]>('SELECT 1');
    expect(rows[0]?.id).toBe(1);
  });

  it('acquires and releases advisory locks', async () => {
    createConnection.mockResolvedValueOnce(mockConnection);
    mockQuery.mockResolvedValueOnce([[{ lock_result: 1 }]]);

    const adapter = new MySQLAdapter();
    await adapter.connect('mysql://user:pass@localhost:3306/db');

    await adapter.acquireLock(999, 5);
    await adapter.releaseLock(999);

    expect(mockQuery).toHaveBeenCalledWith('SELECT GET_LOCK(?, ?) AS lock_result', [
      'migrate-cli-999',
      5,
    ]);
    expect(mockQuery).toHaveBeenCalledWith('SELECT RELEASE_LOCK(?)', ['migrate-cli-999']);
  });

  it('handles transactions and lock timeout', async () => {
    createConnection.mockResolvedValueOnce(mockConnection);
    mockQuery.mockImplementation(async (sql: string) => {
      if (sql.includes('GET_LOCK')) {
        return [[{ lock_result: 0 }]];
      }
      return [[]];
    });

    const adapter = new MySQLAdapter();
    await adapter.connect('mysql://user:pass@localhost:3306/db');

    await adapter.beginTransaction();
    await adapter.commit();
    await adapter.beginTransaction();
    await adapter.rollback();

    await expect(adapter.acquireLock(1, 1)).rejects.toThrow('Lock timeout');

    expect(mockQuery).toHaveBeenCalledWith('START TRANSACTION');
    expect(mockQuery).toHaveBeenCalledWith('COMMIT');
    expect(mockQuery).toHaveBeenCalledWith('ROLLBACK');
  });

  it('throws when executing without connection', async () => {
    const adapter = new MySQLAdapter();
    await expect(adapter.executeQuery('SELECT 1')).rejects.toThrow('Not connected');
  });

  it('handles connection failures', async () => {
    createConnection.mockRejectedValueOnce(new Error('Connection refused'));
    const adapter = new MySQLAdapter();
    await expect(adapter.connect('mysql://user:pass@localhost:3306/db')).rejects.toThrow(
      'Connection refused',
    );
  });

  it('handles query execution failures', async () => {
    createConnection.mockResolvedValueOnce(mockConnection);
    mockExecute.mockRejectedValueOnce(new Error('Query failed'));
    const adapter = new MySQLAdapter();
    await adapter.connect('mysql://user:pass@localhost:3306/db');
    await expect(adapter.executeQuery('SELECT 1')).rejects.toThrow('Query failed');
  });
});
