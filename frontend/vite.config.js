import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Lấy đường dẫn tuyệt đối đến tệp hiện tại
const __filename = fileURLToPath(import.meta.url);
// Lấy đường dẫn đến thư mục hiện tại
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
  //     'https://webbookingcourts-production.up.railway.app/api/v1'
  //   ),
  // },
  server: {
    port: 2003,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'mapbox-gl': path.resolve(
        __dirname,
        './node_modules/mapbox-gl/dist/mapbox-gl.js'
      ),
    },
  },
  envPrefix: 'VITE_',
});
