import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const { VITE_ROOT_DOMAIN, VITE_PROFILE_PORT } = process.env;

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/profile",
        filename: "profile.js",
        exposes: {
          "./App": "./src/App.tsx",
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
      port: +VITE_PROFILE_PORT! || 7004,
    },
    preview: {
      port: +VITE_PROFILE_PORT! || 7004,
    },
  };
});
