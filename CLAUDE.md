# CLAUDE.md

## Language

Everything in the repo is in English: code, comments, identifiers, test names, commit messages, the README and this file. The documentation in the vault stays in Italian. Conversation with the owner is in Italian.

## Superpowers

**Superpowers comes before anything else** (owner's rule). At the start of every conversation, and before any answer or action (even a clarifying question), invoke the `superpowers:using-superpowers` skill and follow the Superpowers skills that apply to the task. The plugin is enabled for the project in `.claude/settings.json`, which is versioned so that a cloud session finds it too. How it is used in this project (phases, worktree, TDD) is in the section *Superpowers in this project*, further below.

## Documentation

Project documentation is written as `.md` files in:

`/Users/florianleica/Library/CloudStorage/GoogleDrive-florian.leica@gmail.com/Il mio Drive/MyVault/Projects/TailWab`

The entry point is `00 - Indice.md`. Do not create documentation in the repo (apart from this file and `README.md`).

## Superpowers in this project

- **Phases**: once the vault has a work plan (`04 - Piano di lavoro.md`), the work follows its phases, one at a time. For each phase `brainstorming` writes `Fasi/<Fase N - Titolo>/Analisi.md` and `writing-plans` writes `Fasi/<Fase N - Titolo>/Piano.md`, in the project folder in the vault, using the templates `Template/Template - Analisi.md` and `Template/Template - Piano d'azione.md`. The files in `docs/superpowers/` are not used. In the templates the `←` line points to `[[Projects/TailWab/00 - Indice|Indice]]`. Product choices go in the *Da decidere* section of the analysis, each with a recommendation and a `**Risposta:**` line, and are not asked one at a time. `writing-plans` starts only when all the answers are in. During development, tick off the steps of `Piano.md` and update `stato` in the two notes (`in corso`, then `da controllare`). The items of `04 - Piano di lavoro.md` are ticked off only after the owner's review. The vault notes are not in git and are not committed. If the vault cannot be read (for example in a cloud session), stop and say so.
- **Worktree**: `using-git-worktrees` creates the worktree in `.worktrees/`, which must be ignored by git, on a new branch starting from `dev` (if `dev` does not exist yet, create it from `main` first). `finishing-a-development-branch` brings the work back into `dev` with a local merge. No push and no pull request unless requested, and never merge into `main`. The worktree lacks unversioned files, such as `node_modules`: run `npm install` before build and tests.
- **TDD**: test-first applies to the calculation logic in `libs/` (fluid sizes, unit conversion, decimal rounding) and to what the composables generate (the Tailwind config and CSS variables). There are no tests yet: until the test tooling is in place, say what was verified and how (e.g. `npm run build`, checking the generated config in `npm run dev`). This is what `verification-before-completion` means here.
- **Before a commit**: `npm run build` green (plus lint and tests once they exist), and the vault documentation updated if the work changes what it describes.

## Development

- **Stack**: Nuxt 3 + Vue 3 + TypeScript, Tailwind CSS (`@nuxtjs/tailwindcss`), FormKit (`@formkit/nuxt`, theme in `formkit.theme.ts`), `nuxt-svgo` for SVG icons. The fluid-size math comes from `@wab-use/libs` (`fluidSize`).
- **Layout**: `pages/` (`index.vue` fluid fonts, `spaces.vue` fluid spaces), `components/` (settings forms, tables, generated-code tabs), `composables/` (`useFontSizes`, spaces state), `libs/` (pure calculation functions), `assets/` (logos and icons).
- **Commands**: `npm run dev`, `npm run build`, `npm run generate` (static site), `npm run preview`. `npm install` also runs `nuxt prepare`.
- **Node**: Node 20 is what is installed locally; there is no `.nvmrc` yet.
