---
name: show-me
description: Generate a self-contained, Apple-styled interactive HTML visual — a decision/roadmap map, a concept animation, or a chart — to explain something complex. Use when a visual, animated, or diagrammatic explanation would land better than prose: multi-step plans, workflows, decision chains, roadmaps/timelines, physics or math principles, mechanical systems, or abstract concepts. Trigger on requests like "show me", "visualize", "diagram", "animate", "draw", "make a roadmap/flowchart/timeline", or when the user is clearly struggling to picture something from text alone.
---

# show-me

Turn a complex explanation into one **self-contained, dependency-free HTML visual** that opens in any browser and also renders as a live artifact on claude.ai / Claude Desktop.

## When to use this skill

Use it when a picture beats paragraphs:

- **Plans, workflows, decisions, roadmaps** → *decision map* mode. "Walk me through the migration", "why these steps", "lay out the Q3 roadmap".
- **Principles, mechanisms, data, abstractions** → *concept* mode. "How does a PID loop work", "animate binary search", "show the funnel drop-off".

Do **not** use it for a one-line answer, for content that is already visual (the user shared an image), or when the user explicitly wants text only.

## Core rules (non-negotiable)

1. **One file, zero dependencies.** All CSS and JS are inlined. No CDN links, no external fonts, no network calls, no build step. The file must work offline by double-click.
2. **Apple look via system fonts.** Use the system font stack and the tokens in `references/styling.md`. Never embed or link SF Pro (licensing) — `-apple-system` already *is* SF on Apple devices.
3. **Light + dark.** Support both via `prefers-color-scheme`. No hard-coded page background that fights the OS theme.
4. **One screen, calm motion.** Fit a laptop screen without scrolling where possible. Motion is purposeful (200–400 ms, standard ease), never decorative jitter.
5. **Accessible.** Real text (not text baked into images), keyboard-reachable controls, `prefers-reduced-motion` respected, sufficient contrast.

## Workflow

1. **Pick the mode.**
   - Steps that happen in order, or a choice/plan with reasons → **decision map** (`references/decision-map.md`).
   - Something to watch move, a principle, or numbers → **concept** (`references/concept-animation.md`).
   - Unsure → ask one short question, or default to decision map for "how/why", concept for "what/how-much".
2. **Model the content.** Sketch the data as the loose JSON shape shown in the mode's reference file. It's a thinking aid, not a schema to validate — adapt fields freely.
3. **Build from the template.** Start from `assets/template.html`. Replace the `<!-- CONTENT -->` region and the `// LOGIC` region. Keep the `<head>`, theme variables, and reduced-motion guard intact.
4. **Keep it lean.** Vanilla JS + SVG or `<canvas>`. No frameworks. If it needs more than ~200 lines of script, it's probably too ambitious for one visual — split or simplify.
5. **Output both ways.**
   - **On claude.ai / Claude Desktop:** emit the HTML as an artifact (type `text/html`) so it renders live in the conversation.
   - **Everywhere (incl. the Claude Code terminal, where nothing renders inline):** write the file to disk — default `~/Downloads/show-me-<slug>.html` — and tell the user the path plus "open it in your browser". The exact same HTML serves both.
6. **Sanity-check before handing off:** open/preview it, confirm no console errors, confirm it renders in light *and* dark, confirm controls work by keyboard.

## Reference files

- `references/decision-map.md` — Mode A: critical-path steps + fishbone rationale branches; roadmap/timeline variant.
- `references/concept-animation.md` — Mode B: canvas/SVG animations with play/pause/scrub, plus simple SVG charts.
- `references/styling.md` — the Apple-style design tokens (color, type, spacing, radius, shadow, motion) both modes share.
- `assets/template.html` — the self-contained starting skeleton.
- `examples/` — one finished file per mode; copy their structure.

## Anti-patterns

- Pulling in D3/Chart.js/Tailwind from a CDN. (Breaks offline; violates rule 1.)
- Linking Google Fonts or bundling SF Pro. (Rule 2.)
- A wall of nodes no one can read. Aim for ≤ 7 primary steps / ≤ 5 series; summarize the rest.
- Autoplaying loud motion. Default animations to a single run or a play button; honor reduced-motion.
