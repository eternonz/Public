# show-me — Architecture Decision Record

Approval Status: Pending User Approval
Approved by: —
Approval date: —
Approval reference: —
Development Gate: Blocked
Document Completeness: Ready for User Review

Supersedes the 2026-07-30 migration skeleton. Authored 2026-07-31.

## Decision Summary

`show-me` remains a single-file, zero-dependency, Apple-styled HTML **renderer**, packaged as a Claude
Skill with progressive disclosure (`SKILL.md` → `references/` → `assets/` + `examples/`). v2 adds a
third render mode (chart), dependency/critical-chain and WBS rendering inside the existing decision
map, a recommendation block, and — the significant change — a **versioned input contract** that lets an
upstream analyzer drive it.

The architecture is defined as much by what it refuses as by what it does: show-me has **no input
discovery capability**. That is what makes a public release safe without a permission model.

## Context

- **Constraint — public repo.** Destination is `github.com/eternonz/Skills`. Anything shipped is world-
  readable and world-installable. Whatever capability is in the package, every installer receives.
- **Constraint — no runtime.** A Skill is Markdown plus static assets. There is no daemon, no
  installer, no settings UI, nowhere to safely store a per-user permission grant.
- **Constraint — three-project boundary.** KYC (private) analyzes. WhatEvidence (approved PRD/ADR,
  Architecture Spike authorized) is the commercial product owning persistence, evidence, and memory.
  show-me must serve both without duplicating either. If show-me grows an analysis engine, it
  publishes WhatEvidence's wedge.
- **Baseline.** v1 exists and is browser-verified: `SKILL.md`, three reference files, one template,
  two examples. Its five core rules (one file / system fonts / light+dark / one screen / accessible)
  are proven and are not reopened.
- **Driver — the User's actual pain.** Analysis in one window, picture in another. The fix is a clean
  handoff, not a bigger skill.

## Decision Drivers

1. Publishable without a permission model.
2. Two callers (a human in conversation; an automated analyzer) with one code path.
3. Independent evolution — KYC must be able to change its analysis without breaking the renderer.
4. Zero dependencies, offline, one file. Non-negotiable, inherited from v1.
5. Must not become a WhatEvidence substitute.

## Proposed Architecture

```
┌────────────────────────┐
│  KYC  (private)        │   enumerate → classify → extract → attribute
│  the analyzer          │   → derive tasks → dependency graph → WBS
└───────────┬────────────┘
            │  showme-spec v1  (JSON object, versioned, additive-only)
            │  + output_path   (caller-chosen, private)
            ▼
┌────────────────────────┐
│  show-me  (public)     │   Mode A  decision / roadmap / DAG / WBS
│  the renderer          │   Mode B  concept animation   (科学原理)
│  stateless, no I/O     │   Mode C  chart
│  discovery             │   + whats_next recommendation block
└───────────┬────────────┘
            │  one self-contained .html
            ▼
   artifact (claude.ai)  |  file on disk (terminal)

   ── conversation context also enters show-me directly (v1 path, unchanged) ──
```

## Decision Register

### ADR-001 — show-me is presentation-only; it has no input-discovery capability

**Decision Status:** Proposed

**Decision.** show-me accepts input from exactly two sources: the conversation context, or a
caller-supplied `showme-spec` object. It contains no instruction to list a directory, glob, search the
filesystem, read an unspecified file, or ask the user which folder it may analyze. This is enforced as
a packaging test, not a convention.

**Rationale.** A public Skill cannot hold a trustworthy permission grant — there is no runtime to store
one and no UI to collect one. Removing the capability removes the risk class entirely. It also gives
the correct answer to the User's requirement that other GitHub users are never prompted for a folder:
they are not prompted because there is nothing to prompt for.

**Alternatives considered.**
- *Config file with an empty-by-default allowlist.* Rejected: still ships the capability, still needs a
  prompt on first use, and a Skill has nowhere durable to keep the config.
- *Ask permission per invocation.* Rejected: blocks automated callers, and trains users to grant broad
  read scope to a drawing tool.

**Consequences.**
- Benefits: safe to publish as-is; no permission model; no privacy surface; sharp project boundary.
- Costs and risks: show-me alone cannot answer *"analyze my Memo and advise"* — that requires KYC. A
  public installer gets a renderer, not an assistant. Accepted, and correct.

---

### ADR-002 — Versioned, additive-only input contract (`showme-spec` v1)

**Decision Status:** Proposed

**Decision.** Define one JSON object as the analyzer→renderer interface. Unknown fields are ignored;
absent fields degrade gracefully; no field is ever removed or repurposed within a major version.

