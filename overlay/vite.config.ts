import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// Builds the pin overlay into one IIFE file that the viewer origin serves
// under /__fb/. Output is gitignored and rebuilt before `next build`.
export default defineConfig({
  publicDir: false,
  build: {
    outDir: fileURLToPath(new URL("../public/overlay", import.meta.url)),
    emptyOutDir: true,
    target: "es2020",
    lib: {
      entry: fileURLToPath(new URL("./src/main.ts", import.meta.url)),
      name: "FeedbackOverlay",
      formats: ["iife"],
      fileName: () => "overlay.js",
    },
  },
});
