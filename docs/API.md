# API — zcode-ui-kit 1.0.1 stable exports

Stable import paths for published packages. Prefer deep imports for tree-shaking; barrels are supported.

## `@sealwax/zcode-ui-tokens`

| Export | Description |
| --- | --- |
| `@sealwax/zcode-ui-tokens/styles.css` | Tailwind v4 `@theme` + `.dark` / `.theme-zai-light` / `.theme-zai-dark` |
| `@sealwax/zcode-ui-tokens` | Empty TS marker module |

## `@sealwax/zcode-ui-theme`

| Export | Symbols |
| --- | --- |
| `@sealwax/zcode-ui-theme` | `useTheme`, `applyTheme`, `resolveTheme`, `normalizeThemePreference`, `enableBrowserThemeSurface`, types `Theme`, `ResolvedTheme`, `ThemeOptions` |

## `@sealwax/zcode-ui-core`

Barrel: `@sealwax/zcode-ui-core` re-exports all components below + `cn`.

| Path | Notes |
| --- | --- |
| `@sealwax/zcode-ui-core/utils` | `cn` |
| `@sealwax/zcode-ui-core/accordion` | |
| `@sealwax/zcode-ui-core/alert` | |
| `@sealwax/zcode-ui-core/alert-dialog` | |
| `@sealwax/zcode-ui-core/avatar` | |
| `@sealwax/zcode-ui-core/badge` | |
| `@sealwax/zcode-ui-core/button` | |
| `@sealwax/zcode-ui-core/button-group` | |
| `@sealwax/zcode-ui-core/card` | |
| `@sealwax/zcode-ui-core/chart` | |
| `@sealwax/zcode-ui-core/checkbox` | |
| `@sealwax/zcode-ui-core/collapsible` | |
| `@sealwax/zcode-ui-core/command` | |
| `@sealwax/zcode-ui-core/context-menu` | |
| `@sealwax/zcode-ui-core/dialog` | |
| `@sealwax/zcode-ui-core/dropdown-menu` | |
| `@sealwax/zcode-ui-core/flip-metric-value` | |
| `@sealwax/zcode-ui-core/hover-card` | |
| `@sealwax/zcode-ui-core/input` | |
| `@sealwax/zcode-ui-core/input-group` | |
| `@sealwax/zcode-ui-core/kbd` | |
| `@sealwax/zcode-ui-core/label` | |
| `@sealwax/zcode-ui-core/popover` | |
| `@sealwax/zcode-ui-core/progress` | |
| `@sealwax/zcode-ui-core/resizable` | |
| `@sealwax/zcode-ui-core/scroll-area` | |
| `@sealwax/zcode-ui-core/scroll-fade-viewport` | |
| `@sealwax/zcode-ui-core/select` | |
| `@sealwax/zcode-ui-core/separator` | |
| `@sealwax/zcode-ui-core/spinner` | |
| `@sealwax/zcode-ui-core/switch` | |
| `@sealwax/zcode-ui-core/tabs` | |
| `@sealwax/zcode-ui-core/textarea` | |
| `@sealwax/zcode-ui-core/toast` | |
| `@sealwax/zcode-ui-core/tooltip` | |

## `@sealwax/zcode-ui-ai-elements`

Barrel: `@sealwax/zcode-ui-ai-elements` re-exports the modules below (prompt-input also re-exports its sibling modules).

| Path | Notes |
| --- | --- |
| `@sealwax/zcode-ui-ai-elements/agent` | |
| `@sealwax/zcode-ui-ai-elements/artifact` | |
| `@sealwax/zcode-ui-ai-elements/attachments` | |
| `@sealwax/zcode-ui-ai-elements/checkpoint` | |
| `@sealwax/zcode-ui-ai-elements/code-block` | |
| `@sealwax/zcode-ui-ai-elements/commit` | |
| `@sealwax/zcode-ui-ai-elements/confirmation` | |
| `@sealwax/zcode-ui-ai-elements/conversation` | |
| `@sealwax/zcode-ui-ai-elements/image` | |
| `@sealwax/zcode-ui-ai-elements/markdown-blockquote` | |
| `@sealwax/zcode-ui-ai-elements/markdown-list` | |
| `@sealwax/zcode-ui-ai-elements/persona` | |
| `@sealwax/zcode-ui-ai-elements/plan` | |
| `@sealwax/zcode-ui-ai-elements/prompt-input` | |
| `@sealwax/zcode-ui-ai-elements/queue` | |
| `@sealwax/zcode-ui-ai-elements/sandbox` | |
| `@sealwax/zcode-ui-ai-elements/shimmer` | |
| `@sealwax/zcode-ui-ai-elements/snippet` | |
| `@sealwax/zcode-ui-ai-elements/sources` | |
| `@sealwax/zcode-ui-ai-elements/suggestion` | |
| `@sealwax/zcode-ui-ai-elements/task` | |
| `@sealwax/zcode-ui-ai-elements/terminal` | |
| `@sealwax/zcode-ui-ai-elements/test-results` | |
| `@sealwax/zcode-ui-ai-elements/tool` | |

Also available as deep paths (not all on the barrel): `prompt-input-actions`, `prompt-input-buttons`, `prompt-input-primitives`, `prompt-input-textarea`.

### Optional peers (install only what you use)

| Peer | Used by |
| --- | --- |
| `ai` | confirmation, tool, sandbox, agent, attachments, image, prompt-input, conversation |
| `shiki` | code-block |
| `motion` | shimmer, plan |
| `nanoid` | prompt-input |
| `use-stick-to-bottom` | conversation |
| `ansi-to-react` | terminal |
| `@rive-app/react-webgl2` | persona |

## Out of scope (not exported)

message, reasoning, markdown-image, markdown-table, mermaid-block, diagram-preview-dialog, image-preview-dialog, ReactFlow canvas family, chat-loading, context, Electron/telemetry, brand logos.
