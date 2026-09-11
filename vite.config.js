import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    assetsInlineLimit: 4096,
  },
  // Allow Railway's generated host (*.up.railway.app) to reach the preview server.
  // Behind Railway's edge, the container is only reachable via that domain.
  preview: {
    host: true,
    allowedHosts: true,
  },
})
