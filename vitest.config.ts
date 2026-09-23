import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";

const coreComponentsDir = resolve(__dirname, "packages/core/src/components");
const coreAliases: Record<string, string> = {
  "@zcode-ui/core": resolve(__dirname, "packages/core/src/index.ts"),
  "@zcode-ui/core/utils": resolve(__dirname, "packages/core/src/lib/utils.ts"),
  "@zcode-ui/theme": resolve(__dirname, "packages/theme/src/index.ts"),
  "@zcode-ui/tokens": resolve(__dirname, "packages/tokens/src/index.ts"),
  "@zcode-ui/ai-elements": resolve(__dirname, "packages/ai-elements/src/index.ts"),
};

for (const file of readdirSync(coreComponentsDir)) {
  if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
  if (file.includes(".test.")) continue;
  const name = file.replace(/\.(tsx|ts)$/, "");
  coreAliases[`@zcode-ui/core/${name}`] = resolve(coreComponentsDir, file);
}

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest.setup.ts"],
    include: ["packages/**/src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: coreAliases,
  },
});
