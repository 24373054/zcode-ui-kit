# zcode-ui-kit

**中文** | **English**

Standalone reusable UI kit extracted from [ZCode](https://github.com/zai-org/ZCode) `packages/ui` (Apache-2.0).

## 它是什么 / What it is

| Package | 内容 |
| --- | --- |
| `@zcode-ui/tokens` | Tailwind v4 `@theme` 变量 + `.dark` / `.theme-zai-light` / `.theme-zai-dark` |
| `@zcode-ui/theme` | `useTheme` / `applyTheme` / `resolveTheme`（可配置 storage key） |
| `@zcode-ui/core` | 独立 shadcn 风格组件 + `cn` 工具（无 `@zcode/*` 依赖） |

## 它不是什么 / What it is NOT

- Not the ZCode desktop/web application shell
- Not agent runtime, login, git, terminal, store, or brand logos
- Not a drop-in replacement for the full `@zcode/ui` package

## Install (workspace)

```sh
pnpm install
pnpm dev          # demo gallery at http://localhost:5179
```

## Peer / host setup (Tailwind v4)

In your app CSS:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "tailwind-scrollbar-hide/v4";
@import "shadcn/tailwind.css";
@import "@zcode-ui/tokens/styles.css";

@source "../node_modules/@zcode-ui/core/src/**/*.{ts,tsx}";
/* or path to this monorepo's packages/core/src */
```

```tsx
import { enableBrowserThemeSurface, useTheme } from "@zcode-ui/theme";
import { Button } from "@zcode-ui/core/button";

enableBrowserThemeSurface();
const { theme, setTheme } = useTheme({ storageKey: "my-app-theme" });
```

Packages ship **TypeScript source** intended for Vite / esbuild hosts (see `ADOPTION.md`).

## License

Apache-2.0. Copyright 2026 Z.AI Co., Ltd. See `LICENSE` and `NOTICE`.
