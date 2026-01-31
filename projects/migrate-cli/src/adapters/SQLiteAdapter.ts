/**
 * SQLite Database Adapter
 * 
 * Implements IDatabaseAdapter for SQLite 3.35+ using better-sqlite3 driver.
 * Note: SQLite does not support advisory locks (uses exclusive write transaction instead).
 * 
 * ADR-004: Database Adapter Pattern
 * ADR-005: Advisory Locks (SQLite limitation documented)
 */

import Database from 'better-sqlite3';
import { IDatabaseAdapter, DatabaseType } from '../types';

export class SQLiteAdapter implements IDatabaseAdapter {
  public readonly databaseType: DatabaseType = 'sqlite';
  
  private db: Database.Database | null = null;
  private transactionDepth = 0;
  private lockHeld = false;
  
  async connect(connectionString: string): Promise<void> {
    if (this.db) {
      throw new Error('Already connected to database');
    }
    
    try {
      // Extract file path from sqlite:// URL
      const filePath = connectionString.replace(/^sqlite:\/\//, '');
      this.db = new Database(filePath);
      
      // Enable WAL mode for better concurrency
      this.db.pragma('journal_mode = WAL');
    } catch (error) {
      throw new Error(`Failed to connect to SQLite: ${(error as Error).message}`);
    }
  }
  
  async disconnect(): Promise<void> {
    if (!this.db) {
      return;
    }
    
    this.db.close();
    this.db = null;
    this.transactionDepth = 0;
    this.lockHeld = false;
  }
  
  async executeQuery<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
    if (!this.db) {
      throw new Error('Not connected to database');
    }
    
    try {
      // Split multi-statement SQL (SQLite executes statements one at a time)
      const statements = sql
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      
      let result: unknown;
      
      for (const statement of statements) {
        if (statement.toUpperCase().startsWith('SELECT')) {
          result = this.db.prepare(statement).all(params || []);
        } else {
          result = this.db.prepare(statement).run(params || []);
        }
      }
      
      return result as T;
    } catch (error) {
      throw new Error(`SQL execution failed: ${(error as Error).message}`);
    }
  }
  
  async beginTransaction(): Promise<void> {
    if (!this.db) {
      throw new Error('Not connected to database');
    }
    
    if (this.transactionDepth === 0) {
      this.db.exec('BEGIN EXCLUSIVE TRANSACTION');
    }
    
    this.transactionDepth++;
  }
  
  async commit(): Promise<void> {
    if (!this.db || this.transactionDepth === 0) {
      throw new Error('No transaction in progress');
    }
    
    this.transactionDepth--;
    
    if (this.transactionDepth === 0) {
      this.db.exec('COMMIT');
    }
  }
  
  async rollback(): Promise<void> {
    if (!this.db || this.transactionDepth === 0) {
      return; // Safe to call even if no transaction
    }
    
    this.transactionDepth = 0;
    this.db.exec('ROLLBACK');
  }
  
  async acquireLock(key: number, timeoutSeconds: number): Promise<void> {
    if (!this.db) {
      throw new Error('Not connected to database');
    }
    
    if (this.lockHeld) {
      return; // Already holding lock
    }
    
    // SQLite doesn't support advisory locks, but EXCLUSIVE transaction prevents concurrent writes
    try {
      this.db.exec('BEGIN EXCLUSIVE TRANSACTION');
      this.lockHeld = true;
      
      // Note: Timeout not enforced for SQLite (limitation of better-sqlite3)
      // Will throw SQLITE_BUSY immediately if database is locked
    } catch (error) {
      if ((error as Error).message.includes('SQLITE_BUSY')) {
        throw new Error('Database is locked by another process (SQLite does not support advisory lock timeouts)');
      }
      throw new Error(`Failed to acquire exclusive lock: ${(error as Error).message}`);
    }
  }
  
  async releaseLock(key: number): Promise<void> {
    if (!this.db || !this.lockHeld) {
      return; // Safe to call even if lock not held
    }
    
    this.db.exec('COMMIT');
    this.lockHeld = false;
  }
  
  async ensureMigrationsTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS migrations_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        applied_by TEXT NOT NULL,
        checksum TEXT NOT NULL,
        duration_ms INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'SUCCESS',
        error_message TEXT
      );
      
      CREATE INDEX IF NOT EXISTS idx_migrations_history_name ON migrations_history(name);
      CREATE INDEX IF NOT EXISTS idx_migrations_history_applied_at ON migrations_history(applied_at DESC);
    `;
    
    await this.executeQuery(sql);
  }
}
