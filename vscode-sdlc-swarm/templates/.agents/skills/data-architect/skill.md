# Skill: Data Architect Agent (Data Modeling & Governance)

## Purpose
The Data Architect Agent is responsible for designing database schemas, data models, data governance policies, and ensuring data quality, security, and compliance. Focuses on data modeling, PII handling, GDPR compliance, data retention, and migration strategies.

**Core Principle:** "Data is a first-class citizen—model it correctly from day one."

---

## Core Responsibilities

1. **Database Schema Design**: Create normalized, performant database schemas with proper indexing
2. **Data Modeling**: Design entity-relationship diagrams (ERDs), domain models, data dictionaries
3. **PII & Privacy**: Identify Personally Identifiable Information (PII), apply data classification
4. **GDPR/Compliance**: Implement GDPR/CCPA requirements (right to erasure, data portability)
5. **Data Retention**: Define retention policies, archival strategies, GDPR-compliant deletion
6. **Data Migration**: Plan and execute database migrations with zero downtime
7. **Data Quality**: Define constraints, validation rules, data cleansing strategies
8. **Access Control**: Design row-level security (RLS), column-level encryption

---

## Inputs

1. **Business Requirements**
   - Domain model from PRD
   - User stories with data needs
   - Compliance requirements (GDPR, HIPAA, SOC 2)
   - Performance SLAs (query latency, throughput)

2. **Existing Data Context**
   - Legacy database schemas
   - Data migration requirements
   - Data volume estimates
   - Access patterns (read-heavy vs write-heavy)

3. **Technical Constraints**
   - Database technology (PostgreSQL, MySQL, MongoDB)
   - Infrastructure (cloud provider, region)
   - Budget constraints (storage costs)

---

## Output: Data Architecture Specification

### 1. Entity-Relationship Diagram (ERD)

```
┌─────────────────┐
│     Users       │
├─────────────────┤
│ id (PK)         │◄──┐
│ email (UNIQUE)  │   │
│ hashed_password │   │
│ first_name      │   │ 1
│ last_name       │   │
│ created_at      │   │
│ updated_at      │   │
└─────────────────┘   │
                      │
                      │
                      │ N
┌─────────────────┐   │
│     Orders      │   │
├─────────────────┤   │
│ id (PK)         │   │
│ user_id (FK)    │───┘
│ status          │
│ total_amount    │
│ shipping_addr   │───┐
│ created_at      │   │
│ updated_at      │   │ 1
└─────────────────┘   │
         │            │
         │ 1          │
         │            │
         │ N          │
         ▼            │
┌─────────────────┐   │
│  Order_Items    │   │
├─────────────────┤   │
│ id (PK)         │   │
│ order_id (FK)   │   │
│ product_id (FK) │   │
│ quantity        │   │
│ unit_price      │   │
│ subtotal        │   │
└─────────────────┘   │
         │            │
         │            │
         │ N          │
         │            │
         │ 1          │
         ▼            │
┌─────────────────┐   │
│    Products     │   │
├─────────────────┤   │
│ id (PK)         │   │
│ name            │   │
│ description     │   │
│ price           │   │
│ stock_quantity  │   │
│ created_at      │   │
│ updated_at      │   │
└─────────────────┘   │
                      │
                      │ 1
                      │
                      ▼
               ┌─────────────────┐
               │   Addresses     │
               ├─────────────────┤
               │ id (PK)         │
               │ street          │
               │ city            │
               │ state           │
               │ postal_code     │
               │ country         │
               └─────────────────┘
```

---

### 2. Database Schema (SQL DDL)

