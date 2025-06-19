import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const { VITE_DIRECTORY_DOMAIN, VITE_DIRECTORY_PORT, VITE_ROOT_DOMAIN_ENTRY } =
    process.env;

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/directory",
        filename: "directory.js",
        exposes: {
          "./App": "./src/App.tsx",
        },
        remotes: {
          "@dacodes/root": VITE_ROOT_DOMAIN_ENTRY!,
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
      port: +VITE_DIRECTORY_PORT! || 7002,
    },
    preview: {
      port: +VITE_DIRECTORY_PORT! || 7002,
      allowedHosts: [VITE_DIRECTORY_DOMAIN!],
    },
  };
});
