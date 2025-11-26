import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },

  // CRITICAL: Base path must be empty string for Tauri
  // Tauri serves files from a custom protocol, not from root
  base: "",

  // Build configuration optimizada para producción de Tauri
  build: {
    // Target modern browsers - Tauri uses modern webview
    target: ["es2021", "chrome100", "safari13"],
    
    // Suppress chunk size warnings - Tauri apps can handle larger chunks
    chunkSizeWarningLimit: 2000,
    
    // Don't minify for better debugging if needed
    // @ts-expect-error process is a nodejs global
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    
    // Generate sourcemaps for debugging
    // @ts-expect-error process is a nodejs global
    sourcemap: !!process.env.TAURI_DEBUG,
    
    // Rollup options for better chunking
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "pdf-vendor": ["@react-pdf/renderer"],
        },
      },
    },
  },

  // Optimize deps for Tauri
  optimizeDeps: {
    include: ["react", "react-dom", "@react-pdf/renderer"],
  },
});
