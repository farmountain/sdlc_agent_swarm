/**
 * Lock Manager
 *  
 * Manages database advisory locks to prevent concurrent migration runs.
 * Wraps database adapter lock methods with error handling and retry logic.
 * 
 * Architecture: Component Diagram - LockManager Component
 * ADR-005: Advisory Locks for Concurrency Control
 */

import { IDatabaseAdapter } from '../types';
import { ILogger } from '../types';

export class LockManager {
  constructor(
    private readonly adapter: IDatabaseAdapter,
    private readonly logger: ILogger,
    private readonly lockKey: number = 12345,
    private readonly lockTimeout: number = 30
  ) {}
  
  /**
   * Acquire advisory lock with timeout.
   * Blocks until lock is acquired or timeout expires.
   * @throws Error if lock timeout expires or acquisition fails
   */
  async acquireLock(): Promise<void> {
    this.logger.info('Acquiring advisory lock', {
      lockKey: this.lockKey,
      timeout: this.lockTimeout,
    });
    
    try {
      await this.adapter.acquireLock(this.lockKey, this.lockTimeout);
      
      this.logger.info('Advisory lock acquired', {
        lockKey: this.lockKey,
      });
    } catch (error) {
      this.logger.error('Failed to acquire advisory lock', {
        lockKey: this.lockKey,
        error: (error as Error).message,
      });
      
      throw new Error(
        `Failed to acquire migration lock (key: ${this.lockKey}, timeout: ${this.lockTimeout}s).\n` +
        `Another migration may be in progress. Wait for it to complete and try again.\n` +
        `Error: ${(error as Error).message}`
      );
    }
  }
  
  /**
   * Release advisory lock.
   * Safe to call even if lock not held (no-op).
   */
  async releaseLock(): Promise<void> {
    this.logger.info('Releasing advisory lock', {
      lockKey: this.lockKey,
    });
    
    try {
      await this.adapter.releaseLock(this.lockKey);
      
      this.logger.info('Advisory lock released', {
        lockKey: this.lockKey,
      });
    } catch (error) {
      this.logger.warn('Failed to release advisory lock (may not have been held)', {
        lockKey: this.lockKey,
        error: (error as Error).message,
      });
    }
  }
  
  /**
   * Execute function with advisory lock held.
   * Automatically acquires lock before execution and releases after (even on error).
   * @param fn Function to execute while lock is held
   * @returns Return value of fn
   */
  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquireLock();
    
    try {
      return await fn();
    } finally {
      await this.releaseLock();
    }
  }
}
