import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: './src/popup/popup.html',
        tabs: './src/tabs/tabs.html',
      },
    },
  },
});