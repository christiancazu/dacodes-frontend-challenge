import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const {
    VITE_ROOT_DOMAIN,
    VITE_ROOT_PORT,
    VITE_API_DUMMY_URL,
    VITE_AUTH_DOMAIN_ENTRY,
    VITE_DIRECTORY_DOMAIN_ENTRY,
    VITE_GAME_DOMAIN_ENTRY,
    VITE_PROFILE_DOMAIN_ENTRY,
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
          "@dacodes/auth": VITE_AUTH_DOMAIN_ENTRY!,
          "@dacodes/directory": VITE_DIRECTORY_DOMAIN_ENTRY!,
          "@dacodes/game": VITE_GAME_DOMAIN_ENTRY!,
          "@dacodes/profile": VITE_PROFILE_DOMAIN_ENTRY!,
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
      allowedHosts: [VITE_ROOT_DOMAIN!],
    },
    define: {
      VITE_API_DUMMY_URL: JSON.stringify(VITE_API_DUMMY_URL),
    },
  };
});
