import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, "newtab.html"),
      }
    },
    outDir: "dist",
    emptyOutDir: true
  }
})