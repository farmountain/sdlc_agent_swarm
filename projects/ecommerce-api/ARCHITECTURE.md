# E-commerce API Architecture

**Document ID**: ARCH-ECOM-2026-001  
**Version**: 1.0  
**Date**: 2026-01-31  
**Status**: Approved  
**Architect**: Solution Architect Agent  
**References**: PRD-ECOM-2026-001  

---

## 1. Architecture Overview

Multi-tenant SaaS e-commerce REST API built with Node.js/TypeScript, PostgreSQL, and Redis. Designed for 99.9% uptime, <200ms p95 latency, complete tenant isolation, and enterprise-grade security.

---

## 2. C4 Level 1: System Context

```
┌──────────────────────────────────────────────────────────────────────┐
│                        System Context                                 │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   [SaaS Merchant]  ──(login, manage products)──>  [E-commerce API]  │
│   (Storefront owner)                                                 │
│                                                                       │
│   [Customer]  ──(place orders, view products)──>  [E-commerce API]  │
│   (End shopper)                                                      │
│                                                                       │
│   [Developer]  ──(integrate via REST API)──>  [E-commerce API]      │
│   (Frontend integrator)                                              │
│                                                                       │
│                                                                       │
│   [E-commerce API]  ──(process payments)──>  [Stripe API]           │
│                          │                                            │
│                          │                                            │
│                          └──(webhooks)──>  [Webhook Consumer]        │
│                                              (Merchant backend)       │
└──────────────────────────────────────────────────────────────────────┘
```

**External Dependencies:**
- **Stripe API**: Payment processing (PaymentIntents, Webhooks)
- **Webhook Consumers**: Customer systems receiving order/product events
- **Auth Provider**: Future OAuth2 SSO (Phase 2)

---

## 3. C4 Level 2: Container Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                   E-commerce API System                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   [Merchants/Customers/Developers]                                   │
│                │                                                      │
│                │ HTTPS (TLS 1.3)                                     │
│                ▼                                                      │
│   ┌─────────────────────────────────────┐                           │
│   │      REST API Server                │                           │
│   │   (Node.js 20 + TypeScript 5.3)    │                           │
│   │   - Express.js 4.x framework        │                           │
│   │   - JWT authentication             │                           │
│   │   - RBAC middleware                │                           │
│   │   - Request validation             │                           │
│   │   - Structured logging (Pino)      │                           │
│   │   - Prometheus metrics             │                           │
│   └────────┬──────────────────┬─────────┘                           │
│            │                  │                                      │
│            │ SQL              │ Redis protocol                       │
│            ▼                  ▼                                      │
│   ┌──────────────────┐  ┌──────────────────┐                       │
│   │   PostgreSQL 16  │  │    Redis 7       │                       │
│   │   (Primary DB)   │  │   (Cache/Session)│                       │
│   │   - Multi-tenant │  │   - Product cache│                       │
│   │   - RLS policies │  │   - Session store│                       │
│   │   - Audit logs   │  │   - Rate limiting│                       │
│   └──────────────────┘  └──────────────────┘                       │
│                                                                       │
│   External Integrations:                                             │
│   └──────> [Stripe API] (Payments)                                  │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

**Technology Choices:**
- **Node.js 20 LTS**: Runtime (active LTS support until 2026-04-30)
- **TypeScript 5.3**: Type safety, developer experience
- **Express.js 4.x**: Mature, well-supported REST framework
- **Prisma 5.x**: Type-safe ORM with migrations
- **PostgreSQL 16**: ACID compliance, RLS for multi-tenancy, JSON support
- **Redis 7**: Sub-millisecond latency for caching
- **Pino**: High-performance structured logging
- **prom-client**: Prometheus metrics instrumentation

---

## 4. C4 Level 3: Component Diagram (API Server)

