# GrapesJS 学习项目目录结构

本文档描述了 GrapesJS 学习过程中推荐的项目目录结构，帮助您更好地组织学习资料、代码示例和实践项目。

## 推荐目录结构

```
f:\code\grapes\
├── docs/                           # 文档目录
│   ├── grapes-js-learning-plan.md  # 学习规划文档
│   ├── directory-structure.md      # 目录结构说明
│   ├── notes/                      # 学习笔记
│   │   ├── week-01-basics.md       # 第1周学习笔记
│   │   ├── week-02-components.md   # 第2周学习笔记
│   │   └── ...
│   ├── api-reference/              # API参考文档
│   │   ├── editor-api.md           # 编辑器API
│   │   ├── components-api.md       # 组件API
│   │   └── ...
│   └── best-practices/             # 最佳实践文档
│       ├── performance.md          # 性能优化
│       ├── security.md             # 安全考虑
│       └── deployment.md           # 部署指南
│
├── examples/                       # 代码示例
│   ├── basic/                      # 基础示例
│   │   ├── hello-world/            # Hello World示例
│   │   ├── simple-editor/          # 简单编辑器
│   │   └── custom-blocks/          # 自定义块示例
│   ├── intermediate/               # 中级示例
│   │   ├── responsive-editor/      # 响应式编辑器
│   │   ├── email-builder/          # 邮件构建器
│   │   └── form-builder/           # 表单构建器
│   └── advanced/                   # 高级示例
│       ├── multi-page-builder/     # 多页面构建器
│       ├── custom-plugins/         # 自定义插件
│       └── performance-optimized/  # 性能优化版本
│
├── projects/                       # 实践项目
│   ├── project-01-simple-editor/  # 项目1：简单页面编辑器
│   │   ├── src/
│   │   ├── dist/
│   │   ├── package.json
│   │   ├── webpack.config.js
│   │   └── README.md
│   ├── project-02-email-builder/   # 项目2：邮件编辑器
│   │   ├── src/
│   │   ├── dist/
│   │   ├── package.json
│   │   └── README.md
│   └── project-03-website-builder/ # 项目3：网站构建器
│       ├── src/
│       ├── dist/
│       ├── package.json
│       └── README.md
│
├── plugins/                        # 自定义插件开发
│   ├── form-builder-plugin/        # 表单构建器插件
│   ├── chart-plugin/               # 图表插件
│   ├── animation-plugin/           # 动画插件
│   └── template-library-plugin/    # 模板库插件
│
├── components/                     # 自定义组件
│   ├── carousel/                   # 轮播图组件
│   ├── pricing-table/              # 价格表组件
│   ├── testimonial/                # 推荐组件
│   └── contact-form/               # 联系表单组件
│
├── templates/                      # 模板库
│   ├── landing-pages/              # 落地页模板
│   ├── email-templates/            # 邮件模板
│   ├── blog-layouts/               # 博客布局
│   └── portfolio-themes/           # 作品集主题
│
├── assets/                         # 静态资源
│   ├── images/                     # 图片资源
│   ├── icons/                      # 图标资源
│   ├── fonts/                      # 字体文件
│   └── css/                        # 样式文件
│
├── tools/                          # 开发工具
│   ├── build-scripts/              # 构建脚本
│   ├── testing/                    # 测试工具
│   └── deployment/                 # 部署工具
│
└── README.md                       # 项目总体说明
```

## 目录说明

### 1. docs/ - 文档目录
存放所有学习相关的文档，包括学习计划、笔记、API参考等。

**子目录说明：**
- `notes/`: 按周组织的学习笔记
- `api-reference/`: API参考文档
- `best-practices/`: 最佳实践和经验总结

### 2. examples/ - 代码示例
按难度级别组织的代码示例，用于学习和参考。

**难度级别：**
- `basic/`: 基础示例，适合初学者
- `intermediate/`: 中级示例，涉及更复杂的功能
- `advanced/`: 高级示例，包含复杂的业务逻辑

### 3. projects/ - 实践项目
完整的项目实现，每个项目都有独立的构建配置和文档。