```json
{
  "spec_version": "1",
  "mode": "decision_map | concept | chart",
  "title": "Next 6 weeks",
  "subtitle": "derived from 14 Memo items, 2026-07-01 → 07-31",

  "steps": [
    {
      "id": "t1",
      "order": 1,
      "title": "Confirm scope with manager",
      "summary": "…",
      "status": "not_started",
      "duration": 2,
      "depends_on": [],
      "children": [ { "id": "t1.1", "title": "…", "children": [] } ],
      "rationales": [
        { "type": "justification", "title": "…", "detail": "…" },
        { "type": "prerequisite",  "title": "…", "detail": "…" },
        { "type": "risk",          "title": "…", "detail": "…" }
      ],
      "provenance": { "label": "voice memo, 07-24", "confidence": "high" }
    }
  ],

  "series": [ { "name": "Open", "points": [ { "x": "W1", "y": 12 } ] } ],

  "whats_next": [
    { "title": "Start t1 this week", "detail": "…", "refs": ["t1"], "priority": 1 }
  ],

  "notes": ["3 audio items could not be read — shown as gaps"],
  "output_path": "/private/path/brief.html"
}
```

**Rationale.** A versioned contract is the seam that lets KYC and show-me change independently.
Additive-only means a KYC pinned to v1 never breaks when show-me ships v1.1. `provenance` and `notes`
exist so the renderer can display *where a task came from* and *what the analyzer could not see*
without show-me needing to know anything about Memo, audio, or OCR.

**Alternatives considered.**
- *Rigid validated schema.* Rejected in v1 planning as over-engineering; still rejected. Validation
  would make a partial analysis unrenderable, which is the opposite of useful.
- *Free-form prose handoff.* Rejected: not machine-drivable, no dependency structure.

**Consequences.**
- Benefits: automated callers work without prompts; two projects decouple; contract is testable.
- Costs and risks: a contract is a commitment. Breaking it later means a v2 spec and a migration.

---

### ADR-003 — Mode C (chart) is hand-rolled SVG, no charting library

**Decision Status:** Proposed

**Decision.** Bar, grouped bar, stacked bar, line, area, and donut, drawn directly in SVG with an
accessible `<table>` fallback. No D3, no Chart.js, no CDN.

**Rationale.** Rule 1 (one file, zero dependencies) is the skill's whole value proposition. Vendoring a
chart library into every emitted file is megabytes per visual and licence surface in a public repo. The
chart types the User actually needs — task/project status over time — are a few dozen lines of SVG.

**Alternatives considered.** Inlining a minified micro-charting library — rejected: licence attribution
in every output file, and it still fails the "readable single file" spirit.

**Consequences.**
- Benefits: stays offline and tiny; visual language stays consistent with Modes A and B.
- Costs and risks: exotic chart types are unavailable. Accepted — the legibility cap of ≤5 series
  already rules those out.

---

### ADR-004 — Dependencies and critical chain extend Mode A rather than becoming a fourth mode

**Decision Status:** Proposed

**Decision.** `depends_on` edges turn Mode A's linear spine into a left-to-right DAG. Layout by
topological rank (x = rank, y = packed within rank). The critical chain is computed by longest path —
weighted by `duration` when present, by edge count when not — and is rendered with a heavier stroke
plus an explicit legend entry.

**Rationale.** The User's 关键链路图 *is* a decision map with dependency edges; it shares the goal, the
step cards, and the rationale fishbone. A fourth mode would duplicate ~90% of Mode A. Falling back to
edge-count when durations are absent means KYC can emit a useful chain before it can estimate effort.

**Alternatives considered.** A separate `critical_path` mode — rejected as duplication. Requiring
durations — rejected: it would block the common case where the analyzer knows order but not effort.

**Consequences.**
- Benefits: one layout engine; roadmap, plan, and critical chain are one family.
- Costs and risks: DAG layout is materially harder than a straight line. Cycles must be detected and
  reported in `notes` rather than hanging the renderer.

---

### ADR-005 — WBS renders as nested nodes with progressive disclosure, depth supplied by the caller

**Decision Status:** Proposed

**Decision.** `children[]` nests to arbitrary depth. Default render shows top level only, with an
expand affordance showing child count. show-me never decides how deep to break work down — it draws
the depth it was given.

**Rationale.** Depth is an analysis decision (does the User know how to start this task?), and that
judgement belongs to KYC, which has the context. The renderer's job is to keep depth legible.

**Consequences.**
- Benefits: one visual serves both a 5-task overview and a 40-leaf breakdown.
- Costs and risks: deep trees still need a legibility strategy per level; caps apply per level.

---

### ADR-006 — `whats_next` renders as a delimited block, never mixed into the diagram

