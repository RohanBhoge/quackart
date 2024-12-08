import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx", // Tell esbuild to treat .js files as JSX
    include: [/\.js$/], // Apply the JSX loader to .js files
  },
});
