import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { ConfigLoader } from '../../src/config/ConfigLoader';

function withEnv(env: Record<string, string | undefined>): void {
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

describe('ConfigLoader', () => {
  it('loads config from file and env overrides', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'migrate-cli-'));
    const configPath = path.join(tempDir, 'migrate.json');

    await fs.writeFile(
      configPath,
      JSON.stringify({ databaseUrl: 'postgres://file', migrationsDir: './file' }, null, 2),
      'utf-8',
    );

    withEnv({ DATABASE_URL: 'postgres://env', MIGRATIONS_DIR: './env' });

    const loader = new ConfigLoader();
    const config = await loader.load(configPath);

    expect(config.databaseUrl).toBe('postgres://env');
    expect(config.migrationsDir).toBe('./env');
  });

  it('detects database type', () => {
    const loader = new ConfigLoader();

    expect(loader.detectDatabaseType('postgres://x')).toBe('postgres');
    expect(loader.detectDatabaseType('postgresql://x')).toBe('postgres');
    expect(loader.detectDatabaseType('mysql://x')).toBe('mysql');
    expect(loader.detectDatabaseType('sqlite://x')).toBe('sqlite');
  });

  it('writes default config file', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'migrate-cli-'));
    const outputPath = path.join(tempDir, 'migrate.json');

    const loader = new ConfigLoader();
    await loader.createDefaultConfig(outputPath);

    const contents = await fs.readFile(outputPath, 'utf-8');
    expect(contents).toContain('databaseUrl');
  });
});
