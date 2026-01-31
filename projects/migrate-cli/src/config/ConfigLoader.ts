/**
 * Configuration Loader
 * 
 * Loads configuration from migrate.json or environment variables.
 * Environment variables take precedence over config file.
 * 
 * Architecture: C4 Container Diagram - Configuration Loader
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { MigrateConfig, DatabaseType } from '../types';

export class ConfigLoader {
  /**
   * Load configuration from file and environment variables.
   * @param configPath Path to migrate.json (default: ./migrate.json)
   * @returns MigrateConfig object
   */
  async load(configPath: string = './migrate.json'): Promise<MigrateConfig> {
    // Load .env file if exists
    dotenv.config();
    
    // Try to load config file
    let fileConfig: Partial<MigrateConfig> = {};
    
    try {
      const content = await fs.readFile(configPath, 'utf-8');
      fileConfig = JSON.parse(content);
    } catch {
      // Config file not found or invalid, use defaults
    }
    
    // Environment variables take precedence
    const config: MigrateConfig = {
      databaseUrl: process.env['DATABASE_URL'] || fileConfig.databaseUrl || '',
      migrationsDir: process.env['MIGRATIONS_DIR'] || fileConfig.migrationsDir || './migrations',
      lockKey: parseInt(process.env['LOCK_KEY'] || '', 10) || fileConfig.lockKey || 12345,
      lockTimeout: parseInt(process.env['LOCK_TIMEOUT'] || '', 10) || fileConfig.lockTimeout || 30,
      transactionMode: (process.env['TRANSACTION_MODE'] as 'auto' | 'manual') || fileConfig.transactionMode || 'auto',
      logging: {
        level: (process.env['LOG_LEVEL'] as 'debug' | 'info' | 'warn' | 'error') || fileConfig.logging?.level || 'info',
        format: (process.env['LOG_FORMAT'] as 'json' | 'text') || fileConfig.logging?.format || 'text',
        outputFile: process.env['LOG_FILE'] || fileConfig.logging?.outputFile,
      },
    };
    
    // Validate required fields
    if (!config.databaseUrl) {
      throw new Error('DATABASE_URL not configured. Set DATABASE_URL environment variable or add to migrate.json');
    }
    
    return config;
  }
  
  /**
   * Detect database type from connection string.
   * @param connectionString Database connection string
   * @returns Database type (postgres, mysql, sqlite)
   */
  detectDatabaseType(connectionString: string): DatabaseType {
    if (connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://')) {
      return 'postgres';
    } else if (connectionString.startsWith('mysql://')) {
      return 'mysql';
    } else if (connectionString.startsWith('sqlite://')) {
      return 'sqlite';
    } else {
      throw new Error(`Unknown database type in connection string: ${connectionString}`);
    }
  }
  
  /**
   * Create default migrate.json file.
   * @param outputPath Path to write migrate.json
   */
  async createDefaultConfig(outputPath: string): Promise<void> {
    const defaultConfig: MigrateConfig = {
      databaseUrl: process.env['DATABASE_URL'] || 'postgres://user:password@localhost:5432/myapp',
      migrationsDir: './migrations',
      lockKey: 12345,
      lockTimeout: 30,
      transactionMode: 'auto',
      logging: {
        level: 'info',
        format: 'text',
      },
    };
    
    await fs.writeFile(
      outputPath,
      JSON.stringify(defaultConfig, null, 2),
      'utf-8'
    );
  }
}
