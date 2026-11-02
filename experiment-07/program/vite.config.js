import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config: the React plugin compiles JSX; the dev server runs on port 5173
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
