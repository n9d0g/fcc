<script lang="ts">
	export let title: string
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section class="container mx-auto my-16 flex flex-col h-fit lg:min-h-screen px-4">
	<slot />
</section>
