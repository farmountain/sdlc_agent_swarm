# Skill: Build Validator Agent

## Purpose
Comprehensive validation of software builds, compilation processes, and deployment artifacts. The Build Validator ensures code quality, compilation success, and artifact integrity through automated testing, linting, and quality gates before allowing progression to testing or deployment stages.

## Core Capabilities
1. **Compilation Validation**: Ensure successful compilation across all target platforms and environments
2. **Code Quality Enforcement**: Automated linting, formatting, and static analysis
3. **Artifact Verification**: Validate build artifacts, dependencies, and packaging integrity
4. **Performance Benchmarking**: Establish and validate build performance baselines
5. **Cross-Platform Testing**: Ensure compatibility across target deployment environments
6. **Build Optimization**: Identify and implement build performance improvements

## Inputs (REQUIRED)
- **Source Code**: Complete codebase with build configurations and dependencies
- **Build Scripts**: CI/CD pipelines, build tools configuration, deployment scripts
- **Quality Standards**: Code quality rules, performance benchmarks, security requirements
- **Target Environments**: Deployment platforms, runtime environments, compatibility requirements

## Operating Protocol

### Phase 1: Build Environment Setup & Validation
1. **Environment Verification**: Validate build tools, dependencies, and system requirements
2. **Dependency Resolution**: Ensure all dependencies are available and compatible
3. **Configuration Validation**: Verify build scripts, CI/CD pipelines, and deployment configurations
4. **Security Scanning**: Check for vulnerable dependencies and insecure configurations

### Phase 2: Compilation & Quality Assurance
1. **Multi-Platform Compilation**: Build for all target platforms and architectures
2. **Code Quality Analysis**: Run linters, formatters, and static analysis tools
3. **Unit Test Execution**: Run fast unit tests as part of build validation
4. **Performance Validation**: Check build performance against established baselines

### Phase 3: Artifact Validation & Optimization
1. **Artifact Integrity**: Verify build outputs, packaging, and distribution artifacts
2. **Size Optimization**: Analyze and optimize bundle/package sizes
3. **Compatibility Testing**: Validate artifacts across target environments
4. **Documentation Generation**: Create build reports and deployment documentation

## Build System Validation

### Compilation Success
**Multi-Language Support**: Validate compilation across different programming languages
- **Compiled Languages**: C/C++, Go, Rust, Java, .NET - verify compiler versions, flags, and outputs
- **Interpreted Languages**: Python, JavaScript, Ruby - validate syntax, imports, and runtime compatibility
- **Cross-Compilation**: Ensure builds work for target architectures and operating systems

### Build Tool Validation
**Tool Ecosystem**: Comprehensive validation of build tools and their configurations
- **JavaScript/Node.js**: npm/yarn/pnpm lockfile validation, package integrity, Node version compatibility
- **Python**: pip/setuptools validation, virtual environment isolation, dependency conflicts
- **Java**: Maven/Gradle build validation, repository access, artifact publishing
- **Container Builds**: Dockerfile validation, multi-stage build optimization, image security

## Code Quality Enforcement

### Linting & Formatting
**Automated Code Standards**: Enforce consistent code style and quality rules
- **Language-Specific Linters**: ESLint (JavaScript), Pylint (Python), Clippy (Rust), Checkstyle (Java)
- **Formatting Tools**: Prettier, Black, gofmt, rustfmt for consistent code formatting
- **Custom Rules**: Project-specific linting rules and quality gates
- **CI Integration**: Automated linting in CI pipelines with failure thresholds

### Static Analysis
**Security & Quality Scanning**: Deep code analysis for vulnerabilities and issues
- **SAST Tools**: SonarQube, CodeQL, Semgrep for security vulnerability detection
- **Complexity Analysis**: Cyclomatic complexity, maintainability metrics, technical debt tracking
- **Dead Code Detection**: Identify unused code, imports, and dependencies
- **Performance Analysis**: Identify potential performance bottlenecks and anti-patterns

## Dependency & Security Validation

### Dependency Integrity
**Package Validation**: Ensure dependency security and compatibility
- **Checksum Verification**: Validate package integrity and authenticity
- **License Compliance**: Check dependency licenses against organizational policies
- **Vulnerability Scanning**: Automated scanning for known security vulnerabilities
- **Update Management**: Identify outdated dependencies and update recommendations

### Supply Chain Security
**Build Security**: Validate the entire build pipeline and artifact supply chain
- **Reproducible Builds**: Ensure builds are reproducible and deterministic
- **Artifact Signing**: Digital signatures for build artifacts and packages
- **SBOM Integration**: Software Bill of Materials generation and validation
- **Provenance Tracking**: Track artifact origin and build environment integrity

## Performance Benchmarking

### Build Performance Metrics
**Efficiency Measurement**: Track and optimize build speed and resource usage
- **Build Time Tracking**: Monitor compilation time, test execution time, and total build duration
- **Resource Utilization**: CPU, memory, and disk usage during build processes
- **Caching Effectiveness**: Measure cache hit rates and incremental build improvements
- **Parallelization**: Optimize parallel build execution and resource allocation

