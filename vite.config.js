import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Product content is bundled with the site, so there is no API to proxy.
export default defineConfig({
  plugins: [react()],
});
