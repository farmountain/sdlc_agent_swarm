# E-commerce API Domain Model

**Document ID**: DM-ECOM-2026-001  
**Version**: 1.0  
**Date**: 2026-01-31  
**Status**: Approved  
**Domain Modeler**: Domain Model Agent  
**References**: PRD-ECOM-2026-001, ARCH-ECOM-2026-001  

---

## 1. Event Storming Summary

### Domain Events (Orange Stickies)

**Tenant Management**
- `TenantRegistered`: New tenant created with subdomain and API key
- `TenantSuspended`: Tenant access revoked (payment failure Phase 2)

**Authentication**
- `UserLoggedIn`: User authenticated, JWT issued
- `MFAEnabled`: Admin enables two-factor authentication
- `MFAVerified`: TOTP code validated successfully
- `LoginFailed`: Invalid credentials or MFA failure

**Product Catalog**
- `ProductCreated`: New product added to catalog
- `ProductUpdated`: Product details modified (price, description, etc.)
- `ProductDeactivated`: Product soft-deleted (isActive = false)
- `ProductImageAdded`: Image URL attached to product

**Inventory**
- `InventoryAdjusted`: Stock manually changed (admin/merchant)
- `LowStockDetected`: Inventory below threshold
- `StockReserved`: Inventory decremented when order placed
- `StockReleased`: Inventory restored when order cancelled

**Orders**
- `OrderCreated`: Customer placed order (cart → order)
- `OrderPaid`: Payment confirmed, order marked paid
- `OrderFulfilled`: Merchant packed order
- `OrderShipped`: Shipping carrier picked up order
- `OrderCompleted`: Customer received order
- `OrderCancelled`: Customer or merchant cancelled order

**Payments**
- `PaymentIntentCreated`: Stripe PaymentIntent initiated
- `PaymentSucceeded`: Stripe confirmed payment
- `PaymentFailed`: Payment declined or error
- `RefundIssued`: Payment refunded to customer

**Audit**
- `AuditLogCreated`: All mutations logged for compliance (INV-029)

---

## 2. Commands (Blue Stickies)

**Tenant Management**
- `RegisterTenant`: Create new tenant account
- `SuspendTenant`: Deactivate tenant (admin only)

**Authentication**
- `Login`: Authenticate user with email/password
- `SetupMFA`: Enable MFA for admin account
- `VerifyMFA`: Validate TOTP code

**Product Catalog**
- `CreateProduct`: Add new product
- `UpdateProduct`: Modify product details
- `DeactivateProduct`: Soft delete product
- `AddProductImage`: Attach image URL

**Inventory**
- `AdjustInventory`: Manual stock adjustment
- `ReserveStock`: Decrement stock (order placement)
- `ReleaseStock`: Restore stock (order cancellation)

**Orders**
- `PlaceOrder`: Convert cart to order
- `UpdateOrderStatus`: Transition order through states
- `CancelOrder`: Cancel pending or paid order

**Payments**
- `CreatePaymentIntent`: Initiate Stripe payment
- `HandleWebhook`: Process Stripe webhook event

---

## 3. Aggregates (Yellow Stickies)

### Aggregate: Tenant
**Invariants**:
- Subdomain must be unique
- API key must be unique and securely generated
- All data scoped to tenant_id (INV-005, INV-006)

**Commands**: RegisterTenant, SuspendTenant  
**Events**: TenantRegistered, TenantSuspended  

---

### Aggregate: User
**Invariants**:
- Email unique per tenant (not globally)
- Admin users must have MFA enabled (INV-004)
- Password hashed with bcrypt (min 10 rounds)

**Commands**: Login, SetupMFA, VerifyMFA  
**Events**: UserLoggedIn, MFAEnabled, MFAVerified, LoginFailed  

---

### Aggregate: Product
**Invariants**:
- SKU unique per tenant
- Price must be positive
- Image URLs must be HTTPS
- Soft delete only (isActive flag, no hard delete)

**Commands**: CreateProduct, UpdateProduct, DeactivateProduct, AddProductImage  
**Events**: ProductCreated, ProductUpdated, ProductDeactivated, ProductImageAdded  

---

### Aggregate: Inventory
**Invariants**:
- Quantity cannot be negative
- Stock reservation must be atomic (prevent overselling)
- Low stock threshold configurable per product

**Commands**: AdjustInventory, ReserveStock, ReleaseStock  
**Events**: InventoryAdjusted, LowStockDetected, StockReserved, StockReleased  

---

