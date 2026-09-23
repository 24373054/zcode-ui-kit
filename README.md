# zcode-ui-kit

[![CI](https://github.com/24373054/zcode-ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/24373054/zcode-ui-kit/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)

**中文** | **English**

Standalone reusable UI kit extracted from [ZCode](https://github.com/zai-org/ZCode) `packages/ui` (Apache-2.0).  
Open it in any **React 19 + Tailwind CSS v4** project — tokens, theme runtime, and shadcn-style components with **no `@zcode/*` app coupling**.

## Packages

| Package | Contents |
| --- | --- |
| `@zcode-ui/tokens` | Tailwind v4 `@theme` variables + `.dark` / `.theme-zai-light` / `.theme-zai-dark` |
| `@zcode-ui/theme` | `useTheme` / `applyTheme` / `resolveTheme` (configurable storage key) — ships `dist` |
| `@zcode-ui/core` | Standalone components + `cn` — ships `dist` (ESM + types); source also available |

## What it is NOT

- Not the ZCode desktop/web application shell
- Not agent runtime, login, git, terminal, store, or brand logos
- Not a drop-in replacement for the full `@zcode/ui` package

## Quick start

```sh
pnpm install
pnpm build          # build @zcode-ui/theme + @zcode-ui/core → dist/
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
@import "@zcode-ui/tokens/styles.css";

/* Prefer dist after publish; monorepo demo may scan ./src instead */
@source "../node_modules/@zcode-ui/core/dist/**/*.{js,jsx}";
@source "../node_modules/@zcode-ui/core/src/**/*.{ts,tsx}";
```

```tsx
import { enableBrowserThemeSurface, useTheme } from "@zcode-ui/theme";
import { Button } from "@zcode-ui/core/button";

enableBrowserThemeSurface();
const { theme, setTheme } = useTheme({ storageKey: "my-app-theme" });
```

**Adoption checklist:** see [`ADOPTION.md`](./ADOPTION.md).  
**Changelog:** see [`CHANGELOG.md`](./CHANGELOG.md).

### Consuming `dist` vs source

- **Published / CI:** packages export `dist/*.js` + `dist/*.d.ts` (built with tsup).
- **This monorepo demo:** Vite path-aliases still point at `packages/*/src` for HMR.
- Advanced: `@zcode-ui/core/src/*` and `@zcode-ui/theme/src/*` remain reachable for source-first hosts.

## License

Apache-2.0. Copyright 2026 Z.AI Co., Ltd. See `LICENSE` and `NOTICE`.  
Theme class names (`theme-zai-light` / `theme-zai-dark`) are technical identifiers only — brand logo assets are **not** bundled.
