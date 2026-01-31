import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { prisma } from '../index';

// Tenant isolation middleware (INV-005, INV-006)
// Sets tenant_id in PostgreSQL session for RLS policies
export async function tenantMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user || !req.user.tenantId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Missing tenant context' },
      });
    }

    // Set PostgreSQL session variable for RLS policies
    // This enforces tenant isolation at the database level
    await prisma.$executeRawUnsafe(
      `SET LOCAL app.current_tenant_id = '${req.user.tenantId}'`
    );

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { code: 'TENANT_ISOLATION_ERROR', message: 'Failed to set tenant context' },
    });
  }
}
