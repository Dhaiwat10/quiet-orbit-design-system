# Apply the aesthetic to a different project

Start from the user's actual product and existing stack. Reuse the visual decisions without importing an unrelated site's content model or routing.

## Editorial / personal site

Use the 384px column, optional 544px scene, 15px body copy, plain top navigation, horizontal previews, and generous footer gap. This is the closest match to the original reference.

## Portfolio / studio

Keep the compact biography and quiet navigation. Let work previews become the focus. Titles may be 20–28px where the content needs them. Project pages may have wider images while text retains a readable measure. Use the user's own imagery and project links.

## Product / dashboard

Use a wider workspace with a real task hierarchy. Apply the warm background, Instrument Sans, restrained neutral surfaces, small violet focus states, sparse dividers, and 160–300ms transitions. Use tables, lists, or forms wherever they make the task easier. Keep dense metadata in the mono font sparingly. Prefer a static header over a playful hero in task-heavy views.

See `examples/workspace.html` for a wider task board and table using the same component vocabulary.

## React, Vue, Svelte, or other component frameworks

Import the CSS once and set `.qo` on an intentional application or page root. Use framework-native state and lifecycle for semantics and routing. The JS helpers return cleanup functions and can be mounted in effects/hooks if useful. They accept DOM elements and do not require a global document scan.

```js
// Framework pseudocode: run after the element mounts, clean up on unmount.
const dispose = mountShelf(shelfElement);
// Later:
dispose();
```

Do not replace a working router, form system, component library, or accessibility primitive just to use this aesthetic. Map the tokens and motion parameters to the existing components. The provided CSS is a reference implementation and optional dependency.

## Utility CSS or custom styles

Read `tokens/tokens.json`; map values to the project's theme conventions. Keep token roles distinct even if multiple values happen to match. Use arbitrary values only where the host setup needs them. Preserve the fonts and weight 480 when visual fidelity matters.

The CSS is scoped and layered; later unlayered application styles can override it. Keep the `fonts/` sibling of `css/` when copying the library so relative font URLs remain valid.

## Other media

The palette, type, spacing, and restraint can inform documents or slides, but the UI geometry is not a print specification. Derive format-appropriate point sizes and grid dimensions rather than copying CSS pixels into a page.

## A prompt for an agent

> Use the Quiet Orbit design system from this repository. Read `docs/design-system.md` and `docs/motion.md`, then adapt it to this project's purpose and existing stack. Preserve the warm neutrals, Instrument Sans, restrained violet accents, readable typography, generous spacing, and subtle motion. Use the layout width appropriate to the product. Keep the content and creative elements specific to this project.

If the portable skill is installed, start with `$quiet-orbit` and include the target project and task. Reading a design system does not authorize publishing, account changes, or modifications to unrelated repositories.
