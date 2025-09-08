# GrapesJS API 参考指南

## 概述

本指南提供了 GrapesJS 主要 API 模块的快速参考，帮助开发者快速查找所需的功能和方法。

## 核心模块

### 1. Editor (编辑器)

编辑器是 GrapesJS 的核心入口点，提供了访问所有其他模块的接口。

```javascript
// 初始化编辑器
const editor = grapesjs.init({
  container: '#gjs',
  components: '<div>Hello World!</div>',
  style: '.my-class { color: red }'
});

// 访问其他模块
const blockManager = editor.BlockManager;
const components = editor.Components;
const styleManager = editor.StyleManager;
```

**主要方法**:
- `getHtml()` - 获取 HTML 代码
- `getCss()` - 获取 CSS 代码
- `setComponents()` - 设置组件
- `getSelected()` - 获取选中的组件
- `runCommand()` - 执行命令

### 2. Components (组件系统)

组件是 GrapesJS 中最基本的构建单元，代表 HTML 元素。

```javascript
// 获取组件管理器
const components = editor.Components;

// 添加组件
const component = components.addComponent({
  tagName: 'div',
  attributes: { class: 'my-component' },
  content: 'Hello World!'
});

// 获取包装器组件
const wrapper = components.getWrapper();
```

**组件属性**:
- `type` - 组件类型
- `tagName` - HTML 标签名
- `attributes` - HTML 属性
- `content` - 内容
- `style` - 内联样式
- `removable` - 是否可删除
- `draggable` - 是否可拖拽
- `droppable` - 是否可放置其他组件

**组件方法**:
- `set(property, value)` - 设置属性
- `get(property)` - 获取属性
- `addAttributes(attrs)` - 添加属性
- `find(selector)` - 查找子组件
- `closest(selector)` - 查找最近的父组件
- `remove()` - 删除组件

### 3. Block Manager (块管理器)

块管理器用于管理可重用的内容块，用户可以从块面板拖拽到画布。

```javascript
// 获取块管理器
const blockManager = editor.BlockManager;

// 添加块
blockManager.add('my-block', {
  label: '我的块',
  content: '<div class="my-block">块内容</div>',
  category: '基础块',
  media: '<i class="fa fa-square"></i>',
  attributes: {
    title: '插入我的块'
  }
});

// 获取所有块
const blocks = blockManager.getAll();

// 按分类获取块
const basicBlocks = blockManager.getBlocksByCategory('基础块');
```

**块属性**:
- `label` - 显示标签
- `content` - 块内容（HTML 或组件定义）
- `category` - 分类
- `media` - 图标（HTML 或图片 URL）
- `attributes` - HTML 属性
- `activate` - 是否激活
- `select` - 是否选中

**事件**:
- `block:add` - 块添加时触发
- `block:remove` - 块删除时触发
- `block:update` - 块更新时触发

### 4. Style Manager (样式管理器)

样式管理器用于管理组件的 CSS 样式。

```javascript
// 获取样式管理器
const styleManager = editor.StyleManager;

// 添加样式属性
styleManager.addProperty('decorations', {
  name: '文本装饰',
  property: 'text-decoration',
  type: 'select',
  defaults: 'none',
  options: [
    { value: 'none', name: '无' },
    { value: 'underline', name: '下划线' },
    { value: 'line-through', name: '删除线' }
  ]
});

// 获取所有属性
const properties = styleManager.getProperties();
```

**属性类型**:
- `number` - 数字输入
- `integer` - 整数输入
- `text` - 文本输入
- `select` - 下拉选择
- `color` - 颜色选择器
- `slider` - 滑块
- `file` - 文件选择
- `composite` - 复合属性

### 5. Asset Manager (资源管理器)

资源管理器用于管理图片、视频等媒体资源。

```javascript
// 获取资源管理器
const assetManager = editor.AssetManager;

// 添加资源
assetManager.add([
  {
    type: 'image',
    src: 'https://example.com/image.jpg',
    name: '示例图片'
  },
  {
    type: 'image',
    src: 'path/to/local/image.png'
  }
]);

// 打开资源管理器
assetManager.open({
  select(asset, complete) {
    const selected = editor.getSelected();
    if (selected && selected.is('image')) {
      selected.addAttributes({ src: asset.getSrc() });
      complete && assetManager.close();
    }
  }
});
```

**资源属性**:
- `type` - 资源类型（image, video 等）
- `src` - 资源 URL
- `name` - 显示名称
- `unitDim` - 尺寸单位
- `height` - 高度
- `width` - 宽度

### 6. Commands (命令系统)

命令系统用于执行编辑器操作，支持撤销/重做功能。

```javascript
// 获取命令管理器
const commands = editor.Commands;

// 添加自定义命令
commands.add('my-command', {
  run(editor, sender, options) {
    console.log('执行命令', options);
    // 命令逻辑
  },
  stop(editor, sender, options) {
    console.log('停止命令');
    // 停止逻辑
  }
});

// 执行命令
editor.runCommand('my-command', { param: 'value' });

// 停止命令
editor.stopCommand('my-command');

// 检查命令是否激活
const isActive = commands.isActive('my-command');
```

**内置命令**:
- `core:undo` - 撤销
- `core:redo` - 重做
- `core:canvas-clear` - 清空画布
- `core:fullscreen` - 全屏模式
- `core:open-code` - 打开代码编辑器
- `core:preview` - 预览模式

### 7. Canvas (画布)

画布是编辑器的可视化编辑区域。