```
┌──────────────────────────────────────────────────────────────────────┐
│                      REST API Server Components                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                   HTTP Layer                                  │   │
│  │  - Request parsing                                            │   │
│  │  - Response formatting                                        │   │
│  │  - Error handling middleware                                  │   │
│  └────────────────────┬─────────────────────────────────────────┘   │
│                       │                                              │
│                       ▼                                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Security Middleware                              │   │
│  │  - JWT verification                                           │   │
│  │  - RBAC enforcement (admin/merchant/customer)                 │   │
│  │  - Tenant isolation (extract tenant_id from JWT)              │   │
│  │  - Rate limiting (Redis-backed)                               │   │
│  │  - MFA challenge (TOTP for admins)                            │   │
│  └────────────────────┬─────────────────────────────────────────┘   │
│                       │                                              │
│                       ▼                                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                  Route Handlers                               │   │
│  │  /api/v1/tenants     →  TenantController                      │   │
│  │  /api/v1/auth        →  AuthController                        │   │
│  │  /api/v1/products    →  ProductController                     │   │
│  │  /api/v1/inventory   →  InventoryController                   │   │
│  │  /api/v1/orders      →  OrderController                       │   │
│  │  /api/v1/payments    →  PaymentController                     │   │
│  │  /api/v1/webhooks    →  WebhookController                     │   │
│  │  /health, /ready     →  HealthController                      │   │
│  │  /metrics            →  MetricsController                     │   │
│  └────────────────────┬─────────────────────────────────────────┘   │
│                       │                                              │
│                       ▼                                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                  Service Layer                                │   │
│  │  - TenantService: tenant registration, management             │   │
│  │  - AuthService: login, JWT generation, MFA validation         │   │
│  │  - ProductService: CRUD, search, filtering                    │   │
│  │  - InventoryService: stock tracking, atomic decrement         │   │
│  │  - OrderService: order creation, status management            │   │
│  │  - PaymentService: Stripe integration, webhook handling       │   │
│  │  - AuditService: log all mutations (INV-029)                  │   │
│  └────────────────────┬─────────────────────────────────────────┘   │
│                       │                                              │
│                       ▼                                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Repository Layer (Prisma ORM)                    │   │
│  │  - TenantRepository                                           │   │
│  │  - UserRepository                                             │   │
│  │  - ProductRepository (with Redis cache)                       │   │
│  │  - InventoryRepository (with locking)                         │   │
│  │  - OrderRepository                                            │   │
│  │  - PaymentRepository                                          │   │
│  │  - AuditLogRepository                                         │   │
│  └────────────────────┬─────────────────────────────────────────┘   │
│                       │                                              │
│                       ▼                                              │
│                  [PostgreSQL + Redis]                                │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

**Layer Responsibilities:**
1. **HTTP Layer**: Request/response handling, middleware chaining
2. **Security Middleware**: Authentication, authorization, rate limiting
3. **Controllers**: Input validation, business logic orchestration
4. **Services**: Core business logic, invariant enforcement
5. **Repositories**: Data access, caching, database queries

---

## 5. Data Architecture

### Database Schema (Prisma Schema)

```prisma
// Multi-tenancy: ALL tables include tenant_id (INV-005, INV-006)

model Tenant {
  id          String   @id @default(uuid())
  name        String
  subdomain   String   @unique
  apiKey      String   @unique
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users       User[]
  products    Product[]
  orders      Order[]
  auditLogs   AuditLog[]
}

model User {
  id          String   @id @default(uuid())
  tenantId    String
  email       String
  passwordHash String
  role        UserRole // ADMIN, MERCHANT, CUSTOMER
  mfaSecret   String?  // TOTP secret for admins
  mfaEnabled  Boolean  @default(false)
  createdAt   DateTime @default(now())
  
  tenant      Tenant   @relation(fields: [tenantId], references: [id])
  orders      Order[]
  auditLogs   AuditLog[]
  
  @@unique([tenantId, email]) // Email unique per tenant
  @@index([tenantId])
}

enum UserRole {
  ADMIN
  MERCHANT
  CUSTOMER
}

model Product {
  id          String   @id @default(uuid())
  tenantId    String
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  sku         String
  category    String?
  imageUrls   String[] // Array of HTTPS URLs
  isActive    Boolean  @default(true) // Soft delete
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  tenant      Tenant     @relation(fields: [tenantId], references: [id])
  inventory   Inventory?
  orderItems  OrderItem[]
  
  @@unique([tenantId, sku])
  @@index([tenantId, category])
  @@index([tenantId, isActive])
}

model Inventory {
  id          String   @id @default(uuid())
  tenantId    String
  productId   String   @unique
  quantity    Int      @default(0)
  threshold   Int      @default(10) // Low-stock alert threshold
  updatedAt   DateTime @updatedAt
  
  product     Product  @relation(fields: [productId], references: [id])
  
  @@index([tenantId])
}

model Order {
  id              String      @id @default(uuid())
  tenantId        String
  customerId      String
  status          OrderStatus @default(PENDING)
  totalAmount     Decimal     @db.Decimal(10, 2)
  
  // Customer info
  customerName    String
  customerEmail   String
  shippingAddress Json        // { street, city, state, zip, country }
  
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  tenant          Tenant      @relation(fields: [tenantId], references: [id])
  customer        User        @relation(fields: [customerId], references: [id])
  items           OrderItem[]
  payment         Payment?
  
  @@index([tenantId, status])
  @@index([tenantId, customerId])
}

