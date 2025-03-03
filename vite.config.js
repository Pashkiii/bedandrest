import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from 'vite-plugin-vue-devtools'

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.js",
    },
  },
  server: {
    port: PORT,
    host: true,
    cors: false,
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
        configure: (proxy, proxyOptions) => {
          proxy.on('start', function (req, res, target) {
            const reqHost = (req.headers.host).split(':')[0];
            const proxyTargetUrl = target;

            proxyOptions.target = `http://${reqHost}:${PORT}`;
            proxyTargetUrl.host = `${reqHost}:${PORT}`;
            proxyTargetUrl.hostname = reqHost;
            proxyTargetUrl.href = `http://${reqHost}:${PORT}`;
          });
          proxy.on('proxyReq', function (proxyReq, req, res, options) {
            const reqHost = (req.headers?.host ?? '').split(':')[0];

            proxyOptions.target = `http://${reqHost}:${PORT}`;
            (options.target)['host'] = `${reqHost}:${PORT}`;
            (options.target)['hostname'] = reqHost;
            (options.target)['href'] = `http://${reqHost}:${PORT}`;
          });
        }
      },
    }
  }
});
