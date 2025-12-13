## 目标
- 用 Bun 开发一个最小可用 Demo：输入网页截图/图片，生成高质量中文 Alt 文本。
- 完全免费与本地推理优先，不依赖云端密钥；对初学者友好；从简到繁可逐步扩展到结构化描述、CSS-in-JS 与 Figma-like JSON。

## 技术与模型
- 运行时：`bun`（Windows）
- 本地模型（免费）：`@xenova/transformers` 的 `image-to-text`（`Xenova/nlpconnect-vit-gpt2-image-captioning`）
- Web 框架：`hono`（极简 API）
- 可选扩展（仍免费）：`Ollama + qwen2-vl` 用于结构化描述/CSS/Figma-like 输出

## 项目结构
- `alt.ts`：CLI，输入图片 URL/路径 → 输出中文 Alt 文本
- `server.ts`：Web API，`GET /health`，`POST /alt`（传 `imageUrl`）→ 返回 `{ alt }`
- 后续扩展（不在 MVP 中）：`describe.ts`/`/describe`、`/css`、`/figma`

## MVP 实施步骤
1. 初始化与依赖
   - 在 `g:\bun\demo` 安装依赖：`bun add @xenova/transformers hono`
   - 说明首次运行会自动下载模型权重（较大），后续离线可用
2. CLI Alt 生成器（`alt.ts`）
   - 读取命令行参数中的图片 URL/路径
   - 使用 `pipeline('image-to-text', 'Xenova/nlpconnect-vit-gpt2-image-captioning')`
   - 打印第一条字幕作为 Alt 文本
   - 用示例运行：`bun run alt.ts https://picsum.photos/seed/demo/800/600`
3. Web API（`server.ts`）
   - 预热加载 `captioner` 管线（避免每次请求重复初始化）
   - 路由：`GET /health` 返回 `{ ok: true }`
   - 路由：`POST /alt` 接收 `{ imageUrl }`，返回 `{ alt }`
   - 启动：`bun run server.ts`；测试：PowerShell `Invoke-RestMethod` POST 示例
4. 验证与稳健性
   - 使用 2–3 张不同风格截图验证（深色、浅色、含多文本、含图片）
   - 若图片不可达或解析失败：返回 400 与错误信息
   - Alt 文本长度控制在 1–2 句，具体、客观，不臆测

## 扩展计划（按“从简到繁”）
- 阶段 2：结构化描述 `/describe`
  - 接入 `Ollama + qwen2-vl`（本地免费），提示词固定“只返回 JSON”：`{ summary, layout_overview, color_palette, typography, components:[{ name, role, approx_bbox }] }`
  - 解析失败时返回 `{ raw }` 并记录样本，迭代提示词
- 阶段 3：CSS-in-JS `/css`
  - 在 `/describe` 输出基础上生成保守的 `style` 对象，优先 grid/flex，单位 `px/number`
  - 输出结构：`{ components:[{ name, role, dom, style }] }`
- 阶段 4：Figma-like `/figma`
  - 生成简化 JSON：`{ document:{ frames, components, nodes, constraints, autolayout } }`
  - 后续可编写转换器导入到设计工具（原型级）

## 提示词策略（本地 VLM）
- Alt："只输出一条中文 Alt 文本，具体、客观，覆盖主要视觉元素与用途，不要解释。"
- Describe：固定 JSON schema，强调“只返回 JSON”，数值用 `px/整数`。
- CSS/Figma：同样固定 JSON schema，注明键名与单位，强调保守推断。

## 验收标准（MVP）
- CLI：对至少 3 张不同截图输出中文 Alt 文本，内容具体且无主观臆测。
- API：`POST /alt` 返回 `{ alt }`，对错误输入返回 400。
- 全流程不需要云端密钥，首次权重下载后可离线运行。

## 后续优化（非必需）
- Alt 文本重写：加一个小规则函数（长度控制、避免“图像包含…”的常见口头禅）
- 简单缓存：基于 `imageUrl` 缓存生成结果，避免重复推理
- 单元测试：基础快照测试（`bun test`），验证 Alt 输出不为空与长度范围

请确认此计划；确认后我将按上述步骤在你的目录创建必要文件、实现 CLI 与 API，并用示例图片完成验证。