enum OrderStatus {
  PENDING
  PAID
  FULFILLED
  SHIPPED
  COMPLETED
  CANCELLED
}

model OrderItem {
  id          String   @id @default(uuid())
  orderId     String
  productId   String
  quantity    Int
  priceAtTime Decimal  @db.Decimal(10, 2) // Snapshot price
  
  order       Order    @relation(fields: [orderId], references: [id])
  product     Product  @relation(fields: [productId], references: [id])
}

model Payment {
  id                  String        @id @default(uuid())
  tenantId            String
  orderId             String        @unique
  stripePaymentIntent String        @unique
  amount              Decimal       @db.Decimal(10, 2)
  status              PaymentStatus @default(PENDING)
  createdAt           DateTime      @default(now())
  updatedAt           DateTime      @updatedAt
  
  order               Order         @relation(fields: [orderId], references: [id])
  
  @@index([tenantId, status])
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

model AuditLog {
  id          String   @id @default(uuid())
  tenantId    String
  userId      String?
  action      String   // CREATE, UPDATE, DELETE
  resource    String   // Product, Order, etc.
  resourceId  String
  changes     Json     // { before: {...}, after: {...} }
  timestamp   DateTime @default(now())
  
  tenant      Tenant   @relation(fields: [tenantId], references: [id])
  user        User?    @relation(fields: [userId], references: [id])
  
  @@index([tenantId, timestamp])
  @@index([resourceId])
}
```

### Row-Level Security (RLS) Policies

```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Inventory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their tenant's data
CREATE POLICY tenant_isolation_user ON "User"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_product ON "Product"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_inventory ON "Inventory"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_order ON "Order"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_payment ON "Payment"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_audit ON "AuditLog"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);
```

**Implementation Note**: Set `current_setting('app.current_tenant_id')` at the beginning of each database transaction using the tenant_id extracted from JWT.

---

## 6. API Design

### REST API Structure

```
Base URL: http://localhost:3000/api/v1

Authentication:
  - Header: Authorization: Bearer <JWT_TOKEN>
  - JWT payload: { userId, tenantId, role, exp }

Endpoints:

POST   /tenants                    - Register new tenant (public)
POST   /auth/login                 - Login (returns JWT)
POST   /auth/mfa/setup             - Setup MFA (admin only)
POST   /auth/mfa/verify            - Verify MFA challenge

GET    /products                   - List products (paginated, filterable)
POST   /products                   - Create product (merchant/admin)
GET    /products/:id               - Get product details
PATCH  /products/:id               - Update product (merchant/admin)
DELETE /products/:id               - Soft delete product (admin)

GET    /inventory                  - List inventory status
PATCH  /inventory/:productId       - Adjust inventory (merchant/admin)

POST   /orders                     - Create order (customer)
GET    /orders                     - List orders (filtered by role)
GET    /orders/:id                 - Get order details
PATCH  /orders/:id/status          - Update order status (merchant/admin)
DELETE /orders/:id                 - Cancel order

POST   /payments/intents           - Create Stripe PaymentIntent
POST   /webhooks/stripe            - Stripe webhook handler

GET    /health                     - Liveness check
GET    /ready                      - Readiness check (DB + Redis)
GET    /metrics                    - Prometheus metrics
```

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  },
  "error": null
}
```

