<script lang="ts">
	import { addDays } from 'date-fns'
	import { fly } from 'svelte/transition'

	export let banner: App.Banner

	const eventDate = addDays(new Date(banner.date), 1)
	const datePassed = eventDate > new Date()

	let dismissed = false

	const dismiss = () => {
		dismissed = true
	}
</script>

{#if datePassed && !dismissed}
	<div
		transition:fly={{ y: 100, duration: 300 }}
		class="from-primary-600 to-primary-500 fixed bottom-4 left-4 right-4 z-[999] mx-auto max-w-2xl rounded-xl bg-gradient-to-r shadow-2xl md:bottom-6 md:left-6 md:right-6"
	>
		<div class="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4">
			<p class="flex-1 text-xs font-semibold text-white md:text-sm">
				{#each banner.body[0].children as child}
					{#if child.marks.length > 0}
						<a
							class="underline decoration-2 underline-offset-2 transition-opacity hover:opacity-80"
							href={banner.body[0].markDefs[0].href}
						>
							{child.text}
						</a>
					{:else}
						{child.text}
					{/if}
				{/each}
			</p>
			<button
				on:click={dismiss}
				class="shrink-0 rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
				aria-label="Dismiss banner"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}