```sql
-- ============================================================
-- E-Commerce Database Schema
-- Database: PostgreSQL 16.x
-- Generated: 2026-02-05
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Table: users
-- Purpose: User accounts (customers)
-- PII: email, first_name, last_name, hashed_password
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  
  -- Audit timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP,  -- Soft delete for GDPR compliance
  
  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Row-Level Security (RLS) - Users can only see their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_self_access ON users
  FOR ALL
  USING (id = current_setting('app.current_user_id')::UUID);

-- ============================================================
-- Table: addresses
-- Purpose: Shipping/billing addresses (separate table for reusability)
-- PII: street, city, state, postal_code (location data)
-- ============================================================
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(2) NOT NULL DEFAULT 'US',  -- ISO 3166-1 alpha-2
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_addresses_postal_code ON addresses(postal_code);
CREATE INDEX idx_addresses_country ON addresses(country);

-- ============================================================
-- Table: products
-- Purpose: Product catalog
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  
  -- Search optimization
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', name || ' ' || COALESCE(description, ''))
  ) STORED,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP  -- Soft delete (for analytics retention)
);

-- Indexes
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_search ON products USING GIN(search_vector);
CREATE INDEX idx_products_created_at ON products(created_at);

-- ============================================================
-- Table: orders
-- Purpose: Customer orders
-- PII: shipping_address_id (links to address with PII)
-- ============================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shipping_address_id UUID NOT NULL REFERENCES addresses(id),
  
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  
  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT order_status_check CHECK (
    status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')
  )
);

-- Indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ============================================================
-- Table: order_items
-- Purpose: Line items within an order
-- ============================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ============================================================
-- Table: audit_logs (GDPR compliance - track data access)
-- Purpose: Track who accessed PII and when
-- ============================================================
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,  -- 'read', 'update', 'delete'
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);

-- Partitioning (optimize audit log queries)
-- Partition by month for efficient querying and archival
CREATE TABLE audit_logs_y2026m02 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- ============================================================
-- Functions and Triggers
-- ============================================================

-- Trigger: Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Audit log for PII access (GDPR requirement)
CREATE OR REPLACE FUNCTION log_user_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, table_name, record_id)
  VALUES (NEW.id, TG_OP, TG_TABLE_NAME, NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_user_access
  AFTER INSERT OR UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION log_user_access();

-- ============================================================
-- Views (Abstraction for common queries)
-- ============================================================

-- View: Active users (exclude soft-deleted)
CREATE VIEW active_users AS
  SELECT id, email, first_name, last_name, created_at
  FROM users
  WHERE deleted_at IS NULL;

-- View: Order summaries (useful for reporting)
CREATE VIEW order_summaries AS
  SELECT 
    o.id AS order_id,
    o.user_id,
    u.email AS user_email,
    o.status,
    o.total_amount,
    o.created_at,
    COUNT(oi.id) AS item_count
  FROM orders o
  JOIN users u ON o.user_id = u.id
  LEFT JOIN order_items oi ON o.id = oi.order_id
  GROUP BY o.id, o.user_id, u.email, o.status, o.total_amount, o.created_at;

-- ============================================================
-- Indexes for Performance Optimization
-- ============================================================

-- Composite index for common query patterns
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index (only index active orders)
CREATE INDEX idx_orders_active ON orders(id) WHERE status NOT IN ('delivered', 'cancelled');

-- ============================================================
-- Data Retention Policies
-- ============================================================

-- Archive old orders (move to cold storage after 2 years)
-- Implemented via pg_cron or application logic

-- GDPR: Delete user data 90 days after account deletion request
CREATE OR REPLACE FUNCTION delete_user_data_after_retention()
RETURNS void AS $$
BEGIN
  DELETE FROM users WHERE deleted_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Schedule this function to run daily via pg_cron:
-- SELECT cron.schedule('delete-old-users', '0 2 * * *', 'SELECT delete_user_data_after_retention()');
```

---

### 3. Data Dictionary

| Table | Column | Type | Nullable | PII | Description |
|-------|--------|------|----------|-----|-------------|
| `users` | `id` | UUID | No | No | Primary key, unique user identifier |
| `users` | `email` | VARCHAR(255) | No | **Yes** | User email (unique), used for login |
| `users` | `hashed_password` | VARCHAR(255) | No | **Yes** | bcrypt hashed password (never store plaintext) |
| `users` | `first_name` | VARCHAR(100) | Yes | **Yes** | User's first name (personal data) |
| `users` | `last_name` | VARCHAR(100) | Yes | **Yes** | User's last name (personal data) |
| `users` | `created_at` | TIMESTAMP | No | No | Account creation timestamp |
| `users` | `updated_at` | TIMESTAMP | No | No | Last update timestamp (auto-updated via trigger) |
| `users` | `deleted_at` | TIMESTAMP | Yes | No | Soft delete timestamp (GDPR compliance) |
| `orders` | `id` | UUID | No | No | Primary key, unique order identifier |
| `orders` | `user_id` | UUID | No | No | Foreign key to users table |
| `orders` | `shipping_address_id` | UUID | No | **Yes** | Foreign key to addresses table (contains location PII) |
| `orders` | `status` | VARCHAR(50) | No | No | Order status (pending, processing, shipped, delivered, cancelled) |
| `orders` | `total_amount` | DECIMAL(10,2) | No | No | Order total in USD |
| `products` | `search_vector` | tsvector | No | No | Generated column for full-text search |
| `audit_logs` | `ip_address` | INET | Yes | **Yes** | IP address of user who accessed data (GDPR requirement) |

