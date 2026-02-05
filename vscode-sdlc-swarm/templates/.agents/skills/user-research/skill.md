# Skill: User Research Agent (Discovery & Insights)

## Purpose
The User Research Agent is responsible for extracting user insights, identifying pain points, creating personas, and defining Jobs-To-Be-Done (JTBD). Acts as the **discovery phase** entry point, ensuring all product work is grounded in real user needs and validated problems.

**Core Principle:** "Build what users need, not what we think they want."

---

## Core Responsibilities

1. **Jobs-To-Be-Done (JTBD) Analysis**: Extract functional, emotional, and social jobs users are trying to accomplish
2. **Persona Development**: Create data-driven user personas with demographics, behaviors, goals, and pain points
3. **Pain Point Identification**: Discover friction points, workarounds, and unmet needs in current workflows
4. **User Journey Mapping**: Document current-state and future-state user journeys
5. **Evidence Gap Detection**: Identify missing research data, recommend research methods
6. **Interview Guide Generation**: Create structured interview scripts for user validation
7. **Research Synthesis**: Aggregate findings into actionable insights for PRD and product teams

---

## Inputs

1. **Project Context**
   - Product vision or problem statement
   - Target audience (if known)
   - Existing research artifacts (surveys, interviews, analytics)
   - Competitive landscape

2. **User Data Sources** (Optional)
   - User interviews (transcripts, recordings)
   - Surveys (responses, NPS scores)
   - Analytics data (usage patterns, funnels)
   - Support tickets (pain points, feature requests)
   - Social media (sentiment, complaints)

3. **Stakeholder Input**
   - Product manager assumptions
   - Engineering constraints
   - Business goals and metrics

---

## Output: User Research Report

### Research Report Schema

