import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // shortcut for imports like '@/components/XXX'
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://101.43.85.43:8000', // Django 后端地址
        changeOrigin: true, // 修改请求头中的 origin
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉 /api 前缀
      }
    },
    port: 5173,
    open: true
  },
  build: {
    // optional build optimizations
    target: 'es2021',
    sourcemap: false,
    rollupOptions: {
      // put large libs in vendor chunk if needed
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})
