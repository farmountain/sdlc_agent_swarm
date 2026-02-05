# Skill: Refactoring Agent (Automated Code Transformation)

## Purpose
The Refactoring Agent is responsible for automated code refactoring and transformation. Executes refactoring operations identified by Code Reviewer or requested by developers, ensuring code quality improvements while preserving behavior. Applies refactoring patterns (Extract Method, Rename Symbol, Move Class, etc.) with automated testing validation.

**Core Principle:** "Improve code structure without changing behavior—automated, safe, verified."

---

## Activation Conditions (Collective Intelligence)

The **Consensus Panel** invokes Refactoring Agent when:

### Scenario 1: Code Review Flags Quality Issues
**Trigger Patterns:**
- Code Reviewer identifies code smells (long method, duplicate code, complex conditionals)
- Tech debt score exceeds threshold (>20% duplication, >500 line files)
- Cyclomatic complexity >15

**Detection Logic:**
```typescript
function shouldUseRefactoringAgent_CodeSmells(context: ProjectContext): boolean {
  return (
    context.codeReviewIssues.some(issue =>
      ['duplicate-code', 'long-method', 'complex-conditional', 'large-class'].includes(issue.type)
    ) &&
    context.priorAgents.includes('code-reviewer')
  );
}
```

**Consensus Panel Decision:**
- **Code Reviewer:** "Found 5 refactoring opportunities (duplication, long methods)"
- **Refactoring Agent:** "I can extract methods, deduplicate code, simplify conditionals"
- **Test Generator:** "I'll verify behavior unchanged with tests"
- **Verifier:** "Require: All existing tests pass + new tests for extracted code"

---

### Scenario 2: Architectural Restructuring
**Trigger Patterns:**
- Solution Architect recommends layer separation
- Violates architecture pattern (mixing business logic in controllers)
- User requests "move logic to service layer"

**Detection Logic:**
```typescript
function shouldUseRefactoringAgent_Architecture(context: ProjectContext): boolean {
  return (
    context.architectureViolations.length > 0 &&
    context.priorAgents.includes('solution-architect')
  );
}
```

**Consensus Panel Decision:**
- **Solution Architect:** "Business logic mixed in controller (violates separation of concerns)"
- **Refactoring Agent:** "I'll extract service layer, move logic from controller"
- **TypeScript Expert:** "I'll ensure type safety maintained"
- **Verifier:** "Require: Integration tests still pass"

---

### Scenario 3: Renaming for Consistency
**Trigger Patterns:**
- Naming inconsistency detected (getUserByID vs getUser_by_id)
- User requests "rename symbol across codebase"
- API breaking change requires renaming

**Detection Logic:**
```typescript
function shouldUseRefactoringAgent_Rename(context: ProjectContext): boolean {
  return (
    context.namingInconsistencies.length > 0 ||
    context.userRequest.includes('rename')
  );
}
```

**Consensus Panel Decision:**
- **Code Reviewer:** "Naming inconsistent (getUserByID used 15 times, getUser_by_id used 8 times)"
- **Refactoring Agent:** "I'll standardize to getUserById across codebase"
- **Verifier:** "Require: All references updated, tests pass"

---

### Scenario 4: Large File Splitting
**Trigger Patterns:**
- File exceeds 500 lines
- Multiple concerns in single file
- User requests "split file into modules"

**Detection Logic:**
```typescript
function shouldUseRefactoringAgent_SplitFile(context: ProjectContext): boolean {
  return (
    context.files.some(file => file.lines > 500) &&
    context.codeReviewIssues.some(issue => issue.type === 'large-class')
  );
}
```

**Consensus Panel Decision:**
- **Code Reviewer:** "user.service.ts is 850 lines (too large, multiple concerns)"
- **Refactoring Agent:** "I'll split into UserService, UserAuthService, UserProfileService"
- **Verifier:** "Require: All imports updated, tests pass"

---

## Core Responsibilities

1. **Extract Method/Function**: Extract code blocks into reusable functions
2. **Rename Symbol**: Rename variables, functions, classes across codebase
3. **Move Class/Module**: Relocate classes/modules to appropriate packages
4. **Extract Interface**: Extract interfaces from concrete classes
5. **Inline Variable/Method**: Inline trivial variables or single-use methods
6. **Simplify Conditionals**: Replace complex conditionals with polymorphism or guard clauses
7. **Remove Duplication**: Consolidate duplicate code into shared functions
8. **Split Large Files**: Break large files into cohesive modules

