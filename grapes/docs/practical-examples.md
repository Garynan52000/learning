# GrapesJS 实践示例集合

## 概述

本文档包含了从基础到高级的 GrapesJS 实践示例，帮助开发者快速上手和深入理解各种功能的使用方法。

## 基础示例

### 1. 最简单的编辑器

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>GrapesJS 基础示例</title>
    <link rel="stylesheet" href="https://unpkg.com/grapesjs/dist/css/grapes.min.css">
    <style>
        body, html {
            margin: 0;
            height: 100%;
        }
        #gjs {
            height: 100vh;
        }
    </style>
</head>
<body>
    <div id="gjs"></div>
    
    <script src="https://unpkg.com/grapesjs"></script>
    <script>
        const editor = grapesjs.init({
            container: '#gjs',
            components: '<div class="hello">Hello World!</div>',
            style: '.hello { color: red; font-size: 24px; }'
        });
    </script>
</body>
</html>
```

### 2. 带有基本块的编辑器

```javascript
const editor = grapesjs.init({
    container: '#gjs',
    height: '100vh',
    width: 'auto',
    
    // 初始化块管理器
    blockManager: {
        appendTo: '#blocks'
    },
    
    // 添加基本块
    plugins: ['gjs-blocks-basic'],
    
    // 自定义块
    blocks: [
        {
            id: 'section',
            label: '区域',
            attributes: { class: 'gjs-block-section' },
            content: `<section>
                <h1>标题</h1>
                <div>这是一个区域内容</div>
            </section>`
        },
        {
            id: 'text',
            label: '文本',
            content: '<div data-gjs-type="text">插入你的文本</div>'
        },
        {
            id: 'image',
            label: '图片',
            select: true,
            content: { type: 'image' },
            activate: true
        }
    ]
});

// 添加自定义块
editor.BlockManager.add('my-block', {
    label: '我的块',
    category: '自定义',
    content: '<div class="my-custom-block">自定义内容</div>',
    media: '<i class="fa fa-cube"></i>'
});
```

### 3. 配置样式管理器

```javascript
const editor = grapesjs.init({
    container: '#gjs',
    
    styleManager: {
        appendTo: '#styles',
        sectors: [
            {
                name: '布局',
                open: false,
                buildProps: ['width', 'min-height', 'padding'],
                properties: [
                    {
                        type: 'integer',
                        name: '宽度',
                        property: 'width',
                        units: ['px', '%'],
                        defaults: 'auto',
                        min: 0
                    }
                ]
            },
            {
                name: '装饰',
                open: false,
                buildProps: ['opacity', 'border-radius', 'border', 'box-shadow', 'background-bg'],
                properties: [
                    {
                        id: 'opacity',
                        type: 'slider',
                        property: 'opacity',
                        defaults: 1,
                        step: 0.01,
                        max: 1,
                        min: 0
                    }
                ]
            },
            {
                name: '文字',
                open: false,
                buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height'],
                properties: [
                    {
                        name: '字体',
                        property: 'font-family',
                        type: 'select',
                        defaults: 'Arial, Helvetica, sans-serif',
                        options: [
                            { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
                            { name: 'Helvetica', value: 'Helvetica, sans-serif' },
                            { name: 'Times New Roman', value: 'Times New Roman, serif' },
                            { name: '微软雅黑', value: 'Microsoft YaHei, sans-serif' }
                        ]
                    }
                ]
            }
        ]
    }
});
```

## 中级示例

### 4. 自定义组件类型

```javascript
// 定义自定义组件类型
editor.DomComponents.addType('countdown', {
    model: {
        defaults: {
            tagName: 'div',
            classes: ['countdown'],
            droppable: false,
            traits: [
                {
                    type: 'text',
                    name: 'target-date',
                    label: '目标日期',
                    placeholder: '2024-12-31 23:59:59'
                },
                {
                    type: 'select',
                    name: 'format',
                    label: '显示格式',
                    options: [
                        { id: 'days', name: '天数' },
                        { id: 'full', name: '完整格式' }
                    ]
                }
            ]
        },
        
        init() {
            this.on('change:attributes', this.updateCountdown);
            this.updateCountdown();
        },
        
        updateCountdown() {
            const targetDate = this.getAttributes()['target-date'];
            const format = this.getAttributes()['format'] || 'days';
            
            if (targetDate) {
                const target = new Date(targetDate);
                const now = new Date();
                const diff = target - now;
                
                let content;
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    
                    if (format === 'full') {
                        content = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
                    } else {
                        content = `还有 ${days} 天`;
                    }
                } else {
                    content = '时间已到！';
                }
                
                this.set('content', content);
            }
        }
    },
    
    view: {
        onRender() {
            // 在预览模式下启动倒计时
            if (this.model.get('target-date')) {
                this.startCountdown();
            }
        },
        
        startCountdown() {
            setInterval(() => {
                this.model.updateCountdown();
            }, 1000);
        }
    }
});

