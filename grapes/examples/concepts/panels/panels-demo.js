/**
 * GrapesJS Panels 概念演示
 * 展示Panels的核心功能：面板管理、按钮配置、自定义UI等
 */

// 初始化编辑器
const editor = grapesjs.init({
    container: '#gjs',
    height: '100%',
    width: 'auto',
    storageManager: false,
    
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
                    keyWidth: 'flex-basis',
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
                        command: 'show-layers',
                        togglable: false,
                    },
                    {
                        id: 'show-style',
                        active: false,
                        label: '样式',
                        command: 'show-styles',
                        togglable: false,
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
                        label: '<i class="fa fa-clone"></i>',
                        command: 'sw-visibility',
                        context: 'show-borders',
                        attributes: { title: '切换边框显示' }
                    },
                    {
                        id: 'export',
                        className: 'btn-open-export',
                        label: '<i class="fa fa-code"></i>',
                        command: 'export-template',
                        context: 'export-template',
                        attributes: { title: '查看代码' }
                    },
                    {
                        id: 'show-json',
                        className: 'btn-show-json',
                        label: '<i class="fa fa-file-code-o"></i>',
                        command: 'show-json',
                        attributes: { title: '显示 JSON' }
                    }
                ]
            },
            {
                id: 'panel-devices',
                el: '.panel__devices',
                buttons: [
                    {
                        id: 'device-desktop',
                        label: '<i class="fa fa-desktop"></i>',
                        command: 'set-device-desktop',
                        active: true,
                        attributes: { title: '桌面视图' }
                    },
                    {
                        id: 'device-tablet',
                        label: '<i class="fa fa-tablet"></i>',
                        command: 'set-device-tablet',
                        attributes: { title: '平板视图' }
                    },
                    {
                        id: 'device-mobile',
                        label: '<i class="fa fa-mobile"></i>',
                        command: 'set-device-mobile',
                        attributes: { title: '手机视图' }
                    }
                ]
            }
        ]
    },
    
    // 设备管理器配置
    deviceManager: {
        devices: [
            {
                name: 'Desktop',
                width: '',
            },
            {
                name: 'Tablet',
                width: '768px',
                widthMedia: '992px',
            },
            {
                name: 'Mobile',
                width: '320px',
                widthMedia: '768px',
            }
        ]
    },
    
    // 初始内容
    components: `
        <div class="demo-wrapper">
            <h1>Panels 概念演示</h1>
            <p>这个演示展示了 GrapesJS 面板系统的各种功能</p>
            
            <div class="panel-demo-section">
                <h2>面板功能测试</h2>
                <p>使用上方和右侧的面板来测试各种功能：</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h3>🎛️ 工具面板</h3>
                        <p>包含各种编辑工具和功能按钮</p>
                    </div>
                    
                    <div class="feature-card">
                        <h3>📱 设备面板</h3>
                        <p>切换不同设备视图进行响应式设计</p>
                    </div>
                    
                    <div class="feature-card">
                        <h3>🔧 自定义面板</h3>
                        <p>创建和管理自定义功能面板</p>
                    </div>
                    
                    <div class="feature-card">
                        <h3>📋 面板管理</h3>
                        <p>动态添加、移除和配置面板</p>
                    </div>
                </div>
            </div>
            
            <div class="interaction-area">
                <h2>交互测试区域</h2>
                <p>选择这些元素来测试面板的交互功能：</p>
                
                <div class="test-elements">
                    <button class="test-button">测试按钮</button>
                    <div class="test-box">测试盒子</div>
                    <span class="test-text">测试文本</span>
                </div>
            </div>
        </div>
        
        <!-- 面板容器 -->
        <div class="panel__top"></div>
        <div class="panel__right"></div>
        <div class="panel__devices"></div>
        <div class="panel__switcher"></div>
    `,
    
    // 样式
    style: `
        .demo-wrapper {
            padding: 30px;
            max-width: 1000px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
        }
        .demo-wrapper h1 {
            color: #2c5aa0;
            text-align: center;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        .demo-wrapper > p {
            text-align: center;
            color: #666;
            margin-bottom: 40px;
            font-size: 1.1em;
        }
        .panel-demo-section {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            border: 1px solid #e9ecef;
        }
        .panel-demo-section h2 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 1.8em;
        }
        .panel-demo-section > p {
            color: #6c757d;
            margin-bottom: 25px;
            line-height: 1.6;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .feature-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .feature-card h3 {
            color: #495057;
            margin-bottom: 10px;
            font-size: 1.2em;
        }
        .feature-card p {
            color: #6c757d;
            line-height: 1.5;
            margin: 0;
        }
        .interaction-area {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
        }
        .interaction-area h2 {
            margin-bottom: 15px;
            font-size: 1.8em;
        }
        .interaction-area > p {
            margin-bottom: 25px;
            opacity: 0.9;
            line-height: 1.6;
        }
        .test-elements {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            align-items: center;
        }
        .test-button {
            background: #28a745;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
        }
        .test-button:hover {
            background: #218838;
        }
        .test-box {
            background: #ffc107;
            color: #212529;
            padding: 15px 20px;
            border-radius: 6px;
            font-weight: bold;
            min-width: 120px;
            text-align: center;
        }
        .test-text {
            background: #17a2b8;
            color: white;
            padding: 10px 16px;
            border-radius: 6px;
            font-style: italic;
        }
        
        /* 面板容器样式 */
        .panel__top {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 40px;
            background: #2c3e50;
            z-index: 1000;
            display: flex;
            align-items: center;
            padding: 0 15px;
        }
        .panel__right {
            position: fixed;
            top: 40px;
            right: 0;
            width: 250px;
            height: calc(100vh - 40px);
            background: white;
            border-left: 1px solid #ddd;
            z-index: 999;
            overflow-y: auto;
        }
        .panel__devices {
            position: fixed;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: #34495e;
            border-radius: 0 0 8px 8px;
            z-index: 998;
            display: flex;
            padding: 8px;
        }
        .panel__switcher {
            position: fixed;
            top: 50px;
            right: 10px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 6px;
            z-index: 997;
            display: flex;
            flex-direction: column;
        }
    `
});

