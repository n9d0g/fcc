/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],
	theme: {
		extend: {
			backgroundImage: {
				hero: "url('/hero.jpg')",
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
	],
}
