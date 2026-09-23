# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-09-23

### Changed

- **Breaking (npm scope):** republished under `@sealwax` for npm org access.
  - `@zcode-ui/tokens` → `@sealwax/zcode-ui-tokens`
  - `@zcode-ui/theme` → `@sealwax/zcode-ui-theme`
  - `@zcode-ui/core` → `@sealwax/zcode-ui-core`
  - `@zcode-ui/ai-elements` → `@sealwax/zcode-ui-ai-elements`
  - `@zcode-ui/demo` → `@sealwax/zcode-ui-demo` (private workspace package)
- All package versions bumped to **1.0.1**.
- Updated imports, Vite aliases, tsconfig paths, docs, scripts, CI filters, and pnpm overrides for the new names.

### Notes

- Install from npm with the new scoped names (e.g. `pnpm add @sealwax/zcode-ui-core`).
- No API surface changes beyond the package rename.

## [1.0.0] - 2026-09-23

### Added

- New publishable package **`@sealwax/zcode-ui-ai-elements`** (tsup ESM + types): agent, artifact, attachments, checkpoint, code-block (standalone shiki), commit, confirmation, conversation, image, markdown-blockquote, markdown-list, persona, plan, prompt-input (+ actions/buttons/primitives/textarea), queue, sandbox, shimmer, snippet, sources, suggestion, task, terminal, test-results, tool.
- Vitest + Testing Library suite: `cn`, theme `resolveTheme` / `applyTheme` (jsdom), Button + Dialog smoke tests.
- Root script `pnpm test`; CI job runs typecheck → test → build packages → build demo.
- Docs: polished README, `ADOPTION.md`, `docs/API.md`, `CONTRIBUTING.md`, `RELEASE_NOTES_1.0.0.md`.
- Per-package `LICENSE`, `publishConfig.access=public`, explicit `private: false` on publishable packages.
- Tokens `sideEffects: ["./src/styles.css"]` for correct CSS bundling.

### Changed

- Package versions bumped to **1.0.0** (root + tokens + theme + core + ai-elements + demo).
- **Breaking:** `shimmer` / `suggestion` / `snippet` moved from `@sealwax/zcode-ui-core` to `@sealwax/zcode-ui-ai-elements`.
- Extract script / manifest updated for the 1.0 AI surface and documented skips.
- Demo gallery shows core + ai-elements highlights, theme switcher, and **1.0.0**.

### Notes

- `code-block` is a standalone shiki extract (vercel/ai-elements lineage); ZCode’s Mermaid/CodeViewer-coupled variant is not redistributed.
- Skipped heavy surfaces: message, reasoning, markdown-image/table, mermaid/diagram viewers, ReactFlow canvas family, chat-loading, context, Electron/telemetry, brand logos.

## [0.2.0] - 2026-09-23

### Added

- Real package builds with **tsup** for `@sealwax/zcode-ui-core` and `@sealwax/zcode-ui-theme` (`dist/` ESM + `.d.ts`).
- Dual packaging: published `dist` exports plus `./src/*` for Vite monorepo/source consumption.
- Root scripts: `pnpm build`, `pnpm typecheck`, `pnpm build:demo`.
- GitHub Actions CI (`.github/workflows/ci.yml`) — install, typecheck, build packages, build demo.
- New core components: `chart`, `flip-metric-value`.
- Lightweight ai-elements extracts (coupling removed): `shimmer`, `suggestion`, `snippet`.
- Demo gallery coverage for menus, popover, hover-card, collapsible, button/input groups, scroll area, resizable, alert-dialog, chart, flip metric, shimmer, suggestion, snippet.
- `CHANGELOG.md` and strengthened README / ADOPTION docs.

### Changed

- Package versions bumped to **0.2.0**.
- Optional peers: `recharts` (chart), `motion` (flip-metric / shimmer).
- Extract script/manifest updated for new files and documented skips.

### Notes

- `@sealwax/zcode-ui-tokens` remains CSS-only (no JS compile step).
- Brand logos and heavy viewers (pdf/pptx/code-diff) remain out of scope.

## [0.1.0] - 2026-09-23

### Added

- Initial extract: `@sealwax/zcode-ui-tokens`, `@sealwax/zcode-ui-theme`, `@sealwax/zcode-ui-core`.
- Vite demo gallery with theme switcher (`zai-light` / `zai-dark` / `system`).
- Apache-2.0 `LICENSE` + `NOTICE`, `ADOPTION.md`, extract script.

[1.0.1]: https://github.com/24373054/zcode-ui-kit/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/24373054/zcode-ui-kit/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/24373054/zcode-ui-kit/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/24373054/zcode-ui-kit/releases/tag/v0.1.0
