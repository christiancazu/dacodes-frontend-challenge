import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode!, `${process.cwd()}/../../`),
  };

  const {
    VITE_GAME_PORT,
    VITE_GAME_DOMAIN,
    VITE_ROOT_DOMAIN_ENTRY,
    VITE_API_LEADERBOARD_URL,
    VITE_WS_LEADERBOARD_URL,
  } = process.env;

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/game",
        filename: "game.js",
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
      port: +VITE_GAME_PORT! || 7003,
    },
    preview: {
      port: +VITE_GAME_PORT! || 7003,
      allowedHosts: [VITE_GAME_DOMAIN!],
    },
    define: {
      VITE_WS_LEADERBOARD_URL: JSON.stringify(VITE_WS_LEADERBOARD_URL),
      VITE_API_LEADERBOARD_URL: JSON.stringify(VITE_API_LEADERBOARD_URL),
      VITE_GAME_DOMAIN: JSON.stringify(VITE_GAME_DOMAIN),
    },
  };
});
