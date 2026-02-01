import { PostgresAdapter } from '../../src/adapters/PostgresAdapter';

jest.mock('pg', () => {
  const mockQuery = jest.fn();
  const mockRelease = jest.fn();
  const mockClient = { query: mockQuery, release: mockRelease };
  const mockConnect = jest.fn();
  const mockEnd = jest.fn();
  const mockPool = { connect: mockConnect, end: mockEnd };

  return {
    Pool: jest.fn(() => mockPool),
    __mocks: { mockQuery, mockRelease, mockClient, mockConnect, mockEnd, mockPool },
  };
});

describe('PostgresAdapter', () => {
  const mocks = jest.requireMock('pg').__mocks as {
    mockQuery: jest.Mock;
    mockRelease: jest.Mock;
    mockClient: { query: jest.Mock; release: jest.Mock };
    mockConnect: jest.Mock;
    mockEnd: jest.Mock;
  };

  beforeEach(() => {
    mocks.mockQuery.mockReset();
    mocks.mockRelease.mockReset();
    mocks.mockConnect.mockReset();
    mocks.mockEnd.mockReset();
  });

  it('connects and disconnects', async () => {
    mocks.mockConnect.mockResolvedValueOnce(mocks.mockClient);

    const adapter = new PostgresAdapter();
    await adapter.connect('postgres://user:pass@localhost:5432/db');
    await adapter.disconnect();

    expect(mocks.mockConnect).toHaveBeenCalled();
    expect(mocks.mockEnd).toHaveBeenCalled();
  });

  it('executes queries and returns rows', async () => {
    mocks.mockConnect.mockResolvedValue(mocks.mockClient);
    mocks.mockQuery.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const adapter = new PostgresAdapter();
    await adapter.connect('postgres://user:pass@localhost:5432/db');
    const rows = await adapter.executeQuery<{ id: number }[]>('SELECT 1');

    expect(rows[0]?.id).toBe(1);
  });

  it('handles transactions and rollback', async () => {
    mocks.mockConnect.mockResolvedValue(mocks.mockClient);

    const adapter = new PostgresAdapter();
    await adapter.connect('postgres://user:pass@localhost:5432/db');

    await adapter.beginTransaction();
    await adapter.commit();

    await adapter.beginTransaction();
    await adapter.rollback();

    expect(mocks.mockQuery).toHaveBeenCalledWith('BEGIN');
    expect(mocks.mockQuery).toHaveBeenCalledWith('COMMIT');
    expect(mocks.mockQuery).toHaveBeenCalledWith('ROLLBACK');
  });

  it('acquires and releases advisory locks', async () => {
    mocks.mockConnect.mockResolvedValue(mocks.mockClient);
    mocks.mockQuery.mockResolvedValue({ rows: [] });

    const adapter = new PostgresAdapter();
    await adapter.connect('postgres://user:pass@localhost:5432/db');

    await adapter.acquireLock(123, 5);
    await adapter.releaseLock(123);

    expect(mocks.mockQuery).toHaveBeenCalledWith("SET statement_timeout = '5s'");
    expect(mocks.mockQuery).toHaveBeenCalledWith('SELECT pg_advisory_lock($1)', [123]);
    expect(mocks.mockQuery).toHaveBeenCalledWith('SELECT pg_advisory_unlock($1)', [123]);
  });

  it('throws when executing without connection', async () => {
    const adapter = new PostgresAdapter();
    await expect(adapter.executeQuery('SELECT 1')).rejects.toThrow('Not connected');
  });

  it('handles connection failures', async () => {
    mocks.mockConnect.mockRejectedValueOnce(new Error('Connection refused'));

    const adapter = new PostgresAdapter();
    await expect(adapter.connect('postgres://localhost:5432/db')).rejects.toThrow(
      'Connection refused',
    );
  });

  it('handles query execution failures', async () => {
    mocks.mockConnect.mockResolvedValue(mocks.mockClient);
    mocks.mockQuery.mockRejectedValueOnce(new Error('Query failed'));

    const adapter = new PostgresAdapter();
    await adapter.connect('postgres://localhost:5432/db');

    await expect(adapter.executeQuery('SELECT 1')).rejects.toThrow('Query failed');
  });
});
