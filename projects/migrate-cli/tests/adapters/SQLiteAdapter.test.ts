import Database from 'better-sqlite3';
import { SQLiteAdapter } from '../../src/adapters/SQLiteAdapter';

const mockAll = jest.fn();
const mockRun = jest.fn();
const mockPrepare = jest.fn(() => ({ all: mockAll, run: mockRun }));
const mockExec = jest.fn();
const mockClose = jest.fn();
const mockPragma = jest.fn();

const mockDb = {
  prepare: mockPrepare,
  exec: mockExec,
  close: mockClose,
  pragma: mockPragma,
};

jest.mock('better-sqlite3', () => {
  return jest.fn(() => mockDb);
});

describe('SQLiteAdapter', () => {
  beforeEach(() => {
    mockAll.mockReset();
    mockRun.mockReset();
    mockPrepare.mockReset();
    mockPrepare.mockImplementation(() => ({ all: mockAll, run: mockRun }));
    mockExec.mockReset();
    mockClose.mockReset();
    mockPragma.mockReset();
  });

  it('connects and disconnects', async () => {
    const adapter = new SQLiteAdapter();
    await adapter.connect('sqlite://./test.db');
    await adapter.disconnect();

    expect(Database as unknown as jest.Mock).toHaveBeenCalledWith('./test.db');
    expect(mockPragma).toHaveBeenCalledWith('journal_mode = WAL');
    expect(mockClose).toHaveBeenCalled();
  });

  it('executes select and non-select statements', async () => {
    const adapter = new SQLiteAdapter();
    await adapter.connect('sqlite://./test.db');

    mockAll.mockReturnValueOnce([{ id: 1 }]);
    const rows = await adapter.executeQuery<{ id: number }[]>('SELECT 1;');
    expect(rows[0]?.id).toBe(1);

    await adapter.executeQuery('CREATE TABLE test(id INT);');
    expect(mockRun).toHaveBeenCalled();
  });

  it('acquires and releases exclusive lock', async () => {
    const adapter = new SQLiteAdapter();
    await adapter.connect('sqlite://./test.db');

    await adapter.acquireLock(1, 1);
    await adapter.releaseLock(1);

    expect(mockExec).toHaveBeenCalledWith('BEGIN EXCLUSIVE TRANSACTION');
    expect(mockExec).toHaveBeenCalledWith('COMMIT');
  });

  it('handles transactions and rollback', async () => {
    const adapter = new SQLiteAdapter();
    await adapter.connect('sqlite://./test.db');

    await adapter.beginTransaction();
    await adapter.commit();

    await adapter.beginTransaction();
    await adapter.rollback();

    expect(mockExec).toHaveBeenCalledWith('BEGIN EXCLUSIVE TRANSACTION');
    expect(mockExec).toHaveBeenCalledWith('COMMIT');
    expect(mockExec).toHaveBeenCalledWith('ROLLBACK');
  });

  it('throws when executing without connection', async () => {
    const adapter = new SQLiteAdapter();
    await expect(adapter.executeQuery('SELECT 1')).rejects.toThrow('Not connected');
  });

  it('handles connection failures', async () => {
    (Database as unknown as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Database file locked');
    });
    const adapter = new SQLiteAdapter();
    await expect(adapter.connect('sqlite://./test.db')).rejects.toThrow('Database file locked');
  });

  it('handles query execution failures', async () => {
    const adapter = new SQLiteAdapter();
    await adapter.connect('sqlite://./test.db');
    mockPrepare.mockImplementationOnce(() => {
      throw new Error('SQL syntax error');
    });
    await expect(adapter.executeQuery('SELECT invalid')).rejects.toThrow('SQL syntax error');
  });
});
