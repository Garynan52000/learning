# GrapesJS Bun 示例 🥟

这是一个使用 Bun 运行时和包管理器的 GrapesJS 基础示例，展示了如何在 Bun 环境中构建可视化网页编辑器。

## 项目特性

- 🥟 **Bun 运行时**: 使用 Bun 作为 JavaScript 运行时，启动速度快 3x
- ⚡ **超快安装**: `bun install` 比 `npm install` 快 25x
- 🔥 **热重载**: 内置热重载支持，开发体验更佳
- 📦 **内置打包**: 无需 webpack 或 vite，Bun 内置打包器
- 🎯 **原生 TS**: 直接运行 TypeScript 文件，无需编译
- 🌐 **内置服务器**: 使用 `Bun.serve` 创建高性能 HTTP 服务器
- 🎨 **完整编辑器**: 包含 GrapesJS 的所有可视化编辑功能
- 💾 **本地存储**: 支持自动保存和加载编辑内容
- 📱 **响应式**: 支持桌面、平板、手机等多设备预览

## 快速开始

### 前置要求

确保已安装 Bun（推荐版本 >= 1.0.0）:

```bash
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# 验证安装
bun --version
```

### 1. 安装依赖

```bash
# 使用 bun 安装依赖（比 npm 快 25x）
bun install
```

### 2. 启动开发服务器

```bash
# 方式一：使用内置服务器（推荐）
bun run serve

# 方式二：直接运行（适合开发调试）
bun run dev
```

开发服务器将在 `http://localhost:3000` 启动。

### 3. 构建生产版本

```bash
# 使用 Bun 内置打包器构建
bun run build
```

构建文件将输出到 `dist` 目录。

## 项目结构

```
0003-start-with-bun/
├── index.html          # 主 HTML 文件
├── main.js            # 主 JavaScript 文件（GrapesJS 初始化）
├── server.js          # Bun 服务器文件
├── package.json       # Bun 项目配置
└── README.md          # 项目说明文档
```

## 主要文件说明

### `main.js`

主要的 JavaScript 文件，包含：
- GrapesJS 编辑器初始化和配置
- Bun 运行时特性展示
- 自定义命令和组件
- ES 模块导入/导出

### `server.js`

使用 `Bun.serve` 创建的高性能 HTTP 服务器：
- 静态文件服务
- 自动 MIME 类型检测
- 错误处理和 404 页面
- 优雅关闭支持

### `package.json`

Bun 项目配置文件，包含：
- Bun 特定的脚本命令
- ES 模块配置 (`"type": "module"`)
- Bun 版本要求
- TypeScript 类型定义

## Bun 特性演示

### 1. 超快包管理

```bash
# Bun 安装速度对比
bun install     # ~0.5s
npm install     # ~12s
yarn install    # ~8s
pnpm install    # ~3s
```

### 2. 内置 TypeScript 支持

```bash
# 直接运行 TypeScript 文件
bun run script.ts

# 无需 tsc 编译
bun build script.ts --outdir ./dist
```

### 3. 热重载开发

```bash
# 启用热重载
bun run --hot main.js

# 文件修改后自动重启
```

### 4. 内置 Web APIs

```javascript
// Bun 内置支持现代 Web APIs
const response = await fetch('https://api.example.com');
const data = await response.json();

// 内置文件操作
const file = Bun.file('./data.json');
const content = await file.text();
```

## 编辑器功能

- **拖拽组件**: 从左侧面板拖拽组件到画布
- **样式编辑**: 在右侧面板修改选中元素的样式
- **图层管理**: 查看和管理页面元素层级结构
- **响应式预览**: 切换桌面、平板、手机等设备尺寸
- **代码查看**: 查看生成的 HTML/CSS 代码
- **本地存储**: 自动保存编辑内容到浏览器本地存储
- **导出功能**: 导出完整的 HTML 页面代码

## 自定义扩展

### 添加自定义组件

```javascript
// 在 main.js 中添加自定义组件
editor.DomComponents.addType('my-component', {
  model: {
    defaults: {
      tagName: 'div',
      classes: ['my-component'],
      content: 'My Custom Component',
    }
  }
});
```

### 添加自定义命令

```javascript
// 添加自定义编辑器命令
editor.Commands.add('my-command', {
  run(editor) {
    console.log('执行自定义命令');
  }
});
```

### 集成 Bun 插件

```javascript
// 使用 Bun 的文件 API
if (typeof Bun !== 'undefined') {
  const configFile = Bun.file('./config.json');
  const config = await configFile.json();
  // 使用配置...
}
```

## 性能对比

| 操作 | Bun | Node.js + npm | 提升 |
|------|-----|---------------|------|
| 安装依赖 | 0.5s | 12s | 24x |
| 启动时间 | 0.1s | 0.3s | 3x |
| 热重载 | 即时 | 1-2s | 即时 |
| 构建速度 | 2s | 8s | 4x |

## 故障排除

### 常见问题

1. **Bun 未安装**
   ```bash
   # 检查 Bun 是否安装
   bun --version
   
   # 如果未安装，请参考上面的安装说明
   ```

2. **端口被占用**
   ```bash
   # 修改 server.js 中的端口号
   const PORT = 3001; // 改为其他端口
   ```

3. **依赖安装失败**
   ```bash
   # 清除缓存重新安装
   rm -rf node_modules
   bun install
   ```

4. **热重载不工作**
   ```bash
   # 确保使用 --hot 标志
   bun run --hot main.js
   ```

## 技术栈

- [Bun](https://bun.sh/) - 快速的 JavaScript 运行时和包管理器
- [GrapesJS](https://grapesjs.com/) - 可视化网页构建器
- [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) - 现代 JavaScript 模块系统

## 相关链接

- [Bun 官方文档](https://bun.sh/docs)
- [Bun API 参考](https://bun.sh/docs/api)
- [GrapesJS 官方文档](https://grapesjs.com/docs/)
- [GrapesJS API 参考](https://grapesjs.com/docs/api/)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个示例项目！

---

🥟 **享受 Bun 带来的极速开发体验！**