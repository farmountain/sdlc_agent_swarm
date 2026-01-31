/**
 * Checksum Validator
 * 
 * Calculates SHA-256 checksums for migration files to detect tampering.
 * If a migration file is modified after being applied, the checksum will not match.
 * 
 * Architecture: Component Diagram - ChecksumValidator Component
 * ADR-004: Checksum validation prevents tampering
 */

import * as crypto from 'node:crypto';

export class ChecksumValidator {
  /**
   * Calculate SHA-256 checksum of migration SQL content.
   * @param sql SQL content from .up.sql file
   * @returns Hexadecimal SHA-256 hash
   */
  calculate(sql: string): string {
    return crypto
      .createHash('sha256')
      .update(sql, 'utf-8')
      .digest('hex');
  }
  
  /**
   * Validate migration checksum against stored value.
   * @param expectedChecksum Checksum stored in migrations_history table
   * @param actualSql Current SQL content from .up.sql file
   * @returns True if checksums match, false otherwise
   */
  validate(expectedChecksum: string, actualSql: string): boolean {
    const actualChecksum = this.calculate(actualSql);
    return expectedChecksum === actualChecksum;
  }
  
  /**
   * Validate migration with detailed error message on mismatch.
   * @param migrationName Migration name for error reporting
   * @param expectedChecksum Checksum from migrations_history
   * @param actualSql Current SQL content
   * @throws Error if checksums do not match
   */
  validateOrThrow(migrationName: string, expectedChecksum: string, actualSql: string): void {
    if (!this.validate(expectedChecksum, actualSql)) {
      const actualChecksum = this.calculate(actualSql);
      
      throw new Error(
        `Checksum mismatch for migration: ${migrationName}\n` +
        `Expected: ${expectedChecksum}\n` +
        `Actual:   ${actualChecksum}\n\n` +
        `This migration was modified after being applied!\n` +
        `Do NOT edit applied migrations. Create a new migration instead.`
      );
    }
  }
}
