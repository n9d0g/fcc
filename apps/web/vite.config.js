import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	server: {
		port: 42069,
		fs: {
			allow: ['../../'],
		},
	},
	plugins: [tailwindcss(), sveltekit()],
})
