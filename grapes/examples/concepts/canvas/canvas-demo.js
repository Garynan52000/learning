/**
 * GrapesJS Canvas 概念演示
 * 展示Canvas的核心功能：缩放、坐标、拖拽、事件等
 */

// 初始化编辑器
const editor = grapesjs.init({
    container: '#gjs',
    height: '100%',
    width: 'auto',
    storageManager: false,
    
    // 隐藏默认面板，专注于画布功能
    panels: { defaults: [] },
    
    // 画布配置
    canvas: {
        // 自定义画布配置
        scripts: [],
        styles: []
    },
    
    // 初始内容
    components: `
        <div class="demo-wrapper">
            <h1>Canvas 概念演示</h1>
            <p>这个演示展示了 GrapesJS 画布的各种功能</p>
            
            <div class="draggable-box" draggable="true">
                <h3>可拖拽元素</h3>
                <p>尝试拖拽这个元素到其他位置</p>
            </div>
            
            <div class="zoom-test-area">
                <h3>缩放测试区域</h3>
                <p>使用上方的缩放控件来测试画布缩放功能</p>
                <div class="small-elements">
                    <span class="small-box">小元素1</span>
                    <span class="small-box">小元素2</span>
                    <span class="small-box">小元素3</span>
                </div>
            </div>
            
            <div class="coordinate-test">
                <h3>坐标测试</h3>
                <p>点击"居中画布"按钮来测试坐标功能</p>
            </div>
            
            <div class="drop-zone" id="custom-drop-zone">
                <p>自定义拖拽区域</p>
                <p>拖拽外部内容到这里</p>
            </div>
        </div>
    `,
    
    // 样式
    style: `
        .demo-wrapper {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
        }
        .demo-wrapper h1 {
            color: #2c5aa0;
            text-align: center;
            margin-bottom: 30px;
        }
        .draggable-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            cursor: move;
            transition: transform 0.2s;
        }
        .draggable-box:hover {
            transform: translateY(-2px);
        }
        .draggable-box h3 {
            margin: 0 0 10px 0;
        }
        .zoom-test-area {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .zoom-test-area h3 {
            margin: 0 0 15px 0;
            color: #495057;
        }
        .small-elements {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .small-box {
            background: #007bff;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
        }
        .coordinate-test {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .coordinate-test h3 {
            margin: 0 0 10px 0;
            color: #856404;
        }
        .drop-zone {
            min-height: 120px;
            border: 2px dashed #28a745;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            background: #d4edda;
            color: #155724;
            transition: all 0.3s;
        }
        .drop-zone.drag-over {
            background: #c3e6cb;
            border-color: #1e7e34;
        }
        .drop-zone p {
            margin: 5px 0;
            font-weight: bold;
        }
    `
});

// 获取画布实例
const canvas = editor.Canvas;

// 事件日志
const eventLog = [];
const maxLogEntries = 50;

