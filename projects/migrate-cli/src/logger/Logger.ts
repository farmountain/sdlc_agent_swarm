/**
 * Winston Logger Implementation
 * 
 * Structured JSON logging with winston.
 * Supports configurable log levels and output formats.
 * 
 * NFR-005: Observability (Structured Logging)
 */

import winston from 'winston';
import { ILogger } from '../types';

export class Logger implements ILogger {
  private winston: winston.Logger;
  
  constructor(config: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text';
    outputFile?: string;
  }) {
    const formats = [];
    
    // Always include timestamp
    formats.push(winston.format.timestamp());
    
    // Add format based on config
    if (config.format === 'json') {
      formats.push(winston.format.json());
    } else {
      formats.push(
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
          return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
        })
      );
    }
    
    const transports: winston.transport[] = [
      new winston.transports.Console(),
    ];
    
    // Add file transport if specified
    if (config.outputFile) {
      transports.push(
        new winston.transports.File({ filename: config.outputFile })
      );
    }
    
    this.winston = winston.createLogger({
      level: config.level,
      format: winston.format.combine(...formats),
      transports,
    });
  }
  
  debug(message: string, meta?: Record<string, unknown>): void {
    this.winston.debug(message, meta);
  }
  
  info(message: string, meta?: Record<string, unknown>): void {
    this.winston.info(message, meta);
  }
  
  warn(message: string, meta?: Record<string, unknown>): void {
    this.winston.warn(message, meta);
  }
  
  error(message: string, meta?: Record<string, unknown>): void {
    this.winston.error(message, meta);
  }
}
