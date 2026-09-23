#!/usr/bin/env node
/**
 * Documents / re-runs the v0 extract from a local ZCode checkout.
 *
 * Usage (from zcode-ui-kit root):
 *   node scripts/extract.mjs
 *
 * Expects: /workspace/ZCode (or ZCODE_ROOT env) with packages/ui present.
 * Does NOT modify upstream ZCode.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT = join(__dirname, "..");
const ZCODE = process.env.ZCODE_ROOT || "/workspace/ZCode";
const UI = join(ZCODE, "packages/ui/src");
const COMP = join(UI, "components/ui");

const WHITELIST = [
  "button","input","textarea","select","dialog","alert-dialog","dropdown-menu",
  "context-menu","popover","tooltip","hover-card","tabs","accordion","collapsible",
  "checkbox","switch","badge","avatar","card","alert","separator","progress",
  "scroll-area","command","button-group","input-group","label","kbd","spinner",
  "toast","resizable","scroll-fade-viewport",
];

const manifestPath = join(__dirname, "extract-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

console.log("zcode-ui-kit extract manifest");
console.log("source:", manifest.source);
console.log("included:", manifest.included.length, manifest.included);
console.log("skipped:", manifest.skipped);
console.log("styles blocks:", manifest.styles_blocks);
console.log("");
console.log("Re-copy component files from", COMP);

mkdirSync(join(KIT, "packages/core/src/components"), { recursive: true });
mkdirSync(join(KIT, "packages/core/src/lib"), { recursive: true });

for (const name of WHITELIST) {
  const src = join(COMP, `${name}.tsx`);
  if (!existsSync(src)) {
    console.warn("missing", name);
    continue;
  }
  let text = readFileSync(src, "utf8");
  if (text.includes("@zcode/")) {
    console.warn("skip (has @zcode)", name);
    continue;
  }
  if (name === "spinner") {
    text = `import * as React from "react";
import { cn } from "../lib/utils.js";
import { LoaderIcon } from "lucide-react";

export type SpinnerProps = React.ComponentProps<"svg"> & {
  label?: string;
};

function Spinner({ className, label = "Loading", ...props }: SpinnerProps) {
  return (
    <LoaderIcon
      role="status"
      aria-label={label}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
`;
  } else {
    text = text
      .replaceAll('from "@/components/lib/utils.js"', 'from "../lib/utils.js"')
      .replaceAll("from '@/components/lib/utils.js'", "from '../lib/utils.js'");
    if (name === "toast") {
      text = text.replaceAll("zcode-toast-host", "zcode-ui-toast-host");
    }
  }
  writeFileSync(join(KIT, "packages/core/src/components", `${name}.tsx`), text);
  console.log("wrote", name);
}

copyFileSync(join(UI, "components/lib/utils.ts"), join(KIT, "packages/core/src/lib/utils.ts"));
console.log("wrote lib/utils.ts");
console.log("Done. Tokens/theme CSS extraction is one-shot in the initial scaffold; edit packages/tokens/src/styles.css if upstream theme blocks change.");
