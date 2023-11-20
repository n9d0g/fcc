<script lang="ts">
	import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'
	import { fade } from 'svelte/transition'

	export let label: string
	export let bindVal: string = ''
</script>

<div>
	<label
		for=""
		class="items-left label relative my-4 flex max-w-fit flex-col gap-2"
		>{label}:</label
	>
	<input
		class="input w-64"
		type="text"
		placeholder={label}
		bind:value={bindVal}
	/>
	{#if bindVal !== ''}
		<button
			transition:fade={{ duration: 150 }}
			on:click={() => (bindVal = '')}
			class="absolute right-2 top-10 h-7 w-7 cursor-pointer rounded-xl"
		>
			<IoIosClose />
		</button>
	{/if}
</div>
