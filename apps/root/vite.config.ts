import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const {
    VITE_ROOT_PORT,
    VITE_AUTH_PORT,
    VITE_DIRECTORY_PORT,
    VITE_GAME_PORT,
    VITE_PROFILE_PORT,
  } = loadEnv(mode, `${process.cwd()}/../../`);

  return {
    plugins: [
      react(),
      federation({
        name: "@dacodes/root",
        remotes: {
          "@dacodes/auth": `http://localhost:${VITE_AUTH_PORT}/assets/auth.js`,
          "@dacodes/directory": `http://localhost:${VITE_DIRECTORY_PORT}/assets/directory.js`,
          "@dacodes/game": `http://localhost:${VITE_GAME_PORT}/assets/game.js`,
          "@dacodes/profile": `http://localhost:${VITE_PROFILE_PORT}/assets/profile.js`,
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      rollupOptions: {
        external: ["@dacodes/auth"],
      },
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: +VITE_ROOT_PORT || 7000,
    },
    preview: {
      port: +VITE_ROOT_PORT || 7000,
    },
  };
});
