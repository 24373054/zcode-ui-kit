import { defineConfig } from "tsup";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const componentEntries = readdirSync(join(__dirname, "src/components"))
  .filter((f) => f.endsWith(".tsx") && !f.includes(".test."))
  .map((f) => `src/components/${f}`);

export default defineConfig({
  entry: ["src/index.ts", "src/lib/utils.ts", ...componentEntries],
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
    "radix-ui",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "cmdk",
    "react-resizable-panels",
    "recharts",
    "motion",
    "motion/react",
  ],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