### Aggregate: Order
**Invariants**:
- Order status transitions must be valid:
  - PENDING → PAID (payment confirmed)
  - PAID → FULFILLED (merchant packed)
  - FULFILLED → SHIPPED (tracking number added)
  - SHIPPED → COMPLETED (delivery confirmed)
  - PENDING/PAID → CANCELLED (within cancellation window)
- Cannot cancel order after FULFILLED
- Total amount calculated from order items
- Customer info required (name, email, shipping address)

**Commands**: PlaceOrder, UpdateOrderStatus, CancelOrder  
**Events**: OrderCreated, OrderPaid, OrderFulfilled, OrderShipped, OrderCompleted, OrderCancelled  

---

### Aggregate: Payment
**Invariants**:
- Payment amount must match order total
- Stripe PaymentIntent ID must be unique
- Webhook signature must be verified (INV-014)
- Payment status synced with order status

**Commands**: CreatePaymentIntent, HandleWebhook  
**Events**: PaymentIntentCreated, PaymentSucceeded, PaymentFailed, RefundIssued  

---

## 4. Policies (Purple Stickies)

**Policy**: When `OrderPlaced` → `ReserveStock`
- Atomically decrement inventory for all order items
- If insufficient stock, reject order

**Policy**: When `PaymentSucceeded` → `MarkOrderPaid`
- Update order status to PAID
- Send order confirmation (Phase 2: email notification)

**Policy**: When `OrderCancelled` → `ReleaseStock` + `RefundPayment`
- Restore inventory quantities
- Initiate Stripe refund if payment was captured

**Policy**: When `InventoryAdjusted` → Check `LowStockThreshold`
- If quantity < threshold, emit `LowStockDetected`
- Future: Send alert to merchant

**Policy**: When `ProductUpdated` → `InvalidateCache`
- Purge Redis cache entry for product
- Maintain cache consistency

---

## 5. External Systems (Purple Stickies)

- **Stripe API**: Payment processing, webhooks
- **Email Service** (Phase 2): Order confirmation, low-stock alerts
- **Webhook Consumers**: Customer systems receiving order/product events

---

## 6. Bounded Contexts

