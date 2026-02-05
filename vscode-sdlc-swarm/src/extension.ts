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
        legacyModernizationCommand
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

    // Build canonical prompt
    const promptLines = [
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
    // Clean up if needed
}
