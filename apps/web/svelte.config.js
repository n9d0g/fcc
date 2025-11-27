import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

const file = fileURLToPath(new URL('package.json', import.meta.url))
const json = readFileSync(file, 'utf8')
const pkg = JSON.parse(json)

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		version: {
			name: pkg.version,
		},
	},
	preprocess: seqPreprocessor([
		vitePreprocess(),
		preprocess({
			postcss: true,
		}),
	]),
}

export default config
