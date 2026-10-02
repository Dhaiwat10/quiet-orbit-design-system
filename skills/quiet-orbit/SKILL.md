---
name: quiet-orbit
description: Apply the Quiet Orbit aesthetic to a website or app when the user asks for this design system or its warm, restrained editorial style. Provides exact tokens, motion recipes, reusable CSS, and framework-neutral interactions.
---

# Quiet Orbit

Use this to reproduce the visual language, not the source portfolio's content or page structure.

1. Read [the design system](references/design-system.md). Keep the warm neutrals, Instrument Sans at modest sizes, restrained violet accents, generous spacing, and quiet surfaces.
2. Read [adaptation guidance](references/adapting.md) to choose an editorial column or a wider product layout. Preserve the target project's framework, routing, data, and task hierarchy.
3. For interactions, read [motion recipes](references/motion.md). The core behavior is short fades and small translations, a drawn active underline, and optional objects with a gentle return spring. Respect reduced motion and lifecycle cleanup.
4. Use the bundled [JSON tokens](assets/quiet-orbit/tokens/tokens.json). The optional [CSS](assets/quiet-orbit/css/quiet-orbit.css) and [JavaScript helpers](assets/quiet-orbit/js/motion.js) can be copied or adapted. Keep `css/`, `js/`, and `fonts/` together so font paths resolve. No package installation is required.
5. Check the actual page at desktop and mobile sizes. Exercise meaningful controls by keyboard and pointer. Preserve functional labels, focus states, readable contrast, and normal scrolling.

The 384px reading column is a baseline for prose, not a required width for a dashboard. The default muted token is slightly darker than the historical reference for readable small text. The original site's personal copy, black hole, desk objects, and specific projects are not part of this skill; use content appropriate to the user's project.

Use the library only within the requested scope. Do not apply it to unrelated projects or infer permission to publish from a request to style an interface.
