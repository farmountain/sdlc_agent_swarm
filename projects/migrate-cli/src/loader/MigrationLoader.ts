/**
 * Migration Loader
 * 
 * Loads migration files from filesystem and parses their content.
 * Migrations are sorted by timestamp to ensure correct execution order.
 * 
 * Architecture: Component Diagram - MigrationLoader Component
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { Migration } from '../types';
import { ChecksumValidator } from './ChecksumValidator';

export class MigrationLoader {
  constructor(
    private readonly migrationsDir: string,
    private readonly checksumValidator: ChecksumValidator
  ) {}
  
  /**
   * Load all migrations from filesystem.
   * @returns Array of migrations sorted by timestamp (oldest first)
   */
  async loadAll(): Promise<Migration[]> {
    const files = await fs.readdir(this.migrationsDir);
    
    // Filter for .up.sql files
    const upFiles = files.filter((f) => f.endsWith('.up.sql'));
    
    const migrations: Migration[] = [];
    
    for (const upFile of upFiles) {
      const name = upFile.replace('.up.sql', '');
      const downFile = `${name}.down.sql`;
      
      const upFilePath = path.join(this.migrationsDir, upFile);
      const downFilePath = path.join(this.migrationsDir, downFile);
      
      // Check if .down.sql exists
      try {
        await fs.access(downFilePath);
      } catch {
        throw new Error(`Missing .down.sql for migration: ${name}`);
      }
      
      // Read file contents
      const upSql = await fs.readFile(upFilePath, 'utf-8');
      const downSql = await fs.readFile(downFilePath, 'utf-8');
      
      // Calculate checksum
      const checksum = this.checksumValidator.calculate(upSql);
      
      // Extract timestamp from filename (YYYYMMDDHHMMSS)
      const timestampMatch = name.match(/^(\d{14})/);
      if (!timestampMatch) {
        throw new Error(`Invalid migration filename format: ${name} (expected YYYYMMDDHHMMSS_description)`);
      }
      const timestamp = parseInt(timestampMatch[1], 10);
      
      migrations.push({
        name,
        upFilePath,
        downFilePath,
        upSql,
        downSql,
        checksum,
        timestamp,
      });
    }
    
    // Sort by timestamp (oldest first)
    migrations.sort((a, b) => a.timestamp - b.timestamp);
    
    return migrations;
  }
  
  /**
   * Load pending migrations (not yet applied).
   * @param appliedNames Set of migration names that have been applied
   * @returns Array of pending migrations sorted by timestamp
   */
  async loadPending(appliedNames: Set<string>): Promise<Migration[]> {
    const all = await this.loadAll();
    return all.filter((m) => !appliedNames.has(m.name));
  }
  
  /**
   * Load a specific migration by name.
   * @param name Migration name (e.g., 20260131153000_create_users)
   * @returns Migration or null if not found
   */
  async loadByName(name: string): Promise<Migration | null> {
    const all = await this.loadAll();
    return all.find((m) => m.name === name) || null;
  }
}
