# API — zcode-ui-kit 1.0.0 stable exports

Stable import paths for published packages. Prefer deep imports for tree-shaking; barrels are supported.

## `@zcode-ui/tokens`

| Export | Description |
| --- | --- |
| `@zcode-ui/tokens/styles.css` | Tailwind v4 `@theme` + `.dark` / `.theme-zai-light` / `.theme-zai-dark` |
| `@zcode-ui/tokens` | Empty TS marker module |

## `@zcode-ui/theme`

| Export | Symbols |
| --- | --- |
| `@zcode-ui/theme` | `useTheme`, `applyTheme`, `resolveTheme`, `normalizeThemePreference`, `enableBrowserThemeSurface`, types `Theme`, `ResolvedTheme`, `ThemeOptions` |

## `@zcode-ui/core`

Barrel: `@zcode-ui/core` re-exports all components below + `cn`.

| Path | Notes |
| --- | --- |
| `@zcode-ui/core/utils` | `cn` |
| `@zcode-ui/core/accordion` | |
| `@zcode-ui/core/alert` | |
| `@zcode-ui/core/alert-dialog` | |
| `@zcode-ui/core/avatar` | |
| `@zcode-ui/core/badge` | |
| `@zcode-ui/core/button` | |
| `@zcode-ui/core/button-group` | |
| `@zcode-ui/core/card` | |
| `@zcode-ui/core/chart` | |
| `@zcode-ui/core/checkbox` | |
| `@zcode-ui/core/collapsible` | |
| `@zcode-ui/core/command` | |
| `@zcode-ui/core/context-menu` | |
| `@zcode-ui/core/dialog` | |
| `@zcode-ui/core/dropdown-menu` | |
| `@zcode-ui/core/flip-metric-value` | |
| `@zcode-ui/core/hover-card` | |
| `@zcode-ui/core/input` | |
| `@zcode-ui/core/input-group` | |
| `@zcode-ui/core/kbd` | |
| `@zcode-ui/core/label` | |
| `@zcode-ui/core/popover` | |
| `@zcode-ui/core/progress` | |
| `@zcode-ui/core/resizable` | |
| `@zcode-ui/core/scroll-area` | |
| `@zcode-ui/core/scroll-fade-viewport` | |
| `@zcode-ui/core/select` | |
| `@zcode-ui/core/separator` | |
| `@zcode-ui/core/spinner` | |
| `@zcode-ui/core/switch` | |
| `@zcode-ui/core/tabs` | |
| `@zcode-ui/core/textarea` | |
| `@zcode-ui/core/toast` | |
| `@zcode-ui/core/tooltip` | |

## `@zcode-ui/ai-elements`

Barrel: `@zcode-ui/ai-elements` re-exports the modules below (prompt-input also re-exports its sibling modules).

| Path | Notes |
| --- | --- |
| `@zcode-ui/ai-elements/agent` | |
| `@zcode-ui/ai-elements/artifact` | |
| `@zcode-ui/ai-elements/attachments` | |
| `@zcode-ui/ai-elements/checkpoint` | |
| `@zcode-ui/ai-elements/code-block` | |
| `@zcode-ui/ai-elements/commit` | |
| `@zcode-ui/ai-elements/confirmation` | |
| `@zcode-ui/ai-elements/conversation` | |
| `@zcode-ui/ai-elements/image` | |
| `@zcode-ui/ai-elements/markdown-blockquote` | |
| `@zcode-ui/ai-elements/markdown-list` | |
| `@zcode-ui/ai-elements/persona` | |
| `@zcode-ui/ai-elements/plan` | |
| `@zcode-ui/ai-elements/prompt-input` | |
| `@zcode-ui/ai-elements/queue` | |
| `@zcode-ui/ai-elements/sandbox` | |
| `@zcode-ui/ai-elements/shimmer` | |
| `@zcode-ui/ai-elements/snippet` | |
| `@zcode-ui/ai-elements/sources` | |
| `@zcode-ui/ai-elements/suggestion` | |
| `@zcode-ui/ai-elements/task` | |
| `@zcode-ui/ai-elements/terminal` | |
| `@zcode-ui/ai-elements/test-results` | |
| `@zcode-ui/ai-elements/tool` | |

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
