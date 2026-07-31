# show-me — Product Requirements Document

Approval Status: Approved
Approved by: User
Approval date: 2026-07-31
Approval reference: Claude Code 会话 2026-07-31（用户原话：“I agree to re-activate them, and approve all corresponding ADR & PRD if you have successfully updated my mentions into them”）；证据见 `History/202607311149_P_ReactivationAndV2Scope_CCD.md`
Development Gate: Open — 实现已授权。PRD §Open Decisions 的 4 项待决仅阻塞其对应特性，不阻塞整体实现
Document Completeness: Approved

Supersedes the 2026-07-30 migration skeleton. Authored 2026-07-31 from `project.md`, the shipped
`Build/show-me/` deliverable, and the User's 2026-07-31 scope clarification. Existing implementation
does not imply approval.

## Problem Statement

Two different people arrive at the same wall.

1. **Anyone trying to understand something complex.** Prose explains a 科学原理, a migration plan, or a
   funnel badly. A picture — often a *moving* picture — lands in seconds where three paragraphs fail.
2. **Anyone who has already done the analysis and now has to present it.** An upstream analyst (a
   human, or in this Harness the KYC project) finishes with a task list, a dependency graph, and a set
   of recommendations — and then has nowhere to put them. Today the answer is a wall of Markdown
   bullets, or a jump into a separate diagramming tool. The User's stated pain: *"我们总需要在多个窗口
   之间切换"* — the analysis lives in one window and the picture lives in another.

`show-me` v1 solved only (1), and only for two shapes: a decision/roadmap map and a concept animation.
It has no way to accept a finished analysis from a caller, cannot draw a chart, cannot express
dependencies between tasks, cannot show a work breakdown, and has no place to put recommendations.

## Solution

`show-me` is a **presentation-only** Skill. It converts *supplied* structure into one self-contained,
dependency-free, Apple-styled HTML visual. It is the drawing surface at the end of somebody else's
thinking — and, unchanged from v1, the drawing surface for a concept the model is explaining directly.

The defining constraint, and the reason this is safe to publish:

> **show-me never discovers input.** It does not enumerate directories, does not read files it was not
> handed, does not maintain a config file, and **never asks the user which folder it may analyze.**
> Its input is the conversation context or a caller-supplied spec object. Nothing else.

That is a capability boundary, not a policy. A public installer gets a renderer, grants it no
filesystem scope, and is never prompted for one.

### Division of responsibility

| Concern | Owner | Not the owner |
|---|---|---|
| Reading a local folder, transcription, OCR, speaker identity, task derivation, dependency inference, WBS reasoning | **KYC** (private) | show-me |
| Rendering tasks, dependencies, critical chain, WBS, charts, roadmaps, animations, recommendations | **show-me** (public) | KYC |
| Persistent evidence graph, Evidence sufficiency judgement, AI Memory, Time Lens, D2 Clarification Inbox, collaboration | **WhatEvidence** | show-me and KYC |

show-me holds no state between invocations. Every output is a disposable artifact. When KYC and
show-me both work, WhatEvidence inherits a proven analyzer and a proven visual language — which is
the benefit path the User requires, and the reason show-me must not grow into a competing product.

## User Stories

### Existing capability (v1 — retained, must not regress)

1. As any user, when I ask *"show me how a PID loop works"*, show-me emits a concept animation with
   play/pause/reset and a parameter slider, so I can watch the principle instead of reading about it.
2. As any user, when I ask *"walk me through the migration"* or *"lay out the Q3 roadmap"*, show-me
   emits a decision/roadmap map: a horizontal critical path answering HOW, with fishbone rationale
   branches answering WHY.
3. As any user, I can double-click the produced `.html` offline, on any machine, with no network, no
   CDN, no font download, and no build step, and it renders correctly in light and dark.

### New capability (v2 — this PRD)

4. As any user, when I ask *"chart the sprint status"* or *"show the drop-off by stage"*, show-me emits
   a **chart** (Mode C) — bar, line, stacked, or donut — hand-rolled in SVG, so numbers about a task
   or project become a picture without pulling in a charting library.
5. As an **upstream analyzer** (KYC today, WhatEvidence later), I hand show-me a task set where tasks
   declare dependencies, and show-me renders a **关键链路图 / critical-chain diagram**: a left-to-right
   DAG with explicit dependency arrows, and the longest dependency path visually distinguished as the
   critical chain.
6. As an upstream analyzer, I hand show-me tasks that carry child tasks, and show-me renders the
   **work breakdown** as nested, progressively-disclosed nodes — collapsed to the top level by
   default, expandable to the depth I supplied, so a large breakdown stays legible.
7. As any user, when the visual carries advice, show-me renders a distinct **"What's Next"**
   recommendation block inside the same file — visually separated from the analysis, each item
   optionally linked to the task or chart series it refers to — so the recommendation and its
   justification live in one window.
8. As an upstream analyzer, I supply a **versioned spec object** and show-me draws it without asking me
   any follow-up questions, so an automated caller is never blocked on an interactive prompt.
9. As an upstream analyzer, I specify the **output path**, so a visual built from private material is
   written where the caller decides — not to a default public-ish location.
10. As a public GitHub user, I install show-me and it asks me for **no configuration and no folder
    permission**, ever, because it has no ability to read one.
11. As the maintainer, I can verify that the emitted HTML contains **no text that was not in the spec
    or the conversation** — show-me invents no content and carries no source material it wasn't given.
