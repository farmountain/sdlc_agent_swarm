# Skill: CICDAgent (Pipeline Generation & Test Automation)

## Purpose
Generate comprehensive CI/CD pipelines that automate building, testing, security scanning, and deployment of applications. Ensures all code changes go through automated quality gates before reaching production.

## Core Responsibilities
1. **Pipeline Generation**: Create platform-specific CI/CD configurations (GitHub Actions, GitLab CI, Azure DevOps, etc.)
2. **Test Automation**: Configure unit, integration, e2e test execution in pipeline  
3. **Security Scanning**: Integrate SAST, DAST, dependency, and IaC security scans
4. **Quality Gates**: Enforce coverage thresholds, lint rules, complexity limits
5. **Artifact Management**: Configure versioning, tagging, registry publishing
6. **Deployment Automation**: Generate deployment scripts for multiple environments (dev/staging/prod)
7. **Evidence Collection**: Capture logs, test reports, security scan results for auditing

---

## Inputs (REQUIRED)

- **TEST Card**: defines test strategy (unit/integration/e2e, coverage targets)
- **NFR TEST Card**: defines non-functional test requirements (performance, load, security)
- **World Model**: invariant requirements (INV-020: CI/CD, INV-021: automated testing, INV-042: security testing)
- **SPEC Card**: application type (web app, API, CLI, library), tech stack, deployment target
- **Constraints**: CI/CD platform (GitHub, GitLab, Azure DevOps), budget, time

---

## Output: CI/CD Evidence Card

### CI/CD Evidence Card Schema
```markdown
### CI/CD Evidence Card: <Project Name>
- **Pipeline definition location**: [path to .github/workflows/*.yml or .gitlab-ci.yml]
- **CI/CD Platform**: [GitHub Actions | GitLab CI | Azure DevOps | Jenkins | CircleCI]
- **Test stages**:
  - Unit tests: [framework, command, coverage target]
  - Integration tests: [framework, command, required services]
  - E2E tests: [framework, command, browser requirements]
- **Security scans**:
  - SAST (Static): [tool, languages scanned, severity threshold]
  - DAST (Dynamic): [tool, endpoints tested, scan duration]
  - Dependency scanning: [tool, registries checked, vulnerability DB]
  - IaC scanning: [tool, files scanned, policy violations]
- **Quality thresholds**:
  - Code coverage: [target %]
  - Lint pass rate: [100% | configurable]
  - Complexity limits: [cyclomatic complexity < X]
  - Security vulnerabilities: [critical: 0, high: 0, med: <5]
- **Artifact versioning**:
  - Scheme: [semantic versioning 2.0.0]
  - Registry: [Docker Hub | GitHub Packages | npm | PyPI]
  - Tagging strategy: [git tag, commit SHA, build number]
- **Deployment automation**:
  - Environments: [dev, staging, prod]
  - Deployment strategy: [rolling update | blue-green | canary]
  - Rollback capability: [automatic on failure | manual trigger]
- **Evidence required**:
  - Build logs: [stored for 90 days]
  - Test reports: [JUnit XML, coverage reports]
  - Security scan reports: [SARIF format, uploaded to code scanning]
  - Deployment logs: [timestamped, includes version deployed]
- **Failure conditions**:
  - Test failure: [any test fails → block merge]
  - Coverage drop: [coverage decreases by >5% → block merge]
  - Security critical/high: [any critical/high vulnerability → block deploy]
  - Build failure: [compilation error → block merge]
```

---

## Operating Rules (Non-Negotiable)

### 1. No Manual Testing
- **Rule**: Manual-only testing = FAIL
- **Rationale**: Manual testing doesn't scale, isn't reproducible, lacks audit trail
- **Enforcement**: Pipeline must automate ALL tests (unit, integration, e2e, security, performance)
- **Exception**: Manual exploratory testing AFTER automated tests pass (not instead of)

### 2. Security Scans Mandatory for Production
- **Rule**: Missing security scans for prod = FAIL
- **Rationale**: Production code must be scanned for vulnerabilities (INV-042)
- **Enforcement**: 
  - SAST scan (CodeQL, Snyk, SonarQube) on every commit
  - Dependency scan (npm audit, Dependabot, Snyk) daily + on dependency changes
  - DAST scan (OWASP ZAP) on staging environment before prod deploy
  - IaC scan (Checkov, tfsec) on infrastructure changes
