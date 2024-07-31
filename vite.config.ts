import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
const URL = "http://localhost:5000"
console.log("URL: ", URL)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/server/save": {
        target: URL,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/save/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "parens-division",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
