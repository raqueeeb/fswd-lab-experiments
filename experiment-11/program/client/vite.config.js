import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In development the React app runs on :5173 and the Express API on :5004.
// The proxy forwards every request that starts with /api to Express, so the
// React code can simply call fetch("/api/projects") without hardcoding a URL.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5004",
    },
  },
});
