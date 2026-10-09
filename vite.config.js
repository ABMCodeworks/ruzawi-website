import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        anonymousReport: "anon-report.html",
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
