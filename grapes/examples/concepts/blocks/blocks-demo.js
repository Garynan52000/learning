/**
 * GrapesJS Blocks 概念演示
 * 展示Block Manager的核心功能：添加块、分类管理、拖拽使用等
 */

// 初始化编辑器
const editor = grapesjs.init({
    container: '#gjs',
    height: '100%',
    width: 'auto',
    storageManager: false,
    
    // 配置块管理器
    blockManager: {
        appendTo: '#blocks',
        blocks: [] // 我们将手动添加块
    },
    
    // 隐藏默认面板
    panels: { defaults: [] },
    
    // 初始内容
    components: `
        <div class="demo-wrapper">
            <h1>Blocks 概念演示</h1>
            <p>从上方的块面板拖拽块到这里来创建内容</p>
            <div class="drop-zone">
                <p>拖拽区域 - 在这里放置块</p>
            </div>
        </div>
    `,
    
    // 样式
    style: `
        .demo-wrapper {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        .demo-wrapper h1 {
            color: #2c5aa0;
            text-align: center;
            margin-bottom: 30px;
        }
        .drop-zone {
            min-height: 200px;
            border: 2px dashed #ddd;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            background: #fafafa;
        }
        .card-block {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card-block h3 {
            margin: 0 0 10px 0;
            color: #333;
        }
        .hero-block {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 60px 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .hero-block h2 {
            margin: 0 0 15px 0;
            font-size: 2.5em;
        }
        .button-block {
            display: inline-block;
            background: #2196F3;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
        }
        .button-block:hover {
            background: #1976D2;
        }
        .gallery-block {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .gallery-item {
            aspect-ratio: 1;
            background: #f0f0f0;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
        }
    `
});

// 获取块管理器
const blockManager = editor.BlockManager;

// 添加基础文本块
blockManager.add('text-block', {
    id: 'text-block',
    label: '文本块',
    media: '📝',
    category: '基础',
    content: {
        type: 'text',
        content: '这是一个文本块，可以编辑内容',
        style: {
            padding: '15px',
            margin: '10px 0'
        }
    }
});

// 添加图片块
blockManager.add('image-block', {
    id: 'image-block',
    label: '图片块',
    media: '🖼️',
    category: '基础',
    content: {
        type: 'image',
        src: 'https://via.placeholder.com/300x200/4CAF50/white?text=Image+Block',
        style: {
            'max-width': '100%',
            'border-radius': '8px',
            margin: '15px 0'
        }
    }
});

// 添加按钮块
blockManager.add('button-block', {
    id: 'button-block',
    label: '按钮块',
    media: '🔘',
    category: '基础',
    content: {
        type: 'link',
        content: '点击按钮',
        classes: ['button-block'],
        attributes: {
            href: '#'
        }
    }
});

// 添加卡片块（复合组件）
blockManager.add('card-block', {
    id: 'card-block',
    label: '卡片块',
    media: '🃏',
    category: '布局',
    content: `
        <div class="card-block">
            <h3>卡片标题</h3>
            <p>这是卡片的描述内容，可以包含任何信息。</p>
            <a href="#" class="button-block">了解更多</a>
        </div>
    `
});

// 添加英雄区块
blockManager.add('hero-block', {
    id: 'hero-block',
    label: '英雄区块',
    media: '🦸',
    category: '布局',
    content: `
        <div class="hero-block">
            <h2>欢迎来到我们的网站</h2>
            <p>这是一个引人注目的英雄区块，用于展示重要信息</p>
            <a href="#" class="button-block" style="background: white; color: #333;">开始使用</a>
        </div>
    `
});

// 添加画廊块
blockManager.add('gallery-block', {
    id: 'gallery-block',
    label: '画廊块',
    media: '🖼️',
    category: '布局',
    content: `
        <div class="gallery-block">
            <div class="gallery-item">图片 1</div>
            <div class="gallery-item">图片 2</div>
            <div class="gallery-item">图片 3</div>
            <div class="gallery-item">图片 4</div>
        </div>
    `
});

