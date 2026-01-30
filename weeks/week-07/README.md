# Week 7 — Compliance & Audit Framework (Placeholder)

## Status: NOT STARTED

**Why This Week Was Skipped:**

Week 9 (VS Code Extension Packaging) was prioritized to validate the core architectural principle: **the thin contract works**. Extension packaging proves the system is ready for distribution without waiting for all features.

---

## Planned Scope (When Built)

Week 7 will focus on:
- **Compliance Agent** — Automated compliance checks (SOC2, HIPAA, GDPR, PCI-DSS)
- **Audit Trail Framework** — Tamper-proof decision logs
- **Regulatory Reporting** — Evidence bundles for audits
- **Policy Enforcement** — Automated policy validation gates
- **Compliance Dashboard** — Real-time compliance status

---

## When to Create Week 7

Build Week 7 when **any** of these conditions are met:

### 1. Enterprise Adoption Signal (Trigger)
- **2+ regulated enterprises** (healthcare, finance, government) show interest
- User asks: "How does this handle SOC2?" or "What about GDPR compliance?"
- Auditors request evidence trail documentation

### 2. Post-Week 9 Feedback Loop
- **Week 9 extension has been tested** by 3+ users
- Feedback indicates compliance is a blocker for adoption
- Users manually tracking compliance and want automation

### 3. Evidence-Gating Maturity
- Current evidence gates work well in practice
- Teams want automated compliance validation
- Manual compliance checking becomes expensive

---

## Don't Build Week 7 If:

❌ **No one asks about compliance** — Don't build solutions looking for problems  
❌ **Week 9 hasn't been tested** — Validate core architecture first  
❌ **Manual compliance works fine** — Automation is premature  
❌ **Single-team usage** — Compliance frameworks scale across teams, not within them

---

## Recommended Timeline

**Earliest:** 2-4 weeks after Week 9 ships  
**Ideal:** After 10+ installations and real compliance questions  
**Latest:** When a regulated enterprise becomes a blocker

---

## What Comes First

**Before Week 7, ensure:**
1. ✅ Week 9 extension tested by real users
2. ✅ Evidence-gating working in production
3. ✅ Compliance requirements documented by users
4. ✅ At least one regulated use case validated

---

## Alternative: Week 10 Instead?

If feedback suggests **iteration** is more valuable than **compliance**, consider:
- **Week 10:** Feedback-driven refinement (UX polish, prompt improvements)
- Skip to Week 10 if users need usability fixes, not compliance automation

---

## Current Status

**Blocked by:** Week 9 user testing  
**Dependencies:** Evidence-gating framework, memory agent, world model  
**Priority:** LOW until demand proven

**Rule:** Don't build Week 7 until you need it.
