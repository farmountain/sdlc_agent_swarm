#!/usr/bin/env node

/**
 * MigrateCLI - Database Migration Management Tool
 * 
 * CLI entry point using Commander.js for argument parsing.
 * Implements commands: init, create, up, down, status, test
 * 
 * Architecture: C4 Container Diagram - CLI Interface
 * ADR-002: Commander.js for CLI Framework
 */

import { Command } from 'commander';
import { Logger } from './logger/Logger';
import { ConfigLoader } from './config/ConfigLoader';
import { PostgresAdapter } from './adapters/PostgresAdapter';
import { MySQLAdapter } from './adapters/MySQLAdapter';
import { SQLiteAdapter } from './adapters/SQLiteAdapter';
import { MigrationLoader } from './loader/MigrationLoader';
import { ChecksumValidator } from './validator/ChecksumValidator';
import { LockManager } from './lock/LockManager';
import { StateTracker } from './state/StateTracker';
import { MigrationRunner } from './runner/MigrationRunner';
import { IDatabaseAdapter } from './types';
import chalk from 'chalk';

const program = new Command();

program
  .name('migrate')
  .description('Database migration management CLI tool')
  .version('1.0.0');

/**
 * migrate up - Apply pending migrations
 */
program
  .command('up')
  .description('Apply pending migrations')
  .option('--count <n>', 'Apply only N migrations', parseInt)
  .option('--dry-run', 'Preview changes without applying')
  .option('--yes', 'Skip interactive prompts (for CI/CD)')
  .action(async (options) => {
    const startTime = Date.now();
    
    try {
      // Load configuration
      const configLoader = new ConfigLoader();
      const config = await configLoader.load();
      
      // Initialize logger
      const logger = new Logger(config.logging);
      logger.info('Starting migration up', {
        dryRun: options.dryRun || false,
        count: options.count,
      });
      
      // Detect database type and create adapter
      const dbType = configLoader.detectDatabaseType(config.databaseUrl);
      const adapter = createAdapter(dbType);
      
      // Connect to database
      await adapter.connect(config.databaseUrl);
      
      // Initialize components
      const validator = new ChecksumValidator();
      const loader = new MigrationLoader(config.migrationsDir, validator);
      const lockManager = new LockManager(adapter, logger, config.lockKey, config.lockTimeout);
      const stateTracker = new StateTracker(adapter, logger);
      const runner = new MigrationRunner(adapter, loader, validator, lockManager, stateTracker, logger);
      
      // Execute migrations
      const results = await runner.up({
        count: options.count,
        dryRun: options.dryRun,
        requireConfirmation: !options.yes,
      });
      
      // Display results
      console.log();
      if (results.length === 0) {
        console.log(chalk.yellow('✓ No pending migrations'));
      } else {
        const successCount = results.filter((r) => r.success).length;
        const failCount = results.filter((r) => !r.success).length;
        
        results.forEach((result) => {
          if (result.success) {
            console.log(chalk.green(`✓ ${result.migration.name} (${result.durationMs}ms)`));
          } else {
            console.log(chalk.red(`✗ ${result.migration.name} - ${result.error?.message}`));
          }
        });
        
        console.log();
        if (failCount > 0) {
          console.log(chalk.red(`✗ ${successCount} migrations applied, ${failCount} failed`));
          process.exit(1);
        } else {
          const totalTime = Date.now() - startTime;
          console.log(chalk.green(`✓ Applied ${successCount} migrations in ${totalTime}ms`));
        }
      }
      
      // Disconnect
      await adapter.disconnect();
      
      process.exit(0);
    } catch (error) {
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

/**
 * migrate down - Rollback migrations
 */
program
  .command('down')
  .description('Rollback last applied migration')
  .option('--count <n>', 'Rollback N migrations', parseInt)
  .option('--yes', 'Skip interactive prompts')
  .action(async (options) => {
    try {
      // Load configuration
      const configLoader = new ConfigLoader();
      const config = await configLoader.load();
      
      // Initialize logger
      const logger = new Logger(config.logging);
      logger.info('Starting migration down', {
        count: options.count || 1,
      });
      
      // Detect database type and create adapter
      const dbType = configLoader.detectDatabaseType(config.databaseUrl);
      const adapter = createAdapter(dbType);
      
      // Connect to database
      await adapter.connect(config.databaseUrl);
      
      // Initialize components
      const validator = new ChecksumValidator();
      const loader = new MigrationLoader(config.migrationsDir, validator);
      const lockManager = new LockManager(adapter, logger, config.lockKey, config.lockTimeout);
      const stateTracker = new StateTracker(adapter, logger);
      const runner = new MigrationRunner(adapter, loader, validator, lockManager, stateTracker, logger);
      
      // Execute rollback
      const results = await runner.down({
        count: options.count || 1,
        requireConfirmation: !options.yes,
      });
      
      // Display results
      console.log();
      if (results.length === 0) {
        console.log(chalk.yellow('✓ No migrations to rollback'));
      } else {
        results.forEach((result) => {
          if (result.success) {
            console.log(chalk.green(`✓ Rolled back ${result.migration.name} (${result.durationMs}ms)`));
          } else {
            console.log(chalk.red(`✗ ${result.migration.name} - ${result.error?.message}`));
          }
        });
        
        const successCount = results.filter((r) => r.success).length;
        console.log();
        console.log(chalk.green(`✓ Rolled back ${successCount} migrations`));
      }
      
      // Disconnect
      await adapter.disconnect();
      
      process.exit(0);
    } catch (error) {
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

/**
 * migrate status - Show migration status
 */
program
  .command('status')
  .description('Show applied and pending migrations')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    try {
      // Load configuration
      const configLoader = new ConfigLoader();
      const config = await configLoader.load();
      
      // Initialize logger
      const logger = new Logger({ level: 'error', format: 'text' }); // Suppress logs for status
      
      // Detect database type and create adapter
      const dbType = configLoader.detectDatabaseType(config.databaseUrl);
      const adapter = createAdapter(dbType);
      
      // Connect to database
      await adapter.connect(config.databaseUrl);
      
      // Initialize components
      const validator = new ChecksumValidator();
      const loader = new MigrationLoader(config.migrationsDir, validator);
      const stateTracker = new StateTracker(adapter, logger);
      
      // Ensure table exists
      await stateTracker.ensureTable();
      
      // Get status
      const applied = await stateTracker.getAppliedMigrations();
      const appliedNames = new Set(applied.map((m) => m.name));
      const pending = await loader.loadPending(appliedNames);
      
      // Output results
      if (options.json) {
        console.log(JSON.stringify({
          applied: applied.map((m) => ({
            name: m.name,
            appliedAt: m.appliedAt.toISOString(),
            checksum: m.checksum,
            durationMs: m.durationMs,
            status: m.status,
          })),
          pending: pending.map((m) => m.name),
          summary: {
            appliedCount: applied.length,
            pendingCount: pending.length,
          },
        }, null, 2));
      } else {
        console.log();
        console.log(chalk.bold('Migration Status'));
        console.log();
        
        if (applied.length > 0) {
          console.log(chalk.green('✓ Applied Migrations:'));
          applied.forEach((m) => {
            console.log(`  ${m.name} (${m.appliedAt.toISOString()})`);
          });
        } else {
          console.log(chalk.yellow('  No applied migrations'));
        }
        
        console.log();
        
        if (pending.length > 0) {
          console.log(chalk.yellow('⏳ Pending Migrations:'));
          pending.forEach((m) => {
            console.log(`  ${m.name}`);
          });
        } else {
          console.log(chalk.green('  No pending migrations'));
        }
        
        console.log();
        console.log(chalk.bold(`Summary: ${applied.length} applied, ${pending.length} pending`));
      }
      
      // Disconnect
      await adapter.disconnect();
      
      process.exit(pending.length > 0 ? 1 : 0);
    } catch (error) {
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(2);
    }
  });

/**
 * Create database adapter based on type
 */
function createAdapter(dbType: 'postgres' | 'mysql' | 'sqlite'): IDatabaseAdapter {
  switch (dbType) {
    case 'postgres':
      return new PostgresAdapter();
    case 'mysql':
      return new MySQLAdapter();
    case 'sqlite':
      return new SQLiteAdapter();
    default:
      throw new Error(`Unsupported database type: ${dbType}`);
  }
}

// Parse CLI arguments
program.parse();