// 获取面板管理器实例
const panelManager = editor.Panels;

// 事件日志
const eventLog = [];
const maxLogEntries = 30;

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

// 更新面板信息显示
function updatePanelsInfo() {
    const infoEl = document.getElementById('panels-info');
    const panels = panelManager.getPanels();
    
    let panelInfo = '<h4>当前面板状态</h4>';
    
    panels.forEach(panel => {
        const isVisible = panel.get('visible') !== false;
        const buttonsCount = panel.get('buttons') ? panel.get('buttons').length : 0;
        
        panelInfo += `
            <div>
                <span class="status-indicator ${isVisible ? 'status-active' : 'status-inactive'}"></span>
                <strong>${panel.get('id')}</strong>: ${buttonsCount} 个按钮
            </div>
        `;
    });
    
    panelInfo += `<div style="margin-top: 10px; font-size: 12px; color: #666;">总计: ${panels.length} 个面板</div>`;
    
    infoEl.innerHTML = panelInfo;
}

// 自定义命令
editor.Commands.add('show-layers', {
    run(editor) {
        const lm = editor.LayerManager;
        const pn = editor.Panels;
        const id = 'layers-container';
        
        if (!pn.getPanel(id)) {
            pn.addPanel({
                id,
                el: '.panel__right',
                resizable: false,
            });
        }
        
        pn.getPanel(id).set('appendContent', lm.render()).trigger('change:appendContent');
        addEventLog('显示图层', '图层面板已激活');
    }
});

editor.Commands.add('show-styles', {
    run(editor) {
        const sm = editor.StyleManager;
        const pn = editor.Panels;
        const id = 'styles-container';
        
        if (!pn.getPanel(id)) {
            pn.addPanel({
                id,
                el: '.panel__right',
                resizable: false,
            });
        }
        
        pn.getPanel(id).set('appendContent', sm.render()).trigger('change:appendContent');
        addEventLog('显示样式', '样式面板已激活');
    }
});

