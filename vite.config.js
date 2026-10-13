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

/**
 * postcss (pulled in by the email renderer) lazily `require`s fs/path/url to
 * load source maps from disk. Bundled for Workers, that turns into a top-level
 * `createRequire(import.meta.url)`, which throws because workerd has no
 * `import.meta.url`. Stub those modules like postcss's own `browser` field does.
 * @returns {import('vite').Plugin}
 */
const postcssWorkerShim = () => {
	const stubbed = new Set(['fs', 'path', 'url'])
	const id = '\0postcss-node-builtin-stub'
	return {
		name: 'postcss-worker-shim',
		enforce: 'pre',
		resolveId(source, importer) {
			if (stubbed.has(source) && importer?.includes('/postcss/lib/')) return id
		},
		load(source) {
			if (source === id) return 'export default {}'
		},
	}
}

export default defineConfig({
	server: {
		port: 42069,
		watch: {
			ignored: ['**/apps/**'],
		},
	},
	plugins: [
		postcssWorkerShim(),
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
