import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'
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
    // since <link rel="stylesheet"> isn't
    // allowed, inline all styles
    inlineStyleThreshold: Infinity,
  },
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true,
    }),
  ],
}

export default config
