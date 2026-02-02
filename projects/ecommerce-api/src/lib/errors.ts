export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    options: {
      statusCode: number;
      code: string;
      details?: Record<string, unknown>;
      cause?: unknown;
    }
  ) {
    super(message, { cause: options.cause });
    this.name = this.constructor.name;
    this.statusCode = options.statusCode;
    this.code = options.code;
    this.details = options.details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>, cause?: unknown) {
    super(message, { statusCode: 400, code: 'VALIDATION_ERROR', details, cause });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details?: Record<string, unknown>, cause?: unknown) {
    super(message, { statusCode: 401, code: 'UNAUTHORIZED', details, cause });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details?: Record<string, unknown>, cause?: unknown) {
    super(message, { statusCode: 403, code: 'FORBIDDEN', details, cause });
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found', details?: Record<string, unknown>, cause?: unknown) {
    super(message, { statusCode: 404, code: 'NOT_FOUND', details, cause });
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', details?: Record<string, unknown>, cause?: unknown) {
    super(message, { statusCode: 409, code: 'CONFLICT', details, cause });
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', details?: Record<string, unknown>, cause?: unknown) {
    super(message, { statusCode: 500, code: 'INTERNAL_ERROR', details, cause });
  }
}
