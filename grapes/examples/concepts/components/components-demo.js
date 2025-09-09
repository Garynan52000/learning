/**
 * GrapesJS Components 概念演示
 * 展示组件系统的核心功能：组件创建、识别、自定义等
 */

// 初始化编辑器
const editor = grapesjs.init({
    container: '#gjs',
    height: '100%',
    width: 'auto',
    storageManager: false,
    panels: { defaults: [] }, // 隐藏默认面板，专注于组件概念
    
    // 初始内容 - 展示不同类型的组件
    components: `
        <div class="demo-wrapper">
            <h1>Components 概念演示</h1>
            <p>这是一个文本组件，可以直接编辑内容</p>
            
            <img src="https://via.placeholder.com/200x100/4CAF50/white?text=Image+Component" 
                 alt="图片组件示例" class="demo-image" />
            
            <a href="#" class="demo-link">这是一个链接组件</a>
            
            <div class="custom-card">
                <h3>自定义卡片组件</h3>
                <p>这是一个自定义的卡片组件示例</p>
            </div>
            
            <table class="demo-table">
                <tr>
                    <th>表格组件</th>
                    <th>演示</th>
                </tr>
                <tr>
                    <td>单元格1</td>
                    <td>单元格2</td>
                </tr>
            </table>
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
        .demo-wrapper p {
            line-height: 1.6;
            margin: 15px 0;
        }
        .demo-image {
            display: block;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .demo-link {
            color: #2196F3;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            margin: 15px 0;
        }
        .demo-link:hover {
            text-decoration: underline;
        }
        .custom-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .custom-card h3 {
            margin: 0 0 10px 0;
            color: #495057;
        }
        .demo-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .demo-table th,
        .demo-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        .demo-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
    `
});

// 定义自定义组件类型
editor.Components.addType('custom-card', {
    // 组件识别函数
    isComponent: (el) => {
        return el.classList && el.classList.contains('custom-card');
    },
    
    // 组件模型定义
    model: {
        defaults: {
            tagName: 'div',
            classes: ['custom-card'],
            traits: [
                {
                    type: 'text',
                    name: 'title',
                    label: '卡片标题',
                    changeProp: 1
                },
                {
                    type: 'textarea',
                    name: 'description',
                    label: '卡片描述',
                    changeProp: 1
                }
            ],
            
            // 自定义属性
            title: '自定义卡片组件',
            description: '这是一个自定义的卡片组件示例'
        },
        
        // 初始化方法
        init() {
            console.log('自定义卡片组件初始化');
            this.updateContent();
            
            // 监听属性变化
            this.on('change:title change:description', this.updateContent);
        },
        
        // 更新内容方法
        updateContent() {
            const title = this.get('title');
            const description = this.get('description');
            
            this.components(`
                <h3>${title}</h3>
                <p>${description}</p>
            `);
        }
    },
    
    // 组件视图定义
    view: {
        events: {
            dblclick: 'onDoubleClick'
        },
        
        onDoubleClick() {
            console.log('双击了自定义卡片组件');
        }
    }
});

// 组件选择事件监听
editor.on('component:selected', (component) => {
    updateComponentInfo(component);
});

editor.on('component:deselected', () => {
    updateComponentInfo(null);
});

// 更新组件信息显示
function updateComponentInfo(component) {
    const detailsEl = document.getElementById('component-details');
    
    if (!component) {
        detailsEl.innerHTML = '请在编辑器中选择一个组件';
        return;
    }
    
    const componentType = component.get('type');
    const componentTag = component.get('tagName');
    const componentClasses = component.get('classes');
    const componentId = component.getId();
    
    detailsEl.innerHTML = `
        <div><strong>组件ID:</strong> ${componentId}</div>
        <div><strong>组件类型:</strong> ${componentType}</div>
        <div><strong>HTML标签:</strong> ${componentTag}</div>
        <div><strong>CSS类:</strong> ${componentClasses ? (Array.isArray(componentClasses) ? componentClasses.join(' ') : componentClasses.toString()) : '无'}</div>
        <div><strong>是否可编辑:</strong> ${component.get('editable') ? '是' : '否'}</div>
        <div><strong>是否可拖拽:</strong> ${component.get('draggable') ? '是' : '否'}</div>
        <div><strong>是否可删除:</strong> ${component.get('removable') ? '是' : '否'}</div>
    `;
}

// 演示组件API的使用
function demonstrateComponentsAPI() {
    console.log('=== Components API 演示 ===');
    
    // 获取组件管理器
    const components = editor.Components;
    
    // 获取根组件
    const wrapper = components.getWrapper();
    console.log('根组件:', wrapper);
    
    // 获取所有组件
    const allComponents = wrapper.find('*');
    console.log('所有组件数量:', allComponents.length);
    
    // 按类型查找组件
    const textComponents = wrapper.find('[data-gjs-type="text"]');
    console.log('文本组件数量:', textComponents.length);
    
    // 按类名查找组件
    const customCards = wrapper.find('.custom-card');
    console.log('自定义卡片组件数量:', customCards.length);
    
    // 动态添加组件
    const newComponent = components.addComponent({
        type: 'text',
        content: '这是动态添加的文本组件',
        style: {
            color: 'red',
            'font-weight': 'bold',
            margin: '10px 0'
        }
    });
    
    // 将新组件添加到根容器
    wrapper.append(newComponent);
    console.log('动态添加了新组件:', newComponent);
}

// 页面加载完成后执行演示
editor.on('load', () => {
    console.log('编辑器加载完成');
    demonstrateComponentsAPI();
    
    // 默认选中第一个组件
    const firstComponent = editor.Components.getWrapper().find('h1')[0];
    if (firstComponent) {
        editor.select(firstComponent);
    }
});

// 导出编辑器实例供调试使用
window.editor = editor;
window.demonstrateComponentsAPI = demonstrateComponentsAPI;

console.log('Components 概念演示已加载。可以在控制台中使用 editor 和 demonstrateComponentsAPI() 进行调试。');