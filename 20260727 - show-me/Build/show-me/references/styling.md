# Styling — Apple-style tokens (shared by both modes)

Goal: the calm, legible feel of Apple HIG, using only web-safe system fonts. Copy these tokens into the inlined `<style>`. They already live in `assets/template.html` under `:root` / `@media (prefers-color-scheme: dark)`.

## Type

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, Roboto, Helvetica, Arial, sans-serif;
```

- `-apple-system` resolves to San Francisco on macOS/iOS — no font file needed, nothing to license.
- Scale (rem): title 1.5, heading 1.125, body 0.9375, caption 0.8125. Line-height 1.35–1.5.
- Weights: 600 for titles/labels, 400 for body. Avoid <400 on small text.
- Numbers in charts/animations: add `font-variant-numeric: tabular-nums;` so digits don't jitter.

## Color (semantic, theme-aware)

Light / Dark pairs, close to Apple system colors:

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f5f5f7` | `#000000` | page |
| `--surface` | `#ffffff` | `#1c1c1e` | cards, nodes |
| `--surface-2` | `#f2f2f7` | `#2c2c2e` | insets |
| `--text` | `#1d1d1f` | `#f5f5f7` | primary text |
| `--text-dim` | `#6e6e73` | `#98989d` | captions |
| `--separator` | `rgba(0,0,0,.10)` | `rgba(255,255,255,.15)` | hairlines |
| `--accent` | `#0071e3` | `#0a84ff` | primary/critical path |
| `--green` | `#34c759` | `#30d158` | justification / go |
| `--orange` | `#ff9500` | `#ff9f0a` | prerequisite / caution |
| `--red` | `#ff3b30` | `#ff453a` | risk / stop |

Rationale-branch color map (Mode A): justification → `--green`, prerequisite → `--orange`, risk → `--red`.

## Spacing, radius, shadow

- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48. Use multiples; default gap 16.
- Radius: 8 (chips), 12 (cards/nodes), 20 (panels). Apple leans generous and consistent.
- Shadow (light only; drop or soften in dark): `0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08)`.
- Hairlines: 1px `--separator`, never pure black/white borders.

## Motion

- Duration: 200 ms (micro / hover), 300–400 ms (transitions), animation loops as the concept dictates.
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (standard), `cubic-bezier(0.32, 0.72, 0, 1)` (Apple-ish spring-out) for reveals.
- **Always** wrap non-essential motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

For canvas loops, also check `matchMedia('(prefers-reduced-motion: reduce)').matches` in JS and render a static final frame instead of looping.

## Layout

- Max content width ~960px, centered, 24px page padding.
- Title + one-line subtitle at top. Controls (play/pause/scrub/legend) in a single row.
- Prefer fitting one screen; if content is tall, make the diagram the scroll region, not the whole page.
