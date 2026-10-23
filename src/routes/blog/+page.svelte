<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import PostCard from '#lib/components/blog/PostCard.svelte'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const cta = $derived(
		{
			signedOut: {
				href: '/login?redirectTo=%2Fblog%2Fwrite',
				label: 'Log in to write',
				icon: 'lucide:log-in',
			},
			none: { href: '/blog/write', label: 'Request to write', icon: 'lucide:pen-line' },
			pending: { href: '/blog/write', label: 'Request pending', icon: 'lucide:hourglass' },
			rejected: { href: '/blog/write', label: 'Write for the blog', icon: 'lucide:pen-line' },
			approved: { href: '/blog/write', label: 'Write a post', icon: 'lucide:pen-line' },
		}[data.authorStatus]
	)
</script>

<FccLayout
	heading="Blog."
	intro="Stories, devotionals and reflections written by the members of Freedom in Christ Church."
>
	<div class="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
		<p class="text-muted max-w-xl">
			Have something God has been teaching you? Members can write for the blog.
			Every post is read by our leaders before it's published.
		</p>
		<a href={cta.href} class="btn btn-primary shrink-0">
			<Icon icon={cta.icon} class="size-4" />
			{cta.label}
		</a>
	</div>

	{#if data.posts.length}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.id)}
				<PostCard {post} />
			{/each}
		</div>
	{:else}
		<div class="card flex flex-col items-center gap-4 p-10 text-center">
			<span class="icon-chip size-14">
				<Icon icon="lucide:notebook-pen" class="size-6" />
			</span>
			<p class="text-lg">No posts yet. Check back soon!</p>
		</div>
	{/if}
</FccLayout>
