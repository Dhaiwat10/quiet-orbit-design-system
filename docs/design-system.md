# Quiet Orbit: the visual system

Quiet Orbit makes an interface feel personal, deliberate, and easy to inhabit. It pairs editorial restraint with a few small objects that reward attention. Its signature is the relationship between modest typography, large areas of warm empty space, and subtle responsive motion.

This is a reusable aesthetic, not a mandatory page template. The original reference is [yuvich.com](https://www.yuvich.com/), inspected in October 2026. The measured values below were also used in a separately created personal-site skeleton. The library, broader application components, and motion helpers are independent implementations.

## The decisions to preserve

1. Use warm near-white and gray surfaces, near-black emphasis, muted body text, and violet as a small accent.
2. Keep type modest. Most of the interface should feel like reading a short personal note, not a marketing campaign.
3. Let whitespace create hierarchy before adding borders, backgrounds, or boxes.
4. Reserve rounded surfaces for things: previews, tools, controls, or small interactive scenes. Do not wrap every paragraph in a card.
5. Make motion responsive to an action or meaningful state change. A page transition should be felt gently; a draggable object may have a little physical weight.
6. Use the user's own content and creative objects. A black hole or desk collage is optional, not part of the design system's identity.

## Color

| Role | Value | Use |
| --- | --- | --- |
| Background | `#fafaf9` | Overall warm canvas |
| Ink | `#121214` | Active navigation, titles, emphasized phrases |
| Text | `#636268` | Most body copy |
| Muted | `#6c6b72` | Readable small labels and secondary text |
| Reference muted | `#7d7c83` | Recorded source value; decorative/reference use only |
| Rule | `#e6e5e2` | Quiet separators, never the only indicator of an input boundary |
| Card | `#f1f1ef` | Preview scenes and secondary controls |
| Accent | `#6b46c1` | Active underline, focus, a personal detail |
| Paper | `#fffefd` | Floating notes or an object within a card |

The original muted color is about 3.96:1 on the background. The reusable default is slightly darker: about 5.05:1 on the background and 4.66:1 on card surfaces. Preserve the subdued impression while keeping small functional text legible. Color roles and contrast are different constraints; do not copy the lighter source gray into essential form hints.

Success and danger colors are optional semantic extensions. Pair them with text or an icon. Accent violet is not a general-purpose status color. Dark mode has not been designed or verified; do not invert the palette mechanically.

## Typography

| Role | Specification |
| --- | --- |
| Body | Instrument Sans, 15px, weight 480, line-height 1.55 |
| Small text | Instrument Sans, 13px, weight 480 |
| Metadata | Fragment Mono, 11px; optional 12px for readable values |
| Modest page title | Instrument Sans, 28px, weight 480, line-height 1.25 |
| Functional heading | Body scale or 18–20px, weight 480–560 |
| Mobile text input | At least 16px to avoid browser focus zoom |

Self-host the fonts. The library includes them with the SIL Open Font Licenses. A variable font is needed to preserve weight 480. Use emphasis primarily through color; occasional weight 560 may distinguish a functional heading. Keep paragraphs about 3–5 short lines in an editorial layout, with 16px between paragraphs.

Avoid all-caps labels everywhere, aggressively negative tracking, giant bold headlines, or monospace body copy. The monospace font is a quiet counterpoint for dates, counts, keyboard hints, and measurements.

## Layout and spacing

| Element | Editorial baseline |
| --- | --- |
| Reading column | 384px / 24rem |
| Creative scene / wide insert | 544px / 34rem |
| Shelf card width | 352px / 22rem, capped at viewport minus 48px |
| Preview aspect ratio | 352:384 |
| Mobile page gutter | 16px |
| Navigation top padding | 36px |
| Navigation gap | 22px |
| Space after navigation | 56px |
| Paragraph gap | 16px |
| Scene-to-prose gap | 36px |
| Major section gap | 64px |
| Footer separation | 128px desktop, 100px mobile |

Center the reading column. A horizontal shelf begins at that column's left edge and can extend toward the viewport edge. Keep it in its own scroll container. Use 16px between cards and real scroll snapping. Show a partial next card when space allows. Keep vertical page scrolling usable on touch screens.

For a product or dashboard, use the wider `qo-workspace` container (up to 72rem), introduce a task-appropriate grid, and retain the type, color, surface, spacing, and motion rules. Keep long prose within a readable measure. A data table should never be forced into 384px just to resemble the original homepage.

## Surfaces and depth

- Preview cards: 24px radius, flat warm-gray background, no default shadow.
- Controls: 10px radius, small warm-gray fill or thin neutral border.
- Small app windows: 12px radius, shadow applied to the object inside its scene.
- Popovers: 14px radius, warm paper surface, subtle border and diffuse shadow.
- Draggable objects: a soft shadow may lift slightly while grabbed. Avoid applying this treatment to every card.

Depth should explain physical interaction or layering. Avoid glass effects, neon glows, colorful gradients across the layout, heavy outlines, or a shadow on every region. The illustrative scene itself may have richer lighting if that is the user's creative material.

## Components

### Navigation

Use plain text links. Mark the current route with `aria-current="page"`. The violet squiggle draws under it in 420ms after a 120ms delay. The supplied SVG uses `pathLength="1"` so the same dash animation works at any label width. Keep a real link destination even if a framework enhances navigation.

### Links, buttons, and fields

Body links have a faint 1px underline with a 3px offset. A text or quiet gray button suits most actions; near-black primary buttons are available for a clear main task. Avoid making all controls violet. Preserve visible labels and focus rings.

Use at least a 44px interactive target. A shelf arrow can retain the reference's 32px visual surface inside a 44px button. Field borders are intentionally stronger than decorative separators. Error messages identify the problem in text and use `aria-describedby`.

### Cards and shelves

Put an image, tool, or experiment on a rounded neutral surface. Below it, place a plain title and a small description or medium label. Essential information belongs in HTML, not only in canvas. Shelves support touch scroll, buttons, and keyboard arrows. Set disabled states at both ends, and expose an unobtrusive current-position label.

### Notes and popovers

Use a short personal detail or contextual explanation. Support click, keyboard activation, outside click, and Escape; optional hover must not make the first click close the note accidentally. The included helper pins on click. Keep content brief and textual. Use an appropriate dialog or menu component for interactive content requiring different semantics.

### Lists and tables

Prefer aligned text and occasional horizontal rules. Status badges stay compact and restrained. A useful empty state can be a short sentence and one action; it does not require an illustration or large card.

## Motion

Use the precise recipes in [motion.md](motion.md). The baseline is 160–200ms for small interactions, 300ms for entering content, and only 4–5px of displacement. Reusable helpers are in `js/motion.js`. No page router is imposed by the library.

## Review the result

At desktop and narrow mobile widths, check whether the actual content still feels spacious and deliberate. Check one interactive element by pointer and keyboard, turn on reduced motion, inspect navigation focus and scroll behavior, and look for accidental viewport overflow. Additions should support the product's real task, not merely increase the number of decorative features.
