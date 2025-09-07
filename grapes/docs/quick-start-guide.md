# GrapesJS 快速开始指南

本指南将帮助您在最短时间内开始使用 GrapesJS，包含环境搭建、基础示例和常用功能演示。

## 🚀 5分钟快速体验

### 方法一：在线体验
访问 [GrapesJS 官方演示](https://grapesjs.com/demo.html) 立即体验功能。

### 方法二：本地HTML文件
创建一个简单的HTML文件快速体验：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GrapesJS 快速体验</title>
    <link rel="stylesheet" href="https://unpkg.com/grapesjs/dist/css/grapes.min.css">
    <style>
        body, html {
            margin: 0;
            height: 100%;
        }
        #gjs {
            height: 100vh;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="gjs">
        <div style="padding: 20px; text-align: center;">
            <h1>欢迎使用 GrapesJS</h1>
            <p>这是一个可视化网页编辑器</p>
            <button style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px;">点击按钮</button>
        </div>
    </div>

    <script src="https://unpkg.com/grapesjs"></script>
    <script>
        const editor = grapesjs.init({
            container: '#gjs',
            height: '100vh',
            width: 'auto',
            storageManager: false,
            blockManager: {
                appendTo: '#blocks'
            }
        });
    </script>
</body>
</html>
```

将上述代码保存为 `index.html` 文件，用浏览器打开即可体验。

## 📦 项目环境搭建

### 前置要求
- Node.js >= 14.x
- npm 或 yarn
- 现代浏览器

### 创建新项目

```bash
# 1. 创建项目目录
mkdir my-grapes-project
cd my-grapes-project

# 2. 初始化项目
npm init -y

# 3. 安装 GrapesJS
npm install grapesjs

# 4. 安装开发依赖
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev html-webpack-plugin css-loader style-loader
```

### 项目结构

```
my-grapes-project/
├── src/
│   ├── index.html
│   ├── index.js
│   └── style.css
├── package.json
└── webpack.config.js
```

### 配置文件

**webpack.config.js**
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true
  },
  mode: 'development'
};
```

**src/index.html**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的 GrapesJS 编辑器</title>
</head>
<body>
    <div id="gjs"></div>
</body>
</html>
```

**src/index.js**
```javascript
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import './style.css';

// 初始化编辑器
const editor = grapesjs.init({
  container: '#gjs',
  height: '100vh',
  width: 'auto',
  
  // 存储管理器配置
  storageManager: {
    type: 'local',
    autosave: true,
    autoload: true,
    stepsBeforeSave: 3
  },
  
  // 初始内容
  components: `
    <div style="padding: 20px; text-align: center;">
      <h1>欢迎使用 GrapesJS</h1>
      <p>开始创建您的网页吧！</p>
    </div>
  `,
  
  // 初始样式
  style: `
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }
  `
});

// 添加自定义块
editor.BlockManager.add('my-text-block', {
  label: '文本块',
  content: '<div style="padding: 10px;">添加您的文本</div>',
  category: '基础',
  attributes: { class: 'fa fa-text' }
});

editor.BlockManager.add('my-image-block', {
  label: '图片块', 
  content: '<img src="https://via.placeholder.com/300x200" style="max-width: 100%; height: auto;"/>',
  category: '基础',
  attributes: { class: 'fa fa-image' }
});

console.log('GrapesJS 编辑器已初始化');
```

**src/style.css**
```css
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#gjs {
  height: 100vh;
  overflow: hidden;
}

/* 自定义编辑器样式 */
.gjs-block {
  width: auto;
  height: auto;
  min-height: 48px;
}
```

**package.json 脚本**
```json
{
  "scripts": {
    "start": "webpack serve",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development"
  }
}
```

### 启动项目

```bash
# 开发模式启动
npm start

# 或者
npm run dev
```

浏览器会自动打开 `http://localhost:3000`，您就可以看到运行中的 GrapesJS 编辑器了！

## 🎯 核心功能演示

### 1. 添加自定义组件

```javascript
// 添加按钮组件
editor.DomComponents.addType('custom-button', {
  model: {
    defaults: {
      tagName: 'button',
      attributes: {
        class: 'btn btn-primary'
      },
      content: '点击按钮',
      style: {
        padding: '10px 20px',
        'background-color': '#007bff',
        color: 'white',
        border: 'none',
        'border-radius': '4px',
        cursor: 'pointer'
      },
      traits: [
        {
          type: 'text',
          name: 'text',
          label: '按钮文本',
          changeProp: 1
        },
        {
          type: 'color',
          name: 'background-color',
          label: '背景色'
        }
      ]
    }
  }
});

// 添加到块管理器
editor.BlockManager.add('custom-button-block', {
  label: '自定义按钮',
  content: { type: 'custom-button' },
  category: '自定义'
});
```

