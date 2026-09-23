# Adopting zcode-ui-kit 1.0

Checklist for using the kit in a random React + Tailwind v4 project.

## 1. Add packages

**From npm (when published):**

```sh
pnpm add @zcode-ui/tokens @zcode-ui/theme @zcode-ui/core @zcode-ui/ai-elements
```

**Monorepo / path:**

```json
{
  "dependencies": {
    "@zcode-ui/tokens": "file:../zcode-ui-kit/packages/tokens",
    "@zcode-ui/theme": "file:../zcode-ui-kit/packages/theme",
    "@zcode-ui/core": "file:../zcode-ui-kit/packages/core",
    "@zcode-ui/ai-elements": "file:../zcode-ui-kit/packages/ai-elements"
  }
}
```

After install, run `pnpm build` in the kit so `dist/` exists if you consume package exports.

## 2. Host dependencies

```sh
pnpm add react react-dom
pnpm add -D tailwindcss @tailwindcss/vite tw-animate-css tailwind-scrollbar-hide shadcn
# optional peers by feature:
pnpm add recharts          # @zcode-ui/core chart
pnpm add motion            # flip-metric-value / shimmer
pnpm add ai shiki          # confirmation / tool / code-block / image types
pnpm add nanoid            # prompt-input
pnpm add use-stick-to-bottom  # conversation
pnpm add ansi-to-react     # terminal
pnpm add @rive-app/react-webgl2  # persona
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
@import "shadcn/tailwind.css";
@import "@zcode-ui/tokens/styles.css";

@source "../node_modules/@zcode-ui/core/dist/**/*.{js,jsx}";
@source "../node_modules/@zcode-ui/ai-elements/dist/**/*.{js,jsx}";
@source "./src/**/*.{ts,tsx}";
```

`shadcn/tailwind.css` is required so Tabs / Separator / ScrollArea / ButtonGroup compile with the same `data-active` semantics as upstream ZCode.

## 4. Theme

```tsx
import { enableBrowserThemeSurface, useTheme } from "@zcode-ui/theme";

enableBrowserThemeSurface();

function App() {
  const { theme, setTheme } = useTheme({
    storageKey: "my-product-theme",
    defaultTheme: "zai-dark",
  });
}
```

Theme classes on `<html>`: `.dark`, `.theme-zai-light`, `.theme-zai-dark`.

## 5. Import components

```tsx
import { Button } from "@zcode-ui/core/button";
import { cn } from "@zcode-ui/core/utils";
import { Shimmer } from "@zcode-ui/ai-elements/shimmer";
import { CodeBlock } from "@zcode-ui/ai-elements/code-block";
```

**Breaking from 0.2.0:** `shimmer` / `suggestion` / `snippet` moved from `@zcode-ui/core` → `@zcode-ui/ai-elements`.

## 6. Verify

- [ ] Light (`zai-light`) and dark (`zai-dark`) both look correct
- [ ] Select / Dropdown / Dialog portal layers use popover colors
- [ ] `dist` types resolve **or** Vite resolves source via aliases
- [ ] No `@zcode/*` imports remain in your bundle from this kit
- [ ] Optional peers installed for the components you use
- [ ] No Electron / telemetry / brand logo assets pulled in

## Known limits

- Tokens are CSS-only; theme / core / ai-elements publish compiled `dist`.
- Electron vibrancy / xterm / katex CSS were intentionally stripped from tokens.
- Spinner i18n was replaced with a `label` prop (default `"Loading"`).
- Heavy ZCode surfaces stay out of scope: message / reasoning / mermaid viewers / ReactFlow canvas / pdf-pptx / brand logos.
- AI element files retain Apache-2.0 attribution headers from vercel/ai-elements (via ZCode).
