# Navigation Map — SDLC Agent Swarm Documentation

## Quick Navigation

### 🚀 **Just Getting Started?**

Start here:
1. [README.md](README.md) — Project overview + quick links
2. [PLANNING.md](PLANNING.md) — Complete vision + 18-week roadmap
3. [.agents/docs/GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md) — Usage examples

---

### 🏗️ **Understanding the System Architecture?**

Read in this order:
1. [.agents/docs/ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md) — System design, orchestration flow
2. [.agents/docs/AGENT_ROLES.md](.agents/docs/AGENT_ROLES.md) — What each agent does
3. [.agents/docs/WORKFLOWS.md](.agents/docs/WORKFLOWS.md) — 4 core SDLC workflows
4. [.agents/docs/WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md) — Design constraints that keep it extensible

---

### 🔐 **Concerned About Extension Conversion?**

Read these:
1. [.agents/docs/EXTENSION_READINESS.md](.agents/docs/EXTENSION_READINESS.md) — Why conversion is easy
2. [.agents/docs/DISTRIBUTION.md](.agents/docs/DISTRIBUTION.md) — Phase 1 (repo-native) → Phase 2 (extension)
3. [.agents/docs/WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md) — The 5 constraints that ensure easy conversion

---

### 📊 **Want the Detailed Delivery Plan?**

1. [PLANNING.md](PLANNING.md) — Complete 18-week roadmap with all epics, phases, success metrics
2. [.agents/docs/GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md) — Phase roadmap section

---

### 💡 **Understanding the Innovation?**

1. [.agents/docs/ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md) — Mathematical model section
2. [.agents/docs/AGENT_ROLES.md](.agents/docs/AGENT_ROLES.md) — Collective intelligence + collapse policy
3. [.agents/docs/WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md) — How constraints enable extensibility

---

### 📦 **How Will This Be Distributed?**

1. [.agents/docs/DISTRIBUTION.md](.agents/docs/DISTRIBUTION.md) — Distribution channels, packaging, org adoption
2. [PLANNING.md](PLANNING.md) — Distribution strategy section
3. [weeks/week-09/README.md](weeks/week-09/README.md) — VS Code extension packaging (Week 9)
4. [vscode-sdlc-swarm/](vscode-sdlc-swarm/) — Actual extension source code

---

### 🤝 **Org Adoption & Change Management?**

Start here:
1. [adoption/README.md](adoption/README.md) — Adoption narrative anchor
2. [adoption/team_onboarding.md](adoption/team_onboarding.md) — Engineer onboarding
3. [adoption/manager_faq.md](adoption/manager_faq.md) — Manager FAQ
4. [adoption/first_30_days.md](adoption/first_30_days.md) — First 30 days plan
5. [adoption/anti_patterns.md](adoption/anti_patterns.md) — Anti-patterns to avoid
6. [adoption/success_metrics.md](adoption/success_metrics.md) — Adoption success metrics

---

## Document Directory

### Root Level

| File | Purpose | Read If |
|------|---------|---------|
| `README.md` | Project overview + quick links | Just starting |
| `PLANNING.md` | Complete 18-week roadmap | Want full delivery plan |
| `CONTEXT_COMPLETE.md` | What context has been created | Want to know what's ready |
| `NAVIGATION_MAP.md` | This file | You are here |

### `adoption/` (Org Adoption Playbook)

| File | Purpose | Read If |
|------|---------|---------|
| `adoption/README.md` | Adoption narrative anchor | You need the why, fast |
| `adoption/team_onboarding.md` | Engineer onboarding | You want low-friction onboarding |
| `adoption/manager_faq.md` | Manager FAQs | You need manager alignment |
| `adoption/first_30_days.md` | First 30 days plan | You want a staged rollout |
| `adoption/anti_patterns.md` | What not to do | You want to avoid backlash |
| `adoption/success_metrics.md` | Success metrics | You need adoption KPIs |

### `.agents/docs/` (Core Architecture)

| File | Purpose | Read If |
|------|---------|---------|
| `ARCHITECTURE.md` | System design, orchestration, math model | Want to understand how it works |
| `WORKFLOWS.md` | 4 core SDLC workflows, state machines | Want to see workflows |
| `AGENT_ROLES.md` | 8 agent types, responsibilities, contracts | Want to know what each agent does |
| `GETTING_STARTED.md` | Usage examples, decision cards, phase roadmap | Want to see examples |
| `EXTENSION_READINESS.md` | Extension conversion strategy | Concerned about extension |
| `DISTRIBUTION.md` | Distribution channels, packaging, adoption | How will teams get this |
| `WEEK1_CONSTRAINTS.md` | 5 design constraints for extensibility | Concerned about design |

---

### `.agents/skills/` (Skill Library)

