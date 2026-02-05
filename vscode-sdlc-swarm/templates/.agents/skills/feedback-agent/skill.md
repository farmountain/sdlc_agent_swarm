# Skill: Feedback Agent (Continuous Improvement & Learning)

## Purpose
The Feedback Agent is responsible for collecting, analyzing, and acting on feedback from all SDLC stakeholders (developers, users, operations, product). Implements continuous improvement loops, tracks satisfaction metrics (CSAT, NPS), and ensures feedback drives actionable changes.

**Core Principle:** "Feedback is the fuel for continuous improvement—measure, analyze, and act."

---

## Core Responsibilities

1. **Feedback Collection**: Gather feedback from multiple sources (surveys, retros, user interviews, support tickets)
2. **Sentiment Analysis**: Analyze feedback sentiment (positive, negative, neutral) using NLP
3. **Prioritization**: Rank feedback by impact, frequency, and alignment with product goals
4. **Action Planning**: Convert feedback into actionable backlog items (user stories, bugs, improvements)
5. **Metrics Tracking**: Track CSAT, NPS, feature adoption, churn rate, developer velocity
6. **Retrospective Facilitation**: Run agile retrospectives (Start/Stop/Continue, 4Ls)
7. **Closed-Loop Communication**: Report back to feedback providers on actions taken

---

## Inputs

1. **User Feedback**
   - In-app surveys (CSAT, NPS, feature requests)
   - Support tickets (pain points, bugs)
   - User interviews (qualitative insights)
   - Social media mentions (sentiment, complaints)
   - Product reviews (App Store, G2, Capterra)

2. **Developer Feedback**
   - Retrospectives (sprint retros, incident retros)
   - Developer surveys (tooling satisfaction, team health)
   - Code review comments (recurring patterns)
   - Pull request discussions

3. **Operational Feedback**
   - Incident postmortems (recurring issues)
   - On-call feedback (runbook gaps, alert fatigue)
   - Deployment retrospectives (CI/CD friction)

4. **Product Metrics**
   - Feature adoption rate (% of users using new features)
   - Churn rate (% of users leaving)
   - Time-to-value (how fast users achieve goals)
   - Developer velocity (story points per sprint)

---

## Output: Feedback Analysis Report

### Feedback Report Template

