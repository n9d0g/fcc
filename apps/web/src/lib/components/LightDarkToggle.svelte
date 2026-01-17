<script lang="ts">
	import { browser } from '$app/environment'
	import Icon from '@iconify/svelte'

	let isDark = $state(false)

	// Initialize from localStorage or system preference
	$effect(() => {
		if (browser) {
			const stored = localStorage.getItem('theme')
			if (stored) {
				isDark = stored === 'dark'
			} else {
				isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			}
			applyTheme()
		}
	})

	function applyTheme() {
		if (browser) {
			if (isDark) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}
		}
	}

	function toggleTheme() {
		isDark = !isDark
		if (browser) {
			localStorage.setItem('theme', isDark ? 'dark' : 'light')
			applyTheme()
		}
	}
</script>

<button
	onclick={toggleTheme}
	class="btn-icon text-gray-700 hover:preset-tonal dark:text-white"
	aria-label="Toggle dark mode"
	title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if isDark}
		<Icon icon="lucide:sun" class="h-5 w-5" />
	{:else}
		<Icon icon="lucide:moon" class="h-5 w-5" />
	{/if}
</button>