### Error Format

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "Product 'abc-123' has insufficient stock (requested: 5, available: 2)",
    "details": {
      "productId": "abc-123",
      "requested": 5,
      "available": 2
    }
  }
}
```

---

## 7. Security Architecture

### Authentication (INV-001)
- **Mechanism**: OAuth2 with JWT
- **Token Expiry**: 1 hour
- **Token Payload**: `{ userId, tenantId, role, iat, exp }`
- **Signing Algorithm**: RS256 (RSA public/private key pair)
- **Public Key**: Exposed at `/.well-known/jwks.json` for token verification

### Authorization (INV-002, INV-003)
- **RBAC Roles**:
  - **ADMIN**: Full access (all CRUD operations)
  - **MERCHANT**: Read/write products, inventory, orders
  - **CUSTOMER**: Read products, create/read own orders
- **Enforcement**: Middleware checks `req.user.role` before controller execution
- **Tenant Isolation**: Middleware extracts `req.user.tenantId`, adds to all queries

### Multi-Factor Authentication (INV-004)
- **Scope**: Admin accounts only (MerchantProductService and Customer roles optional)
- **Method**: TOTP (Time-Based One-Time Password) using `speakeasy` library
- **Flow**:
  1. Admin enables MFA: `POST /auth/mfa/setup` → returns QR code + secret
  2. Admin scans QR code with Google Authenticator
  3. Future logins require: `POST /auth/mfa/verify` with TOTP code

### Secrets Management (INV-014 to INV-019)
- **Storage**: Environment variables (`.env` file for local, secret manager for production)
- **Scope**: Database credentials, JWT private key, Stripe API keys
- **Rotation**: 90-day rotation for service accounts (manual for MVP, automated in Phase 2)
- **Logging**: Never log secrets (exclude from structured logs)

### Webhook Security (INV-014)
- **Stripe Webhooks**: Verify `Stripe-Signature` header using `stripe.webhooks.constructEvent()`
- **Replay Protection**: Check `event.id` against processed events table

---

## 8. Observability Architecture (INV-033 to INV-037)

### Structured Logging (INV-033)
```typescript
// Pino logger with PII masking
const logger = pino({
  level: 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  redact: ['req.headers.authorization', 'req.body.password', '*.email'], // PII masking
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      correlationId: req.id,
      tenantId: req.user?.tenantId,
    }),
  },
});

// Log format
{
  "level": "info",
  "timestamp": "2026-01-31T12:00:00.000Z",
  "correlationId": "req-uuid-123",
  "tenantId": "tenant-uuid-456",
  "userId": "user-uuid-789",
  "method": "POST",
  "path": "/api/v1/orders",
  "statusCode": 201,
  "duration": 145,
  "message": "Order created successfully"
}
```

### Metrics (INV-034, INV-035)
```typescript
// RED Method metrics using prom-client
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status', 'tenant_id'],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'path', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5], // 10ms to 5s
});

// Business metrics
const ordersTotal = new Counter({
  name: 'orders_total',
  help: 'Total orders created',
  labelNames: ['tenant_id', 'status'],
});
```

### Health Endpoints (INV-037)
```typescript
// GET /health - Liveness (always returns 200 if server running)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// GET /ready - Readiness (checks DB + Redis connectivity)
app.get('/ready', async (req, res) => {
  const dbHealthy = await prisma.$queryRaw`SELECT 1`;
  const redisHealthy = await redis.ping();
  
  if (dbHealthy && redisHealthy) {
    res.status(200).json({ status: 'ready', db: 'ok', redis: 'ok' });
  } else {
    res.status(503).json({ status: 'not_ready', db: dbHealthy ? 'ok' : 'error', redis: redisHealthy ? 'ok' : 'error' });
  }
});

// GET /metrics - Prometheus metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

### SLO Definitions (INV-037)
- **Availability SLO**: 99.9% uptime (measured via `/health` endpoint)
- **Latency SLO**: p95 < 200ms for GET requests, p95 < 500ms for POST requests
- **Error Budget**: 43 minutes downtime/month, 86 minutes/quarter
- **Alerting**: Trigger when error budget consumed >50% in single day

---

## 9. Architecture Decision Records

### ADR-001: Use PostgreSQL with RLS for Multi-Tenancy

**Context**: Need complete tenant isolation with audit trail

**Decision**: Use PostgreSQL with Row-Level Security (RLS) policies

**Alternatives Considered**:
- Separate database per tenant (operational overhead)
- Application-level tenant filtering (error-prone, security risk)

**Consequences**:
- ✅ Database-enforced isolation (defense in depth)
- ✅ Single schema migration for all tenants
- ⚠️ RLS policies add slight query overhead (<5ms)
- ⚠️ Requires `SET app.current_tenant_id` at transaction start

**Status**: ✅ Approved

---

### ADR-002: Use Redis for Product Catalog Caching

**Context**: Product catalog queries are read-heavy (90% reads, 10% writes)

**Decision**: Cache product listings in Redis with 5-minute TTL