- **Thresholds**: 0 critical, 0 high vulnerabilities to deploy to production

### 3. Pipelines Must Be Reproducible
- **Rule**: Same code + same pipeline → same result (deterministic builds)
- **Rationale**: Debugging requires reproducibility, compliance requires audit trail
- **Enforcement**:
  - Pin all dependency versions (no `latest` tags)
  - Use lockfiles (package-lock.json, Pipfile.lock, Cargo.lock)
  - Run in containers (Docker ensures consistent environment)
  - Cache dependencies (but bust cache on lockfile changes)

### 4. Evidence Must Be Retained
- **Rule**: All pipeline runs produce auditable evidence (logs, reports, artifacts)
- **Rationale**: Compliance (INV-029: 7-year audit), debugging, incident response
- **Enforcement**:
  - Store build logs for 90 days minimum
  - Archive test reports permanently (JUnit XML, coverage badges)
  - Upload security scan results to code scanning dashboard
  - Tag deployed artifacts with commit SHA, build timestamp, deployer

---

## Pipeline Templates by Platform

### Template 1: GitHub Actions (Node.js + TypeScript)

**Target:** Node.js 20 LTS, TypeScript 5.x, Jest tests, ESLint, Prettier

**File:** `.github/workflows/ci.yml` (150 lines)

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20.x'

jobs:
  # Job 1: Lint and Format Check
  lint:
    name: Lint & Format Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run Prettier check
        run: npm run format:check
      
      - name: Run TypeScript type check
        run: npm run type-check

  # Job 2: Unit Tests
  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests with coverage
        run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          fail_ci_if_error: true
      
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi

  # Job 3: Integration Tests
  integration-test:
    name: Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Prisma migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
          REDIS_URL: redis://localhost:6379

  # Job 4: Security Scanning (SAST)
  security-sast:
    name: Security SAST Scan
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      actions: read
      contents: read
    steps:
      - uses: actions/checkout@v4
      
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript
      
      - name: Autobuild
        uses: github/codeql-action/autobuild@v3
      
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high --fail-on=all

  # Job 5: Dependency Vulnerability Scan
  dependency-scan:
    name: Dependency Vulnerability Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Run npm audit
        run: npm audit --audit-level=high
      
      - name: Check for outdated dependencies
        run: npm outdated || true

  # Job 6: Build Docker Image
  build:
    name: Build Docker Image
    runs-on: ubuntu-latest
    needs: [lint, test, integration-test, security-sast, dependency-scan]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=sha,prefix={{branch}}-
      
      - name: Build and push
        uses: docker build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Job 7: Deploy to Staging (on main branch)
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main'
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to staging
        run: |
          echo "Deploying to staging environment..."
          # Add deployment commands (e.g., kubectl apply, terraform apply, etc.)
