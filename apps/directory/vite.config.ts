import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/../../`);

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/directory",
        filename: "directory.js",
        exposes: {
          "./App": "./src/App.tsx",
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: +env.VITE_DIRECTORY_PORT || 7002,
    },
    preview: {
      port: +env.VITE_DIRECTORY_PORT || 7002,
    },
  };
});
