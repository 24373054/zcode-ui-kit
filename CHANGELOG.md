# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-09-23

### Added

- Real package builds with **tsup** for `@zcode-ui/core` and `@zcode-ui/theme` (`dist/` ESM + `.d.ts`).
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

- `@zcode-ui/tokens` remains CSS-only (no JS compile step).
- Brand logos and heavy viewers (pdf/pptx/code-diff) remain out of scope.

## [0.1.0] - 2026-09-23

### Added

- Initial extract: `@zcode-ui/tokens`, `@zcode-ui/theme`, `@zcode-ui/core`.
- Vite demo gallery with theme switcher (`zai-light` / `zai-dark` / `system`).
- Apache-2.0 `LICENSE` + `NOTICE`, `ADOPTION.md`, extract script.

[0.2.0]: https://github.com/24373054/zcode-ui-kit/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/24373054/zcode-ui-kit/releases/tag/v0.1.0
