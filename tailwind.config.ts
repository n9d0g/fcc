import type { Config } from 'tailwindcss'

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],
	theme: {
		extend: {
			backgroundImage: {
				hero: "url('/hero.avif')",
			},
			colors: {
				facebook: '#4267B2',
				instagram: '#F56040',
				youtube: '#c4302b',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
		require('tailwindcss/plugin')(({ addVariant }) => {
			addVariant('search-cancel', '&::-webkit-search-cancel-button')
		}),
	],
} satisfies Config