**Decision Status:** Proposed

**Decision.** Recommendations render in their own region beneath the visual, visually separated, each
optionally carrying `refs` into task ids or chart series.

**Rationale.** Advice and analysis must be distinguishable at a glance. Mixing a recommendation into a
task node makes the AI's suggestion look like observed fact — the exact confusion WhatEvidence's
Observation Gap principle exists to prevent. Separation here keeps show-me honest, and matches the
User's Constitution §1 wrap-up, where `What's Next?` is a distinct heading.

**Consequences.** Benefits: honest, and consistent with the User's existing answer format. Costs:
vertical space; on a small viewport the block may need to collapse.

---

### ADR-007 — Colour vocabulary is explicitly partitioned from WhatEvidence

**Decision Status:** Proposed

**Decision.** show-me keeps green/orange/red for rationale chips (justification / prerequisite / risk),
always accompanied by a glyph and word. show-me does **not** colour task nodes to encode state — status
is a text label or glyph. show-me does not use purple-dashed edges or the `AI ?` badge.

**Rationale.** WhatEvidence's approved ADR reserves red/yellow/green for Task Evidence sufficiency and
purple + `AI ?` for AI-questioned Evidence. If show-me colours a task node red, a user who later uses
WhatEvidence will read it as "insufficient evidence". Partitioning now costs nothing; retrofitting
later costs a visual-language migration across both products.

**Consequences.** Benefits: the two products can be used side by side without semantic collision.
Costs: show-me gives up an easy channel for status and must spend a label on it.

---

### ADR-008 — Caller owns the output path; containment is a tested property

**Decision Status:** Proposed

**Decision.** `output_path` when supplied is authoritative. Default remains `~/Downloads/show-me-<slug>.html`.
show-me never writes into a git-tracked location by default. Every string in the emitted file traces to
the spec, the conversation, or fixed skill chrome — verified by an automated containment check.

**Rationale.** KYC will build visuals from private material (Memo-derived tasks, possibly alongside
health work). The analyzer, which knows the sensitivity, must choose where the file lands; the
renderer, which does not, must not default it somewhere convenient. The containment check is what makes
"show-me carries nothing it wasn't given" an assertion rather than a hope.

**Consequences.** Benefits: private analysis produces private artifacts; no accidental publication.
Costs: KYC must always pass a path — a missing path silently defaulting to `~/Downloads` is a real
foot-gun, so KYC's own gate must require it.

## Data, Security, and Privacy

- show-me holds no data at rest. No config, no cache, no memory, no telemetry.
- show-me performs no network I/O at author time or run time. Emitted files perform none either.
- show-me receives only what a caller hands it. It cannot widen its own scope.
- Sensitivity classification and output location are the **caller's** responsibility (ADR-008).
- Public-repo hygiene: no SF Pro, no bundled fonts, no vendored libraries, MIT `LICENSE` at publication.

## Testing and Verification Gates

| Gate | Pass condition |
|---|---|
| Boundary (packaging) | Static scan of the packaged skill finds no directory-listing, glob, file-search, or folder-permission prompt on any mode path. **Hard gate — blocks publication.** |
| Containment | Automated check: output strings ⊆ spec ∪ conversation ∪ skill chrome. **Hard gate.** |
| Contract degradation | Partial / unknown-field / malformed specs each produce a valid file naming what was missing; no uncaught exception. |
| Contract stability | A frozen v1 fixture renders identically before and after any additive change. |
| Cycle safety | A dependency cycle is reported in `notes`, not hung on or silently dropped. |
| Golden examples | One verified example per mode, plus dependency/WBS and `whats_next` examples. Zero console errors, light + dark, reduced-motion. |
| Offline | Every example opens by double-click with networking disabled. |
| Accessibility | Keyboard reachable; `aria-live` on panel updates; no colour-only meaning; chart table fallback. |
| Legibility caps | Over-cap input summarizes visibly rather than overflowing. |
| Regression | The two v1 examples still render correctly and are unchanged in behaviour. |

## Unresolved Decisions

1. Chart sub-types for first release (PRD Open Decision 1).
2. `whats_next` interactivity — static vs. cross-highlighting (PRD Open Decision 2).
3. Critical-chain weighting default when durations are absent (PRD Open Decision 3).
4. Whether the packaging boundary scan is a script in `Build/` or a documented manual checklist.
5. Publication sequencing relative to KYC's first end-to-end use of the contract (PRD Open Decision 4).

## Further Notes

No development is authorized until this ADR and `PRD.md` are complete and explicitly approved by the
User. This document does not change the project lifecycle Status, which remains `Incomplete`.
