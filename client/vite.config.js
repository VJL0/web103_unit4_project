import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      picocss: path.resolve(__dirname, "../node_modules/@picocss/pico/css"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
