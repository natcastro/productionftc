# FTC · Production Planning Prototype

A production-prioritization prototype designed for a Colombian shapewear manufacturer. The tool helps a production planner determine what must run first each morning by combining inventory shortages, production stage, and order urgency into a single prioritized workflow.

---

## 1. Design Rationale

### Need

Production planners must manually cross-reference each missing reference's production stage against order urgency before deciding what to produce first.

The production process may include stages such as:

**Insumos → Corte → Alfilerado → Confección → Bodega**

At the same time, different order channels have different levels of urgency. For example, TikTok orders may require approximately a 12-hour turnaround, retail stores may have about one week, and international orders may allow a few additional days.

Doing this manually for dozens of references every morning consumes time the planner does not have, especially because the same person is also responsible for scheduling work on the plant floor.

### Persona

The primary user is a **production planner at a Colombian shapewear manufacturer** who reviews order shortfalls before 6:00 AM each day to determine what should run first.

The planner splits their time between:

- Reviewing inventory and order shortages
- Determining production priorities
- Scheduling work on the plant floor
- Responding to changes in order urgency and production status

Because these responsibilities overlap, the planner needs to make prioritization decisions quickly and confidently.

### Capability

The prototype allows the planner to:

> **See, at a glance, a single ranked list of what to produce first without manually cross-referencing inventory, production stage, and order urgency for each reference.**

### Fundamental Value

**Certainty and speed of decision.**

The planner starts the day already knowing what should run now and what can wait, rather than rebuilding the same judgment call from scratch every morning.

---

## 2. Core Workflow

The prototype intentionally focuses on three screens:

**See the priority → Understand why → Act on it**

These three screens represent the complete operational loop.

---

### Screen 1 — Today's Run

**"Esto corre hoy, en orden."**

#### Job

Show the day's production priority list already ranked and grouped into action bands:

- Critical
- Attention
- Backlog

The screen also presents summary information above the ranked list so the planner can understand the state of the day before reviewing individual references.

#### Why This Screen Earned Its Place

This screen contains the core value proposition of the prototype.

If the planner only saw this screen, they would still understand what needs to run first and where attention is required.

#### Design Question

> Does the interface communicate the fundamental value before the user reads a single individual reference?

---

### Screen 2 — Why This Score

#### Job

Explain why a particular reference received its priority score.

The score is broken down across the factors used to determine production priority:

1. Production stage
2. Order urgency
3. Inventory gap

The screen also presents the underlying information pulled from Odoo so the planner can audit the recommendation.

#### Why This Screen Earned Its Place

A ranked list is only useful if the planner trusts it.

The system therefore cannot simply display a priority score. It must make the reasoning behind that score understandable and auditable.

#### Design Question

> Does the visual hierarchy clearly separate the explanation of the score from the supporting operational record?

---

### Screen 3 — Cover the Gap

#### Job

Allow the planner to take action after identifying a shortage.

The planner can:

- Borrow available units from another store to cover the shortage
- Record why a reference missed its production window
- Follow the issue until it is resolved

#### Why This Screen Earned Its Place

This is the only screen in the core workflow where the planner acts instead of only reviewing information.

It closes the loop between identifying a problem and resolving it.

#### Design Question

> Is the primary action unambiguous, and does the screen maintain the same visual language as the rest of the workflow?

---

## 3. Why These Three Screens — and Nothing Else

The three screens represent the entire operational loop:

> **See the priority → Understand why → Act on it**

Login, permissions, account management, and system settings would be necessary in a production implementation, but they do not communicate the fundamental value of this prototype.

Including them would compete with the core narrative rather than strengthen it.

Within approximately five seconds, a new viewer should be able to recognize that this is a **manufacturing production-prioritization tool**, rather than a generic administrative dashboard.

---

## 4. Design Read: Grouping, Signaling, and Gestalt Principles

### Does the Landing Screen Signal the Value at First Glance?

Yes.

The date, headline, and three summary counts — **Critical, Attention, and Units Missing** — appear before the detailed production records.

This establishes the state of the production day before the planner needs to inspect any individual reference.

The visual hierarchy is therefore:

**Today's state → Priority groups → Individual references**

rather than presenting every piece of information with equal visual weight.

---

### Does Everything on the Landing Screen Earn Its Place?

Mostly, with one deliberate exception.

The photograph of the sewing team communicates **brand and manufacturing context**, rather than operational information.

For that reason, it remains visually secondary. It supports the identity of the interface without competing with the summary counts or ranked production list for the user's first attention.

---

### What Groups Together, and Why?

#### Common Region

The three summary metrics are placed within the same visual region.

This causes them to be perceived as one conceptual unit:

> **The state of production today**

That region is visually distinct from the ranked production list below it.

#### Similarity

References within the same urgency category share consistent visual treatment.

For example, rows within an urgency band use the same colored indicator. This allows the planner to distinguish **Crítico** from **Atención** before reading every individual label.

#### Continuity

The production-stage sequence follows the actual physical movement of a garment through the manufacturing process:

**Insumos → Corte → Alfilerado → Confección → Bodega**

This sequence matches the planner's existing mental model of production, allowing the eye to follow the same direction that the product follows on the plant floor.

---

## 5. Signifiers and Interaction Design

The initial store-borrowing interaction did not clearly communicate that quantities could be adjusted.

The revised interface adds explicit **plus and minus controls** and displays a **live running total**.