---

## Inputs

1. **Refactoring Triggers**
   - Code review feedback (specific issues identified)
   - Static analysis results (code smells, complexity metrics)
   - Developer requests (explicit refactoring tasks)
   - Architecture violations (layer mixing, tight coupling)

2. **Codebase Context**
   - Source code (TypeScript, Python, Rust, Go, etc.)
   - Test suite (unit tests, integration tests)
   - Type definitions (TypeScript interfaces, Python protocols)
   - Dependency graph (imports, module relationships)

3. **Refactoring Constraints**
   - Preserve behavior (tests must pass)
   - Maintain API compatibility (public interfaces unchanged)
   - Follow naming conventions
   - Respect architecture boundaries

---

## Output: Refactored Code + Validation

### Example 1: Extract Method (Long Method Code Smell)

**Before: Long Method with Duplication**
```typescript
// src/services/order.service.ts (150 lines, complex)
class OrderService {
  async processOrder(orderId: string): Promise<Order> {
    // Fetch order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, user: true },
    });

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    // Validate inventory (30 lines of complex logic)
    for (const item of order.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new ApiError(400, `Product ${item.productId} not found`);
      }

      if (product.stockQuantity < item.quantity) {
        throw new ApiError(400, `Insufficient stock for ${product.name}`);
      }
    }

    // Calculate total (20 lines)
    let subtotal = 0;
    for (const item of order.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      subtotal += product.price * item.quantity;
    }

    let discount = 0;
    if (order.user.membershipTier === 'gold') {
      discount = subtotal * 0.1;
    } else if (order.user.membershipTier === 'silver') {
      discount = subtotal * 0.05;
    }

    const tax = subtotal * 0.08;
    const total = subtotal - discount + tax;

    // Update inventory (20 lines)
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockQuantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'processing',
        totalAmount: total,
      },
    });

    return updatedOrder;
  }
}
```

**After: Extracted Methods (Refactored)**
```typescript
// src/services/order.service.ts (50 lines, clean)
class OrderService {
  /**
   * Process an order: validate inventory, calculate total, update inventory
   */
  async processOrder(orderId: string): Promise<Order> {
    const order = await this.fetchOrder(orderId);
    
    await this.validateInventory(order.items);
    
    const total = await this.calculateOrderTotal(order);
    
    await this.updateInventory(order.items);
    
    return this.updateOrderStatus(orderId, 'processing', total);
  }

  // EXTRACTED METHODS (new files for clarity)
  
  private async fetchOrder(orderId: string): Promise<OrderWithRelations> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, user: true },
    });

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    return order;
  }

  private async validateInventory(items: OrderItem[]): Promise<void> {
    // Moved to: src/services/inventory-validator.service.ts
    return InventoryValidator.validate(items);
  }

  private async calculateOrderTotal(order: OrderWithRelations): Promise<number> {
    // Moved to: src/services/order-calculator.service.ts
    return OrderCalculator.calculateTotal(order);
  }

  private async updateInventory(items: OrderItem[]): Promise<void> {
    // Moved to: src/services/inventory-updater.service.ts
    return InventoryUpdater.updateStock(items);
  }

  private async updateOrderStatus(
    orderId: string,
    status: string,
    totalAmount: number
  ): Promise<Order> {
    return prisma.order.update({
      where: { id: orderId },
      data: { status, totalAmount },
    });
  }
}
```

**New File: `src/services/order-calculator.service.ts`**
```typescript
// AUTO-GENERATED by Refactoring Agent
// Extracted from: order.service.ts
// Refactoring: Extract Method → Extract Class

export class OrderCalculator {
  /**
   * Calculate order total with discounts and tax
   */
  static async calculateTotal(order: OrderWithRelations): Promise<number> {
    const subtotal = await this.calculateSubtotal(order.items);
    const discount = this.calculateDiscount(subtotal, order.user.membershipTier);
    const tax = this.calculateTax(subtotal);
    
    return subtotal - discount + tax;
  }

  private static async calculateSubtotal(items: OrderItem[]): Promise<number> {
    let subtotal = 0;
    
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      subtotal += product.price * item.quantity;
    }
    
    return subtotal;
  }

  private static calculateDiscount(subtotal: number, tier: string): number {
    const discountRates: Record<string, number> = {
      gold: 0.1,
      silver: 0.05,
      bronze: 0.0,
    };
    
    return subtotal * (discountRates[tier] || 0);
  }

  private static calculateTax(subtotal: number): number {
    const TAX_RATE = 0.08;
    return subtotal * TAX_RATE;
  }
}
```

