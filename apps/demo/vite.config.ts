import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";

const root = resolve(__dirname, "../..");
const coreComponents = resolve(root, "packages/core/src/components");
const aiSrc = resolve(root, "packages/ai-elements/src");

const alias: { find: string | RegExp; replacement: string }[] = [
  { find: "@zcode-ui/tokens/styles.css", replacement: resolve(root, "packages/tokens/src/styles.css") },
  { find: "@zcode-ui/tokens", replacement: resolve(root, "packages/tokens/src/index.ts") },
  { find: "@zcode-ui/theme", replacement: resolve(root, "packages/theme/src/index.ts") },
  { find: "@zcode-ui/core/utils", replacement: resolve(root, "packages/core/src/lib/utils.ts") },
];

for (const file of readdirSync(coreComponents)) {
  if (!file.endsWith(".tsx")) continue;
  const name = file.replace(/\.tsx$/, "");
  alias.push({
    find: `@zcode-ui/core/${name}`,
    replacement: resolve(coreComponents, file),
  });
}

for (const file of readdirSync(aiSrc)) {
  if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
  if (file === "index.ts") continue;
  const name = file.replace(/\.(tsx|ts)$/, "");
  alias.push({
    find: `@zcode-ui/ai-elements/${name}`,
    replacement: resolve(aiSrc, file),
  });
}

// Bare package aliases last so they do not swallow deep imports
alias.push(
  { find: "@zcode-ui/core", replacement: resolve(root, "packages/core/src/index.ts") },
  { find: "@zcode-ui/ai-elements", replacement: resolve(root, "packages/ai-elements/src/index.ts") },
);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias },
  server: {
    port: 5179,
    host: true,
  },
});