**项目结构示例：**
```
project-01-simple-editor/
├── src/
│   ├── index.js          # 入口文件
│   ├── editor.js         # 编辑器配置
│   ├── components/       # 自定义组件
│   ├── plugins/          # 插件配置
│   └── styles/           # 样式文件
├── dist/                 # 构建输出
├── public/               # 静态文件
├── package.json          # 依赖配置
├── webpack.config.js     # 构建配置
└── README.md             # 项目说明
```

### 4. plugins/ - 自定义插件
自己开发的插件，每个插件都有独立的目录和文档。

**插件结构示例：**
```
form-builder-plugin/
├── src/
│   ├── index.js          # 插件入口
│   ├── components/       # 插件组件
│   ├── commands/         # 插件命令
│   └── blocks/           # 插件块
├── dist/                 # 构建输出
├── package.json          # 插件配置
└── README.md             # 插件文档
```

### 5. components/ - 自定义组件
可复用的自定义组件，可以在不同项目中使用。

### 6. templates/ - 模板库
预设的页面模板，按类型分类存放。

### 7. assets/ - 静态资源
项目中使用的图片、图标、字体等静态资源。

### 8. tools/ - 开发工具
构建脚本、测试工具、部署脚本等开发辅助工具。

## 文件命名规范

### 1. 文件命名
- 使用小写字母和连字符：`my-component.js`
- 避免使用空格和特殊字符
- 使用有意义的描述性名称

### 2. 目录命名
- 使用小写字母和连字符：`email-builder`
- 保持简洁但具有描述性
- 按功能或类型分组

### 3. 文档命名
- Markdown文件使用 `.md` 扩展名
- 按内容类型和时间组织：`week-01-basics.md`
- 使用英文命名，便于版本控制

## 版本控制建议

### 1. Git 忽略文件
创建 `.gitignore` 文件，忽略不必要的文件：

```gitignore
# 依赖目录
node_modules/

# 构建输出
dist/
build/

# 日志文件
*.log
npm-debug.log*

# 环境变量文件
.env
.env.local

# 编辑器配置
.vscode/
.idea/

# 操作系统文件
.DS_Store
Thumbs.db

# 临时文件
*.tmp
*.temp
```

### 2. 提交信息规范
使用清晰的提交信息：
- `feat: 添加新功能`
- `fix: 修复bug`
- `docs: 更新文档`
- `style: 代码格式调整`
- `refactor: 代码重构`
- `test: 添加测试`

## 开发环境配置

### 1. 编辑器配置
在项目根目录创建 `.vscode/settings.json`：

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

### 2. 代码格式化
使用 Prettier 配置文件 `.prettierrc`：

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 3. ESLint 配置
创建 `.eslintrc.js` 文件：

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error'
  }
};
```

## 学习进度跟踪

### 1. 进度文件
在 `docs/` 目录下创建 `progress.md` 文件，记录学习进度：

```markdown
# 学习进度跟踪

## 第1周 - 基础概念
- [x] 阅读官方文档
- [x] 创建第一个编辑器
- [ ] 完成基础练习

## 第2周 - 组件系统
- [ ] 学习组件API
- [ ] 创建自定义组件
- [ ] 完成组件练习
```

### 2. 问题记录
创建 `docs/issues.md` 文件，记录遇到的问题和解决方案：

```markdown
# 问题记录

## 2024-12-XX - 组件无法正确渲染
**问题描述：** 自定义组件在编辑器中无法正确显示
**解决方案：** 检查组件的 tagName 和 attributes 配置
**相关链接：** [官方文档链接]
```

## 总结

良好的目录结构有助于：
1. **组织学习资料**：便于查找和管理学习内容
2. **代码复用**：组件和插件可以在不同项目中重复使用
3. **版本控制**：清晰的结构便于Git管理
4. **团队协作**：标准化的结构便于团队成员理解
5. **知识积累**：系统化的文档便于知识的积累和分享

建议在学习过程中严格按照这个结构组织文件，养成良好的开发习惯。