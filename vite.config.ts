import {
  defineConfig
} from "vite";

import solid
  from "vite-plugin-solid";

import {
  builtinModules
} from "node:module";

const external = [
  "obsidian",

  ...builtinModules,

  ...builtinModules.map(
    (m) => `node:${m}`
  )
];

export default defineConfig({
  plugins: [solid()],

  build: {
    target: "es2022",

    outDir: "dist",

    emptyOutDir: true,

    sourcemap: true,

    lib: {
      entry: "src/main.ts",

      formats: ["cjs"],

      fileName: () => "main.js"
    },

    rollupOptions: {
      external,

      output: {
        exports: "default"
      }
    }
  }
});