import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const { VITE_AUTH_PORT, VITE_ROOT_DOMAIN } = process.env;

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
          "@dacodes/root": VITE_ROOT_DOMAIN!,
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
      port: +VITE_AUTH_PORT! || 7001,
    },
    preview: {
      port: +VITE_AUTH_PORT! || 7001,
    },
  };
});