```yaml
user_research_report:
  # Meta
  research_id: "USR-2026-001"
  timestamp: "2026-02-05T10:00:00Z"
  research_type: "discovery | validation | continuous"
  project: "E-commerce checkout redesign"
  
  # Jobs-To-Be-Done (JTBD)
  jobs_to_be_done:
    - job_id: "JTBD-001"
      job_statement: "When I'm shopping online, I want to complete checkout quickly, so that I can get back to my day without wasting time"
      job_type: "functional"
      frequency: "high (daily for target segment)"
      importance: 9/10
      satisfaction: 4/10  # Current solution satisfaction
      opportunity_score: 13  # Importance + (Importance - Satisfaction)
      
    - job_id: "JTBD-002"
      job_statement: "When entering payment info, I want to feel confident my data is secure, so that I don't worry about fraud"
      job_type: "emotional"
      frequency: "high"
      importance: 10/10
      satisfaction: 6/10
      opportunity_score: 14
      
    - job_id: "JTBD-003"
      job_statement: "When I complete a purchase, I want confirmation immediately, so that I know my order went through"
      job_type: "functional"
      frequency: "high"
      importance: 8/10
      satisfaction: 7/10
      opportunity_score: 9
  
  # Personas
  personas:
    - persona_id: "P-001"
      name: "Busy Professional Buyer"
      demographics:
        age_range: "28-45"
        occupation: "Corporate professional, manager"
        income: "$80k-$150k"
        tech_savvy: "high"
      
      behaviors:
        shopping_frequency: "2-3x per week"
        device_preference: "Mobile (70%), Desktop (30%)"
        session_duration: "5-10 minutes"
        purchase_decision_time: "Fast (<5 min research)"
      
      goals:
        - "Complete purchases quickly during lunch break"
        - "Never miss a delivery"
        - "Easy returns if needed"
      
      pain_points:
        - "Current checkout takes 8+ clicks"
        - "Address autofill doesn't work on mobile"
        - "No saved payment methods"
        - "Delivery date unclear until final step"
      
      quotes:
        - "I literally abandon carts if checkout takes more than 2 minutes"
        - "Why can't it remember my address like Amazon?"
      
      usage_volume: "35% of user base"
      business_impact: "high (represents 60% of revenue)"
    
    - persona_id: "P-002"
      name: "Cautious First-Time Buyer"
      demographics:
        age_range: "35-60"
        occupation: "Varied (less tech-savvy)"
        income: "$40k-$80k"
        tech_savvy: "medium-low"
      
      behaviors:
        shopping_frequency: "1-2x per month"
        device_preference: "Desktop (80%), Mobile (20%)"
        session_duration: "15-30 minutes"
        purchase_decision_time: "Slow (15+ min research, check reviews)"
      
      goals:
        - "Understand exactly what I'm buying"
        - "Trust the seller"
        - "Get help if something goes wrong"
      
      pain_points:
        - "Unclear return policy"
        - "No live chat support"
        - "Security badges not visible"
        - "Too many steps in checkout (confusing)"
      
      quotes:
        - "I need to see customer service contact info before I buy"
        - "The site looks professional but I'm not sure if it's secure"
      
      usage_volume: "25% of user base"
      business_impact: "medium (represents 15% of revenue)"
  
  # Pain Points (Aggregated)
  pain_points:
    - pain_id: "PAIN-001"
      description: "Checkout takes too long (8+ clicks, 3-5 minutes)"
      severity: "critical"
      frequency: "affects 78% of users"
      current_workaround: "Users abandon cart, use competitors"
      evidence:
        - "User interviews: 15/20 mentioned slow checkout"
        - "Analytics: 45% cart abandonment rate"
        - "Support tickets: 23 complaints in last month"
      business_impact: "~$450k annual lost revenue (estimated)"
      
    - pain_id: "PAIN-002"
      description: "No saved payment methods (must re-enter every time)"
      severity: "high"
      frequency: "affects 65% of repeat customers"
      current_workaround: "Users screenshot payment info (security risk!)"
      evidence:
        - "User interviews: 12/20 requested saved payment"
        - "Competitor analysis: 90% of competitors have this"
      business_impact: "Reduces repeat purchase rate by ~20%"
      
    - pain_id: "PAIN-003"
      description: "Mobile checkout has poor UX (small buttons, no autofill)"
      severity: "high"
      frequency: "affects 60% of mobile users"
      current_workaround: "Switch to desktop (friction)"
      evidence:
        - "Analytics: Mobile conversion 2.3x lower than desktop"
        - "Heatmaps: Users tap wrong buttons frequently"
      business_impact: "Losing 70% of mobile traffic"
  
  # User Journeys
  user_journeys:
    - journey_id: "J-001"
      journey_name: "Mobile Express Checkout (Current State)"
      persona: "P-001 (Busy Professional)"
      stages:
        - stage: "Browse products"
          actions: ["Search", "Filter", "View product"]
          pain_points: []
          emotions: "Neutral"
          
        - stage: "Add to cart"
          actions: ["Tap 'Add to Cart'", "View cart"]
          pain_points: []
          emotions: "Positive"
          
        - stage: "Start checkout"
          actions: ["Tap 'Checkout'", "Sign in (if not already)"]
          pain_points: ["Login required even for saved users"]
          emotions: "Slight frustration"
          
        - stage: "Enter shipping address"
          actions: ["Manually type full address", "No autofill works"]
          pain_points: ["PAIN-003: Manual entry on mobile is tedious"]
          emotions: "Frustrated"
          
        - stage: "Select shipping method"
          actions: ["Choose speed", "Wait for price calculation"]
          pain_points: ["Delivery dates unclear"]
          emotions: "Confused"
          
        - stage: "Enter payment info"
          actions: ["Manually type card number", "Expiry", "CVV"]
          pain_points: ["PAIN-002: No saved payment"]
          emotions: "Very frustrated ('Why isn't this saved?')"
          
        - stage: "Review order"
          actions: ["Check total", "Tap 'Place Order'"]
          pain_points: ["Confusing layout (important info buried)"]
          emotions: "Anxious"
          
        - stage: "Confirmation"
          actions: ["Receive email confirmation"]
          pain_points: []
          emotions: "Relief (but won't come back)"
          
      total_time: "8-12 minutes"
      completion_rate: "55%"
      drop_off_points:
        - "Shipping address entry (25% abandon)"
        - "Payment entry (15% abandon)"
      
    - journey_id: "J-002"
      journey_name: "Mobile Express Checkout (Future State - Target)"
      persona: "P-001 (Busy Professional)"
      stages:
        - stage: "Browse products"
          actions: ["Search", "View product"]
          improvements: []
          
        - stage: "Add to cart"
          actions: ["Tap 'Add to Cart'"]
          improvements: ["Inline cart preview (no separate page)"]
          
        - stage: "Express checkout"
          actions: ["Tap 'Express Checkout' (Apple Pay / Google Pay)"]
          improvements: ["One-tap payment", "Auto-populates address", "Auto-selects fastest shipping"]
          
        - stage: "Confirmation"
          actions: ["Receive SMS + email confirmation immediately"]
          improvements: ["Tracking link in confirmation"]
          
      total_time: "1-2 minutes"
      target_completion_rate: "85%"
      expected_impact: "3x faster, 30% higher conversion"
  
  # Evidence Gaps
  evidence_gaps:
    - gap: "No quantitative data on mobile vs desktop conversion by user segment"
      research_method: "Analytics deep dive (GA4, Mixpanel)"
      priority: "high"
      estimated_time: "1 week"
      
    - gap: "Unclear if security concerns drive abandonment"
      research_method: "User interviews (5-10 exit interviews)"
      priority: "medium"
      estimated_time: "2 weeks"
      
    - gap: "No data on competitor checkout flows"
      research_method: "Competitor analysis (15 major competitors)"
      priority: "high"
      estimated_time: "1 week"
  
  # Recommendations
  recommendations:
    - recommendation: "Implement express checkout (Apple Pay, Google Pay, Shop Pay)"
      rationale: "Addresses PAIN-001 (speed), PAIN-002 (saved payment), PAIN-003 (mobile UX)"
      expected_impact: "30-50% increase in mobile conversion"
      effort: "high (4-6 weeks)"
      priority: "P0"
      
    - recommendation: "Add address autofill and saved addresses"
      rationale: "Addresses PAIN-001 (speed), improves repeat purchase rate"
      expected_impact: "15% faster checkout for repeat customers"
      effort: "medium (2-3 weeks)"
      priority: "P0"
      
    - recommendation: "Simplify checkout to 3 steps (vs current 8)"
      rationale: "Reduces cognitive load, addresses PAIN-001"
      expected_impact: "20% reduction in cart abandonment"
      effort: "medium (3-4 weeks)"
      priority: "P1"
      
    - recommendation: "Add security badges and trust indicators"
      rationale: "Addresses P-002 persona concerns (trust)"
      expected_impact: "10% increase in first-time buyer conversion"
      effort: "low (1 week)"
      priority: "P1"
  
  # Validation Plan
  validation_plan:
    - method: "Prototype testing (Figma interactive mockups)"
      target: "10 users (P-001 and P-002 personas)"
      metrics: "Task completion rate, time-on-task, satisfaction (SUS score)"
      timeline: "Week 1-2 post-design"
      
    - method: "A/B test (express checkout vs current)"
      target: "10% of mobile traffic"
      metrics: "Conversion rate, cart abandonment rate, revenue per session"
      timeline: "Week 1-2 post-launch"
      success_criteria: "15% lift in conversion rate"
```

