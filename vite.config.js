import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-lazy-load-image-component'],
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  }
})