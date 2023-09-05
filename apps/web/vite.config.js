import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { execSync } from 'child_process'

export default defineConfig({
	server: {
		port: 42069,
		fs: {
			allow: ['../../'],
		},
	},
	plugins: [sveltekit()],
	define: {
		__LAST_COMMIT__: JSON.stringify(execSync('git rev-parse HEAD').toString().trim()),
	},
})
