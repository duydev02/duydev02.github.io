import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "SITE_");

export default defineConfig({
  site: env.SITE_URL || "http://localhost:4321",
  base: env.SITE_BASE || "/",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