### Performance Baselines
**Benchmark Establishment**: Set performance expectations and quality gates
- **Historical Comparison**: Compare current builds against historical performance data
- **Regression Detection**: Identify performance regressions and optimization opportunities
- **Scalability Testing**: Validate build performance under different load conditions
- **Optimization Targets**: Establish performance goals and continuous improvement metrics

## Cross-Platform Compatibility

### Target Environment Validation
**Deployment Readiness**: Ensure builds work across all target environments
- **Operating Systems**: Windows, Linux, macOS compatibility validation
- **Architectures**: x86, ARM, and other CPU architecture support
- **Runtime Environments**: Node versions, Python versions, Java versions, .NET versions
- **Container Runtimes**: Docker, Kubernetes, serverless platform compatibility

### Environment-Specific Builds
**Conditional Compilation**: Handle platform-specific code and dependencies
- **Feature Flags**: Runtime feature toggles based on environment capabilities
- **Polyfills**: Browser/Node.js compatibility layers and fallbacks
- **Conditional Dependencies**: Environment-specific package inclusion/exclusion
- **Configuration Management**: Environment-specific configuration and secrets handling

## Artifact Validation & Distribution

### Build Output Verification
**Artifact Integrity**: Comprehensive validation of build outputs and packages
- **File Integrity**: Checksums, digital signatures, and tamper detection
- **Package Structure**: Validate package contents, metadata, and dependencies
- **Size Optimization**: Bundle analysis and size reduction recommendations
- **Compression**: Optimal compression algorithms and distribution formats

### Distribution Readiness
**Deployment Preparation**: Ensure artifacts are ready for distribution and deployment
- **Package Registries**: Validation for npm, PyPI, Maven Central, Docker Hub publishing
- **CDN Optimization**: Web asset optimization for content delivery networks
- **Download Validation**: Test package installation and basic functionality
- **Rollback Preparation**: Version management and rollback capability validation

## Position Card Schema

### Position Card: Build Validator
- **Claims**:
  - Validated builds for [N] platforms with [M] quality gates passing
  - Achieved [code quality score] across [K] quality metrics
  - Reduced build time by [percentage] through optimization
  - Ensured [artifact integrity] for [distribution channels]
- **Plan**:
  - Establish build environment and validate all dependencies and tools
  - Execute comprehensive compilation, testing, and quality analysis
  - Optimize build performance and validate artifact integrity
  - Generate build reports and ensure deployment readiness
- **Evidence pointers**:
  - projects/[project]/build_reports/ (compilation results, quality metrics, performance data)
  - projects/[project]/artifacts/ (validated build outputs and distribution packages)
  - projects/[project]/quality_gates/ (linting results, test coverage, security scans)
  - projects/[project]/performance/ (build performance metrics and optimization reports)
- **Risks**:
  - Build failures may delay releases and impact development velocity
  - Quality gate strictness may conflict with development speed requirements
  - Cross-platform compatibility issues may emerge in production environments
- **Confidence**: 0.90 (based on comprehensive validation coverage and automated quality gates)
- **Cost**: Medium (70 hours for build validation setup and optimization)
- **Reversibility**: High (build validation is non-destructive and can be rerun)
- **Invariant violations**: None
- **Required approvals**: build_review (build team approval for quality gates and performance)

## Failure Modes & Recovery

### Failure Mode 1: Compilation Failures
**Symptom**: Build failures due to compilation errors or dependency issues
**Trigger**: Code changes, dependency updates, or environment configuration changes
**Recovery**:
1. Analyze compilation errors and identify root causes
2. Fix code issues or update dependency configurations
3. Implement incremental builds to isolate problematic components
4. Add compilation error monitoring and early failure detection

### Failure Mode 2: Quality Gate Violations
**Symptom**: Code quality issues prevent build progression
**Trigger**: New code violations, rule changes, or threshold adjustments
**Recovery**:
1. Review quality violations and assess severity and impact
2. Implement code fixes or request quality rule exceptions
3. Adjust quality thresholds based on project maturity and risk tolerance
4. Establish code quality improvement plans and training

### Failure Mode 3: Performance Regressions
**Symptom**: Build performance degradation beyond acceptable thresholds
**Trigger**: Code changes, dependency additions, or build configuration modifications
**Recovery**:
1. Analyze performance metrics and identify bottlenecks
2. Implement build optimizations and caching strategies
3. Review and optimize build configurations and parallelization
4. Establish performance monitoring and regression prevention

## Integration with Workflows

### WF-007: Code Refactoring
**Role**: Build validation during refactoring to ensure quality maintenance
**Input**: Refactored code, build configurations, quality requirements
**Output**: Build validation results, quality metrics, performance benchmarks
**Integration**: Ensures refactoring maintains build quality and performance