// 添加倒计时块
editor.BlockManager.add('countdown', {
    label: '倒计时',
    category: '高级',
    content: { type: 'countdown' },
    media: '<i class="fa fa-clock-o"></i>'
});
```

### 5. 自定义命令

```javascript
// 添加导出命令
editor.Commands.add('export-template', {
    run(editor, sender, options) {
        const html = editor.getHtml();
        const css = editor.getCss();
        
        const fullTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>导出的模板</title>
    <style>
        ${css}
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
        
        // 创建下载链接
        const blob = new Blob([fullTemplate], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'template.html';
        a.click();
        URL.revokeObjectURL(url);
        
        sender && sender.set('active', false);
    }
});

// 添加清空画布命令
editor.Commands.add('clear-canvas', {
    run(editor) {
        if (confirm('确定要清空画布吗？此操作不可撤销。')) {
            editor.DomComponents.clear();
            editor.CssComposer.clear();
        }
    }
});

// 添加预览命令
editor.Commands.add('preview-mode', {
    run(editor, sender) {
        const pnm = editor.Panels;
        const commands = editor.Commands;
        
        if (!sender.get('active')) {
            sender.set('active', true);
            
            // 隐藏面板
            pnm.getPanel('views-container').set('visible', false);
            pnm.getPanel('devices-c').set('visible', false);
            
            // 禁用选择
            commands.run('core:component-outline', { disable: 1 });
            
            // 添加预览样式
            editor.Canvas.getBody().style.pointerEvents = 'all';
        } else {
            sender.set('active', false);
            
            // 显示面板
            pnm.getPanel('views-container').set('visible', true);
            pnm.getPanel('devices-c').set('visible', true);
            
            // 启用选择
            commands.stop('core:component-outline', { disable: 1 });
            
            // 移除预览样式
            editor.Canvas.getBody().style.pointerEvents = '';
        }
    }
});
```

### 6. 资源管理器集成

```javascript
const editor = grapesjs.init({
    container: '#gjs',
    
    assetManager: {
        // 上传端点
        upload: '/upload-assets',
        uploadName: 'files',
        
        // 自定义上传处理
        uploadFile(e) {
            const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
            const formData = new FormData();
            
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
            
            fetch('/upload-assets', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // 添加上传的资源到管理器
                data.forEach(asset => {
                    editor.AssetManager.add(asset);
                });
            })
            .catch(error => {
                console.error('上传失败:', error);
            });
        },
        
        // 预定义资源
        assets: [
            {
                type: 'image',
                src: 'https://via.placeholder.com/350x250/78c5d6/fff',
                name: '占位图 1'
            },
            {
                type: 'image', 
                src: 'https://via.placeholder.com/350x250/459ba8/fff',
                name: '占位图 2'
            }
        ]
    }
});

