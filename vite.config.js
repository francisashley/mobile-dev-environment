import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'mobileDevEnvironment',
      formats: ['umd'],
      fileName: () => 'mde.min.js'
    },
    outDir: 'dist',
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'mde.min.css';
          }
          return assetInfo.name;
        }
      }
    }
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
});
