import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      crypto: 'crypto-browserify',
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs'],
  },
})
