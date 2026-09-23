# Contributing

## Setup

```sh
pnpm install
pnpm build
pnpm test
pnpm typecheck
```

Requires Node `>=20.19` and pnpm `10.32.1` (see `packageManager`).

## Workspace layout

- `packages/tokens` — CSS design tokens
- `packages/theme` — theme runtime
- `packages/core` — shadcn-style primitives
- `packages/ai-elements` — AI UI elements
- `apps/demo` — Vite gallery (private)
- `scripts/extract.mjs` — re-copy from a local ZCode checkout (`ZCODE_ROOT`, default `/workspace/ZCode`)

**Do not modify upstream ZCode** from this repo’s scripts.

## Adding a core component

1. Add the name to `scripts/extract.mjs` `CORE_WHITELIST` and `scripts/extract-manifest.json`.
2. Run `pnpm extract` (must have zero `@zcode/*` imports).
3. Ensure `packages/core/src/index.ts` / package `exports` include it (regenerate or edit).
4. Add a demo card if useful; add a smoke test for critical primitives.

## Adding an ai-element

1. Confirm zero (or removable) `@zcode/*` / heavy `@/` app coupling.
2. Add to `AI_ELEMENTS` in `extract.mjs` + manifest `included` / `skipped`.
3. Prefer rewriting `../ui/*` → `@sealwax/zcode-ui-core/*`.
4. Declare optional peers for heavy deps (`ai`, `shiki`, `motion`, rive, …).
5. Skip Electron, telemetry, brand logos, ReactFlow, mermaid app stacks.

## Checks before PR

```sh
pnpm install && pnpm test && pnpm typecheck && pnpm build && pnpm build:demo
```

All must exit 0. Leave publish / git tags to maintainers.
