import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/../../`);

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/auth",
        filename: "auth.js",
        exposes: {
          "./App": "./src/App",
        },
        remotes: {
          "@dacodes/root": `http://localhost:${env.VITE_ROOT_PORT}/assets/root.js`,
        },
        shared: [
          "@ant-design/icons",
          "@tanstack/react-query",
          "antd",
          "react",
          "react-dom",
        ],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: +env.VITE_AUTH_PORT || 7001,
    },
    preview: {
      port: +env.VITE_AUTH_PORT || 7001,
    },
  };
});