**Tests: Verify Behavior Unchanged**
```typescript
// tests/unit/services/order.service.test.ts (updated)
describe('OrderService.processOrder', () => {
  it('should process order successfully (behavior unchanged after refactoring)', async () => {
    const orderId = 'test-order-123';
    
    // Mock data (same as before refactoring)
    const mockOrder = {
      id: orderId,
      items: [
        { productId: 'prod-1', quantity: 2 },
      ],
      user: { membershipTier: 'gold' },
    };
    
    // Execute
    const result = await orderService.processOrder(orderId);
    
    // Assert (same expectations as before)
    expect(result.status).toBe('processing');
    expect(result.totalAmount).toBeCloseTo(19.44); // subtotal 20 - 10% discount + 8% tax
  });
});

// tests/unit/services/order-calculator.service.test.ts (NEW)
describe('OrderCalculator', () => {
  it('should calculate gold member discount correctly', async () => {
    const order = {
      items: [{ productId: 'prod-1', quantity: 2, price: 10 }],
      user: { membershipTier: 'gold' },
    };
    
    const total = await OrderCalculator.calculateTotal(order);
    
    // subtotal: 20, discount: 2 (10%), tax: 1.6 (8%), total: 19.6
    expect(total).toBeCloseTo(19.6);
  });
});
```

---

### Example 2: Rename Symbol Across Codebase

**Trigger:** Inconsistent naming (`getUserByID` vs `getUser_by_id`)

**Refactoring Operation:**
```typescript
// Rename all occurrences:
// getUserByID → getUserById (camelCase convention)

// Step 1: Find all references (17 files, 45 occurrences)
const references = await findAllReferences('getUserByID');

// Step 2: Rename with AST transformation
for (const ref of references) {
  await renameIdentifier(ref, 'getUserById');
}

// Step 3: Update tests
await updateTestNames('getUserByID', 'getUserById');

// Step 4: Validate (run tests)
const testResults = await runTests();
if (!testResults.success) {
  throw new Error('Refactoring broke tests - reverting');
}
```

**Changed Files (17 total):**
- `src/services/user.service.ts`
- `src/controllers/user.controller.ts`
- `src/routes/user.routes.ts`
- `tests/unit/services/user.service.test.ts`
- ... (13 more files)

---

### Example 3: Simplify Complex Conditionals

**Before: Complex Nested Conditionals**
```typescript
function calculateShippingCost(order: Order): number {
  if (order.totalAmount > 100) {
    if (order.user.membershipTier === 'gold') {
      return 0; // Free shipping for gold members on orders >$100
    } else if (order.user.membershipTier === 'silver') {
      return 5; // Discounted shipping for silver members
    } else {
      return 10; // Standard shipping
    }
  } else {
    if (order.user.membershipTier === 'gold') {
      return 5; // Discounted for gold, small orders
    } else {
      return 15; // Standard shipping for small orders
    }
  }
}
```

**After: Simplified with Strategy Pattern**
```typescript
// Strategy Pattern (Refactored)
interface ShippingStrategy {
  calculateCost(order: Order): number;
}

class GoldMemberShipping implements ShippingStrategy {
  calculateCost(order: Order): number {
    return order.totalAmount > 100 ? 0 : 5;
  }
}

class SilverMemberShipping implements ShippingStrategy {
  calculateCost(order: Order): number {
    return order.totalAmount > 100 ? 5 : 15;
  }
}

class StandardShipping implements ShippingStrategy {
  calculateCost(order: Order): number {
    return order.totalAmount > 100 ? 10 : 15;
  }
}

class ShippingCalculator {
  private strategies: Record<string, ShippingStrategy> = {
    gold: new GoldMemberShipping(),
    silver: new SilverMemberShipping(),
    standard: new StandardShipping(),
  };

  calculateShippingCost(order: Order): number {
    const tier = order.user.membershipTier || 'standard';
    return this.strategies[tier].calculateCost(order);
  }
}
```

