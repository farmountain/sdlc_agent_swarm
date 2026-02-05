import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// SAFETY RAILS: Files that must NEVER be overwritten
const PROTECTED_FILES = [
    'evidence_*.md',
    'decisions_log.md',
    'experience_ledger.md',
    'risk_ledger.md',
    'metrics_ledger.md',
    'confidence_ledger.md',
    'drift_ledger.md'
];

export function activate(context: vscode.ExtensionContext) {
    console.log('SDLC Swarm extension is now active');

    // Register initialization command
    const initCommand = vscode.commands.registerCommand('sdlc.initializeWorkspace', async () => {
        await initializeWorkspace(context);
    });

    // Register RUN_SDLC commands
    const planToPrdCommand = vscode.commands.registerCommand('sdlc.planToPrd', async () => {
        await executeWorkflow('RUN_SDLC', 'plan_to_prd', 'Plan to PRD');
    });

    const architectureReviewCommand = vscode.commands.registerCommand('sdlc.architectureReview', async () => {
        await executeWorkflow('RUN_SDLC', 'architecture_review', 'Architecture Review');
    });

    const releaseReadinessCommand = vscode.commands.registerCommand('sdlc.releaseReadiness', async () => {
        await executeWorkflow('RUN_SDLC', 'release_readiness', 'Release Readiness');
    });

    const showDashboardCommand = vscode.commands.registerCommand('sdlc.showDashboard', async () => {
        await executeWorkflow('RUN_SDLC', 'dashboard_view', 'Show Project Dashboard');
    });

    // Register BUILD_SWARM commands
    const planNextSprintCommand = vscode.commands.registerCommand('swarm.planNextSprint', async () => {
        await executeWorkflow('BUILD_SWARM', 'plan_next_sprint', 'Plan Next Sprint');
    });

    const swarmArchitectureReviewCommand = vscode.commands.registerCommand('swarm.architectureReview', async () => {
        await executeWorkflow('BUILD_SWARM', 'architecture_review', 'Swarm Architecture Review');
    });

    const swarmReleaseReadinessCommand = vscode.commands.registerCommand('swarm.releaseReadiness', async () => {
        await executeWorkflow('BUILD_SWARM', 'release_readiness', 'Swarm Release Readiness');
    });

    const swarmShowDashboardCommand = vscode.commands.registerCommand('swarm.showDashboard', async () => {
        await executeWorkflow('BUILD_SWARM', 'dashboard_view', 'Show Swarm Dashboard');
    });

    // Register BROWNFIELD commands (for existing/halfway projects)
    const assessProjectCommand = vscode.commands.registerCommand('sdlc.assessProject', async () => {
        await executeWorkflow('RUN_SDLC', 'assess_project', 'Assess Existing Project');
    });

    const technicalDebtAuditCommand = vscode.commands.registerCommand('sdlc.technicalDebtAudit', async () => {
        await executeWorkflow('RUN_SDLC', 'technical_debt_audit', 'Technical Debt Audit');
    });

    const incrementalImprovementCommand = vscode.commands.registerCommand('sdlc.incrementalImprovement', async () => {
        await executeWorkflow('RUN_SDLC', 'incremental_improvement', 'Incremental Improvement');
    });

    const legacyModernizationCommand = vscode.commands.registerCommand('sdlc.legacyModernization', async () => {
        await executeWorkflow('RUN_SDLC', 'legacy_modernization', 'Legacy Modernization');
    });

    // Register OPENSPEC INTEGRATION command
    const openspecFeatureDevCommand = vscode.commands.registerCommand('sdlc.openspecFeatureDevelopment', async () => {
        await executeOpenSpecWorkflow();
    });

    // Register chat participants (aliases)
    registerChatParticipants(context);

    context.subscriptions.push(
        initCommand,
        planToPrdCommand,
        architectureReviewCommand,
        releaseReadinessCommand,
        showDashboardCommand,
        planNextSprintCommand,
        swarmArchitectureReviewCommand,
        swarmReleaseReadinessCommand,
        swarmShowDashboardCommand,
        assessProjectCommand,
        technicalDebtAuditCommand,
        incrementalImprovementCommand,
        legacyModernizationCommand,
        openspecFeatureDevCommand
    );
}