12. As any user, when the supplied data exceeds legibility caps (≈7 primary steps, ≈5 series), show-me
    **summarizes and says so** in the visual rather than rendering an unreadable wall.
13. As any user, when a spec is partial or malformed, show-me renders what it can and states what was
    missing, rather than failing to produce a file.

## Implementation Decisions

### Render modes

- **Mode A — Decision / Roadmap Map.** Retained from v1. Extended with: optional `dependencies` edges
  between steps (turning the linear spine into a DAG), critical-chain highlighting, optional nested
  `children` for WBS, and optional `date`/`phase` for the timeline variant.
- **Mode B — Concept Animation.** Retained from v1 unchanged. Canvas/SVG, play·pause·reset,
  parameter slider, `prefers-reduced-motion` respected. This is the 科学原理 path.
- **Mode C — Chart.** New. Hand-rolled SVG: bar, grouped bar, stacked bar, line, area, donut. No
  charting library, consistent with the zero-dependency rule. Axis labels, legend, accessible data
  table fallback.
- **Recommendation block.** New, cross-cutting. Any mode may carry a `whats_next` array; it renders as
  a separate, clearly delimited region beneath the visual, never mixed into the diagram body.

### Input contract

- A single versioned object, `showme-spec` v1, carrying `spec_version`, `mode`, `title`, the mode
  payload, optional `whats_next`, optional `provenance` labels, and optional `output_path`.
- The contract is **additive-only** within a major version: unknown fields are ignored, absent fields
  degrade gracefully. A caller pinned to v1 never breaks on a show-me update.
- Conversation context remains a valid input. When no spec is supplied, show-me behaves exactly as v1
  and models the content itself.

### Hard prohibitions (these are the boundary)

- No directory enumeration, glob, file search, or "which folder may I read" prompt — in any mode.
- No config file, no persisted preferences, no state carried between invocations.
- No transcription, OCR, speaker identification, or authority reasoning.
- No CDN, external font, network call, framework, or build step. (v1 rule, retained.)
- No evidence-sufficiency judgement. See colour semantics below.

### Colour semantics — deliberate separation from WhatEvidence

WhatEvidence reserves red/yellow/green for **Task Evidence sufficiency** and purple-dashed + `AI ?` for
**AI-questioned Evidence**. show-me's existing green/orange/red rationale chips
(justification / prerequisite / risk) predate that and are retained — but:

- Rationale chips carry a glyph and word (`✓ justification`, `⚑ prerequisite`, `⚠ risk`), never colour
  alone, so they cannot be misread as sufficiency.
- **Task and step nodes must not be coloured to encode state.** Status, if supplied, is rendered as an
  explicit text label or glyph on the node. show-me never colours a task node red to mean "weak".
- show-me never uses the purple-dashed / `AI ?` treatment. That vocabulary stays WhatEvidence's.

### Output

- Primary: one self-contained `.html`. On claude.ai / Claude Desktop, also emitted as a live artifact.
- Default path when no caller specifies one: `~/Downloads/show-me-<slug>.html` (v1 behaviour).
- When `output_path` is supplied, show-me writes there and nowhere else.
- show-me never writes into a git-tracked location by default.

## Testing Decisions

| Gate | Requirement |
|---|---|
| Golden examples | One finished, browser-verified example per mode (A, B, C) plus one dependency/WBS example and one `whats_next` example. Zero console errors, light + dark, reduced-motion honoured. |
| Contract — degradation | Partial, unknown-field, and malformed specs each still produce a valid file that names what was missing. No uncaught exception, no empty output. |
| Contract — versioning | A v1 spec renders identically before and after any additive change. |
| Containment | For a given spec, every text string in the output traces to the spec or to fixed skill chrome. Automated diff check, not eyeballing. |
| Boundary | Static check: the packaged skill contains no directory-listing, glob, file-search, or folder-prompt instruction in any mode path. |
| Legibility caps | Over-cap input (>7 steps, >5 series) summarizes with a visible "n more" affordance rather than overflowing. |
| Accessibility | Keyboard reachable, `aria-live` on panel updates, no colour-only meaning, real text (never text baked into images), chart has a table fallback. |
| Offline | Every example opens by double-click with the network disabled. |

## Out of Scope

- Reading, discovering, watching, or being granted access to any local folder. **Permanently.**
- Transcription, OCR, diarization, speaker identity, authority reasoning — KYC owns these.
- Persistence, AI Memory, evidence graph, Evidence sufficiency, Time Lens, D2, collaboration,
  multi-map review — WhatEvidence owns these.
- Frameworks, build tooling, server rendering, charting libraries.
- The Phase 1 native macOS app.
- More than the three modes; more than the legibility caps allow in one visual.

## Open Decisions — User input required before approval

1. **Chart sub-types for first release.** Proposed: bar, grouped bar, stacked bar, line, donut. Confirm
   or cut. (Each sub-type is real implementation cost.)
2. **`whats_next` interactivity.** Static list, or clickable items that highlight the related task/series
   in the diagram above? The latter is materially better and materially more work.
3. **Critical-chain definition.** Longest-duration path (requires durations on tasks) or longest
   dependency path by count (needs no durations)? Proposed: support both, default to count when no
   durations supplied.
4. **Publication timing.** Publish v2 to `github.com/eternonz/Skills` only after KYC has exercised the
   contract end-to-end, or publish the renderer independently first?

## Further Notes

No development is authorized until this PRD and `ADR.md` are complete and explicitly approved by the
User. This document does not change the project lifecycle Status, which remains `Incomplete`.