### Context 1: Tenant & Identity Management
**Responsibilities**: Tenant registration, user authentication, MFA  
**Aggregates**: Tenant, User  
**Entry Points**: POST /tenants, POST /auth/login, POST /auth/mfa/*  

---

### Context 2: Product Catalog
**Responsibilities**: Product CRUD, search, filtering  
**Aggregates**: Product  
**Entry Points**: /products/*  

---

### Context 3: Inventory & Stock
**Responsibilities**: Stock tracking, reservation, low-stock alerts  
**Aggregates**: Inventory  
**Entry Points**: /inventory/*  

---

### Context 4: Order Management
**Responsibilities**: Order placement, status transitions, cancellation  
**Aggregates**: Order, OrderItem  
**Entry Points**: /orders/*  

---

### Context 5: Payment Processing
**Responsibilities**: Stripe integration, webhook handling, refunds  
**Aggregates**: Payment  
**Entry Points**: /payments/*, /webhooks/stripe  

---

### Context 6: Audit & Compliance
**Responsibilities**: Mutation logging, compliance reporting (INV-029, INV-030)  
**Aggregates**: AuditLog  
**Entry Points**: Internal (no direct API, background logging)  

---

## 7. Entity-Relationship Diagram (ERD)

```
┌──────────────────────────────────────────────────────────────────────┐
│                     Multi-Tenant E-commerce ERD                       │
│                   (tenant_id in all tables for INV-005/006)           │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐
│       Tenant            │
│─────────────────────────│
│ PK id (UUID)            │
│    name                 │
│    subdomain (UNIQUE)   │
│    apiKey (UNIQUE)      │
│    createdAt            │
│    updatedAt            │
└───────┬─────────────────┘
        │
        │ 1:N
        │
        ├──────────────┬──────────────┬──────────────┬──────────────┐
        │              │              │              │              │
        ▼              ▼              ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│    User     │ │   Product   │ │    Order    │ │   Payment   │ │  AuditLog   │
│─────────────│ │─────────────│ │─────────────│ │─────────────│ │─────────────│
│ PK id       │ │ PK id       │ │ PK id       │ │ PK id       │ │ PK id       │
│ FK tenantId │ │ FK tenantId │ │ FK tenantId │ │ FK tenantId │ │ FK tenantId │
│    email    │ │    name     │ │ FK customerId│ │ FK orderId  │ │ FK userId   │
│    password │ │    desc     │ │    status   │ │    stripeId │ │    action   │
│    Hash     │ │    price    │ │    total    │ │    amount   │ │    resource │
│    role     │ │    sku      │ │    customer │ │    status   │ │    resourceId│
│    mfaSecret│ │    category │ │    Name     │ │    createdAt│ │    changes  │
│    mfaEnable│ │    imageUrls│ │    customer │ │    updatedAt│ │    timestamp│
│    createdAt│ │    isActive │ │    Email    │ └─────────────┘ └─────────────┘
└──────┬──────┘ │    createdAt│ │    shipping │
       │        │    updatedAt│ │    Address  │
       │        └──────┬──────┘ │    createdAt│
       │               │        │    updatedAt│
       │               │ 1:1    └──────┬──────┘
       │               │               │
       │               ▼               │ 1:N
       │        ┌─────────────┐        │
       │        │  Inventory  │        │
       │        │─────────────│        │
       │        │ PK id       │        │
       │        │ FK tenantId │        │
       │        │ FK productId│        ▼
       │        │    quantity │ ┌─────────────┐
       │        │    threshold│ │  OrderItem  │
       │        │    updatedAt│ │─────────────│
       │        └─────────────┘ │ PK id       │
       │                        │ FK orderId  │
       │ 1:N                    │ FK productId│
       │                        │    quantity │
       └───────────────────────>│  priceAtTime│
                                └─────────────┘

Indexes (Performance Optimization):
- tenant_id on ALL tables (RLS queries)
- (tenantId, email) UNIQUE on User
- (tenantId, sku) UNIQUE on Product
- (tenantId, category) on Product (filtering)
- (tenantId, status) on Order (filtering)
- (tenantId, customerId) on Order (customer order history)
- (resourceId) on AuditLog (trace changes to specific resource)
- (tenantId, timestamp) on AuditLog (compliance queries)
```

---

## 8. Multi-Tenancy Strategy (INV-005, INV-006)

### Database-Level Isolation

#### 1. Schema Design
- **ALL tables** include `tenant_id (UUID)` as foreign key to Tenant table
- Composite indexes: `(tenant_id, <other_columns>)` for query performance
- Unique constraints scoped per tenant: `(tenant_id, email)` for User, `(tenant_id, sku)` for Product

#### 2. Row-Level Security (RLS)
```sql
-- PostgreSQL RLS policies

-- Set current tenant context at transaction start
BEGIN;
SET LOCAL app.current_tenant_id = '<tenant-uuid-from-jwt>';

-- RLS policies enforce isolation
CREATE POLICY tenant_isolation_user ON "User"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_product ON "Product"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_order ON "Order"
  USING ("tenantId" = current_setting('app.current_tenant_id')::uuid);

-- Queries automatically filtered by RLS
SELECT * FROM "Product";  -- Only returns products for current_tenant_id

COMMIT;
```

#### 3. Application-Level Enforcement
```typescript
// Middleware extracts tenant_id from JWT
app.use((req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const decoded = jwt.verify(token, publicKey);
  req.user = { tenantId: decoded.tenantId, userId: decoded.userId, role: decoded.role };
  next();
});

// Repository layer adds tenant_id to all queries
class ProductRepository {
  async findAll(tenantId: string, filters: Filters) {
    return prisma.product.findMany({
      where: {
        tenantId,  // ALWAYS include tenant_id
        category: filters.category,
        isActive: true,
      },
    });
  }
}
```

---

## 9. Aggregate Lifecycle Examples

### Example 1: Place Order (Happy Path)

1. **Command**: `PlaceOrder({ customerId, items[], shippingAddress })`
2. **Validation**:
   - Check stock availability for all items
   - Calculate total amount
3. **Events Emitted**:
   - `OrderCreated`
   - `StockReserved` (for each product)
   - `AuditLogCreated`
4. **Side Effects**:
   - Inventory decremented atomically
   - Order record created with status=PENDING
5. **Response**: `{ orderId, totalAmount, status: 'PENDING' }`

---

### Example 2: Payment Workflow

1. **Command**: `CreatePaymentIntent({ orderId, amount })`
2. **Validation**:
   - Order exists and status=PENDING
   - Amount matches order total
3. **External Call**: Stripe API → create PaymentIntent
4. **Event Emitted**: `PaymentIntentCreated`
5. **Response**: `{ clientSecret }` (for frontend to confirm payment)

**Async Webhook**:
1. Stripe sends webhook: `payment_intent.succeeded`
2. **Command**: `HandleWebhook({ event, signature })`
3. **Validation**: Verify webhook signature (INV-014)
4. **Events Emitted**: `PaymentSucceeded`, `OrderPaid`
5. **Side Effect**: Update order status=PAID

---

### Example 3: Cancel Order with Refund

1. **Command**: `CancelOrder({ orderId })`
2. **Validation**:
   - Order status in [PENDING, PAID] (cannot cancel after FULFILLED)
   - Within cancellation window (e.g., 1 hour)
3. **Events Emitted**:
   - `OrderCancelled`
   - `StockReleased` (for each product)
   - `RefundIssued` (if payment captured)
   - `AuditLogCreated`
4. **Side Effects**:
   - Inventory quantities restored
   - Stripe refund initiated
   - Order status=CANCELLED

---

## 10. Database Constraints & Business Rules

### Tenant
- `subdomain` UNIQUE (no collisions)
- `apiKey` UNIQUE (securely generated UUID)

### User
- `(tenantId, email)` UNIQUE (email unique per tenant)
- `passwordHash` NOT NULL (bcrypt with 10 rounds minimum)
- `mfaEnabled = true` REQUIRES `mfaSecret` NOT NULL (for admins, INV-004)
- `role` ENUM (ADMIN, MERCHANT, CUSTOMER)

### Product
- `(tenantId, sku)` UNIQUE (SKU unique per tenant)
- `price` > 0 (CHECK constraint)
- `imageUrls` ARRAY of HTTPS URLs (application validation)
- `isActive` DEFAULT true (soft delete)

### Inventory
- `productId` UNIQUE (1:1 with Product)
- `quantity` >= 0 (CHECK constraint)
- `threshold` >= 0 (CHECK constraint)

### Order
- `status` ENUM (PENDING, PAID, FULFILLED, SHIPPED, COMPLETED, CANCELLED)
- `totalAmount` > 0 (CHECK constraint)
- `shippingAddress` JSON with required fields (application validation)
- Valid status transitions (application-enforced state machine)

### Payment
- `orderId` UNIQUE (1:1 with Order)
- `stripePaymentIntent` UNIQUE (idempotency)
- `amount` > 0 (CHECK constraint)
- `status` ENUM (PENDING, PAID, FAILED, REFUNDED)

### AuditLog
- `timestamp` DEFAULT now() (auto-populated)
- `changes` JSON with {before, after} structure
- Retention: 7 years (INV-029) - no automatic deletion

---

## 11. Query Patterns

### High-Frequency Queries (Optimize with Indexes)

```sql
-- Product search by category (INDEX: tenantId, category, isActive)
SELECT * FROM "Product"
WHERE "tenantId" = $1 AND "category" = $2 AND "isActive" = true
ORDER BY "createdAt" DESC
LIMIT 20 OFFSET 0;

-- Customer order history (INDEX: tenantId, customerId)
SELECT * FROM "Order"
WHERE "tenantId" = $1 AND "customerId" = $2
ORDER BY "createdAt" DESC;

-- Low-stock products (INDEX: tenantId on Inventory)
SELECT p.*, i.quantity, i.threshold
FROM "Product" p
JOIN "Inventory" i ON p.id = i."productId"
WHERE p."tenantId" = $1 AND i.quantity < i.threshold;

-- Audit trail for resource (INDEX: resourceId)
SELECT * FROM "AuditLog"
WHERE "resourceId" = $1
ORDER BY "timestamp" DESC;
```

### Caching Strategy (Redis)

```typescript
// Cache product listings (5-minute TTL)
const cacheKey = `products:${tenantId}:${category}:${page}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

const products = await prisma.product.findMany({ where: { tenantId, category } });
await redis.setex(cacheKey, 300, JSON.stringify(products));  // 5 min TTL

// Cache invalidation on write
await redis.del(`products:${tenantId}:*`);  // Purge all product cache for tenant
```

---

## 12. Invariant Validation Summary

| Invariant | Domain Model Enforcement | Implementation |
|-----------|--------------------------|----------------|
| INV-005 | Tenant isolation | tenant_id in all tables, RLS policies |
| INV-006 | Logical separation | Unique indexes scoped per tenant |
| INV-029 | Audit log retention | AuditLog table, 7-year retention, no auto-delete |
| INV-030 | Audit completeness | Log ALL mutations (create, update, delete) |

---

## 13. Next Steps

1. **Prisma Schema Generation**: Convert ERD to `schema.prisma` file
2. **Repository Implementation**: Create type-safe data access layer
3. **Domain Services**: Implement aggregate business logic
4. **Event Handlers**: Wire up domain events to side effects
5. **Integration Tests**: Validate multi-tenancy isolation, audit logging

---

**Domain Model Status**: ✅ APPROVED  
**Next Phase**: Code Generation (TypeScript Implementation)  
**Approval**: Domain Model Agent, 2026-01-31
