# Design system: rules for agents

This repository is the design system module of Lazurio Example Organization.
These rules add to the Organization root `AGENTS.md`.

Before any visual or formatted work, use the Organization skill
`design-system-lookup`. At minimum read `README.md`, `ARCHITECTURE.md`,
`INITIALIZATION.md` and `BASELINE.md`.

## Source of truth

In order of authority:

1. Production sources of the Organization (website, production UI, brand
   brief).
2. Explicit brand and voice documents (the knowledgebase module and
   `company/agents/voice/` in the Organization root).
3. This design system as the unified, reviewable layer.

When the design system disagrees with production, production is right and the
design system is updated.

## What belongs here

- the brand baseline and design tokens;
- typography, colour, spacing and layout rules;
- reference examples for web, slides, documents, tables and merchandise;
- templates and starters for repeated formats.

## What does not belong here

- secrets, API keys or OAuth session data;
- moodboards without a link to the production brand;
- a production authoring UI;
- large exports without metadata or a clear source of truth;
- copies of another company's brand assets.

## Lazurio Module Standard

- One repository is one module; the viewer App lives in `app/v1/`.
- `dev` starts one Astro server; `prepare:app` (`astro sync`) is the
  preparation and `check:prepared` checks it.
- The App reads its host and port only from
  `LAZURIO_RUNTIME_LISTENER_APP_HOST` and `_PORT` through `@lazurio/module-kit`
  and exits with code 2 without them. The port lives only in
  `lazurio.module.json`.
- No `.env*` files, secrets or imports from outside this repository.
- One change, one worktree, one branch, one pull request; the primary checkout
  stays on `main`.

## Verification before a pull request

```sh
cd app/v1
bun install --frozen-lockfile
bun run check
bun test
lazurio module setup <path to the module> --root <Lazurio Folder> --json
```

The expected `module setup` status is `current`.
