# GrapesJS NPM 示例

这是一个使用 npm 包管理器和 Vite 构建工具的 GrapesJS 基础示例。

## 项目特性

- 🚀 使用 Vite 作为构建工具，支持快速热重载
- 📦 通过 npm 管理 GrapesJS 依赖
- 🎨 完整的可视化编辑器功能
- 💾 本地存储支持
- 📱 响应式设计预览

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动。

### 3. 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist` 目录。

### 4. 预览生产版本

```bash
npm run preview
```

## 项目结构

```
0002-start-with-npm/
├── index.html          # 主 HTML 文件
├── main.js            # 主 JavaScript 文件
├── package.json       # npm 配置文件
├── vite.config.js     # Vite 配置文件
└── README.md          # 项目说明文档
```

## 主要文件说明

### `main.js`

主要的 JavaScript 文件，包含：
- GrapesJS 编辑器初始化
- 编辑器配置选项
- 自定义命令定义
- 插件配置

### `vite.config.js`

Vite 构建工具配置，包含：
- 开发服务器设置
- 构建选项配置
- CSS 处理配置

## 编辑器功能

- **拖拽组件**: 从左侧面板拖拽组件到画布
- **样式编辑**: 在右侧面板修改选中元素的样式
- **图层管理**: 查看和管理页面元素层级
- **响应式预览**: 切换不同设备尺寸预览
- **本地存储**: 自动保存编辑内容到浏览器本地存储

## 自定义扩展

你可以通过以下方式扩展编辑器功能：

1. **添加插件**: 在 `main.js` 中的 `plugins` 数组添加 GrapesJS 插件
2. **自定义组件**: 使用 `editor.DomComponents.addType()` 添加自定义组件
3. **自定义命令**: 使用 `editor.Commands.add()` 添加自定义命令
4. **样式配置**: 修改 CSS 样式自定义编辑器外观

## 技术栈

- [GrapesJS](https://grapesjs.com/) - 可视化网页构建器
- [Vite](https://vitejs.dev/) - 现代前端构建工具
- [npm](https://www.npmjs.com/) - 包管理器

## 相关链接

- [GrapesJS 官方文档](https://grapesjs.com/docs/)
- [GrapesJS API 参考](https://grapesjs.com/docs/api/)
- [Vite 官方文档](https://vitejs.dev/guide/)