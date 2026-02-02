import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';
import { AppError, InternalServerError } from '../lib/errors';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err instanceof AppError) {
    logger.warn({ err, path: req.path }, 'Application error');
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
  }

  const internalError = new InternalServerError('Unexpected server error', undefined, err);
  logger.error({ err: internalError, path: req.path }, 'Unhandled error');

  return res.status(internalError.statusCode).json({
    success: false,
    error: {
      code: internalError.code,
      message: internalError.message,
    },
  });
}
