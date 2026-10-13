<script lang="ts">
	import { page } from '$app/state'
	import { buildSeoHeadExtras } from '#lib/utils.js'
	import type { Snippet } from 'svelte'

	// Svelte 5 props
	let {
		title,
		headData,
		breadcrumb,
		image,
		imageAlt = '',
		imagePosition = 'center',
		intro,
		children,
	}: {
		title: string
		headData: { title: string; description: string }
		breadcrumb: Array<{ title: string; href: string }>
		/** Optional photo shown behind the page title */
		image?: string
		imageAlt?: string
		/** CSS object-position for the header photo */
		imagePosition?: string
		/** Optional short sentence under the title */
		intro?: string
		children: Snippet
	} = $props()

	let url = $derived(page.url.href)
	let seoHeadExtras = $derived(
		buildSeoHeadExtras(url, headData.title, headData.description)
	)
</script>

<svelte:head>
	<title>{headData.title}</title>
	<meta name="description" content={headData.description} />
	{@html seoHeadExtras}
</svelte:head>

{#snippet crumbs()}
	<ol class="breadcrumb">
		{#each breadcrumb as link, index}
			{#if index !== breadcrumb.length - 1}
				<li class="crumb capitalize">
					<a href={link.href}>{link.title}</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">/</li>
			{/if}
		{/each}
		<li class="font-medium capitalize" aria-current="page">
			{breadcrumb.slice(-1)[0].title}
		</li>
	</ol>
{/snippet}

{#if image}
	<!-- Photo header -->
	<header class="relative isolate overflow-hidden bg-primary-950">
		<img
			src={image}
			alt={imageAlt}
			class="absolute inset-0 -z-10 size-full object-cover"
			style:object-position={imagePosition}
			fetchpriority="high"
		/>
		<div
			class="absolute inset-0 -z-10 bg-gradient-to-t from-primary-950/90 via-primary-950/45 to-primary-950/10"
		></div>
		<div class="wrap flex min-h-[22rem] flex-col justify-end pt-24 pb-10 text-white md:min-h-[28rem] md:pb-14">
			<nav aria-label="Breadcrumb" class="text-white/90">
				{@render crumbs()}
			</nav>
			<h1 class="mt-4 max-w-3xl text-4xl font-semibold text-white md:text-6xl">
				{title}
			</h1>
			{#if intro}
				<p class="mt-4 max-w-2xl text-lg text-white/85 md:text-xl">{intro}</p>
			{/if}
		</div>
	</header>
{:else}
	<!-- Text header -->
	<header class="border-b border-line bg-surface-100/60">
		<div class="wrap py-12 md:py-16">
			<nav aria-label="Breadcrumb" class="text-muted">
				{@render crumbs()}
			</nav>
			<h1 class="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h1>
			{#if intro}
				<p class="lede mt-4 max-w-2xl">{intro}</p>
			{/if}
		</div>
	</header>
{/if}

<section class="wrap py-12 md:py-16">
	{@render children?.()}
</section>
