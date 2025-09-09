// 导入 GrapesJS 和样式文件
import grapesjs from './node_modules/grapesjs/dist/grapes.mjs';

// 动态加载 CSS 样式
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './node_modules/grapesjs/dist/css/grapes.min.css';
document.head.appendChild(link);

// Bun 运行时信息显示
console.log('🥟 Bun 运行时信息:');
console.log('- Bun 版本:', typeof Bun !== 'undefined' ? Bun.version : 'N/A (浏览器环境)');
console.log('- 运行环境:', typeof Bun !== 'undefined' ? 'Bun Runtime' : 'Browser');

// 初始化 GrapesJS 编辑器
const editor = grapesjs.init({
  // 编辑器容器
  container: '#gjs',
  
  // 初始内容
  components: `
    <div style="padding: 20px; text-align: center;">
      <h1>Hello GrapesJS with Bun! 🥟</h1>
      <p>这是一个使用 Bun 运行时和包管理的 GrapesJS 示例。</p>
      <div style="margin-top: 20px; padding: 15px; background: linear-gradient(45deg, #fbf0df, #f4e4bc); border-radius: 8px; border-left: 4px solid #d4a574;">
        <h3>🚀 Bun 特性说明</h3>
        <ul style="text-align: left; display: inline-block; margin: 0;">
          <li><strong>超快安装:</strong> bun install 比 npm 快 25x</li>
          <li><strong>内置打包:</strong> 无需 webpack 或 vite</li>
          <li><strong>原生 TS:</strong> 直接运行 TypeScript 文件</li>
          <li><strong>热重载:</strong> --hot 标志支持热重载</li>
          <li><strong>Web APIs:</strong> 内置 fetch、WebSocket 等</li>
          <li><strong>兼容性:</strong> 与 Node.js 生态系统兼容</li>
        </ul>
      </div>
      <div style="margin-top: 15px; padding: 10px; background-color: #e7f3ff; border-radius: 5px;">
        <p style="margin: 0; font-size: 14px; color: #0c5460;">
          💡 <strong>提示:</strong> 这个示例展示了如何在 Bun 环境中使用 GrapesJS 构建可视化编辑器
        </p>
      </div>
    </div>
  `,
  
  // 编辑器配置
  height: '100vh',
  width: 'auto',
  
  // 存储管理器配置
  storageManager: {
    type: 'local',
    autosave: true,
    autoload: true,
    stepsBeforeSave: 1,
    options: {
      local: {
        key: 'grapesjs-bun-demo'
      }
    }
  },
  
  // 面板配置
  panels: {
  },
  
  // 设备管理器配置
  deviceManager: {
    devices: [
      {
        name: '桌面',
        width: '',
      },
      {
        name: '平板',
        width: '768px',
        widthMedia: '992px',
      },
      {
        name: '手机',
        width: '320px',
        widthMedia: '768px',
      },
    ],
  },
  
  // 插件配置
  plugins: [],
  
  // 插件选项
  pluginsOpts: {},
});

// 编辑器加载完成后的回调
editor.on('load', () => {
  console.log('🎨 GrapesJS 编辑器已初始化');
  console.log('📦 编辑器实例:', editor);
  
  // 如果在 Bun 环境中，显示额外信息
  if (typeof Bun !== 'undefined') {
    console.log('🥟 检测到 Bun 运行时环境');
  }
});

// 导出编辑器实例
export default editor;

// 如果在 Bun 环境中，可以使用 Bun 特有的 APIs
if (typeof Bun !== 'undefined') {
  // 示例：使用 Bun.file API（仅在服务器端可用）
  console.log('🥟 Bun 环境检测成功');
}