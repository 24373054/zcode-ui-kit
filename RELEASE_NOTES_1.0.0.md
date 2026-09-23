# zcode-ui-kit 1.0.0

## 中文

**zcode-ui-kit 正式 1.0.0** — 可独立发布的 React 19 + Tailwind v4 UI 套件，从 ZCode `packages/ui` 抽取，无 `@zcode/*` 应用耦合、无 Electron/遥测、无品牌 Logo 再分发。

### 包含包

- `@sealwax/zcode-ui-tokens@1.0.0` — 设计令牌 CSS
- `@sealwax/zcode-ui-theme@1.0.0` — 主题运行时
- `@sealwax/zcode-ui-core@1.0.0` — shadcn 风格基础组件
- `@sealwax/zcode-ui-ai-elements@1.0.0` — AI 对话/工具 UI 元素（新）

### 亮点

- 新增 `@sealwax/zcode-ui-ai-elements`：code-block（独立 shiki）、sources、confirmation、tool、task、prompt-input、conversation、persona 等
- `shimmer` / `suggestion` / `snippet` 从 core 迁入 ai-elements（破坏性）
- Vitest + Testing Library；CI 覆盖 typecheck / test / build / build:demo
- 发布就绪：`private: false`、`publishConfig`、LICENSE、准确 `sideEffects`

### 破坏性变更

- 从 `@sealwax/zcode-ui-core` 导入 `shimmer` / `suggestion` / `snippet` 需改为 `@sealwax/zcode-ui-ai-elements/*`

完整说明见 `CHANGELOG.md`、`ADOPTION.md`、`docs/API.md`。

---

## English (short)

**Formal 1.0.0** of the standalone ZCode UI extract for React 19 + Tailwind v4.

- Packages: `@sealwax/zcode-ui-tokens`, `@sealwax/zcode-ui-theme`, `@sealwax/zcode-ui-core`, **new** `@sealwax/zcode-ui-ai-elements`
- AI surface: code-block (standalone shiki), sources, confirmation, tool, task, prompt-input, conversation, persona, and more
- **Breaking:** `shimmer` / `suggestion` / `snippet` moved core → ai-elements
- Tests + CI (typecheck, test, build, build:demo); publish-ready packaging
- No Electron/telemetry; no redistributable brand logos

See `CHANGELOG.md` and `docs/API.md` for details.
