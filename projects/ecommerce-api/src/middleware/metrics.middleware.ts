import { Request, Response, NextFunction } from 'express';
import { Counter, Histogram } from 'prom-client';

// Prometheus metrics (INV-034, INV-035)
// RED Method: Request Rate, Error Rate, Duration

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status', 'tenant_id'],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency in seconds',
  labelNames: ['method', 'path', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5], // 10ms to 5s
});

const ordersTotal = new Counter({
  name: 'orders_total',
  help: 'Total number of orders created',
  labelNames: ['tenant_id', 'status'],
});

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

  // Track response
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const tenantId = (req as any).user?.tenantId || 'unknown';

    // Request counter
    httpRequestsTotal.inc({
      method: req.method,
      path: req.route?.path || req.path,
      status: res.statusCode,
      tenant_id: tenantId,
    });

    // Latency histogram
    httpRequestDuration.observe(
      {
        method: req.method,
        path: req.route?.path || req.path,
        status: res.statusCode,
      },
      duration
    );
  });

  next();
}

export { ordersTotal };