### 2. 配置样式管理器

```javascript
// 自定义样式管理器
editor.StyleManager.addSector('custom-styles', {
  name: '自定义样式',
  open: false,
  buildProps: [
    'background-color',
    'color', 
    'border-radius',
    'padding',
    'margin'
  ],
  properties: [
    {
      name: '背景色',
      property: 'background-color',
      type: 'color'
    },
    {
      name: '文字颜色',
      property: 'color',
      type: 'color'
    },
    {
      name: '圆角',
      property: 'border-radius',
      type: 'slider',
      units: ['px'],
      min: 0,
      max: 50
    }
  ]
});
```

### 3. 添加自定义命令

```javascript
// 添加保存命令
editor.Commands.add('save-page', {
  run: function(editor) {
    const html = editor.getHtml();
    const css = editor.getCss();
    
    // 这里可以发送到服务器保存
    console.log('HTML:', html);
    console.log('CSS:', css);
    
    alert('页面已保存！');
  }
});

// 添加到面板
editor.Panels.addButton('options', {
  id: 'save-page',
  className: 'fa fa-save',
  command: 'save-page',
  attributes: { title: '保存页面' }
});
```

### 4. 事件监听

```javascript
// 监听组件选择事件
editor.on('component:selected', (component) => {
  console.log('选中组件:', component);
});

// 监听组件更新事件
editor.on('component:update', (component) => {
  console.log('组件已更新:', component);
});

// 监听编辑器加载完成
editor.on('load', () => {
  console.log('编辑器加载完成');
});
```

## 🔧 常用配置选项

### 基础配置

```javascript
const editor = grapesjs.init({
  container: '#gjs',
  
  // 画布配置
  height: '100vh',
  width: 'auto',
  
  // 存储配置
  storageManager: {
    type: 'local', // 'local' | 'remote' | false
    autosave: true,
    autoload: true
  },
  
  // 资源管理器
  assetManager: {
    embedAsBase64: false,
    assets: [
      'https://via.placeholder.com/300x200',
      'https://via.placeholder.com/400x300'
    ]
  },
  
  // 块管理器
  blockManager: {
    appendTo: '#blocks-container'
  },
  
  // 样式管理器
  styleManager: {
    appendTo: '#styles-container',
    sectors: [
      {
        name: '常规',
        open: false,
        buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
      }
    ]
  },
  
  // 层级管理器
  layerManager: {
    appendTo: '#layers-container'
  },
  
  // 特性管理器
  traitManager: {
    appendTo: '#traits-container'
  }
});
```

### 响应式配置

```javascript
const editor = grapesjs.init({
  // ... 其他配置
  
  deviceManager: {
    devices: [
      {
        name: '桌面',
        width: ''
      },
      {
        name: '平板',
        width: '768px',
        widthMedia: '992px'
      },
      {
        name: '手机',
        width: '320px', 
        widthMedia: '768px'
      }
    ]
  }
});
```

## 🎨 主题定制

### 自定义CSS

```css
/* 自定义编辑器主题 */
.gjs-one-bg {
  background-color: #2c3e50;
}

.gjs-two-color {
  color: #ecf0f1;
}

.gjs-three-bg {
  background-color: #34495e;
}

.gjs-four-color {
  color: #bdc3c7;
}

/* 自定义块样式 */
.gjs-block {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.gjs-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
```

## 📚 下一步学习

完成快速开始后，建议按以下顺序深入学习：

1. **阅读学习规划** - 查看 `grapes-js-learning-plan.md`
2. **了解目录结构** - 查看 `directory-structure.md`
3. **深入API学习** - 研究官方文档和API参考
4. **实践项目开发** - 按照学习规划完成实践项目

## 🆘 常见问题

### Q: 编辑器无法正常显示
A: 检查CSS文件是否正确引入，确保容器元素有足够的高度。

### Q: 自定义组件不显示
A: 确保组件类型正确注册，检查 `tagName` 和 `content` 配置。

### Q: 样式不生效
A: 检查CSS选择器优先级，确保样式正确应用到目标元素。

### Q: 本地存储不工作
A: 确保浏览器支持localStorage，检查存储管理器配置。

## 🔗 有用链接

- [GrapesJS 官方网站](https://grapesjs.com/)
- [官方文档](https://grapesjs.com/docs/)
- [GitHub 仓库](https://github.com/artf/grapesjs)
- [在线演示](https://grapesjs.com/demo.html)
- [插件列表](https://grapesjs.com/docs/modules/Plugins.html)

---

🎉 **恭喜！** 您已经成功搭建了 GrapesJS 开发环境。现在可以开始您的可视化编辑器开发之旅了！