// 自定义资源选择处理
editor.AssetManager.open({
    select(asset, complete) {
        const selected = editor.getSelected();
        
        if (selected) {
            if (selected.is('image')) {
                selected.addAttributes({ src: asset.getSrc() });
            } else {
                // 为其他元素设置背景图片
                selected.addStyle({ 'background-image': `url(${asset.getSrc()})` });
            }
            
            complete && editor.AssetManager.close();
        }
    }
});
```

## 高级示例

### 7. 插件开发

```javascript
// 创建一个表单构建器插件
const formBuilderPlugin = (editor, options = {}) => {
    const defaultOptions = {
        blocks: ['form', 'input', 'textarea', 'select', 'button'],
        category: '表单'
    };
    
    const opts = { ...defaultOptions, ...options };
    
    // 添加表单组件类型
    editor.DomComponents.addType('form', {
        model: {
            defaults: {
                tagName: 'form',
                droppable: true,
                traits: [
                    {
                        type: 'text',
                        name: 'action',
                        label: '提交地址'
                    },
                    {
                        type: 'select',
                        name: 'method',
                        label: '提交方式',
                        options: [
                            { id: 'get', name: 'GET' },
                            { id: 'post', name: 'POST' }
                        ]
                    }
                ]
            }
        }
    });
    
    // 添加输入框组件类型
    editor.DomComponents.addType('input', {
        model: {
            defaults: {
                tagName: 'input',
                droppable: false,
                attributes: { type: 'text' },
                traits: [
                    {
                        type: 'select',
                        name: 'type',
                        label: '类型',
                        options: [
                            { id: 'text', name: '文本' },
                            { id: 'email', name: '邮箱' },
                            { id: 'password', name: '密码' },
                            { id: 'number', name: '数字' }
                        ]
                    },
                    {
                        type: 'text',
                        name: 'name',
                        label: '字段名'
                    },
                    {
                        type: 'text',
                        name: 'placeholder',
                        label: '占位符'
                    },
                    {
                        type: 'checkbox',
                        name: 'required',
                        label: '必填'
                    }
                ]
            }
        }
    });
    
    // 添加块
    if (opts.blocks.includes('form')) {
        editor.BlockManager.add('form', {
            label: '表单',
            category: opts.category,
            content: { type: 'form' },
            media: '<i class="fa fa-wpforms"></i>'
        });
    }
    
    if (opts.blocks.includes('input')) {
        editor.BlockManager.add('input', {
            label: '输入框',
            category: opts.category,
            content: { type: 'input' },
            media: '<i class="fa fa-i-cursor"></i>'
        });
    }
    
    // 添加表单验证命令
    editor.Commands.add('validate-form', {
        run(editor) {
            const wrapper = editor.DomComponents.getWrapper();
            const forms = wrapper.find('[data-gjs-type="form"]');
            
            forms.forEach(form => {
                const inputs = form.find('[data-gjs-type="input"]');
                let isValid = true;
                
                inputs.forEach(input => {
                    const required = input.getAttributes().required;
                    const value = input.getAttributes().value;
                    
                    if (required && !value) {
                        isValid = false;
                        input.addStyle({ 'border-color': 'red' });
                    } else {
                        input.addStyle({ 'border-color': '' });
                    }
                });
                
                console.log(`表单验证结果: ${isValid ? '通过' : '失败'}`);
            });
        }
    });
};

// 使用插件
const editor = grapesjs.init({
    container: '#gjs',
    plugins: [formBuilderPlugin],
    pluginsOpts: {
        [formBuilderPlugin]: {
            category: '表单组件'
        }
    }
});
```

### 8. 响应式设计

```javascript
const editor = grapesjs.init({
    container: '#gjs',
    
    // 设备管理器配置
    deviceManager: {
        devices: [
            {
                name: '桌面',
                width: '',
                widthMedia: '1024px'
            },
            {
                name: '平板',
                width: '768px',
                widthMedia: '768px'
            },
            {
                name: '手机',
                width: '375px',
                widthMedia: '480px'
            }
        ]
    },
    
    // 样式管理器支持响应式
    styleManager: {
        sectors: [
            {
                name: '响应式布局',
                properties: [
                    {
                        property: 'display',
                        type: 'select',
                        defaults: 'block',
                        options: [
                            { value: 'block', name: '块级' },
                            { value: 'inline-block', name: '行内块' },
                            { value: 'flex', name: '弹性布局' },
                            { value: 'none', name: '隐藏' }
                        ]
                    },
                    {
                        property: 'width',
                        type: 'integer',
                        units: ['px', '%', 'vw'],
                        min: 0
                    },
                    {
                        property: 'flex-direction',
                        type: 'radio',
                        defaults: 'row',
                        options: [
                            { value: 'row', name: '水平' },
                            { value: 'column', name: '垂直' }
                        ]
                    }
                ]
            }
        ]
    }
});

