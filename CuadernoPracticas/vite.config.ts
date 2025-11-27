import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Clear screen for cleaner output
  clearScreen: false,
  
  // Server configuration for Electron development
  server: {
    port: 1420,
    strictPort: true,
  },

  // Electron loads files from the filesystem in production
  // Use relative paths
  base: "./",

  // Build configuration optimized for Electron
  build: {
    // Target modern browsers - Electron uses Chromium
    target: "chrome120",
    
    // Output directory
    outDir: "dist",
    
    // Generate sourcemaps for debugging
    sourcemap: true,
    
    // Minify for production
    minify: "esbuild",
    
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

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "@react-pdf/renderer"],
  },
});
