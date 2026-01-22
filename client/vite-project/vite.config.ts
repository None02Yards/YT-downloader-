import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        "/analyze": "http://localhost:3000",
      "/download": "http://localhost:3000"
    }
  }
});
