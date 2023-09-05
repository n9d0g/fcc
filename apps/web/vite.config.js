import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	server: {
		port: 42069,
		fs: {
			allow: ['../../'],
		},
	},
	plugins: [sveltekit()],
})
