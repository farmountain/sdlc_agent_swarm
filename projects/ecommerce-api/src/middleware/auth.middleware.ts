import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../lib/logger';

const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY || '';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    tenantId: string;
    role: 'ADMIN' | 'MERCHANT' | 'CUSTOMER';
  };
}

// JWT authentication middleware (INV-001)
export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing or invalid authorization header',
        },
      });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify JWT signature with RS256
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY, {
      algorithms: ['RS256'],
    }) as {
      userId: string;
      tenantId: string;
      role: 'ADMIN' | 'MERCHANT' | 'CUSTOMER';
      iat: number;
      exp: number;
    };

    // Attach user context to request
    req.user = {
      userId: decoded.userId,
      tenantId: decoded.tenantId,
      role: decoded.role,
    };

    logger.debug({ userId: decoded.userId, tenantId: decoded.tenantId }, 'User authenticated');

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: { code: 'TOKEN_EXPIRED', message: 'JWT token has expired' },
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid JWT token' },
      });
    }

    logger.error({ error }, 'Authentication error');
    return res.status(500).json({
      success: false,
      error: { code: 'AUTH_ERROR', message: 'Authentication failed' },
    });
  }
}

// RBAC enforcement middleware (INV-002, INV-003)
export function requireRole(...roles: ('ADMIN' | 'MERCHANT' | 'CUSTOMER')[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: `Access denied. Required roles: ${roles.join(', ')}`,
        },
      });
    }

    next();
  };
}
