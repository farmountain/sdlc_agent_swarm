import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { MigrationLoader } from '../../src/loader/MigrationLoader';
import { ChecksumValidator } from '../../src/validator/ChecksumValidator';

describe('MigrationLoader', () => {
  const validator = new ChecksumValidator();

  async function createTempDir(): Promise<string> {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'migrate-cli-'));
    return tempDir;
  }

  it('loads and sorts migrations by timestamp', async () => {
    const tempDir = await createTempDir();

    await fs.writeFile(
      path.join(tempDir, '20260101010101_create_users.up.sql'),
      'CREATE TABLE users(id INT);',
    );
    await fs.writeFile(
      path.join(tempDir, '20260101010101_create_users.down.sql'),
      'DROP TABLE users;',
    );

    await fs.writeFile(
      path.join(tempDir, '20260201010101_add_email.up.sql'),
      'ALTER TABLE users ADD COLUMN email TEXT;',
    );
    await fs.writeFile(
      path.join(tempDir, '20260201010101_add_email.down.sql'),
      'ALTER TABLE users DROP COLUMN email;',
    );

    const loader = new MigrationLoader(tempDir, validator);
    const migrations = await loader.loadAll();

    expect(migrations).toHaveLength(2);
    expect(migrations[0]!.name).toBe('20260101010101_create_users');
    expect(migrations[1]!.name).toBe('20260201010101_add_email');
    expect(migrations[0]!.checksum).toHaveLength(64);
  });

  it('filters pending migrations', async () => {
    const tempDir = await createTempDir();

    await fs.writeFile(
      path.join(tempDir, '20260101010101_create_users.up.sql'),
      'CREATE TABLE users(id INT);',
    );
    await fs.writeFile(
      path.join(tempDir, '20260101010101_create_users.down.sql'),
      'DROP TABLE users;',
    );

    const loader = new MigrationLoader(tempDir, validator);
    const pending = await loader.loadPending(new Set(['20260101010101_create_users']));

    expect(pending).toHaveLength(0);
  });

  it('throws on invalid filename format', async () => {
    const tempDir = await createTempDir();

    await fs.writeFile(path.join(tempDir, 'badname.up.sql'), 'SELECT 1;');
    await fs.writeFile(path.join(tempDir, 'badname.down.sql'), 'SELECT 1;');

    const loader = new MigrationLoader(tempDir, validator);

    await expect(loader.loadAll()).rejects.toThrow('Invalid migration filename format');
  });

  it('throws when .down.sql file is missing', async () => {
    const tempDir = await createTempDir();

    await fs.writeFile(
      path.join(tempDir, '20260101010101_create_users.up.sql'),
      'CREATE TABLE users(id INT);',
    );
    // Intentionally don't create .down.sql file

    const loader = new MigrationLoader(tempDir, validator);

    await expect(loader.loadAll()).rejects.toThrow('Missing .down.sql for migration');
  });

  it('returns null when loading non-existent migration by name', async () => {
    const tempDir = await createTempDir();

    await fs.writeFile(
      path.join(tempDir, '20260101010101_create_users.up.sql'),
      'CREATE TABLE users(id INT);',
    );
    await fs.writeFile(
      path.join(tempDir, '20260101010101_create_users.down.sql'),
      'DROP TABLE users;',
    );

    const loader = new MigrationLoader(tempDir, validator);
    const migration = await loader.loadByName('non_existent_migration');

    expect(migration).toBeNull();
  });
});