async function initializeWorkspace(context: vscode.ExtensionContext): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder open. Please open a folder first.');
        return;
    }

    const workspacePath = workspaceFolder.uri.fsPath;
    const sdlcPath = path.join(workspacePath, '.sdlc');
    
    // Check if .sdlc/ already exists
    if (fs.existsSync(sdlcPath)) {
        vscode.window.showInformationMessage('SDLC Swarm already initialized in this workspace.');
        return;
    }

    // Create .sdlc directory
    fs.mkdirSync(sdlcPath, { recursive: true });

    // Copy templates to .sdlc/ (framework files stay separate from project files)
    const templatePath = path.join(context.extensionPath, 'templates');
    const results: string[] = [];

    try {
        copyDirectory(templatePath, sdlcPath, results);
        
        const message = [
            'SDLC Swarm initialized successfully!',
            '',
            'Framework installed to: .sdlc/',
            'Your project files remain in workspace root.',
            '',
            'Installed:',
            ...results,
            '',
            'Next step: Run "SDLC: Plan to PRD"'
        ].join('\n');

        vscode.window.showInformationMessage('SDLC Swarm workspace initialized!');
        
        // Show detailed results in output channel
        const outputChannel = vscode.window.createOutputChannel('SDLC Swarm');
        outputChannel.appendLine(message);
        outputChannel.show();

    } catch (error) {
        vscode.window.showErrorMessage(`Failed to initialize workspace: ${error}`);
    }
}

function copyDirectory(source: string, destination: string, results: string[]): void {
    if (!fs.existsSync(source)) {
        return;
    }

    const entries = fs.readdirSync(source, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const destPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            // Create directory if it doesn't exist
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
                results.push(`✅ Created directory: ${entry.name}/`);
            }
            copyDirectory(sourcePath, destPath, results);
        } else {
            // Check safety rails
            if (isProtectedFile(entry.name) && fs.existsSync(destPath)) {
                results.push(`⚠️  Skipped (protected): ${entry.name}`);
                continue;
            }

            // Copy file if it doesn't exist
            if (!fs.existsSync(destPath)) {
                fs.copyFileSync(sourcePath, destPath);
                results.push(`✅ Created file: ${entry.name}`);
            } else {
                results.push(`ℹ️  Already exists: ${entry.name}`);
            }
        }
    }
}

function isProtectedFile(filename: string): boolean {
    return PROTECTED_FILES.some(pattern => {
        if (pattern.includes('*')) {
            const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
            return regex.test(filename);
        }
        return filename === pattern;
    });
}

async function executeWorkflow(mode: string, workflow: string, title: string): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder open.');
        return;
    }

    // Check if .sdlc/ exists
    const sdlcPath = path.join(workspaceFolder.uri.fsPath, '.sdlc');
    if (!fs.existsSync(sdlcPath)) {
        const response = await vscode.window.showWarningMessage(
            'SDLC Swarm not initialized. Initialize now?',
            'Yes',
            'No'
        );
        if (response === 'Yes') {
            await vscode.commands.executeCommand('sdlc.initializeWorkspace');
        }
        return;
    }

    // Dashboard views don't need objective input
    let objective = '';
    if (workflow !== 'dashboard_view') {
        const input = await vscode.window.showInputBox({
            prompt: `${title} - What is your objective?`,
            placeHolder: 'e.g., Add user authentication with OAuth2'
        });

        if (!input) {
            return; // User cancelled
        }
        objective = input;
    }

    // Auto-detect evidence pointers
    const evidencePointers = await detectEvidenceFiles(workspaceFolder.uri.fsPath);

    // Load autonomous operation mandate from driver skill
    const autonomousMandate = await loadAutonomousOperationMandate(sdlcPath);

    // Build canonical prompt with autonomous operation mandate
    const promptLines = [
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '⚡⚡⚡ AUTONOMOUS OPERATION MANDATE ⚡⚡⚡ (NON-NEGOTIABLE)',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        autonomousMandate,
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'WORKFLOW EXECUTION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'Use the SDLC Swarm Driver skill.',
        '',
        `Mode=${mode}`,
        `Workflow=${workflow}`
    ];

    if (objective) {
        promptLines.push(`Objective=${objective}`);
    }

    if (evidencePointers) {
        promptLines.push(`EvidencePointers=${evidencePointers}`);
    }

    const prompt = promptLines.join('\n');

    // Inject into Copilot Chat
    await injectPromptToCopilot(prompt);
}

