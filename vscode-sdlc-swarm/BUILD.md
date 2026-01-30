# Building and Packaging the Extension

## Prerequisites

```bash
npm install -g @vscode/vsce
```

## Setup

1. Install dependencies:
```bash
cd vscode-sdlc-swarm
npm install
```

2. Populate the `templates/` folder:
```bash
# Copy from parent repository
cp -r ../.agents ./templates/.agents
cp -r ../capabilities ./templates/capabilities
cp -r ../weeks ./templates/weeks
cp -r ../adoption ./templates/adoption

# Verify critical files
ls templates/.agents/driver/
ls templates/.agents/registry/
ls templates/VERSION
```

## Build

Compile TypeScript:
```bash
npm run compile
```

Watch mode for development:
```bash
npm run watch
```

## Package

Create .vsix file:
```bash
npm run package
```

This creates `sdlc-swarm-0.1.0.vsix` in the current directory.

## Install Locally

Test the extension:
```bash
code --install-extension sdlc-swarm-0.1.0.vsix
```

## Publish (when ready)

1. Create publisher account at https://marketplace.visualstudio.com/
2. Get Personal Access Token
3. Login:
```bash
vsce login <publisher-name>
```
4. Publish:
```bash
vsce publish
```

## Development Testing

1. Open `vscode-sdlc-swarm` folder in VS Code
2. Press F5 to launch Extension Development Host
3. Test commands in the new window
4. Check Debug Console for logs

## Pre-flight Checklist

Before packaging:

- [ ] `templates/` folder is fully populated
  - [ ] `templates/.agents/` exists with driver, registry, memory folders
  - [ ] `templates/capabilities/` exists
  - [ ] `templates/weeks/` exists
  - [ ] `templates/adoption/` exists
  - [ ] `templates/VERSION` file exists
- [ ] Version number updated in `package.json`
- [ ] `CHANGELOG.md` updated
- [ ] All TypeScript compiles without errors (`npm run compile`)
- [ ] Extension tested in Development Host (F5)
- [ ] Commands appear in Command Palette
- [ ] Protected files are not overwritten
- [ ] Dashboard commands work correctly
- [ ] EXTENSION_CONTRACT.md referenced in README
- [ ] EXTENSION_MAPPING.md is accurate

## Safety Validation

Test these scenarios:

1. Initialize in empty workspace → should scaffold everything
2. Initialize in existing SDLC workspace → should not overwrite
3. Try to overwrite `evidence_*.md` → should skip
4. Remove extension → workspace should still function
5. Commands route to Copilot correctly

## File Size Warning

Keep the `.vsix` file under 50MB. If templates are large:
- Consider splitting into separate extension packs
- Or provide external download for templates
