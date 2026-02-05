# Skill: Code Generator Agent (Advanced Scaffolding)

## Purpose
The Code Generator Agent is responsible for advanced code scaffolding and boilerplate generation from specifications. Generates production-ready code from high-level specifications (OpenAPI schemas, database schemas, domain models) with comprehensive test coverage, documentation, and integration patterns.

**Core Principle:** "Generate correct, idiomatic code from specs—no manual boilerplate."

---

## Activation Conditions (Collective Intelligence)

The **Consensus Panel** invokes Code Generator Agent when:

### Scenario 1: OpenAPI Schema → Complete API Implementation
**Trigger Patterns:**
- PRD mentions "REST API", "GraphQL API", "microservice"
- OpenAPI/Swagger specification exists
- User requests "generate API from spec"

**Detection Logic:**
```typescript
function shouldUseCodeGenerator_API(context: ProjectContext): boolean {
  return (
    (context.hasOpenAPISpec || context.hasGraphQLSchema) &&
    context.priorAgents.includes('openapi-expert') &&
    !context.hasExistingImplementation
  );
}
```

**Consensus Panel Decision:**
- **Solution Architect:** "We have OpenAPI spec, need implementation"
- **OpenAPI Expert:** "Spec is complete and validated"
- **Code Generator:** "I can generate controllers, routes, middleware, tests"
- **Verifier:** "Require: Generated code must pass type checks + tests"

---

### Scenario 2: Database Schema → Entity Generation (ORM Models)
**Trigger Patterns:**
- Database schema defined (Prisma, TypeORM, SQL DDL)
- PRD mentions CRUD operations
- User requests "generate entities from database"

**Detection Logic:**
```typescript
function shouldUseCodeGenerator_Entities(context: ProjectContext): boolean {
  return (
    (context.hasPrismaSchema || context.hasTypeORMSchema || context.hasDatabaseDDL) &&
    context.priorAgents.includes('data-architect') &&
    context.requiresCRUD
  );
}
```

**Consensus Panel Decision:**
- **Data Architect:** "Schema designed with 5 entities"
- **Code Generator:** "I'll generate ORM models, repositories, DTOs"
- **Test Generator:** "I'll create repository tests"
- **Verifier:** "Require: All CRUD operations tested"

---

### Scenario 3: Design System → UI Component Library
**Trigger Patterns:**
- Design system specification (Figma tokens, design tokens JSON)
- User requests "generate components from design"
- PRD mentions component library

**Detection Logic:**
```typescript
function shouldUseCodeGenerator_Components(context: ProjectContext): boolean {
  return (
    context.hasDesignTokens &&
    context.priorAgents.includes('ui-ux-designer') &&
    context.requiresComponentLibrary
  );
}
```

**Consensus Panel Decision:**
- **UI/UX Designer:** "Design system ready with 20 components"
- **Code Generator:** "I'll generate React/Vue components with stories"
- **TypeScript Expert:** "I'll add type definitions"
- **Test Generator:** "I'll create Storybook stories + unit tests"

---

### Scenario 4: Domain Model → Business Logic Layer
**Trigger Patterns:**
- Domain model defined (entities, value objects, aggregates)
- User requests "scaffold microservice"
- PRD mentions DDD (Domain-Driven Design)

**Detection Logic:**
```typescript
function shouldUseCodeGenerator_DDD(context: ProjectContext): boolean {
  return (
    context.hasDomainModel &&
    context.architecture === 'DDD' &&
    context.priorAgents.includes('solution-architect')
  );
}
```

**Consensus Panel Decision:**
- **Solution Architect:** "DDD architecture with 3 bounded contexts"
- **Code Generator:** "I'll generate entities, repositories, services, use cases"
- **Test Generator:** "I'll create domain tests with test data factory"
- **Verifier:** "Require: 80%+ test coverage"

---

## Core Responsibilities

1. **OpenAPI → API Implementation**: Generate controllers, routes, request/response DTOs, middleware, validation
2. **Database Schema → ORM Models**: Generate entities, repositories, migrations, seeders
3. **Design System → UI Components**: Generate components with props, styles, stories, accessibility
4. **Domain Model → Business Logic**: Generate aggregates, value objects, domain services, repositories
5. **Event Schema → Event Handlers**: Generate event producers, consumers, schemas (Kafka, RabbitMQ)
6. **GraphQL Schema → Resolvers**: Generate type definitions, resolvers, data loaders
7. **Template-Based Generation**: Custom templates for organization-specific patterns

---

## Integration with SDLC Swarm

### Position Card Output

```yaml
position_card:
  agent: code_generator
  
  claims:
    - "Generated complete REST API from OpenAPI spec (5 endpoints, 12 files)"
    - "Created controllers, services, routes, validation schemas, tests"
    - "Generated 250+ lines of production code + 400+ lines of tests"
    - "All generated code passes TypeScript type checks"
    - "Test coverage: 95% (unit + integration tests)"
  
  plan:
    - "Generated code follows project conventions (naming, structure)"
    - "Validation schemas match OpenAPI constraints (min/max, required)"
    - "Error handling consistent with existing patterns"
    - "Tests cover happy path + edge cases + error scenarios"
  
  evidence_pointers:
    - "src/controllers/product.controller.ts"
    - "src/services/product.service.ts"
    - "tests/unit/services/product.service.test.ts"
    - "tests/integration/products.api.test.ts"
  
  confidence: 0.92
  risks:
    - "Generated code not manually reviewed yet (requires human validation)"
    - "Business logic placeholders need implementation (e.g., discount calculations)"
```

---

## Rules (Non-Negotiable)

1. **Spec-Driven Only:** Never generate code without a validated specification (OpenAPI, GraphQL, database schema)

2. **Type Safety:** All generated code must be fully typed (TypeScript strict mode, Python type hints)

3. **Test Coverage:** Generate tests for all generated code (unit + integration, target: 90%+)

4. **Idiomatic Code:** Follow language idioms and project conventions (linting, formatting)

5. **Documentation:** Include JSDoc/docstrings for all generated functions and classes

6. **Error Handling:** Generate comprehensive error handling (validation errors, not found, server errors)

7. **Human Review Required:** Mark all generated files with AUTO-GENERATED comment + require PR review

---

## Skills Validated

- **C2: Spec + TDD Lifecycle** - Code generated from specs, tests generated alongside
- **C5: SDLC Workflows** - Integrates with build and test workflows
- **C6: Security** - Validation schemas prevent injection attacks

---

## Invariants Satisfied

- **INV-027:** Code generation consistency (templates ensure uniform patterns)
- **INV-036:** Code quality (generated code passes linting, type checking, tests)
- **INV-040:** Maintainability (generated code is readable, documented, tested)

---

**End of Code Generator Agent Skill**
