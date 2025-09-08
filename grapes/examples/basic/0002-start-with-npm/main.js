// 导入 GrapesJS 和样式文件
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

// 初始化 GrapesJS 编辑器
const editor = grapesjs.init({
  // 编辑器容器
  container: '#gjs',
  
  // 初始内容
  components: `
    <div style="padding: 20px; text-align: center;">
      <h1>Hello GrapesJS with NPM!</h1>
      <p>这是一个使用 npm 包管理的 GrapesJS 示例。</p>
      <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
        <h3>特性说明</h3>
        <ul style="text-align: left; display: inline-block;">
          <li>使用 npm 包管理器安装 GrapesJS</li>
          <li>使用 Vite 作为构建工具</li>
          <li>支持模块化开发</li>
          <li>支持热重载开发</li>
        </ul>
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
  },
  
  // 面板配置 - 使用默认配置
  panels: {},
  
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

// 自定义命令可以在这里添加
// 例如：editor.Commands.add('custom-command', { ... });

// 在控制台输出编辑器实例，方便调试
console.log('GrapesJS 编辑器已初始化:', editor);

// 导出编辑器实例
export default editor;