These controls act as signifiers: the user no longer has to infer whether the quantity is editable.

A grouping header was also added above the store-selection area so that the available-store information is perceived as one coherent task rather than as several unrelated numbers and controls.

---

## 6. Do the Supporting Screens Stay on Mission?

Yes.

Both **Why This Score** and **Cover the Gap** are accessed from a specific reference on the priority list.

Their information therefore remains anchored to the item the planner is currently evaluating.

The navigation structure follows:

**Today's Run → Specific Reference → Explanation or Action**

All three screens also provide a path back to **Today's Run**, keeping the ranked production list as the central point of the workflow.

---

## 7. Before and After

The initial AI-generated landing page contained the necessary information, but the information had insufficient visual grouping and hierarchy.

Important operational information competed for attention because sections were not clearly separated into meaningful visual regions. As a result, the user's eye had fewer cues indicating:

- What should be read first
- Which information belonged together
- Which information represented the overall state of the day
- Where the detailed production list began

The revised design introduces stronger **common region, spacing, hierarchy, and visual separation**.

Summary information is grouped together as the state of the day, while detailed production priorities occupy a distinct region below it. This creates a clearer reading path and directs attention from high-level status to individual production decisions.

### Before / After Comparison

![Before and After Design Comparison](uploads/before%20and%20after.png)

**Before:** Information was present, but weak grouping and limited visual separation made the landing page feel flatter. Multiple elements competed for attention, making it less obvious where the planner should look first.

**After:** Related information is grouped into distinct visual regions, summary metrics receive stronger hierarchy, and the ranked production list is visually separated from the day's overview. The revised layout creates a more deliberate first read and makes the production priorities easier to scan.

---

## 8. What the AI Got Wrong or Oversimplified

AI accelerated the initial interface generation, but several design decisions required human correction.

### Continuity

The first draft represented the production stages in reverse order, beginning near the finished product and moving backward.

That representation did not match the planner's mental model of how production physically progresses.

The sequence was corrected to:

**Insumos → Corte → Alfilerado → Confección → Bodega**

The interface now follows the same direction as the manufacturing process itself.

### Signifiers

The initial store-borrowing quantity picker did not provide a clear visual indication that quantities could be changed.

The revised design adds:

- Explicit `+` controls
- Explicit `−` controls
- A live running total

The interaction is now discoverable rather than requiring the user to guess.

### Common Region

The initial design did not create enough visual separation between related and unrelated information.

The revised design uses clearer containers, spacing, and headers to communicate which information belongs together.

This is particularly important on the landing page, where the summary metrics now function as one visual unit before the planner moves into the detailed priority list.

---

# Feedback Questions

The following questions are designed to test the prototype's assumptions about the **Need, Value, Persona, and Capability**.

## Need

### Question

> "Walk me through the last time you had to figure out what to run first thing in the morning. What did you actually end up doing?"

### Prediction

The planner will describe manually opening the Odoo shortfall information and cross-referencing inventory levels, shortages, and production status to determine what needs to run.

They may also mention that this process consumes part of the limited early-morning planning window.

### What This Tests

This question tests whether the assumed problem actually occurs in the planner's real workflow and whether the manual cross-reference is significant enough to justify the prototype.

---

## Value

### Question

> "If you never had to do that manual check again, what's the one or two words that come to mind for what that gives you?"

### Prediction

The response will likely relate to:

- Time
- Certainty
- Confidence
- Peace of mind

### What This Tests

This tests whether the proposed fundamental value — **certainty and speed of decision** — matches the value the planner actually experiences.

---

## Persona

### Question

> "How often does this shortfall check come up for you, and what are you usually juggling right before or after it?"

### Prediction

The planner will likely describe the task as occurring daily, often after receiving updated information about missing orders, while also preparing or adjusting plant-floor production schedules.

### What This Tests

This validates whether the selected persona actually experiences the time pressure and task-switching assumed by the prototype.

---

## Capability

### Question

> "I'm going to show you this screen for five seconds, then hide it. What does this tool do?"

**Screen shown:** Today's Run

### Prediction

The planner should respond with something similar to:

> "It tells me what is most urgent to produce today."

The response should focus on the purpose of the tool rather than individual fields, numbers, or interface components.

### What This Tests

This directly evaluates whether the interface communicates its core capability at first glance.

If the planner can identify the purpose after five seconds, the visual hierarchy and signaling are working. If they instead describe isolated metrics or cannot determine the purpose, the landing screen needs further refinement.

---

## Design Summary

| Design Principle | Application in Prototype |
|---|---|
| **Common Region** | Summary metrics and related controls are visually grouped into meaningful units. |
| **Similarity** | Production references within the same urgency category share consistent visual treatment. |
| **Continuity** | Production stages follow the physical manufacturing sequence from inputs to warehouse. |
| **Signifiers** | Plus/minus controls communicate that store-transfer quantities are adjustable. |
| **Visual Hierarchy** | Daily status appears before detailed production records. |
| **First Read** | The landing screen communicates what requires attention before individual references are inspected. |

---

## Prototype Outcome

The final prototype is designed around one operational question:

> **What should production run first today?**

Every major screen supports that question:

1. **Today's Run** identifies the priority.
2. **Why This Score** explains the recommendation.
3. **Cover the Gap** provides a path to action.

The result is a focused workflow intended to replace repeated manual cross-referencing with a faster, more explainable production-prioritization decision.