---

### 4. Data Classification

#### PII Categories (GDPR Article 4)

| Category | Fields | Sensitivity | Encryption | Retention |
|----------|--------|-------------|------------|-----------|
| **Identifiers** | `users.email`, `users.first_name`, `users.last_name` | High | Column-level (AES-256) | Delete 90 days after account deletion |
| **Credentials** | `users.hashed_password` | Critical | bcrypt (10 rounds) | Delete immediately on account deletion |
| **Location** | `addresses.*` (street, city, state, postal_code) | Medium | None (encrypted at rest) | Delete 90 days after account deletion |
| **Financial** | `orders.total_amount`, `order_items.unit_price` | Medium | None (aggregated data retained) | Archived after 7 years (tax compliance) |
| **Access Logs** | `audit_logs.*` (IP address, user agent) | High | None (encrypted at rest) | Retained 1 year (GDPR Article 17) |

---

### 5. GDPR Compliance Implementation

#### Right to Access (Article 15)

**API Endpoint:** `GET /api/v1/users/:id/data-export`

**Implementation:**
```sql
-- Generate data export JSON for user
SELECT json_build_object(
  'user', row_to_json(u),
  'orders', (
    SELECT json_agg(row_to_json(o))
    FROM orders o WHERE o.user_id = u.id
  ),
  'audit_logs', (
    SELECT json_agg(row_to_json(al))
    FROM audit_logs al WHERE al.user_id = u.id
  )
)
FROM users u
WHERE u.id = '123e4567-e89b-12d3-a456-426614174000';
```

**Output (JSON):**
```json
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2025-01-15T10:30:00Z"
  },
  "orders": [
    {
      "id": "order-123",
      "status": "delivered",
      "total_amount": 99.99,
      "created_at": "2025-02-01T14:20:00Z"
    }
  ],
  "audit_logs": [
    {
      "action": "read",
      "table_name": "users",
      "timestamp": "2026-02-05T10:00:00Z"
    }
  ]
}
```

---

#### Right to Erasure (Article 17 - "Right to be Forgotten")

**API Endpoint:** `DELETE /api/v1/users/:id`

**Implementation:**
```sql
-- Soft delete (set deleted_at timestamp)
UPDATE users
SET deleted_at = NOW()
WHERE id = '123e4567-e89b-12d3-a456-426614174000';

-- Anonymize orders (retain for analytics but remove PII)
UPDATE orders
SET shipping_address_id = NULL  -- Remove address link
WHERE user_id = '123e4567-e89b-12d3-a456-426614174000';

-- Hard delete after retention period (90 days)
-- Scheduled job runs daily
DELETE FROM users WHERE deleted_at < NOW() - INTERVAL '90 days';
```

---

#### Data Portability (Article 20)

**Export Format:** JSON, CSV, or XML

**Example (CSV export):**
```csv
id,email,first_name,last_name,created_at
123e4567-e89b-12d3-a456-426614174000,user@example.com,John,Doe,2025-01-15T10:30:00Z
```

---

### 6. Migration Strategy

#### Zero-Downtime Migration (Rolling Deployment)

**Steps:**
1. **Expand:** Add new columns/tables alongside old schema (backwards-compatible)
2. **Migrate:** Backfill data from old schema to new schema
3. **Contract:** Remove old columns/tables after all code deployed

**Example: Adding `address_id` to `orders` table**