// 添加事件到日志
function addEventLog(eventType, details = '') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${eventType}${details ? ': ' + details : ''}`;
    
    eventLog.unshift(logEntry);
    if (eventLog.length > maxLogEntries) {
        eventLog.pop();
    }
    
    updateEventLogDisplay();
}

// 更新事件日志显示
function updateEventLogDisplay() {
    const logEl = document.getElementById('event-log');
    logEl.innerHTML = eventLog.map(entry => 
        `<div class="event-log">${entry}</div>`
    ).join('');
}

// 更新画布信息显示
function updateCanvasInfo() {
    const detailsEl = document.getElementById('canvas-details');
    const zoom = canvas.getZoom();
    const coords = canvas.getCoords();
    const rect = canvas.getRect();
    
    detailsEl.innerHTML = `
        <div><strong>缩放级别:</strong> ${zoom}%</div>
        <div><strong>画布坐标:</strong> (${coords.x}, ${coords.y})</div>
        <div><strong>画布尺寸:</strong> ${Math.round(rect.width)} × ${Math.round(rect.height)}</div>
        <div><strong>是否聚焦:</strong> ${canvas.hasFocus() ? '是' : '否'}</div>
    `;
}

// 监听画布事件
editor.on('canvas:dragenter', (dataTransfer) => {
    addEventLog('拖拽进入', '有内容被拖拽到画布');
});

editor.on('canvas:dragover', (dataTransfer) => {
    // 这个事件触发频繁，我们只记录第一次
    if (!window.dragOverLogged) {
        addEventLog('拖拽悬停', '内容在画布上拖拽');
        window.dragOverLogged = true;
        setTimeout(() => { window.dragOverLogged = false; }, 1000);
    }
});

editor.on('canvas:drop', (dataTransfer, component) => {
    addEventLog('拖拽放置', `组件已放置: ${component ? component.get('type') : '未知'}`);
});

editor.on('canvas:dragend', (dataTransfer) => {
    addEventLog('拖拽结束', '拖拽操作已结束');
});

editor.on('canvas:zoom', () => {
    const zoom = canvas.getZoom();
    addEventLog('缩放变化', `新缩放级别: ${zoom}%`);
    updateCanvasInfo();
    updateZoomDisplay();
});

editor.on('canvas:coords', () => {
    const coords = canvas.getCoords();
    addEventLog('坐标变化', `新坐标: (${coords.x}, ${coords.y})`);
    updateCanvasInfo();
    updateCoordsDisplay();
});

editor.on('canvas:refresh', (options) => {
    addEventLog('画布刷新', '画布已刷新');
});

editor.on('canvas:frame:load', ({ window: frameWindow }) => {
    addEventLog('框架加载', '画布框架已加载');
});

// 更新缩放显示
function updateZoomDisplay() {
    const zoom = canvas.getZoom();
    document.getElementById('zoom-display').textContent = `${zoom}%`;
    document.getElementById('zoom-slider').value = zoom;
}

// 更新坐标显示
function updateCoordsDisplay() {
    const coords = canvas.getCoords();
    document.getElementById('coords-display').textContent = `坐标: (${coords.x}, ${coords.y})`;
}

// 缩放控制
const zoomSlider = document.getElementById('zoom-slider');
zoomSlider.addEventListener('input', (e) => {
    const zoomValue = parseInt(e.target.value);
    canvas.setZoom(zoomValue);
});

// 重置缩放按钮
document.getElementById('reset-zoom').addEventListener('click', () => {
    canvas.setZoom(100);
    addEventLog('重置缩放', '缩放已重置为100%');
});

// 居中画布按钮
document.getElementById('center-canvas').addEventListener('click', () => {
    canvas.setCoords(0, 0);
    addEventLog('居中画布', '画布已居中');
});

// 刷新画布按钮
document.getElementById('refresh-canvas').addEventListener('click', () => {
    canvas.refresh();
    addEventLog('手动刷新', '用户手动刷新画布');
});

// 自定义拖拽功能演示
function setupCustomDragDemo() {
    const dropZone = document.getElementById('custom-drop-zone');
    
    // 创建可拖拽的外部元素
    const externalElement = document.createElement('div');
    externalElement.innerHTML = '拖拽我到画布';
    externalElement.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #ff6b6b;
        color: white;
        padding: 10px;
        border-radius: 5px;
        cursor: move;
        z-index: 1000;
        user-select: none;
    `;
    externalElement.draggable = true;
    
    externalElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/html', `
            <div style="background: #ff6b6b; color: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <h4 style="margin: 0 0 5px 0;">外部拖拽元素</h4>
                <p style="margin: 0;">这个元素是从外部拖拽进来的</p>
            </div>
        `);
        addEventLog('开始拖拽', '外部元素开始拖拽');
    });
    
    document.body.appendChild(externalElement);
}

// 演示画布API的使用
function demonstrateCanvasAPI() {
    console.log('=== Canvas API 演示 ===');
    
    // 获取画布信息
    console.log('画布元素:', canvas.getElement());
    console.log('框架元素:', canvas.getFrameEl());
    console.log('框架窗口:', canvas.getWindow());
    console.log('框架文档:', canvas.getDocument());
    console.log('框架body:', canvas.getBody());
    
    // 画布状态
    console.log('当前缩放:', canvas.getZoom());
    console.log('当前坐标:', canvas.getCoords());
    console.log('画布矩形:', canvas.getRect());
    console.log('是否聚焦:', canvas.hasFocus());
    
    // 演示自定义拖拽
    setTimeout(() => {
        console.log('演示自定义拖拽...');
        canvas.startDrag({
            content: `
                <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 8px; text-align: center;">
                    <h3 style="margin: 0 0 10px 0;">程序化拖拽</h3>
                    <p style="margin: 0;">这个元素是通过 API 创建的拖拽内容</p>
                </div>
            `
        });
        
        // 3秒后结束拖拽
        setTimeout(() => {
            canvas.endDrag();
            console.log('拖拽已结束');
        }, 3000);
    }, 2000);
}

// 页面加载完成后执行
editor.on('load', () => {
    console.log('编辑器加载完成');
    updateCanvasInfo();
    updateZoomDisplay();
    updateCoordsDisplay();
    setupCustomDragDemo();
    demonstrateCanvasAPI();
    
    addEventLog('编辑器初始化', '画布演示已准备就绪');
});

// 定期更新画布信息
setInterval(updateCanvasInfo, 2000);

// 导出函数供调试使用
window.editor = editor;
window.canvas = canvas;
window.demonstrateCanvasAPI = demonstrateCanvasAPI;
window.addEventLog = addEventLog;

console.log('Canvas 概念演示已加载。可以在控制台中使用相关函数进行调试。');
console.log('可用函数: demonstrateCanvasAPI(), addEventLog(type, details)');