<script lang="ts">
	import { page } from '$app/stores'
	import { buildSeoHeadExtras } from '$lib/utils'
	import type { Snippet } from 'svelte'

	// Svelte 5 props
	let {
		title,
		headData,
		breadcrumb,
		children,
	}: {
		title: string
		headData: { title: string; description: string }
		breadcrumb: Array<{ title: string; href: string }>
		children: Snippet
	} = $props()

	let url = $derived($page.url.href)
	let seoHeadExtras = $derived(
		buildSeoHeadExtras(url, headData.title, headData.description)
	)
</script>

<svelte:head>
	<title>{headData.title}</title>
	<meta name="description" content={headData.description} />
	{@html seoHeadExtras}
</svelte:head>

<section class="container mx-auto flex flex-col px-4 py-8 lg:py-16">
	<!-- breadcrumb -->
	<ol class="breadcrumb flex justify-end">
		{#each breadcrumb as link, index}
			{#if index !== breadcrumb.length - 1}
				<li class="crumb capitalize">
					<a class="anchor" href={link.href}>{link.title}</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">›</li>
			{/if}
		{/each}
		<li class="capitalize">{breadcrumb.slice(-1)[0].title}</li>
	</ol>

	<!-- page title -->
	<div class="mb-4 mt-6 xl:my-8">
		<h1 class="h1 font-bold">{title}</h1>
	</div>

	{@render children?.()}
</section>
