import pino from 'pino';

// Structured logging with PII masking (INV-033)
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'req.body.passwordHash',
      'req.body.mfaSecret',
      '*.email',  // Mask email addresses (PII)
      '*.customerEmail',
      '*.passwordHash',
    ],
    remove: true,
  },
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      tenantId: (req as any).user?.tenantId,
      userId: (req as any).user?.userId,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