// 监听设备切换
editor.on('change:device', () => {
    const device = editor.getDevice();
    console.log('当前设备:', device);
    
    // 根据设备调整编辑器行为
    if (device === '手机') {
        // 手机模式下的特殊处理
        editor.Canvas.getBody().style.fontSize = '14px';
    } else {
        editor.Canvas.getBody().style.fontSize = '';
    }
});

// 添加响应式辅助命令
editor.Commands.add('toggle-device-preview', {
    run(editor, sender) {
        const devices = ['桌面', '平板', '手机'];
        const currentDevice = editor.getDevice();
        const currentIndex = devices.indexOf(currentDevice);
        const nextIndex = (currentIndex + 1) % devices.length;
        
        editor.setDevice(devices[nextIndex]);
    }
});
```

### 9. 数据持久化

```javascript
// 自定义存储适配器
class CustomStorageAdapter {
    constructor(options = {}) {
        this.options = options;
        this.apiBase = options.apiBase || '/api';
    }
    
    async load(keys) {
        try {
            const response = await fetch(`${this.apiBase}/templates/${this.options.templateId}`);
            const data = await response.json();
            
            return {
                'gjs-components': data.components || '',
                'gjs-styles': data.styles || '',
                'gjs-html': data.html || '',
                'gjs-css': data.css || ''
            };
        } catch (error) {
            console.error('加载失败:', error);
            return {};
        }
    }
    