---

## Research Methods

### 1. User Interviews

**When to Use:** Discovery phase, understanding motivations and pain points

**Interview Guide Template:**
```markdown
## Interview Guide: [Product Name] User Research

**Objective:** Understand user needs and pain points for [specific workflow]

**Duration:** 30-45 minutes

### Introduction (5 min)
- Thank participant
- Explain study purpose (building better product)
- Obtain consent (recording, anonymity)
- Set expectations (no wrong answers, think aloud)

### Background (5 min)
1. Tell me about your current role and typical workday.
2. How often do you [perform task related to product]?
3. What tools do you currently use for this?

### Current Experience (15 min)
4. Walk me through the last time you [performed task]. (Contextual inquiry)
5. What's frustrating about the current process?
6. What works well?
7. Have you tried any workarounds?
8. How much time does this take you typically?

### Ideal Experience (10 min)
9. If you had a magic wand, how would this work ideally?
10. What's the most important thing to get right?
11. What would make you switch from your current solution?

### Wrap-up (5 min)
12. Is there anything we didn't cover that you think is important?
13. Would you be open to testing a prototype later?

**Post-Interview:** Document JTBD, pain points, quotes
```

---

### 2. Surveys

**When to Use:** Quantitative validation, prioritization, large sample sizes

**Survey Template (Qualtrics / Typeform):**
```markdown
## [Product Name] User Survey

**Section 1: Demographics** (to create personas)
- Age range
- Occupation
- Tech savviness (1-5 scale)

**Section 2: Behavior**
- How often do you [perform task]?
  - Daily / Weekly / Monthly / Rarely
- What device do you primarily use?
  - Mobile / Desktop / Tablet

**Section 3: Pain Points** (identify friction)
- On a scale of 1-10, how satisfied are you with [current solution]?
- What's the biggest frustration with [current solution]? (open-ended)
- Rank these pain points by severity:
  - [ ] Slow checkout
  - [ ] No saved payment
  - [ ] Poor mobile UX
  - [ ] Unclear pricing
  - [ ] Other: ___

**Section 4: Importance/Satisfaction** (Opportunity scoring)
For each feature, rate:
- How important is this to you? (1-10)
- How satisfied are you with current implementation? (1-10)

**Section 5: Willingness**
- Would you pay for a solution that solves [pain point]?
  - Yes / No / Maybe
- How much would you pay? (open-ended)
```

---

### 3. Jobs-To-Be-Done (JTBD) Framework

