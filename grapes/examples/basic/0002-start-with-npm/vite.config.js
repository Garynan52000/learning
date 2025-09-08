import { defineConfig } from 'vite';

export default defineConfig({
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  
  // 基础路径
  base: './',
  
  // CSS 配置
  css: {
    devSourcemap: true,
  },
});