    async store(data) {
        try {
            const payload = {
                components: data['gjs-components'],
                styles: data['gjs-styles'],
                html: data['gjs-html'],
                css: data['gjs-css'],
                updatedAt: new Date().toISOString()
            };
            
            const response = await fetch(`${this.apiBase}/templates/${this.options.templateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error('保存失败');
            }
            
            console.log('保存成功');
        } catch (error) {
            console.error('保存失败:', error);
            throw error;
        }
    }
}

// 配置编辑器使用自定义存储
const editor = grapesjs.init({
    container: '#gjs',
    
    storageManager: {
        type: 'remote',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 3
    }
});

// 注册自定义存储适配器
editor.StorageManager.add('remote', new CustomStorageAdapter({
    templateId: 'template-123',
    apiBase: '/api'
}));

// 添加手动保存命令
editor.Commands.add('save-template', {
    run(editor, sender) {
        sender && sender.set('active', true);
        
        editor.store().then(() => {
            alert('保存成功！');
        }).catch(error => {
            alert('保存失败: ' + error.message);
        }).finally(() => {
            sender && sender.set('active', false);
        });
    }
});

// 监听存储事件
editor.on('storage:start', () => {
    console.log('开始保存...');
});

editor.on('storage:end', () => {
    console.log('保存完成');
});

editor.on('storage:error', (error) => {
    console.error('存储错误:', error);
});
```

### 10. 完整的编辑器配置

```javascript
const editor = grapesjs.init({
    container: '#gjs',
    height: '100vh',
    width: 'auto',
    
    // 存储配置
    storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 3
    },
    
    // 块管理器
    blockManager: {
        appendTo: '#blocks',
        blocks: [
            {
                id: 'section',
                label: '区域',
                attributes: { class: 'gjs-block-section' },
                content: `<section class="section">
                    <div class="container">
                        <h2>标题</h2>
                        <p>内容描述</p>
                    </div>
                </section>`
            },
            {
                id: 'text',
                label: '文本',
                content: '<div data-gjs-type="text">插入文本</div>'
            },
            {
                id: 'image',
                label: '图片',
                content: { type: 'image' },
                activate: true
            }
        ]
    },
    
    // 样式管理器
    styleManager: {
        appendTo: '#styles',
        sectors: [
            {
                name: '常规',
                open: false,
                buildProps: ['width', 'height', 'min-height', 'padding', 'margin']
            },
            {
                name: '文字',
                open: false,
                buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align']
            },
            {
                name: '装饰',
                open: false,
                buildProps: ['opacity', 'border-radius', 'border', 'box-shadow', 'background']
            },
            {
                name: '弹性布局',
                open: false,
                buildProps: ['flex-direction', 'justify-content', 'align-items', 'flex-wrap', 'align-content']
            }
        ]
    },
    
    // 层级管理器
    layerManager: {
        appendTo: '#layers'
    },
    
    // 特征管理器
    traitManager: {
        appendTo: '#traits'
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
            },
            {
                id: 'panel-switcher',
                el: '.panel__switcher',
                buttons: [
                    {
                        id: 'show-layers',
                        active: true,
                        label: '图层',
                        command: 'show-layers'
                    },
                    {
                        id: 'show-style',
                        active: true,
                        label: '样式',
                        command: 'show-styles'
                    },
                    {
                        id: 'show-traits',
                        active: true,
                        label: '属性',
                        command: 'show-traits'
                    }
                ]
            },
            {
                id: 'panel-devices',
                el: '.panel__devices',
                buttons: [
                    {
                        id: 'device-desktop',
                        label: '桌面',
                        command: 'set-device-desktop',
                        active: true
                    },
                    {
                        id: 'device-tablet',
                        label: '平板',
                        command: 'set-device-tablet'
                    },
                    {
                        id: 'device-mobile',
                        label: '手机',
                        command: 'set-device-mobile'
                    }
                ]
            },
            {
                id: 'panel-top',
                el: '.panel__top',
                buttons: [
                    {
                        id: 'visibility',
                        active: true,
                        className: 'btn-toggle-borders',
                        label: '边框',
                        command: 'sw-visibility'
                    },
                    {
                        id: 'export',
                        className: 'btn-open-export',
                        label: '导出',
                        command: 'export-template'
                    },
                    {
                        id: 'show-json',
                        className: 'btn-show-json',
                        label: 'JSON',
                        command: 'show-json'
                    }
                ]
            }
        ]
    },
    
    // 设备管理器
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
    },
    
    // 资源管理器
    assetManager: {
        upload: '/upload-assets',
        uploadName: 'files'
    },
    
    // 画布配置
    canvas: {
        styles: [
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ],
        scripts: [
            'https://code.jquery.com/jquery-3.3.1.slim.min.js'
        ]
    }
});

// 添加自定义命令
editor.Commands.add('set-device-desktop', {
    run: editor => editor.setDevice('桌面')
});

editor.Commands.add('set-device-tablet', {
    run: editor => editor.setDevice('平板')
});

editor.Commands.add('set-device-mobile', {
    run: editor => editor.setDevice('手机')
});

editor.Commands.add('show-layers', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getLayersEl(row) { return row.querySelector('.layers-container') },
    
    run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
    },
    stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
    }
});

editor.Commands.add('show-styles', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getStyleEl(row) { return row.querySelector('.styles-container') },
    
    run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
    },
    stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
    }
});

// 监听编辑器事件
editor.on('load', () => {
    console.log('编辑器加载完成');
});

editor.on('component:selected', component => {
    console.log('选中组件:', component.get('tagName'));
});

editor.on('component:deselected', component => {
    console.log('取消选中组件:', component.get('tagName'));
});
```

## 总结

这些示例涵盖了 GrapesJS 的主要功能和使用场景：

1. **基础示例**：帮助快速上手
2. **中级示例**：展示核心功能的深度使用
3. **高级示例**：演示复杂场景和自定义开发

建议按照示例的复杂度逐步学习，每个示例都可以作为独立的学习项目。在实际开发中，可以根据需求组合使用这些功能。

记住在开发过程中：
- 始终参考官方文档
- 利用浏览器开发者工具调试
- 关注性能优化
- 保持代码的可维护性