# Nikita Morgun portfolio

Static English/Russian portfolio built with Astro, TypeScript and Tailwind CSS, intended for GitHub Pages at `https://troubleshooter239.github.io/`.

## Requirements

- Node.js 26.13.0 (also declared in `.node-version` and `.nvmrc`).
- pnpm 12.16.1 (`packageManager` in `package.json`).

## Run locally

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4321/`. The Russian version is at `/ru/`.

## Check and build

```sh
pnpm format
pnpm format:check
pnpm build
pnpm preview
```

`build` runs Astro/TypeScript diagnostics and creates `dist/`. The Pages workflow also checks formatting. The site uses local assets, system fonts and browser-local theme storage; it needs no backend or analytics service.
