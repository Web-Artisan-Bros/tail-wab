# TailWab

Tool that creates Tailwind config using Fluid Typography logic.

Inspired by [Fluid Typography](https://css-tricks.com/snippets/css/fluid-typography/) and [Utopia](https://utopia.fyi/),
this tool brings the same logic to Tailwind CSS by generating Tailwind configurations based on Fluid Typography.

Project created and maintained by [Web Artisan Bros](https://en.webartisanbros.com).

## What it does

With fluid typography a size is not fixed per breakpoint: it grows linearly with the viewport width between a minimum
and a maximum, using CSS `clamp()`. For example, `text-base` can go from 16px on a 320px screen to 20.8px on a 1240px
screen, with no media queries.

TailWab applies this to Tailwind's default scales and gives you the code to paste into your project.

- **Fluid Fonts** (`/`): fluid font size and line height for every `text-*` class, from `text-xs` to `text-9xl`.
- **Fluid Spaces** (`/spaces`): fluid values for Tailwind's spacing scale (padding, margin, gap…).

How to use it:

1. Set the viewport range (**Min Width** and **Max Width**, in px) and the **Scale Factor** (for fonts, also the
   **Line Height Scale Factor**).
2. Choose **Mobile First**:
   - `true`: Tailwind's default values are the minimum (small screens) and are multiplied by the scale factor to get
     the maximum;
   - `false`: Tailwind's default values are the maximum (large screens) and are divided by the scale factor to get
     the minimum.
3. If needed, adjust the minimum and maximum of each row in the table by hand.
4. Copy the result from **Generated Code**:
   - **CSS**: custom properties in `:root` (`--wabtu-text-base`, `--wabtu-text-base-lh`, …);
   - **Tailwind**: a `tailwind.config.js` snippet that overrides `theme.fontSize` or `theme.spacing`.

   **Include Comments** adds the min → max range of each value as a comment.

## Development

### Requirements

- Node.js 20
- npm

### Setup

```bash
npm install
```

`npm install` also runs `nuxt prepare`, which generates the types in `.nuxt/`.

### Commands

| Command            | What it does                                        |
|--------------------|-----------------------------------------------------|
| `npm run dev`      | Starts the dev server on `http://localhost:3000`    |
| `npm run build`    | Builds the app for production (`.output/`)          |
| `npm run generate` | Generates the static site (`.output/public/`)       |
| `npm run preview`  | Serves the production build locally                 |

### Stack

- [Nuxt 3](https://nuxt.com/) + Vue 3 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) via `@nuxtjs/tailwindcss` (the Tailwind config viewer is enabled in dev)
- [FormKit](https://formkit.com/) for the forms (theme in `formkit.theme.ts`)
- `nuxt-svgo` for the SVG icons
- [`@wab-use/libs`](https://www.npmjs.com/package/@wab-use/libs) for the `clamp()` calculation (`fluidSize`)

### Project structure

```
pages/          index.vue (Fluid Fonts), spaces.vue (Fluid Spaces)
components/     settings forms, size tables and rows, generated code tabs, header and footer
composables/    useFontSizes, useSpaces: collect the table values and build the CSS and Tailwind output
libs/           pure functions: Tailwind scales, unit conversion (px/rem), decimal rounding
layouts/        default layout
assets/         logos and icons
public/         favicons
```