editor.Commands.add('export-template', {
    run(editor) {
        const html = editor.getHtml();
        const css = editor.getCss();
        
        const exportWindow = window.open('', '_blank');
        exportWindow.document.write(`
            <html>
                <head>
                    <title>导出的代码</title>
                    <style>
                        body { font-family: monospace; padding: 20px; }
                        .code-section { margin: 20px 0; }
                        .code-section h3 { color: #333; }
                        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow: auto; }
                    </style>
                </head>
                <body>
                    <h2>导出的代码</h2>
                    <div class="code-section">
                        <h3>HTML:</h3>
                        <pre>${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                    </div>
                    <div class="code-section">
                        <h3>CSS:</h3>
                        <pre>${css}</pre>
                    </div>
                </body>
            </html>
        `);
        
        addEventLog('导出代码', '代码已在新窗口中打开');
    }
});

editor.Commands.add('show-json', {
    run(editor) {
        const json = JSON.stringify(editor.getProjectData(), null, 2);
        
        const jsonWindow = window.open('', '_blank');
        jsonWindow.document.write(`
            <html>
                <head>
                    <title>项目 JSON 数据</title>
                    <style>
                        body { font-family: monospace; padding: 20px; }
                        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow: auto; }
                    </style>
                </head>
                <body>
                    <h2>项目 JSON 数据</h2>
                    <pre>${json}</pre>
                </body>
            </html>
        `);
        
        addEventLog('显示JSON', 'JSON数据已在新窗口中打开');
    }
});

// 设备切换命令
['desktop', 'tablet', 'mobile'].forEach(device => {
    editor.Commands.add(`set-device-${device}`, {
        run(editor) {
            editor.setDevice(device.charAt(0).toUpperCase() + device.slice(1));
            addEventLog('设备切换', `已切换到${device}视图`);
        }
    });
});

// 自定义面板计数器
let customPanelCounter = 0;

// 控制按钮事件处理
document.getElementById('add-custom-panel').addEventListener('click', () => {
    customPanelCounter++;
    const panelId = `custom-panel-${customPanelCounter}`;
    
    panelManager.addPanel({
        id: panelId,
        el: '.panel__right',
        buttons: [
            {
                id: `custom-btn-${customPanelCounter}-1`,
                label: `自定义按钮 ${customPanelCounter}-1`,
                command: () => {
                    addEventLog('自定义按钮', `按钮 ${customPanelCounter}-1 被点击`);
                    alert(`自定义按钮 ${customPanelCounter}-1 被点击！`);
                }
            },
            {
                id: `custom-btn-${customPanelCounter}-2`,
                label: `自定义按钮 ${customPanelCounter}-2`,
                command: () => {
                    addEventLog('自定义按钮', `按钮 ${customPanelCounter}-2 被点击`);
                    alert(`自定义按钮 ${customPanelCounter}-2 被点击！`);
                }
            }
        ]
    });
    
    addEventLog('添加面板', `自定义面板 ${panelId} 已添加`);
    updatePanelsInfo();
});

document.getElementById('remove-custom-panel').addEventListener('click', () => {
    if (customPanelCounter > 0) {
        const panelId = `custom-panel-${customPanelCounter}`;
        panelManager.removePanel(panelId);
        customPanelCounter--;
        
        addEventLog('移除面板', `面板 ${panelId} 已移除`);
        updatePanelsInfo();
    } else {
        addEventLog('移除面板', '没有可移除的自定义面板');
    }
});

document.getElementById('toggle-panel-visibility').addEventListener('click', () => {
    const panels = panelManager.getPanels();
    let toggledCount = 0;
    
    panels.forEach(panel => {
        const currentVisibility = panel.get('visible') !== false;
        panel.set('visible', !currentVisibility);
        toggledCount++;
    });
    
    addEventLog('切换可见性', `${toggledCount} 个面板的可见性已切换`);
    updatePanelsInfo();
});

document.getElementById('add-custom-button').addEventListener('click', () => {
    const topPanel = panelManager.getPanel('panel-top');
    if (topPanel) {
        const buttonId = `dynamic-btn-${Date.now()}`;
        
        panelManager.addButton('panel-top', {
            id: buttonId,
            label: '🔥',
            command: () => {
                addEventLog('动态按钮', `动态按钮 ${buttonId} 被点击`);
                alert(`动态按钮被点击！ID: ${buttonId}`);
            },
            attributes: { title: '动态添加的按钮' }
        });
        
        addEventLog('添加按钮', `动态按钮 ${buttonId} 已添加到顶部面板`);
    }
});

