<h1>productionftc</h1>

<h2>FTC · Production Planning Prototype</h2>

<h2>Design Rationale</h2>

<h3>Need, Persona, Capability, Value</h3>

<h3>Need</h3>
<p>
  Production planners must manually cross-reference each missing reference's
  production stage (warehouse, sewing, assembly, cutting) against order urgency
  (TikTok's 12-hour turnaround, a retail store's one week, international's few
  extra days) before deciding what to produce first.
</p>

<p>
  Doing this by hand for dozens of references every morning eats time the planner
  does not have, since the same person also schedules the plant floor.
</p>

<h3>Persona</h3>
<p>
  A production planner at a Colombian shapewear manufacturer who reviews order
  shortfalls before 6am each day to decide what runs first, splitting their time
  between planning and floor scheduling.
</p>

<h3>Capability</h3>
<p>
  See, at a glance, a single ranked list of what to produce first, without manually
  cross-referencing inventory, production stage, and order urgency for each reference.
</p>

<h3>Fundamental Value</h3>
<p>
  <strong>Certainty and speed of decision.</strong> The planner starts the day
  already knowing what runs now and what can wait, instead of rebuilding that
  judgment call from scratch every morning.
</p>

<hr>

<h2>The Three Screens</h2>

<h3>1. Today's Run ("Esto corre hoy, en orden.")</h3>

<p>
  <strong>Job:</strong> Show the day's priority list already ranked and grouped
  into action bands (Critical, Attention, Backlog), with the day's summary counts
  above it.
</p>

<p>
  <strong>Why it earned its slot:</strong> It is the entire value proposition
  compressed into one view. If a planner only ever saw this screen, they would
  already have what they came for.
</p>

<p>
  <strong>Design question it answers:</strong> Does the interface communicate the
  fundamental value before the person reads a single word?
</p>

<h3>2. Why This Score (detalle)</h3>

<p>
  <strong>Job:</strong> Break down why one reference has its score, across the
  three factors that build it (production stage, order urgency, inventory gap),
  alongside the underlying record pulled from Odoo.
</p>

<p>
  <strong>Why it earned its slot:</strong> Trust in a ranked list depends on the
  ranking being explainable. A planner will not act on a number they cannot audit.
</p>

<p>
  <strong>Design question it answers:</strong> Does the hierarchy separate the
  "why" from the supporting record, or are they given equal visual weight?
</p>

<h3>3. Cover the Gap (acción)</h3>

<p>
  <strong>Job:</strong> Let the planner act: borrow units from another store to
  close a shortfall, or log why a reference missed its window and follow it
  through to resolved.
</p>

<p>
  <strong>Why it earned its slot:</strong> It is the only place in the workflow
  where the planner does something instead of reading something, closing the loop
  from diagnosis to action.
</p>

<p>
  <strong>Design question it answers:</strong> Is the primary action unambiguous,
  and does the screen stay in the same visual language as the other two?
</p>

<hr>

<h2>Why These Three, and Nothing Else</h2>

<p>
  These screens are the entire operational loop:
  <strong>see the priority, understand why, act on it.</strong>
</p>

<p>
  Login, permissions, and system settings are necessary for a real build, but they
  tell a reviewer nothing about what the tool does for the person using it, and
  would compete with the core narrative rather than support it.
</p>

<p>
  Given a five-second look, a stranger should understand this is a manufacturing
  prioritization tool, not a generic admin panel, and that only requires the
  workflow itself on screen.
</p>

<hr>

<h2>Design Read: Grouping and Signaling</h2>

<h3>Does the landing screen signal the value before reading anything?</h3>

<p>
  Yes. The date, the headline, and the three summary counts (critical, attention,
  units missing) sit above every data row, so the state of the day is visible
  before any single reference is read.
</p>

<h3>Does everything on the landing screen earn its place?</h3>

<p>
  Mostly, with one deliberate call: the brand photo of the sewing team is identity,
  not information, so it stays secondary, behind and beside the counts rather than
  competing with them for the first look.
</p>

<h3>What groups together, and by which principle?</h3>

<ul>
  <li>
    <strong>Common region:</strong> The three summary numbers live inside one
    bordered panel, read as a single unit ("the state of today") distinct from the
    ranked list beneath it.
  </li>

  <li>
    <strong>Similarity:</strong> Every row in a given urgency band shares the same
    colored left bar. The eye sorts "Crítico" from "Atención" by color alone,
    before reading any label.
  </li>
</ul>

<h3>What did the AI get wrong or oversimplify, and what changed?</h3>

<ul>
  <li>
    <strong>Continuity:</strong> The first draft listed the production stages in
    reverse, starting near the finished good and working backward. Continuity only
    reads as a sequence when the order matches the viewer's own mental model of
    the process, so the path was corrected to match how a garment actually moves
    on the floor:
    <strong>insumos → corte → alfilerado → confección → bodega.</strong>
    The eye now traces the same direction the product does.
  </li>

  <li>
    <strong>Signifiers:</strong> The store-borrowing picker in "Cover the Gap"
    gave no visible way to change a quantity; nothing signaled it was adjustable.
    Added explicit plus and minus controls with the running total shown live, so
    the affordance is discoverable instead of guessed at.
  </li>

  <li>
    <strong>Common region:</strong> Added a small header above the store list,
    grouping it visually as one unit, separate from the quantity controls below it,
    so the picker reads as one coherent task rather than a loose row of numbers.
  </li>
</ul>

<h3>Do the other two screens stay on mission?</h3>

<p>
  Yes. Both are only reachable from a specific row on the priority list, and
  everything they show ties back to explaining or resolving that same reference.
  All three screens can return to Today's Run from anywhere.
</p>

<hr>

<h2>Before / After</h2>

<p>
  <strong>Initial AI output:</strong> Production stages listed in reverse order
  (warehouse-first). Store quantity picker with no visible increment control.
</p>

<p>
  <strong>Revised:</strong> Stages reordered to match the physical floor path.
  Store picker given explicit plus/minus steppers, a live running total, and a
  grouping header.
</p>
