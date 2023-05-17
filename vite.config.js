import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { execSync } from 'child_process'

export default defineConfig({
	server: {
		port: 42069,
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	define: {
		__LAST_COMMIT__: JSON.stringify(execSync('git rev-parse HEAD').toString().trim()),
	},
	ssr: {
		noExternal: ['three', 'troika-three-text'],
	},
})