document.getElementById('panel-selector').addEventListener('change', (e) => {
    const action = e.target.value;
    
    switch (action) {
        case 'show-all':
            panelManager.getPanels().forEach(panel => {
                panel.set('visible', true);
            });
            addEventLog('显示所有', '所有面板已显示');
            break;
            
        case 'hide-all':
            panelManager.getPanels().forEach(panel => {
                panel.set('visible', false);
            });
            addEventLog('隐藏所有', '所有面板已隐藏');
            break;
            
        case 'reset-panels':
            // 重置到默认状态
            panelManager.getPanels().forEach(panel => {
                panel.set('visible', true);
            });
            addEventLog('重置面板', '面板已重置到默认状态');
            break;
    }
    
    updatePanelsInfo();
    e.target.value = '';
});

document.getElementById('demonstrate-api').addEventListener('click', () => {
    demonstratePanelsAPI();
});

document.getElementById('export-panels-config').addEventListener('click', () => {
    exportPanelsConfig();
});

// 演示面板API的使用
function demonstratePanelsAPI() {
    console.log('=== Panels API 演示 ===');
    
    // 获取所有面板
    const panels = panelManager.getPanels();
    console.log('所有面板:', panels);
    
    // 获取特定面板
    const topPanel = panelManager.getPanel('panel-top');
    console.log('顶部面板:', topPanel);
    
    // 获取面板按钮
    if (topPanel) {
        const buttons = topPanel.get('buttons');
        console.log('顶部面板按钮:', buttons);
    }
    
    // 演示按钮操作
    const button = panelManager.getButton('panel-top', 'visibility');
    if (button) {
        console.log('可见性按钮:', button);
        console.log('按钮是否激活:', button.get('active'));
    }
    
    addEventLog('API演示', '查看控制台了解详细的API演示信息');
}

// 导出面板配置
function exportPanelsConfig() {
    const panels = panelManager.getPanels();
    const config = panels.map(panel => ({
        id: panel.get('id'),
        visible: panel.get('visible'),
        buttons: panel.get('buttons') ? panel.get('buttons').map(btn => ({
            id: btn.get('id'),
            label: btn.get('label'),
            active: btn.get('active'),
            command: btn.get('command')
        })) : []
    }));
    
    const configWindow = window.open('', '_blank');
    configWindow.document.write(`
        <html>
            <head>
                <title>面板配置</title>
                <style>
                    body { font-family: monospace; padding: 20px; }
                    pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow: auto; }
                </style>
            </head>
            <body>
                <h2>当前面板配置</h2>
                <pre>${JSON.stringify(config, null, 2)}</pre>
            </body>
        </html>
    `);
    
    addEventLog('导出配置', '面板配置已在新窗口中打开');
}

// 监听面板事件
editor.on('panel:add', (panel) => {
    addEventLog('面板添加', `面板 ${panel.get('id')} 已添加`);
    updatePanelsInfo();
});

editor.on('panel:remove', (panel) => {
    addEventLog('面板移除', `面板 ${panel.get('id')} 已移除`);
    updatePanelsInfo();
});

// 监听按钮事件
editor.on('panel:button:add', (button) => {
    addEventLog('按钮添加', `按钮 ${button.get('id')} 已添加`);
});

editor.on('panel:button:remove', (button) => {
    addEventLog('按钮移除', `按钮 ${button.get('id')} 已移除`);
});

// 页面加载完成后执行
editor.on('load', () => {
    console.log('编辑器加载完成');
    updatePanelsInfo();
    
    addEventLog('编辑器初始化', '面板演示已准备就绪');
    
    // 演示初始面板配置
    setTimeout(() => {
        addEventLog('初始配置', `已加载 ${panelManager.getPanels().length} 个默认面板`);
    }, 1000);
});

// 定期更新面板信息
setInterval(updatePanelsInfo, 3000);

// 导出函数供调试使用
window.editor = editor;
window.panelManager = panelManager;
window.demonstratePanelsAPI = demonstratePanelsAPI;
window.exportPanelsConfig = exportPanelsConfig;
window.addEventLog = addEventLog;

console.log('Panels 概念演示已加载。可以在控制台中使用相关函数进行调试。');
console.log('可用函数: demonstratePanelsAPI(), exportPanelsConfig(), addEventLog(type, details)');