// 添加分隔线块
blockManager.add('divider-block', {
    id: 'divider-block',
    label: '分隔线',
    media: '➖',
    category: '基础',
    content: {
        tagName: 'hr',
        style: {
            border: 'none',
            'border-top': '2px solid #e0e0e0',
            margin: '30px 0'
        }
    }
});

// 添加自定义HTML块
blockManager.add('custom-html', {
    id: 'custom-html',
    label: '自定义HTML',
    media: '⚡',
    category: '高级',
    content: `
        <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 15px 0;">
            <h4 style="margin: 0 0 10px 0; color: #495057;">自定义HTML块</h4>
            <p style="margin: 0; color: #6c757d;">这是一个包含自定义HTML和内联样式的块</p>
        </div>
    `
});

// 监听块的添加事件
blockManager.on('add', (block) => {
    console.log('添加了新块:', block.get('id'));
    updateBlocksInfo();
});

// 监听块的移除事件
blockManager.on('remove', (block) => {
    console.log('移除了块:', block.get('id'));
    updateBlocksInfo();
});

// 监听组件添加事件（当块被拖拽到画布时）
editor.on('component:add', (component) => {
    console.log('组件已添加到画布:', component.get('type'));
});

// 更新块信息显示
function updateBlocksInfo() {
    const detailsEl = document.getElementById('blocks-details');
    const allBlocks = blockManager.getAll();
    
    // 按分类统计
    const categories = {};
    allBlocks.forEach(block => {
        const category = block.get('category') || '未分类';
        if (!categories[category]) {
            categories[category] = 0;
        }
        categories[category]++;
    });
    
    let html = `
        <div><strong>总块数:</strong> ${allBlocks.length}</div>
        <div><strong>分类统计:</strong></div>
    `;
    
    Object.entries(categories).forEach(([category, count]) => {
        html += `<div style="margin-left: 15px;">• ${category}: ${count}个</div>`;
    });
    
    detailsEl.innerHTML = html;
}

// 演示块管理器API的使用
function demonstrateBlocksAPI() {
    console.log('=== Blocks API 演示 ===');
    
    // 获取所有块
    const allBlocks = blockManager.getAll();
    console.log('所有块:', allBlocks.map(b => b.get('id')));
    
    // 按分类获取块
    const basicBlocks = allBlocks.filter(block => block.get('category') === '基础');
    console.log('基础分类的块:', basicBlocks.map(b => b.get('id')));
    
    // 获取特定块
    const textBlock = blockManager.get('text-block');
    console.log('文本块详情:', {
        id: textBlock.get('id'),
        label: textBlock.get('label'),
        category: textBlock.get('category')
    });
    
    // 动态添加新块
    blockManager.add('dynamic-block', {
        id: 'dynamic-block',
        label: '动态块',
        media: '⚡',
        category: '动态',
        content: {
            type: 'text',
            content: '这是一个动态添加的块',
            style: {
                background: '#fffbf0',
                border: '1px solid #ffc107',
                padding: '15px',
                'border-radius': '5px'
            }
        }
    });
    
    console.log('动态添加了新块');
}

// 移除动态块的函数
function removeDynamicBlock() {
    const dynamicBlock = blockManager.get('dynamic-block');
    if (dynamicBlock) {
        blockManager.remove('dynamic-block');
        console.log('移除了动态块');
    } else {
        console.log('动态块不存在');
    }
}

// 页面加载完成后执行
editor.on('load', () => {
    console.log('编辑器加载完成');
    updateBlocksInfo();
    demonstrateBlocksAPI();
});

// 导出函数供调试使用
window.editor = editor;
window.blockManager = blockManager;
window.demonstrateBlocksAPI = demonstrateBlocksAPI;
window.removeDynamicBlock = removeDynamicBlock;

console.log('Blocks 概念演示已加载。可以在控制台中使用相关函数进行调试。');
console.log('可用函数: demonstrateBlocksAPI(), removeDynamicBlock()');