#!/usr/bin/env node
/**
 * Documents / re-runs the extract from a local ZCode checkout.
 *
 * Usage (from zcode-ui-kit root):
 *   node scripts/extract.mjs
 *
 * Expects: /workspace/ZCode (or ZCODE_ROOT env) with packages/ui present.
 * Does NOT modify upstream ZCode.
 */
import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT = join(__dirname, "..");
const ZCODE = process.env.ZCODE_ROOT || "/workspace/ZCode";
const UI = join(ZCODE, "packages/ui/src");
const COMP = join(UI, "components/ui");
const AI = join(UI, "components/ai-elements");

const CORE_WHITELIST = [
  "button",
  "input",
  "textarea",
  "select",
  "dialog",
  "alert-dialog",
  "dropdown-menu",
  "context-menu",
  "popover",
  "tooltip",
  "hover-card",
  "tabs",
  "accordion",
  "collapsible",
  "checkbox",
  "switch",
  "badge",
  "avatar",
  "card",
  "alert",
  "separator",
  "progress",
  "scroll-area",
  "command",
  "button-group",
  "input-group",
  "label",
  "kbd",
  "spinner",
  "toast",
  "resizable",
  "scroll-fade-viewport",
  "chart",
  "flip-metric-value",
];

/** ai-elements copied from ZCode with import rewrites into @sealwax/zcode-ui-core. */
const AI_ELEMENTS = [
  "agent",
  "artifact",
  "attachments",
  "checkpoint",
  "commit",
  "confirmation",
  "conversation",
  "image",
  "markdown-blockquote",
  "markdown-list",
  "persona",
  "plan",
  "prompt-input",
  "prompt-input-actions",
  "prompt-input-buttons",
  "prompt-input-primitives",
  "prompt-input-textarea",
  "queue",
  "sandbox",
  "shimmer",
  "snippet",
  "sources",
  "suggestion",
  "task",
  "terminal",
  "test-results",
  "tool",
];

const manifestPath = join(__dirname, "extract-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

console.log("zcode-ui-kit extract manifest v" + (manifest.version || "?"));
console.log("source:", manifest.source);
console.log("core included:", manifest.core?.included?.length);
console.log("ai-elements included:", manifest.ai_elements?.included?.length);
console.log("ai-elements skipped:", manifest.ai_elements?.skipped);
console.log("");

const coreCompDir = join(KIT, "packages/core/src/components");
const coreLibDir = join(KIT, "packages/core/src/lib");
const aiDir = join(KIT, "packages/ai-elements/src");
mkdirSync(coreCompDir, { recursive: true });
mkdirSync(coreLibDir, { recursive: true });
mkdirSync(aiDir, { recursive: true });

function rewriteCoreUiImports(text) {
  return text
    .replaceAll('from "@/components/lib/utils.js"', 'from "../lib/utils.js"')
    .replaceAll("from '@/components/lib/utils.js'", "from '../lib/utils.js'");
}

function rewriteAiImports(text) {
  let out = text;
  // @/ utils → @sealwax/zcode-ui-core/utils
  out = out.replaceAll(
    'from "@/components/lib/utils.js"',
    'from "@sealwax/zcode-ui-core/utils"',
  );
  out = out.replaceAll(
    "from '@/components/lib/utils.js'",
    "from '@sealwax/zcode-ui-core/utils'",
  );
  // relative ../ui/X → @sealwax/zcode-ui-core/X
  out = out.replace(
    /from\s+["']\.\.\/ui\/([^"']+)\.js["']/g,
    'from "@sealwax/zcode-ui-core/$1"',
  );
  // relative ../lib/utils → @sealwax/zcode-ui-core/utils
  out = out.replace(
    /from\s+["']\.\.\/lib\/utils\.js["']/g,
    'from "@sealwax/zcode-ui-core/utils"',
  );
  return out;
}

console.log("Re-copy core components from", COMP);
for (const name of CORE_WHITELIST) {
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
    text = rewriteCoreUiImports(text);
    if (name === "toast") {
      text = text.replaceAll("zcode-toast-host", "zcode-ui-toast-host");
    }
    if (
      name === "button-group" &&
      !text.includes("import * as React") &&
      text.includes("React.ComponentProps")
    ) {
      text = 'import * as React from "react";\n' + text;
    }
  }
  writeFileSync(join(coreCompDir, `${name}.tsx`), text);
  console.log("wrote core", name);
}

// Remove former ai-elements that lived in core (moved to @sealwax/zcode-ui-ai-elements)
for (const name of ["shimmer", "suggestion", "snippet"]) {
  const p = join(coreCompDir, `${name}.tsx`);
  if (existsSync(p)) {
    // leave deletion to caller after index update; overwrite not needed
  }
}

console.log("\nRe-copy ai-elements from", AI);
for (const name of AI_ELEMENTS) {
  const src = join(AI, `${name}.tsx`);
  if (!existsSync(src)) {
    console.warn("missing ai-element", name);
    continue;
  }
  let text = readFileSync(src, "utf8");
  // Only reject real import specifiers, not comments mentioning @zcode/
  if (/from\s+["']@zcode\//.test(text) || /import\s+["']@zcode\//.test(text)) {
    console.warn("skip ai-element (has @zcode import)", name);
    continue;
  }
  // Reject heavy @/ app coupling (except utils which we rewrite)
  const heavyAt =
    /from\s+["']@\/(?!components\/lib\/utils\.js)[^"']+["']/.test(text);
  if (heavyAt) {
    console.warn("skip ai-element (heavy @/ imports)", name);
    continue;
  }
  text = rewriteAiImports(text);
  // shimmer TypeScript fix (same as 0.2.0)
  if (name === "shimmer") {
    text = text
      .replace(
        'import type { CSSProperties, ElementType, JSX } from "react";',
        'import type { ComponentType, CSSProperties, ElementType, JSX } from "react";',
      )
      .replace(
        /React\.ComponentType<MotionHTMLProps>/g,
        "ComponentType<MotionHTMLProps>",
      );
  }
  writeFileSync(join(aiDir, `${name}.tsx`), text);
  console.log("wrote ai-element", name);
}

copyFileSync(join(UI, "components/lib/utils.ts"), join(coreLibDir, "utils.ts"));
console.log("wrote lib/utils.ts");

console.log(
  "\nNote: code-block is maintained as a standalone shiki extract in packages/ai-elements/src/code-block.tsx (not copied from ZCode).",
);
console.log(
  "Done. Tokens/theme CSS extraction is one-shot in the initial scaffold; edit packages/tokens/src/styles.css if upstream theme blocks change.",
);