---

## Refactoring Patterns Catalog

### 1. Extract Method
**When:** Function >30 lines, doing multiple things
**How:** Extract code block into separate method with descriptive name

### 2. Extract Class
**When:** Class >500 lines, multiple responsibilities
**How:** Create new class, move related methods/properties

### 3. Rename Symbol
**When:** Naming inconsistent or unclear
**How:** Rename with find-all-references, update tests

### 4. Move Method
**When:** Method uses data from another class more than its own
**How:** Move method to appropriate class, update call sites

### 5. Replace Conditional with Polymorphism
**When:** Complex if/else or switch statements based on type
**How:** Create strategy classes, use polymorphism

### 6. Inline Variable/Method
**When:** Variable/method used once, name doesn't add clarity
**How:** Replace variable/method with its value/body

### 7. Remove Duplication
**When:** Same code appears in multiple places
**How:** Extract common code into shared function

### 8. Introduce Parameter Object
**When:** Function has >5 parameters
**How:** Group related parameters into object

---

## Safety Mechanisms

### Pre-Refactoring Checklist
1. ✅ All tests pass before refactoring
2. ✅ Code committed to version control (can rollback)
3. ✅ Refactoring scope defined (specific files/functions)
4. ✅ Expected behavior documented

### Post-Refactoring Validation
1. ✅ All existing tests still pass (behavior unchanged)
2. ✅ New tests added for extracted code
3. ✅ Type checking passes (no type errors)
4. ✅ Linting passes (code style consistent)
5. ✅ Code review required (human validation)

### Rollback Strategy
If validation fails:
```bash
# Automatic rollback on test failure
git reset --hard HEAD
git clean -fd
```

---

## Integration with SDLC Swarm

### Position Card Output

```yaml
position_card:
  agent: refactoring_agent
  
  claims:
    - "Refactored OrderService: Extracted 4 methods into separate classes (150 lines → 50 lines)"
    - "Created InventoryValidator, OrderCalculator, InventoryUpdater services"
    - "Reduced cyclomatic complexity from 18 → 4 (below threshold of 10)"
    - "All 24 existing tests still pass (behavior verified)"
    - "Added 12 new unit tests for extracted classes"
  
  plan:
    - "Extracted methods now reusable across codebase"
    - "Improved testability (can test calculator independently)"
    - "Reduced code duplication by 40%"
    - "Improved readability (single responsibility principle)"
  
  evidence_pointers:
    - "src/services/order.service.ts (refactored)"
    - "src/services/order-calculator.service.ts (new)"
    - "src/services/inventory-validator.service.ts (new)"
    - "tests/unit/services/order-calculator.service.test.ts (new)"
    - "tests/unit/services/order.service.test.ts (updated, all pass)"
  
  confidence: 0.95
  risks:
    - "Requires manual code review (automated refactoring may miss context)"
```

---

## Rules (Non-Negotiable)

1. **Behavior Preservation:** All existing tests must pass after refactoring (no behavior changes)

2. **Atomic Operations:** Each refactoring operation is a single, reversible commit

3. **Test Coverage:** Add tests for newly extracted code (maintain or improve coverage)

4. **Type Safety:** Refactored code must pass type checking (no `any` types introduced)

5. **Human Review:** All refactoring PRs require code review (automated refactoring not trusted blindly)

6. **Rollback on Failure:** Automatically rollback if tests fail post-refactoring

7. **Incremental Changes:** Large refactorings split into small, reviewable steps

---

## Skills Validated

- **C2: Spec + TDD Lifecycle** - Tests validate behavior unchanged
- **C5: SDLC Workflows** - Refactoring integrated into code review workflow
- **C10: Continuous Learning** - Code quality improvements captured

---

## Invariants Satisfied

- **INV-027:** Code quality consistency (refactoring improves quality)
- **INV-036:** Maintainability (reduced complexity, improved readability)
- **INV-041:** Technical debt management (refactoring pays down debt)

---

**End of Refactoring Agent Skill**