```

**Key Features:**
- ✅ 7 jobs: lint, unit tests, integration tests, SAST, dependency scan, build, deploy
- ✅ Parallel execution (lint + test + integration run simultaneously)
- ✅ Service containers (PostgreSQL, Redis for integration tests)
- ✅ CodeQL SAST scan + Snyk scan
- ✅ Coverage enforcement (80% threshold)
- ✅ Docker image build with caching
- ✅ Automated staging deployment on main branch
- ✅ Evidence collection (test reports, coverage, security scan results)

---

### Template 2: GitHub Actions (Python + FastAPI)

**Target:** Python 3.11+, FastAPI, pytest, mypy, black, ruff

**File:** `.github/workflows/ci.yml` (160 lines)

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  PYTHON_VERSION: '3.11'

jobs:
  # Job 1: Lint and Format Check
  lint:
    name: Lint & Format Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
      
      - name: Install dependencies
        run: |
          pip install -r requirements-dev.txt
      
      - name: Run ruff linter
        run: ruff check .
      
      - name: Run black format check
        run: black --check .
      
      - name: Run mypy type check
        run: mypy src/

  # Job 2: Unit Tests
  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      
      - name: Run pytest with coverage
        run: |
          pytest --cov=src --cov-report=xml --cov-report=html tests/unit
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage.xml
          flags: unittests
          fail_ci_if_error: true
      
      - name: Check coverage threshold
        run: |
          coverage report --fail-under=80

  # Job 3: Integration Tests with PostgreSQL
  integration-test:
    name: Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      
      - name: Run Alembic migrations
        run: alembic upgrade head
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
      
      - name: Run integration tests
        run: pytest tests/integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb

  # Job 4: Security Scanning
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Run Bandit security linter
        run: |
          pip install bandit[toml]
          bandit -r src/ -ll
      
      - name: Run Safety dependency check
        run: |
          pip install safety
          safety check --json
      
      - name: Run Snyk scan
        uses: snyk/actions/python@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  # Job 5: Build Docker Image
  build:
    name: Build Docker Image
    runs-on: ubuntu-latest
    needs: [lint, test, integration-test, security]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ secrets.DOCKERHUB_USERNAME }}/myapp:latest
            ${{ secrets.DOCKERHUB_USERNAME }}/myapp:${{ github.sha }}
```

**Key Features:**
- ✅ Python-specific: ruff (linter), black (formatter), mypy (type checker)
- ✅ pytest with coverage (80% threshold)
- ✅ Security: Bandit (SAST), Safety (dependency check), Snyk
- ✅ Alembic migrations for database setup
- ✅ Docker build and push to Docker Hub

---

### Template 3: GitLab CI (Multi-Stage Pipeline)

**Target:** Universal template for any language/framework

**File:** `.gitlab-ci.yml` (120 lines)

```yaml
stages:
  - lint
  - test
  - security
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: ""

# Lint Stage
lint:
  stage: lint
  image: node:20-alpine
  script:
    - npm ci
    - npm run lint
    - npm run format:check
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
  only:
    - branches

# Unit Test Stage
test:unit:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm run test:coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      junit: junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
  only:
    - branches

# Integration Test Stage
test:integration:
  stage: test
  image: node:20-alpine
  services:
    - postgres:16-alpine
    - redis:7-alpine
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
    DATABASE_URL: postgresql://postgres:postgres@postgres:5432/testdb
    REDIS_URL: redis://redis:6379
  script:
    - npm ci
    - npx prisma migrate deploy
    - npm run test:integration
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
  only:
    - branches

# Security SAST Scan
security:sast:
  stage: security
  image: returntocorp/semgrep
  script:
    - semgrep --config=auto --junit-xml -o semgrep-report.xml
  artifacts:
    reports:
      junit: semgrep-report.xml
  only:
    - branches

# Dependency Vulnerability Scan
security:dependencies:
  stage: security
  image: node:20-alpine
  script:
    - npm audit --audit-level=high
  allow_failure: true
  only:
    - branches

# Build Docker Image
build:
  stage: build
  image: docker:24-dind
  services:
    - docker:24-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -t $CI_REGISTRY_IMAGE:latest .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main

# Deploy to Staging
deploy:staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - echo "Deploying to staging..."
    - curl -X POST $STAGING_DEPLOY_WEBHOOK
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - main

# Deploy to Production (manual)
deploy:production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - echo "Deploying to production..."
    - curl -X POST $PRODUCTION_DEPLOY_WEBHOOK
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main
```

**Key Features:**
- ✅ 5 stages: lint, test, security, build, deploy
- ✅ Parallel test execution (unit + integration)
- ✅ Service containers (PostgreSQL, Redis)
- ✅ Semgrep SAST scan
- ✅ Coverage reporting (Cobertura format)
- ✅ Docker build with multi-tag (commit SHA + latest)
- ✅ Staging auto-deploy, production manual-deploy
- ✅ Artifact retention (test reports, coverage)

---

### Template 4: Azure DevOps Pipeline (Enterprise)

**Target:** Enterprise .NET applications with Azure deployment

**File:** `azure-pipelines.yml` (140 lines)

```yaml
trigger:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'
  dotnetVersion: '8.0.x'

stages:
- stage: Build


