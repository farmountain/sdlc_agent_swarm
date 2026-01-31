import express from 'express';
import pinoHttp from 'pino-http';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import { register } from 'prom-client';
import { logger } from './lib/logger';
import { authMiddleware } from './middleware/auth.middleware';
import { tenantMiddleware } from './middleware/tenant.middleware';
import { errorHandler } from './middleware/error.middleware';
import { metricsMiddleware } from './middleware/metrics.middleware';

// Routes
import { tenantRoutes } from './routes/tenant.routes';
import { authRoutes } from './routes/auth.routes';
import { productRoutes } from './routes/product.routes';
import { orderRoutes } from './routes/order.routes';
import { healthRoutes } from './routes/health.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Prisma and Redis
export const prisma = new PrismaClient();
export const redis = createClient({ url: process.env.REDIS_URL });

// HTTP request logging with Pino
app.use(pinoHttp({ logger }));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Metrics collection
app.use(metricsMiddleware);

// Health endpoints (no auth required)
app.use('/health', healthRoutes);
app.use('/ready', healthRoutes);
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Public routes
app.use('/api/v1/tenants', tenantRoutes);
app.use('/api/v1/auth', authRoutes);

// Protected routes (require JWT + tenant isolation)
app.use('/api/v1/products', authMiddleware, tenantMiddleware, productRoutes);
app.use('/api/v1/orders', authMiddleware, tenantMiddleware, orderRoutes);

// Error handling
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Connect Redis
    await redis.connect();
    logger.info('✅ Redis connected');

    // Test database connection
    await prisma.$connect();
    logger.info('✅ PostgreSQL connected');

    app.listen(PORT, () => {
      logger.info(`🚀 E-commerce API running on port ${PORT}`);
      logger.info(`📊 Metrics: http://localhost:${PORT}/metrics`);
      logger.info(`❤️  Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error({ error }, 'Failed to start server');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  await redis.disconnect();
  process.exit(0);
});

startServer();

export default app;
