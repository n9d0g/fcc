import adapter from '@sveltejs/adapter-cloudflare'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

const file = fileURLToPath(new URL('package.json', import.meta.url))
const json = readFileSync(file, 'utf8')
const pkg = JSON.parse(json)

export default defineConfig({
	server: {
		port: 42069,
		watch: {
			ignored: ['**/apps/**'],
		},
	},
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			version: {
				name: pkg.version,
			},
			preprocess: vitePreprocess(),
		}),
	],
})
