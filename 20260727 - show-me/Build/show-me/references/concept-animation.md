# Mode B — Concept Animation / Chart

For things you **watch move** or **measure**: physics/math principles, mechanisms, algorithms, and simple data.

## Two sub-forms

### 1. Animation (a principle in motion)
`<canvas>` or SVG driven by `requestAnimationFrame`. Examples: pendulum/spring, wave interference, sorting/search, orbital motion, supply-demand converging, a feedback loop settling.

Required controls, in one row:
- **Play / Pause** (single button, toggles label).
- **Reset** (back to initial state).
- At least one **parameter** slider that visibly changes behavior (e.g. gravity, frequency, learning rate, speed). Show the live value with `tabular-nums`.

Loop discipline:
- Use a fixed timestep or clamp `dt` so it behaves the same on 60/120 Hz displays.
- `cancelAnimationFrame` on pause; never stack loops.
- **Reduced motion:** if `matchMedia('(prefers-reduced-motion: reduce)').matches`, don't autoplay — render the informative final/steady state and let the user press Play.
- Handle high-DPI: scale the canvas by `devicePixelRatio` so it's sharp.

### 2. Chart (numbers, simply)
Hand-rolled **SVG** bar / line / area / funnel. No chart library. Good for showing a trend, a comparison, or a drop-off that supports the point.

- Axes with a few labeled ticks; gridlines as hairlines (`--separator`).
- ≤ 5 series; label directly at the line end rather than a busy legend when possible.
- Animate on load once (bars grow / line draws via `stroke-dasharray`), then rest. Respect reduced-motion.
- Tooltips optional; if added, keyboard-focusable points.

## Loose data shape

```json
{
  "mode": "concept",
  "title": "Simple pendulum",
  "subtitle": "θ'' = −(g/L)·sinθ",
  "params": [
    { "key": "g", "label": "Gravity (m/s²)", "min": 1, "max": 20, "value": 9.8, "step": 0.1 },
    { "key": "L", "label": "Length (m)",      "min": 0.2, "max": 3, "value": 1, "step": 0.05 }
  ]
}
```

For a chart, replace `params` with `series: [{ name, points: [[x,y],…] }]` and axis metadata.

## Build notes

- Keep the physics/math honest but minimal — enough to be correct and legible, not a simulator.
- Draw order: background/grid → guides → moving body → labels.
- One idea per visual. If you're tempted to add a second concept, make a second file.
- Keep total script ≲ 200 lines. Vanilla JS only.

## Accessibility

- Controls are real `<button>` / `<input type="range">` with `<label>`s.
- Provide a one-sentence text description of what the animation shows (also helps when motion is reduced).
- Don't encode meaning in color alone.

See `examples/concept-animation.example.html` for a complete, working reference.
