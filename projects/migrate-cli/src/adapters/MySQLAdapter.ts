/**
 * MySQL Database Adapter
 * 
 * Implements IDatabaseAdapter for MySQL 8+ using mysql2 driver.
 * Supports advisory locks via GET_LOCK system function.
 * 
 * Note: MySQL DDL statements cause implicit commit (see ADR-003).
 * 
 * ADR-004: Database Adapter Pattern
 */

import mysql from 'mysql2/promise';
import { IDatabaseAdapter, DatabaseType } from '../types';

export class MySQLAdapter implements IDatabaseAdapter {
  public readonly databaseType: DatabaseType = 'mysql';
  
  private connection: mysql.Connection | null = null;
  private transactionDepth = 0;
  private lockHeld = false;
  
  async connect(connectionString: string): Promise<void> {
    if (this.connection) {
      throw new Error('Already connected to database');
    }
    
    try {
      this.connection = await mysql.createConnection(connectionString);
    } catch (error) {
      throw new Error(`Failed to connect to MySQL: ${(error as Error).message}`);
    }
  }
  
  async disconnect(): Promise<void> {
    if (!this.connection) {
      return;
    }
    
    await this.connection.end();
    this.connection = null;
    this.transactionDepth = 0;
    this.lockHeld = false;
  }
  
  async executeQuery<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
    if (!this.connection) {
      throw new Error('Not connected to database');
    }
    
    try {
      const [rows] = await this.connection.execute(sql, params);
      return rows as T;
    } catch (error) {
      throw new Error(`SQL execution failed: ${(error as Error).message}`);
    }
  }
  
  async beginTransaction(): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to database');
    }
    
    if (this.transactionDepth === 0) {
      await this.connection.query('START TRANSACTION');
    }
    
    this.transactionDepth++;
  }
  
  async commit(): Promise<void> {
    if (!this.connection || this.transactionDepth === 0) {
      throw new Error('No transaction in progress');
    }
    
    this.transactionDepth--;
    
    if (this.transactionDepth === 0) {
      await this.connection.query('COMMIT');
    }
  }
  
  async rollback(): Promise<void> {
    if (!this.connection || this.transactionDepth === 0) {
      return; // Safe to call even if no transaction
    }
    
    this.transactionDepth = 0;
    await this.connection.query('ROLLBACK');
  }
  
  async acquireLock(key: number, timeoutSeconds: number): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to database');
    }
    
    if (this.lockHeld) {
      return; // Already holding lock
    }
    
    try {
      const lockName = `migrate-cli-${key}`;
      const [rows] = await this.connection.query<mysql.RowDataPacket[]>(
        'SELECT GET_LOCK(?, ?) AS lock_result',
        [lockName, timeoutSeconds]
      );
      
      const lockResult = rows[0]?.['lock_result'];
      
      if (lockResult === 1) {
        this.lockHeld = true;
      } else if (lockResult === 0) {
        throw new Error(`Lock timeout after ${timeoutSeconds} seconds`);
      } else {
        throw new Error('Failed to acquire lock (error occurred)');
      }
    } catch (error) {
      throw new Error(`Failed to acquire advisory lock: ${(error as Error).message}`);
    }
  }
  
  async releaseLock(key: number): Promise<void> {
    if (!this.connection || !this.lockHeld) {
      return; // Safe to call even if lock not held
    }
    
    const lockName = `migrate-cli-${key}`;
    await this.connection.query('SELECT RELEASE_LOCK(?)', [lockName]);
    this.lockHeld = false;
  }
  
  async ensureMigrationsTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS migrations_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        applied_by VARCHAR(255) NOT NULL,
        checksum VARCHAR(64) NOT NULL,
        duration_ms INT NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
        error_message TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    
    await this.executeQuery(sql);
    
    // Create indexes separately (may already exist)
    try {
      await this.executeQuery('CREATE INDEX idx_migrations_history_name ON migrations_history(name)');
    } catch {
      // Index may already exist
    }
    
    try {
      await this.executeQuery('CREATE INDEX idx_migrations_history_applied_at ON migrations_history(applied_at DESC)');
    } catch {
      // Index may already exist
    }
  }
}
