import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // '0.0.0.0' adresiyle dinler, yerel ağda erişilebilir olur
    port: 3000, // İstediğiniz port numarasını belirleyin
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