```sql
-- Step 1: EXPAND (add new column, nullable initially)
ALTER TABLE orders ADD COLUMN shipping_address_id UUID REFERENCES addresses(id);

-- Step 2: MIGRATE (backfill data from old columns to new)
-- Old schema: orders had shipping_street, shipping_city columns
INSERT INTO addresses (street, city, state, postal_code, country)
SELECT DISTINCT shipping_street, shipping_city, shipping_state, shipping_postal_code, shipping_country
FROM orders;

UPDATE orders o
SET shipping_address_id = a.id
FROM addresses a
WHERE o.shipping_street = a.street
  AND o.shipping_city = a.city
  AND o.shipping_state = a.state
  AND o.shipping_postal_code = a.postal_code;

-- Step 3: CONTRACT (drop old columns after code deployed)
ALTER TABLE orders DROP COLUMN shipping_street;
ALTER TABLE orders DROP COLUMN shipping_city;
ALTER TABLE orders DROP COLUMN shipping_state;
ALTER TABLE orders DROP COLUMN shipping_postal_code;
ALTER TABLE orders DROP COLUMN shipping_country;

-- Make new column NOT NULL after migration complete
ALTER TABLE orders ALTER COLUMN shipping_address_id SET NOT NULL;
```

---

### 7. Data Quality Rules

#### Validation Constraints

```sql
-- Email format validation
CONSTRAINT email_format CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
)

-- Price must be non-negative
CONSTRAINT price_positive CHECK (price >= 0)

-- Quantity must be positive
CONSTRAINT quantity_positive CHECK (quantity > 0)

-- Order status must be valid enum
CONSTRAINT order_status_check CHECK (
  status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')
)

-- Country must be ISO 3166-1 alpha-2 code (2 characters)
CONSTRAINT country_code CHECK (LENGTH(country) = 2)
```

#### Referential Integrity

```sql
-- Foreign key constraints with cascading deletes
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE

-- Foreign key with restricted delete (prevent accidental deletion)
product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT
```

---

## Integration with SDLC Swarm

### Position Card Output

```yaml
position_card:
  agent: data_architect
  
  claims:
    - "Designed normalized database schema (3NF) with 5 core tables"
    - "Identified 7 PII fields requiring GDPR compliance (email, name, address)"
    - "Implemented row-level security (RLS) for multi-tenant isolation"
    - "Created audit logging for all PII access (GDPR Article 30)"
    - "Designed zero-downtime migration strategy (expand-migrate-contract)"
  
  plan:
    - "Schema supports 100k users, 1M orders (validated via index analysis)"
    - "GDPR right to erasure implemented (soft delete + 90-day retention)"
    - "Data export API ready for GDPR right to access"
    - "Migration scripts tested in staging (rollback plan documented)"
  
  evidence_pointers:
    - "projects/my-app/DATABASE_SCHEMA.sql"
    - "projects/my-app/docs/DATA_DICTIONARY.md"
    - "projects/my-app/docs/GDPR_COMPLIANCE.md"
    - "projects/my-app/migrations/"
  
  confidence: 0.88
  risks:
    - "Audit log partitioning may need tuning under high load"
    - "Address normalization assumes 1:1 order-to-address (may need M:N later)"
```

---

## Rules (Non-Negotiable)

1. **PII Identification Mandatory:** All PII fields must be documented in data dictionary

2. **GDPR Compliance:** Implement right to access, erasure, and portability (Articles 15, 17, 20)

3. **Audit Logging:** Track all PII access (who, when, what) for compliance

4. **Zero-Downtime Migrations:** Use expand-migrate-contract pattern for production changes

5. **Referential Integrity:** All foreign keys with explicit ON DELETE behavior

6. **Indexing Strategy:** Index all foreign keys, search columns, and query filters

7. **Data Retention:** Define retention policies for all PII (90-day default post-deletion)

---

## Skills Validated

- **C2: Spec + TDD Lifecycle** - Schema is part of spec, validated via migration tests
- **C6: Security & Privacy** - PII protection, GDPR compliance, row-level security
- **C7: Reliability (Data)** - Constraints, referential integrity, backup/recovery

---

## Invariants Satisfied

- **INV-034:** Privacy & compliance (GDPR, data classification)
- **INV-035:** Data quality (validation, constraints, referential integrity)
- **INV-037:** Auditability (audit logs for all PII access)

---

**End of Data Architect Agent Skill**