async function detectEvidenceFiles(workspacePath: string): Promise<string> {
    const sdlcPath = path.join(workspacePath, '.sdlc');
    const evidenceFiles: string[] = [];

    try {
        // Check .sdlc/.agents/ for framework evidence
        const agentsPath = path.join(sdlcPath, '.agents');
        if (fs.existsSync(agentsPath)) {
            const files = fs.readdirSync(agentsPath);
            for (const file of files) {
                if (file.startsWith('evidence_') && file.endsWith('.md')) {
                    evidenceFiles.push(`.sdlc/.agents/${file}`);
                }
            }
        }

        // Check .sdlc/.agents/user_memory/ for user project evidence
        const userMemoryPath = path.join(agentsPath, 'user_memory');
        if (fs.existsSync(userMemoryPath)) {
            const files = fs.readdirSync(userMemoryPath);
            for (const file of files) {
                if (file.startsWith('evidence_') && file.endsWith('.md')) {
                    evidenceFiles.push(`.sdlc/.agents/user_memory/${file}`);
                }
            }
        }
    } catch {
        // Directory doesn't exist or can't be read
    }

    return evidenceFiles.join(', ');
}

async function detectOpenSpec(workspacePath: string): Promise<{detected: boolean, changeFolders: string[]}> {
    const openspecPath = path.join(workspacePath, 'openspec');
    const dotOpenspecPath = path.join(workspacePath, '.openspec');
    
    // Check for openspec/ or .openspec/ folders
    const hasOpenspecFolder = fs.existsSync(openspecPath);
    const hasDotOpenspec = fs.existsSync(dotOpenspecPath);
    
    if (!hasOpenspecFolder && !hasDotOpenspec) {
        return { detected: false, changeFolders: [] };
    }
    
    // Find change folders in openspec/changes/
    const changeFolders: string[] = [];
    const changesPath = path.join(openspecPath, 'changes');
    if (fs.existsSync(changesPath)) {
        const entries = fs.readdirSync(changesPath, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory() && entry.name !== 'archive') {
                // Check if it has OpenSpec artifacts
                const changePath = path.join(changesPath, entry.name);
                const hasProposal = fs.existsSync(path.join(changePath, 'proposal.md'));
                const hasSpecs = fs.existsSync(path.join(changePath, 'specs'));
                const hasDesign = fs.existsSync(path.join(changePath, 'design.md'));
                const hasTasks = fs.existsSync(path.join(changePath, 'tasks.md'));
                
                if (hasProposal || hasSpecs || hasDesign || hasTasks) {
                    changeFolders.push(entry.name);
                }
            }
        }
    }
    
    return { detected: true, changeFolders };
}

