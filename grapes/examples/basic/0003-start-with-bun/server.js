// Bun 内置服务器示例
// 使用 Bun.serve 创建一个简单的静态文件服务器

import { file } from 'bun';
import { join } from 'path';

const PORT = 0; // 自动分配可用端口

// 创建 HTTP 服务器
const server = Bun.serve({
  port: PORT,
  
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;
    
    // 默认首页
    if (filePath === '/') {
      filePath = '/index.html';
    }
    
    try {
      // 构建文件路径
      const fullPath = join(import.meta.dir, filePath);
      const bunFile = file(fullPath);
      
      // 检查文件是否存在
      if (await bunFile.exists()) {
        // 设置正确的 MIME 类型
        const headers = new Headers();
        
        if (filePath.endsWith('.html')) {
          headers.set('Content-Type', 'text/html; charset=utf-8');
        } else if (filePath.endsWith('.js')) {
          headers.set('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
          headers.set('Content-Type', 'text/css');
        } else if (filePath.endsWith('.json')) {
          headers.set('Content-Type', 'application/json');
        }
        
        // 返回文件内容
        return new Response(bunFile, { headers });
      }
      
      // 文件不存在，返回 404
      return new Response('File not found', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
      
    } catch (error) {
      console.error('服务器错误:', error);
      return new Response('Internal Server Error', { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
  
  // 错误处理
  error(error) {
    console.error('服务器错误:', error);
    return new Response('Internal Server Error', { status: 500 });
  },
});

console.log('🥟 Bun 服务器启动成功!');
console.log(`🌐 服务器地址: http://localhost:${server.port}`);
console.log('📁 服务目录:', import.meta.dir);
console.log('🔥 支持热重载，修改文件后自动刷新');
console.log('\n💡 使用说明:');
console.log(`  - 访问 http://localhost:${server.port} 查看 GrapesJS 编辑器`);
console.log('  - 按 Ctrl+C 停止服务器');

// 优雅关闭处理
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭服务器...');
  server.stop();
  process.exit(0);
});

export default server;