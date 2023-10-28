import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react_Tshirt/",
  plugins: [react()],

  // 配置@路径, 应用组件时使用@代替./src/
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
});
