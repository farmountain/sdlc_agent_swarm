#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function getArg(flag, alias) {
  const index = args.findIndex((arg) => arg === flag || (alias && arg === alias));
  if (index === -1) return undefined;
  return args[index + 1];
}

function hasFlag(flag, alias) {
  return args.includes(flag) || (alias ? args.includes(alias) : false);
}

function usage() {
  return `
Usage:
  verify-stage --stage <PRD|ARCH|CODE|TEST|DEPLOY> [--output <path>]

Examples:
  verify-stage --stage CODE --output ./VERIFICATION_RECEIPT_CODE.md
  verify-stage -s TEST

Options:
  -s, --stage    SDLC stage to generate
  -o, --output   Output file path (default: stdout)
  -h, --help     Show help
`;
}

const stageInput = (getArg('--stage', '-s') || '').toUpperCase();
const outputPath = getArg('--output', '-o');

if (hasFlag('--help', '-h') || !stageInput) {
  console.log(usage());
  process.exit(stageInput ? 0 : 1);
}

const templates = {
  PRD: () => generateReceipt('PRD', [
    'SPEC Card completeness',
    'User stories defined',
    'Functional requirements',
    'Non-functional requirements',
    'Success criteria',
    'Constraints documented',
    'Stakeholder approvals',
  ]),
  ARCH: () => generateReceipt('ARCHITECTURE', [
    'Architecture document exists',
    'C4 diagrams present',
    'ADRs documented',
    'Security architecture',
    'Failure modes',
    'Scalability plan',
    'Observability plan',
    'SPEC ↔ Architecture alignment',
  ]),
  CODE: () => generateReceipt('CODE', [
    'Implementation files exist',
    'TypeScript strict mode',
    'Lint clean',
    'Code formatting',
    'Test coverage thresholds',
    'Security controls',
    'Error handling',
    'Dependency vulnerability scan',
  ]),
  TEST: () => generateReceipt('TEST', [
    'Test files exist',
    'Unit tests present',
    'Integration tests present',
    'Coverage thresholds enforced',
    'Edge cases covered',
    'SPEC ↔ TEST alignment',
    'Security tests',
  ]),
  DEPLOY: () => generateReceipt('DEPLOY', [
    'Build artifacts generated',
    'Release notes updated',
    'CI/CD pipeline green',
    'Rollback plan documented',
    'Security scans passed',
    'Package validation (dry-run)',
  ]),
};

if (!templates[stageInput]) {
  console.error(`Invalid stage: ${stageInput}`);
  console.log(usage());
  process.exit(1);
}

const receipt = templates[stageInput]();

if (outputPath) {
  const absolute = path.resolve(process.cwd(), outputPath);
  const dir = path.dirname(absolute);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(absolute, receipt, 'utf8');
  console.log(`✅ Verification receipt template written to ${absolute}`);
} else {
  process.stdout.write(receipt);
}

function generateReceipt(stage, checks) {
  const timestamp = new Date().toISOString();
  const verificationId = `VER-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

  const checksYaml = checks
    .map(
      (check) => `    - check: "${check}"
      status: PENDING
      evidence: ""
      remediation: ""`
    )
    .join('\n');

  return `verification_receipt:
  status: PENDING
  verification_id: "${verificationId}"
  timestamp: "${timestamp}"
  verifier_version: "v0.1.0"
  workflow_stage: "${stage}"

  checks_performed:
${checksYaml}

  evidence_verified:
    prd: ""
    architecture: ""
    code: ""
    tests: ""
    cicd_pipeline: ""

  approvals:
    engineering_lead: PENDING
    product_manager: PENDING
    security_team: PENDING

  recommendation: "PENDING"
`;
}
