import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, `${process.cwd()}/../../`)

	return {
		plugins: [
			react(),
			federation({
				name: '@dacodes/profile',
				filename: 'profile.js',
				exposes: {},
				shared: ['react', 'react-dom'],
			}),
		],
		build: {
			modulePreload: false,
			target: 'esnext',
			minify: false,
			cssCodeSplit: true,
		},
		server: {
			port: +env.VITE_PROFILE_PORT || 7004,
		},
		preview: {
			port: +env.VITE_PROFILE_PORT || 7004,
		},
	}
})