```javascript
// 获取画布
const canvas = editor.Canvas;

// 设置缩放
canvas.setZoom(1.5);

// 获取缩放
const zoom = canvas.getZoom();

// 获取画布元素
const canvasEl = canvas.getElement();

// 获取框架元素
const frameEl = canvas.getFrameEl();
```

**画布方法**:
- `setZoom(value)` - 设置缩放比例
- `getZoom()` - 获取缩放比例
- `setCoords(x, y)` - 设置坐标
- `getCoords()` - 获取坐标
- `scrollTo(el)` - 滚动到元素

### 8. CSS Composer (CSS 编辑器)

 CSS 编辑器用于管理样式规则。

```javascript
// 获取 CSS 编辑器
const css = editor.Css;

// 添加 CSS 规则
const rules = css.addRules(`
  .my-class {
    color: red;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    .my-class {
      font-size: 14px;
    }
  }
`);

// 设置规则
const rule = css.setRule('.my-class', {
  color: 'blue',
  'font-weight': 'bold'
});

// 获取规则
const myRule = css.getRule('.my-class');

// 获取所有规则
const allRules = css.getRules();
```

### 9. Storage Manager (存储管理器)

存储管理器用于保存和加载编辑器数据。

```javascript
// 配置存储
const editor = grapesjs.init({
  storageManager: {
    type: 'local', // 'local', 'remote'
    autosave: true,
    autoload: true,
    stepsBeforeSave: 3
  }
});

// 手动保存
editor.store();

// 手动加载
editor.load();

// 获取存储管理器
const storageManager = editor.StorageManager;

// 自定义存储
storageManager.add('my-storage', {
  load(keys) {
    // 加载逻辑
    return Promise.resolve(data);
  },
  store(data) {
    // 保存逻辑
    return Promise.resolve();
  }
});
```

## 事件系统

GrapesJS 提供了丰富的事件系统，允许监听各种操作。

```javascript
// 组件事件
editor.on('component:add', (component) => {
  console.log('组件已添加', component);
});

editor.on('component:remove', (component) => {
  console.log('组件已删除', component);
});

editor.on('component:update', (component, property, value) => {
  console.log('组件已更新', component, property, value);
});

// 选择事件
editor.on('component:selected', (component) => {
  console.log('组件已选中', component);
});

editor.on('component:deselected', (component) => {
  console.log('组件已取消选中', component);
});

// 块事件
editor.on('block:add', (block) => {
  console.log('块已添加', block);
});

// 画布事件
editor.on('canvas:drop', (dataTransfer, component) => {
  console.log('元素已放置到画布', component);
});

// 存储事件
editor.on('storage:start', () => {
  console.log('开始保存');
});

editor.on('storage:end', () => {
  console.log('保存完成');
});
```

## 常用配置选项

```javascript
const editor = grapesjs.init({
  // 基本配置
  container: '#gjs',
  height: '100vh',
  width: 'auto',
  
  // 初始内容
  components: '<div>初始内容</div>',
  style: '.my-class { color: red }',
  
  // 存储配置
  storageManager: {
    type: 'local',
    autosave: true,
    autoload: true
  },
  
  // 资源管理器配置
  assetManager: {
    upload: 'https://endpoint/upload/assets',
    uploadName: 'files'
  },
  
  // 块管理器配置
  blockManager: {
    appendTo: '#blocks'
  },
  
  // 样式管理器配置
  styleManager: {
    appendTo: '#styles',
    sectors: [
      {
        name: '常规',
        open: false,
        properties: [
          'display',
          'position',
          'top',
          'right',
          'left',
          'bottom'
        ]
      }
    ]
  },
  
  // 面板配置
  panels: {
    defaults: [
      {
        id: 'layers',
        el: '.panel__right',
        resizable: {
          maxDim: 350,
          minDim: 200,
          tc: 0,
          cl: 1,
          cr: 0,
          bc: 0,
          keyWidth: 'flex-basis'
        }
      }
    ]
  }
});
```

## 最佳实践

### 1. 性能优化

```javascript
// 批量操作时暂停更新
editor.UndoManager.stop();
// 执行批量操作
components.addComponent(/* ... */);
components.addComponent(/* ... */);
// 恢复更新
editor.UndoManager.start();

// 使用事件委托而不是为每个组件绑定事件
editor.on('component:selected', (component) => {
  if (component.get('type') === 'my-type') {
    // 处理特定类型的组件
  }
});
```

### 2. 错误处理

```javascript
// 监听错误事件
editor.on('canvas:drop:error', (error) => {
  console.error('拖放错误:', error);
});

// 安全地访问组件属性
const component = editor.getSelected();
if (component) {
  const type = component.get('type');
  // 安全操作
}
```

### 3. 内存管理

```javascript
// 清理事件监听器
const handler = (component) => {
  // 处理逻辑
};

editor.on('component:add', handler);

// 在适当时机移除监听器
editor.off('component:add', handler);

// 销毁编辑器
editor.destroy();
```

## 调试技巧

```javascript
// 启用调试模式
window.grapesjs = grapesjs;
window.editor = editor;

// 在控制台中访问
console.log(editor.getHtml());
console.log(editor.getCss());
console.log(editor.getComponents());

// 监听所有事件（调试用）
editor.on('all', (eventName, ...args) => {
  console.log('事件:', eventName, args);
});
```

这个 API 参考指南涵盖了 GrapesJS 的主要功能模块。建议结合官方文档和实际项目需求来深入学习每个模块的详细用法。