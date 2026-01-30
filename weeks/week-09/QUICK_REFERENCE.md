# 🎯 Week 9 Quick Reference Card

## What We Shipped

**A thin VS Code extension that packages SDLC Swarm** without contaminating the architecture.

---

## 📦 Package Contents

```
vscode-sdlc-swarm/
├─ src/extension.ts          ← 238 lines, zero intelligence
├─ templates/                 ← Verbatim repo copies (populate before build)
│  ├─ .agents/
│  ├─ capabilities/
│  ├─ weeks/
│  ├─ adoption/
│  └─ VERSION
├─ package.json              ← Commands, chat participants, metadata
├─ README.md                 ← Marketplace description
├─ LICENSE                   ← MIT
├─ BUILD.md                  ← Build instructions
├─ CHANGELOG.md              ← Version history
└─ weeks/week-09/
   ├─ README.md              ← Full specification
   └─ CHECKLIST.md           ← DoD validation
```

---

## 🎮 Commands (8 Total)

### RUN_SDLC Mode (User Projects)
```
SDLC: Initialize Workspace
SDLC: Plan to PRD
SDLC: Architecture Review
SDLC: Release Readiness
SDLC: Show Project Dashboard
```

### BUILD_SWARM Mode (Swarm Development)
```
Swarm: Plan Next Sprint
Swarm: Architecture Review
Swarm: Release Readiness
Swarm: Show Swarm Dashboard
```

---

## 🔒 Protected Files (Never Overwritten)

```
evidence_*.md
decisions_log.md
experience_ledger.md
risk_ledger.md
metrics_ledger.md
confidence_ledger.md
drift_ledger.md
```

---

## 🛠️ Build Pipeline (5 Steps)

```bash
# 1. Populate templates
cd vscode-sdlc-swarm
cp -r ../.agents ./templates/.agents
cp -r ../capabilities ./templates/capabilities
cp -r ../weeks ./templates/weeks
cp -r ../adoption ./templates/adoption

# 2. Install dependencies
npm install

# 3. Compile TypeScript
npm run compile

# 4. Package extension
npm run package

# 5. Test locally
code --install-extension sdlc-swarm-0.1.0.vsix
```

---

## ✅ Architecture Guarantees

| Principle | Implementation |
|-----------|----------------|
| **Zero Intelligence** | Extension.ts has no logic, only command routing |
| **Evidence-Gated** | All validation in `.agents/`, never bypassed |
| **Removable** | Uninstall extension → repo still works |
| **No State** | No global storage, no hidden config |
| **No Network** | No LLM calls, no telemetry |
| **Version Isolated** | Extension version ≠ swarm content version |

---

## 📋 Prompt Injection Format (Canonical)

Every command sends this to Copilot Agent Mode:

```
Use the SDLC Swarm Driver skill.

Mode=RUN_SDLC|BUILD_SWARM
Workflow=plan_to_prd|architecture_review|release_readiness|dashboard_view
Objective=<user input>
EvidencePointers=<detected paths>
```

**No branching. No interpretation. No retries.**

---

## 🎭 Chat Participants (Workflow Agents)

```
@PlanToPRD       → plan_to_prd workflow
@CodeChange      → code_change workflow
@InfraDeploy     → infra_deploy workflow
@SecurityReview  → security_review workflow
@Dashboard       → dashboard_view workflow
```

**These map to end-to-end SDLC workflows.**  
**Internal agents (Driver, Verifier, Domain Experts) work behind the scenes.**

---

## 🧪 Test Scenarios

### Smoke Test (2 minutes)
1. Install extension
2. Open empty folder
3. Run: `SDLC: Initialize Workspace`
4. Verify: `.agents/` folder created
5. Run: `SDLC: Plan to PRD`
6. Verify: Copilot receives prompt

### Safety Test (1 minute)
1. Create dummy `evidence_test.md`
2. Run: `SDLC: Initialize Workspace`
3. Verify: File not overwritten

### Removability Test (1 minute)
1. Use extension normally
2. Uninstall extension
3. Verify: `.agents/` files still work
4. Verify: Can use Copilot directly with skill.md

---

## 📖 Documentation Map

| Document | Purpose |
|----------|---------|
| [EXTENSION_CONTRACT.md](../distribution/EXTENSION_CONTRACT.md) | Immutable contract |
| [EXTENSION_MAPPING.md](../distribution/EXTENSION_MAPPING.md) | Command→Workflow mapping |
| [EXTENSION_DEMO.md](../distribution/EXTENSION_DEMO.md) | 5-minute demo script |
| [weeks/week-09/README.md](README.md) | Full specification |
| [weeks/week-09/CHECKLIST.md](CHECKLIST.md) | DoD validation |
| [vscode-sdlc-swarm/BUILD.md](../../vscode-sdlc-swarm/BUILD.md) | Build instructions |
| [vscode-sdlc-swarm/README.md](../../vscode-sdlc-swarm/README.md) | Marketplace README |

---

## 🚨 Pre-Build Validation

Run this before `vsce package`:

```bash
# Check templates populated
test -d templates/.agents && echo "✅ .agents" || echo "❌ Missing .agents"
test -f templates/VERSION && echo "✅ VERSION" || echo "❌ Missing VERSION"

# Check TypeScript compiles
npm run compile && echo "✅ Compiled" || echo "❌ Compile errors"

# Check protected files list
grep -q "metrics_ledger" src/extension.ts && echo "✅ Protected files" || echo "❌ Missing protection"
```

---

## 🎯 Week 9 Success Criteria

Week 9 is **COMPLETE** only if:

- [x] Colleague installs in < 2 minutes
- [x] Colleague triggers one NO-GO and understands why
- [x] Extension stays thin (no logic creep)
- [x] Removing extension doesn't break system

---

## 🔮 What This Unlocks

1. **Real Adoption** → Colleagues can try it safely
2. **Architecture Validation** → Thin contract is real, not theoretical
3. **Federation Ready** → Clean boundaries proven
4. **OpenSpec Ready** → All intelligence is external

---

## 💡 Key Insight

**Week 9 validates the architecture by proving it's boring enough to package.**

If packaging was hard, the architecture would be wrong.
It wasn't. It isn't.

---

## 🚀 Next Steps After Week 9

1. **Get 3 users** → Real feedback trumps speculation
2. **Iterate on prompts** → Not features
3. **Week 10+** → Only if multiple teams emerge

**Don't build Week 10 until Week 9 ships.**
