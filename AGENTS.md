# Working on Quiet Orbit

This repository is an independent aesthetic library. `README.md` is the entry point. The source website is a reference, not a runtime dependency.

- Read `docs/design-system.md` before changing the visual language; read `docs/motion.md` for interactions.
- Treat `tokens/tokens.json` as the token source of truth. Generate `css/tokens.css` and `js/motion-tokens.js` with `npm run build`.
- Keep the CSS scoped to `.qo` and namespaced with `qo-`. Do not introduce document-wide resets or an obligatory framework.
- Preserve semantic content, keyboard behavior, reduced-motion support, and cleanup functions on reusable JavaScript helpers.
- The portfolio's black hole, desk objects, biography, and project content are not required parts of this aesthetic.
- `skills/quiet-orbit/references/` and `skills/quiet-orbit/assets/` are generated portable resources. Edit the source docs, CSS, JS, or fonts, then run `npm run build`.
- Run `npm run build` and `npm run check` after changes. For visible behavior changes, open the specimen and workspace examples and check desktop and mobile layouts.
- This is a private personal library. Do not publish it to a public package registry or change repository visibility unless the user asks.

When using this library in another project, follow that project's instructions and preserve its architecture. This file governs this repository only.
