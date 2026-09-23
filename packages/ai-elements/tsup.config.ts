import { defineConfig } from "tsup";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const componentEntries = readdirSync(join(__dirname, "src"))
  .filter((f) => (f.endsWith(".tsx") || f.endsWith(".ts")) && f !== "index.ts" && !f.includes(".test."))
  .map((f) => `src/${f}`);

export default defineConfig({
  entry: ["src/index.ts", ...componentEntries],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  target: "es2022",
  outDir: "dist",
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "lucide-react",
    "@zcode-ui/core",
    /^@zcode-ui\/core\//,
    "ai",
    "motion",
    "motion/react",
    "shiki",
    "nanoid",
    "use-stick-to-bottom",
    "ansi-to-react",
    "@rive-app/react-webgl2",
  ],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
