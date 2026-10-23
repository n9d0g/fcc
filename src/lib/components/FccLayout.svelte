<script lang="ts">
	import { page } from '$app/state'
	import type { PageMeta } from '#lib/config/pages.js'
	import { buildSeoHeadExtras } from '#lib/utils.js'
	import type { Snippet } from 'svelte'

	// Svelte 5 props
	let {
		heading,
		meta,
		image,
		imageAlt = '',
		imagePosition = 'center',
		intro,
		children,
	}: {
		/** The page's H1 */
		heading: string
		/** Title, description and crumbs; the current route's registry entry by default */
		meta?: PageMeta
		/** Optional photo shown behind the page title */
		image?: string
		imageAlt?: string
		/** CSS object-position for the header photo */
		imagePosition?: string
		/** Optional short sentence under the title */
		intro?: string
		children: Snippet
	} = $props()

	// Every route with this layout has a registry entry (see pages.test.ts)
	let resolved = $derived((meta ?? page.data.pageMeta) as PageMeta)
	let trail = $derived(resolved.crumbs)
	let url = $derived(page.url.href)
	let seoHeadExtras = $derived(
		buildSeoHeadExtras(url, resolved.title, resolved.description)
	)
</script>

<svelte:head>
	<title>{resolved.title}</title>
	<meta name="description" content={resolved.description} />
	{#if !resolved.indexed}
		<meta name="robots" content="noindex" />
	{/if}
	{@html seoHeadExtras}
</svelte:head>

{#snippet crumbs()}
	<ol class="breadcrumb">
		{#each trail as crumb, index}
			{#if index !== trail.length - 1}
				<li class="crumb capitalize">
					<a href={crumb.href}>{crumb.label}</a>
				</li>
				<li class="crumb-separator" aria-hidden="true">/</li>
			{/if}
		{/each}
		<li class="font-medium capitalize" aria-current="page">
			{trail.slice(-1)[0].label}
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
				{heading}
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
			<h1 class="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">{heading}</h1>
			{#if intro}
				<p class="lede mt-4 max-w-2xl">{intro}</p>
			{/if}
		</div>
	</header>
{/if}

<section class="wrap py-12 md:py-16">
	{@render children?.()}
</section>