async function executeOpenSpecWorkflow(): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder open.');
        return;
    }
    
    const workspacePath = workspaceFolder.uri.fsPath;
    
    // Check if .sdlc/ exists
    const sdlcPath = path.join(workspacePath, '.sdlc');
    if (!fs.existsSync(sdlcPath)) {
        const response = await vscode.window.showWarningMessage(
            'SDLC Swarm not initialized. Initialize now?',
            'Yes',
            'No'
        );
        if (response === 'Yes') {
            await vscode.commands.executeCommand('sdlc.initializeWorkspace');
        }
        return;
    }
    
    // Detect OpenSpec project
    const openspecInfo = await detectOpenSpec(workspacePath);
    if (!openspecInfo.detected) {
        vscode.window.showErrorMessage('No OpenSpec project detected. Expected openspec/ folder with changes/.');
        return;
    }
    
    if (openspecInfo.changeFolders.length === 0) {
        vscode.window.showWarningMessage('No active OpenSpec changes found. Create a change using `/opsx:new <feature-name>` first.');
        return;
    }
    
    // Let user select which change to implement
    const selectedChange = await vscode.window.showQuickPick(openspecInfo.changeFolders, {
        placeHolder: 'Select OpenSpec change to implement'
    });
    
    if (!selectedChange) {
        return; // User cancelled
    }
    
    // Build prompt with OpenSpec context
    const changePath = `openspec/changes/${selectedChange}`;
    const promptLines = [
        'Use the SDLC Swarm Driver skill.',
        '',
        'Mode=RUN_SDLC',
        'Workflow=openspec_feature_development',
        `Objective=Implement feature from OpenSpec change: ${selectedChange}`,
        '',
        '🎯 OPENSPEC INTEGRATION MODE:',
        `- Change folder: ${changePath}`,
        `- Use ${changePath}/proposal.md as intent contract (DO NOT create new PRD)`,
        `- Use ${changePath}/specs/ as requirements source`,
        `- Use ${changePath}/design.md as architecture guide`,
        `- Use ${changePath}/tasks.md as implementation checklist`,
        '',
        'Your task:',
        '1. Read all OpenSpec artifacts in change folder',
        '2. Generate implementation code per tasks.md',
        '3. Generate tests covering specs/scenarios.md',
        '4. Validate against OpenSpec specs/requirements.md',
        '5. Create verification receipt confirming all OpenSpec requirements met'
    ];
    
    const prompt = promptLines.join('\n');
    
    // Inject into Copilot Chat
    await injectPromptToCopilot(prompt);
}

/**
 * Loads autonomous operation mandate from driver skill on-demand.
 * 
 * Design: No caching - reads fresh from disk on every workflow execution.
 * Rationale: 
 * - Allows users to customize driver/skill.md without reloading extension
 * - No persistent state = no cleanup needed on uninstall
 * - Extension leaves no traces when uninstalled
 */
async function loadAutonomousOperationMandate(sdlcPath: string): Promise<string> {
    try {
        const driverSkillPath = path.join(sdlcPath, '.agents', 'driver', 'skill.md');
        
        if (!fs.existsSync(driverSkillPath)) {
            // Fallback: Use embedded mandate if driver skill not found
            return getEmbeddedAutonomousMandate();
        }

        const driverContent = fs.readFileSync(driverSkillPath, 'utf8');
        
        // Extract autonomous operation mandate section (lines 1-150)
        const lines = driverContent.split('\n');
        const mandateEnd = lines.findIndex((line, idx) => idx > 50 && line.includes('---'));
        
        if (mandateEnd > 0) {
            return lines.slice(0, mandateEnd).join('\n');
        }
        
        // Fallback if parsing fails
        return getEmbeddedAutonomousMandate();
    } catch (error) {
        console.error('Failed to load autonomous operation mandate:', error);
        return getEmbeddedAutonomousMandate();
    }
}

