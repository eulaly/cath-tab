import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, "newtab.html"),
        options: resolve(__dirname, "options.html")
      }
    },
    outDir: "dist",
    emptyOutDir: true
  }
})