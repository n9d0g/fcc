<script>
	export let title
	export let text
	export let picture
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section class="container mx-auto flex p-36">
	<p class="w-1/2">{text}</p>
	<p class="w-1/2">{picture}</p>
</section>

<slot />