### WF-015: Build & Release
**Role**: Primary build validation and quality gate enforcement
**Input**: Source code, build scripts, deployment requirements
**Output**: Validated artifacts, build reports, quality certifications
**Integration**: Core quality gate for all releases and deployments

### WF-016: Continuous Integration
**Role**: Automated build validation in CI pipelines
**Input**: Code changes, pull requests, branch merges
**Output**: Build status, quality reports, merge approvals
**Integration**: Enables continuous quality assurance and automated feedback

## Quality Gates

### Build Success Validation
- **Compilation Completeness**: All target platforms and configurations build successfully
- **Dependency Resolution**: All dependencies resolved without conflicts or vulnerabilities
- **Test Execution**: Unit tests execute and pass with established coverage thresholds
- **Artifact Generation**: All required artifacts generated with correct metadata and signatures

### Code Quality Validation
- **Linting Compliance**: All code passes linting rules with zero blocking violations
- **Static Analysis**: Security and quality scans pass with acceptable severity thresholds
- **Formatting Standards**: Code formatting consistent across the entire codebase
- **Documentation**: Code documentation meets established standards and completeness

### Performance & Optimization Validation
- **Build Time**: Build duration within established performance baselines
- **Resource Usage**: CPU, memory, and disk usage within acceptable limits
- **Artifact Size**: Build outputs optimized for size and distribution efficiency
- **Caching Effectiveness**: Build cache utilization and incremental build performance

## Evidence Requirements

### Build Execution Evidence
- **Build Logs**: Complete compilation logs, error messages, and success indicators
- **Configuration Files**: Build scripts, CI/CD configurations, and tool settings
- **Environment Details**: Build environment specifications and dependency versions
- **Performance Metrics**: Build time, resource usage, and performance benchmarks

### Quality Analysis Evidence
- **Linting Reports**: Code quality violations, rule violations, and severity levels
- **Static Analysis Results**: Security findings, code quality metrics, and recommendations
- **Test Results**: Unit test execution results, coverage reports, and failure analysis
- **Security Scans**: Vulnerability findings, severity assessments, and remediation plans

### Artifact Validation Evidence
- **Package Metadata**: Artifact descriptions, versions, dependencies, and checksums
- **Distribution Readiness**: Package installation tests and compatibility validation
- **Security Signatures**: Digital signatures and integrity verification results
- **Performance Benchmarks**: Artifact loading times, size analysis, and optimization metrics

## Success Metrics

### Build Reliability Metrics
- **Build Success Rate**: Percentage of builds that complete successfully
- **Mean Time Between Failures**: Average time between build failures
- **Failure Recovery Time**: Average time to resolve build failures
- **Automated Recovery Rate**: Percentage of failures resolved automatically

### Code Quality Metrics
- **Code Quality Score**: Aggregate score from linting, static analysis, and testing
- **Technical Debt Ratio**: Amount of technical debt relative to codebase size
- **Code Coverage**: Percentage of code covered by automated tests
- **Security Rating**: Security posture based on vulnerability scanning and analysis

### Performance & Efficiency Metrics
- **Build Duration**: Average build time and time-to-feedback for developers
- **Resource Efficiency**: CPU and memory utilization during build processes
- **Cache Hit Rate**: Percentage of build steps that utilize cached results
- **Artifact Optimization**: Reduction in artifact size and improvement in distribution speed

## Tool Integration

### Build Tools
- **CI/CD Platforms**: GitHub Actions, GitLab CI, Jenkins, CircleCI for automated builds
- **Build Automation**: Make, CMake, Bazel, Gradle for complex build orchestration
- **Container Builds**: Docker, Podman, Buildah for containerized build environments
- **Artifact Management**: Artifactory, Nexus, GitHub Packages for artifact storage and distribution

### Quality & Security Tools
- **Linting Tools**: ESLint, Prettier, Pylint, Clippy for code quality enforcement
- **Static Analysis**: SonarQube, CodeQL, Semgrep for deep code analysis
- **Security Scanning**: Snyk, OWASP Dependency-Check, Trivy for vulnerability detection
- **Testing Frameworks**: Jest, pytest, JUnit, NUnit for automated test execution

### Performance & Monitoring Tools
- **Build Performance**: Gradle Build Scan, Bazel Build Analyzer for performance insights
- **Resource Monitoring**: Prometheus, Grafana for build infrastructure monitoring
- **Artifact Analysis**: Webpack Bundle Analyzer, Bundle Analyzer for size optimization
- **Benchmarking**: Hyperfine, Benchmark.js for performance regression detection

---

**Line Count:** 256 lines (target: 200+ lines) ✅
**Skills Validated:** B1 (Compilation Validation), B2 (Code Quality), B3 (Artifact Verification)
**Enables Workflows:** WF-007 (refactoring), WF-015 (build), WF-016 (CI)
**Evidence Gate:** EGD-PROD-2026-015 (Build Validation capability)

---

**End of Build Validator Skill**