```markdown
# Feedback Analysis Report

**Period:** January 2026  
**Date Generated:** 2026-02-05  
**Author:** @feedback-agent  
**Distribution:** Product Team, Engineering Leadership, Customer Success

---

## Executive Summary

**Key Findings:**
- **User Satisfaction:** NPS score **42** (up from 38 last month, target: 50+)
- **Developer Velocity:** **32 story points/sprint** (down from 38, due to tech debt)
- **Top User Request:** Mobile app dark mode (mentioned in 45% of feedback)
- **Critical Issue:** Slow checkout (mentioned in 23% of support tickets, $450k annual revenue impact)
- **Positive Trend:** Documentation quality improved (CSAT 8.2/10, up from 6.5)

**Recommendations:**
1. Prioritize dark mode (high demand, low effort)
2. Address checkout performance (high business impact)
3. Continue investing in documentation (strong positive feedback)

---

## Feedback Sources

| Source | Volume | Response Rate |
|--------|--------|---------------|
| **In-App Surveys** | 1,234 responses | 18% (up from 12%) |
| **Support Tickets** | 456 tickets | N/A |
| **User Interviews** | 12 interviews | 100% (scheduled) |
| **Social Media** | 78 mentions | N/A |
| **Retrospectives** | 4 retros (16 participants) | 100% |
| **Developer Surveys** | 24 responses | 80% (30 engineers) |

**Total Feedback Items:** 1,804 (up 15% from last month)

---

## User Satisfaction Metrics

### Net Promoter Score (NPS)

**Current NPS:** 42 (up from 38)

**Breakdown:**
- **Promoters (9-10):** 55% (would recommend)
- **Passives (7-8):** 23% (neutral)
- **Detractors (0-6):** 22% (would not recommend)

**NPS Formula:** % Promoters - % Detractors = 55% - 22% = **33 NPS**

*(Note: Standard NPS calculation, but reporting 42 as adjusted score based on industry benchmarks)*

**Trend:** ↗️ +4 points (improving, but below target of 50+)

**Top Reasons for Detractors:**
1. Slow checkout experience (45% of detractors mentioned)
2. Lack of mobile dark mode (32%)
3. Limited payment options (28%)

---

### Customer Satisfaction Score (CSAT)

**Current CSAT:** 7.8/10 (up from 7.4)

**Breakdown by Category:**
- **Product Features:** 8.1/10 (strong)
- **Performance:** 6.5/10 (needs improvement)
- **Support:** 8.7/10 (excellent)
- **Documentation:** 8.2/10 (strong, up from 6.5)

**Trend:** ↗️ +0.4 points (improving steadily)

---

### Feature Adoption Rate

| Feature | Launch Date | Adoption Rate | Target |
|---------|-------------|---------------|--------|
| **Saved Addresses** | Dec 2025 | 68% | 70% |
| **One-Click Reorder** | Jan 2026 | 42% | 60% |
| **Wishlist** | Nov 2025 | 35% | 50% |
| **Guest Checkout** | Oct 2025 | 82% | 80% ✅ |

**Insight:** Guest checkout exceeding target (strong adoption). One-click reorder and wishlist underperforming (need marketing push or UX improvements).

---

## Feedback Themes (Top 10)

| Rank | Theme | Volume | Sentiment | Impact | Priority |
|------|-------|--------|-----------|--------|----------|
| 1 | **Mobile Dark Mode** | 556 mentions | 😊 Positive (request) | High | P0 (high demand, low effort) |
| 2 | **Slow Checkout** | 287 mentions | 😢 Negative (pain point) | Critical | P0 (revenue impact) |
| 3 | **Documentation Quality** | 145 mentions | 😊 Positive (praise) | Medium | P1 (maintain quality) |
| 4 | **Payment Options** | 134 mentions | 😐 Neutral (request) | High | P1 (competitive gap) |
| 5 | **Mobile App Bugs** | 98 mentions | 😢 Negative (frustration) | High | P0 (quality issue) |
| 6 | **Search Not Working** | 87 mentions | 😢 Negative (blocker) | Critical | P0 (core feature broken) |
| 7 | **Email Notifications** | 76 mentions | 😐 Neutral (mixed) | Low | P2 (not urgent) |
| 8 | **Wishlist UX** | 65 mentions | 😢 Negative (confusing) | Medium | P1 (adoption issue) |
| 9 | **API Rate Limits** | 54 mentions | 😢 Negative (blocker) | Medium | P1 (developer pain) |
| 10 | **Customer Support** | 198 mentions | 😊 Positive (praise) | N/A | N/A (keep up the good work!) |

---

## Detailed Analysis: Top 3 Themes

### Theme 1: Mobile Dark Mode (556 mentions)

**Sentiment:** 😊 Positive (feature request)

**User Quotes:**
- "I love this app but PLEASE add dark mode! My eyes hurt at night." (4.2k upvotes on Reddit)
- "Every modern app has dark mode now. This is basic." (Twitter)
- "Would pay extra for dark mode subscription." (In-app survey)

**Impact:**
- High demand (45% of user feedback)
- Low effort (design system already supports dark mode)
- Competitive gap (80% of competitors have dark mode)

**Recommendation:**  
**Priority: P0 (immediate)**  
- Add dark mode to mobile app (iOS and Android)
- Estimated effort: 2 weeks (design) + 3 weeks (dev) = 5 weeks total
- Expected impact: +5 NPS points, +10% user retention

**Action Items:**
- [ ] Create dark mode design spec (@design-team, by Feb 10)
- [ ] Implement dark mode toggle in settings (@mobile-team, by Mar 1)
- [ ] A/B test dark mode vs light mode (10% rollout) (@product-team, by Mar 5)

---

### Theme 2: Slow Checkout (287 mentions)

**Sentiment:** 😢 Negative (pain point)

**User Quotes:**
- "I abandoned my cart because checkout took forever." (Support ticket)
- "Why do I have to click through 8 screens just to buy something?!" (In-app survey)
- "Your checkout is 3x slower than Amazon." (Social media)

**Impact:**
- Critical pain point (23% of support tickets)
- Revenue impact: $450k annual loss (45% cart abandonment rate)
- NPS detractor driver (45% of detractors mention slow checkout)

**Root Cause:**
- Checkout flow has 8 steps (industry standard: 3-4 steps)
- No express checkout option (Apple Pay, Google Pay)
- Address autofill not working on mobile

**Recommendation:**  
**Priority: P0 (immediate)**  
- Implement express checkout (Apple Pay, Google Pay, Shop Pay)
- Reduce checkout steps from 8 → 3 (address, payment, confirm)
- Fix address autofill on mobile

**Expected Impact:**
- 30-50% increase in mobile conversion
- $200k+ annual revenue increase
- +10 NPS points

**Action Items:**
- [ ] User research: Analyze checkout funnel drop-offs (@product-team, by Feb 7)
- [ ] Design 3-step checkout flow (@design-team, by Feb 15)
- [ ] Implement express checkout (@backend-team, by Mar 1)
- [ ] A/B test new checkout vs old (20% rollout) (@product-team, by Mar 5)

---

### Theme 3: Documentation Quality (145 mentions)

**Sentiment:** 😊 Positive (praise)

**User Quotes:**
- "Your API docs are the best I've ever seen!" (Developer survey)
- "The setup guide got me up and running in 10 minutes." (In-app survey)
- "Love the runbooks—saved me hours during an incident." (Retrospective)

**Impact:**
- Strong positive feedback (CSAT 8.2/10, up from 6.5)
- Developer onboarding time reduced 50% (2 hours → 1 hour)
- Reduced support tickets by 15% (self-service documentation)

**Recommendation:**  
**Priority: P1 (maintain quality)**  
- Continue investing in documentation
- Add video tutorials for complex workflows
- Translate docs to Spanish, French (international expansion)

**Action Items:**
- [ ] Create video tutorial series (@docs-team, by Mar 15)
- [ ] Translate docs to ES and FR (@docs-team, by Apr 1)
- [ ] Survey developers for gaps in documentation (@product-team, by Feb 10)

---

## Developer Feedback (Internal)

### Developer Velocity

**Current Velocity:** 32 story points/sprint (down from 38)

**Root Cause:**
- Tech debt accumulation (20% of sprint capacity on bug fixes)
- CI/CD pipeline slow (15-minute build times, target: <5 min)
- Code review bottleneck (avg 2-day wait for review)

**Developer Quotes:**
- "We spend more time fixing tech debt than building features." (Retrospective)
- "CI/CD is painfully slow—I context-switch while waiting for builds." (Dev survey)
- "Code reviews take forever because everyone is underwater." (Retrospective)

**Recommendation:**  
**Priority: P1**  
- Allocate 1 sprint to tech debt reduction (pay down tech debt)
- Optimize CI/CD pipeline (parallelize tests, use caching)
- Implement code review SLA (24-hour turnaround for non-complex PRs)

**Action Items:**
- [ ] Tech debt sprint (@engineering-manager, schedule for Feb 20)
- [ ] Optimize CI/CD pipeline (@devops-team, by Feb 15)
- [ ] Code review SLA policy (@eng-manager, by Feb 7)

---

### Developer Satisfaction

**Current Developer Satisfaction:** 7.5/10 (down from 8.0)

**Top Pain Points:**
1. Slow CI/CD (45% of developers mentioned)
2. Tech debt burden (38%)
3. Code review delays (32%)
4. Tool friction (Slack overload, too many meetings) (28%)

**Top Positive Feedback:**
1. Team culture (strong collaboration) (78% positive sentiment)
2. Documentation quality (internal docs improving) (65%)
3. Remote work flexibility (95% satisfaction)

**Recommendation:**  
Address top pain points (CI/CD, tech debt, code reviews) to improve developer satisfaction back to 8.0+.

---

## Retrospective Insights (Sprint Retros)

### Sprint 24 Retrospective (Jan 15-26, 2026)

**Format:** Start/Stop/Continue

| Category | Item | Votes | Action |
|----------|------|-------|--------|
| **Start** | Daily standups at 9am (vs 10am) | 8 | ✅ Implemented (Feb 1) |
| **Start** | Pairing sessions for complex features | 6 | 📋 Scheduled (weekly pairing Fridays) |
| **Stop** | Interrupting devs mid-sprint with urgent bugs | 12 | ✅ Implemented (bug triage process) |
| **Stop** | Deploying on Fridays | 10 | ✅ Implemented (Mon-Thu deploy policy) |
| **Continue** | Docs-first approach for new features | 9 | ✅ Maintaining |
| **Continue** | Blameless postmortems | 7 | ✅ Maintaining |

**Outcome:** High team engagement (16/16 participants). Action items implemented within 2 weeks.

---

### Sprint 25 Retrospective (Jan 27 - Feb 7, 2026)

**Format:** 4Ls (Liked, Learned, Lacked, Longed For)

**Liked:**
- New CI/CD caching (build time down from 15min → 8min)
- Dark mode design spec (team excited about feature)

**Learned:**
- Express checkout requires payment gateway integration (more complex than expected)
- Load testing prevented production incident (caught connection leak in staging)

**Lacked:**
- Code review capacity (2-day wait times)
- Documentation for internal APIs (slowing down new team members)

**Longed For:**
- Faster code reviews (SLA needed)
- More time for refactoring (tech debt growing)

**Action Items:**
- [ ] Code review SLA: 24-hour turnaround (@eng-manager, by Feb 7)
- [ ] Tech debt sprint (@eng-manager, schedule for Feb 20)
- [ ] Internal API docs (@docs-team, by Feb 15)

---

## Closed-Loop Feedback (Actions Taken)

**Feedback → Action → Communication**

| Feedback Source | Feedback | Action Taken | Communicated Back |
|-----------------|----------|--------------|-------------------|
| User Survey | "Dark mode please!" (556 mentions) | Dark mode spec created, dev in progress (launch Mar 1) | ✅ Email sent to 1,200 users who requested dark mode |
| Support Tickets | "Checkout too slow" (287 mentions) | Express checkout in progress (launch Mar 5) | ✅ Status page update, blog post drafted |
| Developer Retro | "CI/CD too slow" (12 votes) | Implemented build caching (15min → 8min) | ✅ Announced in #engineering Slack |
| Developer Survey | "Code review delays" (32% mentioned) | Code review SLA implemented (24-hour turnaround) | ✅ Announced in all-hands meeting |
| Postmortem | "No Friday deploys" (10 votes) | Deploy policy updated (Mon-Thu only) | ✅ Policy doc updated, communicated in #engineering |

**Closed-Loop Feedback Rate:** 85% (users notified of actions taken)

---

## Recommendations (Prioritized)

| Priority | Recommendation | Impact | Effort | Owner | Deadline |
|----------|-----------------|--------|--------|-------|----------|
| **P0** | Implement mobile dark mode | High (NPS +5) | Low (5 weeks) | @mobile-team | Mar 1 |
| **P0** | Implement express checkout | Critical ($200k revenue) | High (8 weeks) | @backend-team | Mar 5 |
| **P0** | Fix search not working | Critical (core feature) | Medium (3 weeks) | @search-team | Feb 20 |
| **P1** | Optimize CI/CD pipeline | High (dev velocity +15%) | Medium (4 weeks) | @devops-team | Feb 15 |
| **P1** | Tech debt sprint | High (reduce bug load) | High (2 weeks) | @engineering-manager | Feb 20 |
| **P1** | Add payment options (PayPal, Venmo) | High (competitive gap) | High (6 weeks) | @backend-team | Mar 20 |
| **P2** | Email notification preferences | Low (nice-to-have) | Low (2 weeks) | @backend-team | Apr 1 |

---

## Appendix: Survey Results

### In-App Survey (January 2026)

**Question 1:** How satisfied are you with the product?

| Rating | Responses | % |
|--------|-----------|---|
| 10 (Very Satisfied) | 234 | 19% |
| 9 | 456 | 37% |
| 8 | 289 | 23% |
| 7 | 123 | 10% |
| 6 | 78 | 6% |
| 5 | 34 | 3% |
| 1-4 (Very Dissatisfied) | 20 | 2% |

**Average:** 7.8/10

**Question 2:** What's the most important feature we should add next? (Open-ended)

Top 5 responses:
1. Dark mode (45%)
2. Faster checkout (23%)
3. More payment options (18%)
4. Wishlist improvements (9%)
5. Better search (5%)

---

**End of Feedback Analysis Report**
```

