# Quiet Orbit

A reusable design system for quiet, personal-feeling interfaces: warm neutrals, Instrument Sans, violet details, generous space, and restrained motion.

This is an independent project. It distills the aesthetic from the [yuvich.com](https://www.yuvich.com/) reference and the personal-site skeleton into reusable decisions, code, and agent guidance. It does not depend on that site's source tree or include its biography, projects, or distinctive creative scenes.

## Start here

- **Design decisions:** [docs/design-system.md](docs/design-system.md)
- **Motion and interactions:** [docs/motion.md](docs/motion.md)
- **Use it in another kind of project:** [docs/adapting.md](docs/adapting.md)
- **Machine-readable values:** [tokens/tokens.json](tokens/tokens.json)
- **Optional CSS library:** [css/quiet-orbit.css](css/quiet-orbit.css)
- **Optional JavaScript helpers:** [js/motion.js](js/motion.js)
- **Portable agent skill:** [skills/quiet-orbit/SKILL.md](skills/quiet-orbit/SKILL.md)

## See it

Requires Node.js 20 or newer; there are no dependencies to install.

```sh
npm run dev
```

Open **http://localhost:4174** for the visual specimen and **http://localhost:4174/examples/workspace.html** for a wider application layout. The server is local only. Use `PORT=4175 npm run dev` if needed. Refresh after edits; no automatic reload is installed.

## Use it in a project

Choose only what the project needs.

**Guidance only:** give your agent the docs and the prompt below. It can translate the tokens to your current stack without adding a library.

**Copy the library:** copy `css/`, `js/`, and `fonts/` into one shared directory in your project, preserving their relationship. Link `css/quiet-orbit.css`, put `.qo` on your chosen root, and use `qo-` classes as needed. Your app's router and content remain yours.

```html
<link rel="stylesheet" href="/design/quiet-orbit/css/quiet-orbit.css">
<body class="qo">
  <main class="qo-column qo-prose">
    <p>A small, considered place for your own work.</p>
  </main>
</body>
```

**Private Git dependency:** in an authenticated environment, install from this repository rather than a public registry. Pin a commit for repeatable builds.

```sh
npm install git+ssh://git@github.com/Dhaiwat10/quiet-orbit-design-system.git#COMMIT_SHA
```

```js
import '@dhaiwat10/quiet-orbit/css';
import { mountShelf } from '@dhaiwat10/quiet-orbit/motion';
```

`COMMIT_SHA` is a placeholder for the commit you want. Authentication is handled by your normal Git setup. No credentials belong in this repository. `private: true` prevents accidental npm publication.

## Give this to an agent

> Use Quiet Orbit from `Dhaiwat10/quiet-orbit-design-system`. Read its design-system and motion docs, then adapt the aesthetic to this project's purpose and existing stack. Preserve the warm neutrals, Instrument Sans, restrained violet accents, generous spacing, and subtle motion. Use a layout width appropriate to the product. Keep the content and creative elements specific to this project.

The repository must be available to the agent through a local clone or its authenticated GitHub access.

For agents that support skills, `skills/quiet-orbit/` is self-contained: copy that directory into the agent's supported skill location and invoke `$quiet-orbit`. For Codex, a personal skill can live at `~/.codex/skills/quiet-orbit/`. Do not overwrite an existing skill without reviewing it first. This project does not automatically install a global skill or change other projects.

## Maintain it

Edit the JSON tokens, source CSS/JS, or docs, then run:

```sh
npm run build
npm run check
```

Build generates `css/tokens.css` and `js/motion-tokens.js` and refreshes the self-contained skill resources. Check verifies token parity, package assets, skill resource parity, JavaScript syntax, and small-text contrast on both base surfaces. Open the examples after visual or interaction changes.

The 384px column is an editorial baseline. The workspace example shows how the same aesthetic can scale to a real application. The original muted gray is recorded; default small text is slightly darker for readability. The black hole, desk collage, and project demos are optional creative content, not required design-system components.

## Attribution

Visual inspiration: [Yuvraj's website](https://www.yuvich.com/), inspected October 2026. The CSS, interaction helpers, documentation, and examples here are new reusable implementations derived from that visual study. Instrument Sans and Fragment Mono are included under the SIL Open Font License; see [fonts/](fonts/). This private repository does not grant a separate license to redistribute the user's project code.
