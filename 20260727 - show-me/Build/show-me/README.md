# show-me

A Claude **Skill** that turns a complex explanation into one **self-contained, dependency-free HTML visual** — a decision/roadmap map, a concept animation, or a chart — styled to feel like Apple HIG using only system fonts. The file opens in any browser offline and also renders as a live artifact on claude.ai / Claude Desktop.

## When it fires

Claude invokes `show-me` when a picture beats prose:

- **Plans, workflows, decisions, roadmaps** → *decision map* (critical-path steps + fishbone "why" branches; timeline variant for roadmaps).
- **Principles, mechanisms, data, abstractions** → *concept* (canvas/SVG animation with play/pause/scrub, or a simple hand-rolled SVG chart).

Prompts like *"show me…", "visualize…", "diagram…", "animate…", "make a roadmap/flowchart/timeline"* are typical triggers.

## What you get

- **One `.html` file.** All CSS + JS inlined. No CDN, no external fonts, no build step, no network calls. Works by double-click, offline.
- **Apple look, correct licensing.** System font stack (`-apple-system`) — which *is* San Francisco on Apple devices — so nothing proprietary is embedded or redistributed.
- **Light + dark**, `prefers-reduced-motion` respected, keyboard-accessible controls, real (selectable) text.

## Structure

```
show-me/
├── SKILL.md                     # entry point: rules + workflow (what Claude reads)
├── references/
│   ├── decision-map.md          # Mode A spec
│   ├── concept-animation.md     # Mode B spec
│   └── styling.md               # shared Apple-style design tokens
├── assets/
│   └── template.html            # self-contained starting skeleton
└── examples/
    ├── decision-map.example.html      # finished, working reference
    └── concept-animation.example.html # finished, working reference
```

## Install

Copy the `show-me/` folder into your Claude skills directory (e.g. a plugin's `skills/`, or `~/.claude/skills/show-me/`). Claude auto-loads `SKILL.md` and pulls the reference files on demand.

## Design guarantees (the skill enforces these)

1. Single file, zero runtime dependencies.
2. System fonts only — no font files shipped or linked.
3. Light + dark via `prefers-color-scheme`.
4. Purposeful motion (200–400 ms), reduced-motion honored.
5. Accessible: keyboard-reachable controls, no color-only meaning, real text.

## Status

Phase 0 — open-source MVP / feasibility study for visual decision & concept explanations.

## License

MIT (see repository root).
