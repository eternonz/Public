# Mode A — Decision / Roadmap Map

For anything that unfolds in **order** and has **reasons**: execution plans, workflows, decision chains, migrations, roadmaps, timelines.

## What it looks like

- A horizontal **critical path**: numbered step nodes left → right, joined by connectors. This answers **HOW**.
- Off each step, **fishbone rationale branches** (diagonal lines to small chips) answering **WHY**: what justifies it, what it needs first, what could go wrong.
- Interaction: click/Enter a step to expand its rationale panel; the rest dim. Keyboard-navigable (`Tab` between steps, `←/→` to move, `Enter`/`Space` to open).

The **roadmap/timeline variant** is the same structure with a time axis instead of pure sequence: label the connector gaps with dates/phases (Q1, Week 2, …) and drop the fishbone branches (or keep them as milestones).

## Loose data shape (a thinking aid, not a schema)

```json
{
  "mode": "decision_map",
  "goal": "Ship v2 API without downtime",
  "steps": [
    {
      "order": 1,
      "title": "Dual-write",
      "summary": "Write to old + new stores",
      "rationales": [
        { "type": "justification", "title": "Zero-downtime cutover", "detail": "New store fills while old still serves reads." },
        { "type": "prerequisite",  "title": "New schema live",       "detail": "Migrations applied and back-filled." },
        { "type": "risk",          "title": "Write amplification",   "detail": "2× write load; watch p99 latency." }
      ]
    }
  ]
}
```

- `type` ∈ `justification | prerequisite | risk` → colored green / orange / red (see `styling.md`).
- Adapt freely: add `date`/`phase` for roadmaps, `owner`, `status`, etc. Omit rationales for a pure timeline.

## Build notes

- **Render with SVG** for the connectors + fishbone lines (crisp at any zoom), HTML for the node cards positioned over it — or do the whole thing in SVG. Either is fine; keep it one file.
- Lay steps on a horizontal band; compute x by index, y centered. Draw the spine as one line; draw each rationale as a short diagonal from the step to its chip, alternating above/below to avoid overlap.
- Cap at ~7 primary steps and ~3 rationales each; if there are more, group or summarize — legibility first.
- Legend for the three rationale colors. Title = `goal`.
- Selected-state: raise the step card (shadow), full-opacity its branches, fade siblings to ~0.35.

## Accessibility

- Each step node is a `<button>` or has `role="button"` + `tabindex="0"` and an `aria-label` combining order + title + summary.
- Rationale panel updates should be announced (`aria-live="polite"`).
- Never rely on color alone: prefix rationale chips with a glyph/word (✓ justification, ⚑ prerequisite, ⚠ risk).

See `examples/decision-map.example.html` for a complete, working reference.
