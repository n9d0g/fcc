<script lang="ts">
	export let title: string
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section class="container mx-auto my-16 flex flex-col h-screen">
	<slot />
</section>