**JTBD Statement Structure:**
```
When [situation],
I want to [motivation],
So that I can [expected outcome].
```

**Example:**
```
When I'm shopping online during my lunch break,
I want to complete checkout in under 2 minutes,
So that I can get back to work without wasting time.
```

**JTBD Analysis:**
1. **Functional Job:** The practical task (e.g., "complete checkout quickly")
2. **Emotional Job:** The feeling (e.g., "feel productive, not stressed")
3. **Social Job:** The perception (e.g., "look like a savvy shopper")

**Opportunity Score Formula:**
```
Opportunity Score = Importance + max(Importance - Satisfaction, 0)
```

High opportunity scores (>12) indicate underserved jobs (high importance, low satisfaction).

---

### 4. Persona Template

```markdown
# Persona: [Name] ([Archetype])

## Photo
[Stock photo or illustration]

## Quote
"[Memorable quote that captures their mindset]"

## Demographics
- **Age:** [Range]
- **Occupation:** [Job title / industry]
- **Location:** [Urban / Suburban / Rural]
- **Income:** [Range]
- **Education:** [Level]
- **Tech Savvy:** [Low / Medium / High]

## Behaviors
- **Shopping Frequency:** [How often]
- **Device Preference:** [Mobile / Desktop / Both]
- **Decision Speed:** [Fast / Slow / Moderate]
- **Research Style:** [Heavy research / Impulsive / Balanced]

## Goals
1. [Primary goal]
2. [Secondary goal]
3. [Tertiary goal]

## Pain Points
1. [Biggest frustration]
2. [Second biggest]
3. [Third]

## Motivations
- [What drives them]
- [What excites them]

## Frustrations
- [What annoys them]
- [What makes them abandon]

## Preferred Channels
- [Email / SMS / Push / Social]

## Usage Volume
- [% of user base]

## Business Impact
- [High / Medium / Low]
- [Revenue contribution %]

## How We Can Help
- [Solution / feature that addresses their needs]
```

---

## Integration with SDLC Swarm

### Handoff to PRD Agent

**Position Card Output:**
```yaml
position_card:
  agent: user_research
  
  claims:
    - "Target users are busy professionals (35% of user base, 60% of revenue)"
    - "Primary pain point is slow checkout (8+ clicks, 45% cart abandonment)"
    - "Opportunity score 14 for 'secure payment confidence' (JTBD-002)"
    - "Mobile conversion is 2.3x lower than desktop (poor UX)"
  
  plan:
    - "Create PRD focused on express checkout (Apple Pay, Google Pay)"
    - "Target P-001 persona (Busy Professional) primarily"
    - "Success metric: 30% increase in mobile conversion"
    - "Validation: A/B test with 10% of mobile traffic"
  
  evidence_pointers:
    - "projects/checkout-redesign/USER_RESEARCH_REPORT.md"
    - "projects/checkout-redesign/personas/"
    - "projects/checkout-redesign/interview_transcripts/"
  
  confidence: 0.85
  risks:
    - "Sample size small (20 interviews) - need quantitative validation"
    - "Assumed mobile is priority but desktop still 40% of traffic"
```

**PRD Agent Consumes:**
- JTBD (jobs-to-be-done) → User stories
- Pain points → Requirements
- Personas → Target audience
- Opportunity scores → Prioritization
- Validation plan → Acceptance criteria

---

## Rules (Non-Negotiable)

1. **Evidence-Based Only:** All insights must cite evidence (interviews, surveys, analytics). No assumptions.

2. **Persona Grounding:** Personas must be based on real data (demographics, behaviors), not fictional stereotypes.

3. **JTBD Format:** Follow strict JTBD structure: "When [situation], I want to [motivation], so that [outcome]."

4. **Opportunity Scoring:** Always calculate Importance + (Importance - Satisfaction) for prioritization.

5. **Validation Plan Required:** Every research report must include how findings will be validated.

6. **Evidence Gaps Explicit:** If data is missing, flag it and recommend research methods.

7. **Quotes Required:** Include at least 3-5 verbatim user quotes per persona (for authenticity).

---

## Skills Validated

- **C1: Swarm Orchestration** - Coordinates with PRD Agent, Stakeholder Agent
- **C2: Spec + TDD Lifecycle** - Grounds specs in validated user needs
- **C4: Human Governance** - Stakeholder alignment on user insights
- **C10: Continuous Learning** - Captures user feedback for product iteration

---

## Invariants Satisfied

- **INV-040: User-Centric Design** - All product work grounded in user research
- **INV-041: Evidence-Based Decisions** - Research insights backed by data
- **INV-042: Continuous Discovery** - Ongoing user feedback loops

---

**End of User Research Agent Skill**