function getEmbeddedAutonomousMandate(): string {
    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡⚡⚡ AUTONOMOUS OPERATION MANDATE ⚡⚡⚡ (NON-NEGOTIABLE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚫 ABSOLUTE PROHIBITIONS 🚫

YOU ARE STRICTLY FORBIDDEN FROM:
1. ❌ Presenting options to the user ("Option A or Option B?")
2. ❌ Asking preference questions ("Which do you prefer?")
3. ❌ Seeking tactical approval ("Should I use X or Y?")
4. ❌ Requesting technology choices ("PostgreSQL or MongoDB?")
5. ❌ Waiting for design decisions ("REST or GraphQL?")
6. ❌ Stopping workflow for non-critical choices
7. ❌ Using phrases like "Would you like me to..." for implementation details
8. ❌ Creating multiple implementation options for user to choose from
9. ❌ Asking "Which of these should I do?" or "What do you think?"
10. ❌ Presenting numbered options and waiting for user selection

THIS APPLIES TO ALL AI MODELS: GPT-4o, GPT-4o mini, Claude Sonnet, Claude Opus, Gemini, Llama, Mistral, etc.

✅ MANDATORY BEHAVIOR ✅

YOU MUST ALWAYS:
1. ✅ Invoke Consensus Panel automatically for ANY decision point
2. ✅ Make decisions autonomously using multi-agent weighted voting
3. ✅ Log decisions to decisions_log.md (for transparency only, not approval)
4. ✅ Proceed with workflow immediately after consensus
5. ✅ Act like Cursor's autonomous coding agent (long-running, self-directed)
6. ✅ Treat this as a production CI/CD pipeline (automated, unattended)

🎯 DECISION FRAMEWORK 🎯

When you encounter ANY choice or conflict:

STEP 1: Is it CRITICAL? (Only 5 cases require human approval)
  → YES: Stop and request human approval
  → NO: Proceed to STEP 2 (automatic consensus)

STEP 2: Invoke Consensus Panel automatically
  → Collect votes from 7 agents (Minimalist, Skeptic, Domain Experts, etc.)
  → Apply weighted scoring (threshold 0.70)
  → Select winning option

STEP 3: Log decision to decisions_log.md (transparency, not approval)

STEP 4: Announce decision to user AND proceed immediately
  → Format: "Selected X because Y. Proceeding with Z..."
  → Do NOT wait for user confirmation

CRITICAL = Requires Human Approval (ONLY 5 cases):
1. ✋ Production deployment (pushing to prod environment)
2. ✋ Data loss risk (irreversible database operations on prod data)
3. ✋ Security breach (hard invariant violation INV-xxx-SECURITY)
4. ✋ Compliance violation (audit, legal, regulatory requirements)
5. ✋ Budget overrun >50% ($50k project becoming $75k+)

EVERYTHING ELSE = Autonomous Consensus (99% of decisions):
- Architecture choices (PostgreSQL vs MongoDB, REST vs GraphQL)
- Library selection (Passport.js vs Auth0, Express vs Fastify)
- Design patterns (Repository vs Active Record, MVC vs Clean Architecture)
- Tech stack (React vs Vue, TypeScript vs JavaScript)
- File structure, testing strategy, deployment strategy, performance optimizations

📋 EXAMPLE: Correct Autonomous Behavior 📋

WRONG (Asking User):
"I need to choose a database. Should I use PostgreSQL or MongoDB?"

CORRECT (Autonomous):
[Internally] Decision point: Database selection
[Internally] CRITICAL? No → Automatic consensus
[Internally] Invoking Consensus Panel...
[Internally] Voting results: PostgreSQL 0.85, MongoDB 0.68
[Internally] Consensus: PostgreSQL (threshold 0.70 met)
[Internally] Logging to decisions_log.md...
[To User] "Selected PostgreSQL for database (ACID compliance required for e-commerce). Proceeding with schema design..."
[Continues workflow automatically - NO WAITING]

⚠️ CRITICAL REMINDER FOR GPT-4o mini AND ALL MODELS ⚠️

If you are about to type ANY of these phrases, STOP and invoke consensus panel instead:
- "Should I..."
- "Which do you prefer..."
- "Would you like me to..."
- "I have two options:"
- "What do you think?"
- "Which of these should I do?"

You are a LONG-RUNNING AUTONOMOUS AGENT like Cursor's coding agent or a CI/CD pipeline.
Users hired you to MAKE DECISIONS AND EXECUTE, not ask permission for every technical choice.
Transparency ≠ Approval. Log decisions for visibility, but don't wait for confirmation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
}

async function injectPromptToCopilot(prompt: string): Promise<void> {
    // Open Copilot Chat and insert the prompt
    await vscode.commands.executeCommand('workbench.action.chat.open', {
        query: prompt
    });
}

function registerChatParticipants(context: vscode.ExtensionContext): void {
    // Chat participants are registered in package.json
    // This function can be extended for custom participant handlers if needed
    
    // Note: Chat participant API requires specific VS Code version and configuration
    // For now, we rely on package.json declarations
}

export function deactivate() {
    // No cleanup needed:
    // - Autonomous operation mandate is read on-demand from workspace files
    // - No caching or persistent storage used
    // - User's .sdlc/ folder remains intact (as intended - it's user data)
    // - Extension leaves no traces in VS Code storage
}
