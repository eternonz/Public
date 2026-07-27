# show-me — Project Brief

Status: Incomplete
Published to: (none yet)

## Goal / Scope

Build a public, reusable Claude **Skill** named `show-me` that renders a complex idea as one
**self-contained, dependency-free HTML visual** (Apple-HIG-styled via system fonts):

- **Mode A — Decision / Roadmap Map:** horizontal critical-path steps + fishbone "why" branches
  (justification / prerequisite / risk); timeline variant for roadmaps.
- **Mode B — Concept:** canvas/SVG animation (play·pause·reset + parameter slider) or a simple
  hand-rolled SVG chart.

Public from the outset → **Public tier**. Source lives in this project; the finished skill
is a public deliverable for `github.com/eternonz/Skills`.

## Key decisions (planning gate, 2026-07-27)

Confirmed with the user before build:

1. **Render target = Both.** Emit a standalone `.html` file (primary; the only thing that works in
   the Claude Code terminal, where nothing renders inline) *and* keep it artifact-friendly so it
   renders live on claude.ai / Claude Desktop. Same HTML serves both.
2. **Scope = Both modes, lean.** Ship A and B, each minimal.
3. **Apple look = system font stack** (`-apple-system`). SF Pro is **not** embedded/linked —
   licensing-safe for a public repo, and identical to SF on Apple devices.
4. **Loose JSON shape, not a rigid schema.** The data shapes in the reference files are thinking
   aids Claude adapts; no hard validation layer (dropped Gemini's rigid IR as over-engineering).
5. Dropped from Gemini's draft: the "Principal Engineer" persona prose and the baked-in Phase-1
   native-app roadmap (kept only as a one-line status note). Reshaped the `description` to be
   trigger/keyword-focused (it's the only text Claude sees to decide when to fire).

## Deliverable layout (`Build/show-me/`)

- `SKILL.md` — entry point (rules + workflow).
- `references/{decision-map,concept-animation,styling}.md` — mode specs + shared design tokens.
- `assets/template.html` — self-contained skeleton.
- `examples/{decision-map,concept-animation}.example.html` — finished, verified references.
- `README.md` — public-facing skill readme.

## Acceptance standard

- [x] Skill files authored with progressive disclosure (SKILL.md → references → assets/examples).
- [x] Both example HTML files are single-file, no external deps/fonts/CDN, light+dark, reduced-motion aware.
- [x] Both examples verified in a browser: render correctly, interactive, **zero console errors**
      (decision map: click/keyboard step selection + rationale panel; pendulum: autoplay + sliders + period readout).
- [ ] User review / acceptance.
- [ ] On Completed: copy `Build/show-me/` → `Harness/GitHub/Publications/Skills/show-me/`
      (→ `github.com/eternonz/Skills`); record path here under `Published to:`.
- [ ] Add MIT `LICENSE` at publication.

## Out of scope (this phase)

- Phase 1 native macOS "Decision Audit & Evidence-Binding" app.
- Frameworks / build tooling / server rendering.
- More than the two modes; >7 steps or >5 series per visual (legibility cap).

## Change log

- **2026-07-27** — Project initialized (Public tier). Reviewed the Gemini draft, ran the planning
  gate (2 product decisions confirmed), authored the full skill, and verified both examples in the
  browser (no console errors, correct light/dark Apple styling). Status: Incomplete, pending user acceptance.