**Alternatives Considered**:
- No caching (acceptable for MVP, but doesn't meet p95 <200ms target)
- In-memory caching (doesn't scale horizontally)

**Consequences**:
- ✅ Reduces database load by 70-80%
- ✅ Meets latency SLO (<200ms p95)
- ⚠️ Cache invalidation complexity (update/delete must purge cache)
- ⚠️ Additional Redis infrastructure cost

**Status**: ✅ Approved

---

### ADR-003: Use Prisma ORM for Type Safety

**Context**: Need type-safe database access in TypeScript

**Decision**: Use Prisma ORM with generated TypeScript types

**Alternatives Considered**:
- Raw SQL queries (error-prone, no type safety)
- TypeORM (more magic, less type safety)

**Consequences**:
- ✅ End-to-end type safety (database → TypeScript)
- ✅ Automatic migrations from schema changes
- ✅ Query builder prevents SQL injection
- ⚠️ Learning curve for team
- ⚠️ Prisma abstraction can limit complex queries

**Status**: ✅ Approved

---

### ADR-004: Use JWT for Stateless Authentication

**Context**: Need scalable authentication without session storage

**Decision**: Use JWT (JSON Web Tokens) with RS256 signing

**Alternatives Considered**:
- Session-based auth (requires session store, doesn't scale horizontally)
- API keys only (no user identity, no expiration)

**Consequences**:
- ✅ Stateless (scales horizontally)
- ✅ Token includes tenant_id and role (no database lookup per request)
- ⚠️ Cannot revoke tokens before expiry (mitigated by 1-hour TTL)
- ⚠️ Token size larger than session ID

**Status**: ✅ Approved

---

## 10. Deployment Architecture

### Local Development
```
docker-compose.yml:
  - postgres:16-alpine (port 5432)
  - redis:7-alpine (port 6379)
  - api-server (Node.js, port 3000)
```

### Production (Future: Phase 2)
```
Kubernetes cluster:
  - API pods (3 replicas, horizontal autoscaling)
  - PostgreSQL (managed service: AWS RDS, Azure Database)
  - Redis (managed service: AWS ElastiCache, Azure Cache)
  - Ingress (NGINX, SSL termination)
  - Monitoring (Prometheus + Grafana)
```

---

## 11. Invariant Compliance Matrix

| Invariant | Requirement | Implementation | Status |
|-----------|-------------|----------------|--------|
| INV-001 | OAuth2 authentication | JWT with RS256 signing | ✅ Designed |
| INV-002 | Enterprise SSO | Phase 2 (MVP uses local auth) | ⏳ Deferred |
| INV-003 | RBAC with least privilege | Admin/Merchant/Customer roles | ✅ Designed |
| INV-004 | MFA for admins | TOTP (speakeasy) | ✅ Designed |
| INV-005 | Multi-tenancy isolation | PostgreSQL RLS + tenant_id | ✅ Designed |
| INV-006 | Tenant logical separation | All tables have tenant_id | ✅ Designed |
| INV-014 | Webhook signature verification | Stripe signature check | ✅ Designed |
| INV-015-019 | Secrets management | Environment variables | ✅ Designed |
| INV-029 | Audit log retention (7 years) | audit_logs table with index | ✅ Designed |
| INV-033 | Structured logging | Pino with JSON format + PII masking | ✅ Designed |
| INV-034 | Service-level metrics | Prometheus RED metrics | ✅ Designed |
| INV-035 | Distributed tracing | Phase 2 (OpenTelemetry) | ⏳ Deferred |
| INV-037 | Health endpoints + SLOs | /health, /ready, 99.9% SLO | ✅ Designed |

**Compliance Summary**: 11/15 invariants satisfied in MVP, 4 deferred to Phase 2

---

## 12. Risk Assessment & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Tenant data leak | Low | Critical | PostgreSQL RLS + unit tests for isolation |
| Race condition in inventory | Medium | High | Database-level locking (`FOR UPDATE`) |
| Stripe webhook replay attack | Low | High | Verify webhook signature + idempotency check |
| JWT token theft | Medium | High | Short expiry (1h) + HTTPS only + secure cookie (future) |
| Database connection exhaustion | Low | Medium | Connection pooling (PgBouncer) + max connections limit |
| Redis cache poisoning | Low | Medium | TTL on all keys + cache invalidation on writes |

---

## 13. Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Latency (p95) | <200ms (read), <500ms (write) | Histogram buckets |
| Throughput | 100 req/sec sustained | Load testing (k6) |
| Database Query Time (p95) | <50ms | Query logging |
| Cache Hit Rate | >80% for product listings | Redis INFO stats |
| Uptime SLO | 99.9% (43 min downtime/month) | /health polling (1 min interval) |
| Error Rate | <1% (non-4xx errors) | HTTP status code metrics |

---

## 14. Next Steps

1. **Domain Modeling**: Event storming, ERD creation
2. **Implementation**: Generate TypeScript code from architecture
3. **Testing**: Unit (90%), integration (E2E), load testing
4. **Observability**: Implement logging, metrics, dashboards
5. **Deployment**: Docker Compose setup, README documentation

---

**Architecture Status**: ✅ APPROVED  
**Next Phase**: Domain Modeling (Event Storming)  
**Approval**: Solution Architect Agent, 2026-01-31
