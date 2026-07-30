# show-me — Project Brief
Status: Incomplete
Published to: (none yet)
<!-- DOCUMENTATION-GATE:BEGIN -->
Development Gate: Blocked — `PRD.md` and `ADR.md` were authored in full on 2026-07-31 for the v2 scope
and are awaiting explicit User approval. No implementation may begin until both record approval.

Canonical documents:

- Requirements: [PRD.md](PRD.md) — Pending User Approval (Ready for User Review, 2026-07-31)
- Architecture and decisions: [ADR.md](ADR.md) — Pending User Approval (Ready for User Review, 2026-07-31)

Markdown location exceptions:

- `Build/show-me/README.md` — packaged Skill README required inside the deliverable.
- `Build/show-me/SKILL.md` — required entrypoint for the packaged Skill.
- `Build/show-me/references/concept-animation.md` — packaged Skill reference loaded by `SKILL.md`.
- `Build/show-me/references/decision-map.md` — packaged Skill reference loaded by `SKILL.md`.
- `Build/show-me/references/styling.md` — packaged Skill reference loaded by `SKILL.md`.
<!-- DOCUMENTATION-GATE:END -->

## Goal / Scope

Build a public, reusable Claude **Skill** named `show-me` that renders supplied structure as one
**self-contained, dependency-free HTML visual** (Apple-HIG-styled via system fonts).

**v2 scope, confirmed with the User 2026-07-31 — show-me is a renderer, not an analyzer:**

- **Mode A — Decision / Roadmap / Critical-Chain Map:** ordered steps + fishbone "why" branches;
  extended with dependency edges (关键链路图), critical-chain highlighting, and nested WBS children.
- **Mode B — Concept:** canvas/SVG animation for a 科学原理 — play·pause·reset + parameter slider.
- **Mode C — Chart (new):** hand-rolled SVG charts about tasks, projects, and metrics.
- **`What's Next` block (new):** recommendations rendered as a delimited region inside the same file.
- **`showme-spec` v1 input contract (new):** lets an upstream analyzer drive the renderer directly.

**Hard boundary.** show-me never discovers its own input. It does not enumerate folders, does not read
unspecified files, keeps no config, and **never asks any user which folder it may analyze.** That is a
missing capability, not a policy — which is what makes it safe to publish.

Public from the outset → **Public tier**. Source lives in this project; the finished skill is a public
deliverable for `github.com/eternonz/Skills`.

## Three-project relationship (User direction, 2026-07-31)

| Project | Role |
|---|---|
| **KYC** (`Private/20260723 - KYC`) | The **analyzer**. Owns `Tasks/Memo/` access, multi-format ingestion, speaker identity, task derivation, dependency inference, and WBS reasoning. Emits a `showme-spec`. |
| **show-me** (this project) | The **renderer**. Draws whatever it is handed. Also, independently, draws 科学原理 animations straight from conversation — that use is unchanged from v1. |
| **WhatEvidence** (`Private/20260728 - WhatEvidence`) | The **product**. Inherits a proven analyzer and a proven visual language once both above succeed. Retains sole ownership of persistence, Evidence sufficiency, AI Memory, Time Lens, and D2. |

show-me must never obstruct KYC or WhatEvidence. Concretely: it holds no state, claims no evidence
judgement, and its colour vocabulary is explicitly partitioned from WhatEvidence's (see ADR-007).

## Key decisions (planning gate, 2026-07-27 — v1, still binding)

1. **Render target = Both.** Standalone `.html` (the only thing that works in the Claude Code
   terminal) *and* artifact-friendly for claude.ai / Claude Desktop. Same HTML serves both.
2. **Apple look = system font stack** (`-apple-system`). SF Pro is never embedded or linked —
   licensing-safe for a public repo, and identical to SF on Apple devices.
3. **Loose JSON shape, not a rigid schema.** Data shapes are thinking aids Claude adapts; no hard
   validation layer. Carried into the v2 contract as additive-only, degrade-gracefully.
4. Five core rules retained unchanged: one file / zero deps · system fonts · light+dark · one screen,
   calm motion · accessible.

## Deliverable layout (`Build/show-me/`)

- `SKILL.md` — entry point (rules + workflow).
- `references/{decision-map,concept-animation,styling}.md` — mode specs + shared design tokens.
- `references/chart.md` — **planned (v2)**: Mode C spec.
- `references/spec-contract.md` — **planned (v2)**: `showme-spec` v1 reference for callers.
- `assets/template.html` — self-contained skeleton.
- `examples/` — one finished, verified reference per mode, plus dependency/WBS and `whats_next`.
- `README.md` — public-facing skill readme.

## Acceptance standard

**v1 — met 2026-07-27**

- [x] Skill files authored with progressive disclosure (SKILL.md → references → assets/examples).
- [x] Both example HTML files single-file, no external deps/fonts/CDN, light+dark, reduced-motion aware.
- [x] Both examples verified in a browser: render correctly, interactive, **zero console errors**.

**v2 — pending**

- [ ] PRD and ADR explicitly approved by the User (currently blocking all implementation).
- [ ] Mode C, dependency/critical-chain, WBS nesting, and `whats_next` implemented.
- [ ] `showme-spec` v1 documented and exercised end-to-end by KYC.
- [ ] **Boundary scan passes** — no folder enumeration or permission prompt anywhere in the package.
- [ ] **Containment check passes** — output carries no string it was not given.
- [ ] v1 examples still render correctly (no regression).
- [ ] User review / acceptance.
- [ ] On Completed: copy `Build/show-me/` → `Harness/GitHub/Publications/Skills/show-me/`
      (→ `github.com/eternonz/Skills`); record path here under `Published to:`.
- [ ] Add MIT `LICENSE` at publication.

## Out of scope (this phase)

- Reading, discovering, or being granted access to any local folder — **permanently out of scope**.
- Transcription, OCR, diarization, speaker identity, authority reasoning — KYC owns these.
- Persistence, AI Memory, evidence graph, Time Lens, D2, collaboration — WhatEvidence owns these.
- Phase 1 native macOS app; frameworks / build tooling / server rendering; charting libraries.

## Change log

- **2026-07-27** — Project initialized (Public tier). Reviewed the Gemini draft, ran the planning gate
  (2 product decisions confirmed), authored the full skill, and verified both examples in the browser
  (no console errors, correct light/dark Apple styling). Status: Incomplete, pending user acceptance.
- **2026-07-30** — Canonical `PRD.md` / `ADR.md` migration skeletons added under the Constitution gate;
  Development Gate recorded as Blocked. Separately, `WhatEvidence/History/project.md` recorded that
  show-me is an incomplete preference study, not a WhatEvidence specification.
- **2026-07-31** — **Project reactivated with a redirected scope.** User clarified the division of
  labour: KYC performs scanning and analysis; show-me only presents the result. Accordingly show-me
  gains Mode C (charts), dependency / 关键链路图 / critical-chain rendering, nested WBS, a `What's Next`
  recommendation block, and a versioned `showme-spec` input contract — and permanently gives up any
  input-discovery capability, so it never asks a public user which folder it may read. Replaced both
  migration skeletons with complete, project-specific `PRD.md` and `ADR.md` (8 ADRs). Both remain
  Pending User Approval, so the Development Gate stays Blocked and no code was written.
