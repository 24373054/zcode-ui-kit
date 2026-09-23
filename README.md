# zcode-ui-kit

[![CI](https://github.com/24373054/zcode-ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/24373054/zcode-ui-kit/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.1-brightgreen.svg)](./CHANGELOG.md)

**中文** | **English**

Standalone reusable UI kit extracted from [ZCode](https://github.com/zai-org/ZCode) `packages/ui` (Apache-2.0).  
Open it in any **React 19 + Tailwind CSS v4** project — tokens, theme runtime, shadcn-style core, and AI elements with **no `@zcode/*` app coupling**.

## Packages (1.0.1)

| Package | Contents |
| --- | --- |
| `@sealwax/zcode-ui-tokens` | Tailwind v4 `@theme` variables + `.dark` / `.theme-zai-light` / `.theme-zai-dark` |
| `@sealwax/zcode-ui-theme` | `useTheme` / `applyTheme` / `resolveTheme` (configurable storage key) — ships `dist` |
| `@sealwax/zcode-ui-core` | Standalone shadcn-style components + `cn` — ships `dist` (ESM + types) |
| `@sealwax/zcode-ui-ai-elements` | Standalone AI UI primitives (code-block, sources, tool, prompt-input, …) — ships `dist` |

## What it is NOT

- Not the ZCode desktop/web application shell
- Not agent runtime, login, git, Electron, telemetry, or brand logos
- Not a drop-in replacement for the full `@zcode/ui` package

## Quick start

```sh
pnpm install
pnpm build          # tokens + theme + core + ai-elements → dist/
pnpm test
pnpm typecheck
pnpm dev            # demo gallery → http://localhost:5179
pnpm build:demo
```

Host app CSS (Tailwind v4):

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "tailwind-scrollbar-hide/v4";
@import "shadcn/tailwind.css";
@import "@sealwax/zcode-ui-tokens/styles.css";

@source "../node_modules/@sealwax/zcode-ui-core/dist/**/*.{js,jsx}";
@source "../node_modules/@sealwax/zcode-ui-ai-elements/dist/**/*.{js,jsx}";
```

```tsx
import { enableBrowserThemeSurface, useTheme } from "@sealwax/zcode-ui-theme";
import { Button } from "@sealwax/zcode-ui-core/button";
import { Sources, SourcesTrigger, SourcesContent, Source } from "@sealwax/zcode-ui-ai-elements/sources";

enableBrowserThemeSurface();
const { theme, setTheme } = useTheme({ storageKey: "my-app-theme" });
```

**Adoption checklist:** [`ADOPTION.md`](./ADOPTION.md)  
**API surface:** [`docs/API.md`](./docs/API.md)  
**Changelog:** [`CHANGELOG.md`](./CHANGELOG.md)  
**Contributing:** [`CONTRIBUTING.md`](./CONTRIBUTING.md)  
**Release notes:** [`RELEASE_NOTES_1.0.0.md`](./RELEASE_NOTES_1.0.0.md)

### Consuming `dist` vs source

- **Published / CI:** packages export `dist/*.js` + `dist/*.d.ts` (built with tsup).
- **This monorepo demo:** Vite aliases point at `packages/*/src` for HMR.
- Advanced: `@sealwax/zcode-ui-*/src/*` remains reachable for source-first hosts.

## License

Apache-2.0. Copyright 2026 Z.AI Co., Ltd. See `LICENSE` and `NOTICE`.  
Theme class names (`theme-zai-light` / `theme-zai-dark`) are technical identifiers only — brand logo assets are **not** bundled.
