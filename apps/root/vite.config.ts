import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const {
    VITE_ROOT_PORT,
    VITE_API_URL,
    VITE_AUTH_DOMAIN,
    VITE_DIRECTORY_DOMAIN,
    VITE_GAME_DOMAIN,
    VITE_PROFILE_DOMAIN,
  } = process.env;

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/root",
        filename: "root.js",
        exposes: {
          "./AppProvider": "./src/components/AppProvider",
          "./queryClient": "./src/config/query.client",
          "./httpClient": "./src/config/http.client",
          "./useNotify": "./src/hooks/useNotify",
        },
        remotes: {
          "@dacodes/auth": VITE_AUTH_DOMAIN!,
          "@dacodes/directory": VITE_DIRECTORY_DOMAIN!,
          "@dacodes/game": VITE_GAME_DOMAIN!,
          "@dacodes/profile": VITE_PROFILE_DOMAIN!,
        },
        shared: [
          "axios",
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
      port: +VITE_ROOT_PORT! || 7000,
    },
    preview: {
      port: +VITE_ROOT_PORT! || 7000,
    },
    define: {
      VITE_API_URL: JSON.stringify(VITE_API_URL),
    },
  };
});
