import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '.yy.com' // 允许.yy.com及其所有子域名访问
    ],
    port: 80,
  },
})
