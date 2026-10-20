# Changelog: design system

Date versions: `YYYYMMDD`.

## 20261020

### Changed

- Opened from `main`, the viewer App runs as its static build instead of the
  Astro development server: `app/v1/package.json` declares `build_output:
  "dist"` and `static_fallback: "404"`, and the Launchpad builds the commit
  (`astro build`), serves `dist/` with its own small static server and builds
  again after a pull (Module Standard 4.5, LazurioPlatform F58). `dev` stays
  the preview from a worktree. A build contract test checks that the build
  succeeds without the listener and that the health path `/` is a file of
  the output.

## 20261016

### Changed

- Split from the Organization root's in-tree `design-system/` into its own
  repository, with the history of that directory.
- Adopted the Lazurio Module Standard: the viewer moved from `app/` to
  `app/v1/`, is TypeScript only and reads its listener through
  `@lazurio/module-kit`; preparation (`astro sync`) and a single-process `dev`
  are declared; Bun is pinned to 1.4.2 with a fresh `bun.lock`; `bun run
  check` and `bun test` run in CI.
- The port lease moved into the Organization pool (`main` 5687 → 25301).
- The colour tokens now have the shape the viewer reads (`name`, `status`,
  `source`, `colors`) and are validated by a test; the viewer shows the draft
  palette it already used.
- README, AGENTS, ARCHITECTURE and the viewer page are in English.
- BASELINE, INITIALIZATION and the brand content (palette, typography,
  examples) are in English; the palette is described as the draft working
  palette in `tokens.json`.

### Removed

- The listener script that read the module's own lease file and the legacy
  `LAZURIO_RUNTIME_HOST/PORT` pair.
