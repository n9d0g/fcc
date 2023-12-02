import { join } from 'path'
import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/tw-plugin'
import { FccTheme } from './fcc-theme'
import forms from '@tailwindcss/forms'

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		),
	],
	theme: {
		extend: {
			backgroundImage: {
				hero: "url('/hero.avif')",
			},
			colors: {
				facebook: '#4267b2',
				instagram: '#f56040',
				youtube: '#c4302b',
			},
		},
	},
	plugins: [
		forms,
		require('tailwindcss/plugin')(({ addVariant }) => {
			addVariant('search-cancel', '&::-webkit-search-cancel-button')
		}),
		skeleton({
			themes: {
				custom: [FccTheme],
			},
		}),
	],
} satisfies Config
