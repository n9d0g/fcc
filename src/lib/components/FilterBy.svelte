<script lang="ts">
	import Icon from '@iconify/svelte'
	import { fade } from 'svelte/transition'

	// Svelte 5 props with bindable
	let { label, bindVal = $bindable('') }: { label: string; bindVal?: string } = $props()

	const id = $props.id()
</script>

<div class="flex max-w-sm flex-col gap-2">
	<label for={id} class="label">{label}</label>
	<div class="relative">
		<Icon
			icon="lucide:search"
			class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-surface-400"
		/>
		<input
			{id}
			class="input w-full pr-10 pl-10"
			type="text"
			placeholder={label}
			bind:value={bindVal}
		/>
		{#if bindVal !== ''}
			<button
				transition:fade={{ duration: 150 }}
				onclick={() => (bindVal = '')}
				class="btn-icon absolute top-1/2 right-1.5 -translate-y-1/2 text-muted hover:bg-surface-100 hover:text-ink"
				aria-label="Clear filter"
			>
				<Icon icon="lucide:x" class="size-4" />
			</button>
		{/if}
	</div>
</div>
