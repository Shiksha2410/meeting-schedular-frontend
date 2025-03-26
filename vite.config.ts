import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    open: true, // Automatically opens the browser
    cors: true, // Enables CORS
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Allows using '@' as alias for 'src'
    },
  },
  build: {
    outDir: "dist", // Output directory
    sourcemap: true, // Enables source maps for debugging
  },
});
