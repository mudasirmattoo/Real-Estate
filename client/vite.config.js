import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Corrected target address
        secure: false,
        changeOrigin: true, // Add this option for changing the origin of the request to match the target
      },
    },
  },
  plugins: [react()],
})
