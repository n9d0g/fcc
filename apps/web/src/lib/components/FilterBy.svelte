<script lang="ts">
	import Icon from '@iconify/svelte'
	import { fade } from 'svelte/transition'

	// Svelte 5 props with bindable
	let { label, bindVal = $bindable('') }: { label: string; bindVal?: string } = $props()
</script>

<div>
	<label for="" class="items-left label relative my-4 flex max-w-fit flex-col gap-2">
		{label}:
	</label>
	<input class="input w-64" type="text" placeholder={label} bind:value={bindVal} />
	{#if bindVal !== ''}
		<button
			transition:fade={{ duration: 150 }}
			onclick={() => (bindVal = '')}
			class="absolute right-2 top-10 h-7 w-7 cursor-pointer rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
		>
			<Icon icon="lucide:x" class="h-full w-full" />
		</button>
	{/if}
</div>
