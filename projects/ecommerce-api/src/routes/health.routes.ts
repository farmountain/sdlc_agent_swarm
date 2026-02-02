import { Router } from 'express';

const router = Router();

// Health check endpoint (liveness probe)
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Readiness check (includes dependencies)
router.get('/ready', async (req, res) => {
  try {
    // Check database connectivity
    const { prisma } = await import('../index');
    await prisma.$queryRaw`SELECT 1`;

    // Check Redis connectivity
    const { redis } = await import('../index');
    await redis.ping();

    res.status(200).json({
      success: true,
      status: 'ready',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'connected',
        redis: 'connected',
      },
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'not_ready',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'disconnected',
        redis: 'disconnected',
      },
    });
  }
});

export const healthRoutes = router;
