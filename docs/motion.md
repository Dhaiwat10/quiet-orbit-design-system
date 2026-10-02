# Motion recipes

The reference suggests softness and a little physical weight. The reusable implementation preserves that impression with explicit, modest parameters. Exact source physics are not claimed.

| Interaction | Values |
| --- | --- |
| Small hover / press change | 160–200ms |
| Popover enter | 200ms; opacity 0→1; y 5px→0 |
| Page/content enter | 300ms; opacity 0→1; y 5px→0 |
| Page exit, if the app has transitions | 160ms; opacity 1→0; y 0→4px |
| Active underline draw | 420ms, 120ms delay |
| Shared easing | `cubic-bezier(.3, 0, .2, 1)` |
| Arrow press | scale 0.94; restore on release |
| Ordinary button press | scale 0.97 |
| Optional return spring | stiffness 180, damping 22, mass 1 |

## Page transitions

Keep navigation stable while content changes. Use the host framework's routing and transition mechanism. If replacing content, update the title, current link, focus destination, scroll position, and back/forward behavior. Preserve modified clicks and open-in-new-tab behavior. A soft enter is enough when exit coordination adds complexity.

`enter(element)` is a standalone Web Animations helper. It returns a cancellation function. If reduced motion is enabled, it immediately leaves the content visible without translating or fading it. Call its cleanup on component unmount. The CSS class `.qo-enter` is the simple alternative; do not apply both simultaneously.

## Underlines

Use the SVG in `examples/index.html`. Set `pathLength="1"`, start with a dash offset of 1, and animate it to 0 for the active link. The animation reflects current-page state. Do not make the underline continuously wave.

## Shelves

Native horizontal scrolling owns the gesture. The helper advances by the actual card positions, uses smooth scroll by default, and uses immediate scroll for reduced motion. Clicks inside a card must still work. Keyboard arrows operate when the shelf itself has focus. A shelf with no cards hides controls.

Call `mountShelf(section)` on a section with `data-qo-shelf`, a `data-qo-track` element, `data-qo-prev` and `data-qo-next` buttons, and an optional `data-qo-position` label. Its cleanup removes listeners and observers.

## Popovers

`mountPopover(trigger, panel)` expects a focusable button with `aria-controls` and `aria-expanded`, and a textual panel with the matching ID and `hidden`. The immediate parent contains both. Click toggles a pinned state; hover previews without toggling that state. Outside click, focus leaving the wrapper, or Escape closes it. Escape returns focus to the trigger. The helper constrains the panel horizontally to the viewport.

Do not put essential instructions behind hover alone. The helper is a note, not a general interactive menu or modal-dialog implementation.

## Drag and spring

`mountDraggable(button, { returnOnRelease: true })` adds a bounded, transform-based drag. The parent establishes the available area. Pointer capture keeps the interaction intact when the pointer leaves the object. Arrow keys move it by 12px. Home and Escape restore its original position; losing focus also returns a spring-return object.

The spring integrates velocity with a bounded timestep, stops below rest thresholds, and runs only while returning. Reduced motion snaps to the destination. Document visibility changes finish a pending return instead of accumulating a large time jump. Do not use this helper on an element whose transform another animation owns.

Set `returnOnRelease: false` for a persistent arrangement, such as objects on a desk. Store its coordinates in the host app if positions should survive navigation. The helper itself does not persist user state.

## More elaborate scenes

A hero may react to the pointer, and a small diagram may animate. That is optional content, not an obligation. If adding continuous canvas or WebGL motion:

- Provide a still rendering for reduced motion and non-JavaScript use where needed.
- Pause when offscreen or when the tab is hidden.
- Cap device pixel ratio if high-resolution drawing is costly.
- Dispose of frames, observers, listeners, and graphics resources on unmount.
- Provide HTML descriptions and keyboard alternatives for meaningful controls.

Avoid scroll hijacking, long delays before readable content, constant ambient movement throughout the page, and parallax that moves the reading column.