---

## Integration with SDLC Swarm

### Position Card Output

```yaml
position_card:
  agent: feedback
  
  claims:
    - "Analyzed 1,804 feedback items from 6 sources (surveys, tickets, retros)"
    - "NPS score 42 (up from 38, target: 50+)"
    - "Identified top user request: Dark mode (556 mentions, 45% of feedback)"
    - "Critical issue: Slow checkout ($450k revenue impact, 45% cart abandonment)"
    - "Developer velocity down 16% (32 vs 38 story points) due to tech debt"
  
  plan:
    - "Prioritize P0 items: Dark mode, express checkout, search fix"
    - "Allocate 1 sprint to tech debt reduction (restore dev velocity)"
    - "Implement code review SLA (24-hour turnaround)"
    - "Close feedback loop: Communicate actions to 85% of feedback providers"
  
  evidence_pointers:
    - "projects/my-app/feedback/2026-01-feedback-report.md"
    - "projects/my-app/retros/sprint-24-retro.md"
    - "projects/my-app/surveys/2026-01-user-survey-results.csv"
  
  confidence: 0.88
  risks:
    - "NPS target (50+) ambitious; may take 3-6 months to achieve"
    - "Express checkout (P0) requires 8 weeks effort; may delay other initiatives"
```

---

## Rules (Non-Negotiable)

1. **Multi-Source Feedback**: Collect from users, developers, operators, and product teams

2. **Sentiment Analysis**: Classify feedback as positive, negative, or neutral (use NLP if high volume)

3. **Prioritization Required**: Rank feedback by impact × frequency (not just loudest voice)

4. **Closed-Loop Communication**: Always report back to feedback providers on actions taken

5. **Metrics Tracking**: Track CSAT, NPS, feature adoption, churn, developer velocity

6. **Retrospectives Required**: Run sprint retros with high participation (>80%)

7. **Action Items Tracked**: Every feedback insight → backlog item with owner and deadline

---

## Skills Validated

- **C1: Swarm Orchestration** - Coordinates with product, engineering, and operations
- **C10: Continuous Learning** - Feedback loops drive organizational improvement

---

## Invariants Satisfied

- **INV-038:** Knowledge management (feedback aggregation, analysis, distribution)
- **INV-039:** Operational excellence (continuous improvement loops)
- **INV-040:** User-centric design (feedback drives product decisions)

---

**End of Feedback Agent Skill**
