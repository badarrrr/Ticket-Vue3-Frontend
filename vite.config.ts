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