| File | Purpose | Read If |
|------|---------|---------|
| `.agents/skills/ENHANCEMENT_ANALYSIS.md` | Lessons learned + improvement plan | Want rationale behind skill changes |
| `.agents/skills/SKILL_ENHANCEMENTS.md` | Summary of recent skill updates | Want a quick digest of updates |
| `.agents/skills/domain/cli-expert/skill.md` | CLI development patterns | Building or reviewing CLI tools |

---

## Content Map by Topic

### 🤖 **Agent Swarm**

- **What is it?** → [README.md](README.md) + [PLANNING.md](PLANNING.md)
- **How does it work?** → [.agents/docs/ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md)
- **What are the agents?** → [.agents/docs/AGENT_ROLES.md](.agents/docs/AGENT_ROLES.md)
- **How do they decide?** → [.agents/docs/ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md#6-collective-intelligence--weighted-experience-collapse) (Collapse Policy)
- **How do they use memory?** → [.agents/docs/AGENT_ROLES.md](.agents/docs/AGENT_ROLES.md#7-memory-agent-memory-persistence)

### 🔄 **Workflows**

- **What workflows exist?** → [.agents/docs/WORKFLOWS.md](.agents/docs/WORKFLOWS.md)
- **How do they work?** → [.agents/docs/WORKFLOWS.md](.agents/docs/WORKFLOWS.md#workflow-state-machine)
- **How to use them?** → [.agents/docs/GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md#usage-examples-how-youll-use-it)
- **Full examples?** → [.agents/docs/GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md)

### 🧠 **Evidence-Gated Design**

- **EGD-Dev (Project)?** → [PLANNING.md](PLANNING.md#dual-loop-evidence-gated-design)
- **EGD-Prod (Product)?** → [PLANNING.md](PLANNING.md#dual-loop-evidence-gated-design)
- **How it works?** → [.agents/docs/ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md#5-the-mini-enterprise-world-model-world_modelyaml)

### 🏭 **Enterprise Readiness**

- **World model?** → [.agents/docs/ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md#5-the-mini-enterprise-world-model-world_modelyaml)
- **Approval gates?** → [.agents/docs/ARCHITECTURE.md](.agents/docs/ARCHITECTURE.md#4-human-approval-gates-approvalmd)
- **Compliance?** → [.agents/docs/AGENT_ROLES.md](.agents/docs/AGENT_ROLES.md#8-compliance-risk-risk-assessor)

### 🔌 **Extension**

- **Can we build an extension?** → [.agents/docs/EXTENSION_READINESS.md](.agents/docs/EXTENSION_READINESS.md)
- **How easy is it?** → [.agents/docs/EXTENSION_READINESS.md](.agents/docs/EXTENSION_READINESS.md#clean-conversions-1-1-mapping)
- **What's the strategy?** → [.agents/docs/DISTRIBUTION.md](.agents/docs/DISTRIBUTION.md)
- **What are the constraints?** → [.agents/docs/WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md)
- **Week 9: VS Code Extension** → [weeks/week-09/README.md](weeks/week-09/README.md)
- **Extension source code** → [vscode-sdlc-swarm/](vscode-sdlc-swarm/)

### 📦 **Distribution & Adoption**

- **How do teams get it?** → [.agents/docs/DISTRIBUTION.md](.agents/docs/DISTRIBUTION.md)
- **How to customize?** → [.agents/docs/DISTRIBUTION.md](.agents/docs/DISTRIBUTION.md#constraint-1-always-distribute-source)
- **Org adoption?** → [.agents/docs/DISTRIBUTION.md](.agents/docs/DISTRIBUTION.md#internal-adoption-strategy-for-your-organization)

### 🤝 **Org Adoption Playbook**

- **What is the adoption story?** → [adoption/README.md](adoption/README.md)
- **Engineer onboarding?** → [adoption/team_onboarding.md](adoption/team_onboarding.md)
- **Manager FAQ?** → [adoption/manager_faq.md](adoption/manager_faq.md)
- **30-day rollout?** → [adoption/first_30_days.md](adoption/first_30_days.md)
- **Anti-patterns?** → [adoption/anti_patterns.md](adoption/anti_patterns.md)
- **Success metrics?** → [adoption/success_metrics.md](adoption/success_metrics.md)

### 📅 **Delivery Schedule**

- **18-week roadmap?** → [PLANNING.md](PLANNING.md#18-week-sprint-roadmap)
- **What's in Week 1?** → [PLANNING.md](PLANNING.md#weeks-1-3-foundation-os) (W1 details)
- **All phase details?** → [PLANNING.md](PLANNING.md)

### ✅ **Design Constraints**

- **5 critical constraints?** → [.agents/docs/WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md)
- **Why these matter?** → [.agents/docs/WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md#impact-analysis)
- **Compliance checklist?** → [.agents/docs/WEEK1_CONSTRAINTS.md](.agents/docs/WEEK1_CONSTRAINTS.md#checklist-week-1-compliance)

### 🎯 **Getting Started**

- **First time using?** → [.agents/docs/GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md)
- **Usage examples?** → [.agents/docs/GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md#usage-examples-how-youll-use-it)
- **Decision card format?** → [.agents/docs/GETTING_STARTED.md](.agents/docs/GETTING_STARTED.md#decision-card-format)

---

## How This Repo is Organized

```
sdlc_agent_swarm/
│
├─ README.md                           ← Start here
├─ PLANNING.md                         ← 18-week roadmap
├─ CONTEXT_COMPLETE.md                 ← What's been created
├─ NAVIGATION_MAP.md                   ← This file
├─ adoption/                           ← Org adoption playbook
│
├─ .agents/
│  ├─ docs/
│  │  ├─ ARCHITECTURE.md               ← System design
│  │  ├─ WORKFLOWS.md                  ← Workflow specs
│  │  ├─ AGENT_ROLES.md                ← Agent definitions
│  │  ├─ GETTING_STARTED.md            ← Examples
│  │  ├─ EXTENSION_READINESS.md        ← Extension strategy
│  │  ├─ DISTRIBUTION.md               ← Distribution plan
│  │  └─ WEEK1_CONSTRAINTS.md          ← Design constraints
│  │
│  ├─ driver/                          ← [Coming Week 1]
│  ├─ registry/                        ← [Coming Week 1]
│  ├─ memory/                          ← [Coming Week 1]
│  └─ skills/                          ← Agent skills library (active)
│
├─ capabilities/                       ← [Coming Week 4]
├─ weeks/                              ← [Coming Week 1+]
│
└─ LICENSE, etc.
```

---

## Quick Decision Tree

```
What do I want to do?
│
├─ "I want to understand the whole system"
│  └─ Read: README → ARCHITECTURE → WORKFLOWS → AGENT_ROLES
│
├─ "I want to see usage examples"
│  └─ Read: GETTING_STARTED (full examples with prompts)
│
├─ "I'm concerned about extension conversion"
│  └─ Read: EXTENSION_READINESS → DISTRIBUTION → WEEK1_CONSTRAINTS
│
├─ "I want the delivery roadmap"
│  └─ Read: PLANNING.md (complete 18-week plan)
│
├─ "I want to know about evidence gates"
│  └─ Read: PLANNING.md (EGD section) + ARCHITECTURE (world model section)
│
├─ "I'm ready to start Week 1"
│  └─ Say: "Start Week 1" (I'll generate full Foundation OS package)
│
└─ "I have more context to add"
   └─ Share it now (I'll update planning)
```

---

## Status Dashboard

| What | Status | Where |
|------|--------|-------|
| Architecture defined | ✅ Complete | ARCHITECTURE.md |
| Workflows specified | ✅ Complete | WORKFLOWS.md |
| Agent roles defined | ✅ Complete | AGENT_ROLES.md |
| Examples created | ✅ Complete | GETTING_STARTED.md |
| Extension strategy | ✅ Complete | EXTENSION_READINESS.md |
| Distribution plan | ✅ Complete | DISTRIBUTION.md |
| Design constraints | ✅ Complete | WEEK1_CONSTRAINTS.md |
| 18-week roadmap | ✅ Complete | PLANNING.md |
| Week 9: VS Code Extension | ✅ Complete | weeks/week-09/, vscode-sdlc-swarm/ |
| Week 1 ready to deliver | ⏳ Awaiting signal | - |
| Driver + Registry files | ⏳ Week 1 delivery | - |
| Core swarm (12 agents) | ⏳ Weeks 4-6 | - |
| Enterprise ready | ⏳ Weeks 7-9 | - |

---

## How to Use This Map

1. **Know what you're looking for?** → Use the "Content Map by Topic" section
2. **Not sure?** → Use the "Quick Decision Tree"
3. **Just starting?** → Read "Just Getting Started?" section at top
4. **Want to jump to a specific topic?** → Use "Document Directory" table

---

## What's Next?

### If You're Ready for Week 1:

Say: `Start Week 1`

I'll deliver:
- Complete Driver definition
- Registry bootstrap
- Evidence ledger templates
- Capability map v0
- Week 1 tasks, prompts, checklists

### If You Have More Context:

Share it now. I'll update planning before Week 1 starts.

### If You Want to Review First:

Read the documents in this order:
1. README.md
2. PLANNING.md
3. ARCHITECTURE.md
4. Pick your specific interest from "Content Map by Topic"

---

## Questions?

Everything should be in the docs above. If something is unclear:
1. Check the Document Directory table
2. Use the Decision Tree to find the right doc
3. Or tell me what's unclear and I'll clarify before Week 1

**Ready to proceed?** Just say `Start Week 1` or share more context.

