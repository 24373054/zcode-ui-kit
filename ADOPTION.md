# Adopting zcode-ui-kit

Checklist for using the kit in a random React + Tailwind v4 project.

## 1. Add packages

**Monorepo / path:**

```sh
# copy packages/{tokens,theme,core} into your repo, or:
pnpm add @zcode-ui/tokens@workspace:* @zcode-ui/theme@workspace:* @zcode-ui/core@workspace:*
```

**File path (outside this repo):**

```json
{
  "dependencies": {
    "@zcode-ui/tokens": "file:../zcode-ui-kit/packages/tokens",
    "@zcode-ui/theme": "file:../zcode-ui-kit/packages/theme",
    "@zcode-ui/core": "file:../zcode-ui-kit/packages/core"
  }
}
```

After install, run `pnpm --filter @zcode-ui/theme build && pnpm --filter @zcode-ui/core build` (or root `pnpm build`) so `dist/` exists if you consume package exports.

## 2. Host dependencies

```sh
pnpm add react react-dom
pnpm add -D tailwindcss @tailwindcss/vite tw-animate-css tailwind-scrollbar-hide shadcn
# core already depends on: radix-ui, lucide-react, class-variance-authority, clsx, tailwind-merge, cmdk, react-resizable-panels
# optional (only if you use these components):
pnpm add recharts motion
```

Vite:

```ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react(), tailwindcss()] });
```

## 3. CSS bootstrap

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "tailwind-scrollbar-hide/v4";
@import "shadcn/tailwind.css"; /* required for Radix data-* custom variants */
@import "@zcode-ui/tokens/styles.css";

@source "../node_modules/@zcode-ui/core/dist/**/*.{js,jsx}";
/* or, if consuming TypeScript source: */
@source "../node_modules/@zcode-ui/core/src/**/*.{ts,tsx}";
@source "./src/**/*.{ts,tsx}";
```

`shadcn/tailwind.css` is required so Tabs / Separator / ScrollArea / ButtonGroup compile with the same `data-active` semantics as upstream ZCode.

## 4. Theme

```tsx
import { enableBrowserThemeSurface, useTheme, applyTheme } from "@zcode-ui/theme";

// optional: sync browser chrome / theme-color meta
enableBrowserThemeSurface();

function App() {
  const { theme, setTheme } = useTheme({
    storageKey: "my-product-theme", // default: "zcode-ui-theme"
    defaultTheme: "zai-dark",
  });
  // setTheme("zai-light" | "zai-dark" | "system")
}
```

Theme classes applied on `<html>`: `.dark`, `.theme-zai-light`, `.theme-zai-dark`.

## 5. Import components

```tsx
import { Button } from "@zcode-ui/core/button";
import { cn } from "@zcode-ui/core/utils";
// or barrel:
import { Button, Input, Dialog, ChartContainer } from "@zcode-ui/core";
```

## 6. Verify

- [ ] Light (`zai-light`) and dark (`zai-dark`) both look correct
- [ ] Select / Dropdown / Dialog portal layers use popover colors
- [ ] `dist` types resolve (`@zcode-ui/core` → `dist/index.d.ts`) **or** Vite resolves `.js` imports inside source to `.tsx`
- [ ] No `@zcode/*` imports remain in your bundle from this kit
- [ ] Optional peers installed if you use Chart (`recharts`) or Shimmer / FlipMetricValue (`motion`)

## Known limits

- Tokens are CSS-only; theme + core publish compiled `dist` (ESM + types) while keeping `src` for source-first hosts.
- Electron vibrancy / xterm / katex CSS were intentionally stripped from tokens.
- Spinner i18n was replaced with a `label` prop (default `"Loading"`).
- Does not include pdf/pptx viewers, code/diff viewers, brand logos, or heavily coupled ai-elements (message, prompt-input, persona/rive, etc.).
- `shimmer` / `suggestion` / `snippet` retain Apache-2.0 attribution headers from vercel/ai-elements (via ZCode).
