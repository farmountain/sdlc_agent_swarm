/**
 * PostgreSQL Database Adapter
 * 
 * Implements IDatabaseAdapter for PostgreSQL 12+ using pg driver.
 * Supports advisory locks via pg_advisory_lock system function.
 * 
 * ADR-004: Database Adapter Pattern
 */

import { Pool, PoolClient } from 'pg';
import { IDatabaseAdapter, DatabaseType } from '../types';

export class PostgresAdapter implements IDatabaseAdapter {
  public readonly databaseType: DatabaseType = 'postgres';
  
  private pool: Pool | null = null;
  private client: PoolClient | null = null;
  private transactionDepth = 0;
  private lockHeld = false;
  
  async connect(connectionString: string): Promise<void> {
    if (this.pool) {
      throw new Error('Already connected to database');
    }
    
    this.pool = new Pool({ connectionString });
    
    // Test connection
    try {
      const client = await this.pool.connect();
      client.release();
    } catch (error) {
      this.pool = null;
      throw new Error(`Failed to connect to PostgreSQL: ${(error as Error).message}`);
    }
  }
  
  async disconnect(): Promise<void> {
    if (!this.pool) {
      return;
    }
    
    if (this.client) {
      this.client.release();
      this.client = null;
    }
    
    await this.pool.end();
    this.pool = null;
    this.transactionDepth = 0;
    this.lockHeld = false;
  }
  
  async executeQuery<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
    if (!this.pool) {
      throw new Error('Not connected to database');
    }
    
    const client = this.client || await this.pool.connect();
    
    try {
      const result = await client.query(sql, params);
      return result.rows as T;
    } catch (error) {
      throw new Error(`SQL execution failed: ${(error as Error).message}`);
    } finally {
      if (!this.client) {
        client.release();
      }
    }
  }
  
  async beginTransaction(): Promise<void> {
    if (!this.pool) {
      throw new Error('Not connected to database');
    }
    
    if (this.transactionDepth === 0) {
      this.client = await this.pool.connect();
      await this.client.query('BEGIN');
    }
    
    this.transactionDepth++;
  }
  
  async commit(): Promise<void> {
    if (!this.client || this.transactionDepth === 0) {
      throw new Error('No transaction in progress');
    }
    
    this.transactionDepth--;
    
    if (this.transactionDepth === 0) {
      await this.client.query('COMMIT');
      this.client.release();
      this.client = null;
    }
  }
  
  async rollback(): Promise<void> {
    if (!this.client || this.transactionDepth === 0) {
      return; // Safe to call even if no transaction
    }
    
    this.transactionDepth = 0;
    await this.client.query('ROLLBACK');
    this.client.release();
    this.client = null;
  }
  
  async acquireLock(key: number, timeoutSeconds: number): Promise<void> {
    if (!this.pool) {
      throw new Error('Not connected to database');
    }
    
    if (this.lockHeld) {
      return; // Already holding lock
    }
    
    const client = this.client || await this.pool.connect();
    
    try {
      // Set statement timeout to prevent indefinite waiting
      await client.query(`SET statement_timeout = '${timeoutSeconds}s'`);
      
      // Acquire advisory lock (blocks until available or timeout)
      await client.query('SELECT pg_advisory_lock($1)', [key]);
      
      this.lockHeld = true;
    } catch (error) {
      if (!this.client) {
        client.release();
      }
      throw new Error(`Failed to acquire advisory lock: ${(error as Error).message}`);
    } finally {
      if (!this.client) {
        client.release();
      }
    }
  }
  
  async releaseLock(key: number): Promise<void> {
    if (!this.pool || !this.lockHeld) {
      return; // Safe to call even if lock not held
    }
    
    const client = this.client || await this.pool.connect();
    
    try {
      await client.query('SELECT pg_advisory_unlock($1)', [key]);
      this.lockHeld = false;
    } finally {
      if (!this.client) {
        client.release();
      }
    }
  }
  
  async ensureMigrationsTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS migrations_history (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP NOT NULL DEFAULT NOW(),
        applied_by VARCHAR(255) NOT NULL,
        checksum VARCHAR(64) NOT NULL,
        duration_ms INTEGER NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
        error_message TEXT
      );
      
      CREATE INDEX IF NOT EXISTS idx_migrations_history_name ON migrations_history(name);
      CREATE INDEX IF NOT EXISTS idx_migrations_history_applied_at ON migrations_history(applied_at DESC);
    `;
    
    await this.executeQuery(sql);
  }
}
