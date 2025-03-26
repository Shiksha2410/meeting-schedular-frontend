import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : (process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 5173), // Dynamically bind to any port
    host: "0.0.0.0", // Expose the server to external access
    strictPort: false, // Allow fallback to another port if the specified one is in use
    open: true,
    cors: true,
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
