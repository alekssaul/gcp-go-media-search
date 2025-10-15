import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      host: true, // This makes the server listen on all network interfaces
      port: 5173, // You can explicitly set the port here if you want
      // Add this proxy configuration
      proxy: {
        // Proxy requests from /api to the backend server
        '/api': {
          target: env.BACKEND_API_URL, // Use the environment variable
          changeOrigin: true, // Needed for virtual hosted sites
          secure: false,      // If you are not using https
        },
      },
    },
    build: {
      outDir: 'dist',
      reportCompressedSize: true,
    },
  }
})
