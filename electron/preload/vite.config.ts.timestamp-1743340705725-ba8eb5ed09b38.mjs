// electron/preload/vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/johnw/OneDrive/Desktop/aethermind/node_modules/.pnpm/vite@5.4.15_sass-embedded@1.86.0/node_modules/vite/dist/node/index.js";
import "file:///C:/Users/johnw/OneDrive/Desktop/aethermind/node_modules/.pnpm/tailwindcss@4.0.17/node_modules/tailwindcss/dist/lib.mjs";
import "file:///C:/Users/johnw/OneDrive/Desktop/aethermind/node_modules/.pnpm/autoprefixer@10.4.21_postcss@8.5.3/node_modules/autoprefixer/lib/autoprefixer.js";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve("electron/preload/index.ts"),
      formats: ["cjs"]
    },
    rollupOptions: {
      external: ["electron"],
      output: {
        dir: "build/electron",
        /*
         * preload must be cjs format.
         * if mjs, it will be error:
         *   - Unable to load preload script.
         *   - SyntaxError: Cannot use import statement outside a module.
         */
        entryFileNames: "preload/[name].cjs",
        format: "cjs"
      }
    },
    minify: false,
    emptyOutDir: false
  },
  esbuild: {
    platform: "node"
  },
  plugins: []
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZWxlY3Ryb24vcHJlbG9hZC92aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGpvaG53XFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcYWV0aGVybWluZFxcXFxlbGVjdHJvblxcXFxwcmVsb2FkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqb2hud1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGFldGhlcm1pbmRcXFxcZWxlY3Ryb25cXFxccHJlbG9hZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvam9obncvT25lRHJpdmUvRGVza3RvcC9hZXRoZXJtaW5kL2VsZWN0cm9uL3ByZWxvYWQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZSgnZWxlY3Ryb24vcHJlbG9hZC9pbmRleC50cycpLFxuICAgICAgZm9ybWF0czogWydjanMnXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ2VsZWN0cm9uJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZGlyOiAnYnVpbGQvZWxlY3Ryb24nLFxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIHByZWxvYWQgbXVzdCBiZSBjanMgZm9ybWF0LlxuICAgICAgICAgKiBpZiBtanMsIGl0IHdpbGwgYmUgZXJyb3I6XG4gICAgICAgICAqICAgLSBVbmFibGUgdG8gbG9hZCBwcmVsb2FkIHNjcmlwdC5cbiAgICAgICAgICogICAtIFN5bnRheEVycm9yOiBDYW5ub3QgdXNlIGltcG9ydCBzdGF0ZW1lbnQgb3V0c2lkZSBhIG1vZHVsZS5cbiAgICAgICAgICovXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAncHJlbG9hZC9bbmFtZV0uY2pzJyxcbiAgICAgICAgZm9ybWF0OiAnY2pzJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIHBsYXRmb3JtOiAnbm9kZScsXG4gIH0sXG4gIHBsdWdpbnM6IFtdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1YLFNBQVMsZUFBZTtBQUMzWSxTQUFTLG9CQUFvQjtBQUM3QixPQUF3QjtBQUN4QixPQUF5QjtBQUV6QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsMkJBQTJCO0FBQUEsTUFDMUMsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFVBQVU7QUFBQSxNQUNyQixRQUFRO0FBQUEsUUFDTixLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFRTCxnQkFBZ0I7QUFBQSxRQUNoQixRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0EsU0FBUyxDQUFDO0FBQ1osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
